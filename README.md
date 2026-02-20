![Bonze](https://jaysalvat.github.io/bonze/bonze.svg)

# Bonze

[![NPM version](https://badge.fury.io/js/bonze.svg)](http://badge.fury.io/js/bonze)

Super tiny chainable and extendable tool wrapping native `querySelectorAll` for selecting, creating and filtering DOM Elements with ease.
**~750b Gzipped**.

![Bonze](https://jaysalvat.github.io/bonze/screen.png)

## Demos

See [demos here.](https://jaysalvat.github.io/bonze/demo/)

## Concept

### Example 1

#### Without Bonze

```javascript
const el = document.querySelector('#section');

if (el) {
  el.style.color = 'green';
}
```

#### With Bonze

```javascript
$('#section')(el => el.style.color = 'green');
```

### Example 2

#### Without Bonze

```javascript
const elements = document.querySelectorAll('div, p');

for (let i = 0; i < elements.length; ++i) {
  elements[i].style.color = 'green';
}

if (elements.length) {
  elements[elements.length - 1].style.color = 'red';
}
```

#### With Bonze

```javascript
$('div, p')
  .each(el => el.style.color = 'green')
  .last(el => el.style.color = 'red');
```

## Install

### NPM

    npm install --save bonze

```javascript
import $ from 'bonze';
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
  document.body.classList.add('ready');
});
```

### Select elements

```javascript
$('h1, h2, h3').each(headings => {
  headings.classList.add('red');
});

$('h1, h2, h3')(headings => { // Shortcut for each
  headings.classList.add('red');
});
```

### Select elements in context

```javascript
$('h1, h2, h3', '#article')(headings => {
  headings.classList.add('red');
});
```

### Filter elements

```javascript
$('div').first(div => {
  div.classList.add('first');
});

$('div').nth(2, div => {
  div.classList.add('third');
});

$('div').last(div => {
  div.classList.add('last');
});

$('div').odd(div => {
  div.classList.add('odd');
});

$('div').even(div => {
  div.classList.add('even');
});

$('div').filter(div => div.textContent.includes('error'), div => {
  div.classList.add('red');
});

$('div.focus').siblings(div => {
  div.classList.add('warning');
});

```

### Create element

```javascript
$('<h1>My New Title</h1>')((h1) => {
  document.body.prepend(h1);
});
```

### Navigate back

`.back()` returns the previous selection in the chain, allowing you to branch from the same root.

```javascript
$('div')
  .even(div => div.classList.add('even'))
  .back()
  .odd(div => div.classList.add('odd'));
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
  .last(div => {
    div.classList.add('red');
  });
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

# Credits

Icon made by [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](www.flaticon.com).
