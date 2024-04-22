import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { eventContext } from 'aws-serverless-express/middleware';
import { createServer, proxy } from 'aws-serverless-express';
import express from 'express';
import { Server } from 'http';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';

import { AppModule } from './app.module';

const binaryMimeTypes: string[] = [];

let cachedServer: Server;

const bootstrapServer = async (): Promise<Server> => {
  if (!cachedServer) {
    const expressApp = express();
    const nest = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    nest.use(eventContext());
    await nest.init();
    cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
  }
  return cachedServer;
};

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
) => {
  cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
