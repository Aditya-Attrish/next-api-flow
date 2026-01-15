## **docs/GETTING_STARTED.md**

# Getting Started

A comprehensive guide to get you started with Next.js API Response Standardizer.

## Table of Contents
- [Installation](#installation)
- [Quick Start](#quick-start)

## Installation

### Prerequisites
- Node.js 18 or higher
- Next.js 13 or higher
- TypeScript (recommended)

### Install Package

Using npm:
```bash
npm install next-api-flow
```

## Quick Start

### For Next.js App router
```typescript
import { NextResponse } from 'next/server'
import { apiHandler } from 'nextjs-api-flow';

// App Router
export const GET = apiHandler(async () => {
  const data = await fetchData();
  return NextResponse.json({data, message: 'Data fetched'},
   { status: 200 }); // customerize response format
});

```

### For Next.js page router
```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseBuilder } from 'nextjs-api-flow';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { response, options } = ResponseBuilder.success(
    { message: 'Hello from Pages Router!' },
    'Success'
  );
  
  res.status(options.statusCode || 200).json(response);
}
```