import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sun, Moon, LogOut } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="border-b border-gray-700 bg-gray-800">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex-1" />
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9 text-gray-300"
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9">
                <Avatar>
                  <AvatarImage src={`https://avatar.vercel.sh/${user?.email}`} />
                  <AvatarFallback>
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}