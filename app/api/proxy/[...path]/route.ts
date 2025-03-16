// app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path);
}

async function handleRequest(request: NextRequest, pathParts: string[]) {
  try {
    const path = pathParts.join('/');
    const targetUrl = `http://api.cvgenius.stepdevs.click:8000/api/${path}`;
    
    // Get headers and body from the incoming request
    const headers = new Headers(request.headers);
    headers.set('host', 'api.cvgenius.stepdevs.click:8000');
    
    // Forward the request to the target API
    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.blob() : undefined,
    });
    
    // Create a new response with the target API's response
    const data = await response.blob();
    const newResponse = new NextResponse(data, {
      status: response.status,
      statusText: response.statusText,
    });
    
    // Copy headers from the target API's response
    response.headers.forEach((value, key) => {
      newResponse.headers.set(key, value);
    });
    
    return newResponse;
  } catch (error: any) {
    console.error('API proxy error:', error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}