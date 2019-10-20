# Bonze

[![NPM version](https://badge.fury.io/js/bonze.svg)](http://badge.fury.io/js/bonze)

Tiny but powerful JS selector helper

## Example

### Dom ready

```javascript
bonze(() => {
  document.body.classList.add('ready');
});
```

### Create element

```javascript
bonze('<h1>My New Title</h1>')((h1) => {
  document.body.prepend(h1);
});
```

### Select elements

```javascript
bonze('div')(div => {
  div.classList.add('red');
});

bonze('div').first()(div => {
  div.classList.add('first-child');
});

bonze('div').last()(div => {
  p.classList.add('last-child');
});

bonze('div').nth(2)(div => {
  div.classList.add('second-child');
});

bonze('div').odd()(div => {
  p.classList.add('odd');
});

bonze('div').even()(div => {
  div.classList.add('even');
});
```

### Chainable

```javascript
bonze('div')
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

### Get DOM elements

```javascript
const domElementArray = bonze('div')();

const domFirstElement = bonze('div')(0);
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
import bonze from 'bonze';
```
