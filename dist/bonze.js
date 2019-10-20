(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.bonze = factory());
}(this, function () { 'use strict';

  function bonze(selector) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var elements = [];

    if (!selector) {
      return bonze(elements);
    } else if (selector._bonze) {
      return selector;
    } else if (typeof selector === 'function') {
      return document.addEventListener('DOMContentLoaded', selector);
    } else if (selector instanceof Array) {
      elements = selector;
    } else if (selector.nodeType) {
      elements = [selector];
    } else if (selector.match(/^\s*<(\w+|!)[^>]*>/)) {
      var container = document.createElement('div');
      container.innerHTML = selector;
      elements = [].slice.call(container.childNodes);
    } else {
      var contexts = context ? bonze(context)() : [document];
      contexts.forEach(function (context) {
        context = bonze(context)(0);
        var found = [].slice.call(context.querySelectorAll(selector));
        elements = elements.concat(found);
      });
    }

    elements = elements.slice();

    var fn = function fn(callback) {
      if (typeof callback === 'number') {
        return elements[callback];
      }

      if (typeof callback === 'function') {
        elements.forEach(function (element, index) {
          return callback.call(element, element, index, elements);
        });
        return fn;
      }

      return elements;
    };

    fn.nth = function (value) {
      return bonze(elements[value]);
    };

    fn.first = function () {
      return bonze(elements[0]);
    };

    fn.last = function () {
      return bonze(elements[elements.length - 1]);
    };

    fn.odd = function () {
      return bonze(elements.filter(function (elmt, i) {
        return !(i % 2);
      }));
    };

    fn.even = function () {
      return bonze(elements.filter(function (elmt, i) {
        return i % 2;
      }));
    };

    fn._bonze = true;
    return fn;
  }

  return bonze;

}));
//# sourceMappingURL=bonze.js.map
