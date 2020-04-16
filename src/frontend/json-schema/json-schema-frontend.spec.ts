import { Frontend } from '../frontend';
import { VirtualFileSystem, File } from './../../virtual-file-system/virtual-file-system';
import { AbstractSyntaxGraph, PropertyNode } from './../../abstract-syntax-graph/abstract-syntax-graph';
import { JsonSchemaFronted } from './json-schema-frontend'
import { readFileSync } from 'fs'

describe("The JsonSchemaFronted", function () {

  let frontend: Frontend;

  beforeAll(() => {
    frontend = new JsonSchemaFronted();
  });

  it("can parse a JSON Schema files into an Abstract Syntax Graph", function () {
    const SHIPPING_ADDRESS = "Shipping Address"
    const schema = readFileSync(`src/frontend/json-schema/spec-assets/${SHIPPING_ADDRESS}.json`)
    const virtualFileSystem = new VirtualFileSystem();
    virtualFileSystem.appendChild(new File(`${SHIPPING_ADDRESS}.json`, schema.toString()));
    const abstractSyntaxGraph = frontend.parse(virtualFileSystem);
    const shippingAddress = abstractSyntaxGraph.getChildNode(SHIPPING_ADDRESS);
    expect((shippingAddress.getChildNode("Company") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
    expect((shippingAddress.getChildNode("First Name") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
    expect((shippingAddress.getChildNode("Last Name") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
    expect((shippingAddress.getChildNode("Address") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
    expect((shippingAddress.getChildNode("City") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
    expect((shippingAddress.getChildNode("Postal Code") as PropertyNode).getType()).toBe(PropertyNode.TYPE_NUMBER);
  });
});