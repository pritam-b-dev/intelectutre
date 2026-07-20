"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export async function serverFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${SERVER_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Server Fetch Error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export async function protectedFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const requestHeaders = new Headers(options.headers);
  requestHeaders.set("Content-Type", "application/json");
  if (cookieHeader) {
    requestHeaders.set("Cookie", cookieHeader);
  }

  const res = await fetch(`${SERVER_URL}${path}`, {
    ...options,
    headers: requestHeaders,
    cache: "no-store",
  });

  if (res.status === 401) {
    redirect("/signin");
  }
  if (!res.ok) {
    throw new Error(`Fetch failed with status ${res.status}`);
  }

  return res.json();
}

export async function serverMutation<T>(
  path: string,
  data: unknown,
  method: "POST" | "PATCH" | "PUT" | "DELETE" = "POST",
): Promise<T> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const requestHeaders = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (cookieHeader) {
    requestHeaders.set("Cookie", cookieHeader);
  }

  const res = await fetch(`${SERVER_URL}${path}`, {
    method,
    headers: requestHeaders,
    body: JSON.stringify(data),
  });

  if (res.status === 401) {
    redirect("/signin");
  }
  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Mutation failed (${res.status}): ${errorBody}`);
  }

  return res.json();
}
