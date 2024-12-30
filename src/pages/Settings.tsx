import { motion } from 'framer-motion';
import { CompanySettings } from '@/components/settings/CompanySettings';
import { UserSettings } from '@/components/settings/UserSettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function Settings() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <Tabs defaultValue="company" className="space-y-4">
        <TabsList>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="user">User Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="company">
          <CompanySettings />
        </TabsContent>
        
        <TabsContent value="user">
          <UserSettings />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}