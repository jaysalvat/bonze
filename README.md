![Bonze](https://jaysalvat.github.io/bonze/bonze.svg)

# Bonze

**Hit your DOM the smart way**

[![NPM version](https://badge.fury.io/js/bonze.svg)](http://badge.fury.io/js/bonze)

Super tiny chainable and extendable tool wrapping native `querySelectorAll` for selecting, creating and filtering DOM Elements.

**~0.7kb Gzipped**.

![Bonze](https://jaysalvat.github.io/bonze/screen.png)

## Demos

- [**$(selector)**](https://jaysalvat.github.io/bonze/demo/selector.html) — CSS string, context, array of selectors, HTML string creation
- [**.first() .last()**](https://jaysalvat.github.io/bonze/demo/first-last.html) — Target the first or last element
- [**.nth(n)**](https://jaysalvat.github.io/bonze/demo/nth.html) — Target the nth element by index
- [**.odd() .even()**](https://jaysalvat.github.io/bonze/demo/odd-even.html) — Filter to odd or even indexed elements
- [**.filter(fn)**](https://jaysalvat.github.io/bonze/demo/filter.html) — Filter elements using a custom predicate
- [**.siblings()**](https://jaysalvat.github.io/bonze/demo/siblings.html) — Get sibling elements
- [**.back()**](https://jaysalvat.github.io/bonze/demo/back.html) — Return to the previous selection
- [**.set(fn)**](https://jaysalvat.github.io/bonze/demo/set.html) — Morph the element collection
- [**(callback) .each**](https://jaysalvat.github.io/bonze/demo/each.html) — Iterate over elements

And

- [**$.plugin()**](https://jaysalvat.github.io/bonze/demo/plugin.html) — Extend bonze with custom methods

[See all demos →](https://jaysalvat.github.io/bonze/demo/)

## Concept

### Example querySelector

#### Without Bonze

```javascript
const el = document.querySelector("#section");

if (el) {
  el.style.color = "green";
}
```

#### With Bonze

```javascript
$("#section")((el) => (el.style.color = "green"));
```

### Example querySelectorAll

#### Without Bonze

```javascript

const elements = document.querySelectorAll("div, p")

elements.forEach((el, i) => {
  el.classList.add('item')

  if (i === 0) {
    el.classList.add('first')
  }

  if (i === elements.length - 1) {
    el.classList.add('last')
  }
})
```

#### With Bonze

```javascript
$("div, p")
  .each((el) => (el.classList.add('item'))
  .first((el) => (el.classList.add('first'))
  .last((el) => (el.classList.add('last'))
```

## Install

### NPM

    npm install --save bonze

```javascript
import $ from "bonze";
```

### CDN

From [Unpkg.com](https://unpkg.com/bonze)

#### UMD

```html
<script src="https://unpkg.com/bonze@latest"></script>
```

#### ESM module

```html
<script src="https://unpkg.com/bonze@latest/dist/bonze.esm.min.js"></script>
```

If you include bonze this way use `bonze` instead of `$` in the examples below.

## Usage

### Dom ready

```javascript
$(() => {
  document.body.classList.add("ready");
});
```

### Select elements

```javascript
$("h1, h2, h3").each((headings) => {
  headings.classList.add("red");
});

// Shortcut for each

$("h1, h2, h3")((headings) => {
  headings.classList.add("red");
});
```

### Select elements in context

```javascript
$(
  "h1, h2, h3",
  "#article",
)((headings) => {
  headings.classList.add("red");
});
```

### Filter elements

```javascript
$("div").first((div) => {
  div.classList.add("first");
});

$("div").nth(2, (div) => {
  div.classList.add("third");
});

$("div").last((div) => {
  div.classList.add("last");
});

$("div").odd((div) => {
  div.classList.add("odd");
});

$("div").even((div) => {
  div.classList.add("even");
});

$("div").filter(
  (div) => div.textContent.includes("error"),
  (div) => {
    div.classList.add("red");
  },
);

$("div.focus").siblings((div) => {
  div.classList.add("warning");
});
```

### Create element

```javascript
$("<h1>My New Title</h1>")((h1) => {
  document.body.prepend(h1);
});
```

### Navigate back

`.back()` returns the previous selection in the chain, allowing you to branch from the same root.

```javascript
$("div")
  .even((div) => div.classList.add("even"))
  .back()
  .odd((div) => div.classList.add("odd"));
```

### Chainable

```javascript
$("div")((div, i) => {
  div.innerHTML = "Paragraph " + i;
})((div) => {
  div.classList.add("green");
}).last((div) => {
  div.classList.add("red");
});
```

### Extendable

Bonze can be extended with custom methods using the `$.plugin()` API. Plugins receive the element, index, elements array, and any custom arguments you pass.

[**See plugin demos**](https://jaysalvat.github.io/bonze/demo/plugin.html)

```javascript
$.plugin("addClass", (el, index, elmts, name) => {
  el.classList.add(name);
});

$("div").odd().addClass("black");
$("div").even().addClass("white");
```

```javascript
$.plugin('stagger', (el, i, elmts, name, timing) => {
  el.style.transitionDelay = `${i * timing}ms`
  el.classList.toggleClass(name)
})

$('div').stagger('highlight')
```

### Get DOM elements

```javascript
const domElementArray = $("div")();

const domFirstElement = $("div")(0);

const domSecondElement = $("div")(1);
```

# Credits

Icon made by [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](www.flaticon.com).
