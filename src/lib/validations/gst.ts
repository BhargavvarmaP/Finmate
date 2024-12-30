import * as z from 'zod';

export const gstr1Schema = z.object({
  period: z.string().min(1, 'Filing period is required'),
  totalInvoices: z.number().min(0, 'Total invoices must be 0 or greater'),
  totalAmount: z.number().min(0, 'Total amount must be 0 or greater'),
  totalTax: z.number().min(0, 'Total tax must be 0 or greater'),
});

export const gstr3bSchema = z.object({
  period: z.string().min(1, 'Filing period is required'),
  outwardSupplies: z.number().min(0),
  inwardSupplies: z.number().min(0),
  itcAvailed: z.number().min(0),
  taxLiability: z.number().min(0),
});

export const gstr9Schema = z.object({
  financialYear: z.string().min(1, 'Financial year is required'),
  annualTurnover: z.number().min(0),
  totalTaxLiability: z.number().min(0),
  totalITC: z.number().min(0),
  taxPaid: z.number().min(0),
});