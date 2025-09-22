export type Role = "user" | "assistant" | "system";

export async function chat(messages: { role: Role; content: string }[]) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  if (!res.ok) {
    throw new Error(`Chat error: ${res.status}`);
  }
  return res.json() as Promise<{ role: "assistant"; content: string }>;
}
