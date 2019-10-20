# bonze

[![NPM version](https://badge.fury.io/js/bonze.svg)](http://badge.fury.io/js/bonze)

Tiny but powerful JS selector helper

## Example

### Dom ready

```javascript
$(() => {
  document.body.classList.add('ready');
});
```

### Create elementss

```javascript
$('<h1>My New Title</h1>')((h1) => {
  document.body.prepend(h1);
});
```

### Select elementss

```javascript
$('div')((div) => {
  div.classList.add('red');
});

$('div').first()((div) => {
  div.classList.add('first-child');
});

$('div').last()((div) => {
  p.classList.add('last-child');
});

$('div').nth(2)((div) => {
  div.classList.add('second-child');
});

$('div').odd()((div) => {
  p.classList.add('odd');
});

$('div').even()((div) => {
  div.classList.add('even');
});
```

### Chainable

```javascript
$('div')
  ((div, i) => {
    div.innerHTML = 'Paragraph ' + i;
  })
  ((div) => {
    div.classList.add('green');
  })
  .last()
  ((div) => {
    div.classList.add('red');
  })
```

### Get native elements

```javascript
const nativeDomElementArray = $('div')();

const nativeDomFirstElement = $('div')(0);
```

## Install

Download latest [bonze version](https://github.com/jaysalvat/bonze/archive/master.zip) and include it to your page.

Or include it from Unpkg.com

```html
<script src="https://unpkg.com/bonze@latest/dist/bonze.js"></script>
```

### NPM install

    npm install --save bonze

### Yarn install

    yarn add bonze

bonze is UMD and ES6/Webpack/Browserify friendly.

```javascript
import $ from 'bonze';
```
