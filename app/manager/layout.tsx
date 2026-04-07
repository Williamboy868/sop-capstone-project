"use client";
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSession, signOut } from '@/lib/auth-client';
import { LayoutDashboard, Users, Receipt, DollarSign, LogOut, ShoppingCart, BarChart3 } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  // Note: Route protection is now handled instantly at the edge by middleware.ts

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
        },
      },
    });
  };

  const navItems = [
    { path: '/manager', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/manager/staff', label: 'Staff', icon: Users },
    { path: '/manager/transactions', label: 'Transactions', icon: Receipt },
    { path: '/manager/closing', label: 'Daily Closing', icon: DollarSign },
    { path: '/manager/reports', label: 'Reports', icon: BarChart3 },
  ];

  const isActive = (path: string) => {
    if (path === '/manager') {
      return pathname === '/manager';
    }
    return pathname.startsWith(path);
  };

  if (isPending || !session) {
    return null; // Middleware blocks unauthenticated users — this is just a flash guard
  }

  return (

    <div className="h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-5 h-5 text-foreground" />
          <h1 className="text-xl font-bold tracking-tight text-foreground m-0 leading-none">Manager Portal</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm font-medium text-muted-foreground border border-border">
            <Users className="w-4 h-4" />
            <span>Manager: {session.user?.name || 'User'}</span>
          </div>
          <Link
            href="/cashier"
            className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-full transition-colors text-sm text-center font-medium text-secondary-foreground"
          >
            Switch to Cashier
          </Link>
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 hover:bg-destructive/10 text-destructive rounded-full transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border p-4">
          <nav className="space-y-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                    active
                      ? 'bg-foreground text-background shadow-sm'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
