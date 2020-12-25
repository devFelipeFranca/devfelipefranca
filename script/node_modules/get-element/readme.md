[![get-element logo](https://raw.githubusercontent.com/codekirei/get-element/master/logo.png)](https://github.com/codekirei/get-element)
---
[![Build Status](https://travis-ci.org/codekirei/get-element.svg?branch=master)](https://travis-ci.org/codekirei/get-element)
[![Coverage Status](https://coveralls.io/repos/codekirei/get-element/badge.svg?branch=master&service=github)](https://coveralls.io/github/codekirei/get-element?branch=master)

<b>[About](#about)</b> |
<b>[Why](#why)</b> |
<b>[Installation](#installation)</b> |
<b>[Usage](#usage)</b> |
<b>[License](#license)</b>

## About

A tiny Node.js module for quickly selecting HTML elements.
Bundle it with browserify/webpack/etc.
Requires Node.js > `4.0`.

## Why

- Because using `jQuery` just to select elements is like using a flamethrower to light a birthday candle
- Because `document.querySelector()` is slow
- Because [`HTMLCollections`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection) are cool and all, but I usually want an actual `Array` to iterate over
- Because I don't want to type `Array.prototype.slice.call(document.getElementsByClassName('aVeryNiceClassName'))` over and over again

## Installation

Install and save to `package.json` from terminal:
```
$ npm install --save get-element
```

`get-element` is primarily intended for use with a bundler like webpack or browserify: 
```js
var getElement = require('get-element')
```

If you need a standalone `<script>`, though, a minified browser build that attaches to the global namespace as `getElement` is provided [here](https://github.com/codekirei/get-element/tree/master/browser/dist):
```html
<script src="get-element.min.js"></script>
```

## Usage

`get-element` exports two methods:

**getElement.withClass(*class*, *[from]*)**

Returns an array of elements with the specified class.
`from` is an optional parameter to specify a root element other than `document`.

```html
<!--index.html-->
<!doctype html>
<html>
  <head></head>
  <body>
    <div class="foo">
      <div class="bar"></div>
    </div>
    <section class="bar"></div>
    <section class="bar"></div>
    <script src="main.js"></script>
  </body>
</html>
```
```js
// main.js (pre-bundle)
var el = require('get-element')

var foo = el.withClass('foo')
  // => [ <div.foo> ]

var bar = el.withClass('bar')
  // => [ <div.bar>, <section.bar>, <section.bar> ]

var fooBar = el.withClass('bar', foo[0])
  // => [ <div.bar> ]

```

**getElement.withTag(*tag*, *[from]*)**

Returns an array of elements with the specified tag.
`from` is an optional parameter to specify a root element other than `document`.

```html
<!--index.html-->
<!doctype html>
<html>
  <head></head>
  <body>
    <div class="foo">
      <div class="bar"></div>
    </div>
    <section class="bar"></div>
    <section class="bar"></div>
    <script src="main.js"></script>
  </body>
</html>
```
```js
// main.js (pre-bundle)
var el = require('get-element')

var body = el.withTag('body')
  // => [ <body> ]

var divs = el.withTag('div')
  // => [ <div.foo>, <div.bar> ]
```

## License

[MIT](https://github.com/codekirei/get-element/blob/master/license)
