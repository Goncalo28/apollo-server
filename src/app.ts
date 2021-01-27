import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import dotenv from 'dotenv';
dotenv.config();

const typeDefs : string = `
  type Query { hello: String }
`;

const resolvers = {
  Query: { hello: () => 'hello world' },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

app.use(graphiqlExpress({ endpointURL: '/graphql' }));

const PORT: string | number = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`🚀 http://localhost:${PORT}`);
});
