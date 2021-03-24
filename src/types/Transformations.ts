import { Matrix } from "./Matrix";

export const translation = (x: number, y: number, z: number): Matrix => {
    return new Matrix(4, 4, [
        1, 0, 0, x,
        0, 1, 0, y,
        0, 0, 1, z,
        0, 0, 0, 1
    ]);
};

export const scaling = (x: number, y: number, z: number): Matrix => {
    return new Matrix(4, 4, [
        x, 0, 0, 0,
        0, y, 0, 0,
        0, 0, z, 0,
        0, 0, 0, 1
    ]);
};

export const rotationX = (r: number): Matrix => {
    return new Matrix(4, 4, [
        1, 0, 0, 0,
        0, Math.cos(r), -Math.sin(r), 0,
        0, Math.sin(r), Math.cos(r), 0,
        0, 0, 0, 1
    ]);
};

export const rotationY = (r: number): Matrix => {
    return new Matrix(4, 4, [
        Math.cos(r), 0, Math.sin(r), 0,
        0, 1, 0, 0,
        -Math.sin(r), 0, Math.cos(r), 0,
        0, 0, 0, 1
    ]);
};

export const rotationZ = (r: number): Matrix => {
    return new Matrix(4, 4, [
        Math.cos(r), -Math.sin(r), 0, 0,
        Math.sin(r), Math.cos(r), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);
};

export const shearing = (xy: number, xz: number, yx: number, yz: number, zx: number, zy: number): Matrix => {
    return new Matrix(4, 4, [
        1, xy, xz, 0,
        yx, 1, yz, 0,
        zx, zy, 1, 0,
        0, 0, 0, 1
    ]);
};