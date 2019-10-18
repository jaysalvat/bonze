/* global define */

(function (context, factory) {
  'use strict';

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    context.$ = factory();
  }
})(this, function () {
  'use strict';

  function bonze (selector, context) {
    var elements = [];

    if (!selector) {
      return elements;
    }

    else if (selector._bonze) {
      return selector;
    }

    else if (typeof selector === 'function') {
      return document.addEventListener('DOMContentLoaded', selector);
    }

    else if (selector instanceof Array) {
      elements = selector;
    }

    else if (selector.nodeType) {
      elements = [ selector ];
    }

    else if (selector.match(/^\s*<(\w+|!)[^>]*>/)) {
      var container = document.createElement('div');
      container.innerHTML = selector;
      elements = [].slice.call(container.childNodes);

    } else {
      var contexts = context ? bonze(context)() : [ document ];

      contexts.forEach(function (context) {
        context = bonze(context)(0);
        var found = [].slice.call(context.querySelectorAll(selector));
        elements = elements.concat(found);
      });
    }

    var fn = function (value1, value2) {
      elements = elements.slice();

      if (value1 === 'first') {
        return fn(0, value2);
      }

      if (value1 === 'last') {
        return fn(elements.length - 1, value2);
      }

      if (typeof value1 === 'number') {
        if (value2) {
          elements = [ elements[value1] ];
          return fn(value2);
        }
        return elements[value1];
      }

      if (typeof value1 === 'function') {
        if (value2) {
          elements = elements[value2](value1, elements);
        } else {
          elements.forEach(value1, elements);
        }
        return fn;
      }

      if (value1 === 'if' && value2 === false) {
        elements.forEach(function (element) {
          element.remove();
        });
        return fn;
      }

      return elements;
    };

    fn._bonze = true;

    return fn;
  }

  return bonze;
});
