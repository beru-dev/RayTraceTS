import { Matrix, compare, dotProduct, dotTuple, identity, determinant, submatrix, minor, cofactor, inverse } from "./Matrix";
import { Tuple, makeTuple, tupleEqual } from "./Tuple";

// describe("", () => {
//     it(``, () => expect().toEqual());
// });

describe("Testing the matrix formatter", () => {
    const M: Matrix = new Matrix(4, 4, [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 8, 7, 6,
        5, 4, 3, 2
    ]);
    it(`The matrix should print as ${M.toString()}`, () => expect(M.toString()).toEqual("[ 1 2 3 4 / 5 6 7 8 / 9 8 7 6 / 5 4 3 2 ]"));
});

describe("Constructing and inspecting a 4x4 matrix", () => {
    const M: Matrix = new Matrix(4, 4, [
        1, 2, 3, 4,
        5.5, 6.5, 7.5, 8.5,
        9, 10, 11, 12,
        13.5, 14.5, 15.5, 16.5
    ]);
    it(`Given the matrix M is ${M.toString()} then M.index(0, 0) is 1`, () => expect(M.index(0, 0)).toEqual(1));
    it(`and M.index(0, 3) is 4`, () => expect(M.index(0, 3)).toEqual(4));
    it(`and M.index(1, 0) is 5.5`, () => expect(M.index(1, 0)).toEqual(5.5));
    it(`and M.index(1, 2) is 7.5`, () => expect(M.index(1, 2)).toEqual(7.5));
    it(`and M.index(2, 2) is 11`, () => expect(M.index(2, 2)).toEqual(11));
    it(`and M.index(3, 0) is 13.5`, () => expect(M.index(3, 0)).toEqual(13.5));
    it(`and M.index(3, 2) is 15.5`, () => expect(M.index(3, 2)).toEqual(15.5));
});

describe("If the input Array length does not equal rows times columns the returned Matrix should have a single property \"error\". Given a 2x2 matrix", () => {
    const matrixTooLong: Matrix = new Matrix(2, 2, [1, 2, 3, 4, 5]);
    const matrixTooShort: Matrix = new Matrix(2, 2, [1, 2, 3]);

    it("a 5 element array should have an \"error\" property", () => expect(matrixTooLong).toHaveProperty("error"));
    it("a 3 element array should have an \"error\" property", () => expect(matrixTooShort).toHaveProperty("error"));
});

describe("A 2x2 matrix ought to be representable", () => {
    const M: Matrix = new Matrix(2, 2, [
        -3, 5,
        1, -2
    ]);

    it(`Given a 2x2 matrix ${M.toString()} then M.index(0, 0) is -3`, () => expect(M.index(0, 0)).toEqual(-3));
    it(`and M.index(0, 1) is 5`, () => expect(M.index(0, 1)).toEqual(5));
    it(`and M.index(1, 0) is 1`, () => expect(M.index(1, 0)).toEqual(1));
    it(`and M.index(1, 1) is -2`, () => expect(M.index(1, 1)).toEqual(-2));
});

describe("A 3x3 matrix ought to be representable", () => {
    const M: Matrix = new Matrix(3, 3, [
        -3, 5, 0,
        1, -2, -7,
        0, 1, 1
    ]);

    it(`Given a 3x3 matrix ${M.toString()} then M.index(0, 0) is -3`, () => expect(M.index(0, 0)).toEqual(-3));
    it(`and M.index(1, 1) is -2`, () => expect(M.index(1, 1)).toEqual(-2));
    it(`and M.index(2, 2) is 1`, () => expect(M.index(2, 2)).toEqual(1));
});

describe("Matrix equality with identical matrices", () => {
    const A: Matrix = new Matrix(4, 4, [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 8, 7, 6,
        5, 4, 3, 2
    ]);
    const B: Matrix = new Matrix(4, 4, [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 8, 7, 6,
        5, 4, 3, 2
    ]);
    it(`matrix A ${A.toString()} = matrix B${B.toString()}`, () => expect(compare(A, B)).toEqual(true));
});

