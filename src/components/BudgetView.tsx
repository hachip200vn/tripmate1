import React, { useState } from 'react';
import {
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Receipt,
  CheckCircle2,
  Clock,
  Pencil,
  Trash2,
  X,
  UserMinus,
  Check,
  Sparkles,
  Calendar,
  AlertCircle,
  FileText,
  Filter
} from 'lucide-react';
import { ExpenseItem, Member, UserBankQr } from '../types';
import { formatCurrency } from '../utils/format';

interface BudgetViewProps {
  expenses: ExpenseItem[];
  members: Member[];
  currentDestination?: string | null;
  userBankQr?: UserBankQr;
  onOpenUpdateQr?: () => void;
  onAddExpense: () => void;
  onOpenSettleQr?: (payerName: string, amount: number, mode?: 'pay' | 'receive') => void;
  onUpdateExpense?: (updatedExpense: ExpenseItem) => void;
  onDeleteExpense?: (expenseId: string) => void;
  onSwitchToItinerary?: () => void;
  onOpenAiPlanner?: () => void;
}

export const BudgetView: React.FC<BudgetViewProps> = ({
  expenses,
  members,
  currentDestination,
  userBankQr,
  onOpenUpdateQr,
  onAddExpense,
  onOpenSettleQr,
  onUpdateExpense,
  onDeleteExpense,
  onSwitchToItinerary,
  onOpenAiPlanner,
}) => {
  // Modal states
  const [selectedExpense, setSelectedExpense] = useState<ExpenseItem | null>(null);
  const [editingExpense, setEditingExpense] = useState<ExpenseItem | null>(null);
  const [filterSettled, setFilterSettled] = useState<'all' | 'settled' | 'unsettled'>('all');

  // Edit form state
  const [editTitle, setEditTitle] = useState('');
  const [editAmount, setEditAmount] = useState<number>(0);
  const [editPaidBy, setEditPaidBy] = useState('');
  const [editExcluded, setEditExcluded] = useState<string[]>([]);
  const [editIsSettled, setEditIsSettled] = useState<boolean>(false);
  const [editNotes, setEditNotes] = useState('');

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
          </button>
        </div>
      </div>
    );
  }

  // 2. SYNCHRONIZED BUDGET VIEW
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const perPersonAvg = Math.round(totalSpent / (members.length || 1));
  const estimatedBudget = 22500000; // 4.5m * 5 members
  const percentUsed = Math.min(100, Math.round((totalSpent / estimatedBudget) * 100));

  // Filtered expenses
  const displayedExpenses = expenses.filter((e) => {
    if (filterSettled === 'settled') return !!e.isSettled;
    if (filterSettled === 'unsettled') return !e.isSettled;
    return true;
  });

  // Open Edit Modal
  const handleStartEdit = (item: ExpenseItem) => {
    setEditingExpense(item);
    setEditTitle(item.title);
    setEditAmount(item.amount);
    setEditPaidBy(item.paidByName);
    setEditExcluded(item.excludedMembers || []);
    setEditIsSettled(!!item.isSettled);
    setEditNotes(item.notes || '');
    setSelectedExpense(null);
  };

  // Toggle Excluded in edit
  const toggleEditExcluded = (name: string) => {
    setEditExcluded((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  // Save Edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExpense || !editTitle.trim() || editAmount <= 0) return;

    const activeCount = Math.max(1, members.length - editExcluded.length);
    const updated: ExpenseItem = {
      ...editingExpense,
      title: editTitle.trim(),
      amount: editAmount,
      paidByName: editPaidBy,
      paidByAvatar: editPaidBy.slice(0, 2).toUpperCase(),
      splitWithCount: activeCount,
      excludedMembers: editExcluded,
      isSettled: editIsSettled,
      notes: editNotes.trim() || undefined,
    };

    onUpdateExpense?.(updated);
    setEditingExpense(null);
  };

  // Quick toggle settlement status
  const handleToggleSettled = (item: ExpenseItem) => {
    const updated: ExpenseItem = {
      ...item,
      isSettled: !item.isSettled,
    };
    onUpdateExpense?.(updated);
    if (selectedExpense?.id === item.id) {
      setSelectedExpense(updated);
    }
  };

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
            {formatCurrency(totalSpent)} <span className="text-lg font-bold text-sky-600">đ</span>
          </span>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
            <span>Đã chi {percentUsed}% ngân sách dự kiến</span>
            {/* UPDATED: "Mục tiêu" -> "Tổng ngân sách" */}
            <span className="font-bold text-slate-700 dark:text-slate-300">
              Tổng ngân sách: {formatCurrency(estimatedBudget)} đ
            </span>
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
              ~{formatCurrency(perPersonAvg)} đ
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
          <div>
            <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
              Quyết toán chia tiền nhóm ({currentDestination})
            </h3>
            <p className="text-[11px] text-slate-400">
              Bảng cân đối thu chi và số tiền cần đóng/nhận của từng thành viên
            </p>
          </div>
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
                      Đã chi: {formatCurrency(member.paidAmount)} đ
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Status 1: ĐƯỢC NHẬN LẠI TIỀN */}
                  {isOwed && (
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 justify-end">
                        <ArrowDownLeft className="w-3.5 h-3.5" />
                        +{formatCurrency(Math.abs(diff))} đ
                      </span>
                      <span className="text-[10px] text-emerald-600/80 font-medium">Được nhận lại</span>
                    </div>
                  )}

                  {/* Status 2: CẦN ĐÓNG THÊM */}
                  {isOwing && (
                    <div className="text-right">
                      <span className="text-xs font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1 justify-end">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        -{formatCurrency(Math.abs(diff))} đ
                      </span>
                      <span className="text-[10px] text-slate-400">Cần đóng thêm</span>
                    </div>
                  )}

                  {!isOwed && !isOwing && (
                    <span className="text-xs font-bold text-slate-400">Đã cân bằng</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expenses History List Section with Edit, Details & Settlement Status */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
              Lịch sử các khoản chi ({currentDestination})
            </h3>
            <p className="text-[11px] text-slate-400">
              Chạm vào bất kỳ khoản chi nào để xem chi tiết hoặc chỉnh sửa
            </p>
          </div>
          <span className="text-xs text-sky-600 dark:text-sky-400 font-bold">
            {expenses.length} khoản
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 mb-3 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setFilterSettled('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filterSettled === 'all'
                ? 'bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            Tất cả ({expenses.length})
          </button>
          <button
            onClick={() => setFilterSettled('unsettled')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
              filterSettled === 'unsettled'
                ? 'bg-amber-600 text-white'
                : 'bg-white dark:bg-slate-800 text-amber-700 dark:text-amber-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>Chưa quyết toán ({expenses.filter((e) => !e.isSettled).length})</span>
          </button>
          <button
            onClick={() => setFilterSettled('settled')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
              filterSettled === 'settled'
                ? 'bg-emerald-600 text-white'
                : 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>Đã quyết toán ({expenses.filter((e) => !!e.isSettled).length})</span>
          </button>
        </div>

        {displayedExpenses.length === 0 ? (
          <div className="p-6 text-center bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-400">Không có khoản chi nào trong mục này.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {displayedExpenses.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedExpense(item)}
                className="bg-white dark:bg-slate-800/90 rounded-2xl p-3.5 border border-slate-200/90 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-slate-700 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 truncate group-hover:text-sky-600 dark:group-hover:text-sky-400">
                        {item.title}
                      </h4>
                    </div>

                    <p className="text-[11px] text-slate-400 mt-0.5 truncate flex items-center gap-1.5">
                      <span>{item.paidByName} chi</span>
                      <span>•</span>
                      <span>{item.date}</span>
                      <span>•</span>
                      <span>Chia {item.splitWithCount} người</span>
                    </p>

                    {/* Excluded Tag & Notes */}
                    <div className="flex items-center gap-2 mt-1">
                      {/* Settlement Status Badge */}
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black ${
                          item.isSettled
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                            : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                        }`}
                      >
                        {item.isSettled ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" />
                            Đã quyết toán
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3" />
                            Chưa quyết toán
                          </>
                        )}
                      </span>

                      {item.excludedMembers && item.excludedMembers.length > 0 && (
                        <span className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold">
                          Miễn trừ: {item.excludedMembers.length} người
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 flex flex-col items-end">
                  <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                    {formatCurrency(item.amount)} đ
                  </span>
                  <span className="text-[10px] text-slate-400">
                    ~{formatCurrency(Math.round(item.amount / item.splitWithCount))} đ/người
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartEdit(item);
                    }}
                    className="mt-1 p-1 text-slate-400 hover:text-sky-600 text-[10px] font-bold flex items-center gap-0.5"
                    title="Chỉnh sửa khoản chi"
                  >
                    <Pencil className="w-3 h-3" />
                    <span>Sửa</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Expense CTA */}
      <button
        onClick={onAddExpense}
        className="w-full h-12 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20 active:scale-[0.98] transition-all"
      >
        <Plus className="w-4 h-4" />
        <span>Thêm khoản chi mới cho {currentDestination}</span>
      </button>

      {/* DETAIL MODAL FOR EXPENSE (User requested: xem chi tiết khoản chi & trạng thái quyết toán) */}
      {selectedExpense && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col animate-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                    Chi tiết khoản chi
                  </h3>
                  <p className="text-[11px] text-slate-400">ID: {selectedExpense.id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedExpense(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-200 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Info Cards */}
            <div className="space-y-3 mb-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-sky-50/80 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700">
                <span className="text-[11px] text-slate-400 block mb-0.5">Tên hóa đơn / Khoản chi:</span>
                <h4 className="text-base font-black text-slate-900 dark:text-slate-100">
                  {selectedExpense.title}
                </h4>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-2xl font-black text-sky-700 dark:text-sky-300">
                    {formatCurrency(selectedExpense.amount)} đ
                  </span>
                  <span className="text-[11px] text-slate-500">
                    ~{formatCurrency(Math.round(selectedExpense.amount / selectedExpense.splitWithCount))} đ/người
                  </span>
                </div>
              </div>

              {/* Status Row */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                <div>
                  <span className="text-[11px] text-slate-400 block">Trạng thái quyết toán:</span>
                  <span
                    className={`font-black flex items-center gap-1 mt-0.5 ${
                      selectedExpense.isSettled
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {selectedExpense.isSettled ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Đã quyết toán hoàn tất
                      </>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5" />
                        Chưa quyết toán (đang chờ thu/chia)
                      </>
                    )}
                  </span>
                </div>

                <button
                  onClick={() => handleToggleSettled(selectedExpense)}
                  className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 text-[11px] font-bold hover:bg-slate-100 transition-colors shadow-xs"
                >
                  {selectedExpense.isSettled ? 'Đánh dấu chưa chia' : 'Đánh dấu đã xong'}
                </button>
              </div>

              {/* Details breakdown */}
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Người đứng ra trả:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedExpense.paidByName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Ngày ghi nhận:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedExpense.date}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Số người chia:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {selectedExpense.splitWithCount} người
                  </span>
                </div>

                {selectedExpense.excludedMembers && selectedExpense.excludedMembers.length > 0 && (
                  <div className="pt-1.5 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-rose-500 font-bold block mb-0.5">
                      Thành viên được miễn trừ ({selectedExpense.excludedMembers.length}):
                    </span>
                    <span className="text-slate-600 dark:text-slate-300">
                      {selectedExpense.excludedMembers.join(', ')}
                    </span>
                  </div>
                )}

                {selectedExpense.notes && (
                  <div className="pt-1.5 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-slate-400 block mb-0.5">Ghi chú:</span>
                    <p className="text-slate-700 dark:text-slate-300 italic">
                      "{selectedExpense.notes}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleStartEdit(selectedExpense)}
                className="flex-1 h-11 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Chỉnh sửa khoản chi</span>
              </button>

              {onDeleteExpense && (
                <button
                  onClick={() => {
                    if (window.confirm(`Xác nhận xóa khoản chi "${selectedExpense.title}"?`)) {
                      onDeleteExpense(selectedExpense.id);
                      setSelectedExpense(null);
                    }
                  }}
                  className="w-11 h-11 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 flex items-center justify-center transition-colors"
                  title="Xóa khoản chi"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* EDIT EXPENSE MODAL (User requested: edit khoản chi) */}
      {editingExpense && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh] overflow-y-auto animate-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center">
                  <Pencil className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                    Chỉnh sửa khoản chi
                  </h3>
                  <p className="text-[11px] text-slate-400">Cập nhật số tiền, người trả & người miễn trừ</p>
                </div>
              </div>
              <button
                onClick={() => setEditingExpense(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5">
              {/* Title */}
              <div>
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  Tên khoản chi <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                />
              </div>

              {/* Amount */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Số tiền (VNĐ) <span className="text-rose-500">*</span>
                  </label>
                  {editAmount > 0 && (
                    <span className="text-xs font-black text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded-lg border border-sky-200 dark:border-sky-800">
                      = {formatCurrency(editAmount)} đ
                    </span>
                  )}
                </div>
                <input
                  type="number"
                  required
                  step="10000"
                  placeholder="VD: 350000"
                  value={editAmount}
                  onChange={(e) => setEditAmount(Number(e.target.value))}
                  className="w-full h-11 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500 font-extrabold"
                />
              </div>

              {/* Paid By */}
              <div>
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  Người đứng ra trả
                </label>
                <select
                  value={editPaidBy}
                  onChange={(e) => setEditPaidBy(e.target.value)}
                  className="w-full h-11 px-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 outline-none font-bold"
                >
                  {members.map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name} {m.isHost ? '(Tôi)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* EXCLUDED MEMBERS EDIT */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <UserMinus className="w-3.5 h-3.5 text-rose-500" />
                    <span>Loại trừ ai không cần trả tiền</span>
                  </label>
                  <span className="text-[10px] text-slate-400">
                    {editExcluded.length > 0
                      ? `Miễn trừ ${editExcluded.length} người`
                      : 'Chia đều tất cả'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {members.map((m) => {
                    const isExcluded = editExcluded.includes(m.name);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => toggleEditExcluded(m.name)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                          isExcluded
                            ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 line-through opacity-85'
                            : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:border-sky-400'
                        }`}
                      >
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
              </div>

              {/* Settlement Status Toggle in Edit */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                    Trạng thái quyết toán
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {editIsSettled ? 'Khoản chi này đã thanh toán xong' : 'Khoản chi này đang chờ quyết toán'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setEditIsSettled(!editIsSettled)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors ${
                    editIsSettled
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300'
                  }`}
                >
                  {editIsSettled ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                  <span>{editIsSettled ? 'Đã quyết toán' : 'Chưa quyết toán'}</span>
                </button>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  Ghi chú
                </label>
                <input
                  type="text"
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Ghi chú chi tiết..."
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 outline-none"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingExpense(null)}
                  className="flex-1 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
