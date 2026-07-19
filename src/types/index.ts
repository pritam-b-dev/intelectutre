// src/types/index.ts
// Intelecture Shared Types

/* -------------------------------------------------------------------------- */
/*                                Core Types                                  */
/* -------------------------------------------------------------------------- */

export type UserRole = "user" | "admin";

export type LearningLevel = "beginner" | "intermediate" | "advanced";

export type Difficulty = 1 | 2 | 3 | 4 | 5;

export type LearningStatus = "not_started" | "learning" | "mastered";

export type RecommendationPriority = 1 | 2 | 3;

/* -------------------------------------------------------------------------- */
/*                                  User                                      */
/* -------------------------------------------------------------------------- */

export interface User {
  _id?: string;
  id?: string; // BetterAuth uses id, MongoDB uses _id
  name: string;
  email: string;
  image?: string;
  role: UserRole;
  learningLevel?: LearningLevel;
  createdAt: string;
}

/* -------------------------------------------------------------------------- */
/*                                  Topic                                     */
/* -------------------------------------------------------------------------- */

export interface Topic {
  _id: string;
  name: string;
  description: string;
  category: string;
  ownerId: string;
  ownerName: string;
  conceptCount: number;
  masteredCount: number;
  createdAt: string;
  updatedAt: string;
}

/* -------------------------------------------------------------------------- */
/*                                 Concept                                    */
/* -------------------------------------------------------------------------- */

export interface Concept {
  _id: string;
  topicId: string;
  name: string;
  description: string;
  difficulty: Difficulty;
  status: LearningStatus;
  createdAt: string;
  updatedAt: string;
}

/* -------------------------------------------------------------------------- */
/*                                    Note                                    */
/* -------------------------------------------------------------------------- */

export interface Note {
  _id: string;
  conceptId: string;
  userId: string;
  title: string;
  content: string;
  status: LearningStatus;
  createdAt: string;
  updatedAt: string;
}

/* -------------------------------------------------------------------------- */
/*                               Recommendation                               */
/* -------------------------------------------------------------------------- */

export interface Recommendation {
  conceptId: string;
  conceptName: string;
  topicId: string;
  topicName: string;
  reason: string;
  priority: RecommendationPriority;
  difficulty: Difficulty;
  aiGenerated: boolean;
  generatedAt?: string;
}

/* -------------------------------------------------------------------------- */
/*                                Chat Message                                */
/* -------------------------------------------------------------------------- */

export interface ChatMessage {
  _id?: string;
  userId: string;
  conceptId: string;
  role: "user" | "assistant";
  message: string;
  timestamp: string; // 🛠️ Fixed: Changed from Date to string
}

/* -------------------------------------------------------------------------- */
/*                                Health Check                                */
/* -------------------------------------------------------------------------- */

export interface HealthCheckResponse {
  status: "ok" | "error";
  uptime?: number;
  timestamp: string;
  message?: string;
}

/* -------------------------------------------------------------------------- */
/*                             Strict API Responses                           */
/* -------------------------------------------------------------------------- */

export interface ListResponse<T> {
  items: T[];
  total: number;
}
