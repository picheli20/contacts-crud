const express = require('express');
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');
const { schema, country } = require('./country/country.graphql');

// Create an express server and a GraphQL endpoint
var app = express();

app.use('/graphql', expressGraphql({
    schema: buildSchema(schema),
    rootValue: { ...country },
    graphiql: true
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
