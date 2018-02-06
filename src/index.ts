import {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInputObjectTypeConfig,
  GraphQLUnionType,
  GraphQLInputFieldConfigMap,
  GraphQLFloat,
  Thunk
} from "graphql"

export interface WhereInputTypeConfig extends GraphQLInputObjectTypeConfig {
  baseType: GraphQLObjectType
}

export default function generateWhereInputType({
  name,
  description,
  baseType
}: WhereInputTypeConfig): GraphQLInputObjectType {
  const inputType = new GraphQLInputObjectType({
    name,
    description,
    fields: () => {
      return Object.entries(baseType.getFields()).reduce(
        (acc, [key, value]) => {
          return {
            [key]: {
              type: new GraphQLInputObjectType({
                name: key + "Operations",
                fields: (): GraphQLInputFieldConfigMap => ({
                  and: { type: inputType },
                  or: { type: new GraphQLList(inputType) },
                  gt: { type: GraphQLFloat },
                  gte: { type: GraphQLFloat },
                  lt: { type: GraphQLFloat },
                  lte: { type: GraphQLFloat },
                  nq: { type: GraphQLString },
                  eq: { type: GraphQLString },
                  not: { type: GraphQLBoolean },
                  between: { type: new GraphQLList(GraphQLFloat) },
                  notBetween: { type: new GraphQLList(GraphQLFloat) },
                  in: { type: new GraphQLList(GraphQLFloat) },
                  notIn: { type: new GraphQLList(GraphQLFloat) },
                  like: { type: GraphQLString },
                  notLike: { type: GraphQLString },
                  iLike: { type: GraphQLString },
                  notILike: { type: GraphQLString },
                  regex: { type: GraphQLString },
                  notRegex: { type: GraphQLString },
                  overlap: { type: new GraphQLList(GraphQLFloat) },
                  contains: { type: new GraphQLList(GraphQLFloat) },
                  contained: { type: new GraphQLList(GraphQLFloat) },
                  any: { type: new GraphQLList(GraphQLFloat) }
                })
              })
            }
          }
        },
        {}
      )
    }
  })

  // const inputOperationType = new GraphQLObjectType({
  //   name: `Operation${name}`,
  //   fields: () => ({
  //     '=': {
  //       type:

  //     }
  //   })
  // })

  return inputType
}
