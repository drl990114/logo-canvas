declare const defaults: options;
export declare type shape = 'square' | 'circle' | 'rounded';
export interface noEmptyOptions {
    canvas: HTMLCanvasElement | null;
    width: number;
    height: number;
    shape: shape;
    fontColor: string;
    backgroundColor: string;
    text: string;
    fontFamily: string;
    fontSize: number;
}
declare type Copy<T> = {
    [K in keyof T]?: T[K];
};
export declare type options = Copy<noEmptyOptions>;
export default defaults;
