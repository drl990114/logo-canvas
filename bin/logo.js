#!/usr/bin/env node
const fs = require('fs')
const {
  init,
  hasOptionsFile,
  writeLogoFile,
  writeOptionsFile,
  getFnOptions,
  getFontList,
  registFont
} = require('./utils')

const optionsFileName = 'logo.json'
const hasfile = hasOptionsFile(optionsFileName)

if (!hasfile) {
  init().then((inputOptions) => {
    const { width, height, fontFamily } = inputOptions
    registFont(fontFamily)
    const options = {
      ...getFnOptions(width, height),
      ...inputOptions
    }
    writeOptionsFile(inputOptions)
    writeLogoFile(options)
  })
} else {
  fs.readFile(optionsFileName, (err, data) => {
    const inputOptions = JSON.parse(Buffer(data).toString())
    const { width, height, fontFamily } = inputOptions
    registFont(fontFamily)
    const options = {
      ...getFnOptions(width, height),
      ...inputOptions
    }
    writeLogoFile(options)
  })
}
getFontList()
