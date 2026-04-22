'use client';

import React from 'react';
import { Search, Bell, User, Settings, Menu } from 'lucide-react';

interface HeaderProps {
  title?: string;
  onMenuClick?: () => void;
  onFeedClick?: () => void;
  showMenuButton?: boolean;
  showFeedButton?: boolean;
}

/**
 * Top header component with search, notifications, and user menu
 * Fully responsive with mobile-optimized layout
 */
export function Header({
  title = 'Attendance Monitor',
  onMenuClick,
  onFeedClick,
  showMenuButton = false,
  showFeedButton = false,
}: HeaderProps) {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const currentTime = React.useMemo(() => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }, []);

  return (
    <header className="h-14 sm:h-16 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="h-full flex items-center justify-between px-3 sm:px-4 md:px-6 gap-2 sm:gap-4">
        {/* Left: Menu Button (Mobile) + Title */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          {showMenuButton && (
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
          <h1 className="text-lg sm:text-xl font-bold text-foreground truncate">
            {title}
          </h1>
        </div>

        {/* Center: Search - Hidden on small mobile, visible on sm+ */}
        <div className="hidden sm:flex flex-1 max-w-xs md:max-w-sm">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* Right: Actions and User */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
          {/* Time Display - Hidden on mobile */}
          <div className="hidden md:block text-xs md:text-sm text-muted-foreground font-medium px-2 md:px-3 py-1 rounded bg-muted whitespace-nowrap">
            {currentTime}
          </div>

          {/* Notification Bell */}
          <button
            className="relative w-9 sm:w-10 h-9 sm:h-10 rounded-lg hover:bg-muted transition-colors flex items-center justify-center group flex-shrink-0"
            aria-label="Notifications"
          >
            <Bell className="w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground group-hover:text-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </button>

          {/* Settings - Hidden on small mobile */}
          <button
            className="hidden sm:flex w-9 sm:w-10 h-9 sm:h-10 rounded-lg hover:bg-muted transition-colors items-center justify-center group flex-shrink-0"
            aria-label="Settings"
          >
            <Settings className="w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground group-hover:text-foreground" />
          </button>

          {/* Feed Toggle Button (Mobile) */}
          {showFeedButton && (
            <button
              onClick={onFeedClick}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
              aria-label="Toggle activity feed"
            >
              <svg
                className="w-5 h-5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </button>
          )}

          {/* User Avatar */}
          <button
            className="w-9 sm:w-10 h-9 sm:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold hover:shadow-lg transition-shadow group flex-shrink-0"
            aria-label="User menu"
          >
            <User className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
