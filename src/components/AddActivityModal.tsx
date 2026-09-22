import React, { useState } from 'react';
import {
  X,
  Plus,
  Clock,
  MapPin,
  Car,
  Utensils,
  Compass,
  Bed,
  Coffee,
  Waves,
  Moon,
  ShoppingBag,
  ArrowRight,
  Check,
  Search,
  DollarSign
} from 'lucide-react';
import { TimelineActivity, TripDay } from '../types';

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDay: number;
  days: TripDay[];
  onAddActivity: (activity: TimelineActivity) => void;
  onOpenExplore?: () => void;
  defaultDeparture?: string;
  defaultDestination?: string;
}

const CATEGORIES = [
  { id: 'transport', label: 'Di chuyển / Chặng đi', icon: Car, iconType: 'transport' as const },
  { id: 'food', label: 'Ẩm thực & Quán ăn', icon: Utensils, iconType: 'food' as const },
  { id: 'landmark', label: 'Tham quan & Danh thắng', icon: Compass, iconType: 'landmark' as const },
  { id: 'stay', label: 'Lưu trú / Khách sạn', icon: Bed, iconType: 'landmark' as const },
  { id: 'coffee', label: 'Cà phê & Check-in', icon: Coffee, iconType: 'food' as const },
  { id: 'beach', label: 'Biển & Hoạt động ngoài trời', icon: Waves, iconType: 'beach' as const },
  { id: 'night', label: 'Vui chơi & Chợ đêm', icon: Moon, iconType: 'night' as const },
  { id: 'shopping', label: 'Mua sắm & Đặc sản', icon: ShoppingBag, iconType: 'landmark' as const },
];

export const AddActivityModal: React.FC<AddActivityModalProps> = ({
  isOpen,
  onClose,
  currentDay,
  days,
  onAddActivity,
  onOpenExplore,
  defaultDeparture,
  defaultDestination,
}) => {
  if (!isOpen) return null;

  const [dayNumber, setDayNumber] = useState(currentDay || 1);
  const [time, setTime] = useState('09:00');
  const [category, setCategory] = useState('Tham quan & Danh thắng');
  const [iconType, setIconType] = useState<TimelineActivity['iconType']>('landmark');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState(defaultDestination || '');
  const [departureLocation, setDepartureLocation] = useState(defaultDeparture || '');
  const [destinationLocation, setDestinationLocation] = useState(defaultDestination || '');
  const [costText, setCostText] = useState('');
  const [statusType, setStatusType] = useState<TimelineActivity['statusType']>('approved');
  const [details, setDetails] = useState('');

  const isTransport = category.includes('Di chuyển');

  const handleSelectCategory = (cat: typeof CATEGORIES[0]) => {
    setCategory(cat.label);
    setIconType(cat.iconType);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    let finalLoc = location.trim();
    if (isTransport && departureLocation && destinationLocation) {
      finalLoc = `${departureLocation.trim()} ➔ ${destinationLocation.trim()}`;
    }

    const newActivity: TimelineActivity = {
      id: `act-${Date.now()}`,
      dayNumber,
      time,
      category,
      title: title.trim(),
      location: finalLoc || defaultDestination || 'Địa điểm chưa xác định',
      departureLocation: isTransport ? departureLocation.trim() : undefined,
      destinationLocation: isTransport ? destinationLocation.trim() : undefined,
      costText: costText.trim() || undefined,
      statusText:
        statusType === 'approved'
          ? 'Đã duyệt'
          : statusType === 'booked'
          ? 'Đã đặt chỗ'
          : statusType === 'pending'
          ? 'Chờ duyệt'
          : statusType === 'transport'
          ? 'Đang di chuyển'
          : 'Cần biểu quyết',
      statusType,
      iconType,
      details: details.trim() || undefined,
    };

    onAddActivity(newActivity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-md shadow-sky-600/25">
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                Thêm Hoạt Động Vào Lịch Trình
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Tự nhập thông tin mốc thời gian hoặc chặng di chuyển
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {/* Day & Time Selection */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Áp dụng cho ngày:
              </label>
              <select
                value={dayNumber}
                onChange={(e) => setDayNumber(parseInt(e.target.value, 10))}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
              >
                {days.map((d) => (
                  <option key={d.dayNumber} value={d.dayNumber}>
                    Ngày {d.dayNumber} {d.displayDate ? `(${d.displayDate})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Thời gian (Khung giờ):
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="09:00"
                  required
                  className="w-full h-10 pl-8 pr-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Category Chips */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Loại hoạt động:
            </label>
            <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-1">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = category === cat.label;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelectCategory(cat)}
                    className={`h-9 px-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all text-left truncate cursor-pointer ${
                      isSelected
                        ? 'bg-sky-600 text-white shadow-xs font-bold'
                        : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 hover:border-sky-300'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Activity Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Tên hoạt động / Điểm dừng:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="vd: Ăn sáng Bánh căn, Check-in Quảng trường, Thăm Dinh Bảo Đại..."
              required
              className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder:text-slate-400 placeholder:font-normal"
            />
          </div>

          {/* Transport special: Departure & Destination */}
          {isTransport ? (
            <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-800/60 space-y-2.5">
              <span className="text-[11px] font-black uppercase text-sky-800 dark:text-sky-300 flex items-center gap-1">
                <Car className="w-3.5 h-3.5" />
                <span>Chặng di chuyển (Điểm đi ➔ Điểm đến)</span>
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Điểm đi (Nơi đón/xuất phát):
                  </label>
                  <input
                    type="text"
                    value={departureLocation}
                    onChange={(e) => setDepartureLocation(e.target.value)}
                    placeholder="vd: Sân bay / Bến xe..."
                    className="w-full h-9 px-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Điểm đến (Nơi trả/đến):
                  </label>
                  <input
                    type="text"
                    value={destinationLocation}
                    onChange={(e) => setDestinationLocation(e.target.value)}
                    placeholder="vd: Khách sạn / Trung tâm..."
                    className="w-full h-9 px-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Địa điểm / Vị trí cụ thể:
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Nhập địa chỉ, tên đường hoặc khu vực..."
                  className="w-full h-10 pl-8 pr-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
          )}

          {/* Cost & Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Chi phí ước tính:
              </label>
              <input
                type="text"
                value={costText}
                onChange={(e) => setCostText(e.target.value)}
                placeholder="vd: 50.000đ/người, Miễn phí..."
                className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Trạng thái ban đầu:
              </label>
              <select
                value={statusType}
                onChange={(e) => setStatusType(e.target.value as TimelineActivity['statusType'])}
                className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
              >
                <option value="approved">Đã duyệt</option>
                <option value="booked">Đã đặt chỗ</option>
                <option value="pending">Chờ duyệt</option>
                <option value="voted">Cần biểu quyết</option>
                <option value="transport">Đang di chuyển</option>
              </select>
            </div>
          </div>

          {/* Notes / Details */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Ghi chú thêm:
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Thông tin thêm như: nên đi buổi sáng vắng khách, lưu ý trang phục..."
              rows={2}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder:text-slate-400"
            />
          </div>

          {/* Browse from Explore prompt */}
          {onOpenExplore && (
            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenExplore();
                }}
                className="w-full py-2.5 rounded-xl border border-sky-200 dark:border-sky-800 bg-sky-50/60 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-sky-100 transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Hoặc chọn nhanh từ danh mục Khám phá</span>
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-2 h-11 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-sky-700/25 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Thêm vào lịch trình</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
