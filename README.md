[![LICENSE](https://img.shields.io/github/license/halodong/logo-canvas?style=flat-square)](./LICENSE)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/karma-runner/karma-coverage)
[![NPM Version](https://img.shields.io/npm/v/logo-canvas.svg)](npm-url)
[![Build Status](https://app.travis-ci.com/halodong/logo-canvas.svg?branch=main)](https://www.travis-ci.com)

[npm-url]: https://npmjs.org/package/logo-canvas
# logo-canvas
Quickly generate images from text based on `canvas`. Supports command line interface and in-browser use.

[简体中文](https://github.com/halodong/logo-canvas/blob/main/README.md)

## Install

Use npm
```
$ npm install logo-canvas
```

## Use
### CLI
```
$ logo
```
#### exam1
![exam1.png](./examples/exam1.png)
```json
{
  "fontColor": "black",
  "backgroundColor": "white",
  "text": "S",
  "shape": { "shape": "circle" },
  "width": 128,
  "height": 128,
  "fontSize": 64,
  "fontFamily": "Origami-Mommy"
}
```
#### exam2
![exam2.png](./examples/exam2.png)
```json
{
  "fontColor": "white",
  "backgroundColor": "#C70039",
  "text": "logo",
  "width": 128,
  "height": 64,
  "fontSize": 32,
  "fontFamily": "Blocked",
  "shape": "rounded"
}

```
### browser
- [browser](./examples/default.html)
```js
<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
<script>
    WebFont.load({
        google: {
            families: ["Tangerine"]
        },
        active: function () {
            const logo = new Logo({
                canvas,
                backgroundColor: 'blue',
                text: 'canvas',
                width: 200,
                height: 90,
                shape: "rounded",
                fontColor: "white",
                backgroundColor: "#C70039",
                fontFamily: "Tangerine",
                fontSize: 80
            })
            document.body.appendChild(logo.drawLogo())
        }
    });
</script>
```

## Problem
For bugs or suggestions, you can submit via [create an issue](https://github.com/halodong/logo-canvas/issues/new).
© 2022 GitHub, Inc.
