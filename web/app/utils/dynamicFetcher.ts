export type FetcherProps = {
  bodyParams: Record<string, any>;
  req?: Request;
  method: string;
  url: URL | string;
  bearerToken?: string;
  queryParams?: Record<string, any>;
  id?: string;
};

export default async function dynamicFetcher<T>({
  bodyParams,
  req,
  method,
  url,
  bearerToken,
  queryParams,
  id,
}: FetcherProps): Promise<T> {
  let finalUrl = url instanceof URL ? url.href : url;

  // Check if running on the server
  const isServer = typeof window === "undefined";

  // Initialize headers
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (bearerToken) {
    headers["Authorization"] = `Bearer ${bearerToken}`;
  }

  if (isServer && req) {
    // Construct absolute URL on the server
    const baseUrl = new URL(req.url).origin;
    finalUrl = `${baseUrl}${finalUrl}`;

    // Forward cookies from the incoming request
    const cookieHeader = req.headers.get("Cookie");
    if (cookieHeader) {
      headers["Cookie"] = cookieHeader;
    }
  }

  if (method === "GET" && queryParams) {
    // Add query parameters for GET requests
    finalUrl = addQueryParams(finalUrl, queryParams);
  }

  if (id) {
    finalUrl = addIdToUrl(finalUrl, id);
  }

  // Make the fetch request
  const response = await fetch(finalUrl, {
    method,
    headers,
    body: method === "GET" ? undefined : JSON.stringify(bodyParams), // No body for GET requests
    credentials: "include",
  });

  // Check for HTTP errors
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  // Parse and return the JSON response as type T
  return response.json() as Promise<T>;
}

function addQueryParams(url: string, queryParams: Record<string, any>) {
  const urlObj = new URL(url);

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      urlObj.searchParams.append(key, String(value));
    }
  });

  return urlObj.toString();
}

function addIdToUrl(url: string, id: string): string {
  return `${url.replace(/\/$/, "")}/${id}`;
}
