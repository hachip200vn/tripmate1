import React, { useState } from 'react';
import { X, Receipt, Users, Plus, Check, UserMinus, ShieldAlert } from 'lucide-react';
import { Member } from '../types';
import { formatCurrency } from '../utils/format';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: Member[];
  onAddExpense: (expense: {
    title: string;
    amount: number;
    paidByName: string;
    splitWithCount: number;
    excludedMembers?: string[];
    notes?: string;
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
  const [excludedMembers, setExcludedMembers] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  // Auto calculate split count based on excluded members
  const activeMembersCount = Math.max(1, members.length - excludedMembers.length);
  const [customSplitCount, setCustomSplitCount] = useState<number>(activeMembersCount);

  // Toggle excluded member
  const toggleExcludeMember = (memberName: string) => {
    setExcludedMembers((prev) => {
      const next = prev.includes(memberName)
        ? prev.filter((name) => name !== memberName)
        : [...prev, memberName];
      // update split count
      const nextCount = Math.max(1, members.length - next.length);
      setCustomSplitCount(nextCount);
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || amount <= 0) return;

    onAddExpense({
      title: title.trim(),
      amount,
      paidByName,
      splitWithCount: customSplitCount,
      excludedMembers,
      notes: notes.trim() || undefined,
    });
    onClose();
  };

  const perPersonCost = Math.round(amount / customSplitCount);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh] overflow-y-auto">
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
              <p className="text-[11px] text-slate-400">Ghi nhận hóa đơn & tự động chia tiền</p>
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
          {/* Title */}
          <div>
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
              Tên khoản chi <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="VD: Cà phê Cộng Phố Cổ, Thuê cano, Ăn hải sản..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500 font-medium"
            />
          </div>

          {/* Amount */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Số tiền (VNĐ) <span className="text-rose-500">*</span>
              </label>
              {amount > 0 && (
                <span className="text-xs font-black text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded-lg border border-sky-200 dark:border-sky-800">
                  = {formatCurrency(amount)} đ
                </span>
              )}
            </div>
            <input
              type="number"
              required
              step="10000"
              placeholder="VD: 350000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500 font-extrabold"
            />
          </div>

          {/* Paid by & Split count */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                Người trả tiền
              </label>
              <select
                value={paidByName}
                onChange={(e) => setPaidByName(e.target.value)}
                className="w-full h-11 px-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 outline-none font-bold"
              >
                {members.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name} {m.isHost ? '(Tôi)' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                Số người chia tiền
              </label>
              <div className="flex items-center h-11 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-2 justify-between">
                <button
                  type="button"
                  onClick={() => setCustomSplitCount(Math.max(1, customSplitCount - 1))}
                  className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-200"
                >
                  -
                </button>
                <span className="font-black text-xs text-slate-800 dark:text-slate-200">
                  {customSplitCount} người
                </span>
                <button
                  type="button"
                  onClick={() => setCustomSplitCount(Math.min(members.length, customSplitCount + 1))}
                  className="w-7 h-7 rounded-lg bg-sky-600 text-white font-bold hover:bg-sky-500"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* EXCLUDE MEMBERS SECTION (User explicitly requested) */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <UserMinus className="w-3.5 h-3.5 text-rose-500" />
                <span>Loại trừ ai không cần trả tiền</span>
              </label>
              <span className="text-[10px] text-slate-400">
                {excludedMembers.length > 0
                  ? `Đã loại trừ ${excludedMembers.length} người`
                  : 'Không có (chia đều)'}
              </span>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2.5">
              Chạm vào thành viên không tham gia hoạt động/món ăn này để miễn trừ:
            </p>

            <div className="flex flex-wrap gap-1.5">
              {members.map((m) => {
                const isExcluded = excludedMembers.includes(m.name);
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => toggleExcludeMember(m.name)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isExcluded
                        ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 line-through opacity-85'
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:border-sky-400'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-600 text-[10px] flex items-center justify-center font-bold">
                      {m.initials}
                    </span>
                    <span>{m.name}</span>
                    {isExcluded ? (
                      <span className="text-[10px] no-underline text-rose-600 font-black">Miễn trừ</span>
                    ) : (
                      <Check className="w-3 h-3 text-emerald-500" />
                    )}
                  </button>
                );
              })}
            </div>

            {excludedMembers.length > 0 && (
              <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700 text-[11px] text-rose-600 dark:text-rose-400 flex items-center gap-1">
                <span>Miễn trừ: {excludedMembers.join(', ')}</span>
              </div>
            )}
          </div>

          {/* Notes optional */}
          <div>
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
              Ghi chú thêm (tùy chọn)
            </label>
            <input
              type="text"
              placeholder="VD: Đã bao gồm 10% VAT và phí phục vụ..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 outline-none"
            />
          </div>

          {/* Split summary preview */}
          <div className="p-3 rounded-2xl bg-sky-50 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-500 block text-[11px]">Mỗi người cần trả:</span>
              <span className="text-[10px] text-sky-600 font-bold">
                (Chia cho {customSplitCount} người tham gia)
              </span>
            </div>
            <span className="font-extrabold text-base text-sky-700 dark:text-sky-300">
              ~{formatCurrency(perPersonCost)} đ
            </span>
          </div>

          {/* Submit CTA */}
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
