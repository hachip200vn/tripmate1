import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  Car,
  Plane,
  Train,
  Bike,
  Ship,
  Bus,
  Sparkles,
  Plus,
  Trash2,
  Users,
  Wallet,
  FileText,
  Check,
  Compass,
  ArrowRight,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { TripPlanData, TripDay, TimelineActivity } from '../types';

interface ManualTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateManualTrip: (plan: TripPlanData) => void;
  userName?: string;
}

const POPULAR_DEPARTURES = [
  'Hà Nội',
  'TP. Hồ Chí Minh',
  'Đà Nẵng',
  'Cần Thơ',
  'Hải Phòng',
  'Nha Trang',
];

const POPULAR_DESTINATIONS = [
  'Đà Lạt',
  'Phú Quốc',
  'Nha Trang',
  'Đà Nẵng',
  'Sa Pa',
  'Hà Giang',
  'Quy Nhơn',
  'Huế',
  'Vũng Tàu',
  'Phan Thiết',
];

const TRANSPORT_OPTIONS = [
  { id: 'plane', label: 'Máy bay', icon: Plane },
  { id: 'bus', label: 'Xe khách / Limousine', icon: Bus },
  { id: 'car', label: 'Ô tô / Tự lái', icon: Car },
  { id: 'bike', label: 'Xe máy / Phượt', icon: Bike },
  { id: 'train', label: 'Tàu hỏa', icon: Train },
  { id: 'ship', label: 'Tàu thủy / Phà', icon: Ship },
];

