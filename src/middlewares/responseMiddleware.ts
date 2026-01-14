import { NextRequest, NextResponse } from 'next/server';
import { ResponseBuilder } from '../builders/responseBuilder';

export function apiHandler(
  handler: () => Promise<ResponseBuilder | NextResponse>
) {
  return async () => {
    try {
      const result = await handler();
      
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
        (error as Error).message || 'An unexpected error occurred'
      );

      return NextResponse.json(response, {
        status: options.statusCode,
        headers: options.headers,
      });
    }
  };
}
export function apiHandlerWithArgu(
  handler: (req: NextRequest) => Promise<ResponseBuilder | NextResponse>
) {
  return async (req: NextRequest) => {
    try {
      const result = await handler(req);
      
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
        (error as Error).message || 'An unexpected error occurred'
      );

      return NextResponse.json(response, {
        status: options.statusCode,
        headers: options.headers,
      });
    }
  };
}