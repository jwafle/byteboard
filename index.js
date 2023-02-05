const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const { measurementAPI } = require('./datasources/measurement');
const { userAPI } = require('./datasources/user');
require('dotenv').config()

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  dataSources: () => ({
    userAPI: new measurementAPI({ knexInstance: knex }),
    measurementAPI: new userAPI({ knexInstance: knex }),
  }),
 });

server.listen(PORT, HOST).then(() => console.log(`Server running on port: ${PORT}`));