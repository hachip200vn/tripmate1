import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  MessageSquare,
  Send,
  Trash2,
  Clock,
  MapPin,
  Sparkles,
  CheckCircle2,
  CornerDownRight,
  Smile,
  ShieldCheck,
  ThumbsUp,
  Heart
} from 'lucide-react';
import { TimelineActivity, ActivityComment, Member } from '../types';

interface ActivityCommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: TimelineActivity | null;
  currentUserName: string;
  members?: Member[];
  onAddComment: (activityId: string, content: string) => void;
  onDeleteComment?: (activityId: string, commentId: string) => void;
}

const QUICK_COMMENTS = [
  '📌 Điểm này nên đi sớm kẻo đông khách',
  '🍽️ Quán này đồ ăn ngon, nhớ thử đặc sản nhé',
  '🎫 Mình đã book vé / bàn trước rồi nha!',
  '⏰ Mọi người nhớ tập trung đúng giờ nhé',
  '📸 Chỗ này sống ảo lên hình đẹp mê luôn',
];

export const ActivityCommentsModal: React.FC<ActivityCommentsModalProps> = ({
  isOpen,
  onClose,
  activity,
  currentUserName,
  members = [],
  onAddComment,
  onDeleteComment,
}) => {
  const [commentText, setCommentText] = useState('');
  const commentsEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, activity?.id]);

  if (!isOpen || !activity) return null;

  const comments = activity.comments || [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(activity.id, commentText.trim());
    setCommentText('');
    setTimeout(() => {
      commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleQuickComment = (quickText: string) => {
    onAddComment(activity.id, quickText);
    setTimeout(() => {
      commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 sm:zoom-in-95">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 sticky top-0 z-10">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-black px-2 py-0.5 rounded-lg bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </span>
                <span className="text-[11px] font-bold text-slate-400">
                  {activity.category}
                </span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 truncate">
                {activity.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                {activity.location}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <span className="text-xs font-bold text-sky-700 dark:text-sky-400 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Thảo luận & Bình luận ({comments.length})</span>
            </span>
            <span className="text-[11px] text-slate-400">
              Mọi thành viên đều có thể đóng góp ý kiến
            </span>
          </div>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-slate-50/50 dark:bg-slate-900/50">
          {comments.length === 0 ? (
            <div className="py-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto mb-3 shadow-sm">
                <MessageSquare className="w-7 h-7 stroke-[1.75]" />
              </div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                Chưa có bình luận nào
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto mb-4">
                Hãy để lại lời nhắn, lưu ý trang phục, đặt bàn hoặc mẹo hay cho điểm dừng này nhé!
              </p>
            </div>
          ) : (
            comments.map((cmt) => {
              const isMe = cmt.authorName === currentUserName;
              return (
                <div
                  key={cmt.id}
                  className={`flex gap-3 items-start group ${
                    isMe ? 'flex-row-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 flex-shrink-0 border border-slate-200 dark:border-slate-700">
                    {cmt.authorAvatar ? (
                      <img
                        src={cmt.authorAvatar}
                        alt={cmt.authorName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-xs text-sky-700 dark:text-sky-300">
                        {cmt.authorName.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[78%] rounded-2xl p-3 shadow-sm ${
                      isMe
                        ? 'bg-sky-600 text-white rounded-tr-none'
                        : 'bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 rounded-tl-none'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-xs font-black ${
                            isMe ? 'text-sky-100' : 'text-slate-900 dark:text-slate-100'
                          }`}
                        >
                          {cmt.authorName}
                        </span>
                        {cmt.authorRole && (
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                              isMe
                                ? 'bg-white/20 text-white'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300'
                            }`}
                          >
                            {cmt.authorRole}
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-[10px] ${
                          isMe ? 'text-sky-200' : 'text-slate-400'
                        }`}
                      >
                        {cmt.createdAt}
                      </span>
                    </div>

                    <p className="text-xs leading-relaxed break-words whitespace-pre-wrap">
                      {cmt.content}
                    </p>

                    {/* Delete action for author */}
                    {isMe && onDeleteComment && (
                      <div className="mt-1.5 flex justify-end">
                        <button
                          type="button"
                          onClick={() => onDeleteComment(activity.id, cmt.id)}
                          className="text-[10px] text-sky-200 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                          title="Xóa bình luận"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Xóa</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
          <div ref={commentsEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-100/70 dark:bg-slate-800/60 border-t border-slate-200/70 dark:border-slate-700/70 overflow-x-auto no-scrollbar flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 flex-shrink-0">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Gợi ý:</span>
          </span>
          {QUICK_COMMENTS.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleQuickComment(chip)}
              className="text-[11px] font-medium px-2.5 py-1 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-600/80 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300 dark:hover:bg-slate-600 flex-shrink-0 transition-all cursor-pointer whitespace-nowrap"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSend}
          className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={`Bình luận cho "${activity.title.slice(0, 24)}..."`}
            className="flex-1 h-11 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="h-11 px-4 rounded-2xl bg-sky-600 hover:bg-sky-700 disabled:opacity-40 disabled:hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-sky-600/25 active:scale-95 transition-all cursor-pointer flex-shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Gửi</span>
          </button>
        </form>
      </div>
    </div>
  );
};
