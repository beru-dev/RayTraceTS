import { makeTuple, point, vector, add, subtract, negate, multScalar, divScalar, magnitude, tupleEqual, normalize, dot, cross, reflect } from "./Tuple";
import approxEqual from "../functions/approxEqual";

describe("Testing tuples", () => {
    it("Two numbers are approximately equal if they are within .00001 of each other", () => {
        expect(approxEqual(1, 1.000009)).toEqual(true);
        expect(approxEqual(1, 1.000011)).not.toEqual(true);
    });

    it("Two tuples are approximately equal their respective values are all within .00001 of each other", () => {
        const t1 = makeTuple(1, 2, 3, 0);
        const t2 = makeTuple(1, 2, 3.000009, 0);
        const t3 = makeTuple(1, 2.1, 3, 0);

        expect(tupleEqual(t1, t2)).toEqual(true);
        expect(tupleEqual(t1, t3)).not.toEqual(true);
    });

    it("Given a = makeTuple(4.3, -4.2, 3.1, 1), a is a point", () => {
        const a = makeTuple(4.3, -4.2, 3.1, 1);

        expect(a[0]).toEqual(4.3)
        expect(a[1]).toEqual(-4.2)
        expect(a[2]).toEqual(3.1)
        expect(a[3]).toEqual(1)
        expect(a[3]).not.toEqual(0)
    });

    it("Given a = makeTuple(4.3, -4.2, 3.1, 0), a is a vector", () => {
        const a = makeTuple(4.3, -4.2, 3.1, 0);

        expect(a[0]).toEqual(4.3);
        expect(a[1]).toEqual(-4.2);
        expect(a[2]).toEqual(3.1);
        expect(a[3]).not.toEqual(1);
        expect(a[3]).toEqual(0);
    });

    it("Given p = point(4, -4, 3), p is a point", () => {
        const p = point(4, -4, 3);

        expect(p[3]).toEqual(1)
    });

    it("Given v = vector(4, -4, 3), v is a vector", () => {
        const v = vector(4, -4, 3);

        expect(v[3]).toEqual(0)
    });

    it("Adding two tuples, given a1 = makeTuple() and a2 = makeTuple()", () => {
        const a1 = makeTuple(3, -2, 5, 1);
        const a2 = makeTuple(-2, 3, 1, 0);

        expect(add(a1, a2)).toEqual(makeTuple(1, 1, 6, 1))
    });

    it("Subtracting two points", () => {
        const p1 = point(3, 2, 1);
        const p2 = point(5, 6, 7);

        expect(subtract(p1, p2)).toEqual(vector(-2, -4, -6))
    });

    it("Subtracting a vector from a point", () => {
        const p = point(3, 2, 1);
        const v = vector(5, 6, 7);

        expect(subtract(p, v)).toEqual(point(-2, -4, -6))
    });

    it("Subtracting two vectors", () => {
        const v1 = vector(3, 2, 1);
        const v2 = vector(5, 6, 7);

        expect(subtract(v1, v2)).toEqual(vector(-2, -4, -6))
    });

    it("Subtracting a vector from the zero vector", () => {
        const zero = vector(0, 0, 0);
        const v = vector(1, -2, 3);

        expect(subtract(zero, v)).toEqual(vector(-1, 2, -3))
    });

    it("Multiplying a tuple by a scalar", () => {
        let a = makeTuple(1, -2, 3, -4);

        expect(multScalar(a, 3.5)).toEqual(makeTuple(3.5, -7, 10.5, -14));
        expect(multScalar(a, 0.5)).toEqual(makeTuple(0.5, -1, 1.5, -2));
    });

    it("Negating a tuple", () => {
        const a = makeTuple(1, -2, 3, -4);

        expect(negate(a)).toEqual(makeTuple(-1, 2, -3, 4))
    });

    it("Dividing a tuple by a scalar", () => {
        const a = makeTuple(1, -2, 3, -4);

        expect(divScalar(a, 2)).toEqual(makeTuple(0.5, -1, 1.5, -2))
    });

    it("Computing the magnitude of a vector", () => {
        expect(magnitude(vector(1, 0, 0))).toEqual(1);
        expect(magnitude(vector(0, 1, 0))).toEqual(1);
        expect(magnitude(vector(0, 0, 1))).toEqual(1);
        expect(approxEqual(magnitude(vector(1, 2, 3)), Math.sqrt(14))).toEqual(true);
        expect(approxEqual(magnitude(vector(-1, -2, -3)), Math.sqrt(14))).toEqual(true);
    });

    it("Normalizing vectors", () => {
        const v1 = vector(4, 0, 0);
        const v2 = vector(1, 0, 0);
        const v3 = vector(1, 2, 3);
        const v4 = vector(0.26726, 0.53452, 0.80178);

        expect(normalize(v1)).toEqual(v2);
        expect(tupleEqual(normalize(v3), v4)).toEqual(true);
        expect(magnitude(normalize(v3))).toEqual(1);
    });

    it("The dot product", () => {
        const v1 = vector(1, 2, 3);
        const v2 = vector(2, 3, 4);

        expect(dot(v1, v2)).toEqual(20)
    });

    it("The cross product", () => {
        const v1 = vector(1, 2, 3);
        const v2 = vector(2, 3, 4);

        expect(cross(v1, v2)).toEqual(vector(-1, 2, -1));
        expect(cross(v2, v1)).toEqual(vector(1, -2, 1));
    });

    it("Reflecting a vector approaching at 45deg", () => {
        const v = vector(1, -1, 0);
        const n = vector(0, 1, 0);
        const r = reflect(v, n);
        const expected = vector(1, 1, 0);

        expect(tupleEqual(r, expected)).toEqual(true);
    });

    it("Reflecting a vector off a slanted surface", () => {
        const v = vector(0, -1, 0);
        const n = vector(Math.SQRT2 / 2, Math.SQRT2 / 2, 0);
        const r = reflect(v, n);
        const expected = vector(1, 0, 0);

        expect(tupleEqual(r, expected)).toEqual(true);
    });
});