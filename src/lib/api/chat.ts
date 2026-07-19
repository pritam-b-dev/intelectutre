"use server";

import { protectedFetch, serverMutation } from "../core/server";
import { ChatMessage } from "@/types";

export async function getHistory(conceptId: string): Promise<ChatMessage[]> {
  return protectedFetch<ChatMessage[]>(`/api/chat/history/${conceptId}`);
}

export async function sendMessage(
  conceptId: string,
  message: string,
): Promise<ChatMessage> {
  return serverMutation<ChatMessage>(
    "/api/chat/message",
    { conceptId, message },
    "POST",
  );
}

export async function saveResponse(
  conceptId: string,
  response: Omit<ChatMessage, "timestamp">,
): Promise<ChatMessage> {
  return serverMutation<ChatMessage>(
    "/api/chat/save",
    { ...response, conceptId },
    "POST",
  );
}
