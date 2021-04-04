import { Color } from "./Color";
import { Tuple } from "./Tuple";

class PointLight {
    intensity: Color;
    position: Tuple;
    constructor(position: Tuple, intensity: Color) {
        this.intensity = intensity;
        this.position = position;
    }
}

export default PointLight;