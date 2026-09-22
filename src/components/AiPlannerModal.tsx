import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  X,
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Wallet,
  Compass,
  Sliders,
  Check,
  PlaneTakeoff,
  PlaneLanding,
  MessageSquarePlus,
  Loader2,
  Search,
  Map,
  Navigation,
  AlertCircle
} from 'lucide-react';
import { TripPlanData } from '../types';
import { generatePrototypeTripPlan } from '../data/tripData';
import { searchDestinations, DestinationItem, POPULAR_DESTINATIONS } from '../data/vietnamDestinations';

interface AiPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyGeneratedPlan: (plan: TripPlanData) => void;
}

export const AiPlannerModal: React.FC<AiPlannerModalProps> = ({
  isOpen,
  onClose,
  onApplyGeneratedPlan,
}) => {
  if (!isOpen) return null;

  const [destination, setDestination] = useState('Đà Nẵng — Hội An');
  const [isDestDropdownOpen, setIsDestDropdownOpen] = useState(false);
  const destContainerRef = useRef<HTMLDivElement>(null);

  const [startDate, setStartDate] = useState('2025-04-15');
  const [endDate, setEndDate] = useState('2025-04-18');
  const [membersCount, setMembersCount] = useState(5);
  const [budgetTier, setBudgetTier] = useState<'budget' | 'standard' | 'luxury'>('standard');
  const [selectedVibes, setSelectedVibes] = useState<string[]>([
    'Nghỉ dưỡng & Biển',
    'Sống ảo & Check-in',
    'Food tour ẩm thực',
  ]);
  const [pace, setPace] = useState<'relaxed' | 'balanced' | 'packed'>('balanced');
  const [notes, setNotes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Close destination dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (destContainerRef.current && !destContainerRef.current.contains(event.target as Node)) {
        setIsDestDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  const handleClose = () => {
    timersRef.current.forEach(clearTimeout);
    setIsGenerating(false);
    setGenerationStep('');
    onClose();
  };

  const destinationChips = [
    'Đà Nẵng — Hội An',
    'Hà Nội',
    'Hà Giang',
    'Phú Quốc',
    'Đà Lạt',
    'Sa Pa',
    'Nha Trang',
    'Huế'
  ];

  // Destination autocomplete suggestions
  const suggestedDestinations: DestinationItem[] = React.useMemo(() => {
    if (!destination.trim()) {
      return POPULAR_DESTINATIONS;
    }
    const results = searchDestinations(destination);
    return results.length > 0 ? results : POPULAR_DESTINATIONS.slice(0, 6);
  }, [destination]);

  const allVibes = [
    { label: 'Nghỉ dưỡng & Biển', emoji: '⛱️' },
    { label: 'Sống ảo & Check-in', emoji: '📸' },
    { label: 'Food tour ẩm thực', emoji: '🍲' },
    { label: 'Khám phá & Trekking', emoji: '🥾' },
    { label: 'Văn hóa & Lịch sử', emoji: '🏛️' },
    { label: 'Cafe & Thư giãn', emoji: '☕' },
    { label: 'Nightlife & Bar', emoji: '🎉' },
  ];

  const toggleVibe = (vibe: string) => {
    setSelectedVibes((prev) =>
      prev.includes(vibe) ? prev.filter((v) => v !== vibe) : [...prev, vibe]
    );
  };

  // Date helper functions
  const formatVietnameseDate = (isoStr: string): string => {
    if (!isoStr) return '';
    const [y, m, d] = isoStr.split('-').map(Number);
    if (!y || !m || !d) return isoStr;
    const dateObj = new Date(y, m - 1, d);
    const weekdays = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    const dayName = weekdays[dateObj.getDay()];
    const dd = String(d).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
    return `${dayName}, ${dd}/${mm}/${y}`;
  };

  const formatShortDate = (isoStr: string): string => {
    if (!isoStr) return '';
    const [y, m, d] = isoStr.split('-').map(Number);
    if (!y || !m || !d) return isoStr;
    const dd = String(d).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
    return `${dd}/${mm}/${y}`;
  };

  const isDateReversed = useMemo(() => {
    if (!startDate || !endDate) return false;
    return startDate > endDate;
  }, [startDate, endDate]);

  const durationInfo = useMemo(() => {
    if (!startDate || !endDate) {
      return { isValid: false, isReversed: false, label: 'Chưa chọn đủ ngày', diffDays: 0, nights: 0 };
    }
    const [sy, sm, sd] = startDate.split('-').map(Number);
    const [ey, em, ed] = endDate.split('-').map(Number);
    const s = new Date(sy, sm - 1, sd);
    const e = new Date(ey, em - 1, ed);

    if (s.getTime() > e.getTime()) {
      return {
        isValid: false,
        isReversed: true,
        label: 'Ngày không hợp lệ',
        diffDays: 0,
        nights: 0,
      };
    }

    const diffTime = e.getTime() - s.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const nights = Math.max(0, diffDays - 1);
    const label = diffDays === 1 ? '1 ngày (đi trong ngày)' : `${diffDays} ngày ${nights} đêm`;

    return {
      isValid: true,
      isReversed: false,
      label,
      diffDays,
      nights,
    };
  }, [startDate, endDate]);

  const handleGenerate = () => {
    // Validate that departure date is not greater than return date
    if (isDateReversed) {
      setErrorMsg('Lỗi: Ngày đi không được lớn hơn ngày về! Vui lòng chọn ngày về muộn hơn hoặc trùng với ngày đi.');
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);
    setGenerationStep('Đang kích hoạt TripMate AI Core Engine...');

    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    const t1 = setTimeout(() => {
      setGenerationStep(`Đang phân tích điểm đến ${destination || 'du lịch'} & tối ưu cung đường...`);
    }, 850);

    const t2 = setTimeout(() => {
      setGenerationStep('Đang tính toán mốc giờ vàng, ẩm thực địa phương & chi phí nhóm...');
    }, 1850);

    const t3 = setTimeout(() => {
      setGenerationStep('Đang hoàn thiện các thẻ hoạt động & mẹo du lịch thông minh...');
    }, 2850);

    const t4 = setTimeout(() => {
      try {
        const budgetLabel =
          budgetTier === 'budget'
            ? 'Tiết kiệm (~2-3tr/người)'
            : budgetTier === 'standard'
            ? 'Tiêu chuẩn (~4-5tr/người)'
            : 'Sang chảnh (>8tr/người)';

        const plan = generatePrototypeTripPlan({
          destination,
          startDate,
          endDate,
          membersCount,
          budget: budgetLabel,
          vibes: selectedVibes,
          pace,
          notes,
        });

        onApplyGeneratedPlan(plan);
        setIsGenerating(false);
        setGenerationStep('');
        onClose();
      } catch (err) {
        console.error('Lỗi khi tạo lịch trình:', err);
        setErrorMsg('Đã có sự cố khi tạo lịch trình. Vui lòng bấm thử lại!');
        setIsGenerating(false);
        setGenerationStep('');
      }
    }, 3600);

    timersRef.current = [t1, t2, t3, t4];
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" />
              TripMate AI Smart Engine V2.4
            </span>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
              Lập kế hoạch du lịch bằng <span className="text-sky-600 dark:text-sky-400">Trí tuệ nhân tạo</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Chỉ mất vài giây để AI gợi ý lịch trình cá nhân hóa hoàn hảo cho chuyến đi của bạn.
            </p>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-300 flex items-center justify-center flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* 1. Destination with Google Maps & 63 Vietnam Provinces Autocomplete */}
          <div
            ref={destContainerRef}
            className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 relative"
          >
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-600" />
                Điểm đến bạn muốn tới
              </label>
              <div className="flex items-center gap-1 text-[10px] font-bold text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-950/60 px-2 py-0.5 rounded-full border border-sky-200 dark:border-sky-800/60">
                <Map className="w-3 h-3 text-sky-600" />
                <span>Bản đồ 63 tỉnh thành</span>
              </div>
            </div>

            <div className="relative mb-2">
              <input
                type="text"
                value={destination}
                onFocus={() => setIsDestDropdownOpen(true)}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setIsDestDropdownOpen(true);
                }}
                placeholder="Nhập tên tỉnh thành (Ví dụ: H → Hà Nội, Hà Giang...)"
                className="w-full h-11 pl-9 pr-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-800 dark:text-slate-100 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all shadow-sm"
              />
              <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
              {destination && (
                <button
                  type="button"
                  onClick={() => {
                    setDestination('');
                    setIsDestDropdownOpen(true);
                  }}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 w-5 h-5 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  ✕
                </button>
              )}

              {/* Autocomplete Dropdown Menu */}
              {isDestDropdownOpen && (
                <div className="absolute left-0 right-0 top-12 z-50 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden max-h-72 flex flex-col animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Navigation className="w-3 h-3 text-sky-600" />
                      {destination.trim()
                        ? `Gợi ý phù hợp "${destination}" (${suggestedDestinations.length})`
                        : 'Địa điểm nổi bật phổ biến tại Việt Nam'}
                    </span>
                    <span className="text-[10px] text-slate-400">Nhấp để chọn</span>
                  </div>

                  <div className="overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                    {suggestedDestinations.map((item) => {
                      const regionColor =
                        item.region === 'Miền Bắc'
                          ? 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800/50'
                          : item.region === 'Miền Trung'
                          ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/50'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/50';

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setDestination(item.name);
                            setIsDestDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 hover:bg-sky-50/70 dark:hover:bg-slate-800 transition-colors flex items-start gap-2.5 ${
                            destination.toLowerCase() === item.name.toLowerCase()
                              ? 'bg-sky-50/50 dark:bg-slate-800/50'
                              : ''
                          }`}
                        >
                          <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <MapPin className="w-4 h-4" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                                {item.name}
                              </span>
                              <span
                                className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${regionColor}`}
                              >
                                {item.region}
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {item.tag || item.description}
                            </p>

                            {item.popularSpots && item.popularSpots.length > 0 && (
                              <div className="flex items-center gap-1 mt-1 flex-wrap">
                                {item.popularSpots.slice(0, 3).map((spot, idx) => (
                                  <span
                                    key={idx}
                                    className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded font-medium"
                                  >
                                    📍 {spot}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}

                    {destination.trim() && (
                      <button
                        type="button"
                        onClick={() => setIsDestDropdownOpen(false)}
                        className="w-full text-left px-3 py-2 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300 flex items-center justify-between"
                      >
                        <span>
                          Sử dụng điểm đến tùy chọn: <strong>&ldquo;{destination}&rdquo;</strong>
                        </span>
                        <span className="text-sky-600 dark:text-sky-400 font-bold text-[10px]">
                          Xác nhận ↵
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Chips for Popular Destinations */}
            <div className="flex gap-1.5 flex-wrap">
              {destinationChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => {
                    setDestination(chip);
                    setIsDestDropdownOpen(false);
                  }}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                    destination === chip
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-sky-300'
                  }`}
                >
                  {destination === chip && '✨ '}
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Dates */}
          <div className={`p-3.5 rounded-2xl border transition-colors ${
            isDateReversed
              ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900'
              : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-sky-600" />
                Thời gian chuyến đi
              </label>
              {isDateReversed ? (
                <span className="text-[10px] font-extrabold text-rose-700 bg-rose-100 dark:bg-rose-950/80 px-2 py-0.5 rounded-full flex items-center gap-1 border border-rose-200 dark:border-rose-800">
                  <AlertCircle className="w-3 h-3 text-rose-600" />
                  Ngày không hợp lệ
                </span>
              ) : (
                <span className="text-[10px] font-bold text-orange-700 bg-orange-100 dark:bg-orange-950/60 px-2 py-0.5 rounded-full">
                  {durationInfo.label}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className={`p-2.5 rounded-xl border bg-white dark:bg-slate-900 transition-colors ${
                isDateReversed ? 'border-rose-300 dark:border-rose-800 ring-1 ring-rose-400/40' : 'border-slate-200 dark:border-slate-700'
              }`}>
                <span className="text-[10px] text-slate-400 flex items-center gap-1 font-semibold">
                  <PlaneTakeoff className="w-3 h-3 text-sky-600" /> Ngày đi
                </span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  className="w-full bg-transparent font-black text-xs text-slate-800 dark:text-slate-100 outline-none mt-1"
                />
                <div className="mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
                  {formatVietnameseDate(startDate)}
                </div>
              </div>

              <div className={`p-2.5 rounded-xl border bg-white dark:bg-slate-900 transition-colors ${
                isDateReversed ? 'border-rose-300 dark:border-rose-800 ring-1 ring-rose-400/40' : 'border-slate-200 dark:border-slate-700'
              }`}>
                <span className="text-[10px] text-slate-400 flex items-center gap-1 font-semibold">
                  <PlaneLanding className="w-3 h-3 text-orange-500" /> Ngày về
                </span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  className="w-full bg-transparent font-black text-xs text-slate-800 dark:text-slate-100 outline-none mt-1"
                />
                <div className="mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
                  {formatVietnameseDate(endDate)}
                </div>
              </div>
            </div>

            {/* Error banner when start date > end date */}
            {isDateReversed && (
              <div className="mt-2.5 p-2.5 rounded-xl bg-rose-100/90 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-semibold flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
                <div>
                  <p className="font-extrabold text-xs text-rose-700 dark:text-rose-300">Lỗi: Ngày đi không được lớn hơn ngày về!</p>
                  <p className="text-[11px] font-normal text-rose-700/90 dark:text-rose-300/90 mt-0.5">
                    Ngày đi ({formatShortDate(startDate)}) đang sau ngày về ({formatShortDate(endDate)}). Vui lòng chọn lại ngày về muộn hơn hoặc trùng với ngày đi.
                  </p>
                </div>
              </div>
            )}

            {/* Formatted Date Confirmation Bar */}
            {!isDateReversed && startDate && endDate && (
              <div className="mt-2.5 p-2 rounded-xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/40 flex items-center justify-between text-xs animate-in fade-in">
                <span className="text-slate-500 dark:text-slate-400 text-[11px] flex items-center gap-1 font-medium">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Khoảng thời gian chuẩn:
                </span>
                <span className="font-extrabold text-sky-800 dark:text-sky-300 text-[11px]">
                  {formatShortDate(startDate)} → {formatShortDate(endDate)} ({durationInfo.label})
                </span>
              </div>
            )}
          </div>

          {/* 3. Members Count */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-2">
              <Users className="w-4 h-4 text-sky-600" />
              Thành viên tham gia
            </label>

            <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-slate-800 text-sky-700 dark:text-sky-300 font-black text-base flex items-center justify-center">
                  {membersCount}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">
                    {membersCount} người
                  </span>
                  <span className="text-[10px] text-slate-400">Nhóm bạn thân</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMembersCount(Math.max(1, membersCount - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-200 flex items-center justify-center"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => setMembersCount(membersCount + 1)}
                  className="w-8 h-8 rounded-lg bg-sky-600 text-white font-bold hover:bg-sky-700 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* 4. Budget */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Wallet className="w-4 h-4 text-sky-600" />
                Ngân sách dự kiến
              </label>
              <span className="text-xs font-black text-sky-700 dark:text-sky-300">
                {budgetTier === 'budget' ? '2.500.000 đ' : budgetTier === 'standard' ? '4.500.000 đ' : '8.500.000 đ'}/người
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => setBudgetTier('budget')}
                className={`p-2 rounded-xl text-center border transition-all ${
                  budgetTier === 'budget'
                    ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="block text-[11px] font-bold">Tiết kiệm</span>
                <span className="block text-[9px] opacity-80">~2-3tr/người</span>
              </button>

              <button
                type="button"
                onClick={() => setBudgetTier('standard')}
                className={`p-2 rounded-xl text-center border transition-all ${
                  budgetTier === 'standard'
                    ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="block text-[11px] font-bold">Tiêu chuẩn</span>
                <span className="block text-[9px] opacity-80">~4-5tr/người</span>
              </button>

              <button
                type="button"
                onClick={() => setBudgetTier('luxury')}
                className={`p-2 rounded-xl text-center border transition-all ${
                  budgetTier === 'luxury'
                    ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="block text-[11px] font-bold">Sang chảnh</span>
                <span className="block text-[9px] opacity-80">&gt;8tr/người</span>
              </button>
            </div>
          </div>

          {/* 5. Vibe Tags */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-sky-600" />
                Phong cách du lịch & Vibe
              </label>
              <span className="text-[10px] text-slate-400">Chọn nhiều tag</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {allVibes.map((item) => {
                const isSelected = selectedVibes.includes(item.label);
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => toggleVibe(item.label)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-sky-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <span>{item.emoji}</span>
                    <span>{item.label}</span>
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6. Trip Pace */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-2">
              <Sliders className="w-4 h-4 text-sky-600" />
              Nhịp độ chuyến đi
            </label>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPace('relaxed')}
                className={`py-2 px-1 rounded-xl text-center border text-xs font-bold transition-all ${
                  pace === 'relaxed'
                    ? 'bg-sky-600 text-white border-sky-600'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                🌿 Thư thái
              </button>
              <button
                type="button"
                onClick={() => setPace('balanced')}
                className={`py-2 px-1 rounded-xl text-center border text-xs font-bold transition-all ${
                  pace === 'balanced'
                    ? 'bg-sky-600 text-white border-sky-600'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                ⚖️ Cân bằng
              </button>
              <button
                type="button"
                onClick={() => setPace('packed')}
                className={`py-2 px-1 rounded-xl text-center border text-xs font-bold transition-all ${
                  pace === 'packed'
                    ? 'bg-sky-600 text-white border-sky-600'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                ⚡ Dày đặc
              </button>
            </div>
          </div>

          {/* 7. Notes & Special Requests */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <MessageSquarePlus className="w-4 h-4 text-sky-600" />
                Ghi chú & Yêu cầu đặc biệt cho AI
              </label>
              <span className="text-[10px] text-slate-400">Không bắt buộc</span>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="VD: Muốn ăn hải sản tươi ngon giá hợp lý, thích ngắm hoàng hôn và cafe chill, nhóm có người thích chụp ảnh..."
              rows={2}
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none resize-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="mt-4 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
            <button
              onClick={handleGenerate}
              className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-[11px] font-bold"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Real-time Generation Progress */}
        {isGenerating && (
          <div className="mt-4 p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 animate-pulse">
            <div className="flex items-center gap-2.5 text-xs font-bold text-sky-700 dark:text-sky-300">
              <Loader2 className="w-4 h-4 animate-spin text-sky-600 dark:text-sky-400" />
              <span>{generationStep || 'AI đang xử lý yêu cầu...'}</span>
            </div>
            <div className="w-full h-1.5 bg-sky-200/60 dark:bg-sky-900/60 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-sky-500 to-orange-500 rounded-full animate-indeterminate" />
            </div>
          </div>
        )}

        {/* Generate CTA Button */}
        <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={handleGenerate}
            disabled={isGenerating || isDateReversed}
            className={`w-full h-13 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
              isDateReversed
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-300 dark:border-slate-700 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-sky-600 via-sky-700 to-orange-500 hover:opacity-95 text-white shadow-sky-600/25 active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
            }`}
          >
            {isDateReversed ? (
              <>
                <AlertCircle className="w-5 h-5 text-rose-500" />
                <span>Ngày đi lớn hơn ngày về — Vui lòng sửa lại</span>
              </>
            ) : isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>AI đang phân tích & lên lịch trình...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-cyan-200" />
                <span>Tạo lịch trình tự động bằng AI</span>
              </>
            )}
          </button>

          <p className="text-[10px] text-center text-slate-400 mt-2">
            ✨ AI sẽ tự động phân chia giờ giấc, điểm ăn uống và tính toán chi phí nhóm
          </p>
        </div>
      </div>
    </div>
  );
};
