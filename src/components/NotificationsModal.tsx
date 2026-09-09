import React, { useState } from 'react';
import {
  X,
  CheckCheck,
  SlidersHorizontal,
  Info,
  QrCode,
  Bookmark,
  Trash2,
  ChevronRight,
  Plane,
  Vote,
  Receipt,
  Clock,
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onOpenVotingTab: () => void;
  onOpenBudgetTab: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onOpenVotingTab,
  onOpenBudgetTab,
}) => {
  if (!isOpen) return null;

  const [activeFilter, setActiveFilter] = useState<'all' | 'trip' | 'expense'>('all');
  const [items, setItems] = useState<NotificationItem[]>(notifications);

  const filteredItems = items.filter((item) => {
    if (activeFilter === 'trip') return item.category === 'trip';
    if (activeFilter === 'expense') return item.category === 'expense';
    return true;
  });

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header matching Image 31 */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>Hộp thư</span>
              <span className="px-2 py-0.5 rounded-full bg-orange-500 text-white text-[11px] font-extrabold">
                {items.filter((i) => i.isUnread).length} mới
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onMarkAllAsRead}
              className="px-2.5 py-1 rounded-xl bg-sky-50 dark:bg-slate-800 text-sky-700 dark:text-sky-300 hover:bg-sky-100 text-xs font-bold flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Đọc tất cả</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-300 flex items-center justify-center ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Swipe hint */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3 px-1">
          <span className="flex items-center gap-1">
            <Info className="w-3.5 h-3.5" /> Chạm vào các thông báo để hành động tức thì
          </span>
          <span>{filteredItems.length} thông báo</span>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeFilter === 'all'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Tất cả ({items.length})
          </button>
          <button
            onClick={() => setActiveFilter('trip')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeFilter === 'trip'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Chuyến đi ({items.filter((i) => i.category === 'trip').length})
          </button>
          <button
            onClick={() => setActiveFilter('expense')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeFilter === 'expense'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Chi phí & Quỹ ({items.filter((i) => i.category === 'expense').length})
          </button>
        </div>

        {/* Notifications list */}
        <div className="space-y-3">
          {filteredItems.map((item) => {
            return (
              <div
                key={item.id}
                className={`p-4 rounded-3xl border transition-all ${
                  item.type === 'vote'
                    ? 'bg-rose-600 text-white border-rose-500 shadow-md'
                    : item.type === 'expense'
                    ? 'bg-rose-700 text-white border-rose-600 shadow-md'
                    : item.isUnread
                    ? 'bg-sky-50 dark:bg-slate-800/90 border-sky-200 dark:border-slate-700'
                    : 'bg-white dark:bg-slate-800/70 border-slate-200/80 dark:border-slate-700'
                }`}
              >
                {/* Header row */}
                <div className="flex items-center justify-between mb-1.5 text-xs">
                  <div className="flex items-center gap-1.5">
                    {item.isUnread && (
                      <span className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />
                    )}
                    <span className={`font-black uppercase tracking-wider text-[11px] ${
                      item.type === 'vote' || item.type === 'expense' ? 'text-rose-100' : 'text-sky-700 dark:text-sky-300'
                    }`}>
                      {item.title}
                    </span>
                  </div>
                  <span className={`text-[10px] ${item.type === 'vote' || item.type === 'expense' ? 'text-rose-200' : 'text-slate-400'}`}>
                    {item.timeAgo}
                  </span>
                </div>

                {/* Content */}
                <p className={`text-xs sm:text-sm leading-relaxed mb-3 ${
                  item.type === 'vote' || item.type === 'expense' ? 'text-white' : 'text-slate-700 dark:text-slate-200'
                }`}>
                  {item.content}
                </p>

                {/* Boarding Pass Box for Flight Check-in */}
                {item.type === 'flight' && (
                  <div className="p-3 rounded-2xl bg-sky-50 dark:bg-slate-700/60 border border-sky-100 dark:border-slate-600 flex items-center justify-between mb-3">
                    <div>
                      <span className="text-base font-black text-sky-800 dark:text-sky-200 tracking-wider">
                        SGN → DAD
                      </span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-300">
                        Ghế: <strong className="text-slate-800 dark:text-white">14A</strong> • Cửa: <strong className="text-slate-800 dark:text-white">04</strong>
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-1 flex items-center justify-center">
                      <QrCode className="w-7 h-7 text-slate-800 dark:text-slate-200" />
                    </div>
                  </div>
                )}

                {/* Bottom Actions Row */}
                <div className="flex items-center justify-between pt-2 border-t border-white/20 dark:border-slate-700/60 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className={`hover:underline flex items-center gap-1 text-[11px] ${
                        item.type === 'vote' || item.type === 'expense' ? 'text-rose-100' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" /> Lưu
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.id)}
                      className={`hover:underline flex items-center gap-1 text-[11px] ${
                        item.type === 'vote' || item.type === 'expense' ? 'text-rose-100' : 'text-slate-400'
                      }`}
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Xóa
                    </button>
                  </div>

                  {item.type === 'vote' ? (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenVotingTab();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white text-rose-700 font-extrabold text-xs shadow-sm hover:bg-rose-50 flex items-center gap-1"
                    >
                      <span>Bình chọn ngay</span>
                      <Vote className="w-3.5 h-3.5" />
                    </button>
                  ) : item.type === 'expense' ? (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenBudgetTab();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white text-rose-800 font-extrabold text-xs shadow-sm hover:bg-rose-50 flex items-center gap-1"
                    >
                      <span>Xem chi phí</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
