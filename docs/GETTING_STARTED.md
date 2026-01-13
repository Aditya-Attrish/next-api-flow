## **docs/GETTING_STARTED.md**

```markdown
# Getting Started

A comprehensive guide to get you started with Next.js API Response Standardizer.

## Table of Contents
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Basic Concepts](#basic-concepts)
- [First API Endpoint](#first-api-endpoint)
- [Response Types](#response-types)
- [Error Handling](#error-handling)
- [Next Steps](#next-steps)

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

```typescript
import { NextResponse } from 'next/server'
import { createApiHandler } from 'nextjs-api-response';

// App Router
export const GET = createApiHandler(async () => {
  const data = await fetchData();
  return NextResponse.json({data, message: 'Data fetched'},
   { status: 200 }); // customerize response format
});
```