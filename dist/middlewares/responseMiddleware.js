"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiHandler = apiHandler;
exports.apiHandlerWithArgu = apiHandlerWithArgu;
const server_1 = require("next/server");
const responseBuilder_1 = require("../builders/responseBuilder");
function apiHandler(handler) {
    return async () => {
        try {
            const result = await handler();
            // If already a NextResponse, return as is
            if (result instanceof server_1.NextResponse) {
                return result;
            }
            // If using ResponseBuilder format
            if (result?.response && result?.options) {
                const { response, options } = result;
                return server_1.NextResponse.json(response, {
                    status: options.statusCode,
                    headers: options.headers,
                });
            }
            // Default success response
            const { response, options } = responseBuilder_1.ResponseBuilder.success(result);
            return server_1.NextResponse.json(response, {
                status: options.statusCode,
                headers: options.headers,
            });
        }
        catch (error) {
            console.error('API Error:', error);
            const { response, options } = responseBuilder_1.ResponseBuilder.internalError(error.message || 'An unexpected error occurred');
            return server_1.NextResponse.json(response, {
                status: options.statusCode,
                headers: options.headers,
            });
        }
    };
}
function apiHandlerWithArgu(handler) {
    return async (req) => {
        try {
            const result = await handler(req);
            // If already a NextResponse, return as is
            if (result instanceof server_1.NextResponse) {
                return result;
            }
            // If using ResponseBuilder format
            if (result?.response && result?.options) {
                const { response, options } = result;
                return server_1.NextResponse.json(response, {
                    status: options.statusCode,
                    headers: options.headers,
                });
            }
            // Default success response
            const { response, options } = responseBuilder_1.ResponseBuilder.success(result);
            return server_1.NextResponse.json(response, {
                status: options.statusCode,
                headers: options.headers,
            });
        }
        catch (error) {
            console.error('API Error:', error);
            const { response, options } = responseBuilder_1.ResponseBuilder.internalError(error.message || 'An unexpected error occurred');
            return server_1.NextResponse.json(response, {
                status: options.statusCode,
                headers: options.headers,
            });
        }
    };
}
