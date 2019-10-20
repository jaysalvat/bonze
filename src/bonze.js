
export default function bonze(selector, context = null) {
  let elements = [];

  if (!selector) {
    return bonze(elements);

  } else if (selector._bonze) {
    return selector;

  } else if (typeof selector === 'function') {
    return document.addEventListener('DOMContentLoaded', selector);

  } else if (selector instanceof Array) {
    elements = selector;

  } else if (selector.nodeType) {
    elements = [ selector ];

  } else if (selector.match(/^\s*<(\w+|!)[^>]*>/)) {
    const container = document.createElement('div');

    container.innerHTML = selector;
    elements = [].slice.call(container.childNodes);

  } else {
    const contexts = context ? bonze(context)() : [ document ];

    contexts.forEach((context) => {
      context = bonze(context)(0);
      const found = [].slice.call(context.querySelectorAll(selector));
      elements = elements.concat(found);
    });
  }

  elements = elements.slice();

  const fn = (callback) => {
    if (typeof callback === 'number') {
      return elements[callback];
    }

    if (typeof callback === 'function') {
      elements.forEach((element, index) => callback.call(element, element, index, elements));
      return fn;
    }

    return elements;
  };

  fn.first = () => bonze(elements[0]);
  fn.last = () => bonze(elements[elements.length - 1]);
  fn.odd = () => bonze(elements.filter((elmt, i) => !(i % 2)));
  fn.even = () => bonze(elements.filter((elmt, i) => (i % 2)));
  fn.nth = (value) => bonze(elements[value]);
  fn.filter = (fn) => bonze(elements.filter((elmt, i) => fn(elmt, i, elements)));
  fn.each = fn;

  fn._bonze = true;

  return fn;
}