describe("Matrix equality with different matrices", () => {
    const A: Matrix = new Matrix(4, 4, [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 8, 7, 6,
        5, 4, 3, 2
    ]);
    const B: Matrix = new Matrix(4, 4, [
        2, 3, 4, 5,
        6, 7, 8, 9,
        8, 7, 6, 5,
        4, 3, 2, 1
    ]);
    it(`matrix A ${A.toString()} != matrix B${B.toString()}`, () => expect(compare(A, B)).not.toEqual(true));
});

describe("Multiplying two matrices", () => {
    const A: Matrix = new Matrix(4, 4, [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 8, 7, 6,
        5, 4, 3, 2
    ]);
    const B: Matrix = new Matrix(4, 4, [
        -2, 1, 2, 3,
        3, 2, 1, -1,
        4, 3, 6, 5,
        1, 2, 7, 8
    ]);
    const DP = new Matrix(4, 4, [
        20, 22, 50, 48,
        44, 54, 114, 108,
        40, 58, 110, 102,
        16, 26, 46, 42
    ]);
    it(`Given matrix A is ${A.toString()} and B is ${B.toString()} the dot product is ${DP.toString()}`, () => expect(dotProduct(A, B).toString()).toEqual(DP.toString()));
});

describe("A matrix multiplied by a tuple", () => {
    const A: Matrix = new Matrix(4, 4, [
        1, 2, 3, 4,
        2, 4, 4, 2,
        8, 6, 4, 1,
        0, 0, 0, 1
    ]);
    const b: Tuple = makeTuple(1, 2, 3, 1);
    const expectedProduct: Tuple = makeTuple(18, 24, 33, 1);
    const actualProduct: Tuple = dotTuple(A, b);

    it(`Given matrix ${A.toString()} and tuple ${b} the product should be ${expectedProduct}`, () => expect(tupleEqual(actualProduct, expectedProduct)).toEqual(true));
});

describe("Multiplying a matrix by the identity matrix", () => {
    const A: Matrix = new Matrix(4, 4, [
        0, 1, 2, 4,
        1, 2, 4, 8,
        2, 4, 8, 16,
        4, 8, 16, 32
    ]);
    const product: Matrix = dotProduct(A, identity);

    it(`Multiplying matrix ${A.toString()} by the identity matrix returns the same matrix`, () => expect(compare(A, product)).toEqual(true));
});

describe("Transposing a matrix", () => {
    const matrixIn = new Matrix(4, 4, [
        0, 9, 3, 0,
        9, 8, 0, 8,
        1, 8, 5, 3,
        0, 0, 5, 8
    ]);
    const expected = new Matrix(4, 4, [
        0, 9, 1, 0,
        9, 8, 8, 0,
        3, 0, 5, 5,
        0, 8, 3, 8
    ]);
    const actual = matrixIn.transpose();

    it(`Transposing matrix ${matrixIn.toString()} gives ${expected.toString()}`, () => expect(compare(actual, expected)).toEqual(true));
});

describe("Transposing the identity matrix", () => {
    const actual = identity.transpose();

    it(`gives the identity matrix`, () => expect(compare(actual, identity)).toEqual(true));
});

describe("Calculating the determinant of a 2x2 matrix", () => {
    const A: Matrix = new Matrix(2, 2, [
        1, 5,
        -3, 2
    ]);
    it(`The determinant of ${A.toString()} is 17`, () => expect(determinant(A)).toEqual(17));
});

describe("A submatrix of a 3x3 matrix is a 2x2 matrix", () => {
    const A: Matrix = new Matrix(3, 3, [
        1, 5, 0,
        -3, 2, 7,
        0, 6, -3
    ]);
    const expectedSubmatrix: Matrix = new Matrix(2, 2, [
        -3, 2,
        0, 6
    ]);
    const actualSubmatrix: Matrix = submatrix(A, 0, 2);
    it(`The submatrix of ${A.toString()} removing 0, 2 is ${expectedSubmatrix.toString()}`, () => expect(compare(actualSubmatrix, expectedSubmatrix)).toEqual(true));
});

