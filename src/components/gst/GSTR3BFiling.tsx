import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { gstr3bSchema } from '@/lib/validations/gst';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGSTReturns } from '@/hooks/useGSTReturns';

export function GSTR3BFiling() {
  const { fileReturn } = useGSTReturns();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(gstr3bSchema),
    defaultValues: {
      period: '',
      outwardSupplies: 0,
      inwardSupplies: 0,
      itcAvailed: 0,
      taxLiability: 0,
    },
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await fileReturn('gstr3b', data);
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
          name="period"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Filing Period</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="2024-03">March 2024</SelectItem>
                  <SelectItem value="2024-02">February 2024</SelectItem>
                  <SelectItem value="2024-01">January 2024</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="outwardSupplies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Outward Supplies</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="inwardSupplies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inward Supplies</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="itcAvailed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ITC Availed</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="taxLiability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax Liability</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Filing...' : 'File GSTR-3B'}
        </Button>
      </form>
    </Form>
  );
}