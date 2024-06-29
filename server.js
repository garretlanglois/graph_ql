const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
const path = require('path');

const typeDefs = gql(fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'));

const resolvers = {
  Query: {
    telemetry: async (_, { subsystem, paramName }) => {
      const dummyData = [
        {
          timestamp: new Date().toISOString(),
          paramName: paramName || 'dummy_param',
          value: Math.random() * 100
        }
      ];
      return dummyData;
    }
  }
};


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`ready at ${url}`);
});
