import { ApiResponse, PaginatedData, ErrorResponse, ResponseOptions } from '../types';
export declare class ResponseBuilder {
    private static defaultOptions;
    options: any;
    response: any;
    static success<T>(data?: T, message?: string, options?: ResponseOptions): {
        response: ApiResponse<T>;
        options: ResponseOptions;
    };
    static paginated<T>(data: PaginatedData<T>, message?: string, options?: ResponseOptions): {
        response: ApiResponse<T[]>;
        options: {
            statusCode: number;
            headers: {
                [x: string]: string;
            };
        };
    };
    static error(errors: ErrorResponse | ErrorResponse[], message?: string, options?: ResponseOptions): {
        response: ApiResponse;
        options: {
            statusCode: number;
            headers: {
                [x: string]: string;
            };
        };
    };
    static notFound(message?: string): {
        response: ApiResponse;
        options: {
            statusCode: number;
            headers: {
                [x: string]: string;
            };
        };
    };
    static unauthorized(message?: string): {
        response: ApiResponse;
        options: {
            statusCode: number;
            headers: {
                [x: string]: string;
            };
        };
    };
    static forbidden(message?: string): {
        response: ApiResponse;
        options: {
            statusCode: number;
            headers: {
                [x: string]: string;
            };
        };
    };
    static validationError(errors: ErrorResponse[]): {
        response: ApiResponse;
        options: {
            statusCode: number;
            headers: {
                [x: string]: string;
            };
        };
    };
    static internalError(message?: string): {
        response: ApiResponse;
        options: {
            statusCode: number;
            headers: {
                [x: string]: string;
            };
        };
    };
}
