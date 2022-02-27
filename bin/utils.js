const input   = require('@inquirer/input')
const Logo    = require('../dist')
const fs      = require('fs-extra')
const path    = require('path')
const process = require('process')

function hasOptionsFile(optionsFileName) {
  console.log(process.cwd())
  return fs.existsSync(path.join(process.cwd(), optionsFileName))
}

// Initial options via user input
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
  const fontFamily = await input({
    message: 'Enter fontFamily',
    default: 'Helvetica'
  })
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
    fontFamily
  }
}

function wirteLogoFile(options) {
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
function wirteOptionsFile(options) {
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
  wirteLogoFile,
  wirteOptionsFile,
  hasOptionsFile
}
