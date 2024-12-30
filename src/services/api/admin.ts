import { api } from './base';
import { AdminUser, AuditLog, ComplianceStatus } from '@/types/admin';

export const adminApi = {
  getUsers: async () => {
    const response = await api.get<AdminUser[]>('/admin/users');
    return response.data;
  },

  updateUserPermissions: async (userId: string, permissions: string[]) => {
    const response = await api.put<AdminUser>(`/admin/users/${userId}/permissions`, { permissions });
    return response.data;
  },

  getAuditLogs: async () => {
    const response = await api.get<AuditLog[]>('/admin/audit-logs');
    return response.data;
  },

  getComplianceStatus: async () => {
    const response = await api.get<ComplianceStatus[]>('/admin/compliance-status');
    return response.data;
  },
};