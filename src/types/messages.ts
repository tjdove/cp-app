// types/message.ts
export interface Message {
  id: string;
  userId: string;
  messageType: string;
  content: string;
  timestamp: number;
}
export interface MessageResponse {
  messages: Message[];
  hasMore: boolean;
}
export interface MessageRequest {
  userId: string;
  messageType: string;
  content: string;
  timestamp: number;
}
export interface MessageError {
  error: string;
  message: string;
}