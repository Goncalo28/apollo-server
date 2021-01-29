import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import {typeDefs} from './graphql/types/index';
import {resolvers} from './graphql/resolvers/index';
import mongoose from 'mongoose';

const MONGO_DB_URI = process.env.MONGO_DB_URI!

mongoose.connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(on => {
    console.log(`Connected to Mongo! Database name: "${on.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

app.use(graphiqlExpress({ endpointURL: '/graphql' }));

const PORT = process.env.PORT!;

app.listen(PORT, () => {
  console.log(`🚀 http://localhost:${PORT}`);
});
