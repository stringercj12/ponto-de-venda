export interface Table {
  id: string;
  name: string;
  description: string;
  status: TableStatus;
  statusDescription: string;
  number: number;
  capacity: number;
  currentSession?: TableSessionResponse
  createdAt: string;
  updatedAt: string;
}

export interface TableRequest {
  name: string;
  description: string;
  number: number;
  capacity: number;
}

export interface TableSessionResponse {
  orderId: string;
  openedAt: string;
  sellerName?: string;
  customerName?: string;
  totalAmount: number;
}

export type TableStatus =
  | 'Unavailable'
  | 'Occupied'
  | 'Closed'
  | 'Free'
  | 'Reserved';

export enum TableStatusEnum {
  Unavailable = 'Unavailable',
  Occupied = 'Occupied',
  Closed = 'Closed',
  Free = 'Free',
  Reserved = 'Reserved'
}