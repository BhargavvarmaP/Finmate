export interface Company {
  id: string;
  name: string;
  registrationNumber?: string;
  address?: string;
  taxId?: string;
  createdAt: Date;
  updatedAt: Date;
} 