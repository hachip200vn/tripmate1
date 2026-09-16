import React from 'react';
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, QrCode, Receipt, CheckCircle2, ChevronRight, Sparkles, ArrowRight, Calendar } from 'lucide-react';
import { ExpenseItem, Member } from '../types';

interface BudgetViewProps {
  expenses: ExpenseItem[];
  members: Member[];
  currentDestination?: string | null;
  onAddExpense: () => void;
  onOpenSettleQr: (payerName: string, amount: number) => void;
  onSwitchToItinerary?: () => void;
  onOpenAiPlanner?: () => void;
}

export const BudgetView: React.FC<BudgetViewProps> = ({
  expenses,
  members,
  currentDestination,
  onAddExpense,
  onOpenSettleQr,
  onSwitchToItinerary,
  onOpenAiPlanner,
}) => {
  // 1. EMPTY STATE: When no trip plan has been created/selected yet
  if (!currentDestination || !currentDestination.trim()) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 pb-20 text-center animate-in fade-in duration-200">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-lg shadow-emerald-500/10">
            <Wallet className="w-12 h-12 stroke-[1.75]" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-bold mb-3">
          <span>⚠️ Chưa có lịch trình được chọn</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-2">
          Quản lý ngân sách chuyến đi
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mb-6 leading-relaxed bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <strong className="text-sky-700 dark:text-sky-300 block mb-1">💡 Lưu ý:</strong>
          Hãy tạo lịch trình trước khi theo dõi ngân sách và chia tiền nhóm.
          <span className="block text-slate-500 dark:text-slate-400 text-xs mt-1">
            Bảng dự toán chi phí khách sạn, vé thắng cảnh và ăn uống sẽ tự động đồng bộ theo điểm đến bạn chọn!
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
          <button
            onClick={() => {
              if (onOpenAiPlanner) {
                onOpenAiPlanner();
              } else if (onSwitchToItinerary) {
                onSwitchToItinerary();
              }
            }}
            className="w-full h-12 rounded-2xl bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-600/25 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Tạo lịch trình ngay</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          {onSwitchToItinerary && (
            <button
              onClick={onSwitchToItinerary}
              className="w-full h-12 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Xem tab Lịch trình</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // 2. SYNCHRONIZED BUDGET VIEW
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const perPersonAvg = Math.round(totalSpent / (members.length || 1));
  const estimatedBudget = 22500000; // 4.5m * 5 members
  const percentUsed = Math.min(100, Math.round((totalSpent / estimatedBudget) * 100));

  return (
    <div className="flex flex-col w-full pb-28 animate-in fade-in duration-200">
      {/* Budget Summary Card */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 border border-slate-200/90 dark:border-slate-700 shadow-sm mb-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
              Quỹ chung:
            </span>
            <span className="text-xs font-black text-sky-600 dark:text-sky-400">
              {currentDestination}
            </span>
          </div>
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
            Quyết toán chia tiền nhóm ({currentDestination})
          </h3>
          <span className="text-xs text-slate-400 font-semibold">{members.length} thành viên</span>
        </div>

        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-4 border border-slate-200/90 dark:border-slate-700 shadow-sm space-y-3">
          {members.map((member) => {
            const diff = member.paidAmount - perPersonAvg;
            const isOwed = diff > 0;
            const isOwing = diff < 0;

            return (
              <div key={member.id} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-600 to-cyan-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    {member.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">
                      {member.name} {member.isHost && <span className="text-[10px] text-sky-600 font-bold">(Tôi)</span>}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Đã chi: {member.paidAmount.toLocaleString('vi-VN')} đ
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isOwed && (
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 justify-end">
                        <ArrowDownLeft className="w-3.5 h-3.5" />
                        +{(Math.abs(diff)).toLocaleString('vi-VN')} đ
                      </span>
                      <span className="text-[10px] text-slate-400">Được nhận lại</span>
                    </div>
                  )}

                  {isOwing && (
                    <div className="text-right">
                      <span className="text-xs font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1 justify-end">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        -{(Math.abs(diff)).toLocaleString('vi-VN')} đ
                      </span>
                      <span className="text-[10px] text-slate-400">Cần đóng thêm</span>
                    </div>
                  )}

                  {!isOwed && !isOwing && (
                    <span className="text-xs font-bold text-slate-400">Đã cân bằng</span>
                  )}

                  {isOwing && !member.isHost && (
                    <button
                      onClick={() => onOpenSettleQr(member.name, Math.abs(diff))}
                      className="p-2 rounded-xl bg-sky-50 dark:bg-slate-700 text-sky-600 dark:text-sky-400 hover:bg-sky-100 transition-colors"
                      title="Quét QR chuyển khoản thanh toán"
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

      {/* Expenses History List */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
            Lịch sử các khoản chi ({currentDestination})
          </h3>
          <span className="text-xs text-sky-600 dark:text-sky-400 font-bold">{expenses.length} khoản chi</span>
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
        className="w-full h-12 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20 active:scale-[0.98] transition-all"
      >
        <Plus className="w-4 h-4" />
        <span>Thêm khoản chi mới cho {currentDestination}</span>
      </button>
    </div>
  );
};
