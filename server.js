const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');
// const {user_data_} = require('./user_data')
// import {user_data} from './user_data.js';

const  user_data_  = require('./MOCK_DATA.json');

const app = express();
// console.log(user_data);
//Exercise type definition
const userType = new GraphQLObjectType({
    name: "User",
    fields:() => ({
        id : { type : GraphQLInt},
        first_name : {type : GraphQLString},
        last_name : {type: GraphQLString},
        email : {type : GraphQLString},
        gender : {type : GraphQLString},
        password :{type : GraphQLString}
    })
})

//Object representing the queries 
const rootQuery = new GraphQLObjectType({
    name : "rootQuery",
    fields: {
        getAllUsers : {
            type : new GraphQLList(userType),
            args : {id : {type : GraphQLInt}},
            resolve(parent, args)
            {
                return user_data_;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name : "Mutation",
    fields: {
        createUser: {
            type: userType,
            args: {
                first_name : {type : GraphQLString},
                last_name : {type: GraphQLString},
                email : {type : GraphQLString},
                gender : {type : GraphQLString},
                password :{type : GraphQLString}
            },
            resolve(parent, args)
            {
                user_data.push({
                    id : user_data.length + 1,
                    first_name: args.first_name,
                    last_name : args.last_name,
                    email : args.email,
                    gender: args.email,
                    password: args.password
                });
                return args;
            }
        }
    }
});

//Schema creation 
const schema = new GraphQLSchema({ query: rootQuery, mutation: Mutation});

app.use('/graphql', graphqlHTTP({
    schema ,
    graphiql : true
}));

app.listen(6969,  () => {
    console.log('Server running on port 6969');
});

