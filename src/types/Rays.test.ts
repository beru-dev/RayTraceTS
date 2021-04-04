import Ray from "./Rays";
import Sphere from "./Sphere";
import { point, vector } from "./Tuple";
import { Intersection, Intersections } from "./Intersections";
import { translation, scaling } from "./Transformations";
import { identity, compare } from "./Matrix";

describe("Creating and querying a ray", () => {
    const origin = point(1, 2, 3);
    const direction = vector(4, 5, 6);
    const r = new Ray(origin, direction);

    it(`${r.origin} = ${origin}`, () => expect(r.origin).toEqual(origin));
    it(`${r.direction} = ${direction}`, () => expect(r.direction).toEqual(direction));
});

describe("Computing a point from a distance", () => {
    const start = point(2, 3, 4)
    const r = new Ray(start, vector(1, 0, 0));
    const r1 = point(3, 3, 4);
    const rNeg1 = point(1, 3, 4);
    const r2point5 = point(4.5, 3, 4);
    it(`${r.position(0)} = ${start}`, () => expect(r.position(0)).toEqual(start));
    it(`${r.position(1)} = ${r1}`, () => expect(r.position(1)).toEqual(r1));
    it(`${r.position(-1)} = ${rNeg1}`, () => expect(r.position(-1)).toEqual(rNeg1));
    it(`${r.position(2.5)} = ${r2point5}`, () => expect(r.position(2.5)).toEqual(r2point5));
});

describe("A ray intersects a sphere at two points", () => {
    const r = new Ray(point(0, 0, -5), vector(0, 0, 1));
    const s = new Sphere("1");
    const xs = r.intersect(s);

    it(`The length of the array of intersections is 2`, () => expect(xs.list.length).toEqual(2));
    it(`The first intersection should be 4`, () => expect(xs.list[0].t).toEqual(4));
    it(`The second intersection should be 6`, () => expect(xs.list[1].t).toEqual(6));
});

describe("A ray intersects a sphere at a tangent", () => {
    const r = new Ray(point(0, 1, -5), vector(0, 0, 1));
    const s = new Sphere("2");
    const xs = r.intersect(s);

    it(`The length of the array of intersections is 2`, () => expect(xs.list.length).toEqual(2));
    it(`The first intersection should be 5`, () => expect(xs.list[0].t).toEqual(5));
    it(`The second intersection should be 5`, () => expect(xs.list[1].t).toEqual(5));
});

describe("A ray misses a sphere", () => {
    const r = new Ray(point(0, 2, -5), vector(0, 0, 1));
    const s = new Sphere("3");
    const xs = r.intersect(s);

    it(`The length of the array of intersections is 0`, () => expect(xs.list.length).toEqual(0));
});

describe("A ray originates inside a sphere", () => {
    const r = new Ray(point(0, 0, 0), vector(0, 0, 1));
    const s = new Sphere("4");
    const xs = r.intersect(s);

    it(`The length of the array of intersections is 2`, () => expect(xs.list.length).toEqual(2));
    it(`The first intersection should be -1`, () => expect(xs.list[0].t).toEqual(-1));
    it(`The second intersection should be 1`, () => expect(xs.list[1].t).toEqual(1));
});

describe("A sphere is behind a ray", () => {
    const r = new Ray(point(0, 0, 5), vector(0, 0, 1));
    const s = new Sphere("5");
    const xs = r.intersect(s);

    it(`The length of the array of intersections is 2`, () => expect(xs.list.length).toEqual(2));
    it(`The first intersection should be -6`, () => expect(xs.list[0].t).toEqual(-6));
    it(`The second intersection should be -4`, () => expect(xs.list[1].t).toEqual(-4));
});

describe("An intersection encapsulates t and object", () => {
    const s = new Sphere("6");
    const i = new Intersection(3.5, s);
    it(`The intersection's t value is 3.5`, () => expect(i.t).toEqual(3.5));
    it(`The intersection's object is the sphere 's'`, () => expect(i.object).toEqual(s));
});

describe("Aggregating intersections", () => {
    const s = new Sphere("7");
    const i1 = new Intersection(1, s);
    const i2 = new Intersection(2, s);
    const xs = new Intersections(i1, i2);
    it(`The number of intersections is 2`, () => expect(xs.list.length).toEqual(2));
    it(`The first intersection's t value is 0`, () => expect(xs.list[0].t).toEqual(1));
    it(`The first intersection's t value is 1`, () => expect(xs.list[1].t).toEqual(2));
});

