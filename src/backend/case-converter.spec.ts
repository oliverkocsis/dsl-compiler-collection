import { convertToKebabCase, convertToCamelCase, convertToPascalCase } from './case-converter';

describe("CaseConverter", function () {
    it("should convert to kebab-case", function () {
        expect(convertToKebabCase("Hello World")).toBe("hello-world");
    });

    it("should convert to camelCase", function () {
        expect(convertToCamelCase("Hello World")).toBe("helloWorld");
        expect(convertToCamelCase("hello world")).toBe("helloWorld");
    });

    it("should convert to PascalCase", function () {
        expect(convertToPascalCase("hello world")).toBe("HelloWorld");
        expect(convertToPascalCase("Hello World")).toBe("HelloWorld");
    });
});