# bonze

[![NPM version](https://badge.fury.io/js/bonze.svg)](http://badge.fury.io/js/bonze)
[![Bower version](https://badge.fury.io/bo/bonze.svg)](http://badge.fury.io/bo/bonze)

Tiny but powerful JS selector helper

## Example

```javascript
$('p')((p, i) => {
  p.innerHTML = 'Paragraph ' + i;
})((p) => {
  p.classList.add('newclass');
})

$('<h1>My New Title</h1>')((h1) => {
    document.body.prepend(h1);
});

const nativeDomElementArray = $('div')();
```

## Install

Download latest [bonze version](http://jaysalvat.github.io/bonze/releases/latest/bonze.zip) and include it to your page.

```html
<script src="/path/to/bonze/dist/bonze.min.js"></script>
```

### Bower install

    bower install --save bonze

### NPM install

    npm install --save bonze

### Yarn install

    yarn add bonze

bonze is UMD and ES6/Webpack/Browserify friendly.

```javascript
import $ from 'bonze';
```
