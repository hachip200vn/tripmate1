import React, { useState } from 'react';
import { X, Camera, Send, Check, Sparkles, ImagePlus } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  spotName: string;
  onSubmitSuccess: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  spotName,
  onSubmitSuccess,
}) => {
  if (!isOpen) return null;

  const [reviewText, setReviewText] = useState(
    'Nên ghé lúc 20:30 để chọn chỗ đứng view thẳng đầu rồng trên phố đi bộ. Gió sông mát mẻ, đồ ăn vặt chợ đêm Sơn Trà giá khá mềm!'
  );
  const [photos, setPhotos] = useState([
    'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1528127269322-539801943592?w=300&auto=format&fit=crop&q=80',
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleRemovePhoto = (idx: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddPhoto = () => {
    if (photos.length >= 5) return;
    setPhotos((prev) => [
      ...prev,
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80',
    ]);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        onSubmitSuccess();
        onClose();
      }, 700);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Grab bar */}
        <div className="w-12 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 mx-auto mb-3" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
          <div>
            <span className="text-[11px] font-extrabold text-sky-600 dark:text-sky-400 uppercase tracking-wider block">
              Đánh giá địa điểm
            </span>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
              {spotName || 'Cầu Rồng Đà Nẵng'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-300 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Feature tag pill matching image */}
        <div className="mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold">
            <span>+</span> <span>👨‍👩‍👧‍👦 Phù hợp đi nhóm đông</span>
          </span>
        </div>

        {/* Text area matching Image 29 */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5">
            <span className="flex items-center gap-1">
              <span>✍️</span> Chia sẻ cảm nhận chi tiết của bạn
            </span>
            <span className="text-slate-400 font-normal">
              {reviewText.length}/500 ký tự
            </span>
          </div>
          <textarea
            rows={4}
            value={reviewText}
            maxLength={500}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full p-3.5 rounded-2xl bg-sky-50/70 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 font-medium text-xs sm:text-sm border border-sky-100 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500 resize-none leading-relaxed"
          />
        </div>

        {/* Photos grid matching Image 29 */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200 mb-2">
            <span className="flex items-center gap-1">
              <Camera className="w-4 h-4 text-sky-600" />
              Ảnh hoặc video thực tế ({photos.length}/5)
            </span>
            <button
              type="button"
              className="text-sky-600 dark:text-sky-400 text-xs font-bold hover:underline"
            >
              Xem tất cả
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {photos.map((url, idx) => (
              <div key={idx} className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm border border-slate-200 dark:border-slate-700">
                <img src={url} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(idx)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {photos.length < 5 && (
              <button
                type="button"
                onClick={handleAddPhoto}
                className="w-24 h-24 rounded-2xl border-2 border-dashed border-sky-300 dark:border-slate-700 bg-sky-50/50 dark:bg-slate-800/50 flex flex-col items-center justify-center text-sky-600 dark:text-sky-400 flex-shrink-0 hover:bg-sky-50 transition-colors"
              >
                <ImagePlus className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-bold">Thêm ảnh</span>
              </button>
            )}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={onClose}
            className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="col-span-2 h-12 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs shadow-md shadow-sky-700/25 flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all"
          >
            {isSubmitting ? (
              <span>Đang gửi đánh giá...</span>
            ) : submitted ? (
              <span>Đã đăng thành công! ✓</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Đăng đánh giá ngay</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
