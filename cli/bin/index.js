#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var child_process_1 = require("child_process");
var dsl_compiler_collection_1 = require("@dsl-cc/dsl-compiler-collection");
var inputPath = 'dsl';
var outputPath = 'angular';
var defaults = {
    cwd: process.cwd(),
    env: process.env,
    shell: true
};
var cmd = fs_1.existsSync('./' + outputPath + '/package.json') ? 'npm run angular-update' : 'npm run angular-new';
var bat = child_process_1.spawn(cmd, defaults);
bat.stdout.on('data', function (data) {
    console.log(data.toString());
});
bat.stderr.on('data', function (data) {
    console.error(data.toString());
});
bat.on('close', function (code) {
    console.log("child process exited with code " + code);
    console.log("compile starts");
    compile();
    console.log("compile ends");
});
bat.on('error', function (error) {
    console.error("error: " + error);
});
function compile() {
    var frontend = new dsl_compiler_collection_1.JsonSchemaFronted();
    var backend = new dsl_compiler_collection_1.AngularBackend();
    var input = new dsl_compiler_collection_1.VirtualFileSystem();
    var jsonSchemaDir = new dsl_compiler_collection_1.Directory("json-schema");
    input.appendChild(jsonSchemaDir);
    var files = fs_1.readdirSync(inputPath + "/json-schema");
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var name_1 = files_1[_i];
        var file = fs_1.readFileSync(inputPath + "/json-schema/" + name_1);
        jsonSchemaDir.appendChild(new dsl_compiler_collection_1.File(name_1, file.toString()));
    }
    var abstractSyntaxGraph = frontend.parse(input);
    var output = backend.generate(abstractSyntaxGraph);
    if (!fs_1.existsSync(outputPath))
        fs_1.mkdirSync(outputPath);
    output.visit(function (node) {
        var path = './' + outputPath + node.getPathName();
        switch (node.getType()) {
            case dsl_compiler_collection_1.VirtualFileSystemNode.DIRECTORY:
                if (!fs_1.existsSync(path))
                    fs_1.mkdirSync(path);
                break;
            case dsl_compiler_collection_1.VirtualFileSystemNode.FILE:
                fs_1.writeFileSync(path, node.getValue());
                break;
        }
    });
}
//# sourceMappingURL=index.js.map