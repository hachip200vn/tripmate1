import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  SlidersHorizontal,
  Coins,
  CloudSun,
  CheckSquare,
  AlertTriangle,
  Volume2,
  Play,
  Pause,
  Plus,
  Trash2,
  PhoneCall,
  Sun,
  Moon,
  Check,
  MapPin,
  RefreshCw,
  Compass,
  Thermometer,
  ShieldAlert
} from 'lucide-react';
import { getLocationUtility, LOCATION_UTILITIES_DATABASE } from '../data/locationUtilitiesData';

interface UtilityDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  currentDestination?: string;
}

export const UtilityDashboardModal: React.FC<UtilityDashboardModalProps> = ({
  isOpen,
  onClose,
  darkMode,
  onToggleDarkMode,
  currentDestination,
}) => {
  if (!isOpen) return null;

  // Active destination (defaults to current active trip plan's destination)
  const [activeLocation, setActiveLocation] = useState<string>(
    currentDestination || 'Đà Nẵng — Hội An'
  );

  useEffect(() => {
    if (currentDestination) {
      setActiveLocation(currentDestination);
    }
  }, [currentDestination]);

  const locationData = getLocationUtility(activeLocation);

  // 1. Currency Converter state
  const [vndAmount, setVndAmount] = useState<number>(1000000);
  const [targetCurrency, setTargetCurrency] = useState<'USD' | 'EUR' | 'JPY' | 'KRW'>('USD');
  const rates = {
    USD: 25450,
    EUR: 27500,
    JPY: 168,
    KRW: 18.5,
  };

  // 2. Packing Checklist state (adaptable)
  const [packingItems, setPackingItems] = useState([
    { id: 1, text: 'CCCD / Hộ chiếu gốc & bằng lái xe', checked: true },
    { id: 2, text: 'Kem chống nắng SPF 50+ & kính râm', checked: true },
    { id: 3, text: 'Đồ bơi / Trang phục check-in', checked: true },
    { id: 4, text: 'Áo khoác gió & trang phục giữ ấm', checked: false },
    { id: 5, text: 'Sạc dự phòng 20.000mAh & cáp điện thoại', checked: false },
    { id: 6, text: 'Thuốc tiêu hóa, say xe & xịt chống muỗi', checked: false },
  ]);
  const [newItemText, setNewItemText] = useState('');

  // 3. Quick Bill Splitter state
  const [billTotal, setBillTotal] = useState<number>(1250000);
  const [peopleCount, setPeopleCount] = useState<number>(5);
  const [tipPercent, setTipPercent] = useState<number>(0);

  // 4. Ambient Sound Synthesizer via Web Audio API
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const toggleCheck = (id: number) => {
    setPackingItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    setPackingItems((prev) => [
      ...prev,
      { id: Date.now(), text: newItemText.trim(), checked: false },
    ]);
    setNewItemText('');
  };

  const removeItem = (id: number) => {
    setPackingItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Sound generator tailored to the track
  const playSoundTrack = (track: { id: string; soundType: string }) => {
    if (playingTrackId === track.id) {
      // stop
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setPlayingTrackId(null);
      return;
    }

    // Stop existing
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }

    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioCtxRef.current = ctx;

      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);

      // Noise generation
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      // Dynamic filter depending on ambient nature
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      switch (track.soundType) {
        case 'waves':
          filter.type = 'lowpass';
          filter.frequency.value = 360;
          gain.gain.value = 0.09;
          break;
        case 'rain':
          filter.type = 'bandpass';
          filter.frequency.value = 850;
          gain.gain.value = 0.08;
          break;
        case 'wind':
          filter.type = 'lowpass';
          filter.frequency.value = 240;
          gain.gain.value = 0.07;
          break;
        case 'fire':
          filter.type = 'bandpass';
          filter.frequency.value = 600;
          gain.gain.value = 0.06;
          break;
        case 'stream':
          filter.type = 'lowpass';
          filter.frequency.value = 650;
          gain.gain.value = 0.08;
          break;
        case 'night':
        default:
          filter.type = 'notch';
          filter.frequency.value = 1100;
          gain.gain.value = 0.07;
          break;
      }

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noiseSource.start();
      setPlayingTrackId(track.id);
    } catch (e) {
      console.warn('Web Audio playback error', e);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const totalWithTip = billTotal + (billTotal * tipPercent) / 100;
  const perPersonSplit = Math.round(totalWithTip / Math.max(1, peopleCount));

  // Quick switch chips for testing locations
  const popularPreviewLocations = [
    'Đà Nẵng — Hội An',
    'Đà Lạt',
    'Phú Quốc',
    'Hà Giang',
    'Hà Nội',
    'Sa Pa',
    'Nha Trang',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-600 text-white flex items-center justify-center shadow-md">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                Bảng Điều Khiển Cá Nhân Hóa Tiện Ích
              </h2>
              <p className="text-[11px] text-slate-400">
                Đồng bộ tự động theo điểm đến chuyến đi của bạn
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-300 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Location sync indicator & switcher */}
        <div className="p-3 rounded-2xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/50 mb-4">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <MapPin className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 block leading-tight">Điểm đến đang áp dụng</span>
                <span className="text-xs font-black text-sky-900 dark:text-sky-200 truncate block">
                  {locationData.name}
                </span>
              </div>
            </div>

            {currentDestination && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center gap-1 flex-shrink-0">
                <Check className="w-3 h-3" /> Từ lịch trình
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] text-slate-500 font-semibold flex-shrink-0">Xem nhanh:</span>
            {popularPreviewLocations.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setActiveLocation(loc)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all ${
                  activeLocation.toLowerCase().includes(loc.toLowerCase().split(' ')[0])
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-sky-400'
                }`}
              >
                {loc.split(' — ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* 1. Weather & UV Radar (Customized by Location) */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <CloudSun className="w-4 h-4 text-sky-500" />
              Radar Thời Tiết & Chỉ Số UV: {locationData.weather.destinationName}
            </h3>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
              {locationData.weather.badge}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center mb-2.5">
            <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 block">Nhiệt độ</span>
              <span className="text-sm font-black text-slate-800 dark:text-slate-100">
                {locationData.weather.temperature}
              </span>
              <span className="text-[9px] text-slate-400 block truncate">
                {locationData.weather.tempSubtext}
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 block">Chỉ số UV</span>
              <span className="text-sm font-black text-orange-500">
                {locationData.weather.uvIndex}
              </span>
              <span className="text-[9px] text-slate-400 block truncate">
                {locationData.weather.uvAction}
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 block">Hoàng hôn</span>
              <span className="text-sm font-black text-sky-600">
                {locationData.weather.sunsetTime}
              </span>
              <span className="text-[9px] text-slate-400 block truncate">
                Đẹp nhất ngày
              </span>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1 text-slate-500">
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              Điểm ngắm hoàng hôn:
            </span>
            <span className="font-bold text-slate-800 dark:text-slate-100 truncate ml-2">
              {locationData.weather.sunsetSpot}
            </span>
          </div>
        </div>

        {/* 2. Ambient Travel Sounds (Customized by Location) */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-cyan-600" />
              Âm Thanh Thư Giãn Bản Địa ({locationData.name})
            </h3>
            {playingTrackId && (
              <span className="text-[10px] text-cyan-600 font-bold animate-pulse">
                Đang phát âm thanh...
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {locationData.ambientSounds.map((track) => {
              const isPlaying = playingTrackId === track.id;
              return (
                <button
                  key={track.id}
                  onClick={() => playSoundTrack(track)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
                    isPlaying
                      ? 'bg-cyan-600 text-white border-cyan-600 shadow-md'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-cyan-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[16px]">{track.emoji}</span>
                    {isPlaying ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-[11px] truncate">{track.title}</p>
                    <p
                      className={`text-[9px] line-clamp-1 ${
                        isPlaying ? 'text-cyan-100' : 'text-slate-400'
                      }`}
                    >
                      {track.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Emergency SOS & Rescue Hotlines (Customized by Location) */}
        <div className="bg-rose-50 dark:bg-rose-950/30 rounded-2xl p-4 border border-rose-200 dark:border-rose-900/50 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Đường Dây Nóng Khẩn Cấp & SOS ({locationData.name})
            </h3>
            <span className="text-[9px] font-bold text-rose-600 bg-rose-100 dark:bg-rose-900/40 px-2 py-0.5 rounded-full">
              Chạm để gọi ngay
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            {locationData.hotlines.map((contact, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-rose-100 dark:border-rose-900/30 gap-2"
              >
                <div className="min-w-0">
                  <span className="text-slate-800 dark:text-slate-200 font-bold block truncate text-[11px]">
                    {contact.title}
                  </span>
                  {contact.note && (
                    <span className="text-[10px] text-slate-400 block truncate">{contact.note}</span>
                  )}
                </div>
                <a
                  href={`tel:${contact.phone}`}
                  className="px-2.5 py-1 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-black text-xs flex items-center gap-1 flex-shrink-0 shadow-sm"
                >
                  <PhoneCall className="w-3 h-3" />
                  {contact.displayPhone.split(' / ')[0]}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Currency Converter */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-amber-500" />
              Chuyển Đổi Ngoại Tệ Tức Thì
            </h3>
            <span className="text-[10px] text-slate-400">Tỷ giá tham chiếu</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">Số tiền (VNĐ)</label>
              <input
                type="number"
                value={vndAmount}
                onChange={(e) => setVndAmount(Math.max(0, Number(e.target.value)))}
                className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-800 dark:text-slate-100 outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="text-[10px] font-semibold text-slate-500 block mb-1">Quy đổi sang</label>
              <select
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value as any)}
                className="w-full h-10 px-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-800 dark:text-slate-100 outline-none focus:ring-1 focus:ring-sky-500"
              >
                <option value="USD">Đô la Mỹ (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="JPY">Yên Nhật (JPY)</option>
                <option value="KRW">Won Hàn (KRW)</option>
              </select>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <span className="text-xs text-slate-500">Giá trị tương đương:</span>
            <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
              ≈ {(vndAmount / rates[targetCurrency]).toFixed(2)} {targetCurrency}
            </span>
          </div>
        </div>

        {/* 5. Interactive Packing Checklist */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-sky-600" />
              Checklist Đóng Gói Hành Lý ({packingItems.filter((i) => i.checked).length}/{packingItems.length})
            </h3>
          </div>

          <div className="space-y-1.5 max-h-36 overflow-y-auto mb-3 pr-1">
            {packingItems.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 cursor-pointer text-xs"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center border ${
                      item.checked
                        ? 'bg-sky-600 border-sky-600 text-white'
                        : 'border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {item.checked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className={item.checked ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200 font-medium'}>
                    {item.text}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.id);
                  }}
                  className="text-slate-300 hover:text-red-500 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddItem} className="flex gap-1.5">
            <input
              type="text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              placeholder="Thêm vật dụng mới cần mang..."
              className="flex-1 h-9 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 outline-none"
            />
            <button
              type="submit"
              className="px-3 h-9 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Thêm
            </button>
          </form>
        </div>

        {/* Dark mode banner switch */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            {darkMode ? <Moon className="w-5 h-5 text-amber-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Giao diện hiển thị
              </p>
              <span className="text-[11px] text-slate-400">
                {darkMode ? 'Giao diện Đêm êm dịu' : 'Giao diện Ngày sáng rõ'}
              </span>
            </div>
          </div>
          <button
            onClick={onToggleDarkMode}
            className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm transition-all"
          >
            {darkMode ? 'Bật giao diện Sáng' : 'Bật giao diện Tối'}
          </button>
        </div>
      </div>
    </div>
  );
};

