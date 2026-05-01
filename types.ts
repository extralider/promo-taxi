export interface Lead {
  name: string;
  phone: string;
  referrerId: string;
  timestamp: number;
}

export interface Driver {
  id: string;
  name: string;
  plate: string;
}

export enum ViewState {
  ADMIN = 'ADMIN',
  LANDING = 'LANDING',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}