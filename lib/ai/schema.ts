import { z } from "zod";

export const ChatMessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().min(1),
});
export const ChatPayloadSchema = z.object({
  messages: z.array(ChatMessageSchema).min(1),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;
