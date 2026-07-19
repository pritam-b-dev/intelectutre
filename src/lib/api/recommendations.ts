"use server";

import { protectedFetch } from "../core/server";
import { Recommendation } from "@/types";

export async function getRecommendations(): Promise<{
  items: Recommendation[];
  total: number;
}> {
  return protectedFetch<{ items: Recommendation[]; total: number }>(
    "/api/recommendations",
  );
}
