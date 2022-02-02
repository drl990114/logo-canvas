import { options, shape } from './default';
export declare class Logo {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    shape: shape;
    fontColor: any;
    backgroundColor: any;
    text: string;
    fontFamily: string;
    fontSize: number;
    constructor(options?: options);
    save(): void;
    drawText(): void;
    drawRounded(): void;
    drawSquare(): void;
    drawCircle(): void;
    drawBackground(): void;
}
