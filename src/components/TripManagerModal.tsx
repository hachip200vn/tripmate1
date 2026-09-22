import React, { useState } from 'react';
import {
  X,
  Plus,
  KeyRound,
  CheckCircle2,
  Calendar,
  MapPin,
  Users,
  Sparkles,
  ArrowRight,
  Clock,
  Trash2,
  Share2,
  Crown,
  Wallet,
  Compass,
  Check,
} from 'lucide-react';
import { Trip, TripStatus } from '../types';
import { formatCurrency } from '../utils/format';

interface TripManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  trips: Trip[];
  currentTripId: string;
  onSelectTrip: (tripId: string) => void;
  onOpenCreateWithAi: () => void;
  onOpenJoinTrip: () => void;
  onOpenInviteForTrip: (trip: Trip) => void;
  onDeleteTrip: (tripId: string) => void;
}

export const TripManagerModal: React.FC<TripManagerModalProps> = ({
  isOpen,
  onClose,
  trips,
  currentTripId,
  onSelectTrip,
  onOpenCreateWithAi,
  onOpenJoinTrip,
  onOpenInviteForTrip,
  onDeleteTrip,
}) => {
  if (!isOpen) return null;

  const [activeFilter, setActiveFilter] = useState<'all' | 'active_upcoming' | 'completed'>('all');
  const [confirmDeleteTripId, setConfirmDeleteTripId] = useState<string | null>(null);

  const filteredTrips = trips.filter((t) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active_upcoming') return t.status === 'active' || t.status === 'upcoming';
    if (activeFilter === 'completed') return t.status === 'completed';
    return true;
  });

  const getStatusBadge = (status: TripStatus) => {
    switch (status) {
      case 'active':
        return (
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/90 text-white text-[10px] font-extrabold flex items-center gap-1 backdrop-blur-xs shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>Đang diễn ra</span>
          </span>
        );
      case 'upcoming':
        return (
          <span className="px-2 py-0.5 rounded-full bg-sky-500/90 text-white text-[10px] font-extrabold flex items-center gap-1 backdrop-blur-xs shadow-xs">
            <span>Sắp tới</span>
          </span>
        );
      case 'completed':
        return (
          <span className="px-2 py-0.5 rounded-full bg-slate-600/90 text-white text-[10px] font-extrabold flex items-center gap-1 backdrop-blur-xs shadow-xs">
            <span>Đã kết thúc</span>
          </span>
        );
      default:
        return null;
    }
  };

  const getRoleBadge = (role: string) => {
    if (role === 'Trưởng nhóm') {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
          <Crown className="w-3 h-3 text-amber-500" />
          <span>Trưởng nhóm</span>
        </span>
      );
    }
    if (role === 'Thủ quỹ') {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-md border border-teal-200 dark:border-teal-800">
          <Wallet className="w-3 h-3 text-teal-500" />
          <span>Thủ quỹ</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
        <Users className="w-3 h-3 text-slate-400" />
        <span>Thành viên</span>
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[92vh] overflow-y-auto flex flex-col animate-in slide-in-from-bottom-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800 mb-4 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
          <div>
            <h2 className="text-base font-black text-slate-900 dark:text-slate-100">
              Quản lý các chuyến đi
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">
              {trips.length} chuyến du lịch của bạn
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
            title="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Top Fast Actions */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => {
              onClose();
              onOpenCreateWithAi();
            }}
            className="p-3 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:opacity-95 text-white flex items-center justify-center gap-2 font-bold text-xs shadow-md shadow-sky-600/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Lập chuyến mới (AI)</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenJoinTrip();
            }}
            className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 flex items-center justify-center gap-2 font-bold text-xs border border-slate-200 dark:border-slate-700 active:scale-[0.98] transition-all cursor-pointer"
          >
            <KeyRound className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Nhập mã tham gia</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 mb-4 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-300 shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            Tất cả ({trips.length})
          </button>
          <button
            onClick={() => setActiveFilter('active_upcoming')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'active_upcoming'
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-300 shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            Đang & Sắp đi (
            {trips.filter((t) => t.status === 'active' || t.status === 'upcoming').length}
            )
          </button>
          <button
            onClick={() => setActiveFilter('completed')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'completed'
                ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-300 shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            Đã kết thúc ({trips.filter((t) => t.status === 'completed').length})
          </button>
        </div>

        {/* Trips List */}
        <div className="space-y-3 mb-4">
          {filteredTrips.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
              <Compass className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Chưa có chuyến đi nào trong mục này
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Tạo chuyến đi mới cùng bạn bè hoặc nhập mã tham gia ngay
              </p>
            </div>
          ) : (
            filteredTrips.map((trip) => {
              const isSelected = trip.id === currentTripId;
              const totalCost = trip.expenses?.reduce((sum, e) => sum + e.amount, 0) || 0;

              return (
                <div
                  key={trip.id}
                  className={`group relative overflow-hidden rounded-2xl border transition-all ${
                    isSelected
                      ? 'border-sky-500 ring-2 ring-sky-500/20 bg-sky-50/30 dark:bg-sky-950/20 shadow-md'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {/* Top Cover Banner */}
                  <div className="relative h-28 overflow-hidden">
                    <img
                      src={
                        trip.coverImage ||
                        'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&auto=format&fit=crop&q=80'
                      }
                      alt={trip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                    {/* Status badge & Active badge */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                      <div className="flex items-center gap-1.5">
                        {getStatusBadge(trip.status)}
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded-full bg-sky-600 text-white text-[10px] font-extrabold flex items-center gap-1 shadow-xs">
                            <Check className="w-3 h-3" />
                            <span>Đang xem</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                            onOpenInviteForTrip(trip);
                          }}
                          className="px-2 py-1 rounded-lg bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          title="Mời bạn bè vào chuyến này"
                        >
                          <Share2 className="w-3 h-3" />
                          <span>{trip.inviteCode}</span>
                        </button>
                      </div>
                    </div>

                    {/* Bottom Title & Destination inside image */}
                    <div className="absolute bottom-2.5 left-3 right-3 z-10">
                      <h3 className="text-sm font-black text-white truncate drop-shadow">
                        {trip.title}
                      </h3>
                      <p className="text-[11px] text-sky-200 font-semibold drop-shadow flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{trip.destination}</span>
                      </p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{trip.datesSummary}</span>
                      </div>
                      <div>{getRoleBadge(trip.userRole)}</div>
                    </div>

                    {/* Meta stats bar */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 py-1.5 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-1.5 overflow-hidden">
                          {trip.members?.slice(0, 3).map((m) => (
                            <div
                              key={m.id}
                              className="w-5 h-5 rounded-full bg-sky-600 text-white text-[9px] font-bold ring-1 ring-white dark:ring-slate-900 flex items-center justify-center"
                              title={m.name}
                            >
                              {m.initials}
                            </div>
                          ))}
                        </div>
                        <span>{trip.members?.length || 1} thành viên</span>
                      </div>

                      <div className="flex items-center gap-2 font-medium">
                        <span>{trip.days?.length || trip.totalDays} ngày</span>
                        <span>•</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {formatCurrency(totalCost)}
                        </span>
                      </div>
                    </div>

                    {/* Delete Confirm inline */}
                    {confirmDeleteTripId === trip.id && (
                      <div className="mt-2 p-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-xs flex items-center justify-between animate-in fade-in">
                        <span className="text-rose-700 dark:text-rose-300 font-semibold text-[11px]">
                          Xác nhận xóa chuyến đi này?
                        </span>
                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteTripId(null)}
                            className="px-2 py-0.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-[10px] font-bold text-slate-600"
                          >
                            Hủy
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onDeleteTrip(trip.id);
                              setConfirmDeleteTripId(null);
                            }}
                            className="px-2 py-0.5 rounded-lg bg-rose-600 text-[10px] font-bold text-white hover:bg-rose-700"
                          >
                            Xác nhận
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      {trips.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteTripId(trip.id)}
                          className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950 text-slate-400 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
                          title="Xóa chuyến đi"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          onSelectTrip(trip.id);
                          onClose();
                        }}
                        className={`flex-1 h-9 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800'
                            : 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Đang hiển thị lịch trình này</span>
                          </>
                        ) : (
                          <>
                            <span>Chuyển sang chuyến này</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Nút Tạo lịch trình mới chuyển xuống cuối */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenCreateWithAi();
            }}
            className="w-full h-11 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-sky-600/20 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Tạo lịch trình mới bằng AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};
