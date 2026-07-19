"use server";

import { protectedFetch, serverMutation } from "../core/server";
import { Concept } from "@/types";

export async function getConceptsByTopic(
  topicId: string,
): Promise<{ items: Concept[]; total: number }> {
  return protectedFetch<{ items: Concept[]; total: number }>(
    `/api/concepts?topicId=${topicId}`,
  );
}

export async function getConcept(id: string): Promise<Concept> {
  return protectedFetch<Concept>(`/api/concepts/${id}`);
}

export async function updateConceptStatus(
  id: string,
  status: Concept["status"],
): Promise<Concept> {
  return serverMutation<Concept>(
    `/api/concepts/${id}/status`,
    { status },
    "PATCH",
  );
}
