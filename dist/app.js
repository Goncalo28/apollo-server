"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_tools_1 = require("graphql-tools");
const index_1 = require("./graphql/types/index");
const index_2 = require("./graphql/resolvers/index");
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_DB_URI = process.env.MONGO_DB_URI;
mongoose_1.default.connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(on => {
    console.log(`Connected to Mongo! Database name: "${on.connections[0].name}"`);
})
    .catch(err => {
    console.error('Error connecting to mongo', err);
});
const schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: index_1.typeDefs,
    resolvers: index_2.resolvers,
});
const app = express_1.default();
app.use('/graphql', body_parser_1.default.json(), apollo_server_express_1.graphqlExpress({ schema }));
app.use(apollo_server_express_1.graphiqlExpress({ endpointURL: '/graphql' }));
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`🚀 http://localhost:${PORT}`);
});
