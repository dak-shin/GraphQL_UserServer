const { buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');

const  user_data_  = require('../MOCK_DATA.json');
const userType = require('./typedefs/userType')

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
                user_data_.push({
                    id : user_data_.length + 1,
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


const schema = new GraphQLSchema({ query: rootQuery, mutation: Mutation});

module.exports = schema;