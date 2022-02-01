const defaults: options = {
  canvas: document.createElement('canvas'),
  width: 128,
  height: 128,
  shape: 'square',
  fontColor: 'white',
  backgroundColor: 'black',
  text: 'C',
  fontFamily: 'Helvetica',
  fontSize: 64
}
export type shape = 'square' | 'circle' | 'rounded'
export interface options {
  canvas: HTMLCanvasElement
  width: number
  height: number
  shape: shape
  fontColor: string
  backgroundColor: string
  text: string
  fontFamily: string
  fontSize: number
}
export default defaults
