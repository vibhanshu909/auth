import { Resolvers } from "./generated/graphqlgen";

const resolvers: Resolvers = {
  Query: {
    hello: (_, {name}) => `hello ${name}`
  }
};
export default resolvers;