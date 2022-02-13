'use strict'

import defaults, { noEmptyOptions, options, shape } from './default'
import { measureOffsets } from './utils'

export class Logo {
  public canvas: HTMLCanvasElement
  public ctx: CanvasRenderingContext2D
  public width: number
  public height: number
  public shape: shape
  public fontColor: string | CanvasGradient | CanvasPattern
  public backgroundColor: string | CanvasGradient | CanvasPattern
  public text: string
  public fontFamily: string
  public fontSize: number
  public createCanvas: Function

  constructor (options: options = defaults) {
    const data = Object.assign({}, defaults, options) as noEmptyOptions
    this.canvas =
      data.canvas != null ? data.canvas : document.createElement('canvas')
    this.createCanvas =
      data.createCanvas != null
        ? data.createCanvas
        : () => document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.width = data.width
    this.height = data.height
    this.shape = data.shape
    this.fontColor = data.fontColor
    this.backgroundColor = data.backgroundColor
    this.text = data.text
    this.fontFamily = data.fontFamily
    this.fontSize = data.fontSize
    this.canvas.width = 2 * this.width
    this.canvas.height = 2 * this.height
    if (typeof window !== 'undefined') {
      this.canvas.style.width = `${this.width}px`
      this.canvas.style.height = `${this.height}px`
    }

    this.ctx.scale(2, 2)
  }

  drawLogo (): HTMLCanvasElement {
    this.drawBackground()
    this.drawText()
    return this.canvas
  }

  drawText (): void {
    this.ctx.fillStyle = this.fontColor
    this.ctx.font = `${this.fontSize}px ${this.fontFamily}`
    this.ctx.textBaseline = 'alphabetic'
    this.ctx.textAlign = 'center'
    const offsets = measureOffsets(
      this.text,
      this.fontFamily,
      this.fontSize,
      this.createCanvas
    )
    const x = this.width / 2 + offsets.horizontal
    const y = this.height / 2 + offsets.vertical
    this.ctx.fillText(this.text, x, y)
  }

  drawRounded (): void {
    this.ctx.beginPath()
    const radius = this.height / 10
    this.ctx.moveTo(this.width, this.height)
    this.ctx.arcTo(0, this.height, 0, 0, radius)
    this.ctx.arcTo(0, 0, this.width, 0, radius)
    this.ctx.arcTo(this.width, 0, this.width, this.height, radius)
    this.ctx.arcTo(this.width, this.height, 0, this.height, radius)
    this.ctx.fillStyle = this.backgroundColor
    this.ctx.fill()
  }

  drawSquare (): void {
    this.ctx.beginPath()
    this.ctx.rect(0, 0, this.width, this.height)
    this.ctx.fillStyle = this.backgroundColor
    this.ctx.fill()
  }

  drawCircle (): void {
    this.ctx.beginPath()
    this.ctx.arc(
      this.width / 2,
      this.height / 2,
      this.height / 2,
      0,
      2 * Math.PI,
      false
    )
    this.ctx.fillStyle = this.backgroundColor
    this.ctx.fill()
  }

  drawBackground (): void {
    switch (this.shape) {
      case 'square':
        this.drawSquare()
        break
      case 'circle':
        this.drawCircle()
        break
      case 'rounded':
        this.drawRounded()
        break
      default:
        this.drawSquare()
        break
    }
  }
}
