import functions from "./Dimension";

describe("The Dimension methods", () => {
    it("Adds 2 + 2 to equal 4", () => {
        expect(functions.add(2, 2)).toBe(4);
    });
    
    it("Removes duplicates and sorts", () => {
        expect(functions.challenge([1,2,2,1,3,1,5,3,4,2,5,4,1,4,2,5])).toStrictEqual([1,2,3,4,5]);
    });
});