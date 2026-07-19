"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export async function serverFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${SERVER_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
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
  const headerStore = await headers();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const requestHeaders = new Headers(options.headers);

  requestHeaders.set("Content-Type", "application/json");

  const userAgent = headerStore.get("user-agent");
  if (userAgent) {
    requestHeaders.set("User-Agent", userAgent);
  }

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
  method: "POST" | "PUT" | "DELETE" = "POST",
): Promise<T> {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const requestHeaders = new Headers();

  requestHeaders.set("Content-Type", "application/json");

  const userAgent = headerStore.get("user-agent");
  if (userAgent) {
    requestHeaders.set("User-Agent", userAgent);
  }

  if (cookieHeader) {
    requestHeaders.set("Cookie", cookieHeader);
  }

  const res = await fetch(`${SERVER_URL}${path}`, {
    method,
    headers: requestHeaders,
    body: JSON.stringify(data),
    cache: "no-store",
  });

  if (res.status === 401) {
    redirect("/signin");
  }

  if (!res.ok) {
    throw new Error(`Mutation failed with status ${res.status}`);
  }

  return res.json();
}
