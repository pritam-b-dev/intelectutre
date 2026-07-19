"use server";

import { protectedFetch, serverMutation } from "../core/server";
import { Topic } from "@/types";

export async function getTopics(): Promise<{ items: Topic[]; total: number }> {
  return protectedFetch<{ items: Topic[]; total: number }>("/api/topics");
}

export async function getMyTopics(): Promise<{
  items: Topic[];
  total: number;
}> {
  return protectedFetch<{ items: Topic[]; total: number }>("/api/topics/my");
}

export async function getTopic(id: string): Promise<Topic> {
  return protectedFetch<Topic>(`/api/topics/${id}`);
}

export async function createTopic(
  data: Omit<
    Topic,
    | "_id"
    | "ownerId"
    | "ownerName"
    | "conceptCount"
    | "masteredCount"
    | "createdAt"
  >,
): Promise<Topic> {
  return serverMutation<Topic>("/api/topics", data, "POST");
}
