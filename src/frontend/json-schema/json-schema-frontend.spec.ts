import { Frontend } from '../frontend';
import { Root, File } from './../../virtual-file-system/virtual-file-system';
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
    const root = new Root();
    root.appendChild(new File(`${SHIPPING_ADDRESS}.json`, schema.toString()));
    const abstractSyntaxGraph = frontend.parse(root);
    const shippingAddress = abstractSyntaxGraph.getChildNode(SHIPPING_ADDRESS);
    expect((shippingAddress.getChildNode("Company") as PropertyNode).getType()).toBe(PropertyNode.TYPE_TEXT);
    expect((shippingAddress.getChildNode("First Name") as PropertyNode).getType()).toBe(PropertyNode.TYPE_TEXT);
    expect((shippingAddress.getChildNode("Last Name") as PropertyNode).getType()).toBe(PropertyNode.TYPE_TEXT);
    expect((shippingAddress.getChildNode("Address") as PropertyNode).getType()).toBe(PropertyNode.TYPE_TEXT);
    expect((shippingAddress.getChildNode("City") as PropertyNode).getType()).toBe(PropertyNode.TYPE_TEXT);
    expect((shippingAddress.getChildNode("Postal Code") as PropertyNode).getType()).toBe(PropertyNode.TYPE_NUMBER);
  });
});