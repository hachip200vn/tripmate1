import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  X,
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Wallet,
  Compass,
  ArrowRight,
  CheckCircle2,
  Check,
  PlaneTakeoff,
  PlaneLanding,
  Clock,
  Layers,
  ChevronRight,
  RotateCcw,
  Sliders,
  Car,
  Plane,
  Eye,
  Award
} from 'lucide-react';
import { TripPlanData } from '../types';
import { generatePrototypeTripPlan } from '../data/tripData';

interface AiDestinationRecommendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPlan?: (plan: TripPlanData) => void;
  onApplyTripPlan?: (plan: TripPlanData) => void;
  onApplyGeneratedPlan?: (plan: TripPlanData) => void;
  onOpenManualPlanner?: () => void;
}

interface DestinationCandidate {
  id: string;
  name: string;
  province: string;
  region: string;
  matchScore: number; // e.g. 98 -> 98%
  badgeTag: string;
  estimatedCostText: string;
  transportText: string;
  travelTimeText: string;
  coverImage: string;
  reasons: string[];
  highlights: string[];
  suggestedDuration: string;
}

const COMMON_ORIGINS = [
  'Hà Nội',
  'TP. Hồ Chí Minh',
  'Đà Nẵng',
  'Hải Phòng',
  'Cần Thơ',
  'Nghệ An',
  'Khánh Hòa'
];

const TRAVEL_VIBES = [
  { id: 'beach', label: 'Nghỉ dưỡng & Biển', emoji: '⛱️' },
  { id: 'photo', label: 'Sống ảo & Check-in', emoji: '📸' },
  { id: 'food', label: 'Food tour & Ẩm thực', emoji: '🍲' },
  { id: 'nature', label: 'Thiên nhiên & Trekking', emoji: '🥾' },
  { id: 'culture', label: 'Văn hóa & Lịch sử', emoji: '🏛️' },
  { id: 'healing', label: 'Chữa lành & Yên bình', emoji: '☕' },
  { id: 'adventure', label: 'Phượt & Du lịch bụi', emoji: '🎒' },
  { id: 'family', label: 'Gia đình & Thư giãn', emoji: '👨‍👩‍👧‍👦' },
];

