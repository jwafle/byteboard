const { gql } = require('apollo-server');

const typeDefs = gql`
type User {
    id: ID!
    first_name: String!
    last_name: String!
    weight: Float
    measurements: [Measurement]
    createdAt: String
}

type Measurement {
    meausurement_id: ID!
    user_id: ID
    weight: Float
    createdAt: String!
    values: [Float]!
    frequency: Int!
    max_value: Float
    duration: Float
}

type CreateUserResponse {
    success: Boolean!
    message: String
    user: User
}

type CreateMeasurementResponse {
    success: Boolean!
    message: String
    measurement: Measurement
}

type UpdateUserResponse {
    success: Boolean!
    message: String
    user: User
}

type AssignMeasurementResponse {
    success: Boolean!
    message: String
    user: User
    measurement: Measurement
}


type Query {
    userById(id: ID!): User
    users: [User]
    userByName(first_name: String!, last_name: String!): User
    measurement(measurement_id: ID!): Measurement
    measurements: [Measurement]
    measurementsByID(user_id: ID!): [Measurement]
    measurementsByName(first_name: String!, last_name: String!): [Measurement]
}

type Mutation {
    createOrUpdateUser(first_name: String!, last_name: String!, weight: Float): CreateOrUpdateUserResponse!
    createMeasurement(user_id: ID, weight: Float, values: [Float]!, frequency: Int!): CreateMeasurementResponse!
    assignMeasurement(user_id: ID!, measurement_id: ID!): AssignMeasurementResponse!
}
`

module.exports = typeDefs;