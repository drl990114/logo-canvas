#!/usr/bin/env node
const fs = require('fs')
const { createCanvas } = require('canvas')
const { Logo } = require('../dist')
const canvas = createCanvas(200, 200)
const createCanvasEl = () => createCanvas(200, 200)
const logo = new Logo({
  canvas,
  createCanvas: createCanvasEl,
  backgroundColor: 'blue'
})
const png = logo.drawLogo()

const buffer = png.toBuffer('image/png')
try {
  fs.writeFile('logo.png', buffer, (err) => {
    if (err) throw new Error(String(err))
  })
} catch (err) {
  console.log(err)
}
