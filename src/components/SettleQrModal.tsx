import React, { useState } from 'react';
import { X, QrCode, Copy, CheckCircle2, ShieldCheck, ArrowDownCircle, ArrowUpRight, ArrowDownLeft, Share2, Pencil } from 'lucide-react';
import { formatCurrency } from '../utils/format';
import { UserBankQr } from '../types';

interface SettleQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  payerName: string;
  amount: number;
  mode?: 'pay' | 'receive';
  userBankQr?: UserBankQr;
  onOpenUpdateQr?: () => void;
  onSettledSuccess: () => void;
}

export const SettleQrModal: React.FC<SettleQrModalProps> = ({
  isOpen,
  onClose,
  payerName,
  amount,
  mode = 'pay',
  userBankQr,
  onOpenUpdateQr,
  onSettledSuccess,
}) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const [settling, setSettling] = useState(false);

  const isReceiveMode = mode === 'receive';
  const transferMsg = isReceiveMode
    ? `TRIPMATE NHAN TIEN ${payerName.toUpperCase()}`
    : `TRIPMATE CHIA TIEN ${payerName.toUpperCase()}`;

  const currentBankName = userBankQr?.bankName || 'MB Bank (Quân Đội)';
  const currentBankId = userBankQr?.bankId || 'MB';
  const currentAccountNumber = userBankQr?.accountNumber || '0987 654 321';
  const currentAccountName = isReceiveMode
    ? (userBankQr?.accountName || payerName).toUpperCase()
    : payerName.toUpperCase();

  const qrImageUrl = isReceiveMode && userBankQr?.customQrUrl
    ? userBankQr.customQrUrl
    : `https://img.vietqr.io/image/${currentBankId}-${currentAccountNumber.replace(/\s+/g, '')}-compact2.png?amount=${amount}&accountName=${encodeURIComponent(currentAccountName)}&addInfo=${encodeURIComponent(transferMsg)}`;

  const copyInfo = () => {
    navigator.clipboard?.writeText?.(`${currentAccountNumber} ${currentBankName} ${amount}đ ${transferMsg}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDone = () => {
    setSettling(true);
    setTimeout(() => {
      setSettling(false);
      onSettledSuccess();
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center animate-in slide-in-from-bottom-4">
        {/* Close Button */}
        <div className="w-full flex justify-end">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Icon Badge */}
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 shadow-sm ${
            isReceiveMode
              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
              : 'bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-300'
          }`}
        >
          {isReceiveMode ? <ArrowDownLeft className="w-6 h-6" /> : <QrCode className="w-6 h-6" />}
        </div>

        <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
          {isReceiveMode ? 'Mã QR Nhận Lại Tiền' : 'Chuyển Khoản Quyết Toán'}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {isReceiveMode ? (
            <>
              Tài khoản nhận tiền của <strong>{payerName}</strong>
            </>
          ) : (
            <>
              Quyết toán cho <strong>{payerName}</strong>
            </>
          )}
        </p>

        {/* Amount Badge */}
        <div
          className={`my-3 px-4 py-2 rounded-2xl border ${
            isReceiveMode
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60'
              : 'bg-sky-50 dark:bg-slate-800 border-sky-100 dark:border-slate-700'
          }`}
        >
          <span
            className={`text-2xl font-black ${
              isReceiveMode
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-sky-600 dark:text-sky-400'
            }`}
          >
            {isReceiveMode ? '+' : ''}
            {formatCurrency(amount)} đ
          </span>
          <span className="block text-[11px] text-slate-400 font-medium">
            {isReceiveMode ? 'Số tiền bạn được hoàn lại' : 'Số tiền cần chuyển trả'}
          </span>
        </div>

        {/* VietQR Box */}
        <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-inner mb-3">
          <img
            src={qrImageUrl}
            alt="VietQR Napas"
            className="w-44 h-44 rounded-lg object-contain mx-auto"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=vietqr-tripmate-${encodeURIComponent(
                payerName
              )}-${amount}-${mode}`;
            }}
          />
          <p className="text-[10px] text-slate-400 mt-2 font-mono">
            {isReceiveMode
              ? (userBankQr?.customQrUrl ? 'Mã QR nhận tiền cá nhân của bạn' : 'VietQR Chuẩn NAPAS 24/7 • Quét để nhận tiền')
              : 'VietQR Chuẩn NAPAS 247 • Quét bằng App ngân hàng'}
          </p>
        </div>

        {/* Account Details Box */}
        <div className="w-full text-left bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs mb-4 space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Chủ tài khoản:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 uppercase">{currentAccountName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Ngân hàng:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{currentBankName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Số tài khoản:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">{currentAccountNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Nội dung CK:</span>
            <span className="font-bold text-sky-600 dark:text-sky-400 truncate max-w-[170px]">
              {transferMsg}
            </span>
          </div>
          {isReceiveMode && onOpenUpdateQr && (
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenUpdateQr();
                }}
                className="text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
              >
                <Pencil className="w-3 h-3" />
                <span>Thay đổi STK / Mã QR nhận tiền của tôi</span>
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="w-full flex gap-2">
          <button
            onClick={copyInfo}
            className="flex-1 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Đã sao chép!' : 'Sao chép số TK'}</span>
          </button>

          <button
            onClick={handleDone}
            disabled={settling}
            className={`flex-1 h-11 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all ${
              isReceiveMode
                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25'
                : 'bg-sky-700 hover:bg-sky-800 shadow-sky-700/25'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {settling
                ? 'Đang cập nhật...'
                : isReceiveMode
                ? 'Đã nhận đủ tiền'
                : 'Đã chuyển tiền'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
