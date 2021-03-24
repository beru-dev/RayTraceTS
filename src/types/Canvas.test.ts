import Canvas from "./Canvas";
import { ColorOps } from "./Color";
const { color, colorEqual } = ColorOps;

// describe("", () => {
//     it("", () => expect().toEqual());
// });

describe("Creating a canvas. If canvas(10, 20)", () => {
    const c = new Canvas(10, 20);

    let areAllBlack = true;
    const black = color(0, 0, 0);
    for(let i = 0; i < c.pixels.length; i++) {
        if(!colorEqual(c.pixels[i], black)) {
            areAllBlack = false;
            break;
        }
    };

    it("canvas width is 10", () => expect(c.width).toEqual(10));
    it("canvas height is 20", () => expect(c.height).toEqual(20));
    it("every pixel of the canvas is black", () => expect(areAllBlack).toEqual(true));
});

describe("Writing pixels to a canvas", () => {
    const c = new Canvas(10, 20);
    const red = color(1, 0, 0);

    c.writePixel(2, 3, red);
    it("If c.writePixel(2, 3, red) then c.pixelAt(2, 3) should return red", () => expect(colorEqual(c.pixelAt(2, 3), red)).toEqual(true));
});

describe("Constructing the .ppm header", () => {
    const c = new Canvas(5, 3);
    const ppm = c.canvasToPpm();
    const ppmLines = ppm.split("\n");
    const ppmFirstThree = `${ppmLines[0]}\n${ppmLines[1]}\n${ppmLines[2]}\n`;
    it("If Canvas(5, 3) then lines 1 - 3 of ppm are\nP3\n5 3\n255\n", () => expect(ppmFirstThree).toEqual("P3\n5 3\n255\n"));
});

describe("If the canvas is 5x3 and we write color(1.5, 0, 0) at (0, 0), color(0, 0.5, 0) at (2, 1), color(-0.5, 0, 1) at (4, 2)", () => {
    const c = new Canvas(5, 3);
    const c1 = color(1.5, 0, 0);
    const c2 = color(0, 0.5, 0);
    const c3 = color(-0.5, 0, 1);

    c.writePixel(0, 0, c1);
    c.writePixel(2, 1, c2);
    c.writePixel(4, 2, c3);
    const ppm = c.canvasToPpm();
    const ppmLines = ppm.split("\n");
    const ppmPixelData = `${ppmLines[3]}\n${ppmLines[4]}\n${ppmLines[5]}\n`;
    const expectedPixelData: string = "255 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 128 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 0 0 0 0 0 0 255\n"
    it(`the the pixel data should be ${expectedPixelData}`, () => expect(ppmPixelData).toEqual(expectedPixelData));
});

describe("Splitting long lines in .ppm files. When every pixel is set to color(1, 0.8, 0.6)", () => {
    const c = new Canvas(10, 2);
    const col = color(1, 0.8, 0.6);
    for(let y = 0; y < 2; y++) {
        for(let x = 0; x < 10; x++) {
            c.writePixel(x, y, col);
        }
    }
    const ppm = c.canvasToPpm();
    const ppmLines = ppm.split("\n");
    const ppmPixelData = `${ppmLines[3]}\n${ppmLines[4]}\n${ppmLines[5]}\n${ppmLines[6]}\n`;
    const expectedPixelData: string = "255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204\n153 255 204 153 255 204 153 255 204 153 255 204 153\n255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204\n153 255 204 153 255 204 153 255 204 153 255 204 153\n";
    it(`the the pixel data should be ${expectedPixelData}`, () => expect(ppmPixelData).toEqual(expectedPixelData));
});

describe(".ppm files are terminated by a newline character", () => {
    const c = new Canvas(5, 3);
    const ppm = c.canvasToPpm();
    it("the last character is \\n", () => expect(ppm[ppm.length - 1]).toEqual("\n"));
});