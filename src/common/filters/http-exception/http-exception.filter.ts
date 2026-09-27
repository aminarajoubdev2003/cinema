import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

type ExceptionResponse = { message: string | string[] }

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const status = exception.getStatus()
    const exceptionResponse = exception.getResponse();

    let message: string | string[]
    if (typeof exceptionResponse === 'string') { 
      message = exceptionResponse
    } else { 
      const responseObject = exceptionResponse as ExceptionResponse;
      message = responseObject.message;
    }
    response.status(status).json({
      success: false,
      statusCode: status,
      message: message, 
    })
  }
}
