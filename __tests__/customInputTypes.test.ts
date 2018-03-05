import {
  graphql,
  GraphQLInt,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLString,
  GraphQLNonNull
} from "graphql"

import * as GraphQLJSON from "graphql-type-json"

import generateWhereInputType from "../src"
const TestType = new GraphQLObjectType({
  name: "Test",
  fields: () => ({
    jsonField: {
      type: GraphQLJSON,
      resolve: () => "{}"
    }
  })
})

describe("Custom Input Types", () => {
  it("JSON", () => {
    const JSONWhereType = generateWhereInputType({
      name: "JSONWhereArgs",
      baseType: TestType,
      scalarOperatorMap: [
        {
          scalar: GraphQLJSON,
          operators: ["eq"]
        }
      ]
    })

    const schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: "Query",
        fields: () => ({
          allTestTypes: {
            type: TestType,
            resolve: () => ({}),
            args: {
              where: {
                type: JSONWhereType
              }
            }
          }
        })
      })
    })

    return expect(
      graphql(
        schema,
        `
          {
            __type(name: "JSONWhereArgs") {
              name
              kind
              inputFields {
                name
                type {
                  name
                  kind
                  inputFields {
                    name
                    type {
                      name
                      kind
                      ofType {
                        name
                        kind
                      }
                    }
                  }
                }
              }
            }
          }
        `
      )
    ).resolves.toEqual({
      data: {
        __type: {
          name: "JSONWhereArgs",
          kind: "INPUT_OBJECT",
          inputFields: [
            {
              name: "jsonField",
              type: {
                kind: "INPUT_OBJECT",
                name: "JsonWhereArgsJsonFieldOperations",
                inputFields: [
                  {
                    name: "and",
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "JSONWhereArgs",
                      ofType: null
                    }
                  },
                  {
                    name: "or",
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "INPUT_OBJECT",
                        name: "JSONWhereArgs"
                      }
                    }
                  },
                  {
                    name: "eq",
                    type: {
                      kind: "SCALAR",
                      name: "JSON",
                      ofType: null
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    })
  })
})
