import { VirtualFileSystem, File, Directory } from './../../virtual-file-system/virtual-file-system';
import { DataNode, PropertyNode, DomainNode, AbstractSyntaxGraph } from './../../abstract-syntax-graph/abstract-syntax-graph';
import { JsonSchemaFronted } from './json-schema-frontend'
import { readFileSync } from 'fs'

describe("The JsonSchemaFronted", () => {

  let abstractSyntaxGraph: AbstractSyntaxGraph;

  it("can parse a JSON schema file into an Abstract Syntax Graph", () => {
    const frontend = new JsonSchemaFronted();
    const jsonSchemaFileName = "json-schema.json"
    const jsonSchema = readFileSync(`src/frontend/json-schema/${jsonSchemaFileName}`);
    const virtualFileSystem = new VirtualFileSystem();
    virtualFileSystem.appendChild(new Directory("json-schema").appendChild(new File(jsonSchemaFileName, jsonSchema.toString())));
    abstractSyntaxGraph = frontend.parse(virtualFileSystem);
    expect(abstractSyntaxGraph).toBeDefined();
  });

  describe("The Abstract Syntax Graph ", () => {

    let domain: DomainNode;

    it("contains the Customer Relationship Management domain", () => {
      domain = abstractSyntaxGraph.getChildNode('Customer Relationship Management');
      expect(domain).toBeDefined();
    });

    describe("The Customer Relationship Management domain", () => {

      let account: DataNode;

      it("contains the Account data", () => {
        account = domain.getChildNode('Account') as DataNode;
        expect(account).toBeDefined();
      });

      describe("The Account data", () => {

        let address: DataNode;

        it("contains the Name, the Phone and the Website basic properties", () => {
          expect((account.getChildNode("Name") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
          expect((account.getChildNode("Phone") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
          expect((account.getChildNode("Website") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
        });


        it("contains the Address object property", () => {
          const addressRef = account.getChildNode("Address") as PropertyNode;
          expect(addressRef).toBeDefined();
          expect(addressRef.getType()).toBe(PropertyNode.TYPE_OBJECT);
          expect(addressRef.isList()).toBe(false);
          address = addressRef.getChildNode() as DataNode;
          expect(address).toBeDefined();
        });

        describe("The Address data", () => {

          it("contains the Sreet, the City, the State, the Country and the Postal Code properties", () => {
            expect((address.getChildNode("Street") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
            expect((address.getChildNode("City") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
            expect((address.getChildNode("State") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
            expect((address.getChildNode("Country") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
            expect((address.getChildNode("Postal Code") as PropertyNode).getType()).toBe(PropertyNode.TYPE_STRING);
          });

        });

      });

    });

  });

});