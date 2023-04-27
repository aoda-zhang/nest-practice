import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpResType } from './interface';
// 全局错误拦截处理
@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse();
    const status = exception.getStatus();

    // 设置错误信息
    const message = exception.message
      ? exception.message
      : `${status >= 500 ? 'Service Error' : 'Client Error'}`;
    const errorResponse: HttpResType = {
      status: status ?? 400,
      isSuccess: false,
      message,
      data: null,
    };
    response.status(status);
    response.send(errorResponse);
  }
}
