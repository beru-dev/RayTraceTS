import { writeFile } from 'fs';
import Ray from "../types/Rays";
import Sphere from "../types/Sphere";
import Canvas from "../types/Canvas";
import { color } from "../types/Color";
import { negate, point, subtract } from "../types/Tuple";
// import { translation, scaling } from '../types/Transformations';
// import { dotProduct } from "../types/Matrix";
import { normalize } from '../types/Tuple';
import Phong from '../types/Phong';
import PointLight from '../types/PointLight';

const purpleSphere = () => {
    const rayOrigin = point(0, 0, -5);
    const canvasPixels = 200;
    const wallSize = 7;
    const wallZ = 10;
    const pixelSize = wallSize / canvasPixels;
    const half = wallSize / 2;

    const canvas = new Canvas(canvasPixels, canvasPixels);
    const sphere = new Sphere("1");
    sphere.material = new Phong([1, 0.2, 1]);
    // const transform = dotProduct(translation(100, 100, 0), scaling(10, 10, 10));
    // const transform = scaling(75, 75, 75);
    // sphere.setTransform(transform);
    const light = new PointLight(point(-10, 10, -10), color(1, 1, 1));

    for(let x = 0; x < canvasPixels - 1; x++) {
        const worldX = half - (pixelSize * x);
        for(let y = 0; y < canvasPixels - 1; y++) {
            const worldY = half - (pixelSize * y);
            const position = point(worldX, worldY, wallZ);
            const ray = new Ray(rayOrigin, normalize(subtract(position, rayOrigin)));
            const hit = ray.intersect(sphere).hit();

            if(hit) {
                const eye = negate(ray.direction);
                const hitPoint = ray.position(hit.t);
                const normal = hit.object.normalAt(hitPoint);
                const color = hit.object.material.lighting(light, hitPoint, eye, normal);
                canvas.writePixel(x, y, color);
            }
        }
    }

    const ppm = canvas.canvasToPpm();
    writeFile('eye_candy/purpleSphere_200x200.ppm', ppm, (err: any) => {
        if (err) return console.log(err);
    });
}

export default purpleSphere;