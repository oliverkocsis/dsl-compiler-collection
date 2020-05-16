# DSL Compiler Collection
DSL Compiler Collection (DCC) is a collection of compilers for domain specific languages. 

# Getting Started

Install `@dsl-cc/dsl-compiler-collection`

    npm install --save @dsl-cc/dsl-compiler-collection

Within your application
1. create an entity node, 
1. add attributes to the entity, 
1. create an abstract syntax graph, 
1. add the entity to the abstract syntax graph,
1. select a compiler backend, 
1. then compile. 

```typescript
import { Enity, AbstractSyntaxGraph, AngularBackend } from '@dsl-cc/dsl-compiler-collection';

const entity = new Entity("Shipping Information");
entity.addAttribute("First Name");
entity.addAttribute("Last Name");
entity.addAttribute("Address");
entity.addAttribute("City");
entity.addAttribute("State");
entity.addAttribute("Postal Code");

const abstractSyntaxGraph = new AbstractSyntaxGraph();
abstractSyntaxGraph.appendNode(entity);

const backend = new AngularBackend();
const virtualFileSystem = backend.generate(abstractSyntaxTree); 
```

# Domain

Domain is a sphere of knowledge. The subject area to which one developes a software. 

The ubiquitous language is a language structured around the domain, used unanimously by every participant to connect all the entities and activities of the domain unambiguously. 

## Entity
An entity has separate and distinct existence and objective or conceptual reality as contrasted with its attributes. An attribute is a quality, character, or characteristic ascribed to the enity. 

## Activity
The current version does not support yet activties. 

# Frontend
The current version supports only [JSON Schema](https://json-schema.org/) to describe a domain with the following restrictions: 
- The entities shall be described as `properties`. 
- The identifier of the entity will inherit the name of the property
- Only types and references can be used, restrictions are not supported yet

## JSON Schema 

```javascript
{
  "title": "Customer Relationship Management",
  "type": "object",
  "properties": {
    "reference": {
      "$ref": "#/definitions/account"
    },
    "object": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "address": {
          "$ref": "#/definitions/address"
        },
        "phone": {
          "type": "string"
        },
        "website": {
          "type": "string"
        },
        "contacts": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/contact"
          }
        }
      }
    },
    "inline": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "address": {
          "type": "object",
          "properties": {
            "street": {
              "type": "string"
            },
            "city": {
              "type": "string"
            },
            "state": {
              "type": "string"
            },
            "country": {
              "type": "string"
            },
            "postalCode": {
              "type": "string"
            }
          }
        },
        "phone": {
          "type": "string"
        },
        "website": {
          "type": "string"
        },
        "contacts": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "firstName": {
                "type": "string"
              },
              "lastName": {
                "type": "string"
              },
              "jobTitle": {
                "type": "string"
              },
              "phone": {
                "type": "string"
              },
              "email": {
                "type": "string"
              }
            }
          }
        }
      }
    }
  },
  "definitions": {
    "address": {
      "type": "object",
      "properties": {
        "street": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "country": {
          "type": "string"
        },
        "postalCode": {
          "type": "string"
        }
      }
    },
    "contact": {
      "type": "object",
      "properties": {
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "jobTitle": {
          "type": "string"
        },
        "phone": {
          "type": "string"
        },
        "email": {
          "type": "string"
        }
      }
    },
    "account": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "address": {
          "$ref": "#/definitions/address"
        },
        "phone": {
          "type": "string"
        },
        "website": {
          "type": "string"
        },
        "contacts": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/contact"
          }
        }
      }
    }
  }
}
```

# Abstract Syntax Graph

## Basic Types
- Text (default)
- Number

## Example: Customer Relationship Management

Account and contact records store much of the information that you and your team collect from your customers. You store data about companies you do business with in accounts. You store data about the people you know and work with in contacts.

Usually, an account has more than one contact associated with it, especially when you're working with a larger company with many departments or locations and you deal with several people to manage the account.

```typescript
import { Enity, Object, AbstractSyntaxGraph, AngularBackend } from '@dsl-cc/dsl-compiler-collection';

const address = new Object("Address");
address.addAttribute("Street");
address.addAttribute("City");
address.addAttribute("State");
address.addAttribute("Country");
address.addAttribute("Postal Code");

const account = new Entity("Account");
account.addAttribute("Name");
account.addAttribute("Phone");
account.addAttribute("Web Site");
account.addAttribute("Address", address);

const contact = new Entity("Contact");
contact.addAttribute("First Name");
contact.addAttribute("Last Name");
contact.addAttribute("Job Title");
contact.addAttribute("Phone");
contact.addAttribute("Email");

const contactsAttribute = account.addAttribute("Contacts", contact, list = true);
const accountAttribute = acontact.addAttribute("Account", account);

const abstractSyntaxGraph = new AbstractSyntaxGraph();
abstractSyntaxGraph.addNode(account);
abstractSyntaxGraph.addNode(contact);
abstractSyntaxGraph.link(contactsAttribute, accountAttribute);

const backend = new AngularBackend();
const virtualFileSystem = backend.generate(abstractSyntaxTree); 
```

# Backend

The current version supports only generate [Angular](https://angular.io/) web applications using [Angular Material](https://material.angular.io/) UI component library. 

# References
- [Domain-driven design](https://en.wikipedia.org/wiki/Domain-driven_design)
- [The Boost Graph Library (BGL)](https://www.boost.org/doc/libs/1_73_0/libs/graph/doc/index.html)
- [Business Process Model and Notation (BPMN)](http://www.bpmn.org/)
- [Basics Guide for Dynamics 365 Customer Engagement](https://docs.microsoft.com/en-us/dynamics365/customerengagement/on-premises/basics/accounts-contacts)





