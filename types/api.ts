export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
}

export interface User {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  text: string;
  sender: User;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  rows: T[];
  cursor_next: string | null;
  cursor_prev: string | null;
}

export interface SendingMessage {
  id: string;
  sender: User;
  text: string;
  ts: number;
}
