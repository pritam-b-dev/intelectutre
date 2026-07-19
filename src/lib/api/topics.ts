"use server";

import { protectedFetch, serverMutation } from "../core/server";
import { Topic } from "@/types";

export async function getTopics(params?: {
  category?: string;
  sort?: string;
}): Promise<{ items: Topic[]; total: number }> {
  // ১. শুধু ভ্যালিড এবং "all" নয় এমন প্যারামিটারগুলো ফিল্টার করে নিচ্ছি
  const activeParams = params
    ? Object.entries(params).filter((entry) => entry[1] && entry[1] !== "all")
    : [];

  // ২. যদি কোনো অ্যাক্টিভ প্যারামিটার থাকে, তবেই কেবল "?" যোগ হবে, অন্যথায় একদম ক্লিন স্ট্রিং থাকবে
  const queryString =
    activeParams.length > 0
      ? `?${new URLSearchParams(activeParams).toString()}`
      : "";

  return protectedFetch<{ items: Topic[]; total: number }>(
    `/api/topics${queryString}`,
  );
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
