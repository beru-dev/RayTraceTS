import { translation, scaling, rotationX, rotationY, rotationZ, shearing } from "./Transformations";
import { Matrix, dotTuple, inverse, dotProduct } from "./Matrix";
import { point, vector, tupleEqual } from "./Tuple";

describe("Multiplying by a translation matrix", () => {
    const transform: Matrix = translation(5, -3, 2);
    const p = point(-3, 4, 5);
    const translated = point(2, 1, 7);

    it(`${transform.toString()} * ${p} = ${translated}`, () => expect(dotTuple(transform, p)).toEqual(translated));
});

describe("Multiplying by the inverse of a translation matrix", () => {
    const transform: Matrix = translation(5, -3, 2);
    const inv = inverse(transform);
    const p = point(-3, 4, 5);
    const translated = point(-8, 7, 3);

    it(`${inv.toString()} * ${p} = ${translated}`, () => expect(dotTuple(inv, p)).toEqual(translated));
});

describe("Translation does not affect vectors", () => {
    const transform: Matrix = translation(5, -3, 2);
    const v = vector(-3, 4, 5);

    it(`${transform.toString()} * ${v} = ${v}`, () => expect(dotTuple(transform, v)).toEqual(v));
});

describe("A scaling matrix applied to a point", () => {
    const transform = scaling(2, 3, 4);
    const p = point(-4, 6, 8);
    const scaled = point(-8, 18, 32);

    it(`${transform.toString()} * ${p} = ${scaled}`, () => expect(dotTuple(transform, p)).toEqual(scaled));
});

describe("A scaling matrix applied to a vector", () => {
    const transform = scaling(2, 3, 4);
    const p = vector(-4, 6, 8);
    const scaled = vector(-8, 18, 32);

    it(`${transform.toString()} * ${p} = ${scaled}`, () => expect(dotTuple(transform, p)).toEqual(scaled));
});

describe("Multiplying by the inverse of a scaling matrix", () => {
    const transform = scaling(2, 3, 4);
    const inv = inverse(transform);
    const v = vector(-4, 6, 8);
    const result = vector(-2, 2, 2);
    it(`${inv.toString()} * ${v} = ${result}`, () => expect(dotTuple(inv, v)).toEqual(result));
});

describe("Reflection is scaling by a negative value", () => {
    const transform = scaling(-1, 1, 1);
    const p = point(2, 3, 4);
    const result = point(-2, 3, 4);
    it(`${transform} * ${p} = ${result}`, () => expect(dotTuple(transform, p)).toEqual(result));
});

describe("Rotating a point around the x axis", () => {
    const p = point(0, 1, 0);
    const halfQuarter: Matrix = rotationX(Math.PI / 4);
    const fullQuarter: Matrix = rotationX(Math.PI / 2);
    const halfRes = point(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2);
    const fullRes = point(0, 0, 1);

    it(`${halfQuarter} * ${p} = ${halfRes}`, () => expect(tupleEqual(dotTuple(halfQuarter, p), halfRes)).toEqual(true));
    it(`${fullQuarter} * ${p} = ${fullRes}`, () => expect(tupleEqual(dotTuple(fullQuarter, p), fullRes)).toEqual(true));
});

describe("The inverse of an x-rotation rotates in the opposite direction", () => {
    const p = point(0, 1, 0);
    const invHalfQuarter: Matrix = inverse(rotationX(Math.PI / 4));
    const halfRes = point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2);

    it(`${invHalfQuarter} * ${p} = ${halfRes}`, () => expect(tupleEqual(dotTuple(invHalfQuarter, p), halfRes)).toEqual(true));
});

describe("Rotating a point around the y axis", () => {
    const p = point(0, 0, 1);
    const halfQuarter: Matrix = rotationY(Math.PI / 4);
    const fullQuarter: Matrix = rotationY(Math.PI / 2);
    const halfRes = point(Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2);
    const fullRes = point(1, 0, 0);

    it(`${halfQuarter} * ${p} = ${halfRes}`, () => expect(tupleEqual(dotTuple(halfQuarter, p), halfRes)).toEqual(true));
    it(`${fullQuarter} * ${p} = ${fullRes}`, () => expect(tupleEqual(dotTuple(fullQuarter, p), fullRes)).toEqual(true));
});

