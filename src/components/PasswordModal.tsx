import React, { useState } from 'react';
import {
  X,
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  Info,
  Check,
  ShieldAlert
} from 'lucide-react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPasswordChanged: () => void;
}

export const PasswordModal: React.FC<PasswordModalProps> = ({
  isOpen,
  onClose,
  onPasswordChanged,
}) => {
  if (!isOpen) return null;

  const [currentPassword, setCurrentPassword] = useState('TripMate2024!');
  const [newPassword, setNewPassword] = useState('DaLatSun2025#');
  const [confirmPassword, setConfirmPassword] = useState('DaLatSun2025#');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validation
  const hasMinLength = newPassword.length >= 8;
  const hasLetterAndNum = /[a-zA-Z]/.test(newPassword) && /\d/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const isMatch = newPassword.length > 0 && newPassword === confirmPassword;

  const strengthScore = (hasMinLength ? 1 : 0) + (hasLetterAndNum ? 2 : 0) + (hasSpecialChar ? 1 : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isMatch) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onPasswordChanged();
        onClose();
      }, 700);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Grab bar */}
        <div className="w-12 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-3" />

        {/* Close Button */}
        <div className="flex justify-end -mt-3 mb-1">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-300 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Header matching Image 27 */}
        <div className="flex items-start gap-3 mb-4">
          <div className="relative w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-300 flex items-center justify-center flex-shrink-0 shadow-sm">
            <Lock className="w-6 h-6" />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100">
              Đổi mật khẩu tài khoản
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
              Bảo vệ tài khoản TripMate của bạn với mật khẩu mạnh gồm chữ hoa, chữ thường và số.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Mật khẩu hiện tại
              </label>
              <a href="#" className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline">
                Quên mật khẩu?
              </a>
            </div>
            <div className="relative flex items-center">
              <KeyRound className="w-4 h-4 absolute left-3.5 text-slate-400" />
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full h-12 pl-10 pr-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-medium text-xs sm:text-sm border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 text-slate-400 hover:text-slate-600"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
              Mật khẩu mới
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 absolute left-3.5 text-slate-400" />
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-12 pl-10 pr-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-medium text-xs sm:text-sm border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 text-slate-400 hover:text-slate-600"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password Strength Meter matching Image 27 */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700 mt-2 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-sky-600" />
                  <span>Độ mạnh mật khẩu:</span>
                </div>
                <span className="font-bold text-sky-600 dark:text-sky-400">
                  {strengthScore === 4 ? 'Mạnh (4/4)' : strengthScore >= 2 ? 'Trung bình' : 'Yếu'}
                </span>
              </div>

              {/* 4 Segment Bars */}
              <div className="grid grid-cols-4 gap-1.5">
                <div className={`h-1.5 rounded-full transition-all ${strengthScore >= 1 ? 'bg-sky-600' : 'bg-slate-200 dark:bg-slate-700'}`} />
                <div className={`h-1.5 rounded-full transition-all ${strengthScore >= 2 ? 'bg-sky-600' : 'bg-slate-200 dark:bg-slate-700'}`} />
                <div className={`h-1.5 rounded-full transition-all ${strengthScore >= 3 ? 'bg-sky-600' : 'bg-slate-200 dark:bg-slate-700'}`} />
                <div className={`h-1.5 rounded-full transition-all ${strengthScore >= 4 ? 'bg-sky-600' : 'bg-slate-200 dark:bg-slate-700'}`} />
              </div>

              {/* Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 pt-1 text-[11px]">
                <div className={`flex items-center gap-1 ${hasMinLength ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-slate-400'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Tối thiểu 8 ký tự</span>
                </div>
                <div className={`flex items-center gap-1 ${hasLetterAndNum ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-slate-400'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Gồm chữ & số</span>
                </div>
                <div className={`flex items-center gap-1 ${hasSpecialChar ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-slate-400'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Ký tự đặc biệt</span>
                </div>
              </div>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
              Xác nhận mật khẩu mới
            </label>
            <div className="relative flex items-center">
              <ShieldCheck className="w-4 h-4 absolute left-3.5 text-slate-400" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-12 pl-10 pr-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-medium text-xs sm:text-sm border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500"
              />
              {isMatch && (
                <CheckCircle2 className="w-4 h-4 absolute right-3 text-sky-600" />
              )}
            </div>

            {isMatch ? (
              <p className="text-[11px] font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1 mt-1">
                <Check className="w-3.5 h-3.5" /> Mật khẩu mới đã trùng khớp hoàn toàn
              </p>
            ) : (
              <p className="text-[11px] text-orange-500 flex items-center gap-1 mt-1">
                Mật khẩu xác nhận chưa trùng khớp
              </p>
            )}
          </div>

          {/* Security policy notice */}
          <div className="bg-sky-50 dark:bg-slate-800 p-3 rounded-xl border border-sky-100 dark:border-slate-700 flex items-start gap-2 text-xs">
            <Info className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Sau khi đổi mật khẩu, các phiên đăng nhập trên thiết bị lạ sẽ tự động đăng xuất để đảm bảo an toàn hành trình của bạn.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !isMatch}
              className="col-span-2 h-12 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs shadow-md shadow-sky-700/25 flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Đang lưu...</span>
              ) : isSuccess ? (
                <span>Đã lưu thành công! ✓</span>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Lưu thay đổi</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
