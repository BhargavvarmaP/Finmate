import React from 'react';

interface Column {
  accessorKey?: string;
  id?: string;
  header: string;
  cell?: ({ row }: { row: any }) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, any>[];
}

export function DataTable({ columns, data }: DataTableProps) {
  return (
    <table className="w-full">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessorKey || column.id} className="p-4 text-left">
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-t">
            {columns.map((column) => (
              <td key={column.accessorKey || column.id} className="p-4">
                {column.cell 
                  ? column.cell({ row })
                  : row[column.accessorKey as string]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
} 