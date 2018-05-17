const express = require('express');
const expressGraphql = require('express-graphql');
const path = require('path');
const compression = require('compression');
const { buildSchema } = require('graphql');
const { schema, country } = require('./country/country.graphql');
const port = process.env.PORT || 4000;

// Create an express server and a GraphQL endpoint
var app = express();

app.use(express.static(path.join(__dirname, '../dist')));
app.use(compression()) //compressing dist folder

app.use('/graphql', expressGraphql({
    schema: buildSchema(schema),
    rootValue: { ...country },
    graphiql: true
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
