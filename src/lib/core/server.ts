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
  options?: RequestInit,
): Promise<T> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await fetch(`${SERVER_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
      ...options?.headers,
    },
    ...options,
  });

  if (res.status === 401) {
    redirect("/signin");
  }

  if (!res.ok) {
    throw new Error(`Protected Fetch Error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export async function serverMutation<T, U = unknown>(
  path: string,
  payload: U,
  method: "POST" | "PUT" | "PATCH" | "DELETE" = "POST",
): Promise<T> {
  return protectedFetch<T>(path, {
    method,
    body: JSON.stringify(payload),
  });
}
