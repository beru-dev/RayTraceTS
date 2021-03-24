import { add, Tuple } from "./Tuple";

export class Projectile {
    position: Tuple;
    velocity: Tuple;
    constructor(position: Tuple, velocity: Tuple) {
        this.position = position;
        this.velocity = velocity;
    }
}

export class Environment {
    gravity: Tuple;
    wind: Tuple;
    constructor(gravity: Tuple, wind: Tuple) {
        this.gravity = gravity;
        this.wind = wind;
    }
}

export const tick = (env: Environment, proj: Projectile) => {
    const position = add(proj.position, proj.velocity);
    const velocity = add(add(proj.velocity, env.gravity), env.wind);
    return new Projectile(position, velocity);
};