const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export async function fetchFromBackend<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${SERVER_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Backend API Error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

// Check B2 Backend Health Status
export async function checkBackendHealth() {
  return fetchFromBackend<{ status: string; uptime: number }>("/api/health");
}
