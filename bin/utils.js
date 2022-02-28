const input = require('@inquirer/input')
const { prompt } = require('inquirer')
const Logo = require('../dist')
const fs = require('fs-extra')
const path = require('path')
const process = require('process')
const { Canvas, registerFont } = require('canvas')


// Initial options via user input
// -----------------------------------------------------------------------------------
async function init() {
  const text = await input({
    message: 'Enter text',
    default: require('../package.json').name || 'logo'
  })
  const backgroundColor = await input({
    message: 'Enter backgroundColor',
    default: '#C70039'
  })
  const shape = await input({ message: 'Enter shape', default: 'square' })
  const width = await input({ message: 'Enter width', default: 128 })
  const height = await input({ message: 'Enter height', default: 128 })
  const fontSize = await input({ message: 'Enter fontSize', default: 64 })
  const fontList = await getFontList()
  const fontFamily = await prompt([
    {
      type: 'list',
      name: 'fontFamily',
      message: 'Enter fontFamily',
      choices: fontList
    }
  ])
  const fontColor = await input({
    message: 'Enter fontColor',
    default: 'white'
  })

  return {
    fontColor,
    backgroundColor,
    text,
    shape,
    width,
    height,
    fontSize,
    ...fontFamily
  }
}

function hasOptionsFile(optionsFileName) {
  return fs.existsSync(path.join(process.cwd(), optionsFileName))
}

function getFnOptions(width, height) {
  const canvas = new Canvas(width, height)
  const createCanvasEl = () => new Canvas(width, height)
  return {
    canvas,
    createCanvas: createCanvasEl
  }
}


// font
// -----------------------------------------------------------------------------------
async function getFontList() {
  const fontFiles = await fs.readdir('fonts')
  return fontFiles.map((fileName) => fileName.split('.')[0])
}
function registFont(font) {
  registerFont(`./fonts/${font}.ttf`, { family: font })
}


// writefile
// -----------------------------------------------------------------------------------
function writeLogoFile(options) {
  const logo = new Logo(options)
  const png = logo.drawLogo()
  const buffer = png.toBuffer('image/png')

  try {
    fs.writeFile('logo.png', buffer, (err) => {
      if (err) throw new Error(String(err))
    })
  } catch (err) {
    console.log(err)
  }
}
function writeOptionsFile(options) {
  try {
    fs.writeFile('logo.json', JSON.stringify(options), (err) => {
      if (err) throw new Error(String(err))
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  init,
  writeLogoFile,
  writeOptionsFile,
  hasOptionsFile,
  getFnOptions,
  getFontList,
  registFont
}
