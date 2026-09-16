import React from 'react';
import {
  ShieldCheck,
  Phone,
  Mail,
  Lock,
  Moon,
  Sun,
  SlidersHorizontal,
  Bell,
  ChevronRight,
  LogOut,
  Award,
  CreditCard,
  FileText,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface ProfileViewProps {
  userName?: string;
  userEmail?: string;
  userPhone: string;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenPhoneModal: () => void;
  onOpenPasswordModal: () => void;
  onOpenUtilitiesModal: () => void;
  onOpenNotifications: () => void;
  onLogoutOrSwitchAccount: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userName = 'Nguyễn Việt Hùng',
  userEmail = 'nguyenviethung.co@gmail.com',
  userPhone,
  darkMode,
  onToggleDarkMode,
  onOpenPhoneModal,
  onOpenPasswordModal,
  onOpenUtilitiesModal,
  onOpenNotifications,
  onLogoutOrSwitchAccount,
}) => {
  return (
    <div className="flex flex-col w-full pb-24">
      {/* User Overview Card */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 border border-slate-200/90 dark:border-slate-700 shadow-sm flex items-center gap-4 mb-5">
        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-sky-100 dark:ring-slate-700 bg-gradient-to-tr from-sky-600 via-sky-500 to-cyan-500 text-white font-black text-xl flex items-center justify-center tracking-wider shadow-md">
          VH
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h2 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-100 truncate">
              {userName}
            </h2>
            <ShieldCheck className="w-4 h-4 text-sky-600 flex-shrink-0" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
            {userEmail}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 text-[10px] font-bold">
              Explorer Lv. 3
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 text-[10px] font-bold">
              14 Chuyến đi
            </span>
          </div>
        </div>
      </div>

      {/* Account Security Group */}
      <div className="mb-5">
        <h3 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider mb-2 px-1">
          Bảo mật & Tài khoản
        </h3>

        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-2 border border-slate-200/90 dark:border-slate-700 shadow-sm divide-y divide-slate-100 dark:divide-slate-700/70">
          {/* Phone row -> triggers Phone OTP Modal */}
          <button
            onClick={onOpenPhoneModal}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-750 rounded-2xl transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-slate-700 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  Số điện thoại
                </p>
                <p className="text-[11px] text-slate-400">Dùng nhận mã OTP & cảnh báo chuyến đi</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sky-600 dark:text-sky-400 font-semibold text-xs">
              <span>{userPhone}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>

          {/* Password row -> triggers Password Modal */}
          <button
            onClick={onOpenPasswordModal}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-750 rounded-2xl transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-slate-700 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  Đổi mật khẩu
                </p>
                <p className="text-[11px] text-slate-400">Bảo mật mã hóa 2 lớp TripMate</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Email row */}
          <div className="w-full p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  Email
                </p>
                <p className="text-[11px] text-slate-400">{userEmail}</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40">
              Đã xác thực
            </span>
          </div>
        </div>
      </div>

      {/* Preferences & Utility Dashboard */}
      <div className="mb-5">
        <h3 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider mb-2 px-1">
          Cá nhân hóa & Tiện ích
        </h3>

        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-2 border border-slate-200/90 dark:border-slate-700 shadow-sm divide-y divide-slate-100 dark:divide-slate-700/70">
          {/* Utility Dashboard Button */}
          <button
            onClick={onOpenUtilitiesModal}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-750 rounded-2xl transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-300 flex items-center justify-center">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                    Bảng điều khiển cá nhân hóa tiện ích
                  </p>
                  <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-orange-500 text-white">
                    HOT
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Đổi ngoại tệ, checklist vali, SOS, âm thanh thiên nhiên</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Dark Mode Toggle row */}
          <div className="w-full p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center">
                {darkMode ? <Moon className="w-5 h-5 text-amber-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  Giao diện Dark Mode
                </p>
                <p className="text-[11px] text-slate-400">Tối ưu cho mắt khi sử dụng ban đêm</p>
              </div>
            </div>
            <button
              onClick={onToggleDarkMode}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                darkMode ? 'bg-sky-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Notifications Inbox shortcut */}
          <button
            onClick={onOpenNotifications}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-750 rounded-2xl transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  Hộp thư & Thông báo
                </p>
                <p className="text-[11px] text-slate-400">Xem cập nhật chuyến bay, khoản chi & bình chọn</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Logout / Switch Account */}
      <button
        onClick={onLogoutOrSwitchAccount}
        className="w-full h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-red-600 dark:text-red-400 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span>Chuyển tài khoản / Đăng xuất</span>
      </button>
    </div>
  );
};
