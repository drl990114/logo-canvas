const defaults: options = {
  canvas: null,
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
export interface noEmptyOptions {
  canvas: HTMLCanvasElement | null
  width: number
  height: number
  shape: shape
  fontColor: string
  backgroundColor: string
  text: string
  fontFamily: string
  fontSize: number
  createCanvas: Function | undefined
}
type Copy<T> = { [K in keyof T]?: T[K] }
export type options = Copy<noEmptyOptions>
export default defaults
