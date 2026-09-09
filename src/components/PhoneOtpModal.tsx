import React, { useState, useEffect } from 'react';
import {
  X,
  Smartphone,
  CheckCircle2,
  ShieldCheck,
  MessageSquare,
  PhoneCall,
  Lock,
  Timer,
  RotateCcw
} from 'lucide-react';

interface PhoneOtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhone: string;
  onUpdatePhoneSuccess: (newPhone: string) => void;
}

export const PhoneOtpModal: React.FC<PhoneOtpModalProps> = ({
  isOpen,
  onClose,
  currentPhone,
  onUpdatePhoneSuccess,
}) => {
  if (!isOpen) return null;

  const [newPhone, setNewPhone] = useState('0912 345 889');
  const [countdown, setCountdown] = useState(45);
  const [otpDigits, setOtpDigits] = useState(['5', '8', '2', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleDigitChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otpDigits];
    next[index] = val.slice(-1);
    setOtpDigits(next);
  };

  const handleConfirm = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedSuccess(true);
      setTimeout(() => {
        onUpdatePhoneSuccess(newPhone);
        onClose();
      }, 700);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Grab bar for mobile feel */}
        <div className="w-12 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-3" />

        {/* Close button */}
        <div className="flex justify-end -mt-3 mb-1">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-300 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Header matching Image 13 */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-300 flex items-center justify-center flex-shrink-0 shadow-sm relative">
            <Smartphone className="w-6 h-6" />
            <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute -bottom-1 -right-1 bg-white dark:bg-slate-900 rounded-full" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100">
              Cập nhật số điện thoại
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
              Dùng để nhận mã OTP khôi phục tài khoản và cảnh báo thay đổi chuyến đi khẩn cấp.
            </p>
          </div>
        </div>

        {/* Current Phone Badge */}
        <div className="w-full bg-slate-50 dark:bg-slate-800/80 rounded-2xl px-4 py-3 flex items-center justify-between mb-4 border border-slate-200/80 dark:border-slate-700">
          <div className="text-xs">
            <span className="text-slate-400">Số hiện tại: </span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{currentPhone}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
            <CheckCircle2 className="w-3 h-3" /> Đã xác thực
          </span>
        </div>

        {/* Step Flow */}
        <div className="space-y-4">
          {/* Step 1: Input phone */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Số điện thoại mới
              </label>
              <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400">
                Bước 1/2
              </span>
            </div>

            <div className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 flex items-center gap-2 focus-within:ring-2 focus-within:ring-sky-500 transition-all">
              <div className="flex items-center gap-1 bg-white dark:bg-slate-900 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm">
                <span>🇻🇳</span>
                <span>+84</span>
              </div>
              <input
                type="tel"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="Nhập số điện thoại mới"
                className="flex-1 bg-transparent font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 outline-none"
              />
            </div>
          </div>

          {/* Step 2: SMS sent notification & Countdown */}
          <div className="flex items-center justify-between bg-sky-50 dark:bg-slate-800/90 border border-sky-100 dark:border-slate-700 rounded-xl px-3 py-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-sky-600" />
              <div>
                <span className="text-xs font-bold text-sky-700 dark:text-sky-300 block">
                  Đã gửi mã xác minh
                </span>
                <span className="text-[11px] text-slate-400">SMS đến 0912 xxx 889</span>
              </div>
            </div>

            {countdown > 0 ? (
              <span className="text-xs text-slate-500 font-semibold flex items-center gap-1 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                <Timer className="w-3.5 h-3.5" /> Gửi lại sau ({countdown}s)
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setCountdown(45)}
                className="text-xs text-sky-600 font-bold flex items-center gap-1 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-sky-200 shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Gửi lại mã
              </button>
            )}
          </div>

          {/* Step 3: OTP 6 Digits Boxes matching image */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Mã xác thực OTP (6 số)
              </label>
              <span className="text-[11px] text-slate-400">Hết hạn trong 04:59</span>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  className={`h-12 rounded-xl text-center font-black text-lg shadow-sm border outline-none transition-all ${
                    digit
                      ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 border-sky-500'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 focus:border-sky-500'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Alternative delivery channels */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-700 text-center text-xs">
            <p className="text-slate-500 dark:text-slate-400 mb-1.5">
              Không nhận được mã OTP qua tin nhắn SMS?
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                className="text-sky-600 dark:text-sky-400 font-bold flex items-center gap-1 hover:underline"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Gửi lại qua Zalo
              </button>
              <span className="text-slate-300">•</span>
              <button
                type="button"
                className="text-sky-600 dark:text-sky-400 font-bold flex items-center gap-1 hover:underline"
              >
                <PhoneCall className="w-3.5 h-3.5" /> Gọi thoại tự động
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={onClose}
              className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              onClick={handleConfirm}
              disabled={isVerifying}
              className="h-12 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs shadow-md shadow-sky-700/25 flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all"
            >
              {isVerifying ? (
                <span>Đang xác thực...</span>
              ) : verifiedSuccess ? (
                <span>Đã xác nhận! ✓</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Xác nhận</span>
                </>
              )}
            </button>
          </div>

          {/* Security footnote */}
          <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 pb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Bảo mật mã hóa 256-bit chuẩn TripMate ID</span>
          </div>
        </div>
      </div>
    </div>
  );
};
