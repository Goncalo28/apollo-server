"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_tools_1 = require("graphql-tools");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const typeDefs = `
  type Query { hello: String }
`;
const resolvers = {
    Query: { hello: () => 'hello world' },
};
const schema = graphql_tools_1.makeExecutableSchema({
    typeDefs,
    resolvers,
});
const app = express_1.default();
app.use('/graphql', body_parser_1.default.json(), apollo_server_express_1.graphqlExpress({ schema }));
app.use(apollo_server_express_1.graphiqlExpress({ endpointURL: '/graphql' }));
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`🚀 http://localhost:${PORT}`);
});
