const API_URL = "https://battle-helmet-nothing-girls.trycloudflare.com";

export async function checkBackend() {
  try {
    // Try direct fetch first
    const response = await fetch(`${API_URL}/api/hello`);
    if (response.ok) {
      return await parseResponse(response);
    }
  } catch {
    // If direct fetch fails (e.g. CORS block in browser), fallback to local proxy endpoint /api/hello
  }

  // Proxy request through Vite dev server
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
