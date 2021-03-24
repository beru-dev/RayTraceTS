export class Intersection {
    t: number;
    object: any;
    constructor(t:number, object: any) {
        this.t = t;
        this.object = object;
    }
}

export class Intersections {
    list: Array<Intersection>;
    constructor(...args: Array<Intersection>) {
        this.list = args;
    }

    hit(): Intersection {
        let lowestIntersection: Intersection;
        this.list.forEach(intersection => {
            if(!lowestIntersection && intersection.t >= 0) {
                lowestIntersection = intersection;
            } else if(Boolean(lowestIntersection) && intersection.t >= 0 && intersection.t < lowestIntersection.t) {
                 lowestIntersection = intersection;
            }
        });
        if(lowestIntersection) {
            return lowestIntersection;
        } else {
            return null;
        }
    }
}