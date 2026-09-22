import React from 'react';
import { Compass, CalendarDays, CheckSquare, Wallet, User } from 'lucide-react';
import { NavTab } from '../types';

interface BottomNavProps {
  currentTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onChangeTab }) => {
  const tabs: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'kham-pha', label: 'Khám phá', icon: Compass },
    { id: 'lich-trinh', label: 'Lịch trình', icon: CalendarDays },
    { id: 'binh-chon', label: 'Bình chọn', icon: CheckSquare },
    { id: 'ngan-sach', label: 'Ngân sách', icon: Wallet },
    { id: 'tai-khoan', label: 'Tài khoản', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 h-16 border-t transition-colors duration-200 backdrop-blur-xl bg-white/90 border-slate-200/80 dark:bg-slate-900/90 dark:border-slate-800">
      <div className="max-w-md mx-auto h-full px-2 flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id || (tab.id === 'lich-trinh' && currentTab === 'chuyen-di');

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-all duration-200 ${
                isActive
                  ? 'text-sky-600 dark:text-sky-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200 font-medium'
              }`}
            >
              <div className={`relative p-1 rounded-xl transition-colors ${isActive ? 'bg-sky-50 dark:bg-sky-950/50' : ''}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              </div>
              <span className="text-[11px] leading-tight mt-0.5 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
