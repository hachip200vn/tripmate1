import React, { useState } from 'react';
import { X, Receipt, Users, Plus, Check } from 'lucide-react';
import { Member } from '../types';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: Member[];
  onAddExpense: (expense: {
    title: string;
    amount: number;
    paidByName: string;
    splitWithCount: number;
  }) => void;
}

export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  isOpen,
  onClose,
  members,
  onAddExpense,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState<number>(350000);
  const [paidByName, setPaidByName] = useState(members[0]?.name || 'Nguyễn Việt Hùng');
  const [splitCount, setSplitCount] = useState<number>(members.length || 5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || amount <= 0) return;

    onAddExpense({
      title: title.trim(),
      amount,
      paidByName,
      splitWithCount: splitCount,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-300 flex items-center justify-center">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                Thêm khoản chi mới
              </h3>
              <p className="text-[11px] text-slate-400">Ghi nhận hóa đơn chuyến đi</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-300 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
              Tên khoản chi <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="VD: Cà phê Cộng Phố Cổ, Thuê cano..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500 font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
              Số tiền (VNĐ) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              required
              step="10000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500 font-extrabold"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                Người trả tiền
              </label>
              <select
                value={paidByName}
                onChange={(e) => setPaidByName(e.target.value)}
                className="w-full h-11 px-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 outline-none font-bold"
              >
                {members.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                Chia cho (người)
              </label>
              <div className="flex items-center h-11 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-2 justify-between">
                <button
                  type="button"
                  onClick={() => setSplitCount(Math.max(1, splitCount - 1))}
                  className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold"
                >
                  -
                </button>
                <span className="font-black text-xs text-slate-800 dark:text-slate-200">
                  {splitCount} người
                </span>
                <button
                  type="button"
                  onClick={() => setSplitCount(Math.min(members.length, splitCount + 1))}
                  className="w-7 h-7 rounded-lg bg-sky-600 text-white font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-sky-50 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 flex items-center justify-between text-xs">
            <span className="text-slate-500">Mỗi người chịu:</span>
            <span className="font-extrabold text-sky-700 dark:text-sky-300">
              ~{(Math.round(amount / splitCount)).toLocaleString('vi-VN')} đ
            </span>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs shadow-md shadow-sky-700/25 flex items-center justify-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Ghi nhận khoản chi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
