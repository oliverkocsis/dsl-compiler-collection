export function convertToKebabCase(str: string) {
    return str.replace(/\s+/g, '-').toLowerCase();
}

export function convertToPascalCase(str: string) {
    return str
        .replace(/\w+/g, function (str) { return str[0].toUpperCase() + str.slice(1).toLowerCase(); })
        .replace(/\s/g, '');
}

export function convertToCamelCase(str: string) {
    return str
        .replace(/\s(.)/g, function (str) { return str.toUpperCase(); })
        .replace(/\s/g, '')
        .replace(/^(.)/, function (str) { return str.toLowerCase(); });
}