import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Receipt,
  Calculator,
  FileText,
  Settings,
  CreditCard,
  FileCheck,
  BarChart,
  FileBarChart,
  FileBox,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
  { name: 'Transactions', href: '/app/transactions', icon: CreditCard },
  {
    name: 'Financial',
    children: [
      { name: 'GST Filing', href: '/app/financial/gst', icon: Calculator },
      { name: 'TDS Management', href: '/app/financial/tds', icon: Receipt },
      { name: 'Income Tax', href: '/app/financial/income-tax', icon: FileText },
      { name: 'Payroll', href: '/app/financial/payroll', icon: CreditCard },
      { name: 'Multi-Currency', href: '/app/financial/multi-currency', icon: BarChart },
    ],
  },
  {
    name: 'Compliance',
    children: [
      { name: 'Monitoring', href: '/app/compliance/monitoring', icon: FileCheck },
      { name: 'Audit Analytics', href: '/app/compliance/audit', icon: BarChart },
      { name: 'Financial Reporting', href: '/app/compliance/reporting', icon: FileBarChart },
      { name: 'XBRL Filing', href: '/app/compliance/xbrl', icon: FileBox },
    ],
  },
  { name: 'Documents', href: '/app/documents', icon: FileText },
  { name: 'Settings', href: '/app/settings', icon: Settings },
];

export function Sidebar() {
  return (
    <div className="flex h-screen w-64 flex-col bg-gray-800">
      <div className="flex h-16 items-center border-b border-gray-700 px-6">
        <h1 className="text-xl font-bold text-white">FinMate</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => (
          <div key={item.name}>
            {item.children ? (
              <div className="space-y-1">
                <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {item.name}
                </div>
                {item.children.map((child) => (
                  <NavLink
                    key={child.name}
                    to={child.href}
                    className={({ isActive }) =>
                      cn(
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                        isActive
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      )
                    }
                  >
                    <child.icon className="mr-3 h-5 w-5" />
                    {child.name}
                  </NavLink>
                ))}
              </div>
            ) : (
              <NavLink
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
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}