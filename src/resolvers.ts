import * as bcrypt from 'bcryptjs';
import { Resolvers, UserResolvers } from "./generated/graphqlgen";
import { User } from './entity/User';

const resolvers: Resolvers = {
  Query: {
    hello: (_, {name}) => `hello ${name}`
  },
  Mutation: {
    register: async (_,{email, password}) => {
      const hashPassword = await bcrypt.hash(password, 10)
      const user = User.create({
        email,
        password: hashPassword
      })
      await user.save()
      console.log(`Successfuly registered ${user}`)
      // return true;
      return user;
    }
  },
  User: {
    ...UserResolvers.defaultResolvers
  }
};
export default resolvers;