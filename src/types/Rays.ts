import { Tuple, add, multScalar, subtract, dot, point } from "./Tuple";
import Sphere from "./Sphere";
import { Intersection, Intersections } from "./Intersections";
import { Matrix, dotTuple, inverse } from "./Matrix";

class Ray {
    origin: Tuple;
    direction: Tuple;
    constructor(origin: Tuple, direction: Tuple) {
        this.origin = origin;
        this.direction = direction;
    }

    position(t: number) {
        return add(this.origin, multScalar(this.direction, t))
    }

    intersect(sphere: Sphere): Intersections {
        const ray2 = this.transform(inverse(sphere.transform));
        const sphereToRay = subtract(ray2.origin, point(0, 0, 0));
        const a = dot(ray2.direction, ray2.direction);
        const b = 2 * dot(ray2.direction, sphereToRay);
        const c = dot(sphereToRay, sphereToRay) - 1;
        const discriminant = (b * b) - (4 * a * c);
        if(discriminant < 0) return new Intersections();

        return new Intersections(
            new Intersection((-b - Math.sqrt(discriminant)) / (2 * a), sphere),
            new Intersection((-b + Math.sqrt(discriminant)) / (2 * a), sphere)
        );
    }

    transform(m: Matrix): Ray {
        const tOrigin: Tuple = dotTuple(m, this.origin);
        const tDirection: Tuple = dotTuple(m, this.direction);
        return new Ray(tOrigin, tDirection);
    }
};

export default Ray;