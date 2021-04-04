import Phong from "./Phong";
import { color, colorEqual } from "./Color";
import { point, Tuple, vector } from "./Tuple";
import PointLight from "./PointLight";

describe("Testing phong material class", () => {

    let m: Phong;
    let position: Tuple;

    beforeEach(() => {
        m = new Phong();
        position = point(0, 0, 0);
    });

    it("The default material", () => {
        expect(m.color).toEqual(color(1, 1, 1));
        expect(m.ambient).toEqual(0.1);
        expect(m.diffuse).toEqual(0.9);
        expect(m.specular).toEqual(0.9);
        expect(m.shininess).toEqual(200);
    });

    it("Lighting with the eye between the light and the surface", () => {
        const eyev = vector(0, 0, -1);
        const normalv = vector(0, 0, -1);
        const light = new PointLight(point(0, 0, -10), color(1, 1, 1));
        const result = m.lighting(light, position, eyev, normalv);

        expect(colorEqual(result, color(1.9, 1.9, 1.9))).toEqual(true);
    });

    it("Lighting with the eye between light and surface, eye offset 45deg", () => {
        const eyev = vector(0, Math.SQRT2 / 2, -Math.SQRT2 / 2);
        const normalv = vector(0, 0, -1);
        const light = new PointLight(point(0, 0, -10), color(1, 1, 1));
        const result = m.lighting(light, position, eyev, normalv);

        expect(colorEqual(result, color(1.0, 1.0, 1.0))).toEqual(true);
    });

    it("Lighting with the eye opposite surface, lighting offset 45deg", () => {
        const eyev = vector(0, 0, -1);
        const normalv = vector(0, 0, -1);
        const light = new PointLight(point(0, 10, -10), color(1, 1, 1));
        const result = m.lighting(light, position, eyev, normalv);

        expect(colorEqual(result, color(0.7364, 0.7364, 0.7364))).toEqual(true);
    });

    it("Lighting with the eye in the path of the reflection vector", () => {
        const eyev = vector(0, -Math.SQRT2/2, -Math.SQRT2/2);
        const normalv = vector(0, 0, -1);
        const light = new PointLight(point(0, 10, -10), color(1, 1, 1));
        const result = m.lighting(light, position, eyev, normalv);

        expect(colorEqual(result, color(1.6364, 1.6364, 1.6364))).toEqual(true);
    });

    it("Lighting with the light behind the surface", () => {
        const eyev = vector(0, 0, -1);
        const normalv = vector(0, 0, -1);
        const light = new PointLight(point(0, 0, 10), color(1, 1, 1));
        const result = m.lighting(light, position, eyev, normalv);

        expect(colorEqual(result, color(0.1, 0.1, 0.1))).toEqual(true);
    });

});

// it("", () => {


//     expect().toEqual()
// });