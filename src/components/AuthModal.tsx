import React, { useState } from 'react';
import {
  X,
  Compass,
  Lock,
  UserPlus,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Users,
  ShieldCheck,
  Check
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
}) => {
  if (!isOpen) return null;

  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('nam.tran@tripmate.vn');
  const [password, setPassword] = useState('TripMate2024!');
  const [fullName, setFullName] = useState('Trần Nhật Nam');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess(email);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[95vh] overflow-y-auto flex flex-col relative">
        {/* Subtle Ambient Glow Orbs matching Image 11 */}
        <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-sky-400/20 dark:bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -top-8 -right-10 w-36 h-36 rounded-full bg-orange-400/20 dark:bg-orange-500/10 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <div className="flex justify-end relative z-10">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-300 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hero Branding Section */}
        <div className="relative z-10 flex flex-col items-center text-center mt-1 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center shadow-lg shadow-sky-600/30 text-white mb-2.5">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 16 7-7 4 4 7-7" />
              <path d="M14 6h7v7" />
            </svg>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 text-[11px] font-bold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Hành trình tuyệt vời bắt đầu tại đây</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Chào mừng đến với <span className="text-sky-600 dark:text-sky-400">TripMate</span>
          </h2>

          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[280px] mt-1">
            Khám phá, lên lịch trình và chia sẻ chi phí cùng hội bạn thân một cách dễ dàng.
          </p>
        </div>

        {/* Segmented Switcher matching image */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl flex items-center mb-4">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              authMode === 'login'
                ? 'bg-sky-700 text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Đăng nhập</span>
          </button>

          <button
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              authMode === 'signup'
                ? 'bg-sky-700 text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Đăng ký</span>
          </button>
        </div>

        {/* Fast Social Buttons */}
        <div className="flex flex-col gap-2 mb-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
            <span>Tiếp tục với Google</span>
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Tiếp tục với Facebook</span>
          </button>
        </div>

        {/* Separator */}
        <div className="relative flex items-center justify-center mb-4">
          <div className="w-full h-[1px] bg-slate-200 dark:bg-slate-700" />
          <span className="absolute bg-white dark:bg-slate-900 px-3 text-[11px] text-slate-400 font-medium">
            hoặc tiếp tục với email
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {authMode === 'signup' && (
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                Họ và tên <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nguyễn Văn A"
                required
                className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
              Email hoặc Số điện thoại <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 absolute left-3 text-slate-400" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com hoặc 0912..."
                required
                className="w-full h-11 pl-9 pr-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Mật khẩu <span className="text-rose-500">*</span>
              </label>
              {authMode === 'signup' && (
                <span className="text-[10px] text-orange-500">Tối thiểu 8 ký tự</span>
              )}
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 absolute left-3 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full h-11 pl-9 pr-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-sky-600 focus:ring-0"
              />
              <span className="text-slate-600 dark:text-slate-400 text-[11px]">Ghi nhớ đăng nhập</span>
            </label>
            <a href="#" className="text-sky-600 dark:text-sky-400 font-bold hover:underline text-[11px]">
              Quên mật khẩu?
            </a>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-sky-600/30 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <span>{isLoading ? 'Đang xác thực...' : authMode === 'login' ? 'Đăng nhập vào TripMate' : 'Tạo tài khoản TripMate'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Feature highlight pill matching Image 11 */}
        <div className="mt-4 p-3 rounded-2xl bg-sky-50 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
              Tham gia 120.000+ người du lịch
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              Chia hoá đơn siêu tốc, không lo thất lạc chi phí
            </p>
          </div>
        </div>

        {/* Terms footer */}
        <p className="mt-4 text-center text-[11px] text-slate-400 leading-relaxed">
          Bằng việc đăng nhập, bạn đồng ý với{' '}
          <a href="#" className="text-sky-600 dark:text-sky-400 font-semibold hover:underline">
            Điều khoản dịch vụ
          </a>{' '}
          &{' '}
          <a href="#" className="text-sky-600 dark:text-sky-400 font-semibold hover:underline">
            Chính sách bảo mật
          </a>{' '}
          của TripMate.
        </p>
      </div>
    </div>
  );
};
