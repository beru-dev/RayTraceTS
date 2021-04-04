import Sphere from "./Sphere";
import { point, tupleEqual, vector, normalize } from "./Tuple";
import { translation, scaling, rotationZ } from "./Transformations";
import { dotProduct } from "./Matrix";
import Phong from "./Phong";

describe("Testing Spheres", () => {
    it("The normal on a sphere at a point on the x axis", () => {
        const s = new Sphere("18");
        const n = s.normalAt(point(1, 0, 0));
        const expected = vector(1, 0, 0);

        expect(tupleEqual(n, expected)).toEqual(true)
    });

    it("The normal on a sphere at a point on the y axis", () => {
        const s = new Sphere("19");
        const n = s.normalAt(point(0, 1, 0));
        const expected = vector(0, 1, 0);

        expect(tupleEqual(n, expected)).toEqual(true)
    });

    it("The normal on a sphere at a point on the z axis", () => {
        const s = new Sphere("20");
        const n = s.normalAt(point(0, 0, 1));
        const expected = vector(0, 0, 1);

        expect(tupleEqual(n, expected)).toEqual(true)
    });

    it("The normal on a sphere at a nonaxial point", () => {
        const s = new Sphere("21");
        const na = Math.sqrt(3) / 3;
        const n = s.normalAt(point(na, na, na));
        const expected = vector(na, na, na);

        expect(tupleEqual(n, expected)).toEqual(true)
    });

    it("The normal is a normalized vector", () => {
        const s = new Sphere("22");
        const na = Math.sqrt(3) / 3;
        const n = s.normalAt(point(na, na, na));
        const normalized = normalize(n);

        expect(tupleEqual(n, normalized)).toEqual(true)
    });

    it("Computing the normal on a translated sphere", () => {
        const s = new Sphere("23");
        s.setTransform(translation(0, 1, 0));
        const n = s.normalAt(point(0, 1.70711, -0.70711));
        const expected = vector(0, 0.70711, -0.70711);

        expect(tupleEqual(n, expected)).toEqual(true)
    });

    it("Computing the normal on a transformed sphere", () => {
        const s = new Sphere("24");
        const m = dotProduct(scaling(1, 0.5, 1), rotationZ(Math.PI / 5));
        s.setTransform(m);
        const n = s.normalAt(point(0, Math.SQRT2 / 2, -Math.SQRT2 / 2));
        const expected = vector(0, 0.97014, -0.24254);

        expect(tupleEqual(n, expected)).toEqual(true);
    });

    it("A sphere has a default material", () => {
        const s = new Sphere("25");
        const m = new Phong();

        expect(s.material).toEqual(m);
    });

    it("A sphere may be assigned a material", () => {
        const s = new Sphere("26");
        const m = new Phong();
        m.ambient = 1;
        s.material = m;
    
        expect(s.material).toEqual(m);
    });
});

// it("", () => {


//     expect().toEqual()
// });