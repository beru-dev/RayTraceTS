import { color } from "./Color";
import PointLight from "./PointLight";
import { point } from "./Tuple";

describe("Testing point light class", () => {

    it("A point light has position and intensity", () => {
        const intensity = color(1, 1, 1);
        const position = point(0, 0, 0);
        const light = new PointLight(position, intensity);

        expect(light.position).toEqual(position);
        expect(light.intensity).toEqual(intensity);
    });

});

// it("", () => {


//     expect().toEqual()
// });