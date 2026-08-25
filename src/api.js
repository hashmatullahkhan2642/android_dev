const DIRECT_API_URL = "https://extraordinary-affiliated-foam-bargain.trycloudflare.com/api/hello";

export async function checkBackend() {
  // First try direct fetch to the Cloudflare API URL
  try {
    const response = await fetch(DIRECT_API_URL, {
      method: "GET",
      headers: {
        "Accept": "application/json, text/plain, */*"
      }
    });

    if (response.ok) {
      const data = await parseResponseData(response);
      if (data) return data;
    }
  } catch (directErr) {
    console.warn("Direct fetch failed, trying proxy fallback...", directErr);
  }

  // Fallback to local dev server proxy /api/hello (for web browser CORS)
  try {
    const proxyResponse = await fetch("/api/hello", {
      method: "GET",
      headers: {
        "Accept": "application/json, text/plain, */*"
      }
    });

    if (proxyResponse.ok) {
      const proxyData = await parseResponseData(proxyResponse);
      if (proxyData) return proxyData;
    }
  } catch (proxyErr) {
    console.warn("Proxy fetch failed...", proxyErr);
  }

  throw new Error("Unable to connect to backend.");
}

async function parseResponseData(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return await response.json();
  }

  const text = await response.text();
  // Filter out raw HTML webpage strings (e.g. index.html fallback)
  if (text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html")) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
