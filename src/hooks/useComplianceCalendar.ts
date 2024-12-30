import { useState, useEffect } from 'react';
import { api } from '@/services/api/base';
import { useToast } from '@/components/ui/use-toast';

interface ComplianceEvent {
  id: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  type: 'gst' | 'tds' | 'itr';
}

export function useComplianceCalendar() {
  const [events, setEvents] = useState<ComplianceEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/compliance/calendar');
        setEvents(response.data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch compliance events',
          variant: 'destructive',
        });
      }
    };

    fetchEvents();
  }, []);

  return {
    events,
    selectedDate,
    setSelectedDate,
  };
}