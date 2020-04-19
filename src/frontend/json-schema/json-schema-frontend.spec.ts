import { Frontend } from '../frontend';
import { VirtualFileSystem, File } from './../../virtual-file-system/virtual-file-system';
import { PropertyNode } from './../../abstract-syntax-graph/abstract-syntax-graph';
import { JsonSchemaFronted } from './json-schema-frontend'
import { readFileSync } from 'fs'

describe("The JsonSchemaFronted", function () {

  const ASSETS_FOLDER = 'src/frontend/json-schema/json-schema-frontend.spec-assests'

  let frontend: Frontend;

  beforeAll(() => {
    frontend = new JsonSchemaFronted();
  });

  it("can parse a JSON schema file into an Abstract Syntax Graph", function () {
    const virtualFileSystem = new VirtualFileSystem();
    const shippingAddressFile = 'shipping-address.schema.json'
    const shippingAddressSchema = readFileSync(`${ASSETS_FOLDER}/${shippingAddressFile}`);
    virtualFileSystem.appendChild(new File(shippingAddressFile, shippingAddressSchema.toString()));
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
    const virtualFileSystem = new VirtualFileSystem();
    const productFile = 'product.schema.json';
    const productSchema = readFileSync(`${ASSETS_FOLDER}/${productFile}`);
    virtualFileSystem.appendChild(new File(productFile, productSchema.toString()));
    const productGroupFile = 'product-group.schema.json'
    const productGroupSchema = readFileSync(`${ASSETS_FOLDER}/${productGroupFile}`);
    virtualFileSystem.appendChild(new File(productGroupFile, productGroupSchema.toString()));
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