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
    elements = Reflect.apply([].slice, $container.childNodes, [])
  } else {
    const contexts = context ? $(context)() : [ document ]

    contexts.forEach((ctx) => {
      const contextNode = $(ctx)(0)
      const found = Reflect.apply([].slice, contextNode.querySelectorAll(selector), [])

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
      elements.forEach((element, i) => Reflect.apply(value, element, [ element, i, elements ]))
    }

    return fn
  }

  const proxy = (func, element) => {
    const next = $(element)

    next._prev = fn

    return func ? next(func) : next
  }

  fn._bonze = true
  fn.each = fn
  fn.back = () => fn._prev || fn
  fn.first = (f) => proxy(f, elements[0])
  fn.last = (f) => proxy(f, elements[elements.length - 1])
  fn.nth = (idx, f) => proxy(f, elements[idx])
  fn.odd = (f) => proxy(f, elements.filter((_, i) => !(i % 2)))
  fn.even = (f) => proxy(f, elements.filter((_, i) => i % 2))
  fn.filter = (filter, f) => proxy(f, elements.filter((elmt, i) => filter(elmt, i, elements)))
  fn.siblings = (f) => proxy(f, [ ...new Set(elements.flatMap((elmt) => (elmt.parentNode ? Reflect.apply([].slice, elmt.parentNode.children, []).filter((child) => child !== elmt) : []))) ])
  fn.set = (f) => {
    const next = $(f(elements))

    next._prev = fn

    return next
  }

  Object.entries($.plugins).forEach(([ name, plugin ]) => {
    fn[name] = (...argsFn) => {
      $(elements)((...args) => {
        Reflect.apply(plugin, args[0], [ ...args, ...argsFn ])
      })
    }
  })

  return fn
}

$.plugins = {}

$.plugin = function (name, fn) {
  $.plugins[name] = fn
}

export default $