describe("Intersect sets the object on the intersection", () => {
    const r = new Ray(point(0, 0, -5), vector(0, 0, 1));
    const s = new Sphere("8");
    const xs = r.intersect(s);
    it(`The number of intersections is 2`, () => expect(xs.list.length).toEqual(2));
    it(`The associated object of the first element is the Sphere s`, () => expect(xs.list[0].object).toEqual(s));
    it(`The associated object of the second element is the Sphere s`, () => expect(xs.list[1].object).toEqual(s));
});

describe("The hit, when all intersection have positive t", () => {
    const s = new Sphere("9");
    const i1 = new Intersection(1, s);
    const i2 = new Intersection(2, s);
    const xs = new Intersections(i2, i1);

    it(`hit() returns the intersection with the lowest t value`, () => expect(xs.hit()).toEqual(i1));
});

describe("The hit, when some intersections have negative t", () => {
    const s = new Sphere("10");
    const i1 = new Intersection(-1, s);
    const i2 = new Intersection(1, s);
    const xs = new Intersections(i2, i1);

    it(`hit() returns the intersection with the lowest positive t value`, () => expect(xs.hit()).toEqual(i2));
});

describe("The hit, when all intersections have negative t", () => {
    const s = new Sphere("11");
    const i1 = new Intersection(-2, s);
    const i2 = new Intersection(-1, s);
    const xs = new Intersections(i2, i1);

    it(`hit() returns nothing`, () => expect(xs.hit()).toEqual(null));
});

describe("The hit is always the lowest nonnegative intersection", () => {
    const s = new Sphere("13");
    const i1 = new Intersection(5, s);
    const i2 = new Intersection(7, s);
    const i3 = new Intersection(-3, s);
    const i4 = new Intersection(2, s);
    const xs = new Intersections(i1, i2, i3, i4);

    it(`hit() returns the intersection with the lowest positive t value`, () => expect(xs.hit()).toEqual(i4));
});

describe("Translating a ray", () => {
    const r = new Ray(point(1, 2, 3), vector(0, 1, 0));
    const m = translation(3, 4, 5);
    const r2 = r.transform(m);

    it(`After translating, r2's new origin is (4, 6, 8, 1)`, () => expect(r2.origin).toEqual(point(4, 6, 8)));
    it(`r2's direction is unchanged`, () => expect(r2.direction).toEqual(vector(0, 1, 0)));
});

describe("Scaling a ray", () => {
    const r = new Ray(point(1, 2, 3), vector(0, 1, 0));
    const m = scaling(2, 3, 4);
    const r2 = r.transform(m);

    it(`After scaling, r2's new origin is (2, 6, 12, 1)`, () => expect(r2.origin).toEqual(point(2, 6, 12)));
    it(`r2's new direction is (0, 3, 0, 0)`, () => expect(r2.direction).toEqual(vector(0, 3, 0)));
});

describe("A sphere's default transformation", () => {
    const s = new Sphere("14");

    it(`is the identity matrix`, () => expect(compare(s.transform, identity)).toEqual(true));
});

describe("Changing a sphere's transformation", () => {
    const s = new Sphere("15");
    const t = translation(2, 3, 4);
    s.setTransform(t);

    it(`s's transform = ${t.toString()}`, () => expect(compare(s.transform, t)).toEqual(true));
});

describe("Intersecting a scaled sphere with a ray", () => {
    const r = new Ray(point(0, 0, -5), vector(0, 0, 1));
    const s = new Sphere("16");
    s.setTransform(scaling(2, 2, 2));
    const xs = r.intersect(s);

    it(`The number of intersections is 2`, () => expect(xs.list.length).toEqual(2));
    it(`The first intersection's t value is 3`, () => expect(xs.list[0].t).toEqual(3));
    it(`The first intersection's t value is 7`, () => expect(xs.list[1].t).toEqual(7));
});

describe("Intersecting a translated sphere with a ray", () => {
    const r = new Ray(point(0, 0, -5), vector(0, 0, 1));
    const s = new Sphere("17");
    s.setTransform(translation(5, 0, 0));
    const xs = r.intersect(s);

    it(`The number of intersections is 0`, () => expect(xs.list.length).toEqual(0));
});

// describe("", () => {
// it("", () => {
//     expect().toEqual();
// });
// });