import React, { useState } from 'react';
import {
  Compass,
  Lock,
  UserPlus,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Users,
  ShieldCheck,
  Check,
  Phone,
  User,
  Sparkles,
  MapPin,
  Calendar,
  Wallet,
  Sun,
  Moon
} from 'lucide-react';

interface AuthScreenProps {
  onLoginSuccess: (userData: { name: string; email: string; phone?: string }) => void;
  onContinueAsGuest?: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  lastUserEmail?: string;
  lastUserName?: string;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onLoginSuccess,
  onContinueAsGuest,
  darkMode,
  onToggleDarkMode,
  lastUserEmail = 'nguyenviethung.co@gmail.com',
  lastUserName = 'Nguyễn Việt Hùng',
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState(lastUserEmail);
  const [loginPassword, setLoginPassword] = useState('TripMate2025!');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!loginIdentifier.trim()) {
      setErrorMessage('Vui lòng nhập Email hoặc Số điện thoại!');
      return;
    }
    if (!loginPassword) {
      setErrorMessage('Vui lòng nhập mật khẩu!');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Determine user name from email or last known user
      const isKnown = loginIdentifier.toLowerCase() === lastUserEmail.toLowerCase();
      const resolvedName = isKnown
        ? lastUserName
        : loginIdentifier.split('@')[0] || 'Thành viên mới';

      onLoginSuccess({
        name: resolvedName,
        email: loginIdentifier.includes('@') ? loginIdentifier : `${loginIdentifier}@tripmate.vn`,
        phone: !loginIdentifier.includes('@') ? loginIdentifier : '0987 654 321',
      });
    }, 600);
  };

  // Handle Signup submission
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!signupName.trim()) {
      setErrorMessage('Vui lòng nhập họ và tên của bạn!');
      return;
    }
    if (!signupEmail.trim() && !signupPhone.trim()) {
      setErrorMessage('Vui lòng nhập Email hoặc Số điện thoại!');
      return;
    }
    if (signupPassword.length < 6) {
      setErrorMessage('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không trùng khớp!');
      return;
    }
    if (!agreeTerms) {
      setErrorMessage('Bạn cần đồng ý với Điều khoản dịch vụ & Chính sách bảo mật!');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: signupName.trim(),
        email: signupEmail.trim() || `${signupPhone}@tripmate.vn`,
        phone: signupPhone.trim() || '0987 654 321',
      });
    }, 700);
  };

  // Quick fill demo user
  const handleQuickFillDemo = () => {
    setLoginIdentifier(lastUserEmail);
    setLoginPassword('TripMate2025!');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-3 sm:p-6 transition-colors duration-200">
      
      {/* Top Bar with Dark Mode Toggle */}
      <div className="w-full max-w-md flex items-center justify-between py-2 px-1 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold shadow-md shadow-sky-600/30">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 16 7-7 4 4 7-7" />
              <path d="M14 6h7v7" />
            </svg>
          </div>
          <span className="font-black text-base tracking-tight text-slate-900 dark:text-slate-100">
            Trip<span className="text-sky-600 dark:text-sky-400">Mate</span>
          </span>
        </div>

        <button
          type="button"
          onClick={onToggleDarkMode}
          title={darkMode ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}
          className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-amber-500 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>
      </div>

      {/* Main Authentication Card */}
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-7 relative overflow-hidden flex flex-col">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-14 -left-14 w-44 h-44 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />

        {/* Hero Branding Header */}
        <div className="relative z-10 flex flex-col items-center text-center mb-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-600 via-sky-500 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-sky-600/30 mb-3">
            <Compass className="w-7 h-7 stroke-[2.2]" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/70 border border-sky-200/80 dark:border-sky-800/80 text-sky-700 dark:text-sky-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Đồng hành du lịch nhóm thông minh</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            {authMode === 'login' ? 'Đăng nhập vào TripMate' : 'Tạo tài khoản TripMate mới'}
          </h1>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs leading-relaxed">
            {authMode === 'login'
              ? 'Lên kế hoạch du lịch, chia chi phí và khám phá các điểm đến hấp dẫn cùng bạn bè.'
              : 'Đăng ký ngay để lưu giữ hành trình, mời bạn bè và quản lý ngân sách nhóm.'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="w-full bg-slate-100 dark:bg-slate-800/90 p-1.5 rounded-2xl flex items-center mb-5 border border-slate-200/60 dark:border-slate-700/60">
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setErrorMessage('');
            }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              authMode === 'login'
                ? 'bg-sky-700 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Đăng nhập</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMode('signup');
              setErrorMessage('');
            }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              authMode === 'signup'
                ? 'bg-sky-700 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Đăng ký</span>
          </button>
        </div>

        {/* Error message alert */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-semibold animate-in fade-in">
            {errorMessage}
          </div>
        )}

        {/* 1. LOGIN FORM */}
        {authMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Email hoặc Số điện thoại:
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="nhập email hoặc số điện thoại..."
                  required
                  className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Mật khẩu:
                </label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Tính năng khôi phục mật khẩu sẽ gửi mã OTP đến số điện thoại / email của bạn.');
                  }}
                  className="text-[11px] text-sky-600 dark:text-sky-400 font-bold hover:underline"
                >
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="nhập mật khẩu của bạn..."
                  required
                  className="w-full h-11 pl-10 pr-10 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me & Quick Fill */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-0 w-4 h-4"
                />
                <span className="text-slate-600 dark:text-slate-400 text-xs font-medium">
                  Ghi nhớ đăng nhập
                </span>
              </label>

              <button
                type="button"
                onClick={handleQuickFillDemo}
                className="text-xs text-sky-600 dark:text-sky-400 font-bold hover:underline cursor-pointer"
              >
                Tài khoản mẫu
              </button>
            </div>

            {/* Quick Demo User Card */}
            {lastUserEmail && (
              <div
                onClick={handleQuickFillDemo}
                className="p-2.5 rounded-2xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200/80 dark:border-sky-800/60 flex items-center justify-between cursor-pointer hover:bg-sky-100/70 transition-all"
                title="Nhấn để đăng nhập nhanh với tài khoản này"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-sky-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                    VH
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      {lastUserName}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                      {lastUserEmail}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-sky-600 text-white flex-shrink-0">
                  Điền nhanh
                </span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-2xl bg-sky-700 hover:bg-sky-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-700/25 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <span>Đang đăng nhập...</span>
              ) : (
                <>
                  <span>Đăng nhập vào TripMate</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </form>
        )}

        {/* 2. SIGNUP FORM */}
        {authMode === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Họ và tên của bạn:
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="vd: Trần Thu Trang, Lê Hoàng Nam..."
                  required
                  className="w-full h-10 pl-10 pr-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email:
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="email@vidu.com"
                    required
                    className="w-full h-10 pl-8 pr-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Số điện thoại:
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="tel"
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    placeholder="0912 345 678"
                    className="w-full h-10 pl-8 pr-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Mật khẩu:
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showSignupPassword ? 'text' : 'password'}
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="tối thiểu 6 ký tự..."
                  required
                  className="w-full h-10 pl-10 pr-10 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Xác nhận lại mật khẩu:
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <input
                  type={showSignupPassword ? 'text' : 'password'}
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  placeholder="nhập lại mật khẩu trên..."
                  required
                  className="w-full h-10 pl-10 pr-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-2 cursor-pointer select-none pt-1">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="rounded text-sky-600 focus:ring-0 w-4 h-4 mt-0.5"
              />
              <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                Tôi đồng ý với{' '}
                <span className="text-sky-600 dark:text-sky-400 font-semibold underline">
                  Điều khoản dịch vụ
                </span>{' '}
                &{' '}
                <span className="text-sky-600 dark:text-sky-400 font-semibold underline">
                  Chính sách bảo mật
                </span>{' '}
                của TripMate.
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-2xl bg-sky-700 hover:bg-sky-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-700/25 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <span>Đang tạo tài khoản...</span>
              ) : (
                <>
                  <span>Tạo tài khoản mới</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Guest Mode Alternative Option */}
        {onContinueAsGuest && (
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-center">
            <button
              type="button"
              onClick={onContinueAsGuest}
              className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors py-1 cursor-pointer"
            >
              Trải nghiệm với tư cách Khách →
            </button>
          </div>
        )}

        {/* Feature Highlights Footer */}
        <div className="mt-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col items-center">
            <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400 mb-1" />
            <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Lịch trình AI</span>
          </div>
          <div className="flex flex-col items-center">
            <Wallet className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-1" />
            <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Chia tiền nhóm</span>
          </div>
          <div className="flex flex-col items-center">
            <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mb-1" />
            <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Bình chọn chung</span>
          </div>
        </div>
      </div>
    </div>
  );
};
