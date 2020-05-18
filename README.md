DSL Compiler Collection lets you to focus on the solution instead of the development.

# DSL Compiler Collection
DSL Compiler Collection is a collection of compilers for domain specific languages. A domain specific languages is a language specialized to a particular domain. Domain is a sphere of knowledge; the subject area to which one developes a software. The ubiquitous language is a language structured around the domain, used unanimously by every participant to connect all the entities and activities of the domain unambiguously. 

## Entity
An entity is the single, definitive source of truth about every nouns of your ubiquitous language. An entity has separate and distinct existence and objective or conceptual reality as contrasted with its attributes. An attribute is a quality, character, or characteristic ascribed to the enity.

## Activity
An activity is the single, definitive source of truth about every verbs of your ubiquitous language. 

# Getting Started

If you are new to Angular or getting started with a new Angular application, see [Angular's full Getting Started Guide](https://angular.io/start) and [Setting up your environment](https://angular.io/guide/setup-local).

For existing applications, follow the steps below to begin using DSL Compiler Collection.

Use the Angular CLI's install schematic to set up your DSL Compiler Collection project by running the following command:

```
ng add @dsl-cc/dsl-compiler-collection
```

The `ng add` command will install
- Add project dependencies to `package.json`

Describe your entity within the `address.json` file 

```json
{
	"Address" : {
		"Street": null, 
		"City": null, 
		"State": null, 
		"Country", null, 
		"Postal Code": null
	}
}
``` 

Generate the form
```
ng generate @dsl-cc/dsl-compiler-collection:form address.json
```

This will generate an angular reactive form within the current folder. 

# Roadmap
- Lists
- Angular Material and Bootstrap themes
- Relationships (one-to-one, one-to-many)
- CLI
- Layouts
- Activities
- Python Djanog

# Contributing
We would love for you to contribute to DSL Compiler Collection and help make it even better than it is today! As a contributor, here are the guidelines we would like you to follow:

- Code of Conduct