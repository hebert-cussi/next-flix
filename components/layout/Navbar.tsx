'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Film, Home, Settings, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const pathname = usePathname();

  const navigation = [
    { name: 'Inicio', href: '/', icon: Home },
    { name: 'Gestionar Series', href: '/gestion', icon: Settings },
  ];

  return (
    <nav className="bg-secondary text-white sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Film className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">
              Next<span className="text-primary">FLIX</span>
            </span>
          </Link>

          <div className="flex items-center space-x-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className="flex items-center space-x-2"
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};