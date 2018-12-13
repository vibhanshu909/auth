// import "reflect-metadata";
import { GraphQLServer } from 'graphql-yoga'
import { importSchema } from 'graphql-import'
import resolvers from './resolvers';

const typeDefs = importSchema('./src/schema.graphql')

const server = new GraphQLServer({ typeDefs, resolvers })
server.start((options) => console.log(`${JSON.stringify(options)} Server is running on localhost:4000`))