import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { gstr9Schema } from '@/lib/validations/gst';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGSTReturns } from '@/hooks/useGSTReturns';

export function GSTR9Filing() {
  const { fileReturn } = useGSTReturns();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(gstr9Schema),
    defaultValues: {
      financialYear: '',
      annualTurnover: 0,
      totalTaxLiability: 0,
      totalITC: 0,
      taxPaid: 0,
    },
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await fileReturn('gstr9', data);
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="financialYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Financial Year</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select financial year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="2023-24">2023-24</SelectItem>
                  <SelectItem value="2022-23">2022-23</SelectItem>
                  <SelectItem value="2021-22">2021-22</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="annualTurnover"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Annual Turnover</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalTaxLiability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Tax Liability</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalITC"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Input Tax Credit</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="taxPaid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax Paid</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Filing...' : 'File GSTR-9'}
        </Button>
      </form>
    </Form>
  );
}