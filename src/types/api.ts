export interface APIResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface APIError {
  status: number;
  code: string;
  message: string;
  details?: Record<string, any>;
} 