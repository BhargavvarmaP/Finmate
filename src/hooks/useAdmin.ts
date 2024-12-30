import { useState, useEffect } from 'react';
import { adminApi } from '@/services/api/admin';
import { useToast } from '@/components/ui/use-toast';
import { AdminUser, AuditLog, ComplianceStatus } from '@/types/admin';

export function useAdmin() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [complianceStatus, setComplianceStatus] = useState<ComplianceStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      const [usersData, logsData, statusData] = await Promise.all([
        adminApi.getUsers(),
        adminApi.getAuditLogs(),
        adminApi.getComplianceStatus(),
      ]);

      setUsers(usersData);
      setAuditLogs(logsData);
      setComplianceStatus(statusData);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch admin data',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    users,
    auditLogs,
    complianceStatus,
    isLoading,
  };
}