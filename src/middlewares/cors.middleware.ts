import express from 'express';
import cors from 'cors';
import { StaticOrigin } from '@shared/types/cors.type';

// Edit the whitelist array to include the origins you want to allow
const whitelist: string[] = ['http://localhost:4000'];

const corsOptions: cors.CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, origin?: StaticOrigin) => void,
  ) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} is not allowed by CORS!`));
    }
  },
};

const corsMiddleware = (): express.RequestHandler => cors(corsOptions);

export { corsMiddleware };
