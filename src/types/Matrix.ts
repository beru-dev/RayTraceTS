import approxEqual from "../functions/approxEqual";
import { Tuple, makeTuple } from "./Tuple";

export class Matrix {
    rows: number;
    columns: number;
    matrix: Array<number>;
    error: string;
    constructor(rows: number, columns: number, inputMatrix: Array<number>) {
        if(inputMatrix.length === rows * columns) {
            this.matrix = inputMatrix;
            this.rows = rows;
            this.columns = columns;
        } else {
            this.error = `New Matrix constructor error. The input matrix should be ${rows * columns} elements long, but is actually ${inputMatrix.length} elements long.`;
        }       
    }

    index(row: number, column: number, replacementNum?: number): number {
        if(row * column <= this.matrix.length - 1) {
            if(replacementNum !== undefined) {
                return this.matrix[row * this.columns + column] = replacementNum;
            } else {
                return this.matrix[row * this.columns + column];
            }
        }
    }

    transpose(): Matrix {
        const transposed: Array<number> = [];
        for(let i = 0; i < this.columns; i++) {
            for(let j = 0; j < this.rows; j++) {
                transposed.push(this.index(j, i));
            }
        }
        return new Matrix(this.columns, this.rows, transposed);
    }

    toString(): string {
        let stringifiedMatrix: string = "";
        this.matrix.forEach((el, index) => {
            let prepend = " ";
            const isBreakpoint: boolean = ((index) % this.columns) === 0;
            if(index !== 0 && isBreakpoint) {
                prepend = " / ";
            };
            stringifiedMatrix += `${prepend}${el}`;
        });
        return `[${stringifiedMatrix} ]`;
    }
};

export const identity = new Matrix(4, 4, [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
]);

export const compare = (matrix1: Matrix, matrix2: Matrix): boolean => {
    for(let i = 0; i < matrix1.matrix.length; i++) {
        if(!approxEqual(matrix1.matrix[i], matrix2.matrix[i])) {
            console.log(`${i}: ${matrix1.matrix[i]} -  ${matrix2.matrix[i]}`);
            return false
        };
    };
    if(matrix1.rows === matrix2.rows && matrix1.columns === matrix2.columns) {
        return true;
    } else {
        return false;
    }        
}

export const dotProduct = (matrix1: Matrix, matrix2: Matrix): Matrix => {
    if(matrix1.columns === matrix2.rows) {
        const newMatrixArray: Array<number> = [];
        for(let i = 0; i < matrix1.rows; i++) {
            for(let j = 0; j < matrix2.columns; j++) {
                let product = 0;
                for(let k = 0; k < matrix1.columns; k++) {
                    product += matrix1.index(i, k) * matrix2.index(k, j);
                }
                newMatrixArray.push(product);
            }
        }
        return new Matrix(matrix1.rows, matrix2.columns, newMatrixArray);
    } else {
        return null;
    }
}

export const dotTuple = (matrix: Matrix, tuple: Tuple): Tuple => {
    if(matrix.matrix.length === 16) {
        const newTuple: Array<number> = [];
        for(let i = 0; i < 4; i++) {
            let product = 0;
            for(let k = 0; k < 4; k++) {
                product += matrix.index(i, k) * tuple[k];
            }
            newTuple.push(product);
        }
        return makeTuple(
            newTuple[0],
            newTuple[1],
            newTuple[2],
            newTuple[3]
        );
    } else {
        return null;
    }
}

export const submatrix = (matrix: Matrix, rowToRemove: number, columnToRemove: number): Matrix => {
    const newMatrixArray: Array<number> = [];
    for(let i = 0; i < matrix.rows; i++) {
        for(let j = 0; j < matrix.columns; j++) {
            if(i !== rowToRemove && j !== columnToRemove) {
                newMatrixArray.push(matrix.index(i, j));
            }
        }
    }
    return new Matrix(matrix.rows - 1, matrix.columns - 1, newMatrixArray);
}

export const minor = (matrix: Matrix, rowToRemove: number, columnToRemove: number): number => {
    return determinant(submatrix(matrix, rowToRemove, columnToRemove));
}

export const cofactor = (matrix: Matrix, rowToRemove: number, columnToRemove: number) => {
    if((rowToRemove + columnToRemove) % 2 === 0) {
        return minor(matrix, rowToRemove, columnToRemove);
    } else {
        return -minor(matrix, rowToRemove, columnToRemove);
    }
}

export const determinant = (inMatrix: Matrix): number => {
    const { rows, columns, matrix } = inMatrix;
    if(rows === 2 && columns === 2) {
        return matrix[0] * matrix[3] - matrix[1] * matrix[2];
    } else {
        let det: number = 0;
        for(let i = 0; i < columns; i++) {
            det += inMatrix.index(0, i) * cofactor(inMatrix, 0, i);
        }
        return det;
    }
}

export const inverse = (matrix: Matrix): Matrix => {
    const matrixArray: Array<number> = Array.from(Array(matrix.rows * matrix.columns));
    const invertedMatrix: Matrix = new Matrix(matrix.rows, matrix.columns, matrixArray);
    const det: number = determinant(matrix);
    if(det !== 0) {
        for(let i = 0; i < matrix.rows; i++) {
            for(let j = 0; j < matrix.columns; j++) {
                const cof = cofactor(matrix, i, j);
                invertedMatrix.index(j, i, cof / det);
            }
        }
        return invertedMatrix;
    } else {
        console.log(`${matrix.toString} is not invertible!!!!111!!!1!!!!`)
        return matrix;
    }
}