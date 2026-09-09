import React from 'react';
import { Bell, Moon, Sun, SlidersHorizontal, Sparkles, LogIn } from 'lucide-react';
import { NavTab } from '../types';

interface HeaderProps {
  currentTab: NavTab;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenUtilities: () => void;
  onOpenProfileOrAuth: () => void;
  isLoggedIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  darkMode,
  onToggleDarkMode,
  unreadCount,
  onOpenNotifications,
  onOpenUtilities,
  onOpenProfileOrAuth,
  isLoggedIn,
}) => {
  const getTabTitle = () => {
    switch (currentTab) {
      case 'kham-pha':
        return 'Khám Phá';
      case 'lich-trinh':
        return 'Lịch Trình';
      case 'binh-chon':
        return 'Bình Chọn';
      case 'ngan-sach':
        return 'Ngân Sách';
      case 'tai-khoan':
        return 'Tài Khoản';
      default:
        return 'TripMate';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 border-b transition-colors duration-200 backdrop-blur-xl bg-white/85 border-slate-200/80 dark:bg-slate-900/85 dark:border-slate-800">
      <div className="max-w-4xl mx-auto h-full px-4 flex items-center justify-between">
        {/* Brand and Current Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 dark:from-sky-600 dark:to-cyan-600 flex items-center justify-center shadow-md shadow-sky-500/20 text-white font-black text-lg select-none">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 16 7-7 4 4 7-7" />
              <path d="M14 6h7v7" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-sky-700 to-sky-600 dark:from-sky-400 dark:to-cyan-300 bg-clip-text text-transparent">
                TripMate
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-bold text-sm text-slate-700 dark:text-slate-200">
                {getTabTitle()}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* Personalization / Utilities Dashboard Button */}
          <button
            onClick={onOpenUtilities}
            title="Bảng tiện ích cá nhân hóa"
            className="p-2 rounded-xl text-slate-600 hover:text-sky-600 hover:bg-sky-50 dark:text-slate-300 dark:hover:text-cyan-400 dark:hover:bg-slate-800 transition-colors relative flex items-center gap-1 text-xs font-semibold"
          >
            <SlidersHorizontal className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span className="hidden sm:inline">Tiện ích</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            title={darkMode ? 'Chuyển giao diện Sáng' : 'Chuyển giao diện Tối'}
            className="p-2 rounded-xl text-slate-600 hover:text-amber-600 hover:bg-amber-50 dark:text-slate-300 dark:hover:text-amber-400 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            title="Hộp thư & Thông báo"
            className="p-2 rounded-xl text-slate-600 hover:text-sky-600 hover:bg-sky-50 dark:text-slate-300 dark:hover:text-cyan-400 dark:hover:bg-slate-800 transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900 animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile / Auth Avatar */}
          <button
            onClick={onOpenProfileOrAuth}
            title={isLoggedIn ? 'Hồ sơ người dùng' : 'Đăng nhập'}
            className="ml-1 w-9 h-9 rounded-full bg-sky-600 dark:bg-sky-500 text-white flex items-center justify-center font-bold text-xs ring-2 ring-sky-200 dark:ring-sky-900 hover:opacity-90 transition-all overflow-hidden"
          >
            {isLoggedIn ? (
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Nam Tran"
                className="w-full h-full object-cover"
              />
            ) : (
              <LogIn className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
