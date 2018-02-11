# graphql-where-inputtype

A set of utility functions to create GraphQLInputObjects suitable for dynamic queries

## Usage

Schema
```
const TestType = new GraphQLObjectType({
  name: "Test",
  fields: () => ({
    stringField: {
      type: GraphQLString,
      resolve: () => "HelloWorld"
    },
    intField: {
      type: GraphQLInt,
      resolve: () => 1
    },
    floatField: {
      type: GraphQLFloat,
      resolve: () => 1.001
    },
    booleanField: {
      type: GraphQLFloat,
      resolve: () => true
    }
  })
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: () => ({
      testQuery: {
        type: TestType,
        resolve: () => ({}),
        args: {
          where: {
            type: generateWhereInputType({
              name: "TestWhereArgs",
              baseType: TestType
            })
          }
        }
      }
    })
  })
})
```

Query
```
query LetsDoThis {
  testQuery (
     where: {
        stringField: {
          eq: 'Hello World!',
          like: '%World'
        },
        intField: {
          gt: 0
          lte: 1
        }
     }
  ) {
    stringField
    intField
  }
}
```

## Functions

### generateGraphQLWhereInputObjectType(options)

Using the fields from a GraphQLObjectType, generated a GraphQLInputObjectType

Option | Description
-------|-----
name   | `Required` _string_ The name of the generated GraphQLInputType
baseType   | _GraphQLObjectType_ The GraphQLObjectType to generate a where.
description  | _string_ GraphQLInputTypeString
fields  | _{ [fieldName]: GraphQLInputFieldConfig }_  Additional fields that will be. Required if no baseType is provided

### generateGraphQLWhereInputType(options)

Generate a single GraphQLWhereInputType. Useful when you want to add additional fields to the GraphQLWhereInputObjectType.

### generateShorthandGraphQLWhereInputType(options)

### resolveWhereInputTypes()

## Complete Operator List


## Shorthand Equals

Until GraphQL supports [InputUnions](https://github.com/facebook/graphql/pull/395) its not possible to generate an InputObject that does not require the operator to be specified

If you wish to have a shorthand `equals` method you will need to use them as seperate InputArgs

For example

```
query THIS_IS_NOT_POSSIBLE {
  testQuery (
     where: {
        stringField: "Hello World,
        intField: {
          gt: 0
          lte: 1
        }
     }
  ) {
    stringField
    intField
  }
}


query SO_LETS_DO_THIS_INSTEAD {
  testQuery (
     stringField: "Hello World,
     where: {
        intField: {
          gt: 0
          lte: 1
        }
     }
  ) {
    stringField
    intField
  }
}

```
