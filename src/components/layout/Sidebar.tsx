import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Receipt,
  Calculator,
  FileText,
  Settings,
  CreditCard,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Transactions', href: '/transactions', icon: CreditCard },
  { name: 'GST Filing', href: '/gst', icon: Calculator },
  { name: 'TDS Management', href: '/tds', icon: Receipt },
  { name: 'Income Tax', href: '/income-tax', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  return (
    <div className="flex h-screen w-64 flex-col bg-gray-800">
      <div className="flex h-16 items-center border-b border-gray-700 px-6">
        <h1 className="text-xl font-bold text-white">FinMate</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              )
            }
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}