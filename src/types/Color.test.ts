import { color, addCol, subtractCol, multScalarCol, colorEqual, multiplyCol, convertColorValue } from "./Color";

// describe("", () => {
//     it("", () => expect().toEqual());
// });

describe("Colors are (red, green, blue) tuples. For c = color(-0.5, 0.4, 1.7)", () => {
    const c = color(-0.5, 0.4, 1.7);

    it("c[0] = -0.5", () => expect(c[0]).toEqual(-0.5));
    it("c[1] = 0.4", () => expect(c[1]).toEqual(0.4));
    it("c[2] = 1.7", () => expect(c[2]).toEqual(1.7));
});

describe("Color math", () => {
    const c1 = color(0.9, 0.6, 0.75);
    const c2 = color(0.7, 0.1, 0.25);
    const c3 = color(0.2, 0.3, 0.4);

    it("color(0.9, 0.6, 0.75) + color(0.7, 0.1, 0.25) = color(1.6, 0.7, 1)", () => expect(addCol(c1, c2)).toEqual(color(1.6, 0.7, 1)));
    it("color(0.9, 0.6, 0.75) - color(0.7, 0.1, 0.25) = color(0.2, 0.5, 0.5)", () => expect(colorEqual(subtractCol(c1, c2), color(0.2, 0.5, 0.5))).toEqual(true));
    it("color(0.2, 0.5, 0.5) * 2 = color(0.4, 0.6, 0.8)", () => expect(multScalarCol(c3, 2)).toEqual(color(0.4, 0.6, 0.8)));
});

describe("Multiplying colors", () => {
    const c1 = color(1, 0.2, 0.4);
    const c2 = color(0.9, 1, 0.1);
    const c3 = color(0.9, 0.2, 0.04);

    const multColors = multiplyCol(c1, c2);
    it("color(1, 0.2, 0.4) * color(0.9, 1, 0.1) = color(0.9, 0.2, 0.04)", () => expect(colorEqual(multColors, c3)).toEqual(true));
});

describe("Convert colors from the 0-1 to whole numbers 0-255", () => {
    const c1 = convertColorValue(-1);
    const c2 = convertColorValue(.5);
    const c3 = convertColorValue(1.1);

    it("colors below 0 should clamp to 0", () => expect(c1).toEqual(0));
    it(".5 should convert to 128", () => expect(c2).toEqual(128));
    it("colors above 1 should clamp to 255", () => expect(c3).toEqual(255));
});