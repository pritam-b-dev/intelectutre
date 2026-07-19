"use server";

import { cookies } from "next/headers";
import { User } from "@/types";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export async function getUserSession(): Promise<{ user: User } | null> {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const res = await fetch(`${SERVER_URL}/api/auth/get-session`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (!data || !data.user) return null;

    return { user: data.user as User };
  } catch (error) {
    console.error("[Session Error]: Failed to fetch user session", error);
    return null;
  }
}
