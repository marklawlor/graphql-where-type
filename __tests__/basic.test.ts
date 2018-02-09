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

import generateWhereInputType from "../src"

const TestType = new GraphQLObjectType({
  name: "Test",
  fields: () => ({
    stringField: {
      type: GraphQLString,
      resolve: () => "HelloWorld"
    },
    booleanField: {
      type: GraphQLBoolean,
      resolve: () => false
    },
    floatField: {
      type: GraphQLFloat,
      resolve: () => 0.0001
    },
    intField: {
      type: GraphQLInt,
      resolve: () => 1
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
        __type: {
          name: "TestWhereArgs",
          kind: "INPUT_OBJECT",
          inputFields: [
            {
              name: "stringField",
              type: {
                kind: "INPUT_OBJECT",
                name: "stringFieldOperations",
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
                    name: "eq",
                    type: {
                      kind: "SCALAR",
                      name: "String",
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
                  }
                ]
              }
            },
            {
              name: "booleanField",
              type: {
                kind: "INPUT_OBJECT",
                name: "booleanFieldOperations",
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
                    name: "eq",
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
                      ofType: null
                    }
                  },
                  {
                    name: "nq",
                    type: {
                      kind: "SCALAR",
                      name: "Boolean",
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
                  }
                ]
              }
            },
            {
              name: "floatField",
              type: {
                kind: "INPUT_OBJECT",
                name: "floatFieldOperations",
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
                    name: "eq",
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
                      name: "Float",
                      ofType: null
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
            },
            {
              name: "intField",
              type: {
                kind: "INPUT_OBJECT",
                name: "intFieldOperations",
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
                    name: "eq",
                    type: {
                      kind: "SCALAR",
                      name: "Int",
                      ofType: null
                    }
                  },
                  {
                    name: "nq",
                    type: {
                      kind: "SCALAR",
                      name: "Int",
                      ofType: null
                    }
                  },
                  {
                    name: "gt",
                    type: {
                      kind: "SCALAR",
                      name: "Int",
                      ofType: null
                    }
                  },
                  {
                    name: "gte",
                    type: {
                      kind: "SCALAR",
                      name: "Int",
                      ofType: null
                    }
                  },
                  {
                    name: "lt",
                    type: {
                      kind: "SCALAR",
                      name: "Int",
                      ofType: null
                    }
                  },
                  {
                    name: "lte",
                    type: {
                      kind: "SCALAR",
                      name: "Int",
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
                        name: "Int"
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
                        name: "Int"
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
                        name: "Int"
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
                        name: "Int"
                      }
                    }
                  },
                  {
                    name: "overlap",
                    type: {
                      kind: "LIST",
                      name: null,
                      ofType: {
                        kind: "SCALAR",
                        name: "Int"
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
                        name: "Int"
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
                        name: "Int"
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
                        name: "Int"
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
