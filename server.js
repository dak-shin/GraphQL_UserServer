const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schemas/schema');

const app = express();

app.use('/graphql', graphqlHTTP({
    schema ,
    graphiql : true
}));

app.listen(6969,  () => {
    console.log('Server running on port 6969');
});

