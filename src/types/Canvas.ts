import { color, convertColorData, Color } from "./Color";

class Canvas {
    width: number;
    height: number;
    pixels: Array<Color>;
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.pixels = [];
        for(let i = 0; i < width * height; i++) {
            this.pixels.push(color(0, 0, 0));
        }
    }

    private coordsToIndex(x: number, y: number): number {
        x = Math.round(x);
        y = Math.round(y);
        const index: number = y * this.width + x;
        if(index >= 0 && index + 1 <= this.pixels.length) {
            return index;
        } else {
            return undefined;
        }
    }

    public pixelAt(x: number, y: number): Color {
        return this.pixels[this.coordsToIndex(x, y)];
    }

    public writePixel(x: number, y: number, color: Color) {
        const index: number = this.coordsToIndex(x, y);
        if(index >= 0) this.pixels[index] = color;
    }

    public canvasToPpm(): string {
        const header: string = `P3\n${this.width} ${this.height}\n255\n`;
        const pixelData: string = this.getPixelData();
        return header + pixelData;
    }

    private getPixelData(): string {
        let pixelData: string = "";
        for(let i = 0; i < this.height; i++) {
            pixelData += this.getPixelRowData(i * this.width, (i + 1) * this.width);
        }
        return pixelData;
    }

    private getPixelRowData(start: number, end: number): string {
        const row: Array<Color> = this.pixels.slice(start, end);
        let pixelRowData: string = "";
        let sinceLastNewline: number = -1;
        row.forEach(pixel => {
            convertColorData(pixel).forEach(channel => {
                let prepend: string = " ";
                const channelLength: number = channel.toString().length;
                if(sinceLastNewline <= 0) prepend = "";
                if(sinceLastNewline + channelLength + 1 > 70) {
                    prepend = "\n";
                    sinceLastNewline = -1;
                };
                pixelRowData += `${prepend}${channel}`;
                sinceLastNewline += channelLength + 1;
            });
        });
        return `${pixelRowData}\n`;
    }
}

export default Canvas;