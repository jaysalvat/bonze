# Bonze

[![NPM version](https://badge.fury.io/js/bonze.svg)](http://badge.fury.io/js/bonze)

Tiny but powerful, chainable and extendable tool for selecting, creating and managing DOM Elements.
Less than 1kb Gzipped.

## Concept

### Without Bonze

```javascript
const elements = document.querySelectorAll('div, p');

for (let i = 0; i < elements.length; ++i) {
  elements[i].style.color = 'green';
}
```

### With Bonze

```javascript
$('div, p')(el => el.style.color = 'green');
```

## Install

### NPM

    npm install --save bonze

```javascript
import $ from 'bonze';
```

### CDN

From [Unpkg.com](https://unpkg.com/bonze)

```html
<script src="https://unpkg.com/bonze"></script>
```

Or download the latest [bonze version](https://github.com/jaysalvat/bonze/archive/master.zip).

## Example

### Dom ready

```javascript
$(() => {
  document.body.classList.add('ready');
});
```

### Create element

```javascript
$('<h1>My New Title</h1>')((h1) => {
  document.body.prepend(h1);
});
```

### Select elements

```javascript
$('div')(div => {
  div.classList.add('red');
});

$('div').first()(div => {
  div.classList.add('first-child');
});

$('div').last()(div => {
  p.classList.add('last-child');
});

$('div').nth(2)(div => {
  div.classList.add('second-child');
});

$('div').odd()(div => {
  p.classList.add('odd');
});

$('div').even()(div => {
  div.classList.add('even');
});

$("div").filter(div => el.textContent.includes('error'))(el => {
  el.classList.add('red');
});

```

### Chainable

```javascript
$('div')
  ((div, i) => {
    div.innerHTML = 'Paragraph ' + i;
  })
  (div => {
    div.classList.add('green');
  })
  .last()
  (div => {
    div.classList.add('red');
  })
```

### Extendable

```javascript
$.plugin('addClass', (el, index, elmts, name) => {
  el.classList.add(name);
});

$('div').odd().addClass('black');
$('div').even().addClass('white');
```

### Get DOM elements

```javascript
const domElementArray = $('div')();

const domFirstElement = $('div')(0);

const domSecondElement = $('div')(1);
```
