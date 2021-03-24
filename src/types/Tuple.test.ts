import { makeTuple, point, vector, add, subtract, negate, multScalar, divScalar, magnitude, tupleEqual, normalize, dot, cross } from "./Tuple";
import approxEqual from "../functions/approxEqual";

describe("Two numbers are approximately equal if they are within .00001 of each other", () => {
    it("1 and 1.000009 are approximately equal", () => expect(approxEqual(1, 1.000009)).toEqual(true));
    it("1 and 1.000011 are not approximately equal", () => expect(approxEqual(1, 1.000011)).not.toEqual(true));
});

describe("Two tuples are approximately equal their respective values are all within .00001 of each other", () => {
    const t1 = makeTuple(1, 2, 3, 0);
    const t2 = makeTuple(1, 2, 3.000009, 0);
    const t3 = makeTuple(1, 2.1, 3, 0);
    it("makeTuple(1, 2, 3, 0) and makeTuple() are approximately equal", () => expect(tupleEqual(t1, t2)).toEqual(true));
    it("makeTuple(1, 2, 3, 0) and makeTuple() are not approximately equal", () => expect(tupleEqual(t1, t3)).not.toEqual(true));
});

describe("Given a = makeTuple(4.3, -4.2, 3.1, 1), a is a point", () => {
    let a: any;

    beforeEach(() => {
        a = makeTuple(4.3, -4.2, 3.1, 1);
    });

    it("a[0] = 4.3", () => expect(a[0]).toEqual(4.3));
    it("a[1] = -4.2", () => expect(a[1]).toEqual(-4.2));
    it("a[2] = 3.1", () => expect(a[2]).toEqual(3.1));
    it("a is a point", () => expect(a[3]).toEqual(1));
    it("a is not a vector", () => expect(a[3]).not.toEqual(0));
});

describe("Given a = makeTuple(4.3, -4.2, 3.1, 0), a is a vector", () => {
    let a: any;

    beforeEach(() => {
        a = makeTuple(4.3, -4.2, 3.1, 0);
    });

    it("a[0] = 4.3", () => expect(a[0]).toEqual(4.3));
    it("a[1] = -4.2", () => expect(a[1]).toEqual(-4.2));
    it("a[2] = 3.1", () => expect(a[2]).toEqual(3.1));
    it("a is not a point", () => expect(a[3]).not.toEqual(1));
    it("a is a vector", () => expect(a[3]).toEqual(0));
});

describe("Given p = point(4, -4, 3), p is a point", () => {
    const p = point(4, -4, 3);
    it("point(4, -4, 3)[3] = 1", () => expect(p[3]).toEqual(1));
});

describe("Given v = vector(4, -4, 3), v is a vector", () => {
    const v = vector(4, -4, 3);
    it("vector(4, -4, 3)[3] = 0", () => expect(v[3]).toEqual(0));
});

describe("Adding two tuples, given a1 = makeTuple() and a2 = makeTuple()", () => {
    const a1 = makeTuple(3, -2, 5, 1);
    const a2 = makeTuple(-2, 3, 1, 0);
    it("makeTuple(3, -2, 5, 1) + makeTuple(-2, 3, 1, 0) = makeTuple(1, 1, 6, 1)", () => expect(add(a1, a2)).toEqual(makeTuple(1, 1, 6, 1)));
});

describe("Subtracting two points", () => {
    const p1 = point(3, 2, 1);
    const p2 = point(5, 6, 7);
    it("point(3, 2, 1) - point(5, 6, 7) = vector(-2, -4, -6)", () => expect(subtract(p1, p2)).toEqual(vector(-2, -4, -6)));
});

describe("Subtracting a vector from a point", () => {
    const p = point(3, 2, 1);
    const v = vector(5, 6, 7);
    it("point(3, 2, 1) - vector(5, 6, 7) = point(-2, -4, -6)", () => expect(subtract(p, v)).toEqual(point(-2, -4, -6)));
});

describe("Subtracting two vectors", () => {
    const v1 = vector(3, 2, 1);
    const v2 = vector(5, 6, 7);
    it("vector(3, 2, 1) - vector(5, 6, 7) = vector(-2, -4, -6)", () => expect(subtract(v1, v2)).toEqual(vector(-2, -4, -6)));
});

