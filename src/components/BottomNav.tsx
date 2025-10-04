import { Home, History, Settings, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  onAddExpense: () => void;
}

export const BottomNav = ({ onAddExpense }: BottomNavProps) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Início' },
    { path: '/history', icon: History, label: 'Histórico' },
    { path: '/categories', icon: Settings, label: 'Categorias' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
      <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-around">
        {navItems.map((item, index) => (
          <div key={item.path}>
            <Link
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors",
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
            {index === 0 && (
              <button
                onClick={onAddExpense}
                className="absolute left-1/2 -translate-x-1/2 -top-6 w-14 h-14 rounded-full gradient-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
              >
                <Plus className="h-6 w-6" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
