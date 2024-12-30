import * as z from 'zod';

export const companySchema = z.object({
  name: z.string().min(2, 'Company name must be at least 2 characters'),
  gstin: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GSTIN format'),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
});