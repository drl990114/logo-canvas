import { options, shape } from './default';
export declare class Logo {
    canvas: HTMLCanvasElement;
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
    drawLogo(): HTMLCanvasElement;
    drawText(): void;
    drawRounded(): void;
    drawSquare(): void;
    drawCircle(): void;
    drawBackground(): void;
}
