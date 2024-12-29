import bunyan, { LogLevel } from 'bunyan';

const logger = bunyan.createLogger({
  name: process.env.MICROSERVICE_NAME || 'microservice-name',
  level: (process.env.LOG_LEVEL || 'info') as LogLevel,
});

export { logger };
