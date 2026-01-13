"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseBuilder = void 0;
const statusCodes_1 = require("../utils/statusCodes");
class ResponseBuilder {
    static success(data, message = 'Success', options = {}) {
        const timestamp = new Date().toISOString();
        const statusCode = options.statusCode || statusCodes_1.HttpStatus.OK;
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
        const statusCode = options.statusCode || statusCodes_1.HttpStatus.OK;
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
        const statusCode = options.statusCode || statusCodes_1.HttpStatus.BAD_REQUEST;
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
        return this.error({ code: 'NOT_FOUND', message }, 'Resource not found', { statusCode: statusCodes_1.HttpStatus.NOT_FOUND });
    }
    static unauthorized(message = 'Unauthorized access') {
        return this.error({ code: 'UNAUTHORIZED', message }, 'Authentication required', { statusCode: statusCodes_1.HttpStatus.UNAUTHORIZED });
    }
    static forbidden(message = 'Access forbidden') {
        return this.error({ code: 'FORBIDDEN', message }, 'Insufficient permissions', { statusCode: statusCodes_1.HttpStatus.FORBIDDEN });
    }
    static validationError(errors) {
        return this.error(errors, 'Validation failed', { statusCode: statusCodes_1.HttpStatus.UNPROCESSABLE_ENTITY });
    }
    static internalError(message = 'Internal server error') {
        return this.error({ code: 'INTERNAL_ERROR', message }, 'Something went wrong', { statusCode: statusCodes_1.HttpStatus.INTERNAL_SERVER_ERROR });
    }
}
exports.ResponseBuilder = ResponseBuilder;
ResponseBuilder.defaultOptions = {
    headers: { 'Content-Type': 'application/json' },
};
