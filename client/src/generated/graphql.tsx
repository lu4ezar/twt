import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
};

export type Content = {
  __typename?: 'Content';
  operation?: Maybe<Operation>;
  number: Scalars['Float'];
};


export type Mutation = {
  __typename?: 'Mutation';
  postTwit: Twit;
  postReply: Twit;
  loginUser: AuthPayload;
};


export type MutationPostTwitArgs = {
  input: PostTwitInput;
};


export type MutationPostReplyArgs = {
  input: PostReplyInput;
};


export type MutationLoginUserArgs = {
  input: UserInput;
};

/** Twit Type */
export enum Operation {
  Add = 'ADD',
  Sub = 'SUB',
  Mult = 'MULT',
  Div = 'DIV'
}

export type PostReplyInput = {
  author: Scalars['ID'];
  parent: Scalars['ID'];
  content: ReplyInput;
};

export type PostTwitInput = {
  author: Scalars['ID'];
  content: TwitInput;
};

export type Query = {
  __typename?: 'Query';
  twitts: Array<Twit>;
  replies: Array<Twit>;
};


export type QueryRepliesArgs = {
  id: Scalars['ID'];
};

export type ReplyInput = {
  operation: Operation;
  number: Scalars['Float'];
};

export type Twit = {
  __typename?: 'Twit';
  _id: Scalars['ID'];
  author: Scalars['ID'];
  content: Content;
  createdAt: Scalars['DateTime'];
  replies: Array<Twit>;
  parent: Scalars['ID'];
};

export type TwitInput = {
  number: Scalars['Float'];
};

/** User Type */
export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  login: Scalars['String'];
  password: Scalars['String'];
};

export type UserInput = {
  login: Scalars['String'];
  password: Scalars['String'];
};
