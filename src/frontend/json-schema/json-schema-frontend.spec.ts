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
    const shippingAddressFile = 'shipping-information.schema.json'
    const shippingAddressSchema = readFileSync(`${ASSETS_FOLDER}/${shippingAddressFile}`);
    virtualFileSystem.appendChild(new File(shippingAddressFile, shippingAddressSchema.toString()));
    const abstractSyntaxGraph = frontend.parse(virtualFileSystem);
    const shippingAddress = abstractSyntaxGraph.getChildNode('Shipping Information');
    expect((shippingAddress.getChildNode("Company") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
    expect((shippingAddress.getChildNode("First Name") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
    expect((shippingAddress.getChildNode("Last Name") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
    expect((shippingAddress.getChildNode("Address") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
    expect((shippingAddress.getChildNode("City") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
    expect((shippingAddress.getChildNode("Postal Code") as PropertyNode).getType()).toBe(PropertyNode.TYPE_NUMBER);
  });

  it("can parse multiple JSON schema files with hierarchy into an Abstract Syntax Graph", function () {
    const virtualFileSystem = new VirtualFileSystem();
    const productBacklogItemFile = 'product-backlog-item.schema.json';
    const productBacklogItemSchema = readFileSync(`${ASSETS_FOLDER}/${productBacklogItemFile}`);
    virtualFileSystem.appendChild(new File(productBacklogItemFile, productBacklogItemSchema.toString()));
    const productBacklogFile = 'product-backlog.schema.json'
    const productBacklogSchema = readFileSync(`${ASSETS_FOLDER}/${productBacklogFile}`);
    virtualFileSystem.appendChild(new File(productBacklogFile, productBacklogSchema.toString()));
    const abstractSyntaxGraph = frontend.parse(virtualFileSystem);
    const productBacklogItem = abstractSyntaxGraph.getChildNode('Product Backlog Item');
    expect((productBacklogItem.getChildNode("Name") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
    expect((productBacklogItem.getChildNode("Description") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
    expect((productBacklogItem.getChildNode("Order") as PropertyNode).getType()).toBe(PropertyNode.TYPE_NUMBER);
    expect((productBacklogItem.getChildNode("Estimate") as PropertyNode).getType()).toBe(PropertyNode.TYPE_OBJECT);
    expect((productBacklogItem.getChildNode("Value") as PropertyNode).getType()).toBe(PropertyNode.TYPE_OBJECT);
    expect((productBacklogItem.getChildNode("Completeness") as PropertyNode).getType()).toBe(PropertyNode.TYPE_OBJECT);
    const parent = productBacklogItem.getChildNode("Parent") as PropertyNode;
    expect(parent.getType()).toBe(PropertyNode.TYPE_OBJECT);
    expect(parent.isList()).toBe(false);
    expect(parent.getChildNode()).toBe(productBacklogItem);
    const children = productBacklogItem.getChildNode("Children") as PropertyNode;
    expect(children.getType()).toBe(PropertyNode.TYPE_OBJECT);
    expect(children.isList()).toBe(true);
    expect(children.getChildNode()).toBe(productBacklogItem);
    const productGroup = abstractSyntaxGraph.getChildNode('Product Backlog');
    expect((productGroup.getChildNode("Name") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
    const productBacklogItems = productBacklogItem.getChildNode("Product Backlog Items") as PropertyNode;
    expect(productBacklogItems.getType()).toBe(PropertyNode.TYPE_OBJECT);
    expect(productBacklogItems.isList()).toBe(true);
    expect(productBacklogItems.getChildNode()).toBe(productBacklogItem);
  });
});