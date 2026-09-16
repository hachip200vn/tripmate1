import React, { useState } from 'react';
import {
  X,
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Wallet,
  Compass,
  Sliders,
  Volume2,
  Play,
  Check,
  PlaneTakeoff,
  PlaneLanding,
  MessageSquarePlus,
  Loader2
} from 'lucide-react';
import { TripPlanData } from '../types';

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
  const [chimePlaying, setChimePlaying] = useState(false);

  const destinationChips = ['Đà Nẵng — Hội An', 'Phú Quốc', 'Đà Lạt', 'Hà Giang'];

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

  // Play Crystal Chime using Web Audio API
  const playCrystalChime = () => {
    try {
      setChimePlaying(true);
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const frequencies = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.65);
      });

      setTimeout(() => setChimePlaying(false), 800);
    } catch (e) {
      console.warn('Audio chime error', e);
      setChimePlaying(false);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setErrorMsg(null);
    setGenerationStep('Đang kết nối Gemini AI từ backend...');

    const stepTimer = setInterval(() => {
      setGenerationStep((prev) => {
        if (prev.includes('kết nối')) return 'Đang phân tích điểm đến & tối ưu hóa tuyến đường...';
        if (prev.includes('phân tích')) return 'Đang lên chi tiết mốc giờ, ẩm thực & chi phí nhóm...';
        return 'Đang hoàn tất lịch trình thông minh...';
      });
    }, 1800);

    try {
      const budgetLabel =
        budgetTier === 'budget'
          ? 'Tiết kiệm (~2-3tr/người)'
          : budgetTier === 'standard'
          ? 'Tiêu chuẩn (~4-5tr/người)'
          : 'Sang chảnh (>8tr/người)';

      const res = await fetch('/api/ai/plan-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          startDate,
          endDate,
          membersCount,
          budget: budgetLabel,
          vibes: selectedVibes,
          pace,
          notes,
        }),
      });

      const json = await res.json();
      if (json && json.data) {
        playCrystalChime();
        onApplyGeneratedPlan(json.data);
        onClose();
      } else {
        throw new Error(json?.message || 'Không thể tạo lịch trình');
      }
    } catch (err) {
      console.error('Lỗi khi gọi AI tạo lịch trình:', err);
      setErrorMsg('Đã có sự cố khi kết nối AI. Vui lòng bấm thử lại!');
    } finally {
      clearInterval(stepTimer);
      setIsGenerating(false);
      setGenerationStep('');
    }
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
              Chỉ mất 10 giây để AI gợi ý lịch trình cá nhân hóa hoàn hảo cho chuyến đi của bạn.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-300 flex items-center justify-center flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* 1. Destination */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-600" />
                Điểm đến bạn muốn tới
              </label>
              <span className="text-[10px] font-bold text-sky-600 bg-sky-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                Đang chọn
              </span>
            </div>

            <div className="relative mb-2">
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full h-11 pl-9 pr-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-800 dark:text-slate-100 outline-none"
              />
              <MapPin className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
              {destination && (
                <button
                  type="button"
                  onClick={() => setDestination('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex gap-1.5 flex-wrap">
              {destinationChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setDestination(chip)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                    destination === chip
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {destination === chip && '✨ '}
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Dates */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-sky-600" />
                Thời gian chuyến đi
              </label>
              <span className="text-[10px] font-bold text-orange-700 bg-orange-100 dark:bg-orange-950/60 px-2 py-0.5 rounded-full">
                4 ngày 3 đêm
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <PlaneTakeoff className="w-3 h-3 text-sky-600" /> Ngày đi
                </span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-transparent font-black text-xs text-slate-800 dark:text-slate-100 outline-none mt-1"
                />
              </div>

              <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <PlaneLanding className="w-3 h-3 text-orange-500" /> Ngày về
                </span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-transparent font-black text-xs text-slate-800 dark:text-slate-100 outline-none mt-1"
                />
              </div>
            </div>
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

          {/* 8. Sound & Haptic Preview */}
          <div className="bg-sky-50 dark:bg-slate-800 p-3 rounded-2xl border border-sky-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                  Hiệu ứng Âm thanh & Rung Haptic
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Chuông pha lê • Phản hồi AI hoàn tất
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={playCrystalChime}
              className="px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <Play className="w-3 h-3" />
              <span>{chimePlaying ? 'Đang phát' : 'Nghe thử'}</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="mt-4 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center justify-between">
            <span>{errorMsg}</span>
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
            disabled={isGenerating}
            className="w-full h-13 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-700 to-orange-500 hover:opacity-95 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-600/25 active:scale-[0.98] transition-all disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
          >
            {isGenerating ? (
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
