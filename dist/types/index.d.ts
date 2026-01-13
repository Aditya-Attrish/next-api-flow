export type ApiResponse<T = object | null> = {
    success: boolean;
    message: string;
    data?: T;
    errors?: Array<{
        code: string;
        message: string;
        field?: string;
    }>;
    meta?: {
        timestamp: string;
        path?: string;
        requestId?: string;
        pagination?: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    };
};
export type PaginatedData<T> = {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};
export type ErrorResponse = {
    code: string;
    message: string;
    field?: string;
};
export type ResponseOptions = {
    statusCode?: number;
    headers?: Record<string, string>;
    requestId?: string;
    path?: string;
};
