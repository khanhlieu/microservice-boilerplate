import express from 'express';
import cookieParser from 'cookie-parser';

const cookiePareserMiddleware = (): express.RequestHandler => {
  return cookieParser(
    process.env.COOKIE_PARSER_SECRET ||
      'microservice-name-cookie-parser-secret',
  );
};

export { cookiePareserMiddleware };
