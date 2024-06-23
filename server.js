const { ApolloServer, gql } = require('apollo-server');
const { exec } = require('child_process');

const typeDefs = gql`
  type Query {
    runScript(arg: String!): String
  }
`;

const resolvers = {
  Query: {
    runScript: (_, { arg }) => {
      return new Promise((resolve, reject) => {
        exec(`python3 script.py ${arg}`, (error, stdout, stderr) => {
          if (error) {
            reject(`Error: ${error.message}`);
          } else if (stderr) {
            reject(`Error: ${stderr}`);
          } else {
            resolve(stdout.trim());
          }
        });
      });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });


server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
