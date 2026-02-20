function $(selector, context = null) {
  let elements = []

  if (!selector) {
    return $(elements)

  } else if (selector._bonze) {
    return selector

  } else if (typeof selector === 'function') {
    return document.addEventListener('DOMContentLoaded', selector)

  } else if (selector instanceof Array) {
    selector.forEach((item) => {
      $(item)(($elm) => elements.push($elm))
    })

  } else if (selector.nodeType) {
    elements = [ selector ]

  } else if (selector.match(/^\s*<(\w+|!)[^>]*>/)) {
    const $container = document.createElement('div')

    $container.innerHTML = selector.trim()
    elements = [].slice.call($container.childNodes)

  } else {
    const contexts = context ? $(context)() : [ document ]

    contexts.forEach((context) => {
      context = $(context)(0)

      const found = [].slice.call(context.querySelectorAll(selector))

      elements = elements.concat(found)
    })
  }

  elements = elements.slice()

  const fn = (value) => {
    if (typeof value === 'undefined') {
      return elements
    }

    if (typeof value === 'number') {
      return elements[value]
    }

    if (typeof value === 'function') {
      elements.forEach((element, i) => value.call(element, element, i, elements))
    }

    return fn
  }

  const proxy = (func, element) => {
    const next = $(element)

    next._prev = fn
    return func ? next(func) : next
  }

  fn._bonze = true
  fn.first = (f) => proxy(f, elements[0])
  fn.last = (f) => proxy(f, elements[elements.length - 1])
  fn.odd = (f) => proxy(f, elements.filter((elmt, i) => !(i % 2)))
  fn.even = (f) => proxy(f, elements.filter((elmt, i) => (i % 2)))
  fn.nth = (value, f) => proxy(f, elements[value])
  fn.filter = (filter, f) => proxy(f, elements.filter((elmt, i) => filter(elmt, i, elements)))
  fn.siblings = (f) => proxy(f, [ ...new Set(elements.flatMap((elmt) => elmt.parentNode ? [].slice.call(elmt.parentNode.children).filter((child) => child !== elmt) : [])) ])
  fn.set = (f) => { const next = $(f(elements)); next._prev = fn; return next }
  fn.back = () => fn._prev || fn
  fn.each = fn

  Object.entries($.plugins).forEach(([ name, plugin ]) => {
    fn[name] = (...argsFn) => {
      $(elements)((...args) => {
        plugin.apply(args[0], [ ...args, ...argsFn ])
      })
    }
  })

  return fn
}

$.plugins = {}
$.plugin = function(name, fn) {
  $.plugins[name] = fn
}

export default $
