'use client';

import React from 'react';
import {
  Home,
  BarChart3,
  Settings,
  Clock,
  Users,
  AlertCircle,
  LogOut,
} from 'lucide-react';

interface SidebarNavProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

/**
 * Left sidebar navigation component
 * Provides quick access to main features and settings
 */
export function SidebarNav({ activeItem, onItemClick }: SidebarNavProps) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
    },
    {
      id: 'students',
      label: 'Students',
      icon: Users,
    },
    {
      id: 'notifications',
      label: 'Alerts',
      icon: AlertCircle,
    },
    {
      id: 'history',
      label: 'History',
      icon: Clock,
    },
  ];

  const bottomItems = [
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: LogOut,
    },
  ];

  return (
    <div className="w-20 bg-card border-r border-border flex flex-col h-screen">
      {/* Logo / Brand */}
      <div className="h-16 flex items-center justify-center border-b border-border">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 py-4 flex flex-col items-center gap-2 px-2">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 group relative ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={item.label}
              aria-label={item.label}
            >
              <Icon className="w-6 h-6" />

              {/* Tooltip on hover */}
              <div className="absolute left-full ml-2 px-2 py-1 rounded bg-foreground text-background text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                {item.label}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Bottom Menu */}
      <div className="border-t border-border py-4 px-2 flex flex-col items-center gap-2">
        {bottomItems.map(item => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 group relative ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={item.label}
              aria-label={item.label}
            >
              <Icon className="w-6 h-6" />

              {/* Tooltip on hover */}
              <div className="absolute left-full ml-2 px-2 py-1 rounded bg-foreground text-background text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                {item.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
