import { Injectable, LoggerService as ILoggerService } from '@nestjs/common';
import { createLogger, format, transports, Logger, addColors } from 'winston';

const colors = {
  info: 'green',
  warn: 'yellow',
  error: 'red',
};

addColors(colors);

@Injectable()
class LoggerService implements ILoggerService {
  private logger: Logger;
  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-dd HH:mm:ss' }),
        format.printf((msg) => {
          return `${msg.timestamp} [${msg.level}] - ${msg.message}`;
        }),
      ),
      transports: [
        new transports.File({ filename: 'stderr.log', level: 'error' }),
        new transports.File({ filename: 'stdout.log' }),
      ],
    });

    this.logger.add(
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.printf((msg) => {
            return `${msg.timestamp} [${msg.level}] - ${msg.message}`;
          }),
        ),
      }),
    );
  }

  log(message: any, context?: string) {
    context
      ? this.logger.info(`{${context}} ->`, { message: message })
      : this.logger.info(message);
  }
  error(message: any, trace?: string, context?: string) {
    context
      ? this.logger.error(`{${context}} ->`, { message: message })
      : this.logger.error(message);
    if (trace) {
      context
        ? this.logger.error(`{${context}} ->`, { message: trace })
        : this.logger.error(trace);
    }
  }
  warn(message: any, context?: string) {
    context
      ? this.logger.warn(`{${context}} ->`, { message: message })
      : this.logger.warn(message);
  }
  debug?(message: any, context?: string) {
    context
      ? this.logger.debug(`{${context}} ->`, { message: message })
      : this.logger.debug(message);
  }
  verbose?(message: any, context?: string) {
    context
      ? this.logger.verbose(`{${context}} ->`, { message: message })
      : this.logger.verbose(message);
  }
}

export default LoggerService;