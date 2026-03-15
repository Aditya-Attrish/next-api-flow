import { NextRequest, NextResponse } from 'next/server';
import { ResponseBuilder } from '../builders/responseBuilder';

export function apiHandler(
  handler: (req: NextRequest, context?: any) => Promise<any>
) {
  return async (req: NextRequest, context?: any) => {
    try {
      const result = await handler(req, context);

      // If already a NextResponse, return as is
      if (result instanceof NextResponse) {
        return result;
      }

      // If using ResponseBuilder format
      if (result?.response && result?.options) {
        const { response, options } = result;
        return NextResponse.json(response, {
          status: options.statusCode,
          headers: options.headers,
        });
      }

      // Default success response
      const { response, options } = ResponseBuilder.success(result);
      return NextResponse.json(response, {
        status: options.statusCode,
        headers: options.headers,
      });

    } catch (error) {
      console.error('API Error:', error);

      const { response, options } = ResponseBuilder.internalError(
        error instanceof Error? error.message : 'An unexpected error occurred'
      );

      return NextResponse.json(response, {
        status: options.statusCode,
        headers: options.headers,
      });
    }
  };
}
