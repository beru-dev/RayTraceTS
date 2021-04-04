import approxEqual from "../functions/approxEqual";

export type Tuple = [number, number, number, number];

export const tupleEqual = (t1: Tuple, t2: Tuple): boolean => {
    if(
        approxEqual(t1[0], t2[0]) &&
        approxEqual(t1[1], t2[1]) &&
        approxEqual(t1[2], t2[2]) &&
        t1[3] - t2[3] === 0
    ) {
        return true;
    } else {
        return false;
    }
}

export const makeTuple = (x: number, y: number, z: number, w: number): Tuple => {
    return [x, y, z, w];
}

export const point = (x: number, y: number, z: number): Tuple => {
    return [x, y, z, 1];
}

export const vector = (x: number, y: number, z: number): Tuple => {
    return [x, y, z, 0];
}

export const add = (t1: Tuple, t2: Tuple): Tuple => {
    return [
        t1[0] + t2[0],
        t1[1] + t2[1],
        t1[2] + t2[2],
        t1[3] + t2[3]
    ];
}

export const subtract = (p1: Tuple, p2: Tuple): Tuple => {
    return [
        p1[0] - p2[0],
        p1[1] - p2[1],
        p1[2] - p2[2],
        p1[3] - p2[3]
    ];
}

export const negate = (tuple: Tuple): Tuple => {
    return [
        -tuple[0],
        -tuple[1],
        -tuple[2],
        -tuple[3]
    ];
}

export const multScalar = (tuple: Tuple, scalar: number): Tuple => {
    return [
        tuple[0] * scalar,
        tuple[1] * scalar,
        tuple[2] * scalar,
        tuple[3] * scalar
    ];
}

export const divScalar = (tuple: Tuple, scalar: number): Tuple => {
    return [
        tuple[0] / scalar,
        tuple[1] / scalar,
        tuple[2] / scalar,
        tuple[3] / scalar
    ];
}

export const magnitude = (tuple: Tuple): number => {
    return Math.sqrt(
        tuple[0] * tuple[0] +
        tuple[1] * tuple[1] +
        tuple[2] * tuple[2]
    );
}

export const normalize = (tuple: Tuple): Tuple => {
    const mag: number = magnitude(tuple);
    return [
        tuple[0] / mag,
        tuple[1] / mag,
        tuple[2] / mag,
        tuple[3] / mag
    ];
}

export const dot = (t1: Tuple, t2: Tuple): number => {
    return t1[0] * t2[0] + 
    t1[1] * t2[1] + 
    t1[2] * t2[2] + 
    t1[3] * t2[3];
}

export const cross = (t1: Tuple, t2: Tuple): Tuple => {
    return [
        t1[1] * t2[2] - t1[2] * t2[1],
        t1[2] * t2[0] - t1[0] * t2[2],
        t1[0] * t2[1] - t1[1] * t2[0],
        0
    ];
}

export const reflect = (approaching: Tuple, normal: Tuple): Tuple => {
    return subtract(approaching, multScalar(normal, 2 * dot(approaching, normal)));
}