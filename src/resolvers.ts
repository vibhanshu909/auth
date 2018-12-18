import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from './entity/User';
import { Resolvers, UserResolvers } from "./generated/graphqlgen";
import { PubSub } from 'graphql-yoga';

const pubsub = new PubSub();

const resolvers: Resolvers = {
  Query: {
    me: async (_, __, ctx) => {
      let tokenUser: any;
      try {
        tokenUser = jwt.verify(ctx.req.cookies.token, process.env.SECRET!)
      } catch (error) {
        throw new Error("Session Expired")
      }
      const user = await User.findOne({ where: { id: tokenUser.id } })
      if (user) {
        return user
      }
      return null
    }
  },
  Mutation: {
    login: async (_, args, ctx) => {
      const user = await User.findOne({ where: { email: args.email } })
      if (user) {
        const status = await bcrypt.compare(args.password, user.password)
        if (status) {
          const token = await jwt.sign(
            JSON.parse(JSON.stringify(user)),
            process.env.SECRET!,
            {
              expiresIn: '5m',
            }
          )
          ctx.res.cookie("token", token, { httpOnly: true })
          return token
        }
        return "Incorrect Password"
      }
      else {
        return "User does not exists"
      }
    },
    register: async (_, args) => {
      const { password } = args
      const hashPassword = await bcrypt.hash(password, 10)
      const user = User.create({
        ...args,
        password: hashPassword
      })
      await user.save()
      return user;
    },
    changePassword: async (_, args) => {
      let user = await User.findOne({ where: { email: args.email } })
      if (user) {
        if (bcrypt.compareSync(args.password, user.password)) {
          const hashPassword = bcrypt.hashSync(args.newPassword, 10)
          await User.update(user.id, {
            ...args,
            password: hashPassword
          }, { reload: true, })
          user = (await User.findOne({ where: { id: user.id } }))!
          pubsub.publish("me", { me: user })
          return user;
        }
        else {
          throw new Error("Mis-match password")
        }
      }
      else {
        throw new Error("No user found!")
      }
    }
  },
  User: {
    ...UserResolvers.defaultResolvers
  },
  Subscription: {
    me: {
      subscribe: async () => {
        return pubsub.asyncIterator<User>('me')
      }
    }

  }
};
export default resolvers;