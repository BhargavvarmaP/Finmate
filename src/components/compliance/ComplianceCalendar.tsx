import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useComplianceCalendar } from '@/hooks/useComplianceCalendar';
import { ComplianceCalendarEvent } from '@/types/compliance';

export function ComplianceCalendar() {
  const { events, selectedDate, setSelectedDate } = useComplianceCalendar();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance Calendar</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
        />
        <div className="space-y-4">
          <h3 className="font-semibold">Upcoming Deadlines</h3>
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-muted-foreground">
                  Due: {event.dueDate}
                </p>
              </div>
              <Badge
                variant={event.status === 'pending' ? 'default' : 'secondary'}
              >
                {event.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}