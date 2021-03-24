import { writeFile } from 'fs';

import { point } from "../types/Tuple";
import Canvas from "../types/Canvas";
import { color } from "../types/Color";
import { rotationZ, scaling, translation } from '../types/Transformations';
import { dotProduct, dotTuple } from '../types/Matrix';

const clock = () => {
    let clock = point(0, 1, 0);
    const canvas = new Canvas(200, 200);
    const rotation = rotationZ(Math.PI / 6);
    const transform = dotProduct(translation(100, 100, 0), scaling(75, 75, 0));
    
    for(let i = 0; i < 12; i++) {
        const tClock = dotTuple(transform, clock);
        canvas.writePixel(tClock[0], 200 - tClock[1], color(1, 1, 1));
        clock = dotTuple(rotation, clock);
    }
    
    const ppm = canvas.canvasToPpm();
    writeFile('clock_200x200.ppm', ppm, (err: any) => {
        if (err) return console.log(err);
    });
};

export default clock;