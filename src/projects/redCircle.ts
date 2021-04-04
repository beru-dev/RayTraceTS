import { writeFile } from 'fs';
import Ray from "../types/Rays";
import Sphere from "../types/Sphere";
import Canvas from "../types/Canvas";
import { color } from "../types/Color";
import { point, subtract } from "../types/Tuple";
// import { translation, scaling } from '../types/Transformations';
// import { dotProduct } from "../types/Matrix";
import { normalize } from '../types/Tuple';

const redCircle = () => {
    const rayOrigin = point(0, 0, -5);
    const canvasPixels = 200;
    const wallSize = 7;
    const wallZ = 10;
    const pixelSize = wallSize / canvasPixels;
    const half = wallSize / 2;

    const canvas = new Canvas(canvasPixels, canvasPixels);
    const sphere = new Sphere("1");
    // const transform = dotProduct(translation(100, 100, 0), scaling(10, 10, 10));
    // const transform = scaling(75, 75, 75);
    // sphere.setTransform(transform);

    for(let x = 0; x < canvasPixels - 1; x++) {
        const worldX = half - (pixelSize * x);
        for(let y = 0; y < canvasPixels - 1; y++) {
            const worldY = half - (pixelSize * y);
            const position = point(worldX, worldY, wallZ);
            const ray = new Ray(rayOrigin, normalize(subtract(position, rayOrigin)));
            const xs = ray.intersect(sphere);

            if(xs.list.length > 0) {
                canvas.writePixel(x, y, color(1, 0, 0));
            }
        }
    }

    const ppm = canvas.canvasToPpm();
    writeFile('eye_candy/redCircle_200x200.ppm', ppm, (err: any) => {
        if (err) return console.log(err);
    });
}

export default redCircle;