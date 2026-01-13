import { NextRequest, NextResponse } from 'next/server';
import { ResponseBuilder } from '../builders/responseBuilder';

export function withResponseHandler(
  handler: (req?: NextRequest, context?: object) => Promise<ResponseBuilder | NextResponse>
) {
  return async (req: NextRequest, context?: object) => {
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
        (error as Error).message || 'An unexpected error occurred'
      );

      return NextResponse.json(response, {
        status: options.statusCode,
        headers: options.headers,
      });
    }
  };
}

// For Next.js App Router API Routes
export function createApiHandler(
  handler: (req?: NextRequest, context?: object) => Promise<NextResponse>
) {
  return withResponseHandler(handler);
}