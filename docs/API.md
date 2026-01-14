# API Reference

Complete API documentation for Next.js API Response Standardizer package.

## Table of Contents
- [ResponseBuilder](#responsebuilder)
- [HttpStatus](#httpstatus)
- [Middleware](#middleware)
- [Types](#types)
- [Utilities](#utilities)

## ResponseBuilder

The main class for building standardized API responses.

### Static Methods

#### `success<T>(data?: T, message?: string, options?: ResponseOptions)`

Creates a successful API response.

**Parameters:**
- `data` (optional): The data to include in the response
- `message` (optional, default: "Success"): Success message
- `options` (optional): Additional response options

**Returns:**
```typescript
{
  response: ApiResponse<T>;
  options: {
    statusCode: number;
    headers: Record<string, string>;
  };
}
```
#### `paginated<T>(data: PaginatedData<T>, message?: string, options?: ResponseOptions)`

Creates a paginated API response.

**Parameters:**
- `data:` Paginated data object
- `message` (optional, default: "Success"): Success message
- `options` (optional): Additional response options

**Returns:**
```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": [...items],
  "meta": {
    "timestamp": "2024-01-01T00:00:00.000Z",
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

## HttpStatus

A utility object containing HTTP status codes

### Available Status Codes
```typescript
import { HttpStatus } from 'next-api-flow';

// Success codes
HttpStatus.OK           // 200
HttpStatus.CREATED      // 201
HttpStatus.ACCEPTED     // 202
HttpStatus.NO_CONTENT   // 204

// Client error codes
HttpStatus.BAD_REQUEST           // 400
HttpStatus.UNAUTHORIZED          // 401
HttpStatus.FORBIDDEN             // 403
HttpStatus.NOT_FOUND             // 404
HttpStatus.METHOD_NOT_ALLOWED    // 405
HttpStatus.CONFLICT              // 409
HttpStatus.UNPROCESSABLE_ENTITY  // 422
HttpStatus.TOO_MANY_REQUESTS     // 429

// Server error codes
HttpStatus.INTERNAL_SERVER_ERROR // 500
HttpStatus.NOT_IMPLEMENTED       // 501
HttpStatus.BAD_GATEWAY           // 502
HttpStatus.SERVICE_UNAVAILABLE   // 503
```

## Middleware

### apiHandler(handler)
Wraps an API handler with automatic error handling and response formatting.

**Parameters:**
handler: Async function that takes () and returns NextResponse or ResponseBuilder.

### apiHandlerWithArgu(handler)
Wraps an API handler with automatic error handling and response formatting.

**Parameters:**
handler: Async function that takes (req: NextRequest) and returns NextResponse or ResponseBuilder.