export const ManualTripModal: React.FC<ManualTripModalProps> = ({
  isOpen,
  onClose,
  onCreateManualTrip,
  userName = 'Bạn',
}) => {
  if (!isOpen) return null;

  // Form states
  const [departureLocation, setDepartureLocation] = useState('Hà Nội');
  const [destination, setDestination] = useState('Đà Lạt');
  const [tripTitle, setTripTitle] = useState('');
  const [isTitleCustomized, setIsTitleCustomized] = useState(false);

  // Dates
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 7);
  const defaultStartStr = tomorrow.toISOString().split('T')[0];

  const fourDaysLater = new Date(tomorrow);
  fourDaysLater.setDate(fourDaysLater.getDate() + 3);
  const defaultEndStr = fourDaysLater.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(defaultStartStr);
  const [endDate, setEndDate] = useState(defaultEndStr);
  const [transportType, setTransportType] = useState('Máy bay');
  const [membersCount, setMembersCount] = useState(4);
  const [budgetPerPerson, setBudgetPerPerson] = useState('3.500.000');
  const [notes, setNotes] = useState('');

  // Mode: Template schedule vs Custom day activities
  const [scheduleMode, setScheduleMode] = useState<'template' | 'custom'>('template');
  const [selectedPreviewDay, setSelectedPreviewDay] = useState(1);
  const [expandedSection, setExpandedSection] = useState<'info' | 'schedule' | 'more'>('info');

  // Custom activities state (grouped by day)
  const [customActivities, setCustomActivities] = useState<TimelineActivity[]>([]);

  // Calculate day difference
  const calculateDays = () => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
        return { totalDays: 3, nights: 2, summary: '3 ngày 2 đêm' };
      }
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      const nights = Math.max(0, diffDays - 1);
      const summary = diffDays === 1 ? '1 ngày (trong ngày)' : `${diffDays} ngày ${nights} đêm`;
      return { totalDays: diffDays, nights, summary };
    } catch {
      return { totalDays: 3, nights: 2, summary: '3 ngày 2 đêm' };
    }
  };

  const { totalDays, nights, summary: datesSummary } = calculateDays();

  // Auto-generate title if user hasn't explicitly written one
  useEffect(() => {
    if (!isTitleCustomized) {
      if (departureLocation && destination) {
        setTripTitle(`Chuyến đi ${destination} từ ${departureLocation}`);
      } else if (destination) {
        setTripTitle(`Chuyến đi khám phá ${destination}`);
      }
    }
  }, [departureLocation, destination, isTitleCustomized]);

  // Generate initial starter activities based on origin, destination and days
  const generateInitialSchedule = () => {
    const activities: TimelineActivity[] = [];
    const dep = departureLocation.trim() || 'Hà Nội';
    const dest = destination.trim() || 'Đà Lạt';

    for (let day = 1; day <= totalDays; day++) {
      if (day === 1) {
        // Day 1: Departure & Arrival
        activities.push({
          id: `act-m1-${Date.now()}-1`,
          dayNumber: 1,
          time: '07:30',
          category: 'Di chuyển khởi hành',
          title: `Khởi hành từ ${dep} ➔ ${dest}`,
          location: `Điểm xuất phát tại ${dep}`,
          departureLocation: dep,
          destinationLocation: dest,
          costText: `${transportType} khứ hồi`,
          statusText: 'Đã duyệt',
          statusType: 'transport',
          iconType: 'transport',
          details: `Di chuyển bằng ${transportType} từ ${dep} đến ${dest}. Chuẩn bị hành lý gọn gàng.`,
        });

        activities.push({
          id: `act-m1-${Date.now()}-2`,
          dayNumber: 1,
          time: '12:00',
          category: 'Ẩm thực trưa',
          title: `Ăn trưa & Thưởng thức đặc sản ${dest}`,
          location: `Trung tâm ${dest}`,
          costText: '~80.000đ/người',
          statusText: 'Đã duyệt',
          statusType: 'approved',
          iconType: 'food',
          details: `Nghỉ chân và nạp năng lượng với các món ăn đặc trưng nổi tiếng tại ${dest}.`,
        });

        activities.push({
          id: `act-m1-${Date.now()}-3`,
          dayNumber: 1,
          time: '14:00',
          category: 'Lưu trú',
          title: `Nhận phòng khách sạn / Homestay tại ${dest}`,
          location: `Khu vực trung tâm ${dest}`,
          costText: 'Đã đặt phòng',
          statusText: 'Đã đặt chỗ',
          statusType: 'booked',
          iconType: 'landmark',
          details: 'Check-in, cất hành lý và nghỉ ngơi nhẹ trước khi bắt đầu lịch trình chiều.',
        });

        activities.push({
          id: `act-m1-${Date.now()}-4`,
          dayNumber: 1,
          time: '16:30',
          category: 'Check-in & Hoàng hôn',
          title: `Tham quan điểm check-in biểu tượng ${dest}`,
          location: `Danh thắng nổi bật tại ${dest}`,
          costText: 'Tự do',
          statusText: 'Đã duyệt',
          statusType: 'approved',
          iconType: 'landmark',
          details: `Ngắm cảnh hoàng hôn thơ mộng và chụp những bức ảnh kỷ niệm cùng nhóm tại ${dest}.`,
        });

        activities.push({
          id: `act-m1-${Date.now()}-5`,
          dayNumber: 1,
          time: '19:00',
          category: 'Ẩm thực tối & Dạo phố',
          title: `Khám phá chợ đêm & Ăn tối tại ${dest}`,
          location: `Phố đi bộ / Chợ đêm ${dest}`,
          costText: '~150.000đ/người',
          statusText: 'Đã duyệt',
          statusType: 'approved',
          iconType: 'night',
          details: 'Thưởng thức ẩm thực đường phố và dạo phố ngắm không khí đêm náo nhiệt.',
        });
      } else if (day === totalDays && totalDays > 1) {
        // Last Day: Checkout & Return
        activities.push({
          id: `act-m${day}-${Date.now()}-1`,
          dayNumber: day,
          time: '08:00',
          category: 'Cà phê & Điểm tâm',
          title: `Ăn sáng & Cà phê sáng ngắm cảnh ${dest}`,
          location: `Quán cà phê view đẹp ${dest}`,
          costText: '~60.000đ/người',
          statusText: 'Đã duyệt',
          statusType: 'approved',
          iconType: 'food',
          details: 'Tận hưởng buổi sáng thảnh thơi cuối cùng của chuyến đi.',
        });

        activities.push({
          id: `act-m${day}-${Date.now()}-2`,
          dayNumber: day,
          time: '10:30',
          category: 'Mua sắm đặc sản',
          title: `Mua quà lưu niệm & Đặc sản ${dest}`,
          location: `Chợ truyền thống ${dest}`,
          costText: 'Tự do mua sắm',
          statusText: 'Đã duyệt',
          statusType: 'approved',
          iconType: 'landmark',
          details: `Mua đặc sản vùng miền ${dest} làm quà tặng bạn bè và người thân.`,
        });

        activities.push({
          id: `act-m${day}-${Date.now()}-3`,
          dayNumber: day,
          time: '12:00',
          category: 'Lưu trú',
          title: 'Trả phòng khách sạn (Check-out)',
          location: `Khách sạn tại ${dest}`,
          costText: 'Hoàn tất',
          statusText: 'Đã duyệt',
          statusType: 'approved',
          iconType: 'landmark',
          details: 'Kiểm tra kỹ tư trang cá nhân trước khi trả phòng.',
        });

        activities.push({
          id: `act-m${day}-${Date.now()}-4`,
          dayNumber: day,
          time: '15:00',
          category: 'Di chuyển về lại',
          title: `Chặng về: Tạm biệt ${dest} ➔ Trở về ${dep}`,
          location: `Bến xe / Sân bay / Ga ${dest}`,
          departureLocation: dest,
          destinationLocation: dep,
          costText: `${transportType} về lại`,
          statusText: 'Đã duyệt',
          statusType: 'transport',
          iconType: 'transport',
          details: `Lên ${transportType} xuất phát từ ${dest} trở về ${dep}. Kết thúc chuyến đi trọn vẹn!`,
        });
      } else {
        // Middle Days: Sightseeing & Exploration
        activities.push({
          id: `act-m${day}-${Date.now()}-1`,
          dayNumber: day,
          time: '08:00',
          category: 'Ẩm thực sáng',
          title: `Ăn sáng nạp năng lượng Ngày ${day}`,
          location: `Quán ăn sáng địa phương tại ${dest}`,
          costText: '~50.000đ/người',
          statusText: 'Đã duyệt',
          statusType: 'approved',
          iconType: 'food',
          details: 'Điểm tâm sáng ngon miệng chuẩn vị địa phương.',
        });

        activities.push({
          id: `act-m${day}-${Date.now()}-2`,
          dayNumber: day,
          time: '09:30',
          category: 'Danh thắng & Trải nghiệm',
          title: `Khám phá danh thắng nổi tiếng Ngày ${day}`,
          location: `Khu du lịch sinh thái / Danh thắng tại ${dest}`,
          costText: 'Vé tham quan',
          statusText: 'Đã duyệt',
          statusType: 'approved',
          iconType: 'landmark',
          details: `Hoạt động trải nghiệm thiên nhiên và cảnh sắc đặc sắc của ${dest}.`,
        });

        activities.push({
          id: `act-m${day}-${Date.now()}-3`,
          dayNumber: day,
          time: '12:30',
          category: 'Ẩm thực trưa',
          title: `Bữa trưa đặc sản vùng miền`,
          location: `Nhà hàng ẩm thực tại ${dest}`,
          costText: '~100.000đ/người',
          statusText: 'Đã duyệt',
          statusType: 'approved',
          iconType: 'dining',
          details: 'Thưởng thức các món ngon cùng nhóm bạn bè.',
        });

        activities.push({
          id: `act-m${day}-${Date.now()}-4`,
          dayNumber: day,
          time: '15:30',
          category: 'Vui chơi & Check-in',
          title: `Check-in điểm chụp ảnh & Cà phê chill`,
          location: `Điểm đến hot tại ${dest}`,
          costText: '~60.000đ/người',
          statusText: 'Đã duyệt',
          statusType: 'approved',
          iconType: 'beach',
          details: 'Góc chụp ảnh đẹp và không gian thư giãn lý tưởng.',
        });

        activities.push({
          id: `act-m${day}-${Date.now()}-5`,
          dayNumber: day,
          time: '19:00',
          category: 'Ẩm thực tối & Giao lưu',
          title: `Tiệc tối nướng / Lẩu quây quần`,
          location: `Quán ăn tối ấm cúng tại ${dest}`,
          costText: '~180.000đ/người',
          statusText: 'Đã duyệt',
          statusType: 'approved',
          iconType: 'night',
          details: 'Cả đoàn cùng nhau dùng bữa tối, trò chuyện và tổng kết ngày vui.',
        });
      }
    }

    return activities;
  };

  // State to hold active activities (editable)
  useEffect(() => {
    setCustomActivities(generateInitialSchedule());
  }, [departureLocation, destination, totalDays, transportType]);

  // Add new activity to current preview day
  const handleAddNewActivity = (dayNum: number) => {
    const newAct: TimelineActivity = {
      id: `custom-act-${Date.now()}`,
      dayNumber: dayNum,
      time: '10:00',
      category: 'Hoạt động tự do',
      title: `Hoạt động mới tại ${destination || 'điểm đến'}`,
      location: destination || 'Địa điểm cụ thể',
      costText: 'Tự do',
      statusText: 'Đã duyệt',
      statusType: 'approved',
      iconType: 'landmark',
      details: 'Ghi chú chi tiết cho mốc này...',
    };
    setCustomActivities((prev) => [...prev, newAct]);
  };

  // Remove activity
  const handleRemoveActivity = (id: string) => {
    setCustomActivities((prev) => prev.filter((a) => a.id !== id));
  };

  // Update activity field
  const handleUpdateActivity = (id: string, updates: Partial<TimelineActivity>) => {
    setCustomActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
  };

  // Handle final submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!destination.trim()) {
      alert('Vui lòng nhập điểm đến của chuyến đi!');
      return;
    }

    const dep = departureLocation.trim() || 'Hà Nội';
    const dest = destination.trim();
    const title = tripTitle.trim() || `Chuyến đi ${dest} từ ${dep}`;

    // Generate days array
    const days: TripDay[] = [];
    const start = new Date(startDate);

    for (let i = 1; i <= totalDays; i++) {
      const curDate = new Date(start);
      curDate.setDate(curDate.getDate() + (i - 1));
      const iso = curDate.toISOString().split('T')[0];
      const d = String(curDate.getDate()).padStart(2, '0');
      const m = String(curDate.getMonth() + 1).padStart(2, '0');

      let dayTitle = `Khám phá Ngày ${i}`;
      if (i === 1) dayTitle = `Khởi hành từ ${dep} ➔ ${dest}`;
      else if (i === totalDays && totalDays > 1) dayTitle = `Mua sắm & Trở về ${dep}`;

      days.push({
        dayNumber: i,
        date: iso,
        displayDate: `${d}/${m}`,
        title: dayTitle,
        activitiesCount: customActivities.filter((a) => a.dayNumber === i).length,
      });
    }

    // Cover image according to destination
    let coverImage =
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80';
    const lowerDest = dest.toLowerCase();
    if (lowerDest.includes('đà lạt') || lowerDest.includes('da lat')) {
      coverImage =
        'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&auto=format&fit=crop&q=80';
    } else if (lowerDest.includes('phú quốc') || lowerDest.includes('phu quoc')) {
      coverImage =
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=80';
    } else if (lowerDest.includes('nha trang')) {
      coverImage =
        'https://images.unsplash.com/photo-1589779256260-0a0efb38841a?w=1200&auto=format&fit=crop&q=80';
    } else if (lowerDest.includes('đà nẵng') || lowerDest.includes('hội an')) {
      coverImage =
        'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&auto=format&fit=crop&q=80';
    } else if (lowerDest.includes('hà giang') || lowerDest.includes('sa pa')) {
      coverImage =
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80';
    }

    const budgetNum = parseInt(budgetPerPerson.replace(/[^0-9]/g, ''), 10) || 3000000;

    const planData: TripPlanData = {
      tripTitle: title,
      destination: dest,
      departureLocation: dep,
      datesSummary: `${startDate.split('-').reverse().join('/')} – ${endDate.split('-').reverse().join('/')} (${datesSummary})`,
      startDate,
      endDate,
      totalDays,
      coverImage,
      days,
      activities: customActivities,
      transportType,
      estimatedBudget: budgetNum,
      notes: notes.trim() || undefined,
      aiSummary: `Lịch trình thủ công: Tuyến đường ${dep} ➔ ${dest} với phương tiện ${transportType}, kéo dài ${datesSummary} cho ${membersCount} thành viên.`,
    };

    onCreateManualTrip(planData);
    onClose();
  };

  const previewActivities = customActivities.filter((a) => a.dayNumber === selectedPreviewDay);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh] sm:max-h-[88vh] overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md shadow-sky-600/25">
              <Compass className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                Tạo Lịch Trình Thủ Công
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Tự nhập điểm đi, điểm đến & mọi chi tiết hành trình
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

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-5">
          
          {/* 1. Điểm Đi & Điểm Đến (Core Request) */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700/80 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-sky-800 dark:text-sky-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span>Chặng hành trình di chuyển</span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Bắt buộc</span>
            </div>

            {/* Departure (Điểm đi) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Điểm đi (Nơi xuất phát):
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600 dark:text-emerald-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={departureLocation}
                  onChange={(e) => setDepartureLocation(e.target.value)}
                  placeholder="Nhập nơi xuất phát (vd: Hà Nội, TP.HCM, Đà Nẵng...)"
                  required
                  className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>

              {/* Popular departure chips */}
              <div className="flex items-center gap-1.5 mt-2 overflow-x-auto no-scrollbar py-0.5">
                <span className="text-[10px] text-slate-400 font-semibold flex-shrink-0">Gợi ý:</span>
                {POPULAR_DEPARTURES.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setDepartureLocation(city)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                      departureLocation === city
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Connecting Arrow */}
            <div className="flex items-center justify-center my-1 text-slate-400">
              <div className="h-[1px] bg-slate-200 dark:bg-slate-700 flex-1" />
              <div className="mx-3 px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-[10px] font-extrabold flex items-center gap-1">
                <span>Di chuyển tới</span>
                <ArrowRight className="w-3 h-3" />
              </div>
              <div className="h-[1px] bg-slate-200 dark:bg-slate-700 flex-1" />
            </div>

            {/* Destination (Điểm đến) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Điểm đến (Nơi du lịch / dừng chân):
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sky-600 dark:text-sky-400">
                  <Compass className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Nhập nơi muốn đến (vd: Đà Lạt, Phú Quốc, Nha Trang, Sa Pa...)"
                  required
                  className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>

              {/* Popular destination chips */}
              <div className="flex items-center gap-1.5 mt-2 overflow-x-auto no-scrollbar py-0.5">
                <span className="text-[10px] text-slate-400 font-semibold flex-shrink-0">Gợi ý:</span>
                {POPULAR_DESTINATIONS.map((dest) => (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => setDestination(dest)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                      destination === dest
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-sky-400'
                    }`}
                  >
                    {dest}
                  </button>
                ))}
              </div>
            </div>

            {/* Trip Title */}
            <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/80">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Tiêu đề lịch trình:
              </label>
              <input
                type="text"
                value={tripTitle}
                onChange={(e) => {
                  setTripTitle(e.target.value);
                  setIsTitleCustomized(true);
                }}
                placeholder="Đặt tên cho chuyến đi..."
                className="w-full h-10 px-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
              />
            </div>
          </div>

          {/* 2. Thời gian chuyến đi */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-sky-800 dark:text-sky-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span>Thời gian hành trình</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-[11px] font-extrabold">
                {datesSummary}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Ngày khởi hành:
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Ngày kết thúc / về:
                </label>
                <input
                  type="date"
                  value={endDate}
                  min={startDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>

          {/* 3. Phương tiện di chuyển & Thành viên */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700/80 space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-sky-800 dark:text-sky-300 flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>Phương tiện & Quy mô nhóm</span>
            </span>

            {/* Transport options grid */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                Phương tiện di chuyển chính:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {TRANSPORT_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = transportType === opt.label;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setTransportType(opt.label)}
                      className={`h-11 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/25'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-sky-300'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Members & Estimated Budget */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Số người tham gia:
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={membersCount}
                    onChange={(e) => setMembersCount(parseInt(e.target.value, 10) || 1)}
                    className="w-full h-10 pl-8 pr-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Dự trù kinh phí/người:
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Wallet className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="text"
                    value={budgetPerPerson}
                    onChange={(e) => setBudgetPerPerson(e.target.value)}
                    placeholder="3.500.000"
                    className="w-full h-10 pl-8 pr-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* Trip Notes */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                Ghi chú hành lý hoặc lưu ý:
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="vd: Nhớ mang CCCD, áo ấm, bằng lái xe máy, đặt trước phòng view đồi..."
                rows={2}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* 4. Xem trước & Tùy chỉnh các hoạt động từng ngày */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-sky-800 dark:text-sky-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                  <span>Khung hoạt động chi tiết ({customActivities.length} mốc)</span>
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Đã tạo sẵn các mốc từ {departureLocation} đến {destination}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleAddNewActivity(selectedPreviewDay)}
                className="px-2.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-1 transition-all cursor-pointer active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm mốc</span>
              </button>
            </div>

            {/* Day Selector Pills in Modal */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {Array.from({ length: totalDays }, (_, i) => i + 1).map((dayNum) => {
                const isSelected = selectedPreviewDay === dayNum;
                const count = customActivities.filter((a) => a.dayNumber === dayNum).length;
                return (
                  <button
                    key={dayNum}
                    type="button"
                    onClick={() => setSelectedPreviewDay(dayNum)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <span>Ngày {dayNum}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* List of activities for selected day */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {previewActivities.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                  Chưa có mốc nào cho Ngày {selectedPreviewDay}. Bấm "Thêm mốc" ở trên để tạo!
                </div>
              ) : (
                previewActivities.map((act) => (
                  <div
                    key={act.id}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5 relative group"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={act.time}
                          onChange={(e) => handleUpdateActivity(act.id, { time: e.target.value })}
                          className="w-14 px-1.5 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950 font-black text-sky-700 dark:text-sky-300 text-[11px] text-center border border-sky-200 dark:border-sky-800 focus:outline-none"
                        />
                        <input
                          type="text"
                          value={act.title}
                          onChange={(e) => handleUpdateActivity(act.id, { title: e.target.value })}
                          placeholder="Tên hoạt động..."
                          className="flex-1 font-bold text-slate-900 dark:text-slate-100 bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-sky-500 focus:outline-none text-xs"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveActivity(act.id)}
                        className="w-6 h-6 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 flex items-center justify-center transition-colors cursor-pointer"
                        title="Xóa mốc này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 gap-2">
                      <input
                        type="text"
                        value={act.location}
                        onChange={(e) => handleUpdateActivity(act.id, { location: e.target.value })}
                        placeholder="Địa điểm cụ thể..."
                        className="flex-1 truncate bg-transparent focus:outline-none focus:text-slate-800 dark:focus:text-slate-200"
                      />
                      <input
                        type="text"
                        value={act.costText || ''}
                        onChange={(e) => handleUpdateActivity(act.id, { costText: e.target.value })}
                        placeholder="Chi phí..."
                        className="w-24 text-right truncate bg-transparent focus:outline-none focus:text-slate-800 dark:focus:text-slate-200 text-[10px] font-semibold text-slate-400"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-2 h-12 rounded-2xl bg-sky-700 hover:bg-sky-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-700/25 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Tạo lịch trình ngay</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
