import { identity, Matrix } from "./Matrix";

class Sphere {
    id: string;
    transform: Matrix;
    constructor(id: string) {
        this.id = id;
        this.transform = identity;
    }
}

export default Sphere;