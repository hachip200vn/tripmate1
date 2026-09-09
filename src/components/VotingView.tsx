import React, { useState } from 'react';
import { Vote, Clock, CheckCircle2, Plus, Sparkles, MapPin } from 'lucide-react';
import { VotePoll } from '../types';

interface VotingViewProps {
  polls: VotePoll[];
  onVoteOption: (pollId: string, optionId: string) => void;
  onCreatePoll: () => void;
}

export const VotingView: React.FC<VotingViewProps> = ({
  polls,
  onVoteOption,
  onCreatePoll,
}) => {
  return (
    <div className="flex flex-col w-full pb-24">
      {/* Banner */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-sky-600 to-cyan-700 text-white shadow-md mb-5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs uppercase font-bold tracking-wider text-sky-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Biểu quyết tập thể
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold">
            {polls.length} bình chọn
          </span>
        </div>
        <h2 className="text-xl font-black tracking-tight">Cùng quyết định hành trình</h2>
        <p className="text-xs text-sky-100 mt-1">
          Bỏ phiếu công khai để chọn nhà hàng, điểm tham quan và giờ khởi hành phù hợp với tất cả thành viên.
        </p>
      </div>

      {/* Polls List */}
      <div className="space-y-4">
        {polls.map((poll) => {
          const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

          return (
            <div
              key={poll.id}
              className="bg-white dark:bg-slate-800/90 rounded-3xl p-5 border border-slate-200/90 dark:border-slate-700 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300">
                  {poll.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Hạn: {poll.deadline}
                </span>
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

                  return (
                    <div
                      key={opt.id}
                      onClick={() => onVoteOption(poll.id, opt.id)}
                      className={`relative overflow-hidden p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        opt.votedByMe
                          ? 'border-sky-500 bg-sky-50/70 dark:bg-sky-950/40'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 hover:bg-slate-100/70'
                      }`}
                    >
                      {/* Background fill progress bar */}
                      <div
                        className={`absolute left-0 top-0 bottom-0 transition-all duration-500 opacity-20 ${
                          opt.votedByMe ? 'bg-sky-500' : 'bg-slate-400'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />

                      <div className="relative z-10 flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 truncate">
                              {opt.title}
                            </h4>
                            {opt.votedByMe && (
                              <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {opt.location} • <span className="font-semibold text-sky-700 dark:text-sky-300">{opt.priceText}</span>
                          </p>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <span className={`text-sm font-black ${opt.votedByMe ? 'text-sky-600 dark:text-sky-400' : 'text-slate-700 dark:text-slate-300'}`}>
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
            </div>
          );
        })}
      </div>

      {/* Floating CTA */}
      <div className="mt-5">
        <button
          onClick={onCreatePoll}
          className="w-full h-13 rounded-2xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-700/20 active:scale-[0.98] transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Tạo cuộc bình chọn mới</span>
        </button>
      </div>
    </div>
  );
};
