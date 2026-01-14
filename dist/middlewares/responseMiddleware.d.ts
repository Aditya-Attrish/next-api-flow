import { NextRequest, NextResponse } from 'next/server';
import { ResponseBuilder } from '../builders/responseBuilder';
export declare function apiHandler(handler: () => Promise<ResponseBuilder | NextResponse>): () => Promise<NextResponse<any>>;
export declare function apiHandlerWithArgu(handler: (req: NextRequest) => Promise<ResponseBuilder | NextResponse>): (req: NextRequest) => Promise<NextResponse<any>>;