describe("Subtracting a vector from the zero vector", () => {
    const zero = vector(0, 0, 0);
    const v = vector(1, -2, 3);
    it("vector(0, 0, 0) - vector(1, -2, 3) = vector(-1, 2, -3)", () => expect(subtract(zero, v)).toEqual(vector(-1, 2, -3)));
});

describe("Negating a tuple", () => {
    const a = makeTuple(1, -2, 3, -4);
    it("-makeTuple(1, -2, 3, -4) = makeTuple(-1, 2, -3, 4)", () => expect(negate(a)).toEqual(makeTuple(-1, 2, -3, 4)));
});

describe("Multiplying a tuple by a scalar", () => {
    let a: any;
    beforeEach(() => a = makeTuple(1, -2, 3, -4));
    
    it("makeTuple(1, -2, 3, -4) * 3.5 = makeTuple(3.5, -7, 10.5, -14)", () => expect(multScalar(a, 3.5)).toEqual(makeTuple(3.5, -7, 10.5, -14)));
    it("makeTuple(1, -2, 3, -4) * 0.5 = makeTuple(0.5, -1, 1.5, -2)", () => expect(multScalar(a, 0.5)).toEqual(makeTuple(0.5, -1, 1.5, -2)));
});

describe("Dividing a tuple by a scalar", () => {
    const a = makeTuple(1, -2, 3, -4);
    it("makeTuple(1, -2, 3, -4) / 2 = makeTuple(0.5, -1, 1.5, -2)", () => expect(divScalar(a, 2)).toEqual(makeTuple(0.5, -1, 1.5, -2)));
});

describe("Computing the magnitude of a vector", () => {
    it("The magnitude of vector(1, 0, 0) equals 1", () => expect(magnitude(vector(1, 0, 0))).toEqual(1));
    it("The magnitude of vector(0, 1, 0) equals 1", () => expect(magnitude(vector(0, 1, 0))).toEqual(1));
    it("The magnitude of vector(0, 0, 1) equals 1", () => expect(magnitude(vector(0, 0, 1))).toEqual(1));
    it("The magnitude of vector(1, 2, 3) equals sqr 14", () => expect(approxEqual(magnitude(vector(1, 2, 3)), Math.sqrt(14))).toEqual(true));
    it("The magnitude of vector(-1, -2, -3) equals sqr 14", () => expect(approxEqual(magnitude(vector(-1, -2, -3)), Math.sqrt(14))).toEqual(true));
});

describe("Normalizing vectors", () => {
    const v1 = vector(4, 0, 0);
    const v2 = vector(1, 0, 0);
    it("vector(4, 0, 0) normalized equals vector(1, 0, 0)", () => expect(normalize(v1)).toEqual(v2));

    const v3 = vector(1, 2, 3);
    const v4 = vector(0.26726, 0.53452, 0.80178);
    it("vector(1, 2, 3) normalized approximately equals vector(0.26726, 0.53452, 0.80178)", () => expect(tupleEqual(normalize(v3), v4)).toEqual(true));
    it("The magnitude of normalized vector(1, 2, 3) is equal to 1", () => expect(magnitude(normalize(v3))).toEqual(1));
});

describe("The dot product", () => {
    const v1 = vector(1, 2, 3);
    const v2 = vector(2, 3, 4);
    it("dot(vector(1, 2, 3), vector(2, 3, 4)) is 20", () => expect(dot(v1, v2)).toEqual(20));
});

describe("The cross product", () => {
    const v1 = vector(1, 2, 3);
    const v2 = vector(2, 3, 4);
    it("cross(vector(1, 2, 3), vector(2, 3, 4)) equals vector(-1, 2, -1)", () => expect(cross(v1, v2)).toEqual(vector(-1, 2, -1)));
    it("cross(vector(2, 3, 4), vector(1, 2, 3)) equals vector(1, -2, 1)", () => expect(cross(v2, v1)).toEqual(vector(1, -2, 1)));
})