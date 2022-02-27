(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Logo = factory());
})(this, (function () { 'use strict';

  const defaults = {
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

  function measureOffsets(text, fontFamily, fontSize, createCanvas) {
      const canvas = createCanvas();
      const ctx = canvas.getContext('2d');
      ctx.font = `${fontSize}px ${fontFamily}`;
      canvas.width = 2 * ctx.measureText(text).width;
      canvas.height = 2 * fontSize;
      ctx.font = `${fontSize}px ${fontFamily}`;
      canvas.width = 2 * ctx.measureText(text).width;
      canvas.height = 2 * fontSize;
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.textBaseline = 'alphabetic';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'white';
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let textTop = 0;
      let textBottom = 0;
      for (let y = 0; y <= canvas.height; y++) {
          for (let x = 0; x <= canvas.width; x++) {
              const rIndex = 4 * (canvas.width * y + x);
              const rValue = data[rIndex];
              if (rValue === 255) {
                  if (textTop === 0) {
                      textTop = y;
                  }
                  textBottom = y;
                  break;
              }
          }
      }
      const canvasHorizontalCenterLine = canvas.height / 2;
      const textHorizontalCenterLine = (textBottom - textTop) / 2 + textTop;
      let textLeft = 0;
      let textRight = 0;
      for (let x = 0; x <= canvas.width; x++) {
          for (let y = 0; y <= canvas.height; y++) {
              const rIndex = 4 * (canvas.width * y + x);
              const rValue = data[rIndex];
              if (rValue === 255) {
                  if (textLeft === 0) {
                      textLeft = x;
                  }
                  textRight = x;
                  break;
              }
          }
      }
      const canvasVerticalCenterLine = canvas.width / 2;
      const textVerticalCenterLine = (textRight - textLeft) / 2 + textLeft;
      return {
          vertical: canvasHorizontalCenterLine - textHorizontalCenterLine,
          horizontal: canvasVerticalCenterLine - textVerticalCenterLine
      };
  }

  class Logo {
      constructor(options = defaults) {
          const data = Object.assign({}, defaults, options);
          this.canvas =
              data.canvas != null ? data.canvas : document.createElement('canvas');
          this.createCanvas =
              data.createCanvas != null
                  ? data.createCanvas
                  : () => document.createElement('canvas');
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
          if (typeof window !== 'undefined') {
              this.canvas.style.width = `${this.width}px`;
              this.canvas.style.height = `${this.height}px`;
          }
          this.ctx.scale(2, 2);
      }
      drawLogo() {
          this.drawBackground();
          this.drawText();
          return this.canvas;
      }
      drawText() {
          this.ctx.fillStyle = this.fontColor;
          this.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
          this.ctx.textBaseline = 'alphabetic';
          this.ctx.textAlign = 'center';
          const offsets = measureOffsets(this.text, this.fontFamily, this.fontSize, this.createCanvas);
          console.log('offsets', offsets);
          const x = this.width / 2 + offsets.horizontal;
          const y = this.height / 2 + offsets.vertical;
          this.ctx.fillText(this.text, x, y);
      }
      drawRounded() {
          this.ctx.beginPath();
          const radius = this.height / 10;
          this.ctx.moveTo(this.width, this.height);
          this.ctx.arcTo(0, this.height, 0, 0, radius);
          this.ctx.arcTo(0, 0, this.width, 0, radius);
          this.ctx.arcTo(this.width, 0, this.width, this.height, radius);
          this.ctx.arcTo(this.width, this.height, 0, this.height, radius);
          this.ctx.fillStyle = this.backgroundColor;
          this.ctx.fill();
      }
      drawSquare() {
          this.ctx.beginPath();
          this.ctx.rect(0, 0, this.width, this.height);
          this.ctx.fillStyle = this.backgroundColor;
          this.ctx.fill();
      }
      drawCircle() {
          this.ctx.beginPath();
          this.ctx.arc(this.width / 2, this.height / 2, this.height / 2, 0, 2 * Math.PI, false);
          this.ctx.fillStyle = this.backgroundColor;
          this.ctx.fill();
      }
      drawBackground() {
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
      }
  }

  return Logo;

}));
//# sourceMappingURL=index.js.map
