import bunyan from 'bunyan';
import express from 'express';
import { BaseContext } from '@apollo/server';

export interface ApolloServerContext extends BaseContext {
  microserviceName: string;
  port: string;
  env: string;
  logLevel: string;
  mongodbUri: string;
  req: express.Request;
  res: express.Response;
  logger: bunyan;
}
