#!/usr/bin/env node
const { createCanvas } = require('canvas')
const fs = require('fs')
const {
  init,
  hasOptionsFile,
  wirteLogoFile,
  wirteOptionsFile
} = require('./utils')
const canvas = createCanvas(400, 400)
const createCanvasEl = () => createCanvas(400, 400)
const optionsFileName = 'logo.json'
const hasfile = hasOptionsFile(optionsFileName)
let options = {
  canvas,
  createCanvas: createCanvasEl
}
if (!hasfile) {
  init().then((inputOptions) => {
    options = {
      ...options,
      ...inputOptions
    }
    wirteOptionsFile(inputOptions)
    wirteLogoFile(options)
  })
} else {
  fs.readFile(optionsFileName, (err, data) => {
    const inputOptions = JSON.parse(Buffer(data).toString())
    options = {
      ...options,
      ...inputOptions
    }
    wirteLogoFile(options)
  })
}
