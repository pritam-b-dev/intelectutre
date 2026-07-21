"use server";

import { protectedFetch, serverFetch, serverMutation } from "../core/server";
import { Topic } from "@/types";

export async function getTopics(params?: {
  category?: string;
  sort?: string;
  search?: string;
  page?: number;
}): Promise<{ items: Topic[]; total: number; page: number; perPage: number }> {
  const activeParams = params
    ? Object.entries(params).filter((entry) => entry[1] && entry[1] !== "all")
    : [];
  const queryString =
    activeParams.length > 0
      ? `?${new URLSearchParams(activeParams as [string, string][]).toString()}`
      : "";

  return serverFetch(`/api/topics${queryString}`);
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

export interface CreateTopicRequest {
  name: string;
  description: string;
  category: string;
  imageUrl?: string;
}

export async function createTopic(data: CreateTopicRequest): Promise<Topic> {
  return serverMutation<Topic>("/api/topics", data, "POST");
}

export async function updateTopic(
  id: string,
  data: Pick<Topic, "name" | "description" | "category">,
): Promise<Topic> {
  return serverMutation<Topic>(`/api/topics/${id}`, data, "PATCH");
}
export async function deleteTopic(id: string): Promise<{ success: boolean }> {
  return serverMutation<{ success: boolean }>(
    `/api/topics/${id}`,
    {},
    "DELETE",
  );
}
