import { color, Color, multiplyCol, multScalarCol, addCol } from "./Color"
import PointLight from "./PointLight";
import { dot, negate, normalize, reflect, subtract, Tuple } from "./Tuple";

class Phong {
    color: Color;
    ambient: number;
    diffuse: number;
    specular: number;
    shininess: number;
    constructor(color: Color =  [1, 1, 1], ambient: number = 0.1, diffuse: number = 0.9, specular: number = 0.9, shininess: number = 200) {
        this.color = color;
        this.ambient = ambient;
        this.diffuse = diffuse;
        this.specular = specular;
        this.shininess = shininess;
    }

    lighting(light: PointLight, point: Tuple, eyev: Tuple, normalv: Tuple): Color {
        const effectiveColor = multiplyCol(this.color, light.intensity);
        const ambient = multScalarCol(effectiveColor, this.ambient);
        const lightv = normalize(subtract(light.position, point));
        const lightDotNormal = dot(lightv, normalv);

        let diffuse: Color;
        let specular: Color;

        if(lightDotNormal < 0) {
            diffuse = color(0, 0, 0);
            specular = color(0, 0, 0);
        } else {
            diffuse = multScalarCol(effectiveColor, this.diffuse * lightDotNormal);
            const reflectv = reflect(negate(lightv), normalv);
            const reflectDotEye = dot(reflectv, eyev);

            if(reflectDotEye <= 0) {
                specular = color(0, 0, 0);
            } else {
                const factor = Math.pow(reflectDotEye, this.shininess);
                specular = multScalarCol(light.intensity, this.specular * factor);
            }
        }
        return addCol(ambient, addCol(diffuse, specular))
    }
}

export default Phong;