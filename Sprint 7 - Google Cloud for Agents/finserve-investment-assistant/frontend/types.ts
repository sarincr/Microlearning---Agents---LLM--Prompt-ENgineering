export type Role = 'user' | 'model';

export interface Message {
  id: string;
  role: Role;
  text: string;
  isStreaming?: boolean;
  isError?: boolean;
}

export interface StarterQuestion {
  id: string;
  text: string;
  icon?: string;
}
