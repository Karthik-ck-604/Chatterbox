import { z } from "zod";

// Chat Message Schema
export const messageSchema = z.object({
  id: z.string(),
  content: z.string(),
  sender: z.enum(["user", "bot", "system"]),
  timestamp: z.number(),
});

export type Message = z.infer<typeof messageSchema>;

// Chat Request Schema
export const chatRequestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;

// Chat Response Schema
export const chatResponseSchema = z.object({
  message: z.string(),
  sender: z.enum(["bot", "system"]),
  isRelevant: z.boolean(),
});

export type ChatResponse = z.infer<typeof chatResponseSchema>;

// Knowledge Base Entry Schema
export const knowledgeEntrySchema = z.object({
  category: z.enum(["flora", "fauna", "economic", "tourism", "ecological", "general"]),
  keywords: z.array(z.string()),
  answer: z.string(),
});

export type KnowledgeEntry = z.infer<typeof knowledgeEntrySchema>;
