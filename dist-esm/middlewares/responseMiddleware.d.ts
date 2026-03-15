import { NextRequest, NextResponse } from 'next/server';
export declare function apiHandler(handler: (req: NextRequest, context?: any) => Promise<any>): (req: NextRequest, context?: any) => Promise<NextResponse<any>>;
