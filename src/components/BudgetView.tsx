import React, { useState } from 'react';
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, QrCode, Receipt, CheckCircle2, ChevronRight } from 'lucide-react';
import { ExpenseItem, Member } from '../types';

interface BudgetViewProps {
  expenses: ExpenseItem[];
  members: Member[];
  onAddExpense: () => void;
  onOpenSettleQr: (payerName: string, amount: number) => void;
}

export const BudgetView: React.FC<BudgetViewProps> = ({
  expenses,
  members,
  onAddExpense,
  onOpenSettleQr,
}) => {
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const perPersonAvg = Math.round(totalSpent / (members.length || 1));
  const estimatedBudget = 22500000; // 4.5m * 5 members
  const percentUsed = Math.min(100, Math.round((totalSpent / estimatedBudget) * 100));

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Budget Summary Card */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 border border-slate-200/90 dark:border-slate-700 shadow-sm mb-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
            Quỹ chung chuyến đi
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 text-xs font-bold">
            Trong tầm kiểm soát
          </span>
        </div>

        <div className="mb-4">
          <span className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            {totalSpent.toLocaleString('vi-VN')} <span className="text-lg font-bold text-sky-600">đ</span>
          </span>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
            <span>Đã chi {percentUsed}% ngân sách dự kiến</span>
            <span>Mục tiêu: {estimatedBudget.toLocaleString('vi-VN')} đ</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                percentUsed > 85 ? 'bg-orange-500' : 'bg-sky-600'
              }`}
              style={{ width: `${percentUsed}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-700/80">
          <div className="p-3 rounded-2xl bg-sky-50 dark:bg-slate-700/50">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Trung bình / người</span>
            <p className="text-sm font-black text-sky-700 dark:text-sky-300 mt-0.5">
              ~{perPersonAvg.toLocaleString('vi-VN')} đ
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/50">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Số khoản chi đã ghi</span>
            <p className="text-sm font-black text-slate-800 dark:text-slate-200 mt-0.5">
              {expenses.length} hóa đơn
            </p>
          </div>
        </div>
      </div>

      {/* Settle Up Group Section */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
            Quyết toán chia tiền nhóm
          </h3>
          <span className="text-xs text-slate-400 font-semibold">5 thành viên</span>
        </div>

        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-4 border border-slate-200/90 dark:border-slate-700 shadow-sm space-y-3">
          {members.map((member) => {
            const diff = member.paidAmount - perPersonAvg;
            const isOwed = diff > 0;
            const isOwing = diff < 0;

            return (
              <div key={member.id} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-sky-100 dark:bg-slate-700 text-sky-800 dark:text-sky-200 flex items-center justify-center font-bold text-xs">
                    {member.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">
                      {member.name} {member.isHost && <span className="text-[10px] text-sky-600">(Tôi)</span>}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Đã chi: {member.paidAmount.toLocaleString('vi-VN')} đ
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    {isOwed ? (
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">
                        +{(Math.abs(diff)).toLocaleString('vi-VN')} đ
                      </span>
                    ) : isOwing ? (
                      <span className="text-xs font-bold text-orange-600 dark:text-orange-400 block">
                        -{(Math.abs(diff)).toLocaleString('vi-VN')} đ
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400 block">0 đ</span>
                    )}
                    <span className="text-[10px] text-slate-400">
                      {isOwed ? 'Được nhận lại' : isOwing ? 'Cần chuyển khoản' : 'Đã cân bằng'}
                    </span>
                  </div>

                  {isOwed && !member.isHost && (
                    <button
                      onClick={() => onOpenSettleQr(member.name, Math.abs(diff))}
                      className="p-2 rounded-xl bg-sky-50 dark:bg-slate-700 text-sky-600 dark:text-sky-400 hover:bg-sky-100 transition-colors"
                      title="Quét QR chuyển khoản"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expenses History */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
            Lịch sử các khoản chi gần đây
          </h3>
          <span className="text-xs text-sky-600 dark:text-sky-400 font-bold">Xem báo cáo PDF</span>
        </div>

        <div className="space-y-2.5">
          {expenses.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-800/90 rounded-2xl p-3.5 border border-slate-200/90 dark:border-slate-700 shadow-sm flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-slate-700 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0">
                  <Receipt className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                    {item.paidByName} chi • {item.date} • Chia cho {item.splitWithCount} người
                  </p>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                  {item.amount.toLocaleString('vi-VN')} đ
                </span>
                <span className="block text-[10px] text-slate-400">
                  ~{(Math.round(item.amount / item.splitWithCount)).toLocaleString('vi-VN')} đ/người
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Expense CTA */}
      <button
        onClick={onAddExpense}
        className="w-full h-13 rounded-2xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-700/20 active:scale-[0.98] transition-all"
      >
        <Plus className="w-5 h-5" />
        <span>Thêm khoản chi mới</span>
      </button>
    </div>
  );
};
