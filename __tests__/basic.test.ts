import {
  graphql,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull
} from "graphql"

import * as introspective from "./introspective"

import generateWhereInputType from "../src"

const TestType = new GraphQLObjectType({
  name: "Test",
  fields: () => ({
    testField: {
      type: GraphQLString,
      resolve: () => "HelloWorld"
    }
  })
})

describe("Basic", () => {
  it("can a property's value is a typed string", () => {
    const TestWhereType = generateWhereInputType({
      name: "TestWhereArgs",
      baseType: TestType,
      fields: () => ({})
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
                type: TestWhereType
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
            allTestTypes {
              testField
            }
            __type(name: "TestWhereArgs") {
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
        allTestTypes: {
          testField: "HelloWorld"
        },
        __type: {
          name: "TestWhereArgs",
          kind: "INPUT_OBJECT",
          inputFields: [
            {
              name: "testField",
              type: {
                kind: "INPUT_OBJECT",
                name: "testFieldOperations",
                inputFields: [
                  {
                    name: "and",
                    type: {
                      kind: "INPUT_OBJECT",
                      name: "TestWhereArgs",
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
                        name: "TestWhereArgs"
                      }
                    }
                  },
                  {
                    name: "gt",
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    }
                  },
                  {
                    name: "gte",
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    }
                  },
                  {
                    name: "lt",
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    }
                  },
                  {
                    name: "lte",
                    type: {
                      kind: "SCALAR",
                      name: "Float",
                      ofType: null
                    }
                  },
                  {
                    name: "nq",
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    }
                  },
                  {
                    name: "eq",
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    }
                  },
                  {
                    name: "not",
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    }
                  },
                  {
                    name: "between",
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "Float"
                      }
                    }
                  },
                  {
                    name: "notBetween",
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "Float"
                      }
                    }
                  },
                  {
                    name: "in",
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "Float"
                      }
                    }
                  },
                  {
                    name: "notIn",
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "Float"
                      }
                    }
                  },
                  {
                    name: "like",
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    }
                  },
                  {
                    name: "notLike",
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    }
                  },
                  {
                    name: "iLike",
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    }
                  },
                  {
                    name: "notILike",
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    }
                  },
                  {
                    name: "regex",
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    }
                  },
                  {
                    name: "notRegex",
                    type: {
                      kind: "SCALAR",
                      name: "String",
                      ofType: null
                    }
                  },
                  {
                    name: "overlap",
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "Float"
                      }
                    }
                  },
                  {
                    name: "contains",
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "Float"
                      }
                    }
                  },
                  {
                    name: "contained",
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "Float"
                      }
                    }
                  },
                  {
                    name: "any",
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "Float"
                      }
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
