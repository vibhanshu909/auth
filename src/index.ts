// import "reflect-metadata";
import * as CookieParser from 'cookie-parser';
import { CorsOptions } from 'cors';
import { importSchema } from 'graphql-import';
import { GraphQLServer, Options } from 'graphql-yoga';
import * as morgan from 'morgan';
import * as path from 'path';
import resolvers from './resolvers';
import createConn from './utils/createConn';

export const startServer = async () => {
  const typeDefs = importSchema(path.join(__dirname, 'schema.graphql'))
  await createConn()
  const server = new GraphQLServer({
    typeDefs,
    resolvers: resolvers as any,
    context: ({
      request: req,
      response: res
    }) => {
      return { req, res }
    }
  })
  server.express.use(CookieParser())
  server.express.use(morgan('dev'))
  // server.express.use(morgan('combined'))

  const whitelist = ['*']
  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      if (whitelist.includes("*") || whitelist.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "authorization"],
    credentials: true
  }

  const options: Options = {
    debug: process.env.NODE_ENV === "development",
    tracing: process.env.NODE_ENV === "development",
    cors: corsOptions
  }
  await server.start(options)
  console.log(`Server is running on localhost:4000`);
}

try {
  startServer();
} catch (error) {
  console.log(error);
}