#!/usr/bin/env node

import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { spawn } from 'child_process';
import { JsonSchemaFronted, AngularBackend, VirtualFileSystem, Directory, File, VirtualFileSystemNode } from '@dsl-cc/dsl-compiler-collection';

const inputPath = 'dsl';
const outputPath = 'angular';

const defaults = {
  cwd: process.cwd(),
  env: process.env,
  shell: true
};

const cmd = existsSync('./' + outputPath + '/package.json') ? 'npm run angular-update' : 'npm run angular-new'

const bat = spawn(cmd, defaults);

bat.stdout.on('data', (data: Buffer) => {
  console.log(data.toString());
});
bat.stderr.on('data', (data: Buffer) => {
  console.error(data.toString());
});
bat.on('close', (code: any) => {
  console.log(`child process exited with code ${code}`);
  console.log(`compile starts`);
  compile();
  console.log(`compile ends`);
});
bat.on('error', (error: any) => {
  console.error(`error: ${error}`);
});

function compile() {
  const frontend = new JsonSchemaFronted();
  const backend = new AngularBackend();

  const input = new VirtualFileSystem();
  const jsonSchemaDir = new Directory("json-schema");
  input.appendChild(jsonSchemaDir);
  const files = readdirSync(inputPath + "/json-schema");
  for (const name of files) {
    const file = readFileSync(inputPath + "/json-schema/" + name)
    jsonSchemaDir.appendChild(new File(name, file.toString()));
  }

  const abstractSyntaxGraph = frontend.parse(input);
  const output = backend.generate(abstractSyntaxGraph);

  if (!existsSync(outputPath)) mkdirSync(outputPath);
  output.visit((node: VirtualFileSystemNode) => {
    const path = './' + outputPath + node.getPathName();
    switch (node.getType()) {
      case VirtualFileSystemNode.DIRECTORY:
        if (!existsSync(path)) mkdirSync(path);
        break;
      case VirtualFileSystemNode.FILE:
        writeFileSync(path, (node as File).getValue());
        break;
    }
  });
}
