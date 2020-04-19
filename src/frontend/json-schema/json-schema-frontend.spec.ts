import { Frontend } from '../frontend';
import { VirtualFileSystem, File } from './../../virtual-file-system/virtual-file-system';
import { PropertyNode } from './../../abstract-syntax-graph/abstract-syntax-graph';
import { JsonSchemaFronted } from './json-schema-frontend'
import { readFileSync } from 'fs'

describe("The JsonSchemaFronted", function () {

  let frontend: Frontend;

  beforeAll(() => {
    frontend = new JsonSchemaFronted();
  });

  it("can parse a JSON schema file into an Abstract Syntax Graph", function () {
    const schema = readFileSync(`src/frontend/json-schema/spec-assets/shipping-address.json`);
    const virtualFileSystem = new VirtualFileSystem();
    virtualFileSystem.appendChild(new File('shipping-address.json', schema.toString()));
    const abstractSyntaxGraph = frontend.parse(virtualFileSystem);
    const shippingAddress = abstractSyntaxGraph.getChildNode('Shipping Address');
    expect((shippingAddress.getChildNode("Company") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
    expect((shippingAddress.getChildNode("First Name") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
    expect((shippingAddress.getChildNode("Last Name") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
    expect((shippingAddress.getChildNode("Address") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
    expect((shippingAddress.getChildNode("City") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
    expect((shippingAddress.getChildNode("Postal Code") as PropertyNode).getType()).toBe(PropertyNode.TYPE_NUMBER);
  });

  it("can parse multiple JSON schema files with hierarchy into an Abstract Syntax Graph", function () {
    const productSchema = readFileSync(`src/frontend/json-schema/spec-assets/product.json`);
    const productGroupSchema = readFileSync(`src/frontend/json-schema/spec-assets/product-group.json`);
    const virtualFileSystem = new VirtualFileSystem();
    virtualFileSystem.appendChild(new File('product.json', productSchema.toString()));
    virtualFileSystem.appendChild(new File('/product-group.json', productGroupSchema.toString()));
    const abstractSyntaxGraph = frontend.parse(virtualFileSystem);
    const product = abstractSyntaxGraph.getChildNode('Product');
    expect((product.getChildNode("Name") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
    expect((product.getChildNode("Description") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
    expect((product.getChildNode("Price") as PropertyNode).getType()).toBe(PropertyNode.TYPE_NUMBER);
    expect((product.getChildNode("Group") as PropertyNode).getType()).toBe(PropertyNode.TYPE_REFERENCE);
    const productGroup = abstractSyntaxGraph.getChildNode('Product Group');
    expect((productGroup.getChildNode("Name") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
    expect((productGroup.getChildNode("Description") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
    expect((productGroup.getChildNode("Group") as PropertyNode).getType()).toBe(PropertyNode.TYPE_REFERENCE);
  });
});