(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.logo = {}));
})(this, (function (exports) { 'use strict';

  var defaults = {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      canvas: null,
      width: 128,
      height: 128,
      shape: 'square',
      fontColor: 'white',
      backgroundColor: 'black',
      text: 'C',
      fontFamily: 'Helvetica',
      fontSize: 64
  };

  function measureOffsets(text, fontFamily, fontSize, canvas, ctx) {
      ctx.font = "".concat(fontSize, "px").concat(fontFamily);
      canvas.width = 2 * ctx.measureText(text).width;
      canvas.height = 2 * fontSize;
      ctx.font = "".concat(fontSize, "px").concat(fontFamily);
      ctx.textBaseline = 'alphabetic';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'white';
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
      var data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      var textTop = 0;
      var textBottom = 0;
      for (var y = 0; y <= canvas.height; y++) {
          for (var x = 0; x <= canvas.width; x++) {
              var rIndex = 4 * (canvas.width * y + x);
              var rValue = data[rIndex];
              if (rValue === 255) {
                  if (textTop === 0) {
                      textTop = y;
                  }
                  textBottom = y;
                  break;
              }
          }
      }
      var canvasHorizontalCenterLine = canvas.height / 2;
      var textHorizontalCenterLine = (textBottom - textTop) / 2 + textTop;
      var textLeft = 0;
      var textRight = 0;
      for (var x = 0; x <= canvas.width; x++) {
          for (var y = 0; y <= canvas.height; y++) {
              var rIndex = 4 * (canvas.width * y + x);
              var rValue = data[rIndex];
              if (rValue === 255) {
                  if (textTop === 0) {
                      textLeft = x;
                  }
                  textRight = x;
                  break;
              }
          }
      }
      var canvasVerticalCenterLine = canvas.width / 2;
      var textVerticalCenterLine = (textRight - textLeft) / 2 + textLeft;
      return {
          vertical: canvasHorizontalCenterLine - textHorizontalCenterLine,
          horizontal: canvasVerticalCenterLine - textVerticalCenterLine
      };
  }

  var Logo = /** @class */ (function () {
      function Logo(options) {
          if (options === void 0) { options = defaults; }
          var data = Object.assign({}, defaults, options);
          this.canvas = (data.canvas != null) ? data.canvas : document.createElement('camvas');
          this.ctx = this.canvas.getContext('2d');
          this.width = data.width;
          this.height = data.height;
          this.shape = data.shape;
          this.fontColor = data.fontColor;
          this.backgroundColor = data.backgroundColor;
          this.text = data.text;
          this.fontFamily = data.fontFamily;
          this.fontSize = data.fontSize;
          this.canvas.width = 2 * this.width;
          this.canvas.height = 2 * this.height;
          // this.canvas.style.width = `${this.width}px`
          // this.canvas.style.height = `${this.height}px`
          this.ctx.scale(2, 2);
      }
      Logo.prototype.save = function () {
          this.drawBackground();
          this.drawText();
          console.log('canvas', this.canvas);
      };
      Logo.prototype.drawText = function () {
          this.ctx.fillStyle = this.fontColor;
          this.ctx.font = "".concat(this.fontSize, "px").concat(this.fontFamily);
          this.ctx.textBaseline = 'alphabetic';
          this.ctx.textAlign = 'center';
          var offsets = measureOffsets(this.text, this.fontFamily, this.fontSize, this.canvas, this.ctx);
          var x = this.width / 2 + offsets.horizontal;
          var y = this.height / 2 + offsets.vertical;
          this.ctx.fillText(this.text, x, y);
      };
      Logo.prototype.drawRounded = function () {
          this.ctx.beginPath();
          var radius = this.height / 10;
          this.ctx.moveTo(this.width, this.height);
          this.ctx.arcTo(0, this.height, 0, 0, radius);
          this.ctx.arcTo(0, 0, this.width, 0, radius);
          this.ctx.arcTo(this.width, 0, this.width, this.height, radius);
          this.ctx.arcTo(this.width, this.height, 0, this.height, radius);
          this.ctx.fillStyle = this.backgroundColor;
          this.ctx.fill();
      };
      Logo.prototype.drawSquare = function () {
          this.ctx.beginPath();
          this.ctx.rect(0, 0, this.width, this.height);
          this.ctx.fillStyle = this.backgroundColor;
          this.ctx.fill();
      };
      Logo.prototype.drawCircle = function () {
          this.ctx.beginPath();
          this.ctx.arc(this.width / 2, this.height / 2, this.height / 2, 0, 2 * Math.PI, false);
          this.ctx.fillStyle = this.backgroundColor;
          this.ctx.fill();
      };
      Logo.prototype.drawBackground = function () {
          switch (this.shape) {
              case 'square':
                  this.drawSquare();
                  break;
              case 'circle':
                  this.drawCircle();
                  break;
              case 'rounded':
                  this.drawRounded();
                  break;
              default:
                  this.drawSquare();
                  break;
          }
      };
      return Logo;
  }());

  exports.Logo = Logo;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.js.map
