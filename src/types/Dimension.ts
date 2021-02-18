// class Dimension {
//     x: number;
//     y: number;
//     z: number;
//     w: number;
//     constructor(x: number, y: number, z: number, w: number) {
//         this.x = x;
//         this.y = y;
//         this.z = z;
//         this.w = w;
//     }
// }

const functions: any = {
    add: (a: number, b: number): number => a + b,
    challenge: (input: Array<number>) => Array.from(new Set(input)).sort()
}

export default functions;