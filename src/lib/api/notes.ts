"use server";

import { protectedFetch, serverMutation } from "../core/server";
import { Note } from "@/types";

export async function getNotesByConcept(
  conceptId: string,
): Promise<{ items: Note[]; total: number }> {
  return protectedFetch<{ items: Note[]; total: number }>(
    `/api/notes?conceptId=${conceptId}`,
  );
}

export async function createNote(
  data: Pick<Note, "conceptId" | "title" | "content"> & {
    status?: Note["status"];
  },
): Promise<Note> {
  return serverMutation<Note>("/api/notes", data, "POST");
}

export async function updateNote(
  id: string,
  data: Partial<Pick<Note, "title" | "content" | "status">>,
): Promise<Note> {
  return serverMutation<Note>(`/api/notes/${id}`, data, "PUT");
}

export async function getNote(id: string): Promise<Note> {
  return protectedFetch<Note>(`/api/notes/${id}`);
}
