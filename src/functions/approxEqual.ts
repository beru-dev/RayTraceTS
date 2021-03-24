const EPSILON = .00001;

const approxEqual = (a: number, b: number): boolean => {
    if(Math.abs(a - b) < EPSILON) {
        return true;
    } else {
        return false;
    }
};

export default approxEqual;