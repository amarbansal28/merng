const { ApolloServer, PubSub} = require('apollo-server');
const mongoose = require('mongoose');
const {MONGODB} = require('./config.js');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req, pubsub}) 
});

mongoose.connect(MONGODB, {useNewUrlParser: true})
.then(() => {
    console.log('MONGODB connected!');
    return server.listen({port: 5000})
}).then((res) => {
    console.log(`server running at ${res.url}`);
})