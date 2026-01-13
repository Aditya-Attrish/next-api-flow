import { ApiResponse, PaginatedData, ErrorResponse, ResponseOptions } from '../types';
import { HttpStatus } from '../utils/statusCodes';

export class ResponseBuilder {
  private static defaultOptions: Partial<ResponseOptions> = {
    headers: { 'Content-Type': 'application/json' },
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: any;

  static success<T>(
    data?: T,
    message: string = 'Success',
    options: ResponseOptions = {}
  ): { response: ApiResponse<T>; options: ResponseOptions } {
    const timestamp = new Date().toISOString();
    const statusCode = options.statusCode || HttpStatus.OK;

    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
      meta: {
        timestamp,
        path: options.path,
        requestId: options.requestId,
      },
    };

    return {
      response,
      options: {
        statusCode,
        headers: { ...this.defaultOptions.headers, ...options.headers },
      },
    };
  }

  static paginated<T>(
    data: PaginatedData<T>,
    message: string = 'Success',
    options: ResponseOptions = {}
  ) {
    const timestamp = new Date().toISOString();
    const statusCode = options.statusCode || HttpStatus.OK;

    const response: ApiResponse<T[]> = {
      success: true,
      message,
      data: data.items,
      meta: {
        timestamp,
        path: options.path,
        requestId: options.requestId,
        pagination: {
          page: data.page,
          limit: data.limit,
          total: data.total,
          totalPages: data.totalPages,
        },
      },
    };

    return {
      response,
      options: {
        statusCode,
        headers: { ...this.defaultOptions.headers, ...options.headers },
      },
    };
  }

  static error(
    errors: ErrorResponse | ErrorResponse[],
    message: string = 'Error',
    options: ResponseOptions = {}
  ) {
    const timestamp = new Date().toISOString();
    const statusCode = options.statusCode || HttpStatus.BAD_REQUEST;

    const response: ApiResponse = {
      success: false,
      message,
      errors: Array.isArray(errors) ? errors : [errors],
      meta: {
        timestamp,
        path: options.path,
        requestId: options.requestId,
      },
    };

    return {
      response,
      options: {
        statusCode,
        headers: { ...this.defaultOptions.headers, ...options.headers },
      },
    };
  }

  // Helper methods for common errors
  static notFound(message: string = 'Resource not found') {
    return this.error(
      { code: 'NOT_FOUND', message },
      'Resource not found',
      { statusCode: HttpStatus.NOT_FOUND }
    );
  }

  static unauthorized(message: string = 'Unauthorized access') {
    return this.error(
      { code: 'UNAUTHORIZED', message },
      'Authentication required',
      { statusCode: HttpStatus.UNAUTHORIZED }
    );
  }

  static forbidden(message: string = 'Access forbidden') {
    return this.error(
      { code: 'FORBIDDEN', message },
      'Insufficient permissions',
      { statusCode: HttpStatus.FORBIDDEN }
    );
  }

  static validationError(errors: ErrorResponse[]) {
    return this.error(
      errors,
      'Validation failed',
      { statusCode: HttpStatus.UNPROCESSABLE_ENTITY }
    );
  }

  static internalError(message: string = 'Internal server error') {
    return this.error(
      { code: 'INTERNAL_ERROR', message },
      'Something went wrong',
      { statusCode: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}