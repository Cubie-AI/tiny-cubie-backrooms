export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export function buildMessage(
  message: string,
  role: "user" | "assistant" | "system" = "user"
): Message {
  return {
    role,
    content: message,
  };
}

export function appendMessage(
  messages: Message[],
  message: Message
): Message[] {
  messages.push(message);
  return messages;
}
