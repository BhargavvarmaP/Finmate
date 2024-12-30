export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate?: number;
}

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  timestamp: number;
}