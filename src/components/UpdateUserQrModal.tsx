import React, { useState, useRef } from 'react';
import {
  X,
  QrCode,
  Building2,
  CreditCard,
  User,
  Upload,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Eye,
  Trash2,
} from 'lucide-react';
import { UserBankQr } from '../types';

interface UpdateUserQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentQrData: UserBankQr;
  onSaveQrData: (data: UserBankQr) => void;
}

export const POPULAR_BANKS = [
  { id: 'MB', name: 'MB Bank', fullName: 'Ngân hàng Quân Đội (MB)', code: '970422' },
  { id: 'VCB', name: 'Vietcombank', fullName: 'Ngoại thương VN (VCB)', code: '970436' },
  { id: 'TCB', name: 'Techcombank', fullName: 'Kỹ thương VN (TCB)', code: '970407' },
  { id: 'ICB', name: 'VietinBank', fullName: 'Công thương VN (VietinBank)', code: '970415' },
  { id: 'BIDV', name: 'BIDV', fullName: 'Đầu tư & Phát triển VN', code: '970418' },
  { id: 'ACB', name: 'ACB', fullName: 'Ngân hàng Á Châu (ACB)', code: '970416' },
  { id: 'VPB', name: 'VPBank', fullName: 'Việt Nam Thịnh Vượng (VPBank)', code: '970432' },
  { id: 'TPB', name: 'TPBank', fullName: 'Tiên Phong Bank (TPBank)', code: '970423' },
  { id: 'VIB', name: 'VIB', fullName: 'Quốc tế (VIB)', code: '970441' },
  { id: 'MOMO', name: 'MoMo', fullName: 'Ví điện tử MoMo', code: 'MOMO' },
];

export const UpdateUserQrModal: React.FC<UpdateUserQrModalProps> = ({
  isOpen,
  onClose,
  currentQrData,
  onSaveQrData,
}) => {
  if (!isOpen) return null;

  const [bankId, setBankId] = useState(currentQrData.bankId || 'MB');
  const [bankName, setBankName] = useState(currentQrData.bankName || 'MB Bank');
  const [accountNumber, setAccountNumber] = useState(currentQrData.accountNumber || '');
  const [accountName, setAccountName] = useState(currentQrData.accountName || '');
  const [customQrUrl, setCustomQrUrl] = useState<string | undefined>(currentQrData.customQrUrl);
  const [transferSyntax, setTransferSyntax] = useState(
    currentQrData.transferSyntax || 'TRIPMATE CHIA TIEN'
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectBank = (bank: typeof POPULAR_BANKS[0]) => {
    setBankId(bank.id);
    setBankName(bank.name);
    if (errorMsg) setErrorMsg(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Vui lòng chọn file hình ảnh (PNG, JPG, JPEG)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setCustomQrUrl(result);
      if (errorMsg) setErrorMsg(null);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveCustomQr = () => {
    setCustomQrUrl(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!accountNumber.trim()) {
      setErrorMsg('Vui lòng nhập Số tài khoản ngân hàng hoặc số điện thoại ví!');
      return;
    }

    if (!accountName.trim()) {
      setErrorMsg('Vui lòng nhập Tên chủ tài khoản!');
      return;
    }

    const updatedData: UserBankQr = {
      bankId,
      bankName,
      accountNumber: accountNumber.trim(),
      accountName: accountName.trim().toUpperCase(),
      customQrUrl,
      transferSyntax: transferSyntax.trim() || 'TRIPMATE CHIA TIEN',
    };

    onSaveQrData(updatedData);
    onClose();
  };

  // Live QR preview url: Use custom uploaded QR if exists, else standard VietQR / QRServer
  const livePreviewQr = customQrUrl
    ? customQrUrl
    : accountNumber
    ? `https://img.vietqr.io/image/${bankId}-${accountNumber.trim()}-compact2.png?accountName=${encodeURIComponent(
        accountName || 'CHU TAI KHOAN'
      )}&addInfo=${encodeURIComponent(transferSyntax)}`
    : `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=tripmate-sample-qr`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[92vh] overflow-y-auto flex flex-col animate-in slide-in-from-bottom-4">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-extrabold uppercase tracking-wider mb-1">
              <QrCode className="w-3 h-3 text-emerald-600" />
              <span>Ngân sách & Quyết toán</span>
            </div>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">
              Cập nhật mã QR nhận tiền
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Bank Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-sky-600" />
              <span>Chọn ngân hàng thụ hưởng</span>
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {POPULAR_BANKS.map((b) => (
                <button
                  type="button"
                  key={b.id}
                  onClick={() => handleSelectBank(b)}
                  className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                    bankId === b.id
                      ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 ring-1 ring-sky-500 font-black text-sky-700 dark:text-sky-300'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300 font-semibold'
                  }`}
                >
                  <span className="text-[11px] block truncate">{b.name}</span>
                </button>
              ))}
            </div>
            <span className="text-[11px] text-slate-400 font-medium block">
              Đã chọn: <strong className="text-slate-700 dark:text-slate-200">{bankName}</strong>
            </span>
          </div>

          {/* 2. Account Number & Name */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1">
                <CreditCard className="w-3.5 h-3.5 text-sky-600" />
                <span>Số tài khoản (hoặc SĐT MoMo)</span>
                <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => {
                  setAccountNumber(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder="VD: 0987654321 hoặc 1903..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1">
                <User className="w-3.5 h-3.5 text-sky-600" />
                <span>Tên chủ tài khoản (In hoa không dấu)</span>
                <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={accountName}
                onChange={(e) => {
                  setAccountName(e.target.value.toUpperCase());
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder="VD: NGUYEN VIET HUNG"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-black uppercase text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>
          </div>

          {/* 3. Custom QR Upload or Auto VietQR */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ảnh mã QR của bạn (Tùy chọn)</span>
              </label>
              {customQrUrl && (
                <button
                  type="button"
                  onClick={handleRemoveCustomQr}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Dùng VietQR chuẩn</span>
                </button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-2.5 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-emerald-400 bg-slate-50/50 dark:bg-slate-800/40 text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4 text-emerald-600" />
              <span>
                {customQrUrl ? 'Thay đổi ảnh QR đã tải lên' : 'Tải ảnh QR từ thư viện máy của bạn'}
              </span>
            </button>
            <p className="text-[10px] text-slate-400">
              {customQrUrl
                ? '✅ Đang sử dụng ảnh QR cá nhân của bạn'
                : '💡 Nếu không tải ảnh, hệ thống sẽ tự động tạo mã VietQR Napas 24/7 chuẩn từ STK của bạn.'}
            </p>
          </div>

          {/* 4. Live Preview Box */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-2">
              <Eye className="w-3.5 h-3.5 text-sky-600" />
              Xem trước mã QR mà nhóm sẽ quét
            </span>

            <div className="p-3 bg-white rounded-xl shadow-xs border border-slate-200 inline-block">
              <img
                src={livePreviewQr}
                alt="Xem trước QR"
                className="w-32 h-32 object-contain mx-auto"
                onError={(e) => {
                  // Fallback if image generation is not reachable
                  (e.target as HTMLImageElement).src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=tripmate-${accountNumber}`;
                }}
              />
            </div>

            <div className="mt-2 text-xs">
              <p className="font-black text-slate-800 dark:text-slate-200">
                {accountName || 'TÊN CHỦ TÀI KHOẢN'}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                {bankName} • {accountNumber || 'Số tài khoản'}
              </p>
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
              className="flex-2 h-11 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/25 active:scale-[0.98] transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              <span>Lưu mã QR nhận tiền</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
