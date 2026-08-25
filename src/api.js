const API_URL = "https://extraordinary-affiliated-foam-bargain.trycloudflare.com";

export async function checkBackend() {
  try {
    // Try direct fetch first
    const response = await fetch(`${API_URL}/api/hello`);
    if (response.ok) {
      return await parseResponse(response);
    }
  } catch {
    // Fallback to local proxy /api/hello if direct fetch hits CORS in browser
  }

  const proxyResponse = await fetch("/api/hello");
  if (!proxyResponse.ok) {
    throw new Error("Backend connection failed");
  }

  return await parseResponse(proxyResponse);
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return await response.json();
  }

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
