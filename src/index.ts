import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLScalarType,
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
  GraphQLEnumType,
  Thunk
} from "graphql"

import { pascalCase } from "change-case"

export type Diff<T extends string, U extends string> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T]
export type Omit<U, K extends keyof U> = Pick<U, Diff<keyof U, K>>

export type FieldlessGraphQLInputObjectTypeConfig = Omit<
  GraphQLInputObjectTypeConfig,
  "fields"
>

export interface WhereInputTypeConfig
  extends FieldlessGraphQLInputObjectTypeConfig {
  baseType: GraphQLObjectType
  description?: string
  scalarOperatorMap?: [
    {
      scalar: GraphQLScalarType
      operators: string[]
    }
  ]
}

const scalarOperatorMap: { [index: string]: string[] } = {}

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

const inputOperators = new Map<string, string[]>([
  [GraphQLString.name, ["eq", "nq", "like", "notLike", "iLike", "notILike"]],
  [GraphQLBoolean.name, ["eq", "nq", "not"]],
  [
    GraphQLFloat.name,
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
    GraphQLInt.name,
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
  baseType,
  scalarOperatorMap: customScalarOperatorMap
}: WhereInputTypeConfig): GraphQLInputObjectType {
  const operatorMap = new Map(inputOperators)

  if (customScalarOperatorMap) {
    customScalarOperatorMap.forEach(config =>
      operatorMap.set(config.scalar.name, config.operators)
    )
  }

  const inputObjectType = new GraphQLInputObjectType({
    name,
    description,
    fields: () => {
      return Object.entries(baseType.getFields()).reduce(
        (acc, [key, field]) => {
          debugger
          let inputType = field.type as
            | GraphQLScalarType
            | GraphQLEnumType
            | GraphQLInputObjectType

          if (inputType instanceof GraphQLList) {
            inputType = inputType.ofType
          }

          const operators = operatorMap.get(inputType.name)

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
              name: pascalCase(name + " " + key + " Operations"),
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
    }
  })

  return inputObjectType
}
