import bunyan from 'bunyan';

declare global {
  namespace Express {
    interface Request {
      logger: bunyan;
    }
  }
}
