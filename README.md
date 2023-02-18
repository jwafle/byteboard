# ByteBoard: an API built for a pressure sensing single-arm hangboard

## Developed by: Jared Woelfel
Built to connect to a PostgresQL database using Knex.js. Stores user information as well as measurement data.

Users contain fields in the user type. Users may be created via the createOrUpdateUser mutation which will either create a brand new user or update a pre-existing user depending on if the user's information already exists in the database or not. A user may also be deleted by ID or first name and last name. Note that users cannot have the same first name and last name in this setup.

Measurement type represents raw results from the hangboard. Weight is recorded as the user's weight at time of assigning the measurement to the user (therefore the ratio of bodyweight to force can properly vary as bodyweight changes with training). Frequency is the measurement frequency of the raw values captured in the values array. Therefore, a instants for each measurement can be calculated from frequency and value index. Max value is used to quickly access the user's maximum force created in a single measurement period so that this does not have to be calculated at each request.

## API Schema

User Type:
```
type User {
  id: ID!
  first_name: String!
  last_name: String!
  weight: Float
  measurements: [Measurement]
  created_at: String
}
```
Measurement Type:
```
type Measurement {
  meausurement_id: ID!
  user_id: ID
  weight: Float
  created_at: String!
  values: [Float]!
  frequency: Int!
  max_value: Float
  duration: Float
}
```
Created Measurement Response:
```
type CreateMeasurementResponse {
  success: Boolean!
  message: String
  measurement: Measurement
}
```
Created or Updated User Response:
```
type CreateOrUpdateUserResponse {
  success: Boolean!
  message: String
  user: User
}
```
Deleted User Response:
```
type DeleteUserResponse {
  success: Boolean!
  message: String
  user: User
}
```
Assign Measurement Response:
```
type AssignMeasurementResponse {
  success: Boolean!
  message: String
  user: User
  measurement: Measurement
}
```
Available Queries:
```
type Query {
  userById(id: ID!): User
  users: [User]
  userByName(first_name: String!, last_name: String!): User
  measurement(measurement_id: ID!): Measurement
  measurements: [Measurement]
  measurementsByID(user_id: ID!): [Measurement]
  measurementsByName(first_name: String!, last_name: String!): [Measurement]
}
```
Available Mutations:
```
type Mutation {
  createOrUpdateUser(first_name: String!, last_name: String!, weight: Float): CreateOrUpdateUserResponse!
  deleteUser(user_id: ID!): DeleteUserResponse!
  deleteUserByName(first_name: String!, last_name: String!): DeleteUserResponse!
  createMeasurement(user_id: ID, weight: Float, values: [Float]!, frequency: Int!): CreateMeasurementResponse!
  assignMeasurement(user_id: ID!, measurement_id: ID!): AssignMeasurementResponse!
}
```