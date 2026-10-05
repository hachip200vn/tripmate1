import React, { useState } from 'react';
import {
  Vote,
  Clock,
  CheckCircle2,
  Plus,
  Sparkles,
  MapPin,
  Pencil,
  Trash2,
  AlertTriangle,
  X,
  Crown,
  Trophy,
  ArrowRight
} from 'lucide-react';
import { VotePoll, TripRole } from '../types';

interface VotingViewProps {
  polls: VotePoll[];
  currentDestination?: string | null;
  onVoteOption: (pollId: string, optionId: string) => void;
  onCreatePoll: () => void;
  onEditPoll?: (poll: VotePoll) => void;
  onDeletePoll?: (pollId: string) => void;
  onSwitchToItinerary?: () => void;
  onOpenAiPlanner?: () => void;
  userRole?: TripRole;
  onEndPollEarly?: (pollId: string) => void;
}

export const VotingView: React.FC<VotingViewProps> = ({
  polls,
  currentDestination,
  onVoteOption,
  onCreatePoll,
  onEditPoll,
  onDeletePoll,
  onSwitchToItinerary,
  onOpenAiPlanner,
  userRole = 'Trưởng nhóm',
  onEndPollEarly,
}) => {
  const [pollToDelete, setPollToDelete] = useState<VotePoll | null>(null);
  // 1. EMPTY STATE: When no trip plan has been selected yet
  if (!currentDestination || !currentDestination.trim()) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 pb-20 text-center animate-in fade-in duration-200">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-sky-100 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/60 flex items-center justify-center text-sky-600 dark:text-sky-400 shadow-lg shadow-sky-500/10">
            <Vote className="w-12 h-12 stroke-[1.75]" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-bold mb-3">
          <span>⚠️ Chưa có lịch trình</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-2">
          Bình chọn cùng nhóm
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mb-6 leading-relaxed bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
          Hãy tạo lịch trình trước để cùng các thành viên bình chọn quán ăn, phương tiện và địa điểm phù hợp cho chuyến đi.
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
            className="w-full h-12 rounded-2xl bg-sky-700 hover:bg-sky-800 active:scale-[0.98] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-700/25 transition-all"
          >
            <span>Tạo lịch trình ngay</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. POLLS VIEW
  return (
    <div className="flex flex-col w-full pb-28 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Bình chọn nhóm
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Biểu quyết để chọn các điểm đến và hoạt động cho chuyến đi
          </p>
        </div>
        <button
          type="button"
          onClick={onCreatePoll}
          className="px-3.5 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo bình chọn</span>
        </button>
      </div>

      {/* Polls List */}
      <div className="space-y-4">
        {polls.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200/90 dark:border-slate-700 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto mb-3">
              <Vote className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
              Chưa có cuộc bình chọn nào
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
              Hãy tạo cuộc biểu quyết đầu tiên để mọi người cùng chọn quán ăn, khách sạn và phương tiện di chuyển phù hợp nhất!
            </p>
            <button
              type="button"
              onClick={onCreatePoll}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tạo cuộc bình chọn mới</span>
            </button>
          </div>
        ) : (
          polls.map((poll) => {
            const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
            const isClosed = poll.status === 'closed';
            const maxVotes = Math.max(...poll.options.map((o) => o.votes), 0);
            const winningOptId = poll.winningOptionId || (maxVotes > 0 ? poll.options.find((o) => o.votes === maxVotes)?.id : poll.options[0]?.id);

            return (
              <div
                key={poll.id}
                className={`bg-white dark:bg-slate-800/90 rounded-3xl p-5 border shadow-sm transition-shadow hover:shadow-md ${
                  isClosed
                    ? 'border-emerald-300/80 dark:border-emerald-800/60 ring-1 ring-emerald-500/20'
                    : 'border-slate-200/90 dark:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
                      {poll.category}
                    </span>
                    {isClosed ? (
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        Đã kết thúc
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        Hạn: {poll.deadline}
                      </span>
                    )}
                  </div>

                  {/* Edit & Delete Action Buttons */}
                  <div className="flex items-center gap-1">
                    {onEditPoll && !isClosed && (
                      <button
                        type="button"
                        onClick={() => onEditPoll(poll)}
                        className="px-2 py-1 rounded-xl text-slate-500 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-slate-700/80 flex items-center gap-1 text-xs font-bold transition-colors cursor-pointer"
                        title="Chỉnh sửa cuộc bình chọn này"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Sửa</span>
                      </button>
                    )}
                    {onDeletePoll && (
                      <button
                        type="button"
                        onClick={() => setPollToDelete(poll)}
                        className="px-2 py-1 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-1 text-xs font-bold transition-colors cursor-pointer"
                        title="Xóa cuộc bình chọn này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Xóa</span>
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 mb-1">
                  {poll.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  Tạo bởi <strong className="text-slate-700 dark:text-slate-300">{poll.creator}</strong> • Tổng cộng {totalVotes} lượt bình chọn
                </p>

                {/* Options */}
                <div className="space-y-3">
                  {poll.options.map((opt) => {
                    const percentage = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                    const isWinner = isClosed && opt.id === winningOptId;

                    return (
                      <div
                        key={opt.id}
                        onClick={() => {
                          if (!isClosed) {
                            onVoteOption(poll.id, opt.id);
                          }
                        }}
                        className={`relative overflow-hidden p-3.5 rounded-2xl border transition-all ${
                          isWinner
                            ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 ring-2 ring-emerald-500/30'
                            : opt.votedByMe
                            ? 'border-sky-500 bg-sky-50/70 dark:bg-sky-950/40 cursor-pointer'
                            : isClosed
                            ? 'border-slate-200 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-800/40 opacity-80'
                            : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 hover:bg-slate-100/70 cursor-pointer'
                        }`}
                      >
                        {/* Background fill progress bar */}
                        <div
                          className={`absolute left-0 top-0 bottom-0 transition-all duration-500 opacity-20 ${
                            isWinner ? 'bg-emerald-500' : opt.votedByMe ? 'bg-sky-500' : 'bg-slate-400'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />

                        <div className="relative z-10 flex items-center justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 truncate">
                                {opt.title}
                              </h4>
                              {isWinner ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-600 text-white font-bold text-[10px] shadow-2xs">
                                  <span>Được chọn nhiều nhất</span>
                                </span>
                              ) : opt.votedByMe ? (
                                <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                              ) : null}
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              {opt.location} • <span className="font-semibold text-sky-700 dark:text-sky-300">{opt.priceText}</span>
                            </p>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <span className={`text-sm font-black ${isWinner ? 'text-emerald-700 dark:text-emerald-400' : opt.votedByMe ? 'text-sky-600 dark:text-sky-400' : 'text-slate-700 dark:text-slate-300'}`}>
                              {opt.votes} phiếu
                            </span>
                            <span className="block text-[10px] text-slate-400 font-semibold">
                              {percentage}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Trưởng nhóm có thể kết thúc sớm */}
                {!isClosed && userRole === 'Trưởng nhóm' && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between gap-2.5">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Trưởng nhóm có thể kết thúc sớm
                    </span>

                    <button
                      type="button"
                      onClick={() => onEndPollEarly?.(poll.id)}
                      className="px-3.5 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs shadow-xs active:scale-95 transition-all cursor-pointer"
                    >
                      <span>Kết thúc bình chọn</span>
                    </button>
                  </div>
                )}

                {/* Khi đã kết thúc: Thông báo kết quả */}
                {isClosed && (
                  <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Đã chốt kết quả và thêm vào lịch trình
                    </span>
                    {onSwitchToItinerary && (
                      <button
                        type="button"
                        onClick={onSwitchToItinerary}
                        className="text-sky-600 dark:text-sky-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Xem Lịch trình</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Create Poll CTA Button */}
      {polls.length > 0 && (
        <div className="mt-5">
          <button
            onClick={onCreatePoll}
            className="w-full h-12 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo cuộc bình chọn mới cho {currentDestination}</span>
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {pollToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-base font-black text-slate-900 dark:text-slate-100 text-center mb-1.5">
              Xóa cuộc bình chọn?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 text-center mb-4 leading-relaxed">
              Bạn có chắc chắn muốn xóa cuộc bình chọn <strong className="text-slate-900 dark:text-slate-100 font-bold">"{pollToDelete.title}"</strong> không? Tất cả các phương án và phiếu bầu của thành viên sẽ bị xóa.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPollToDelete(null)}
                className="flex-1 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onDeletePoll) {
                    onDeletePoll(pollToDelete.id);
                  }
                  setPollToDelete(null);
                }}
                className="flex-1 h-10 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm shadow-rose-600/30 flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xác nhận xóa</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
