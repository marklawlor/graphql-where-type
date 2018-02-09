import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLOutputType,
  GraphQLObjectType,
  GraphQLInputFieldConfig,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInputObjectTypeConfig,
  GraphQLUnionType,
  GraphQLInputType,
  GraphQLInputFieldConfigMap,
  GraphQLFloat,
  Thunk
} from "graphql"

export interface WhereInputTypeConfig extends GraphQLInputObjectTypeConfig {
  baseType: GraphQLObjectType
}

const scalarOperatorMap: { [index: string]: string[] } = {}

const operators = {
  between: {}
}

const arrayOperators = [
  "between",
  "notBetween",
  "in",
  "notIn",
  "overlap",
  "contains",
  "contained",
  "any"
]

const inputOperators = new Map<GraphQLInputType, string[]>([
  [GraphQLString, ["eq", "nq", "like", "notLike", "iLike", "notILike"]],
  [GraphQLBoolean, ["eq", "nq", "not"]],
  [
    GraphQLFloat,
    [
      "eq",
      "nq",
      "gt",
      "gte",
      "lt",
      "lte",
      "between",
      "notBetween",
      "in",
      "notIn",
      "overlap",
      "contains",
      "contained",
      "any"
    ]
  ],
  [
    GraphQLInt,
    [
      "eq",
      "nq",
      "gt",
      "gte",
      "lt",
      "lte",
      "between",
      "notBetween",
      "in",
      "notIn",
      "overlap",
      "contains",
      "contained",
      "any"
    ]
  ]
])

export default function generateWhereInputType({
  name,
  description,
  baseType
}: WhereInputTypeConfig): GraphQLInputObjectType {
  const inputObjectType = new GraphQLInputObjectType({
    name,
    description,
    fields: () =>
      Object.entries(baseType.getFields()).reduce(
        (acc, [key, field]) => {
          const inputType = field.type as GraphQLInputType

          const operators = inputOperators.get(inputType)

          if (!operators) {
            return acc
          }

          const fieldConfig = operators.reduce(
            (acc, operator) => {
              acc[operator] = arrayOperators.includes(operator)
                ? { type: new GraphQLList(inputType) }
                : { type: inputType }
              return acc
            },
            {} as GraphQLInputFieldConfigMap
          )

          acc[key] = {
            type: new GraphQLInputObjectType({
              name: key + "Operations",
              fields: (): GraphQLInputFieldConfigMap => ({
                and: { type: inputObjectType },
                or: { type: new GraphQLList(inputObjectType) },
                ...fieldConfig
              })
            })
          }
          return acc
        },
        {} as GraphQLInputFieldConfigMap
      )
  })

  return inputObjectType
}
