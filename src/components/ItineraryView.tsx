import React, { useState } from 'react';
import {
  Sparkles,
  Shuffle,
  Share2,
  Pencil,
  UserPlus,
  SunMedium,
  MapPin,
  Clock,
  Car,
  CheckCircle2,
  Plus,
  SlidersHorizontal,
  ChevronRight,
  MoreVertical,
  Maximize2,
  Utensils,
  Compass,
  Waves,
  Moon,
  Ticket,
  Users,
  Check,
  Trash2,
  X,
  ExternalLink,
  Navigation,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  CheckSquare,
  AlertCircle,
  Layers,
  KeyRound,
  ArrowRight
} from 'lucide-react';
import { TripDay, TimelineActivity, Member, Trip } from '../types';

interface ItineraryViewProps {
  days: TripDay[];
  selectedDay: number;
  onSelectDay: (day: number) => void;
  activities: TimelineActivity[];
  members: Member[];
  tripTitle?: string;
  tripDatesSummary?: string;
  tripCoverImage?: string;
  aiSummary?: string;
  trips?: Trip[];
  currentTripId?: string;
  onSelectTrip?: (tripId: string) => void;
  onOpenTripManager?: () => void;
  onOpenJoinTrip?: () => void;
  onOpenAiPlanner: () => void;
  onAddActivity: () => void;
  onOpenInviteModal: () => void;
  onVoteAgain: (activityTitle: string) => void;
  onOpenFullscreenMap: () => void;
  onOptimizeRoute: () => void;
  onResetTrip?: () => void;
  onUpdateActivityStatus?: (
    activityId: string,
    newStatusType: TimelineActivity['statusType'],
    newStatusText: string
  ) => void;
  onDeleteActivity?: (activityId: string) => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  days,
  selectedDay,
  onSelectDay,
  activities,
  members,
  tripTitle,
  tripDatesSummary,
  tripCoverImage,
  aiSummary,
  trips = [],
  currentTripId,
  onSelectTrip,
  onOpenTripManager,
  onOpenJoinTrip,
  onOpenAiPlanner,
  onAddActivity,
  onOpenInviteModal,
  onVoteAgain,
  onOpenFullscreenMap,
  onOptimizeRoute,
  onResetTrip,
  onUpdateActivityStatus,
  onDeleteActivity,
}) => {
  const [selectedActivityForDetails, setSelectedActivityForDetails] = useState<TimelineActivity | null>(null);
  const [activityStatusMenu, setActivityStatusMenu] = useState<TimelineActivity | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Interactive Map State
  const [showInteractiveMapModal, setShowInteractiveMapModal] = useState(false);
  const [selectedMapStopIndex, setSelectedMapStopIndex] = useState<number>(0);
  const [mapZoom, setMapZoom] = useState<number>(1);

  // Status definitions
  const availableStatuses: {
    type: TimelineActivity['statusType'];
    text: string;
    description: string;
    badgeClass: string;
  }[] = [
    {
      type: 'approved',
      text: 'Đã duyệt',
      description: 'Lịch trình đã được cả nhóm đồng thuận',
      badgeClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800'
    },
    {
      type: 'completed',
      text: 'Đã hoàn thành',
      description: 'Đã ghé thăm & check-in xong địa điểm này',
      badgeClass: 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-400 border-teal-300 dark:border-teal-800'
    },
    {
      type: 'booked',
      text: 'Đã đặt chỗ',
      description: 'Đã đặt vé, bàn ăn hoặc tour trước',
      badgeClass: 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400 border-sky-300 dark:border-sky-800'
    },
    {
      type: 'pending',
      text: 'Chờ duyệt',
      description: 'Ý tưởng đề xuất, chờ chốt thời gian',
      badgeClass: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-300 dark:border-amber-800'
    },
    {
      type: 'voted',
      text: 'Cần biểu quyết',
      description: 'Đang mở cuộc vote trong tab Bình chọn',
      badgeClass: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-400 border-cyan-300 dark:border-cyan-800'
    },
    {
      type: 'transport',
      text: 'Đang di chuyển',
      description: 'Chặng di chuyển / xe trung chuyển',
      badgeClass: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border-blue-300 dark:border-blue-800'
    },
    {
      type: 'cancelled',
      text: 'Đã hủy',
      description: 'Tạm hoãn hoặc bỏ qua hoạt động này',
      badgeClass: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border-rose-300 dark:border-rose-800'
    }
  ];

  // 1. EMPTY STATE: When no trip plan has been created yet
  if (days.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 pb-20 text-center animate-in fade-in duration-200">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-sky-100 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/60 flex items-center justify-center text-sky-600 dark:text-sky-400 shadow-lg shadow-sky-500/10">
            <Compass className="w-12 h-12 stroke-[1.75]" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sẵn sàng cho chuyến đi mới</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-2">
          Bạn chưa có lịch trình nào
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mb-6 leading-relaxed bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
          Hãy để <strong className="text-sky-700 dark:text-sky-300">Trợ lý AI TripMate</strong> lên kế hoạch du lịch thông minh, tối ưu cung đường di chuyển và ước tính ngân sách cho nhóm chỉ trong vài giây!
        </p>

        <div className="w-full max-w-xs space-y-2.5">
          <button
            onClick={onOpenAiPlanner}
            className="w-full h-12 rounded-2xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-sky-700/25 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Lập lịch trình với AI</span>
          </button>

          {onOpenJoinTrip && (
            <button
              onClick={onOpenJoinTrip}
              className="w-full h-12 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-sm flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 active:scale-[0.98] transition-all cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Gia nhập bằng mã phòng</span>
            </button>
          )}

          {trips.length > 0 && onOpenTripManager && (
            <button
              onClick={onOpenTripManager}
              className="w-full h-10 rounded-xl text-sky-700 dark:text-sky-300 font-bold text-xs flex items-center justify-center gap-1.5 hover:underline transition-all cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Xem danh sách các chuyến đi của bạn ({trips.length})</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // Current day activities and day info
  const currentActivities = activities.filter((act) => act.dayNumber === selectedDay);
  const currentDay = days.find((d) => d.dayNumber === selectedDay);

  // Handle changing status
  const handleChangeStatus = (activity: TimelineActivity, statusItem: typeof availableStatuses[0]) => {
    onUpdateActivityStatus?.(activity.id, statusItem.type, statusItem.text);
    if (selectedActivityForDetails?.id === activity.id) {
      setSelectedActivityForDetails({
        ...selectedActivityForDetails,
        statusType: statusItem.type,
        statusText: statusItem.text,
      });
    }
    setActivityStatusMenu(null);
  };

  // Open interactive map modal
  const handleOpenInteractiveMap = (stopIndex = 0) => {
    setSelectedMapStopIndex(stopIndex);
    setShowInteractiveMapModal(true);
  };

  return (
    <div className="flex flex-col w-full pb-28 animate-in fade-in duration-200">
      {/* 0. Streamlined Mini Trip Switcher (Only if multiple trips exist) */}
      {trips.length > 1 && (
        <div className="flex items-center justify-between gap-2 mb-3 px-0.5">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 flex-1">
            {trips.map((t) => {
              const isCurrent = t.id === currentTripId;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onSelectTrip?.(t.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0 active:scale-95 ${
                    isCurrent
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-amber-300' : 'bg-slate-400'}`} />
                  <span className="truncate max-w-[120px]">{t.destination}</span>
                  {isCurrent && <Check className="w-3 h-3 text-white ml-0.5" />}
                </button>
              );
            })}
          </div>

          {onOpenTripManager && (
            <button
              type="button"
              onClick={onOpenTripManager}
              className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-0.5 flex-shrink-0 cursor-pointer ml-1 py-1"
              title="Xem danh sách tất cả chuyến đi"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Các chuyến ({trips.length})</span>
            </button>
          )}
        </div>
      )}

      {/* Trip Cover Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white mb-4 shadow-sm group">
        <img
          src={
            tripCoverImage ||
            'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&auto=format&fit=crop&q=80'
          }
          alt={tripTitle || 'Trip'}
          className="w-full h-44 object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Top actions on banner */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/20">
            <Clock className="w-3.5 h-3.5" />
            <span>{tripDatesSummary || '3 ngày 2 đêm'}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {onOpenTripManager && trips.length > 0 && (
              <button
                type="button"
                onClick={onOpenTripManager}
                className="h-8 px-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center gap-1 text-white text-[11px] font-bold transition-colors cursor-pointer"
                title="Quản lý các chuyến đi"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Đổi chuyến</span>
              </button>
            )}
            {onResetTrip && (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-rose-500/80 backdrop-blur-md flex items-center justify-center text-white transition-colors cursor-pointer"
                title="Xóa lịch trình hiện tại"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={onOpenInviteModal}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors cursor-pointer"
              title="Thêm thành viên"
            >
              <UserPlus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Banner Details */}
        <div className="absolute bottom-3 left-3.5 right-3.5 z-10">
          <h2 className="text-base sm:text-lg font-black tracking-tight text-white mb-0.5 line-clamp-1 drop-shadow">
            {tripTitle || 'Lịch trình du lịch'}
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-xs text-sky-200 font-semibold drop-shadow flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              {currentActivities[0]?.location || 'Việt Nam'}
            </span>
            <div className="flex -space-x-1.5 overflow-hidden">
              {members.map((m) => (
                <div
                  key={m.id}
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-900 bg-sky-600 text-[10px] font-bold text-white text-center leading-6"
                  title={m.name}
                >
                  {m.initials}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Smart Summary Card */}
      {aiSummary && (
        <div className="mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 border border-sky-100 dark:border-slate-700 flex items-start gap-3 shadow-xs">
          <div className="p-2 rounded-xl bg-sky-600 text-white flex-shrink-0 mt-0.5 shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-sky-800 dark:text-sky-300">
                Gợi ý thông minh từ Trợ lý AI
              </span>
              <button
                onClick={onOptimizeRoute}
                className="text-[11px] font-bold text-sky-600 hover:text-sky-700 dark:text-cyan-400 flex items-center gap-1"
              >
                <Shuffle className="w-3 h-3" />
                <span>Tối ưu cung đường</span>
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {aiSummary}
            </p>
          </div>
        </div>
      )}

      {/* Day Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-1 mb-5">
        {days.map((day) => {
          const isSelected = selectedDay === day.dayNumber;
          return (
            <button
              key={day.dayNumber}
              type="button"
              onClick={() => onSelectDay(day.dayNumber)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex-shrink-0 flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                isSelected
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25 scale-[1.02]'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 hover:border-sky-300 dark:hover:border-slate-600'
              }`}
            >
              <span>Ngày {day.dayNumber}</span>
              {day.displayDate && (
                <span className={`text-[11px] font-semibold ${
                  isSelected ? 'text-sky-100' : 'text-slate-400 dark:text-slate-400'
                }`}>
                  • {day.displayDate}
                </span>
              )}
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}
              >
                {activities.filter((a) => a.dayNumber === day.dayNumber).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Timeline Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <span>Lịch trình Ngày {selectedDay}</span>
              {currentDay?.displayDate && (
                <span className="text-xs font-bold text-sky-700 dark:text-sky-400">
                  • {currentDay.displayDate}
                </span>
              )}
              <span className="text-xs font-normal text-slate-400">
                ({currentActivities.length} hoạt động)
              </span>
            </h3>
            {currentDay?.title && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                {currentDay.title}
              </p>
            )}
          </div>
          <button
            onClick={() => handleOpenInteractiveMap(0)}
            className="text-xs font-bold text-sky-600 hover:text-sky-700 dark:text-sky-400 flex items-center gap-1"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Mở bản đồ</span>
          </button>
        </div>

        {currentActivities.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500 mb-3">Chưa có hoạt động nào trong Ngày {selectedDay}.</p>
            <button
              onClick={onAddActivity}
              className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold"
            >
              Thêm hoạt động đầu tiên
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {currentActivities.map((act, index) => {
              const statusCfg = availableStatuses.find((s) => s.type === act.statusType) || availableStatuses[0];

              return (
                <div
                  key={act.id}
                  className="bg-white dark:bg-slate-800/90 rounded-2xl p-3.5 border border-slate-200/90 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded-lg flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {act.time}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {act.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Status Badge - CLICKABLE to adjust status quickly */}
                      <button
                        type="button"
                        onClick={() => setActivityStatusMenu(act)}
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border transition-transform hover:scale-105 active:scale-95 ${statusCfg.badgeClass}`}
                        title="Chạm để thay đổi trạng thái"
                      >
                        {act.statusType === 'transport' && <Car className="w-3 h-3" />}
                        {act.statusType === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                        {act.statusType === 'approved' && <Check className="w-3 h-3" />}
                        <span>{act.statusText}</span>
                      </button>

                      {/* 3-DOTS BUTTON (USER EXPLICITLY REQUESTED) */}
                      <button
                        onClick={() => setActivityStatusMenu(act)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        title="Tùy chọn hoạt động & đổi trạng thái"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Main Body */}
                  <div className="flex gap-3 items-start">
                    {act.imageUrl ? (
                      <img
                        src={act.imageUrl}
                        alt={act.title}
                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0 shadow-sm"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 text-slate-500">
                        <MapPin className="w-5 h-5 text-sky-600" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 line-clamp-1">
                        {act.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 flex-shrink-0 text-slate-400" />
                        {act.location}
                      </p>

                      {act.costText && (
                        <p className="text-[11px] font-bold text-sky-600 dark:text-sky-400 mt-1">
                          Chi phí: {act.costText}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Quick Link */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between text-xs">
                    <button
                      onClick={() => handleOpenInteractiveMap(index)}
                      className="text-[11px] font-bold text-sky-600 hover:text-sky-700 dark:text-cyan-400 flex items-center gap-1"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>Xem trên bản đồ</span>
                    </button>

                    <button
                      onClick={() => setSelectedActivityForDetails(act)}
                      className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-semibold"
                    >
                      Chi tiết & Ghi chú →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Map Section Preview (CLICK TO OPEN INTERACTIVE MAP) */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
            Bản đồ di chuyển ngày {selectedDay}
          </h3>
          <button
            onClick={() => handleOpenInteractiveMap(0)}
            className="text-xs font-bold text-sky-600 hover:text-sky-700 dark:text-sky-400 flex items-center gap-1"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Xem toàn màn hình</span>
          </button>
        </div>

        {/* Clickable Map Preview Card */}
        <div
          onClick={() => handleOpenInteractiveMap(0)}
          className="relative w-full h-44 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700 shadow-sm cursor-pointer group"
          title="Chạm để mở bản đồ tương tác"
        >
          <div className="absolute inset-0 bg-sky-50 dark:bg-slate-800 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:16px_16px] opacity-70 group-hover:opacity-90 transition-opacity" />

          {/* Illustrated route svg */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
            <path
              d="M 50 120 Q 140 40 220 90 T 360 40"
              fill="none"
              stroke="#0284c7"
              strokeWidth="4"
              strokeDasharray="6,6"
              className="animate-pulse"
            />
            <circle cx="50" cy="120" r="8" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
            <circle cx="180" cy="70" r="10" fill="#f97316" stroke="#ffffff" strokeWidth="2" />
            <circle cx="360" cy="40" r="8" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
          </svg>

          {/* Points labels */}
          <div className="absolute left-6 bottom-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow">
            {currentActivities[0]?.title || 'Điểm xuất phát'}
          </div>
          {currentActivities[1] && (
            <div className="absolute left-1/3 top-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-orange-600 shadow">
              {currentActivities[1].title}
            </div>
          )}
          {currentActivities[2] && (
            <div className="absolute right-6 top-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-emerald-600 shadow">
              {currentActivities[2].title}
            </div>
          )}

          {/* Route Distance Banner */}
          <div className="absolute bottom-3 left-3 right-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl p-2.5 flex items-center justify-between border border-slate-200 dark:border-slate-800 shadow-md">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-900/50 text-sky-600 flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {currentActivities.length} điểm dừng • Khoảng 32.4 km
              </span>
            </div>
            <span className="text-[11px] text-sky-600 dark:text-cyan-400 font-semibold flex items-center gap-0.5">
              Chạm xem chi tiết <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="flex items-center gap-2 pt-2">
        <button
          onClick={onAddActivity}
          className="flex-1 h-13 rounded-2xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-700/20 active:scale-[0.98] transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Thêm hoạt động mới</span>
        </button>

        <button
          onClick={onOpenAiPlanner}
          title="Tùy biến lịch trình"
          className="w-13 h-13 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all flex-shrink-0"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* STATUS EDITING MODAL (USER REQUESTED: nút 3 chấm cho chỉnh trạng thái của từng mốc thời gian) */}
      {activityStatusMenu && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col animate-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <div className="min-w-0 pr-2">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 truncate">
                  Chỉnh trạng thái hoạt động
                </h3>
                <p className="text-[11px] text-slate-400 truncate">
                  {activityStatusMenu.time} • {activityStatusMenu.title}
                </p>
              </div>
              <button
                onClick={() => setActivityStatusMenu(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-200 flex items-center justify-center flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
              Chọn trạng thái tiến độ mới cho mốc thời gian này:
            </p>

            {/* Status list */}
            <div className="space-y-2 mb-4 max-h-64 overflow-y-auto pr-1">
              {availableStatuses.map((st) => {
                const isCurrent = activityStatusMenu.statusType === st.type;
                return (
                  <button
                    key={st.type}
                    onClick={() => handleChangeStatus(activityStatusMenu, st)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isCurrent
                        ? 'border-sky-500 bg-sky-50/80 dark:bg-sky-950/50 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-md border ${st.badgeClass}`}
                        >
                          {st.text}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] text-sky-600 dark:text-sky-400 font-bold">
                            (Hiện tại)
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">{st.description}</p>
                    </div>

                    {isCurrent ? (
                      <Check className="w-4 h-4 text-sky-600 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Extra quick actions */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  const act = activityStatusMenu;
                  setActivityStatusMenu(null);
                  setSelectedActivityForDetails(act);
                }}
                className="w-full h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Xem chi tiết & ghi chú</span>
              </button>

              {onDeleteActivity && (
                <button
                  onClick={() => {
                    if (window.confirm(`Xóa hoạt động "${activityStatusMenu.title}"?`)) {
                      onDeleteActivity(activityStatusMenu.id);
                      setActivityStatusMenu(null);
                    }
                  }}
                  className="w-full h-9 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa hoạt động này</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN INTERACTIVE MAP MODAL (USER REQUESTED: bản đồ tương tác khi xem chi tiết) */}
      {showInteractiveMapModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="w-full h-full sm:h-[90vh] sm:max-w-2xl bg-white dark:bg-slate-900 sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in zoom-in-95">
            {/* Map Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/95 dark:bg-slate-900/95 border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 flex items-center justify-center">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100">
                    Bản đồ lộ trình tương tác: Ngày {selectedDay}
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    {currentActivities.length} điểm dừng • Cung đường tối ưu di chuyển
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowInteractiveMapModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-200 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Day Switcher in Map */}
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar flex-shrink-0">
              <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap">Chọn ngày:</span>
              {days.map((d) => (
                <button
                  key={d.dayNumber}
                  onClick={() => {
                    onSelectDay(d.dayNumber);
                    setSelectedMapStopIndex(0);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                    selectedDay === d.dayNumber
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                  }`}
                >
                  Ngày {d.dayNumber}
                </button>
              ))}
            </div>

            {/* Interactive Canvas/SVG Map Area */}
            <div className="relative flex-1 bg-slate-100 dark:bg-slate-950 overflow-hidden flex flex-col justify-between">
              {/* Map grid background */}
              <div
                className="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px] opacity-40 transition-transform duration-300"
                style={{ transform: `scale(${mapZoom})` }}
              />

              {/* Map Zoom Controls */}
              <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-1 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setMapZoom((z) => Math.min(2, z + 0.25))}
                  className="w-8 h-8 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-200"
                  title="Phóng to bản đồ"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setMapZoom((z) => Math.max(0.75, z - 0.25))}
                  className="w-8 h-8 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-200"
                  title="Thu nhỏ bản đồ"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setMapZoom(1)}
                  className="w-8 h-8 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-200"
                  title="Đặt lại mức zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Interactive Route SVG with click points */}
              <div
                className="relative w-full h-64 sm:h-80 flex items-center justify-center transition-transform duration-300"
                style={{ transform: `scale(${mapZoom})` }}
              >
                <svg className="w-full h-full p-4" viewBox="0 0 500 240">
                  {/* Connecting Route Line */}
                  <path
                    d="M 60 180 Q 180 50 260 130 T 440 60"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="5"
                    strokeDasharray="8,6"
                    className="animate-pulse"
                  />

                  {/* Dynamic interactive markers along the curve */}
                  {currentActivities.slice(0, 5).map((act, idx) => {
                    const positions = [
                      { cx: 60, cy: 180 },
                      { cx: 160, cy: 95 },
                      { cx: 260, cy: 130 },
                      { cx: 360, cy: 85 },
                      { cx: 440, cy: 60 },
                    ];
                    const pos = positions[idx] || positions[0];
                    const isSelected = selectedMapStopIndex === idx;

                    return (
                      <g
                        key={act.id}
                        onClick={() => setSelectedMapStopIndex(idx)}
                        className="cursor-pointer group"
                      >
                        {/* Glow halo when selected */}
                        {isSelected && (
                          <circle
                            cx={pos.cx}
                            cy={pos.cy}
                            r="24"
                            fill="#0284c7"
                            opacity="0.25"
                            className="animate-ping"
                          />
                        )}

                        <circle
                          cx={pos.cx}
                          cy={pos.cy}
                          r={isSelected ? 16 : 12}
                          fill={isSelected ? '#0284c7' : '#ffffff'}
                          stroke={isSelected ? '#ffffff' : '#0284c7'}
                          strokeWidth="3"
                          className="transition-all duration-200 shadow-lg"
                        />

                        <text
                          x={pos.cx}
                          y={pos.cy + 4}
                          textAnchor="middle"
                          fill={isSelected ? '#ffffff' : '#0284c7'}
                          fontSize="11"
                          fontWeight="bold"
                        >
                          {idx + 1}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* FLOATING SELECTED STOP CARD ON MAP */}
              {currentActivities[selectedMapStopIndex] && (
                <div className="p-3.5 m-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl z-20 animate-in slide-in-from-bottom-2">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-black text-xs flex items-center justify-center shadow">
                        {selectedMapStopIndex + 1}
                      </span>
                      <div>
                        <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 block">
                          Chặng {selectedMapStopIndex + 1} • {currentActivities[selectedMapStopIndex].time}
                        </span>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-slate-100 line-clamp-1">
                          {currentActivities[selectedMapStopIndex].title}
                        </h4>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 flex-shrink-0">
                      {currentActivities[selectedMapStopIndex].statusText}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-2.5 truncate">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                    {currentActivities[selectedMapStopIndex].location}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        currentActivities[selectedMapStopIndex].title +
                          ' ' +
                          currentActivities[selectedMapStopIndex].location
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Chỉ đường Google Maps</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Waypoints Sequence List (Bottom Tray) */}
            <div className="max-h-44 overflow-y-auto p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex-shrink-0 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                Danh sách các điểm dừng liên tiếp:
              </span>
              {currentActivities.map((act, idx) => (
                <div
                  key={act.id}
                  onClick={() => setSelectedMapStopIndex(idx)}
                  className={`p-2 rounded-xl flex items-center justify-between text-xs cursor-pointer transition-colors ${
                    selectedMapStopIndex === idx
                      ? 'bg-sky-50 dark:bg-sky-950/60 border border-sky-300 dark:border-sky-800 font-bold'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="truncate">{act.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 flex-shrink-0 ml-2">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Activity Details Modal */}
      {selectedActivityForDetails && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col animate-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                {selectedActivityForDetails.category}
              </span>
              <button
                onClick={() => setSelectedActivityForDetails(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-200 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {selectedActivityForDetails.imageUrl && (
              <img
                src={selectedActivityForDetails.imageUrl}
                alt={selectedActivityForDetails.title}
                className="w-full h-36 rounded-2xl object-cover mb-3"
              />
            )}

            <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 mb-1">
              {selectedActivityForDetails.title}
            </h3>
            <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
              <MapPin className="w-3.5 h-3.5" />
              {selectedActivityForDetails.location}
            </p>

            {/* Current Status Box */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs mb-3">
              <div>
                <span className="text-[10px] text-slate-400 block">Trạng thái:</span>
                <span className="font-bold text-sky-600 dark:text-sky-400">
                  {selectedActivityForDetails.statusText}
                </span>
              </div>
              <button
                onClick={() => {
                  const act = selectedActivityForDetails;
                  setSelectedActivityForDetails(null);
                  setActivityStatusMenu(act);
                }}
                className="px-2.5 py-1 rounded-lg bg-sky-600 text-white font-bold text-xs"
              >
                Đổi trạng thái
              </button>
            </div>

            {selectedActivityForDetails.details && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 mb-4">
                <strong>Ghi chú:</strong> {selectedActivityForDetails.details}
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedActivityForDetails(null)}
                className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  handleOpenInteractiveMap(0);
                  setSelectedActivityForDetails(null);
                }}
                className="flex-1 py-3 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Xem bản đồ</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Itinerary Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-900 dark:text-slate-100 mb-1.5">
              Xác nhận xóa lịch trình?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
              Toàn bộ các ngày và hoạt động đã tạo sẽ được dọn sạch. Tab Lịch trình sẽ quay về trạng thái ban đầu để bạn sẵn sàng tạo chuyến đi mới bất kỳ lúc nào.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-750 transition-colors"
              >
                Giữ lại
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  onResetTrip?.();
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 active:scale-95 transition-all"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
