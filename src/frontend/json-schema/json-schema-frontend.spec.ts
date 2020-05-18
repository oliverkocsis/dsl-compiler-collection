import { VirtualFileSystem, File, Directory } from './../../virtual-file-system/virtual-file-system';
import { Domain } from '../../domain/domain';
import { JsonSchemaFronted } from './json-schema-frontend'
import { readFileSync } from 'fs'

describe("The JsonSchemaFronted", () => {

  let domain: Domain;

  it("can parse a JSON schema file into a Domain", () => {
    const frontend = new JsonSchemaFronted();
    const jsonSchemaFileName = "json-schema.json"
    const jsonSchema = readFileSync(`src/frontend/json-schema/${jsonSchemaFileName}`);
    const virtualFileSystem = new VirtualFileSystem();
    virtualFileSystem.appendChild(new Directory("json-schema").appendChild(new File(jsonSchemaFileName, jsonSchema.toString())));
    domain = frontend.parse(virtualFileSystem);
    expect(domain).toBeDefined();
  });

  describe("The Abstract Syntax Graph", () => {

    let domain: Domain;

    it("contains the Customer Relationship Management domain", () => {
      domain = domain.getNode('Customer Relationship Management');
      expect(domain).toBeDefined();
    });

    describe("The Customer Relationship Management domain", () => {

      let account: DataNode;

      it("contains the Reference data", () => {
        account = domain.getNode('Reference') as DataNode;
        expect(account).toBeDefined();
      });

      describe("The Reference data (Account)", () => {

        let address: DataNode;

        it("contains the Name, the Phone and the Website basic properties", () => {
          expect((account.getNode("Name") as Attribute).getType()).toBe(Attribute.TYPE_STRING);
          expect((account.getNode("Phone") as Attribute).getType()).toBe(Attribute.TYPE_STRING);
          expect((account.getNode("Website") as Attribute).getType()).toBe(Attribute.TYPE_STRING);
        });


        it("contains the Address object property", () => {
          const addressRef = account.getNode("Address") as Attribute;
          expect(addressRef).toBeDefined();
          expect(addressRef.getType()).toBe(Attribute.TYPE_OBJECT);
          expect(addressRef.isList()).toBe(false);
          address = addressRef.getNode() as DataNode;
          expect(address).toBeDefined();
        });

        describe("The Address data", () => {

          it("contains the Sreet, the City, the State, the Country and the Postal Code properties", () => {
            expect((address.getNode("Street") as Attribute).getType()).toBe(Attribute.TYPE_STRING);
            expect((address.getNode("City") as Attribute).getType()).toBe(Attribute.TYPE_STRING);
            expect((address.getNode("State") as Attribute).getType()).toBe(Attribute.TYPE_STRING);
            expect((address.getNode("Country") as Attribute).getType()).toBe(Attribute.TYPE_STRING);
            expect((address.getNode("Postal Code") as Attribute).getType()).toBe(Attribute.TYPE_STRING);
          });

        });

      });

      it("contains the Object data", () => {
        account = domain.getNode('Object') as DataNode;
        expect(account).toBeDefined();
      });

      describe("The Object data (Account)", () => {

        let address: DataNode;

        it("contains the Name, the Phone and the Website basic properties", () => {
          expect((account.getNode("Name") as Attribute).getType()).toBe(Attribute.TYPE_STRING);
          expect((account.getNode("Phone") as Attribute).getType()).toBe(Attribute.TYPE_STRING);
          expect((account.getNode("Website") as Attribute).getType()).toBe(Attribute.TYPE_STRING);
        });


        it("contains the Address object property", () => {
          const addressRef = account.getNode("Address") as Attribute;
          expect(addressRef).toBeDefined();
          expect(addressRef.getType()).toBe(Attribute.TYPE_OBJECT);
          expect(addressRef.isList()).toBe(false);
          address = addressRef.getNode() as DataNode;
          expect(address).toBeDefined();
        });

        describe("The Address data", () => {

          it("contains the Sreet, the City, the State, the Country and the Postal Code properties", () => {
            expect((address.getNode("Street") as Attribute).getType()).toBe(Attribute.TYPE_STRING);
            expect((address.getNode("City") as Attribute).getType()).toBe(Attribute.TYPE_STRING);
            expect((address.getNode("State") as Attribute).getType()).toBe(Attribute.TYPE_STRING);
            expect((address.getNode("Country") as Attribute).getType()).toBe(Attribute.TYPE_STRING);
            expect((address.getNode("Postal Code") as Attribute).getType()).toBe(Attribute.TYPE_STRING);
          });

        });

      });

      it("contains the Inline data", () => {
        account = domain.getNode('Inline') as DataNode;
        expect(account).toBeDefined();
      });

      describe("The Inline data", () => {

        let address: DataNode;

        it("contains the Name, the Phone and the Website basic properties", () => {
          expect((account.getNode("Name") as Attribute).getType()).toBe(Attribute.TYPE_STRING);
          expect((account.getNode("Phone") as Attribute).getType()).toBe(Attribute.TYPE_STRING);
          expect((account.getNode("Website") as Attribute).getType()).toBe(Attribute.TYPE_STRING);
        });


        it("contains the Address object property", () => {
          const addressRef = account.getNode("Address") as Attribute;
          expect(addressRef).toBeDefined();
          expect(addressRef.getType()).toBe(Attribute.TYPE_OBJECT);
          expect(addressRef.isList()).toBe(false);
          address = addressRef.getNode() as DataNode;
          expect(address).toBeDefined();
        });

        describe("The Address data", () => {

          it("contains the Sreet, the City, the State, the Country and the Postal Code properties", () => {
            expect((address.getNode("Street") as Attribute).getType()).toBe(Attribute.TYPE_STRING);
            expect((address.getNode("City") as Attribute).getType()).toBe(Attribute.TYPE_STRING);
            expect((address.getNode("State") as Attribute).getType()).toBe(Attribute.TYPE_STRING);
            expect((address.getNode("Country") as Attribute).getType()).toBe(Attribute.TYPE_STRING);
            expect((address.getNode("Postal Code") as Attribute).getType()).toBe(Attribute.TYPE_STRING);
          });

        });

      });

    });

  });

});