export const AiDestinationRecommendModal: React.FC<AiDestinationRecommendModalProps> = ({
  isOpen,
  onClose,
  onApplyPlan,
  onApplyTripPlan,
  onApplyGeneratedPlan,
  onOpenManualPlanner,
}) => {
  // Input Step States
  const [step, setStep] = useState<'input' | 'scanning' | 'results'>('input');
  const [origin, setOrigin] = useState('Hà Nội');
  const [daysCount, setDaysCount] = useState(4);
  const [membersCount, setMembersCount] = useState(5);
  const [budgetTier, setBudgetTier] = useState<'budget' | 'standard' | 'luxury'>('standard');
  const [selectedVibes, setSelectedVibes] = useState<string[]>([
    'Nghỉ dưỡng & Biển',
    'Sống ảo & Check-in',
    'Food tour & Ẩm thực',
  ]);
  const [previewCandidate, setPreviewCandidate] = useState<DestinationCandidate | null>(null);

  // Scanning simulation state
  const [scanStepText, setScanStepText] = useState('Đang khởi động thuật toán định tuyến AI...');
  const [scanProgress, setScanProgress] = useState(15);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  const toggleVibe = (label: string) => {
    setSelectedVibes((prev) =>
      prev.includes(label) ? prev.filter((v) => v !== label) : [...prev, label]
    );
  };

  // Generate Candidates based on inputs and calculate match score
  const topCandidates: DestinationCandidate[] = useMemo(() => {
    const isBeach = selectedVibes.some((v) => v.includes('Biển'));
    const isNature = selectedVibes.some((v) => v.includes('Thiên nhiên') || v.includes('Phượt'));
    const isCulture = selectedVibes.some((v) => v.includes('Văn hóa'));
    const isHealing = selectedVibes.some((v) => v.includes('Chữa lành') || v.includes('Sống ảo'));

    const allCandidates: DestinationCandidate[] = [
      {
        id: 'danang',
        name: 'Đà Nẵng — Hội An',
        province: 'Đà Nẵng & Quảng Nam',
        region: 'Miền Trung',
        matchScore: isBeach ? 98 : 92,
        badgeTag: 'Phù hợp nhất với nhóm bạn',
        estimatedCostText: '~4.2 - 5.0 triệu / người',
        transportText: origin.includes('Đà Nẵng') ? 'Xe máy/Taxi' : 'Máy bay (1h20p)',
        travelTimeText: '1h20p bay',
        coverImage: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&auto=format&fit=crop&q=80',
        reasons: [
          'Kết hợp biển Mỹ Khê và phố cổ Hội An cổ kính lên đèn lung linh.',
          'Hệ thống ẩm thực phong phú: Mì Quảng, bánh tráng cuốn thịt heo, hải sản tươi ngon.',
          'Chi phí di chuyển và lưu trú cực kỳ tối ưu cho ngân sách nhóm.',
        ],
        highlights: ['Cầu Vàng Bà Nà Hills', 'Biển Mỹ Khê', 'Phố cổ Hội An', 'Bán đảo Sơn Trà'],
        suggestedDuration: `${daysCount} ngày ${Math.max(1, daysCount - 1)} đêm`,
      },
      {
        id: 'phuquoc',
        name: 'Phú Quốc — Đảo Ngọc',
        province: 'Kiên Giang',
        region: 'Miền Nam',
        matchScore: isBeach ? 95 : 88,
        badgeTag: 'Thiên đường biển nhiệt đới',
        estimatedCostText: '~4.8 - 6.5 triệu / người',
        transportText: 'Máy bay thẳng',
        travelTimeText: origin.includes('TP. Hồ Chí Minh') ? '55 phút bay' : '2h15p bay',
        coverImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&auto=format&fit=crop&q=80',
        reasons: [
          'Biển xanh trong vắt, hoàng hôn Sunset Sanato nổi tiếng toàn cầu.',
          'Tour 4 đảo cano tốc độ cao, lặn ngắm san hô Hòn Mây Rút.',
          'Chợ đêm Dương Đông và các khu giải trí Grand World hoạt động 24/7.',
        ],
        highlights: ['Sunset Sanato', 'Tour 4 Đảo Cano', 'Grand World', 'Cáp treo Hòn Thơm'],
        suggestedDuration: `${daysCount} ngày ${Math.max(1, daysCount - 1)} đêm`,
      },
      {
        id: 'dalat',
        name: 'Đà Lạt — Thành Phố Ngàn Hoa',
        province: 'Lâm Đồng',
        region: 'Tây Nguyên',
        matchScore: isHealing || isNature ? 94 : 89,
        badgeTag: 'Khí hậu se lạnh & Triệu góc sống ảo',
        estimatedCostText: '~3.5 - 4.5 triệu / người',
        transportText: origin.includes('TP. Hồ Chí Minh') ? 'Xe Limousine giường nằm / Bay' : 'Máy bay (1h45p)',
        travelTimeText: '1h45p bay',
        coverImage: 'https://images.unsplash.com/photo-1509067237077-83c92a95c8ba?w=800&auto=format&fit=crop&q=80',
        reasons: [
          'Thời tiết mát lạnh 16-20°C, trăm quán cafe view thung lũng sương mù.',
          'Săn mây Cầu Đất lúc bình minh và thưởng thức lẩu gà lá é, bánh tráng nướng.',
          'Chi phí lưu trú homestay nhóm rất tiết kiệm và thân thiện.',
        ],
        highlights: ['Săn mây Cầu Đất', 'Hồ Tuyền Lâm', 'Quảng trường Lâm Viên', 'Lẩu bò Ba Toa'],
        suggestedDuration: `${daysCount} ngày ${Math.max(1, daysCount - 1)} đêm`,
      },
      {
        id: 'sapa',
        name: 'Sa Pa & Fansipan',
        province: 'Lào Cai',
        region: 'Miền Bắc',
        matchScore: isNature ? 91 : 85,
        badgeTag: 'Nóc nhà Đông Dương & Bản làng mù sương',
        estimatedCostText: '~3.2 - 4.2 triệu / người',
        transportText: origin.includes('Hà Nội') ? 'Xe Cabin đôi cao tốc (5h)' : 'Bay ra HN + Xe Limousine',
        travelTimeText: '5h cao tốc từ HN',
        coverImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&auto=format&fit=crop&q=80',
        reasons: [
          'Chinh phục đỉnh Fansipan 3.143m ngắm biển mây bồng bềnh.',
          'Check-in bản Cát Cát, thung lũng Mường Hoa và đèo Ô Quy Hồ.',
          'Thưởng thức lẩu cá hồi, thịt lợn cắp nách và tắm lá thuốc Dao đỏ.',
        ],
        highlights: ['Đỉnh Fansipan', 'Bản Cát Cát', 'Đèo Ô Quy Hồ', 'Thung lũng Mường Hoa'],
        suggestedDuration: `${daysCount} ngày ${Math.max(1, daysCount - 1)} đêm`,
      },
      {
        id: 'nhatrang',
        name: 'Nha Trang — Vịnh Biển Nắng Ấm',
        province: 'Khánh Hòa',
        region: 'Miền Nam Trung Bộ',
        matchScore: isBeach ? 88 : 82,
        badgeTag: 'Vịnh biển đẹp nhất Việt Nam',
        estimatedCostText: '~3.8 - 4.8 triệu / người',
        transportText: 'Máy bay hoặc Tàu hỏa 5 sao',
        travelTimeText: '1h30p bay',
        coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
        reasons: [
          'Thời tiết nắng đẹp gần như quanh năm, biển êm và nước trong xanh.',
          'Hệ thống công viên giải trí VinWonders và tắm bùn khoáng thư giãn.',
          'Hải sản tươi sống tại tháp Bà, nem nướng Ninh Hòa trứ danh.',
        ],
        highlights: ['Hòn Tằm', 'VinWonders Nha Trang', 'Tháp Bà Ponagar', 'Lặn biển Hòn Mun'],
        suggestedDuration: `${daysCount} ngày ${Math.max(1, daysCount - 1)} đêm`,
      },
      {
        id: 'hagiang',
        name: 'Hà Giang — Cao Nguyên Đá',
        province: 'Hà Giang',
        region: 'Miền Bắc',
        matchScore: isNature ? 93 : 80,
        badgeTag: 'Cung đường phượt huyền thoại',
        estimatedCostText: '~3.0 - 3.8 triệu / người',
        transportText: 'Xe limousine giường nằm từ Hà Nội',
        travelTimeText: '6h di chuyển',
        coverImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&auto=format&fit=crop&q=80',
        reasons: [
          'Chinh phục đèo Mã Pí Lèng - một trong tứ đại đỉnh đèo Việt Nam.',
          'Đi thuyền trên dòng sông Nho Quế ngọc bích hẻm Tu Sản.',
          'Khám phá văn hóa các dân tộc H’Mông, Dao, Lô Lô độc đáo.',
        ],
        highlights: ['Đèo Mã Pí Lèng', 'Sông Nho Quế', 'Cột cờ Lũng Cú', 'Dinh vua Mèo'],
        suggestedDuration: `${daysCount} ngày ${Math.max(1, daysCount - 1)} đêm`,
      },
    ];

    // Sort descending by match score and take top 5
    return allCandidates
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);
  }, [selectedVibes, origin, daysCount]);

  if (!isOpen) return null;

  // Run AI matching simulation
  const handleStartAiScan = () => {
    setStep('scanning');
    setScanProgress(15);
    setScanStepText(`Đang định vị xuất phát từ ${origin} & phân tích phương tiện tối ưu...`);

    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    const t1 = setTimeout(() => {
      setScanProgress(40);
      setScanStepText(`Đang đối chiếu thời lượng ${daysCount} ngày & ngân sách nhóm ${membersCount} người...`);
    }, 700);

    const t2 = setTimeout(() => {
      setScanProgress(70);
      setScanStepText(`Đang lọc sở thích [${selectedVibes.slice(0, 2).join(', ')}] với dữ liệu du lịch...`);
    }, 1500);

    const t3 = setTimeout(() => {
      setScanProgress(95);
      setScanStepText('Đang hoàn tất chấm điểm % tương thích Top 5 điểm đến...');
    }, 2300);

    const t4 = setTimeout(() => {
      setScanProgress(100);
      setStep('results');
    }, 3000);

    timersRef.current = [t1, t2, t3, t4];
  };

  // Choose a destination and generate plan
  const handleSelectCandidate = (candidate: DestinationCandidate) => {
    const today = new Date();
    const startDateObj = new Date(today);
    startDateObj.setDate(today.getDate() + 7); // 1 week from now
    const endDateObj = new Date(startDateObj);
    endDateObj.setDate(startDateObj.getDate() + (daysCount - 1));

    const y1 = startDateObj.getFullYear();
    const m1 = String(startDateObj.getMonth() + 1).padStart(2, '0');
    const d1 = String(startDateObj.getDate()).padStart(2, '0');

    const y2 = endDateObj.getFullYear();
    const m2 = String(endDateObj.getMonth() + 1).padStart(2, '0');
    const d2 = String(endDateObj.getDate()).padStart(2, '0');

    const budgetLabel =
      budgetTier === 'budget'
        ? 'Tiết kiệm (~2.5-3.5tr/người)'
        : budgetTier === 'standard'
        ? 'Tiêu chuẩn (~4.5-5.5tr/người)'
        : 'Sang chảnh (>8tr/người)';

    const generatedPlan = generatePrototypeTripPlan({
      destination: candidate.name,
      startDate: `${y1}-${m1}-${d1}`,
      endDate: `${y2}-${m2}-${d2}`,
      membersCount,
      budget: budgetLabel,
      vibes: selectedVibes,
      pace: 'balanced',
      notes: `Gợi ý tự động từ AI: Xuất phát từ ${origin} (${candidate.matchScore}% phù hợp)`,
    });

    // Add extra details
    generatedPlan.origin = origin;
    generatedPlan.tripTitle = `Hành trình ${candidate.name} (${candidate.matchScore}% Phù hợp)`;
    generatedPlan.aiSummary = `Được AI TripMate tối ưu theo yêu cầu: Xuất phát từ ${origin}, ${daysCount} ngày, ngân sách ${budgetLabel}, phong cách: ${selectedVibes.join(', ')}.`;

    const applyFn = onApplyPlan || onApplyTripPlan || onApplyGeneratedPlan;
    if (applyFn) {
      applyFn(generatedPlan);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 sm:zoom-in-95">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 sticky top-0 z-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-sky-600/30">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 dark:text-sky-400">
                Gợi ý tự động thông minh
              </span>
              <h3 className="font-black text-base text-slate-900 dark:text-slate-100">
                {step === 'input'
                  ? 'Gợi ý điểm đến với AI'
                  : step === 'scanning'
                  ? 'AI đang phân tích...'
                  : 'Top 5 điểm đến phù hợp nhất'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {step === 'results' && (
              <button
                onClick={() => setStep('input')}
                className="p-2 rounded-xl text-slate-500 hover:text-sky-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-bold"
                title="Thay đổi tiêu chí tìm kiếm"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Tìm lại</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {/* STEP 1: CRITERIA INPUT */}
          {step === 'input' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/60 text-xs text-sky-900 dark:text-sky-200 leading-relaxed flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400 flex-shrink-0 mt-0.5" />
                <span>
                  Chỉ cần cung cấp điểm xuất phát, số ngày, số người và sở thích — AI sẽ tự động phân tích và xếp hạng <strong>Top 5 điểm đến lý tưởng nhất</strong> tính theo % phù hợp!
                </span>
              </div>

              {/* 1. Origin (Điểm xuất phát) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                  <PlaneTakeoff className="w-3.5 h-3.5 text-sky-600" />
                  <span>Điểm xuất phát ở đâu?</span>
                </label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="VD: Hà Nội, TP.HCM, Đà Nẵng..."
                  className="w-full h-11 px-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 font-bold"
                />
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {COMMON_ORIGINS.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setOrigin(city)}
                      className={`text-xs px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                        origin === city
                          ? 'bg-sky-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Duration & Pax */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Days count */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-600" />
                    <span>Đi bao nhiêu ngày? ({daysCount}N{Math.max(1, daysCount - 1)}Đ)</span>
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[2, 3, 4, 5].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDaysCount(d)}
                        className={`h-9 rounded-xl text-xs font-bold transition-all ${
                          daysCount === d
                            ? 'bg-sky-600 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        {d} ngày
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pax count */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-sky-600" />
                    <span>Bao nhiêu người đi? ({membersCount} người)</span>
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[2, 4, 5, 8].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setMembersCount(num)}
                        className={`h-9 rounded-xl text-xs font-bold transition-all ${
                          membersCount === num
                            ? 'bg-sky-600 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        {num} người
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Budget */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                  <Wallet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Mức ngân sách dự kiến mỗi người</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'budget', title: 'Tiết kiệm', desc: '~2.5 - 3.5tr' },
                    { key: 'standard', title: 'Tiêu chuẩn', desc: '~4 - 6 triệu' },
                    { key: 'luxury', title: 'Thoải mái', desc: '> 7 triệu' },
                  ].map((b) => (
                    <button
                      key={b.key}
                      type="button"
                      onClick={() => setBudgetTier(b.key as any)}
                      className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                        budgetTier === b.key
                          ? 'border-sky-500 bg-sky-50/70 dark:bg-sky-950/60 shadow-sm'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100'
                      }`}
                    >
                      <span className={`block text-xs font-black ${budgetTier === b.key ? 'text-sky-700 dark:text-sky-300' : 'text-slate-800 dark:text-slate-200'}`}>
                        {b.title}
                      </span>
                      <span className="block text-[10px] text-slate-400 font-semibold mt-0.5">
                        {b.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Travel Style (Loại hình du lịch) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-amber-500" />
                    <span>Loại hình du lịch mong muốn</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Chọn 1 hoặc nhiều</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TRAVEL_VIBES.map((v) => {
                    const isSelected = selectedVibes.includes(v.label);
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => toggleVibe(v.label)}
                        className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-2 ${
                          isSelected
                            ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/70 text-sky-900 dark:text-sky-200 shadow-sm'
                            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-base">{v.emoji}</span>
                        <span className="text-xs font-bold leading-tight">{v.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleStartAiScan}
                  className="w-full h-12 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-700 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-sky-600/30 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                  <span>Khởi chạy AI Quét & Tìm 5 Điểm Đến Phù Hợp Nhất</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: AI SCANNING SIMULATION */}
          {step === 'scanning' && (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-3xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 flex items-center justify-center shadow-lg text-sky-600 dark:text-sky-400">
                  <Compass className="w-12 h-12 animate-spin text-sky-600 stroke-[1.5]" />
                </div>
                <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center shadow-md animate-bounce">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              <h4 className="text-base font-black text-slate-900 dark:text-slate-100 mb-1">
                TripMate AI đang đối chiếu dữ liệu...
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-6 h-8 flex items-center justify-center">
                {scanStepText}
              </p>

              {/* Progress bar */}
              <div className="w-full max-w-xs bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-gradient-to-r from-sky-500 to-indigo-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              <span className="text-[11px] font-bold text-sky-700 dark:text-sky-400">
                {scanProgress}% hoàn tất
              </span>
            </div>
          )}

          {/* STEP 3: TOP 5 CANDIDATES RANKED BY MATCH % */}
          {step === 'results' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1">
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <span>Kết quả gợi ý từ AI</span>
                    <span className="text-xs font-normal text-slate-400">
                      (Xếp hạng theo % phù hợp từ cao xuống thấp)
                    </span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Xuất phát từ <strong>{origin}</strong> • {daysCount} ngày • {membersCount} người
                  </p>
                </div>
              </div>

              {/* Candidates List */}
              <div className="space-y-3.5">
                {topCandidates.map((c, index) => {
                  return (
                    <div
                      key={c.id}
                      className="bg-white dark:bg-slate-800/90 rounded-2xl sm:rounded-3xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                    >
                      {/* Top Rank Badge */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-6 h-6 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-black flex items-center justify-center">
                            #{index + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                            {c.province}
                          </span>
                        </div>

                        {/* Match % Badge */}
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-black shadow-sm">
                          <Award className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{c.matchScore}% Phù hợp</span>
                        </div>
                      </div>

                      {/* Main Destination Info */}
                      <div className="flex gap-3 items-start mb-3">
                        <img
                          src={c.coverImage}
                          alt={c.name}
                          className="w-20 h-20 rounded-2xl object-cover flex-shrink-0 shadow-sm border border-slate-100 dark:border-slate-700"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-black text-base text-slate-900 dark:text-slate-100 truncate">
                            {c.name}
                          </h3>
                          <span className="inline-block text-[11px] font-bold text-sky-700 dark:text-sky-300 mb-1">
                            {c.badgeTag}
                          </span>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5">
                            <p className="flex items-center gap-1">
                              <Plane className="w-3 h-3 text-sky-600" />
                              <span>Di chuyển: <strong>{c.transportText}</strong></span>
                            </p>
                            <p className="flex items-center gap-1">
                              <Wallet className="w-3 h-3 text-emerald-600" />
                              <span>Ngân sách ước tính: <strong className="text-emerald-700 dark:text-emerald-400">{c.estimatedCostText}</strong></span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Why AI recommend (3 reasons) */}
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 mb-3 space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                          Vì sao AI khuyến nghị điểm đến này:
                        </span>
                        {c.reasons.map((r, rIdx) => (
                          <p key={rIdx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5 leading-tight">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{r}</span>
                          </p>
                        ))}
                      </div>

                      {/* Highlight spots */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {c.highlights.map((h, hIdx) => (
                          <span
                            key={hIdx}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                          >
                            📍 {h}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setPreviewCandidate(c)}
                          className="flex-1 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-500" />
                          <span>Xem chi tiết</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSelectCandidate(c)}
                          className="flex-2 h-10 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-sky-600/25 active:scale-95 transition-all cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>Chọn điểm đến & Tạo lịch trình</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Quick Preview Modal for a candidate */}
        {previewCandidate && (
          <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {previewCandidate.matchScore}% Phù hợp
                </span>
                <button
                  onClick={() => setPreviewCandidate(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <img
                src={previewCandidate.coverImage}
                alt={previewCandidate.name}
                className="w-full h-40 rounded-2xl object-cover mb-3"
              />

              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 mb-1">
                {previewCandidate.name}
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Hành trình mẫu: {previewCandidate.suggestedDuration} • Ngân sách: {previewCandidate.estimatedCostText}
              </p>

              <div className="space-y-1.5 mb-4">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">
                  Điểm nhấn nổi bật:
                </span>
                {previewCandidate.reasons.map((r, idx) => (
                  <p key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-sky-600 flex-shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </p>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewCandidate(null)}
                  className="flex-1 h-10 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Đóng
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleSelectCandidate(previewCandidate);
                    setPreviewCandidate(null);
                  }}
                  className="flex-2 h-10 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Áp dụng điểm đến này ngay</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
