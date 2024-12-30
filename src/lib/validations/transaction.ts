import * as z from 'zod';

export const transactionSchema = z.object({
  amount: z.number().min(0, 'Amount must be greater than 0'),
  type: z.enum(['credit', 'debit']),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.string(),
});