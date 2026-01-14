# Next.js API Response Standardizer

[![npm version](https://img.shields.io/npm/v/next-api-flow.svg)](https://www.npmjs.com/package/next-api-flow)
[![Downloads](https://img.shields.io/npm/dm/next-api-flow.svg)](https://www.npmjs.com/package/next-api-flow)
[![Bundle Size](https://img.shields.io/bundlephobia/min/next-api-flow)](https://bundlephobia.com/package/next-api-flow)
[![License](https://img.shields.io/npm/l/next-api-flow.svg)](LICENSE)

A lightweight, type-safe package for standardizing API responses in Next.js applications.

## Features

✅ Standardized response format for all APIs  
✅ TypeScript support with full type safety  
✅ Pagination support out of the box  
✅ Common error response helpers  
✅ Middleware for automatic error handling  
✅ Works with App Router  
✅ Customizable headers and status codes  

## Installation

```bash
npm install next-api-flow
# or
yarn add next-api-flow
```

## Quick Start

```typescript
import { createApiHandler, ResponseBuilder } from 'nextjs-api-response';

// App Router
export const GET = apiHandler(async () => {
  const data = await fetchData();
  return ResponseBuilder.success(data, 'Data fetched');
});

export const POST = apiHandlerWithArgu(async (request: NextRequest) => {
  const data = await request.json();
  
  // Validation example
  if (!data.email) {
    return ResponseBuilder.validationError([
      { code: 'VALIDATION_ERROR', message: 'Email is required', field: 'email' }
    ]);
  }

   const user = await createUser(data);

  return user;  // automatially convert data to api response format
});
```

### Response format
#### Success Format
```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": [],
  "meta": {
    "timestamp": "2024-01-01T00:00:00.000Z",
    "path": "/api/users",
    "requestId": "",
  }
}
```

#### Error Response
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "code": "VALIDATION_ERROR",
      "message": "Email is required",
      "field": "email"
    }
  ],
  "meta": {
    "timestamp": "2024-01-01T00:00:00.000Z",
    "path": "/api/users"
  }
}
```

## Contributing

## License

MIT © Aditya Attrish

## Links
- [API REFERENCE](`./docs/API.md`)
- [GETTING STARTED](`./docs/GETTING_STARTED.md`)
- [CONTRIBUTING](`./docs/CONTRIBUTING.md`)
- Source: repository root

## feedback
Please give me feedback 🙏. 