describe("A submatrix of a 4x4 matrix is a 3x3 matrix", () => {
    const A: Matrix = new Matrix(4, 4, [
        -6, 1, 1, 6,
        -8, 5, 8, 6,
        -1, 0, 8, 2,
        -7, 1, -1, 1
    ]);
    const expectedSubmatrix: Matrix = new Matrix(3, 3, [
        -6, 1, 6,
        -8, 8, 6,
        -7, -1, 1
    ]);
    const actualSubmatrix: Matrix = submatrix(A, 2, 1);
    it(`The submatrix of ${A.toString()} removing 2, 1 is ${expectedSubmatrix.toString()}`, () => expect(compare(actualSubmatrix, expectedSubmatrix)).toEqual(true));
});

describe("Calculating a minor of a 3x3 matrix", () => {
    const A: Matrix = new Matrix(3, 3, [
        3, 5, 0,
        2, -1, -7,
        6, -1, 5
    ]);
    const B: Matrix = submatrix(A, 1, 0);
    it(`The determinant of ${B.toString()} is 25`, () => expect(determinant(B)).toEqual(25));
    it("The minor of A with 1, 0 removed is is 25", () => expect(minor(A, 1, 0)).toEqual(25));
});

describe("Calculating a cofactor of a 3x3 matrix", () => {
    const A: Matrix = new Matrix(3, 3, [
        3, 5, 0,
        2, -1, -7,
        6, -1, 5
    ]);
    it(`Given A is ${A.toString()} the minor of for 0, 0 is -12`, () => expect(minor(A, 0, 0)).toEqual(-12));
    it("The cofactor of A for 0, 0 is -12", () => expect(cofactor(A, 0, 0)).toEqual(-12));
    it("The minor of A for 1, 0 is 25", () => expect(minor(A, 1, 0)).toEqual(25));
    it("The cofactor of A for 1, 0 is -25", () => expect(cofactor(A, 1, 0)).toEqual(-25));
});

describe("Calculating the determinant of a 3x3 matrix", () => {
    const A: Matrix = new Matrix(3, 3, [
        1, 2, 6,
        -5, 8, -4,
        2, 6, 4
    ]);

    it(`The cofactor of matrix ${A.toString()} for 0, 0 is 56`, () => expect(cofactor(A, 0, 0)).toEqual(56));
    it(`and for 0, 1 is 12`, () => expect(cofactor(A, 0, 1)).toEqual(12));
    it(`and for 0, 2 is -46`, () => expect(cofactor(A, 0, 2)).toEqual(-46));
    it(`and the determinant is -196`, () => expect(determinant(A)).toEqual(-196));
});

describe("Calculating the determinant of a 4x4 matrix", () => {
    const A: Matrix = new Matrix(4, 4, [
        -2, -8, 3, 5,
        -3, 1, 7, 3,
        1, 2, -9, 6,
        -6, 7, 7, -9
    ]);

    it(`The cofactor of matrix ${A.toString()} for 0, 0 is 690`, () => expect(cofactor(A, 0, 0)).toEqual(690));
    it(`and for 0, 1 is 447`, () => expect(cofactor(A, 0, 1)).toEqual(447));
    it(`and for 0, 2 is 210`, () => expect(cofactor(A, 0, 2)).toEqual(210));
    it(`and for 0, 3 is 51`, () => expect(cofactor(A, 0, 3)).toEqual(51));
    it(`and the determinant is -4071`, () => expect(determinant(A)).toEqual(-4071));
});

describe("Testing an invertible matrix for invertibility", () => {
    const A = new Matrix(4, 4, [
        6, 4, 4, 4,
        5, 5, 7, 6,
        4, -9, 3, -7,
        9, 1, 7, -6
    ]);

    it(`Matrix ${A.toString()} is invertible`, () => expect(determinant(A)).not.toEqual(0));
});

