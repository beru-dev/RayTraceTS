import { dotProduct, dotTuple, identity, inverse, Matrix } from "./Matrix";
import Phong from "./Phong";
import { subtract, Tuple, point, normalize } from "./Tuple";

class Sphere {
    id: string;
    transform: Matrix;
    material: Phong;
    constructor(id: string) {
        this.id = id;
        this.transform = identity;
        this.material = new Phong();
    }

    setTransform(t: Matrix) {
        this.transform = dotProduct(this.transform, t);
    }

    normalAt(worldPoint: Tuple): Tuple {
        const objectPoint = dotTuple(inverse(this.transform), worldPoint);
        const objectNormal = subtract(objectPoint, point(0, 0, 0));
        const worldNormal = dotTuple(inverse(this.transform).transpose(), objectNormal);
        worldNormal[3] = 0;
        return normalize(worldNormal);
    }
}

export default Sphere;