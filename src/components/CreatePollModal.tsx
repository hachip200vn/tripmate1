import React, { useState } from 'react';
import {
  X,
  Vote,
  Plus,
  Trash2,
  Clock,
  MapPin,
  DollarSign,
  Tag,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { VotePoll } from '../types';

interface CreatePollModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination?: string | null;
  creatorName?: string;
  onSavePoll: (poll: VotePoll) => void;
}

interface OptionInput {
  id: string;
  title: string;
  location: string;
  priceText: string;
}

const CATEGORIES = [
  'Ẩm thực & Quán ăn',
  'Lưu trú & Khách sạn',
  'Tham quan & Vui chơi',
  'Phương tiện di chuyển',
  'Kế hoạch phát sinh',
  'Khác',
];

const DEADLINE_PRESETS = [
  '20:00 tối nay',
  '12:00 trưa mai',
  'Trước khi khởi hành',
  'Trong 2 giờ tới',
  'Cuối ngày hôm nay',
];

export const CreatePollModal: React.FC<CreatePollModalProps> = ({
  isOpen,
  onClose,
  destination,
  creatorName = 'Nguyễn Việt Hùng',
  onSavePoll,
}) => {
  if (!isOpen) return null;

  const destName = destination || 'chuyến đi';

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [deadline, setDeadline] = useState(DEADLINE_PRESETS[0]);
  const [customDeadline, setCustomDeadline] = useState('');
  const [isCustomDeadline, setIsCustomDeadline] = useState(false);
  const [options, setOptions] = useState<OptionInput[]>([
    { id: '1', title: '', location: destName, priceText: '' },
    { id: '2', title: '', location: destName, priceText: '' },
  ]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAddOption = () => {
    if (options.length >= 8) return;
    setOptions((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        title: '',
        location: destName,
        priceText: '',
      },
    ]);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length <= 2) return;
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOptionChange = (
    index: number,
    field: keyof OptionInput,
    value: string
  ) => {
    setOptions((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    if (errorMsg) setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrorMsg('Vui lòng nhập câu hỏi hoặc tiêu đề cuộc bình chọn!');
      return;
    }

    const filledOptions = options.filter((opt) => opt.title.trim() !== '');
    if (filledOptions.length < 2) {
      setErrorMsg('Vui lòng nhập ít nhất 2 phương án bình chọn!');
      return;
    }

    const finalDeadline = isCustomDeadline
      ? customDeadline.trim() || 'Hôm nay'
      : deadline;

    const newPoll: VotePoll = {
      id: `poll-${Date.now()}`,
      title: title.trim(),
      creator: creatorName,
      deadline: finalDeadline,
      category,
      status: 'active',
      options: filledOptions.map((opt, idx) => ({
        id: `opt-${Date.now()}-${idx + 1}`,
        title: opt.title.trim(),
        location: opt.location.trim() || destName,
        priceText: opt.priceText.trim() || 'Tự túc',
        votes: 0,
        votedByMe: false,
        voterAvatars: [],
      })),
    };

    onSavePoll(newPoll);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[92vh] overflow-y-auto flex flex-col animate-in slide-in-from-bottom-4">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 text-[11px] font-extrabold uppercase tracking-wider mb-1">
              <Vote className="w-3 h-3 text-sky-600" />
              <span>Biểu quyết nhóm • {destName}</span>
            </div>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">
              Tạo cuộc bình chọn mới
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
          {/* 1. Poll Title / Question */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span>Câu hỏi hoặc Tiêu đề bình chọn</span>
              <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              placeholder={`VD: Chọn quán ăn tối ngày 2 tại ${destName}...`}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            />
          </div>

          {/* 2. Category Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-sky-600" />
              <span>Chủ đề</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    category === cat
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Deadline Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-orange-500" />
              <span>Thời hạn đóng bình chọn</span>
            </label>
            <div className="flex flex-wrap gap-1.5 mb-1.5">
              {DEADLINE_PRESETS.map((d) => (
                <button
                  type="button"
                  key={d}
                  onClick={() => {
                    setDeadline(d);
                    setIsCustomDeadline(false);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all ${
                    !isCustomDeadline && deadline === d
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {d}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setIsCustomDeadline(true)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all ${
                  isCustomDeadline
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Tự nhập...
              </button>
            </div>
            {isCustomDeadline && (
              <input
                type="text"
                value={customDeadline}
                onChange={(e) => setCustomDeadline(e.target.value)}
                placeholder="VD: Trước 19:30 tối mai"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            )}
          </div>

          {/* 4. Options List */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span>Các phương án bình chọn ({options.length})</span>
                <span className="text-rose-500">* (Ít nhất 2)</span>
              </label>
              {options.length < 8 && (
                <button
                  type="button"
                  onClick={handleAddOption}
                  className="text-xs font-bold text-sky-600 hover:text-sky-700 dark:text-sky-400 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm lựa chọn</span>
                </button>
              )}
            </div>

            <div className="space-y-2.5">
              {options.map((opt, idx) => (
                <div
                  key={opt.id}
                  className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 relative"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-black text-sky-700 dark:text-sky-300">
                      Phương án {idx + 1}
                    </span>
                    {options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(idx)}
                        className="w-6 h-6 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center justify-center transition-colors"
                        title="Xóa lựa chọn này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      value={opt.title}
                      onChange={(e) =>
                        handleOptionChange(idx, 'title', e.target.value)
                      }
                      placeholder={`Tên địa điểm / phương án ${idx + 1}...`}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none focus:ring-1 focus:ring-sky-500"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <MapPin className="w-3 h-3 text-slate-400 absolute left-2.5 top-2.5" />
                        <input
                          type="text"
                          value={opt.location}
                          onChange={(e) =>
                            handleOptionChange(idx, 'location', e.target.value)
                          }
                          placeholder="Vị trí / Địa chỉ"
                          className="w-full pl-7 pr-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-200 placeholder:text-slate-400 outline-none"
                        />
                      </div>
                      <div className="relative">
                        <DollarSign className="w-3 h-3 text-slate-400 absolute left-2.5 top-2.5" />
                        <input
                          type="text"
                          value={opt.priceText}
                          onChange={(e) =>
                            handleOptionChange(idx, 'priceText', e.target.value)
                          }
                          placeholder="Dự kiến (VD: ~150k)"
                          className="w-full pl-7 pr-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-200 placeholder:text-slate-400 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {options.length < 8 && (
              <button
                type="button"
                onClick={handleAddOption}
                className="w-full py-2.5 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-sky-400 text-slate-500 dark:text-slate-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4 text-sky-600" />
                <span>Thêm phương án lựa chọn khác</span>
              </button>
            )}
          </div>

          {/* Submit Action Buttons */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-2 h-11 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-sky-600/25 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Tạo bình chọn</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
