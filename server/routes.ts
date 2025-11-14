import type { Express } from "express";
import { createServer, type Server } from "http";
import { chatRequestSchema, chatResponseSchema } from "@shared/schema";
import { findRelevantAnswer } from "./knowledge-base";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/chat", async (req, res) => {
    try {
      const validation = chatRequestSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid request", 
          details: validation.error.issues 
        });
      }

      const { message } = validation.data;
      
      const { answer, isRelevant } = findRelevantAnswer(message);
      
      const response = chatResponseSchema.parse({
        message: answer,
        sender: "bot",
        isRelevant,
      });

      res.json(response);
    } catch (error) {
      console.error("Chat API error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
