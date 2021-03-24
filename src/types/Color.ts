import approxEqual from "../functions/approxEqual";

export type Color = [number, number, number];

export const colorEqual = (c1: Color, c2: Color): boolean => {
    if(
        approxEqual(c1[0], c2[0]) &&
        approxEqual(c1[1], c2[1]) &&
        approxEqual(c1[2], c2[2])
    ) {
        return true;
    } else {
        return false;
    }
};

export const color = (red: number, green: number, blue: number): Color => {
    return [red, green, blue];
};

export const addCol = (c1: Color, c2: Color): Color => {
    return [
        c1[0] + c2[0],
        c1[1] + c2[1],
        c1[2] + c2[2]
    ];
};

export const subtractCol = (c1: Color, c2: Color): Color => {
    return [
        c1[0] - c2[0],
        c1[1] - c2[1],
        c1[2] - c2[2]
    ];
};

export const multiplyCol = (c1: Color, c2: Color): Color => {
    return [
        c1[0] * c2[0],
        c1[1] * c2[1],
        c1[2] * c2[2]
    ];
};

export const multScalarCol = (color: Color, scalar: number): Color => {
    return [
        color[0] * scalar,
        color[1] * scalar,
        color[2] * scalar
    ];
};

export const convertColorValue = (colorNum: number): number => {
    if(colorNum > 1) {
        colorNum = 1;
    } else if(colorNum < 0) {
        colorNum = 0;
    }
    return Math.round(colorNum * 255);
};

export const convertColorData = (color: Color): Color => {
    return [
        convertColorValue(color[0]),
        convertColorValue(color[1]),
        convertColorValue(color[2])
    ];
};