import { HttpStatus } from '../utils/statusCodes';
export class ResponseBuilder {
    static success(data, message = 'Success', options = {}) {
        const timestamp = new Date().toISOString();
        const statusCode = options.statusCode || HttpStatus.OK;
        const response = {
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
    static paginated(data, message = 'Success', options = {}) {
        const timestamp = new Date().toISOString();
        const statusCode = options.statusCode || HttpStatus.OK;
        const response = {
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
    static error(errors, message = 'Error', options = {}) {
        const timestamp = new Date().toISOString();
        const statusCode = options.statusCode || HttpStatus.BAD_REQUEST;
        const response = {
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
    static notFound(message = 'Resource not found') {
        return this.error({ code: 'NOT_FOUND', message }, 'Resource not found', { statusCode: HttpStatus.NOT_FOUND });
    }
    static unauthorized(message = 'Unauthorized access') {
        return this.error({ code: 'UNAUTHORIZED', message }, 'Authentication required', { statusCode: HttpStatus.UNAUTHORIZED });
    }
    static forbidden(message = 'Access forbidden') {
        return this.error({ code: 'FORBIDDEN', message }, 'Insufficient permissions', { statusCode: HttpStatus.FORBIDDEN });
    }
    static validationError(errors) {
        return this.error(errors, 'Validation failed', { statusCode: HttpStatus.UNPROCESSABLE_ENTITY });
    }
    static internalError(message = 'Internal server error') {
        return this.error({ code: 'INTERNAL_ERROR', message }, 'Something went wrong', { statusCode: HttpStatus.INTERNAL_SERVER_ERROR });
    }
}
ResponseBuilder.defaultOptions = {
    headers: { 'Content-Type': 'application/json' },
};
