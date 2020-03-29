# DSL Compiler Collection
DSL Compiler Collection (DCC) is a collection of compilers for domain specific languages

# Getting Started

Install `@dsl-cc/dsl-compiler-collection`

    npm install --save @dsl-cc/dsl-compiler-collection

Create a data node, add properties, then compile. 

    import { AngularBackend, AbstractSyntaxGraph, DataNode, PropertyNode, Directory, File, VirtualFileSystem } from '@dsl-cc/dsl-compiler-collection';

    const backend = new AngularBackend();
    const abstractSyntaxTree = new AbstractSyntaxGraph();
    const data = new DataNode("Shipping Information");
    data.appendChildNode(new PropertyNode("Company", PropertyNode.TYPE_TEXT));
    data.appendChildNode(new PropertyNode("First Name", PropertyNode.TYPE_TEXT));
    data.appendChildNode(new PropertyNode("Last Name", PropertyNode.TYPE_TEXT));
    data.appendChildNode(new PropertyNode("Address", PropertyNode.TYPE_TEXT));
    data.appendChildNode(new PropertyNode("City", PropertyNode.TYPE_TEXT));
    data.appendChildNode(new PropertyNode("Postal Code", PropertyNode.TYPE_NUMBER));
    abstractSyntaxTree.appendChildNode(data);
    const virtualFileSystem = backend.generate(abstractSyntaxTree); 

# Domain

## Domain
A sphere of knowledge (ontology), influence, or activity. The subject area to which the user applies a program is the domain of the software;

## Bounded context
Multiple models are in play on any large project. Yet when code based on distinct models is combined, software becomes buggy, unreliable, and difficult to understand. Communication among team members becomes confusing. It is often unclear in what context a model should not be applied.

## Ubiquitous Language
A language structured around the domain model and used by all team members to connect all the activities of the team with the software.

## Reference
[Domain-driven design](https://en.wikipedia.org/wiki/Domain-driven_design)

# Business Process Model and Notation (BPMN)
A standard [Business Process Model and Notation (BPMN)](http://www.bpmn.org/) will provide businesses with the capability of understanding their internal business procedures in a graphical notation and will give organizations the ability to communicate these procedures in a standard manner. Furthermore, the graphical notation will facilitate the understanding of the performance collaborations and business transactions between the organizations. This will ensure that businesses will understand themselves and participants in their business and will enable organizations to adjust to new internal and B2B business circumstances quickly.

## Data 
Data provide information about what Activities require to be performed and/or what they produce, Data can represent a singular object or a collection of objects.

## Activity
Work that a company or organization performs using business processes. An activity can be atomic or non-atomic (compound). The types of activities that are a part of a Process Model are: Process, Sub-Process, and Task.

## Reference
[Business Process Model and Notation (BPMN)](http://www.bpmn.org/)
[Business Process Model and Notation (BPMN) Version 2.0](https://www.omg.org/spec/BPMN/2.0/PDF)
[BPMN Quick Guide](https://www.bpmnquickguide.com/)

# Coming Soon .. 

- Compliance
- Firebase




