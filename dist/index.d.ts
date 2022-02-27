import { Canvas } from 'canvas';
import { options, shape } from './default';
declare class Logo {
    canvas: HTMLCanvasElement | Canvas;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    shape: shape;
    fontColor: string | CanvasGradient | CanvasPattern;
    backgroundColor: string | CanvasGradient | CanvasPattern;
    text: string;
    fontFamily: string;
    fontSize: number;
    createCanvas: Function;
    constructor(options?: options);
    drawLogo(): HTMLCanvasElement | Canvas;
    drawText(): void;
    drawRounded(): void;
    drawSquare(): void;
    drawCircle(): void;
    drawBackground(): void;
}
export default Logo;
