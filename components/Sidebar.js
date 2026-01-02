'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Send, Users, BarChart2, PlusCircle, LogOut } from 'lucide-react';

/**
 * Sidebar Component
 * Displays navigation and the Logout button.
 */
export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/' },
    { icon: PlusCircle, label: 'New Campaign', href: '/create' },
    { icon: Send, label: 'Campaigns', href: '/campaigns' },
    { icon: Users, label: 'Segments', href: '/contacts' },
    { icon: BarChart2, label: 'Analytics', href: '/analytics' },
  ];

  return (
    <aside className="fixed left-0 top-0 z-50 h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out w-20 hover:w-64 group overflow-hidden shadow-lg hover:shadow-2xl">
      
      {/* 1. Logo Section */}
      <div className="h-24 flex items-center pl-5 relative w-full">
        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xl">G</span>
        </div>
        <span className="ml-4 font-bold text-xl text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Globopersona
        </span>
      </div>
      
      {/* 2. Navigation Links */}
      <nav className="flex-1 flex flex-col gap-2 w-full px-3 mt-4">
        {navItems.map((item, idx) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={idx}
              href={item.href}
              className={`p-3 rounded-xl transition-all flex items-center whitespace-nowrap overflow-hidden ${
                isActive 
                  ? 'bg-purple-50 text-purple-600 shadow-sm' 
                  : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
              }`}
            >
              <item.icon size={24} className="shrink-0 min-w-[24px]" />
              <span className={`ml-4 font-medium transition-all duration-300 opacity-0 group-hover:opacity-100`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* 3. Footer / Logout */}
      {/* I changed 'mb-4' to 'mb-16'. This pushes the button UP to make room for the N symbol */}
      <div className="p-3 mt-auto mb-16">
        <button className="w-full p-3 rounded-xl flex items-center text-red-400 hover:bg-red-50 transition-all whitespace-nowrap overflow-hidden">
            <LogOut size={24} className="shrink-0 min-w-[24px]" />
            <span className="ml-4 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                Logout
            </span>
        </button>
      </div>
    </aside>
  );
}