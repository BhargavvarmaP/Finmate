import React from 'react';
import { DataTable } from '../../components/ui/data-table';
import { Button } from '../ui/button';
import { useAdmin } from '../../hooks/useAdmin';
import { User } from '@/types';

export function UserManagement() {
  const { users, isLoading } = useAdmin();

  const columns = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'role', header: 'Role' },
    { accessorKey: 'lastActive', header: 'Last Active' },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: { row: { original: User } }) => (
        <Button variant="ghost" size="sm">
          Manage
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">User Management</h2>
        <Button variant="primary">Add User</Button>
      </div>
      <DataTable columns={columns} data={users || []} />
    </div>
  );
}