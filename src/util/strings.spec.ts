import { dasherize, camelize, classify } from './strings';

describe("CaseConverter", function () {
    it("should convert to kebab-case", function () {
        expect(dasherize("Hello World")).toBe("hello-world");
    });

    it("should convert to camelCase", function () {
        expect(camelize("Hello World")).toBe("helloWorld");
        expect(camelize("hello world")).toBe("helloWorld");
    });

    it("should convert to PascalCase", function () {
        expect(classify("hello world")).toBe("HelloWorld");
        expect(classify("Hello World")).toBe("HelloWorld");
    });
});