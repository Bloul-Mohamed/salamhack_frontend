import { type NextRequest, NextResponse } from "next/server";

// This function will handle all HTTP methods
export async function POST(request: NextRequest) {
  console.log("Proxy received POST request");

  try {
    // Check if the request is multipart/form-data
    const contentType = request.headers.get("content-type") || "";
    const isFormData = contentType.includes("multipart/form-data");

    const url = new URL(request.url);
    const path = url.searchParams.get("path") || "";
    const targetUrl = `http://api.cvgenius.stepdevs.click:8000/api${path}`;

    console.log(`Forwarding to: ${targetUrl}`);
    console.log(`Content-Type: ${contentType}`);

    let response;

    if (isFormData) {
      // Handle form data
      try {
        const formData = await request.formData();
        console.log("Form data parsed successfully");

        // Log form data entries for debugging
        for (const [key, value] of formData.entries()) {
          if (value instanceof File) {
            console.log(
              `Form field: ${key}, File: ${value.name}, Size: ${value.size} bytes`
            );
          } else {
            console.log(`Form field: ${key}, Value: ${value}`);
          }
        }

        response = await fetch(targetUrl, {
          method: "POST",
          body: formData,
          // Don't set Content-Type header for multipart/form-data
          // The browser will set it with the correct boundary
        });
      } catch (formError) {
        console.error("Error processing form data:", formError);
        return NextResponse.json(
          // @ts-ignore
          { error: "Error processing form data", details: formError.message },
          { status: 400 }
        );
      }
    } else {
      // Handle JSON data
      let body;
      try {
        body = await request.json();
        console.log("Request body parsed as JSON:", JSON.stringify(body));
      } catch (e) {
        // If JSON parsing fails, try to get the body as text
        const text = await request.text();
        console.log("Request body as text:", text);
        body = text;
      }

      // Forward all headers from the original request
      const headers = {};
      request.headers.forEach((value, key) => {
        // Skip headers that might cause issues
        if (!["host", "content-length"].includes(key.toLowerCase())) {
          // @ts-ignore
          headers[key] = value;
        }
      });

      // Ensure we're sending the correct Content-Type
      // @ts-ignore
      if (!headers["content-type"] && typeof body === "object") {
        // @ts-ignore
        headers["content-type"] = "application/json";
      }

      console.log("Forwarding headers:", headers);

      response = await fetch(targetUrl, {
        method: "POST",
        headers,
        body: typeof body === "object" ? JSON.stringify(body) : body,
      });
    }

    console.log(`Response status: ${response.status}`);

    // Handle the response
    const responseContentType = response.headers.get("content-type") || "";
    console.log(`Response content type: ${responseContentType}`);

    // Forward all response headers
    const responseHeaders = {};
    response.headers.forEach((value, key) => {
      // @ts-ignore
      responseHeaders[key] = value;
    });

    if (responseContentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data, {
        status: response.status,
        headers: responseHeaders,
      });
    } else {
      const blob = await response.blob();
      return new NextResponse(blob, {
        status: response.status,
        headers: responseHeaders,
      });
    }
  } catch (error: any) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      {
        error: "Proxy error",
        message: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}

// Handle GET requests
export async function GET(request: NextRequest) {
  console.log("Proxy received GET request");

  try {
    const url = new URL(request.url);
    const path = url.searchParams.get("path") || "";

    // Build query string excluding the 'path' parameter
    const queryParams = new URLSearchParams();
    url.searchParams.forEach((value, key) => {
      if (key !== "path") {
        queryParams.append(key, value);
      }
    });

    const queryString = queryParams.toString();
    const targetUrl = `http://api.cvgenius.stepdevs.click:8000/api${path}${
      queryString ? "?" + queryString : ""
    }`;

    console.log(`Forwarding to: ${targetUrl}`);

    // Forward headers except those that might cause issues
    const headers = {};
    request.headers.forEach((value, key) => {
      if (!["host", "content-length"].includes(key.toLowerCase())) {
        // @ts-ignore
        headers[key] = value;
      }
    });

    console.log("Forwarding headers:", headers);

    const response = await fetch(targetUrl, {
      method: "GET",
      headers,
    });

    console.log(`Response status: ${response.status}`);

    // Handle the response
    const contentType = response.headers.get("content-type") || "";
    console.log(`Response content type: ${contentType}`);

    // Forward all response headers
    const responseHeaders = {};
    response.headers.forEach((value, key) => {
      // @ts-ignore
      responseHeaders[key] = value;
    });

    if (contentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data, {
        status: response.status,
        headers: responseHeaders,
      });
    } else {
      const blob = await response.blob();
      return new NextResponse(blob, {
        status: response.status,
        headers: responseHeaders,
      });
    }
  } catch (error: any) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      {
        error: "Proxy error",
        message: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}

// Add PUT method
export async function PUT(request: NextRequest) {
  console.log("Proxy received PUT request");

  try {
    const contentType = request.headers.get("content-type") || "";
    const isFormData = contentType.includes("multipart/form-data");

    const url = new URL(request.url);
    const path = url.searchParams.get("path") || "";
    const targetUrl = `http://api.cvgenius.stepdevs.click:8000/api${path}`;

    console.log(`Forwarding to: ${targetUrl}`);

    let response;

    if (isFormData) {
      const formData = await request.formData();
      response = await fetch(targetUrl, {
        method: "PUT",
        body: formData,
      });
    } else {
      let body;
      try {
        body = await request.json();
      } catch (e) {
        const text = await request.text();
        body = text;
      }

      const headers = {};
      request.headers.forEach((value, key) => {
        if (!["host", "content-length"].includes(key.toLowerCase())) {
          // @ts-ignore
          headers[key] = value;
        }
      });

      // Ensure we're sending the correct Content-Type
      // @ts-ignore
      if (!headers["content-type"] && typeof body === "object") {
        // @ts-ignore
        headers["content-type"] = "application/json";
      }

      response = await fetch(targetUrl, {
        method: "PUT",
        headers,
        body: typeof body === "object" ? JSON.stringify(body) : body,
      });
    }

    console.log(`Response status: ${response.status}`);

    const responseContentType = response.headers.get("content-type") || "";

    // Forward all response headers
    const responseHeaders = {};
    response.headers.forEach((value, key) => {
      // @ts-ignore
      responseHeaders[key] = value;
    });

    if (responseContentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data, {
        status: response.status,
        headers: responseHeaders,
      });
    } else {
      const blob = await response.blob();
      return new NextResponse(blob, {
        status: response.status,
        headers: responseHeaders,
      });
    }
  } catch (error: any) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      {
        error: "Proxy error",
        message: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}

// Add OPTIONS method for CORS preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
