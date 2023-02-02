const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const { buildSchema } = require("graphql");
const PORT = process.env.PORT || 3000;

if (PORT === 3000) {
  console.log("Running in development mode");
  HOST = '127.0.0.1'
} else {
  HOST = '0.0.0.0'
}

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Provide resolver functions for your schema fields
const resolvers = {
  hello: () => `returning pg user = ${process.env.PGUSER}`
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers
  })
);

app.listen(PORT, HOST, () => console.log(`Server running on port: ${PORT}`));