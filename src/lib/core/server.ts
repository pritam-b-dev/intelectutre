"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

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

// 🌟 CSRF জটমুক্ত চূড়ান্ত protectedFetch
export async function protectedFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const cookieStore = await cookies();
  const headerStore = await headers();

  // কুকি স্টোর থেকে সরাসরি সেশন টোকেনটি তুলে আনা হচ্ছে
  const sessionToken =
    cookieStore.get("better-auth.session_token")?.value ||
    cookieStore.get("__Secure-better-auth.session_token")?.value;

  const userAgent = headerStore.get("user-agent") || "";
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  const requestHeaders = new Headers(options.headers);
  requestHeaders.set("Content-Type", "application/json");
  requestHeaders.set("User-Agent", userAgent);

  // 🌟 চক্রান্ত ভাঙার মূল চাবিকাঠি: কুকি হেডার পুরোপুরি ওমিট (বাদ) করা হয়েছে।
  // শুধু Bearer টোকেন পাস হবে, যা Better-Auth এর খিটখিটে CSRF চেক বাইপাস করবে।
  if (sessionToken) {
    requestHeaders.set("Authorization", `Bearer ${sessionToken}`);
  }

  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: requestHeaders,
  });

  if (res.status === 401) {
    console.error(`[Explore Debug] 401 Unauthorized for path: ${path}`);
    redirect("/signin");
  }

  if (!res.ok) {
    throw new Error(`Fetch failed with status ${res.status}`);
  }

  return res.json();
}

// 🌟 CSRF জটমুক্ত চূড়ান্ত serverMutation
export async function serverMutation<T>(
  path: string,
  data: unknown,
  method: "POST" | "PUT" | "DELETE" = "POST",
): Promise<T> {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const sessionToken =
    cookieStore.get("better-auth.session_token")?.value ||
    cookieStore.get("__Secure-better-auth.session_token")?.value;

  const userAgent = headerStore.get("user-agent") || "";
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  const requestHeaders = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  requestHeaders.set("User-Agent", userAgent);

  if (sessionToken) {
    requestHeaders.set("Authorization", `Bearer ${sessionToken}`);
  }

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: requestHeaders,
    body: JSON.stringify(data),
  });

  if (res.status === 401) {
    redirect("/signin");
  }

  if (!res.ok) {
    throw new Error(`Mutation failed with status ${res.status}`);
  }

  return res.json();
}
