import React, { useState } from 'react';
import { X, QrCode, Copy, CheckCircle2, ShieldCheck, ArrowDownCircle } from 'lucide-react';

interface SettleQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  payerName: string;
  amount: number;
  onSettledSuccess: () => void;
}

export const SettleQrModal: React.FC<SettleQrModalProps> = ({
  isOpen,
  onClose,
  payerName,
  amount,
  onSettledSuccess,
}) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const [settling, setSettling] = useState(false);

  const transferMsg = `TRIPMATE DANANG CHIA TIEN ${payerName.toUpperCase()}`;

  const copyInfo = () => {
    navigator.clipboard?.writeText?.(`0987654321 MB Bank ${amount} ${transferMsg}`);
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
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
        {/* Close */}
        <div className="w-full flex justify-end">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-300 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-300 flex items-center justify-center mb-2">
          <QrCode className="w-6 h-6" />
        </div>

        <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
          Chuyển khoản thanh toán
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Quyết toán cho <strong>{payerName}</strong>
        </p>

        <div className="my-3 px-4 py-2 rounded-2xl bg-sky-50 dark:bg-slate-800 border border-sky-100 dark:border-slate-700">
          <span className="text-2xl font-black text-sky-600 dark:text-sky-400">
            {amount.toLocaleString('vi-VN')} đ
          </span>
        </div>

        {/* Mock VietQR box */}
        <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-inner mb-3">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=vietqr-tripmate-${encodeURIComponent(
              payerName
            )}-${amount}`}
            alt="VietQR"
            className="w-44 h-44 rounded-lg object-contain mx-auto"
          />
          <p className="text-[10px] text-slate-400 mt-2 font-mono">VietQR Chuẩn NAPAS 247</p>
        </div>

        {/* Transfer details */}
        <div className="w-full text-left bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs mb-4 space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-400">Ngân hàng:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">MB Bank (Quân Đội)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Số tài khoản:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">0987 654 321</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Nội dung CK:</span>
            <span className="font-bold text-sky-600 dark:text-sky-400 truncate max-w-[170px]">
              {transferMsg}
            </span>
          </div>
        </div>

        {/* Actions */}
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
            className="flex-1 h-11 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-sky-700/25 transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{settling ? 'Đang cập nhật...' : 'Đã chuyển tiền'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
