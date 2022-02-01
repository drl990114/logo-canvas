interface offsets {
  vertical: number
  horizontal: number
}
export function measureOffsets (
  text: string,
  fontFamily: string,
  fontSize: number,
  canvas,
  ctx
): offsets {
  ctx.font = `${fontSize}px${fontFamily}`

  canvas.width = 2 * ctx.measureText(text).width
  canvas.height = 2 * fontSize

  ctx.font = `${fontSize}px${fontFamily}`
  ctx.textBaseline = 'alphabetic'
  ctx.textAlign = 'center'
  ctx.fillStyle = 'white'
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)

  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data

  let textTop = 0
  let textBottom = 0
  for (let y = 0; y <= canvas.height; y++) {
    for (let x = 0; x <= canvas.width; x++) {
      const rIndex = 4 * (canvas.width * y + x)
      const rValue = data[rIndex]
      if (rValue === 255) {
        if (textTop === 0) {
          textTop = y
        }
        textBottom = y
        break
      }
    }
  }

  const canvasHorizontalCenterLine = canvas.height / 2
  const textHorizontalCenterLine = (textBottom - textTop) / 2 + textTop

  let textLeft = 0
  let textRight = 0
  for (let x = 0; x <= canvas.width; x++) {
    for (let y = 0; y <= canvas.height; y++) {
      const rIndex = 4 * (canvas.width * y + x)
      const rValue = data[rIndex]

      if (rValue === 255) {
        if (textTop === 0) {
          textLeft = x
        }
        textRight = x
        break
      }
    }
  }

  const canvasVerticalCenterLine = canvas.width / 2
  const textVerticalCenterLine = (textRight - textLeft) / 2 + textLeft

  return {
    vertical: canvasHorizontalCenterLine - textHorizontalCenterLine,
    horizontal: canvasVerticalCenterLine - textVerticalCenterLine
  }
}
