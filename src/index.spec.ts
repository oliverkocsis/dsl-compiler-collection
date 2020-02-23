import { Greeter } from './index'

describe("The Greeter says", function () {
    it("Hello World", function () {
        expect(Greeter("World")).toBe("Hello World");
    });
});