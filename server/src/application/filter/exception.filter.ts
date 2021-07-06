import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import LoggerService from '../../domain/service/logger.service';

  /**
   * Filter for all exceptions.
   * Exception Filters are called after the route handler and after the interceptors. 
   * They are the last place to make changes before a response goes out.
   */
  @Catch()
  export class ExceptionsAllFilter implements ExceptionFilter {

    constructor(private readonly logger: LoggerService) { }

    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();

      console.log("ExceptionsAllFilter catch a exception:");

      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const payloadMessage =
        exception instanceof HttpException && exception.getResponse();
  
        exception instanceof HttpException &&
        exception.getStatus() >= 500 && this.logger.error(exception.message, exception.stack, exception.name);
  
      exception instanceof Error &&
        this.logger.error(exception.message, exception.stack, exception.name);
  
      const errorMsg = ((exception instanceof Error) || (exception instanceof HttpException)) ? exception.message : payloadMessage;

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        payload: payloadMessage,
        message: errorMsg,
      });
    };
  };