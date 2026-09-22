import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  MapPin,
  Users,
  Check,
  CheckCircle2,
  Trash2,
  Share2,
  KeyRound,
  Compass,
  ArrowRight,
  Plus,
  Layers,
  Crown,
  Wallet,
  Coins
} from 'lucide-react';
import { Trip, TripStatus } from '../types';
import { formatCurrency } from '../utils/format';

interface TripsListViewProps {
  trips: Trip[];
  currentTripId: string;
  onBack?: () => void;
  onSelectTrip: (tripId: string) => void;
  onOpenCreateWithAi: () => void;
  onOpenManualCreate?: () => void;
  onOpenJoinTrip: () => void;
  onOpenInviteForTrip: (trip: Trip) => void;
  onDeleteTrip: (tripId: string) => void;
}

export const TripsListView: React.FC<TripsListViewProps> = ({
  trips,
  currentTripId,
  onSelectTrip,
  onOpenCreateWithAi,
  onOpenManualCreate,
  onOpenJoinTrip,
  onOpenInviteForTrip,
  onDeleteTrip,
}) => {
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
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/90 text-white text-[11px] font-extrabold flex items-center gap-1.5 backdrop-blur-xs shadow-xs">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>Đang diễn ra</span>
          </span>
        );
      case 'upcoming':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-sky-500/90 text-white text-[11px] font-extrabold flex items-center gap-1.5 backdrop-blur-xs shadow-xs">
            <span>Sắp tới</span>
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-slate-600/90 text-white text-[11px] font-extrabold flex items-center gap-1.5 backdrop-blur-xs shadow-xs">
            <span>Đã hoàn thành</span>
          </span>
        );
      default:
        return null;
    }
  };

  const getRoleBadge = (role: string) => {
    if (role === 'Trưởng nhóm') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
          <Crown className="w-3 h-3 text-amber-500" />
          <span>Trưởng nhóm</span>
        </span>
      );
    }
    if (role === 'Thủ quỹ') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-md border border-teal-200 dark:border-teal-800">
          <Wallet className="w-3 h-3 text-teal-500" />
          <span>Thủ quỹ</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
        <Users className="w-3 h-3 text-slate-400" />
        <span>Thành viên</span>
      </span>
    );
  };

  return (
    <div className="flex flex-col w-full pb-24 animate-in fade-in duration-200">
      {/* Quick Action Banner (Join by code) */}
      <div className="mb-4 flex items-center justify-between p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center">
            <KeyRound className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Bạn có mã mời từ bạn bè?
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Nhập mã phòng để cùng tham gia chuyến đi
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenJoinTrip}
          className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-slate-700 text-xs font-bold transition-all active:scale-95 cursor-pointer"
        >
          Nhập mã
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 mb-4 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-300 shadow-xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          Tất cả ({trips.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('active_upcoming')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeFilter === 'active_upcoming'
              ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-300 shadow-xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          Đang & Sắp đi ({trips.filter((t) => t.status === 'active' || t.status === 'upcoming').length})
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('completed')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeFilter === 'completed'
              ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-300 shadow-xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
          }`}
        >
          Đã xong ({trips.filter((t) => t.status === 'completed').length})
        </button>
      </div>

      {/* Vertical List of Trips: hiển thị từng chuyến đi 1 theo dạng từ trên xuống dưới */}
      <div className="space-y-4">
        {filteredTrips.length === 0 ? (
          <div className="p-10 text-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
            <Compass className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">
              Chưa có chuyến đi nào trong mục này
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 max-w-xs mx-auto">
              Bắt đầu tạo một lịch trình du lịch mới bằng AI hoặc tham gia cùng bạn bè qua mã phòng.
            </p>
            <button
              type="button"
              onClick={onOpenCreateWithAi}
              className="px-4 py-2 rounded-xl bg-sky-600 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Tạo lịch trình ngay</span>
            </button>
          </div>
        ) : (
          filteredTrips.map((trip) => {
            const isSelected = trip.id === currentTripId;
            const totalCost = trip.expenses?.reduce((sum, e) => sum + e.amount, 0) || 0;

            return (
              <div
                key={trip.id}
                className={`group relative overflow-hidden rounded-3xl border transition-all duration-200 ${
                  isSelected
                    ? 'border-sky-500 ring-2 ring-sky-500/20 bg-white dark:bg-slate-900 shadow-lg'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
                }`}
              >
                {/* Trip Cover Image & Overlay */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={
                      trip.coverImage ||
                      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&auto=format&fit=crop&q=80'
                    }
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />

                  {/* Top Bar inside image */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <div className="flex items-center gap-1.5">
                      {getStatusBadge(trip.status)}
                      {isSelected && (
                        <span className="px-2.5 py-0.5 rounded-full bg-sky-600 text-white text-[11px] font-black flex items-center gap-1 shadow-xs">
                          <Check className="w-3.5 h-3.5" />
                          <span>Đang xem</span>
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenInviteForTrip(trip);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-black/45 hover:bg-black/65 text-white backdrop-blur-xs text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
                      title="Mời bạn bè tham gia chuyến đi này"
                    >
                      <Share2 className="w-3.5 h-3.5 text-sky-300" />
                      <span>{trip.inviteCode}</span>
                    </button>
                  </div>

                  {/* Bottom details inside image */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 z-10">
                    <h2 className="text-base sm:text-lg font-black text-white truncate drop-shadow">
                      {trip.title}
                    </h2>
                    <div className="flex items-center gap-3 mt-1 text-xs text-sky-200 font-semibold drop-shadow">
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                        <span>{trip.destination}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                        <span>{trip.datesSummary}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Details & Stats */}
                <div className="p-4">
                  {/* Meta stats row */}
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <div>{getRoleBadge(trip.userRole)}</div>

                    <div className="flex items-center gap-3 font-semibold text-slate-600 dark:text-slate-300">
                      <span className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-slate-400" />
                        <span>{trip.days?.length || trip.totalDays} ngày</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-teal-600 dark:text-teal-400 font-bold">
                        <Coins className="w-3.5 h-3.5" />
                        <span>{formatCurrency(totalCost)}</span>
                      </span>
                    </div>
                  </div>

                  {/* Members Avatars preview */}
                  <div className="flex items-center justify-between py-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2 overflow-hidden">
                        {trip.members?.slice(0, 4).map((m) => (
                          <div
                            key={m.id}
                            className="w-6 h-6 rounded-full bg-gradient-to-tr from-sky-600 to-indigo-600 text-white text-[10px] font-bold ring-2 ring-white dark:ring-slate-900 flex items-center justify-center"
                            title={m.name}
                          >
                            {m.initials}
                          </div>
                        ))}
                      </div>
                      <span className="font-semibold">
                        {trip.members?.length || 1} thành viên tham gia
                      </span>
                    </div>

                    <span className="text-[11px] text-slate-400 font-mono">
                      Mã: {trip.inviteCode}
                    </span>
                  </div>

                  {/* AI Summary note if available */}
                  {trip.aiSummary && (
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 italic bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                      "{trip.aiSummary}"
                    </p>
                  )}

                  {/* Confirm Delete inline */}
                  {confirmDeleteTripId === trip.id && (
                    <div className="mt-3 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-xs flex items-center justify-between animate-in fade-in">
                      <span className="text-rose-700 dark:text-rose-300 font-bold">
                        Xác nhận xóa chuyến đi "{trip.title}"?
                      </span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteTripId(null)}
                          className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
                        >
                          Hủy
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onDeleteTrip(trip.id);
                            setConfirmDeleteTripId(null);
                          }}
                          className="px-3 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 cursor-pointer"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Bottom Action Buttons */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2.5">
                    {trips.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteTripId(trip.id)}
                        className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-950 text-slate-400 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
                        title="Xóa chuyến đi"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => onSelectTrip(trip.id)}
                      className={`flex-1 h-10 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800'
                          : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sm shadow-sky-600/20 active:scale-[0.98]'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                          <span>Đang hiển thị lịch trình này</span>
                        </>
                      ) : (
                        <>
                          <span>Xem lịch trình chuyến này</span>
                          <ArrowRight className="w-4 h-4" />
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

      {/* Nút Tạo lịch trình mới (Tự động AI + Thủ công) */}
      <div className="mt-5 pt-3 space-y-2.5">
        <button
          type="button"
          onClick={onOpenCreateWithAi}
          className="w-full h-12 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-700 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-600/25 active:scale-[0.98] transition-all cursor-pointer"
          title="Gợi ý tự động 5 điểm đến xếp theo % phù hợp"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Gợi ý điểm đến tự động với AI (Top 5 %)</span>
        </button>

        {onOpenManualCreate && (
          <button
            type="button"
            onClick={onOpenManualCreate}
            className="w-full h-11 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 shadow-2xs active:scale-[0.98] transition-all cursor-pointer"
            title="Tự nhập điểm đi, điểm đến, ngân sách..."
          >
            <Compass className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Tự tạo lịch trình thủ công</span>
          </button>
        )}
      </div>
    </div>
  );
};
