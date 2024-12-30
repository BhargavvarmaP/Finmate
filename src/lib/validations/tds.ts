import * as z from 'zod';

export const tdsDeductionSchema = z.object({
  deducteeType: z.enum(['individual', 'company', 'firm']),
  section: z.string().min(1, 'TDS section is required'),
  amount: z.number().min(0, 'Amount must be 0 or greater'),
  rate: z.number().min(0, 'Rate must be 0 or greater'),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format'),
  assessmentYear: z.string().min(1, 'Assessment year is required'),
});

export const tdsReturnSchema = z.object({
  quarter: z.string().min(1, 'Quarter is required'),
  formType: z.enum(['26Q', '27Q', '24Q']),
  challanDetails: z.string().min(1, 'Challan details are required'),
  acknowledgmentNo: z.string().optional(),
});