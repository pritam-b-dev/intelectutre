// src/types/index.ts
// Fixed types aligned with MindFlow roadmap structure

export type UserRole = "user" | "admin";

export interface User {
  _id?: string;
  id?: string; // BetterAuth uses id, MongoDB uses _id
  name: string;
  email: string;
  image?: string;
  role: UserRole;
  learningLevel?: "beginner" | "intermediate" | "advanced";
  createdAt: Date;
}

export interface Topic {
  _id: string;
  name: string;
  description: string;
  category: string; // e.g., "Physics", "Web Dev", "Mathematics"
  ownerId: string; // User who created this topic
  ownerName: string; // User's name for display
  conceptCount: number; // Total concepts in this topic
  masteredCount: number; // How many concepts mastered
  createdAt: Date;
  updatedAt: Date;
}

export interface Concept {
  _id: string;
  topicId: string; // Reference to parent topic
  name: string;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5; // 1=easy, 5=hard
  status: "not_started" | "learning" | "mastered";
  createdAt: Date;
}

export interface Note {
  _id: string;
  conceptId: string; // Reference to parent concept
  userId: string; // Who created this note
  title: string;
  content: string; // Can be markdown
  status: "not_started" | "learning" | "mastered";
  createdAt: Date;
  updatedAt: Date;
}

export interface Recommendation {
  conceptId: string;
  conceptName: string;
  topicId: string;
  topicName: string;
  reason: string; // "Natural progression after {previousConcept}"
  priority: 1 | 2 | 3; // 1=high, 3=low
  difficulty: 1 | 2 | 3 | 4 | 5;
  aiGenerated: boolean; // true if from AI engine
  generatedAt: Date;
}

export interface ChatMessage {
  _id?: string;
  userId: string;
  conceptId: string; // What concept is this chat about?
  message: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export interface ChatSession {
  _id?: string;
  userId: string;
  conceptId: string;
  messages: ChatMessage[]; // Array of messages in this conversation
  createdAt: Date;
  updatedAt: Date;
}

export interface HealthCheckResponse {
  status: "ok" | "error";
  uptime?: number;
  timestamp: string;
  message?: string;
}

// API Response types (for fetch returns)
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
}
