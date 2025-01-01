import { useState } from 'react';
import { User, UserPlus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassPanel } from '@/components/ui/glass-panel';
import { useToast } from '@/components/ui/use-toast';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  salary: number;
  joiningDate: string;
}

export function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: 'John Doe',
      position: 'Software Engineer',
      department: 'Engineering',
      salary: 85000,
      joiningDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'Jane Smith',
      position: 'Product Manager',
      department: 'Product',
      salary: 95000,
      joiningDate: '2024-02-01',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const filteredEmployees = employees.filter(
    employee =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setEmployees(prevEmployees =>
      prevEmployees.filter(employee => employee.id !== id)
    );
    toast({
      title: 'Employee Removed',
      description: 'The employee has been removed from the system.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-sm">
          <Input
            type="text"
            placeholder="Search employees..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredEmployees.map(employee => (
          <GlassPanel key={employee.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{employee.name}</h3>
                  <p className="text-sm text-gray-400">{employee.position}</p>
                  <div className="flex gap-4 mt-1 text-sm text-gray-400">
                    <span>{employee.department}</span>
                    <span>•</span>
                    <span>${employee.salary.toLocaleString()}/year</span>
                    <span>•</span>
                    <span>Joined {employee.joiningDate}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(employee.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}