describe("Rotating a point around the z axis", () => {
    const p = point(0, 1, 0);
    const halfQuarter: Matrix = rotationZ(Math.PI / 4);
    const fullQuarter: Matrix = rotationZ(Math.PI / 2);
    const halfRes = point(-Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0);
    const fullRes = point(-1, 0, 0);

    it(`${halfQuarter} * ${p} = ${halfRes}`, () => expect(tupleEqual(dotTuple(halfQuarter, p), halfRes)).toEqual(true));
    it(`${fullQuarter} * ${p} = ${fullRes}`, () => expect(tupleEqual(dotTuple(fullQuarter, p), fullRes)).toEqual(true));
});

describe("A shearing transformation moves x in proportion to y", () => {
    const transform: Matrix = shearing(1, 0, 0, 0, 0, 0);
    const p = point(2, 3, 4);
    const result = point(5, 3, 4);

    it(`${transform.toString()} * ${p} = ${result}`, () => expect(dotTuple(transform, p)).toEqual(result));
});

describe("A shearing transformation moves x in proportion to z", () => {
    const transform: Matrix = shearing(0, 1, 0, 0, 0, 0);
    const p = point(2, 3, 4);
    const result = point(6, 3, 4);

    it(`${transform.toString()} * ${p} = ${result}`, () => expect(dotTuple(transform, p)).toEqual(result));
});

describe("A shearing transformation moves y in proportion to x", () => {
    const transform: Matrix = shearing(0, 0, 1, 0, 0, 0);
    const p = point(2, 3, 4);
    const result = point(2, 5, 4);

    it(`${transform.toString()} * ${p} = ${result}`, () => expect(dotTuple(transform, p)).toEqual(result));
});

describe("A shearing transformation moves y in proportion to z", () => {
    const transform: Matrix = shearing(0, 0, 0, 1, 0, 0);
    const p = point(2, 3, 4);
    const result = point(2, 7, 4);

    it(`${transform.toString()} * ${p} = ${result}`, () => expect(dotTuple(transform, p)).toEqual(result));
});

describe("A shearing transformation moves z in proportion to x", () => {
    const transform: Matrix = shearing(0, 0, 0, 0, 1, 0);
    const p = point(2, 3, 4);
    const result = point(2, 3, 6);

    it(`${transform.toString()} * ${p} = ${result}`, () => expect(dotTuple(transform, p)).toEqual(result));
});

describe("A shearing transformation moves z in proportion to y", () => {
    const transform: Matrix = shearing(0, 0, 0, 0, 0, 1);
    const p = point(2, 3, 4);
    const result = point(2, 3, 7);

    it(`${transform.toString()} * ${p} = ${result}`, () => expect(dotTuple(transform, p)).toEqual(result));
});

describe("Individual transformations are applied in sequence", () => {
    const p = point(1, 0, 1);
    const A = rotationX(Math.PI / 2);
    const B = scaling(5, 5, 5);
    const C = translation(10, 5, 7);

    // apply rotation first
    const p2 = dotTuple(A, p);
    const p2e = point(1, -1, 0);
    it(`${p2} = ${p2e}`, () => expect(tupleEqual(p2, p2e)).toEqual(true));

    // then apply scaling
    const p3 = dotTuple(B, p2);
    const p3e = point(5, -5, 0);
    it(`${p3} = ${p3e}`, () => expect(tupleEqual(p3, p3e)).toEqual(true));

    // then apply translation
    const p4 = dotTuple(C, p3);
    const p4e = point(15, 0, 7);
    it(`${p4} = ${p4e}`, () => expect(p4).toEqual(p4e));
});

describe("Chained transformations must be applied in reverse order", () => {
    const p = point(1, 0, 1);
    const A = rotationX(Math.PI / 2);
    const B = scaling(5, 5, 5);
    const C = translation(10, 5, 7);
    const T = dotProduct(C, dotProduct(B, A));
    const result = dotTuple(T, p);
    const expected =  point(15, 0, 7);
    it(`${T} * ${p} = ${expected}`, () => expect(result).toEqual(expected));
});

// describe("", () => {
//     it(``, () => expect().toEqual());
// });