import { NextRequest, NextResponse } from 'next/server';
import { ResponseBuilder } from '../builders/responseBuilder';
export declare function withResponseHandler(handler: (req?: NextRequest, context?: object) => Promise<ResponseBuilder | NextResponse>): (req: NextRequest, context?: object) => Promise<NextResponse<any>>;
export declare function createApiHandler(handler: (req?: NextRequest, context?: object) => Promise<NextResponse>): (req: NextRequest, context?: object) => Promise<NextResponse<any>>;
