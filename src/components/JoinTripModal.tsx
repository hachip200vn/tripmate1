import React, { useState } from 'react';
import {
  X,
  KeyRound,
  ArrowRight,
  Compass,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Users,
  Calendar,
} from 'lucide-react';

interface JoinTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinTrip: (code: string) => void;
}

export const JoinTripModal: React.FC<JoinTripModalProps> = ({
  isOpen,
  onClose,
  onJoinTrip,
}) => {
  if (!isOpen) return null;

  const [code, setCode] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Suggested demo codes for quick test
  const demoCodes = [
    { code: 'TRIP-HG25', name: 'Hà Giang — Cao Nguyên Đá' },
    { code: 'TRIP-HN25', name: 'Hà Nội — Phố Cổ' },
    { code: 'TRIP-SAPA25', name: 'Sa Pa — Fansipan' },
    { code: 'TRIP-NT25', name: 'Nha Trang — Biển Đảo' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      setErrorMsg('Vui lòng nhập mã phòng chuyến đi!');
      return;
    }
    if (cleanCode.length < 4) {
      setErrorMsg('Mã phòng không hợp lệ (tối thiểu 4 ký tự)');
      return;
    }

    onJoinTrip(cleanCode);
    setCode('');
    setErrorMsg(null);
    onClose();
  };

  const handleSelectDemo = (demoCode: string) => {
    setCode(demoCode);
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[92vh] overflow-y-auto flex flex-col animate-in slide-in-from-bottom-4">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 text-[11px] font-extrabold uppercase tracking-wider mb-1">
              <KeyRound className="w-3 h-3 text-sky-600" />
              <span>Gia nhập nhóm du lịch</span>
            </div>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">
              Tham gia chuyến đi của bạn bè
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              Nhập mã phòng hoặc dán link mời từ bạn bè
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-sky-600 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder="VD: TRIP-HG25 hoặc TRIP-DN2025"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-mono font-bold uppercase text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                autoFocus
              />
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5">
              Mã phòng gồm 6-12 ký tự do Trưởng nhóm cung cấp khi chia sẻ chuyến đi.
            </p>
          </div>

          {/* Quick Demo Codes */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Gợi ý mã phòng thử nghiệm nhanh:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {demoCodes.map((d) => (
                <button
                  type="button"
                  key={d.code}
                  onClick={() => handleSelectDemo(d.code)}
                  className={`p-2 rounded-xl text-left border transition-all text-xs cursor-pointer ${
                    code.toUpperCase() === d.code
                      ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-500 text-sky-700 dark:text-sky-300 font-bold'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-sky-300 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="font-mono font-bold block text-[11px] text-sky-600 dark:text-sky-400">
                    {d.code}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate block">
                    {d.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="space-y-2 pt-1 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>Đồng bộ lịch trình di chuyển & bản đồ nhóm theo thời gian thực</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>Tham gia bỏ phiếu biểu quyết địa điểm ăn uống, giải trí</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>Ghi nhận chi tiêu và chia tiền công bằng, tự động tính số dư</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-2 h-11 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-sky-600/25 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Gia nhập chuyến đi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
