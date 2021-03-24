import { writeFile } from 'fs';

import { point, vector, normalize } from "../types/Tuple";
import { tick, Projectile, Environment } from "../types/Projectile";
import Canvas from "../types/Canvas";
import { color } from "../types/Color";

let proj = new Projectile(point(0, 1, 0), normalize(vector(1, 1, 0)));
const env = new Environment(vector(0, -0.1, 0), vector(-.01, 0, 0));
const canvas = new Canvas(15, 15);

while(proj.position[1] >= 0) {
    proj = tick(env, proj);
    canvas.writePixel(proj.position[0], 15 - proj.position[1], color(1, 1, 1));
    console.log(`x = ${proj.position[0]}, y = ${proj.position[1]}`);
}

const ppm = canvas.canvasToPpm();

writeFile('projectile_15x15.ppm', ppm, (err: any) => {
    if (err) return console.log(err);
});
