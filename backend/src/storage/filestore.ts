import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { Message } from "../messages.js";

const filepath = path.join(
  import.meta.dirname,
  "/../../data/conversations.json"
);

export async function saveConversation(
  id: string,
  conversation: { messages: Message[] }
) {
  try {
    const existing = await listConversations();
    await writeFile(
      filepath,
      JSON.stringify({
        ...existing,
        [`conversation-${Date.now()}`]: conversation,
      })
    );
  } catch (error) {
    console.error("Error writing conversation to file:", error);
  }
}

export async function listConversations() {
  try {
    const file = await readFile(filepath, "utf-8");
    const conversations = JSON.parse(file);
    return conversations;
  } catch (error) {
    console.error("Error listing conversations from file:", error);
    return [];
  }
}