describe("Testing an noninvertible matrix for invertibility", () => {
    const A = new Matrix(4, 4, [
        -4, 2, -2, -3,
        9, 6, 2, 6,
        0, -5, 1, -5,
        0, 0, 0, 0
    ]);

    it(`Matrix ${A.toString()} is not invertible`, () => expect(determinant(A)).toEqual(0));
});

describe("Calculating the inverse of a matrix", () => {
    const A = new Matrix(4, 4, [
        -5, 2, 6, -8,
        1, -5, 1, 8,
        7, 7, -6, -7,
        1, -3, 7, 4
    ]);
    const B = inverse(A);
    const expectedB = new Matrix(4, 4, [
        0.21805, 0.45113, 0.24060, -0.04511,
        -0.80827, -1.45677, -0.44361, 0.52068,
        -0.07895, -0.22368, -0.05263, 0.19737,
        -0.52256, -0.81391, -0.30075, 0.30639
    ]);

    it(`Given matrix ${A.toString()} the determinant is 532`, () => expect(determinant(A)).toEqual(532));
    it(`and cofactor 2, 3 = -160`, () => expect(cofactor(A, 2, 3)).toEqual(-160));
    it(`and B(3, 2) is -160/532`, () => expect(B.index(3, 2)).toEqual(-160/532));
    it(`and cofactor 3, 2 is 105`, () => expect(cofactor(A, 3, 2)).toEqual(105));
    it(`and B(2, 3) is 105/352`, () => expect(B.index(2, 3)).toEqual(105/532));
    it(`the inverse should equal matrix ${expectedB.toString()}`, () => expect(compare(B, expectedB)).toEqual(true));
});

describe("For thoroughness's sake", () => {
    const A = new Matrix(4, 4, [
        8, -5, 9, 2,
        7, 5, 6, 1,
        -6, 0, 9, 6,
        -3, 0, -9, -4
    ]);
    const inverseA = inverse(A);
    const expectedA = new Matrix(4, 4, [
        -0.15385, -0.15385, -0.28205, -0.53846,
        -0.07692, 0.12308, 0.02564, 0.03077,
        0.35897, 0.35897, 0.43590, 0.92308,
        -0.69231, -0.69231, -0.76923, -1.92308
    ]);

    it(`The inverse of ${A.toString()} is ${expectedA.toString()}`, () => expect(compare(inverseA, expectedA)).toEqual(true));
});

describe("For even more thoroughness", () => {
    const A = new Matrix(4, 4, [
        9, 3, 0, 9,
        -5, -2, -6, -3,
        -4, 9, 6, 4,
        -7, 6, 6, 2
    ]);
    const inverseA = inverse(A);
    const expectedA = new Matrix(4, 4, [
        -0.04074, -0.07778, 0.14444, -0.22222,
        -0.07778, 0.03333, 0.36667, -0.33333,
        -0.02901, -0.14630, -0.10926, 0.12963,
        0.17778, 0.06667, -0.26667, 0.33333
    ]);

    it(`The inverse of ${A.toString()} is ${expectedA.toString()}`, () => expect(compare(inverseA, expectedA)).toEqual(true));
});

describe("Multiplying a product by its inverse", () => {
    const A = new Matrix(4, 4, [
        3, -9, 7, 3,
        3, -8, 2, -9,
        -4, 4, 4, 1,
        -6, 5, -1, 1
    ]);
    const B = new Matrix(4, 4, [
        8, 2, 2, 2,
        3, -1, 7, 0,
        7, 0, 5, 4,
        6, -2, 0, 5
    ]);
    const C = dotProduct(A, B);

    it(`${C.toString()} * inverse of ${B.toString()} = ${A.toString()}`, () => expect(compare(dotProduct(C, inverse(B)), A)).toEqual(true));
});