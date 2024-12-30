import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { tdsReturnSchema } from '@/lib/validations/tds';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTDS } from '@/hooks/useTDS';

export function TDSReturns() {
  const { fileReturn } = useTDS();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(tdsReturnSchema),
    defaultValues: {
      quarter: '',
      formType: '26Q',
      challanDetails: '',
    },
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await fileReturn(data);
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>File TDS Return</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="quarter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quarter</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select quarter" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Q1">Q1 (Apr-Jun)</SelectItem>
                      <SelectItem value="Q2">Q2 (Jul-Sep)</SelectItem>
                      <SelectItem value="Q3">Q3 (Oct-Dec)</SelectItem>
                      <SelectItem value="Q4">Q4 (Jan-Mar)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="formType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Form Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select form type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="26Q">Form 26Q</SelectItem>
                      <SelectItem value="27Q">Form 27Q</SelectItem>
                      <SelectItem value="24Q">Form 24Q</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="challanDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challan Details</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter challan details" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Filing...' : 'File Return'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}