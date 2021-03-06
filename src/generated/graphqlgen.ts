// Code generated by github.com/prisma/graphqlgen, DO NOT EDIT.

import { GraphQLResolveInfo } from "graphql";
import { User } from "../entity/user.type";
import { Context } from "../types";

export namespace QueryResolvers {
  export const defaultResolvers = {};

  export type MeResolver = (
    parent: undefined,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => User | null | Promise<User | null>;

  export interface Type {
    me: (
      parent: undefined,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => User | null | Promise<User | null>;
  }
}

export namespace UserResolvers {
  export const defaultResolvers = {
    id: (parent: User) => parent.id,
    email: (parent: User) => parent.email,
    createdAt: (parent: User) => parent.createdAt,
    updatedAt: (parent: User) => parent.updatedAt
  };

  export type IdResolver = (
    parent: User,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type EmailResolver = (
    parent: User,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type CreatedAtResolver = (
    parent: User,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type UpdatedAtResolver = (
    parent: User,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export interface Type {
    id: (
      parent: User,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>;

    email: (
      parent: User,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>;

    createdAt: (
      parent: User,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>;

    updatedAt: (
      parent: User,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>;
  }
}

export namespace MutationResolvers {
  export const defaultResolvers = {};

  export interface ArgsLogin {
    email: string;
    password: string;
  }

  export interface ArgsRegister {
    email: string;
    password: string;
  }

  export interface ArgsChangePassword {
    email: string;
    password: string;
    newPassword: string;
  }

  export type LoginResolver = (
    parent: undefined,
    args: ArgsLogin,
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type RegisterResolver = (
    parent: undefined,
    args: ArgsRegister,
    ctx: Context,
    info: GraphQLResolveInfo
  ) => User | Promise<User>;

  export type ChangePasswordResolver = (
    parent: undefined,
    args: ArgsChangePassword,
    ctx: Context,
    info: GraphQLResolveInfo
  ) => User | null | Promise<User | null>;

  export interface Type {
    login: (
      parent: undefined,
      args: ArgsLogin,
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>;

    register: (
      parent: undefined,
      args: ArgsRegister,
      ctx: Context,
      info: GraphQLResolveInfo
    ) => User | Promise<User>;

    changePassword: (
      parent: undefined,
      args: ArgsChangePassword,
      ctx: Context,
      info: GraphQLResolveInfo
    ) => User | null | Promise<User | null>;
  }
}

export namespace SubscriptionResolvers {
  export const defaultResolvers = {};

  export type MeResolver = {
    subscribe: (
      parent: undefined,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => AsyncIterator<User | null> | Promise<AsyncIterator<User | null>>;
    resolve?: (
      parent: undefined,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => User | null | Promise<User | null>;
  };

  export interface Type {
    me: {
      subscribe: (
        parent: undefined,
        args: {},
        ctx: Context,
        info: GraphQLResolveInfo
      ) => AsyncIterator<User | null> | Promise<AsyncIterator<User | null>>;
      resolve?: (
        parent: undefined,
        args: {},
        ctx: Context,
        info: GraphQLResolveInfo
      ) => User | null | Promise<User | null>;
    };
  }
}

export interface Resolvers {
  Query: QueryResolvers.Type;
  User: UserResolvers.Type;
  Mutation: MutationResolvers.Type;
  Subscription: SubscriptionResolvers.Type;
}
