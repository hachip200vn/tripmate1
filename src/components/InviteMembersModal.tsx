import React, { useState } from 'react';
import {
  X,
  UserPlus,
  Copy,
  CheckCircle2,
  Share2,
  Mail,
  MessageCircle,
  QrCode,
  Users,
  Sparkles,
  Link2,
  ExternalLink,
  Phone,
  Plus,
} from 'lucide-react';
import { Member } from '../types';

interface InviteMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripTitle?: string;
  destination?: string | null;
  datesSummary?: string;
  inviteCode?: string;
  members?: Member[];
  onAddMemberDirectly?: (name: string, phone: string) => void;
}

export const InviteMembersModal: React.FC<InviteMembersModalProps> = ({
  isOpen,
  onClose,
  tripTitle = 'Lịch trình chuyến đi',
  destination = 'Việt Nam',
  datesSummary = '4 ngày 3 đêm',
  inviteCode: propInviteCode,
  members = [],
  onAddMemberDirectly,
}) => {
  if (!isOpen) return null;

  const dest = destination || 'Việt Nam';
  const destSlug = dest
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .toUpperCase()
    .slice(0, 4);

  const inviteCode = propInviteCode || `TRIP-${destSlug || 'VN'}2025`;
  const inviteLink = `https://tripmate.vn/join/${inviteCode}`;

  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedFullMessage, setCopiedFullMessage] = useState(false);
  const [showDirectAdd, setShowDirectAdd] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberPhone, setNewMemberPhone] = useState('');
  const [showQrCode, setShowQrCode] = useState(false);

  const fullInviteMessage = `✈️ Lời mời tham gia chuyến đi "${tripTitle}" cùng nhóm trên TripMate!
📍 Điểm đến: ${dest}
📅 Thời gian: ${datesSummary}
🔑 Mã phòng nhóm: ${inviteCode}
🔗 Bấm vào link để tham gia ngay: ${inviteLink}

Mở TripMate để cùng biểu quyết lịch trình và chia tiền chuyến đi nhé!`;

  const handleCopyCode = () => {
    navigator.clipboard?.writeText?.(inviteCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(inviteLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyFullMessage = () => {
    navigator.clipboard?.writeText?.(fullInviteMessage);
    setCopiedFullMessage(true);
    setTimeout(() => setCopiedFullMessage(false), 2500);
  };

  const handleShareMessenger = () => {
    navigator.clipboard?.writeText?.(fullInviteMessage);
    setCopiedFullMessage(true);
    setTimeout(() => setCopiedFullMessage(false), 2500);

    const messengerUrl = `https://www.messenger.com/t/`;
    window.open(messengerUrl, '_blank');
  };

  const handleShareGmail = () => {
    const subject = encodeURIComponent(`[TripMate] Lời mời tham gia chuyến đi: ${tripTitle}`);
    const body = encodeURIComponent(fullInviteMessage);
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  const handleShareZalo = () => {
    navigator.clipboard?.writeText?.(fullInviteMessage);
    setCopiedFullMessage(true);
    setTimeout(() => setCopiedFullMessage(false), 2500);

    const zaloUrl = `https://chat.zalo.me/`;
    window.open(zaloUrl, '_blank');
  };

  const handleAddDirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    onAddMemberDirectly?.(newMemberName.trim(), newMemberPhone.trim());
    setNewMemberName('');
    setNewMemberPhone('');
    setShowDirectAdd(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[92vh] overflow-y-auto flex flex-col animate-in slide-in-from-bottom-4">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 text-[11px] font-extrabold uppercase tracking-wider mb-1">
              <Users className="w-3 h-3 text-sky-600" />
              <span>Thành viên nhóm ({members.length})</span>
            </div>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">
              Mời bạn bè tham gia chuyến đi
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Trip Meta Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 border border-sky-100 dark:border-slate-700 mb-4 flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="text-xs font-black text-slate-900 dark:text-slate-100 truncate">
              {tripTitle}
            </h3>
            <p className="text-[11px] text-sky-700 dark:text-sky-300 font-semibold mt-0.5">
              {dest} • {datesSummary}
            </p>
          </div>
          <div className="flex -space-x-1.5 overflow-hidden ml-2 flex-shrink-0">
            {members.slice(0, 4).map((m) => (
              <div
                key={m.id}
                className="w-6 h-6 rounded-full bg-sky-600 text-white text-[10px] font-bold ring-2 ring-white dark:ring-slate-900 flex items-center justify-center"
                title={m.name}
              >
                {m.initials}
              </div>
            ))}
          </div>
        </div>

        {/* 1. Quick Share Buttons */}
        <div className="mb-4">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
            Mời nhanh qua ứng dụng
          </label>
          <div className="grid grid-cols-3 gap-2">
            {/* Messenger Button */}
            <button
              onClick={handleShareMessenger}
              className="p-3 rounded-2xl bg-sky-50 hover:bg-sky-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-sky-100 dark:border-slate-700 flex flex-col items-center justify-center gap-1.5 transition-all text-center group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200">
                Messenger
              </span>
              <span className="text-[9px] text-slate-400 font-medium">Sao chép & Mở</span>
            </button>

            {/* Gmail Button */}
            <button
              onClick={handleShareGmail}
              className="p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-rose-100 dark:border-slate-700 flex flex-col items-center justify-center gap-1.5 transition-all text-center group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-red-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200">
                Gmail
              </span>
              <span className="text-[9px] text-slate-400 font-medium">Gửi email mời</span>
            </button>

            {/* Zalo Button */}
            <button
              onClick={handleShareZalo}
              className="p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-blue-100 dark:border-slate-700 flex flex-col items-center justify-center gap-1.5 transition-all text-center group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Share2 className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200">
                Zalo
              </span>
              <span className="text-[9px] text-slate-400 font-medium">Mở Zalo chat</span>
            </button>
          </div>
        </div>

        {/* 2. Direct Link Sharing Box */}
        <div className="mb-4 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2.5">
          <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Link2 className="w-3.5 h-3.5 text-sky-600" />
            <span>Đường link tham gia chuyến đi</span>
          </label>
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
            <input
              type="text"
              readOnly
              value={inviteLink}
              className="w-full bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none truncate"
            />
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-1 flex-shrink-0 transition-colors"
            >
              {copiedLink ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>Đã chép</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 3. Group Code & QR Box */}
        <div className="mb-4 grid grid-cols-2 gap-2">
          {/* Room Code Card */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <span className="text-[11px] text-slate-400 font-medium">Mã phòng nhóm</span>
            <div className="my-1">
              <span className="font-mono text-sm font-black text-sky-700 dark:text-sky-300 tracking-wider">
                {inviteCode}
              </span>
            </div>
            <button
              onClick={handleCopyCode}
              className="w-full py-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
            >
              {copiedCode ? (
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
              <span>{copiedCode ? 'Đã sao chép' : 'Chép mã'}</span>
            </button>
          </div>

          {/* QR Code toggle Card */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <span className="text-[11px] text-slate-400 font-medium">Quét mã QR</span>
            <div className="my-1 flex items-center gap-1.5">
              <QrCode className="w-4 h-4 text-sky-600" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Gia nhập ngay
              </span>
            </div>
            <button
              onClick={() => setShowQrCode(!showQrCode)}
              className="w-full py-1.5 rounded-lg bg-sky-50 dark:bg-slate-800 hover:bg-sky-100 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-slate-700 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
            >
              <QrCode className="w-3 h-3" />
              <span>{showQrCode ? 'Ẩn mã QR' : 'Hiện mã QR'}</span>
            </button>
          </div>
        </div>

        {/* Expanded QR Code Display */}
        {showQrCode && (
          <div className="mb-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center animate-in zoom-in-95">
            <div className="p-3 bg-white rounded-xl inline-block shadow-sm">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                  inviteLink
                )}`}
                alt="QR Tham gia nhóm"
                className="w-36 h-36 mx-auto"
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-medium">
              Bạn bè chỉ cần mở camera điện thoại quét mã trên để tham gia chuyến đi
            </p>
          </div>
        )}

        {/* 4. Direct Add Form (Optional Quick Add) */}
        {onAddMemberDirectly && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            {!showDirectAdd ? (
              <button
                type="button"
                onClick={() => setShowDirectAdd(true)}
                className="w-full py-2 text-center text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-sky-600 flex items-center justify-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Hoặc thêm trực tiếp tên thành viên vào nhóm</span>
              </button>
            ) : (
              <form onSubmit={handleAddDirect} className="space-y-2 animate-in fade-in">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Thêm thành viên thủ công
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="Tên bạn bè (VD: Hoàng Nam)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 outline-none"
                    autoFocus
                  />
                  <input
                    type="tel"
                    value={newMemberPhone}
                    onChange={(e) => setNewMemberPhone(e.target.value)}
                    placeholder="Số điện thoại (tùy chọn)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowDirectAdd(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-500"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-1.5 rounded-lg bg-sky-600 text-white text-xs font-bold hover:bg-sky-700"
                  >
                    Thêm vào danh sách nhóm
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
