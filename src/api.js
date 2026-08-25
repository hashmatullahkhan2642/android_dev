// Target Cloudflare backend API URL
const API_URL = "https://extraordinary-affiliated-foam-bargain.trycloudflare.com/api/hello";

export async function checkBackend() {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const contentType = response.headers.get("content-type") || "";

  // Reject HTML responses (e.g. index.html) to prevent displaying webpage code
  if (contentType.includes("text/html")) {
    throw new Error("Unable to connect: Backend returned HTML page instead of API response.");
  }

  // Parse JSON response
  if (contentType.includes("application/json")) {
    return await response.json();
  }

  // Fallback text parsing
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
