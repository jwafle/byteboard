const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const measurementAPI = require("./datasources/measurement");
const userAPI = require("./datasources/user");
require("dotenv").config()
const knex = require("./database/knex");

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  dataSources: () => ({
    measurementAPI: new measurementAPI({ knexInstance: knex }),
    userAPI: new userAPI({ knexInstance: knex })
  })
});

server.listen(PORT, HOST).then(() => console.log(`Server running on port: ${PORT}`));