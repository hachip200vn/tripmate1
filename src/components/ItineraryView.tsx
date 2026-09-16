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
  Trash2
} from 'lucide-react';
import { TripDay, TimelineActivity, Member } from '../types';

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
  onOpenAiPlanner: () => void;
  onAddActivity: () => void;
  onOpenInviteModal: () => void;
  onVoteAgain: (activityTitle: string) => void;
  onOpenFullscreenMap: () => void;
  onOptimizeRoute: () => void;
  onResetTrip?: () => void;
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
  onOpenAiPlanner,
  onAddActivity,
  onOpenInviteModal,
  onVoteAgain,
  onOpenFullscreenMap,
  onOptimizeRoute,
  onResetTrip,
}) => {
  const [selectedActivityForDetails, setSelectedActivityForDetails] = useState<TimelineActivity | null>(null);
  const [shareToast, setShareToast] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // If no trip has been generated yet, render ONLY the "Lập lịch trình bằng AI" view
  if (!days || days.length === 0 || !activities || activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[68vh] px-4 text-center py-10">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-sky-500 via-sky-600 to-orange-400 p-0.5 shadow-xl shadow-sky-500/20 mb-6 flex items-center justify-center animate-bounce duration-1000">
          <div className="w-full h-full rounded-[22px] bg-white dark:bg-slate-900 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-sky-600 dark:text-sky-400" />
          </div>
        </div>

        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-2">
          Chưa có lịch trình chuyến đi
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-8 leading-relaxed">
          Hiện tại chưa có kế hoạch cụ thể. Hãy bấm nút bên dưới để AI ghi nhận các thông tin đầu vào và tự động tạo lịch trình hoàn chỉnh cho bạn!
        </p>

        <button
          onClick={onOpenAiPlanner}
          className="h-14 px-8 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-700 to-orange-500 hover:opacity-95 text-white font-extrabold text-sm sm:text-base flex items-center gap-3 shadow-xl shadow-sky-600/30 active:scale-95 transition-all"
        >
          <Sparkles className="w-5 h-5 text-amber-200" />
          <span>Lập lịch trình bằng AI</span>
        </button>
      </div>
    );
  }

  const currentActivities = activities.filter((a) => a.dayNumber === selectedDay);

  const handleShare = () => {
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2200);
  };

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Toast message */}
      {shareToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          Đã sao chép liên kết chuyến đi để chia sẻ!
        </div>
      )}

      {/* Hero Trip Card */}
      <div className="relative w-full overflow-hidden rounded-3xl shadow-md border border-slate-200/80 dark:border-slate-800 bg-slate-900 text-white mb-5">
        {/* Background photo */}
        <div className="absolute inset-0 bg-cover bg-center brightness-[0.72] contrast-[1.05]"
          style={{
            backgroundImage: `url('${tripCoverImage || 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&auto=format&fit=crop&q=80'}')`
          }}
        />
        {/* Ambient Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

        <div className="relative z-10 p-5 flex flex-col justify-between min-h-[260px]">
          {/* Top badge and action icons */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-600/90 backdrop-blur-md text-white text-xs font-bold shadow-sm tracking-wide">
              <span>✨</span> Lịch trình AI cá nhân hóa
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                title="Chia sẻ chuyến đi"
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={onAddActivity}
                title="Chỉnh sửa thông tin"
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-colors"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Title & Dates */}
          <div className="my-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
              {tripTitle || 'Chuyến đi Đà Nẵng – Hội An rực rỡ 🌊'}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-200 mt-1 flex items-center gap-1.5 drop-shadow">
              <span>📅</span> {tripDatesSummary || '15/04 – 18/04/2025 (4 ngày 3 đêm)'}
            </p>
          </div>

          {/* Members & Invite row */}
          <div className="pt-2 border-t border-white/15 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {members.slice(0, 3).map((m, idx) => (
                  <div
                    key={m.id}
                    title={m.name}
                    className={`w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white shadow-sm ${
                      idx === 0 ? 'bg-sky-600' : idx === 1 ? 'bg-orange-500' : 'bg-emerald-600'
                    }`}
                  >
                    {m.initials}
                  </div>
                ))}
                {members.length > 3 && (
                  <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-sky-200 text-sky-800 flex items-center justify-center text-[10px] font-bold">
                    +{members.length - 3}
                  </div>
                )}
              </div>
              <span className="text-xs font-medium text-slate-200">{members.length} thành viên</span>
            </div>

            <button
              onClick={onOpenInviteModal}
              className="px-3 py-1.5 rounded-xl bg-sky-500/90 hover:bg-sky-500 text-white text-xs font-bold backdrop-blur-md flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Mời bạn</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Summary Banner if present */}
      {aiSummary && (
        <div className="mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-sky-950/40 dark:to-indigo-950/30 border border-sky-200/80 dark:border-sky-800/60 flex items-start gap-3 shadow-sm">
          <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
            <Sparkles className="w-4 h-4 text-cyan-200" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-black text-sky-900 dark:text-sky-200 uppercase tracking-wider mb-0.5">
              Lời khuyên từ TripMate AI
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {aiSummary}
            </p>
          </div>
        </div>
      )}

      {/* AI Planner & Route Optimization CTAs */}
      <div className="grid grid-cols-2 gap-2.5 mb-2.5">
        <button
          onClick={onOpenAiPlanner}
          className="h-12 px-3 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-600/20 active:scale-[0.98] transition-all"
        >
          <Sparkles className="w-4 h-4 text-cyan-200" />
          <span>Lập lại lịch với AI</span>
        </button>

        <button
          onClick={onOptimizeRoute}
          className="h-12 px-3 rounded-2xl bg-sky-50 hover:bg-sky-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-sky-700 dark:text-sky-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-sky-200 dark:border-slate-700 active:scale-[0.98] transition-all"
        >
          <Shuffle className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span>Tối ưu tuyến</span>
        </button>
      </div>

      {/* Clear/Delete Itinerary Button */}
      <div className="mb-5">
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="w-full h-11 px-3 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-rose-200 dark:border-rose-900/50 active:scale-[0.98] transition-all shadow-xs"
        >
          <Trash2 className="w-4 h-4 text-rose-500" />
          <span>Xóa lịch trình</span>
        </button>
      </div>

      {/* Days Tabs Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
          Lịch trình các ngày
        </h2>
        <span className="text-xs font-bold text-sky-600 dark:text-sky-400">
          {currentActivities.length} điểm dừng
        </span>
      </div>

      {/* Horizontal Day Tabs */}
      <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2 mb-4">
        {days.map((day) => {
          const isSelected = selectedDay === day.dayNumber;
          return (
            <button
              key={day.dayNumber}
              onClick={() => onSelectDay(day.dayNumber)}
              className={`flex-shrink-0 min-w-[96px] py-3 px-3 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 border ${
                isSelected
                  ? 'bg-sky-700 text-white border-sky-700 shadow-md shadow-sky-700/25 scale-[1.02]'
                  : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? 'text-sky-200' : 'text-slate-400 dark:text-slate-400'}`}>
                NGÀY {day.dayNumber}
              </span>
              <span className="text-base font-black tracking-tight my-0.5">{day.displayDate}</span>
              <span className={`text-[11px] font-medium truncate max-w-[80px] ${isSelected ? 'text-sky-100' : 'text-slate-500 dark:text-slate-400'}`}>
                {day.title.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Today Weather & Confirmation Highlight */}
      <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-slate-800/90 border border-sky-100 dark:border-slate-700 flex items-center justify-between mb-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-sm">
            <SunMedium className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">
              Hôm nay: Khám phá Bà Nà Hills
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Thời tiết 29°C, nắng dịu không mưa
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-sky-100 dark:bg-slate-700 text-sky-700 dark:text-sky-300 text-[11px] font-bold">
          4/5 chốt
        </span>
      </div>

      {/* Timeline Section Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
          Dòng thời gian chi tiết
        </h3>
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          Tổng chi: <strong className="text-sky-600 dark:text-sky-400">~1.250.000đ/người</strong>
        </span>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 border-l-2 border-sky-200 dark:border-slate-700 space-y-4 mb-6 ml-2">
        {currentActivities.map((act, index) => {
          return (
            <div key={act.id} className="relative group">
              {/* Timeline Dot Node */}
              <div
                className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 shadow-sm ${
                  index === 1 ? 'bg-orange-500' : 'bg-sky-600'
                }`}
              />

              {/* Activity Card */}
              <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-4 border border-slate-200/90 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                {/* Header row: Time, Category, Status badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-xs text-sky-700 dark:text-sky-300 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {act.time}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {act.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        act.statusType === 'approved'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                          : act.statusType === 'booked'
                          ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400'
                          : act.statusType === 'transport'
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400'
                          : act.statusType === 'voted'
                          ? 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-400'
                          : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                      }`}
                    >
                      {act.statusType === 'transport' && <Car className="w-3 h-3" />}
                      {act.statusType === 'approved' && <CheckCircle2 className="w-3 h-3" />}
                      {act.statusText}
                    </span>

                    <button
                      onClick={() => setSelectedActivityForDetails(act)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Main Body */}
                <div className="flex gap-3 items-start">
                  {/* Icon or Thumbnail */}
                  {act.imageUrl ? (
                    <img
                      src={act.imageUrl}
                      alt={act.title}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0 shadow-sm"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-slate-700 flex items-center justify-center text-sky-600 dark:text-sky-400 flex-shrink-0">
                      {act.iconType === 'food' && <Utensils className="w-6 h-6" />}
                      {act.iconType === 'dining' && <Utensils className="w-6 h-6" />}
                      {act.iconType === 'beach' && <Waves className="w-6 h-6" />}
                      {act.iconType === 'night' && <Moon className="w-6 h-6" />}
                      {act.iconType === 'transport' && <Car className="w-6 h-6" />}
                      {act.iconType === 'landmark' && <Compass className="w-6 h-6" />}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
                      {act.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                      <MapPin className="w-3 h-3 flex-shrink-0 text-slate-400" />
                      {act.location}
                    </p>

                    {act.driverInfo && (
                      <p className="text-[11px] text-sky-700 dark:text-sky-300 font-medium mt-1 bg-sky-50 dark:bg-slate-700/50 p-1.5 rounded-lg">
                        {act.driverInfo}
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer notes and Price tags */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium">
                    {act.costText && (
                      <span className="font-bold text-sky-700 dark:text-sky-300">
                        {act.costText}
                      </span>
                    )}
                    {act.note && (
                      <span className="text-[11px] text-orange-600 dark:text-orange-400">
                        • {act.note}
                      </span>
                    )}
                  </div>

                  {act.voteStats ? (
                    <button
                      onClick={() => onVoteAgain(act.title)}
                      className="text-xs font-bold text-sky-600 hover:text-sky-700 dark:text-cyan-400 flex items-center gap-1"
                    >
                      <span>{act.voteStats}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : act.pricePerPerson ? (
                    <span className="text-[11px] text-slate-400">
                      ~{(act.pricePerPerson / 1000).toFixed(0)}k/người
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Map Section matching image */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
            Bản đồ di chuyển ngày {selectedDay}
          </h3>
          <button
            onClick={onOpenFullscreenMap}
            className="text-xs font-bold text-sky-600 hover:text-sky-700 dark:text-sky-400 flex items-center gap-1"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Xem toàn màn hình</span>
          </button>
        </div>

        {/* Interactive Map Visual Mock with Real coordinates feel */}
        <div
          onClick={onOpenFullscreenMap}
          className="relative w-full h-44 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700 shadow-sm cursor-pointer group"
        >
          {/* Map canvas graphic with roads & pin points */}
          <div className="absolute inset-0 bg-sky-50 dark:bg-slate-800 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
          
          {/* Illustrated route svg */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
            {/* Curved Path */}
            <path
              d="M 50 120 Q 140 40 220 90 T 360 40"
              fill="none"
              stroke="#0284c7"
              strokeWidth="4"
              strokeDasharray="6,6"
              className="animate-pulse"
            />
            {/* Markers */}
            <circle cx="50" cy="120" r="8" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
            <circle cx="180" cy="70" r="10" fill="#f97316" stroke="#ffffff" strokeWidth="2" />
            <circle cx="360" cy="40" r="8" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
          </svg>

          {/* Points labels */}
          <div className="absolute left-6 bottom-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow">
            Khách sạn Mỹ Khê
          </div>
          <div className="absolute left-1/3 top-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-orange-600 shadow">
            Cáp treo Bà Nà Hills
          </div>
          <div className="absolute right-6 top-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-emerald-600 shadow">
            Phố cổ Hội An
          </div>

          {/* Route Distance Banner */}
          <div className="absolute bottom-3 left-3 right-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl p-2.5 flex items-center justify-between border border-slate-200 dark:border-slate-800 shadow-md">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-900/50 text-sky-600 flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                32.4 km • Khoảng 1h15p di chuyển
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

      {/* Bottom Clear Itinerary Action */}
      <div className="mt-4 mb-2 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-center">
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="w-full py-3 rounded-2xl bg-rose-50/80 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center justify-center gap-2 border border-rose-200/90 dark:border-rose-900/40 transition-all active:scale-[0.99]"
        >
          <Trash2 className="w-4 h-4 text-rose-500" />
          <span>Xóa toàn bộ lịch trình này</span>
        </button>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5">
          Khôi phục về trạng thái ban đầu để tạo kế hoạch mới bằng AI
        </p>
      </div>

      {/* Activity Details Popup */}
      {selectedActivityForDetails && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300">
                {selectedActivityForDetails.category}
              </span>
              <button
                onClick={() => setSelectedActivityForDetails(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-300"
              >
                ✕
              </button>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
              {selectedActivityForDetails.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-4">
              <MapPin className="w-3.5 h-3.5 text-sky-600" />
              {selectedActivityForDetails.location}
            </p>

            {selectedActivityForDetails.imageUrl && (
              <img
                src={selectedActivityForDetails.imageUrl}
                alt={selectedActivityForDetails.title}
                className="w-full h-44 object-cover rounded-2xl mb-4 shadow"
              />
            )}

            <div className="space-y-2.5 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl text-xs mb-4">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Thời gian bắt đầu:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{selectedActivityForDetails.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Trạng thái xác nhận:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{selectedActivityForDetails.statusText}</span>
              </div>
              {selectedActivityForDetails.costText && (
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Chi phí dự toán:</span>
                  <span className="font-bold text-sky-600 dark:text-sky-400">{selectedActivityForDetails.costText}</span>
                </div>
              )}
              {selectedActivityForDetails.details && (
                <p className="text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-700">
                  {selectedActivityForDetails.details}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedActivityForDetails(null)}
                className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  setSelectedActivityForDetails(null);
                  onAddActivity();
                }}
                className="flex-1 py-3 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs shadow-md"
              >
                Chỉnh sửa hoạt động
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
