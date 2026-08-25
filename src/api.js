const DIRECT_API_URL = "https://extraordinary-affiliated-foam-bargain.trycloudflare.com/api/hello";

export async function checkBackend() {
  // Determine if running in Web Browser or Native Android App
  const isNative = typeof window !== 'undefined' && window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform();

  // Use proxy in web browser to avoid browser CORS policy errors; use direct URL on mobile
  const primaryUrl = isNative ? DIRECT_API_URL : "/api/hello";

  try {
    const response = await fetch(primaryUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      return await response.json();
    }

    const text = await response.text();

    // Check if response is raw HTML webpage
    if (text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html")) {
      if (!isNative) {
        return await fetchDirect();
      }
      throw new Error("Backend returned HTML instead of API data");
    }

    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  } catch (error) {
    if (!isNative) {
      return await fetchDirect();
    }
    throw error;
  }
}

async function fetchDirect() {
  const response = await fetch(DIRECT_API_URL, {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

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
