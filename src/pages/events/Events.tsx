import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassPanel } from '@/components/ui/glass-panel';
import { useToast } from '@/components/ui/use-toast';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'webinar' | 'workshop' | 'conference';
  location: string;
  speaker: string;
  capacity: number;
  registered: number;
  imageUrl: string;
}

export function Events() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const { toast } = useToast();

  const events: Event[] = [
    {
      id: '1',
      title: 'GST Compliance Masterclass',
      description: 'Learn about the latest GST compliance requirements and best practices...',
      date: '2025-01-15',
      time: '10:00 AM IST',
      type: 'webinar',
      location: 'Online',
      speaker: 'CA Rajesh Kumar',
      capacity: 100,
      registered: 75,
      imageUrl: '/events/gst-masterclass.jpg',
    },
    {
      id: '2',
      title: 'Financial Planning Workshop',
      description: 'Hands-on workshop on financial planning and tax optimization strategies...',
      date: '2025-01-20',
      time: '2:00 PM IST',
      type: 'workshop',
      location: 'Mumbai',
      speaker: 'Dr. Priya Singh',
      capacity: 50,
      registered: 35,
      imageUrl: '/events/financial-workshop.jpg',
    },
    // Add more events
  ];

  const filteredEvents = events.filter(
    (event) =>
      (selectedType === 'all' || event.type === selectedType) &&
      (event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleRegister = (eventId: string) => {
    // TODO: Implement event registration
    toast({
      title: 'Success',
      description: 'You have been registered for the event.',
    });
  };

  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Events & Webinars</h1>

        <GlassPanel className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="p-2 rounded-md bg-background border border-input"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="webinar">Webinars</option>
              <option value="workshop">Workshops</option>
              <option value="conference">Conferences</option>
            </select>
          </div>
        </GlassPanel>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <GlassPanel className="h-full">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                  <p className="text-gray-400 mb-4">{event.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">
                        {event.registered}/{event.capacity} registered
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          event.type === 'webinar'
                            ? 'bg-blue-500/20 text-blue-500'
                            : event.type === 'workshop'
                            ? 'bg-green-500/20 text-green-500'
                            : 'bg-purple-500/20 text-purple-500'
                        }`}
                      >
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                      <span className="text-sm text-gray-400">{event.speaker}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleRegister(event.id)}
                    className="w-full"
                    disabled={event.registered >= event.capacity}
                  >
                    {event.registered >= event.capacity ? 'Sold Out' : 'Register Now'}
                  </Button>
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No events found matching your criteria.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
