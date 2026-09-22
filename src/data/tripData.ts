import { TripDay, TimelineActivity, NotificationItem, VotePoll, ExpenseItem, Member, TripPlanData } from '../types';

export const initialMembers: Member[] = [
  {
    id: 'm1',
    name: 'Nguyễn Việt Hùng',
    role: 'Trưởng nhóm',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    initials: 'VH',
    isHost: true,
    phone: '0987 654 321',
    paidAmount: 2450000,
    owesAmount: 0
  },
  {
    id: 'm2',
    name: 'Khánh Huy',
    role: 'Thủ quỹ',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    initials: 'KH',
    phone: '0912 345 889',
    paidAmount: 1800000,
    owesAmount: 0
  },
  {
    id: 'm3',
    name: 'Minh Anh',
    role: 'Thành viên',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    initials: 'MA',
    phone: '0933 112 233',
    paidAmount: 450000,
    owesAmount: 350000
  },
  {
    id: 'm4',
    name: 'Ngọc Linh',
    role: 'Nhiếp ảnh gia',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    initials: 'NL',
    phone: '0908 998 776',
    paidAmount: 600000,
    owesAmount: 200000
  },
  {
    id: 'm5',
    name: 'Hoàng An',
    role: 'Thành viên',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    initials: 'AN',
    phone: '0977 445 566',
    paidAmount: 0,
    owesAmount: 850000
  }
];

export const initialDays: TripDay[] = [
  { dayNumber: 1, date: '2025-04-15', displayDate: '15/04', title: 'Đến nơi & Nhận phòng', activitiesCount: 3 },
  { dayNumber: 2, date: '2025-04-16', displayDate: '16/04', title: 'Bà Nà & Biển Mỹ Khê', activitiesCount: 5 },
  { dayNumber: 3, date: '2025-04-17', displayDate: '17/04', title: 'Phố cổ Hội An', activitiesCount: 4 },
  { dayNumber: 4, date: '2025-04-18', displayDate: '18/04', title: 'Mua sắm & Về lại', activitiesCount: 2 }
];

export const initialTimelineActivities: TimelineActivity[] = [
  // Day 1
  {
    id: 'act-101',
    dayNumber: 1,
    time: '09:30',
    category: 'Chuyến bay & Di chuyển',
    title: 'Hạ cánh sân bay Quốc tế Đà Nẵng (DAD)',
    location: 'Cổng đến T1, Sân bay Đà Nẵng',
    costText: 'Đã thanh toán vé',
    statusText: 'Đúng giờ',
    statusType: 'transport',
    iconType: 'transport',
    details: 'Xe đón hợp đồng 7 chỗ đã chờ ở bãi xe B1',
    note: 'VJ-628 cất cánh từ SGN'
  },
  {
    id: 'act-102',
    dayNumber: 1,
    time: '11:30',
    category: 'Ẩm thực trưa',
    title: 'Bánh tráng cuốn thịt heo Đại Lộc',
    location: '97 Trưng Nữ Vương, Hải Châu',
    costText: '~75.000đ/phần',
    statusText: 'Đã duyệt',
    statusType: 'approved',
    iconType: 'food',
    details: 'Đặc sản thịt heo hai đầu da chấm mắm nêm'
  },
  {
    id: 'act-103',
    dayNumber: 1,
    time: '14:00',
    category: 'Lưu trú',
    title: 'Check-in Sala Danang Beach Hotel',
    location: '36 Lâm Hoành, Phước Mỹ, Sơn Trà',
    costText: '2 phòng Ocean View',
    statusText: 'Đã đặt phòng',
    statusType: 'booked',
    iconType: 'landmark',
    details: 'Cách bãi biển Mỹ Khê 120m, có hồ bơi vô cực tầng 25'
  },
  // Day 2 (Matches Image 1 exactly!)
  {
    id: 'act-201',
    dayNumber: 2,
    time: '08:30',
    category: 'Ẩm thực sáng',
    title: 'Ăn sáng Mì Quảng Bà Mua',
    location: '19 Trần Bình Trọng, Hải Châu',
    costText: '~55.000đ/tô',
    pricePerPerson: 55000,
    statusText: 'Đã duyệt',
    statusType: 'approved',
    iconType: 'food',
    details: 'Thực đơn: Mì Quảng ếch, tôm thịt, gà ta thả vườn',
    note: '5 người ăn'
  },
  {
    id: 'act-202',
    dayNumber: 2,
    time: '10:00',
    category: 'Điểm nhấn chính',
    title: 'Check-in Cầu Vàng & Bà Nà Hills',
    location: 'Tuyến cáp treo Thác Tóc Tiên',
    costText: '900.000đ',
    pricePerPerson: 900000,
    statusText: 'Xe đón',
    statusType: 'transport',
    iconType: 'landmark',
    imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=300&auto=format&fit=crop&q=80',
    details: 'Vé cáp treo khứ hồi: 900.000đ',
    driverInfo: 'Tài xế Hùng (0912.xxx.888) đón tại sảnh khách sạn lúc 09:15'
  },
  {
    id: 'act-203',
    dayNumber: 2,
    time: '13:00',
    category: 'Ăn trưa',
    title: 'Ăn trưa Buffet Bốn Mùa',
    location: 'Tầng 2 Quả Cầu Bà Nà (Bàn 14)',
    costText: 'Bao gồm trong combo',
    statusText: 'Đã đặt bàn',
    statusType: 'booked',
    iconType: 'dining',
    details: 'Bao gồm trong combo vé',
    note: 'Kèm trái cây tráng miệng'
  },
  {
    id: 'act-204',
    dayNumber: 2,
    time: '16:30',
    category: 'Giải trí ngoài trời',
    title: 'Tắm biển Mỹ Khê & lướt ván',
    location: 'Bãi tắm số 2, Đà Nẵng',
    costText: 'Thuê ván ~150.000đ/giờ',
    pricePerPerson: 150000,
    statusText: '5/5 đồng ý',
    statusType: 'voted',
    iconType: 'beach',
    details: 'Thuê ván lướt sóng SUP & ngắm hoàng hôn rực rỡ trên bãi biển Mỹ Khê',
    note: 'Hoàng hôn đẹp'
  },
  {
    id: 'act-205',
    dayNumber: 2,
    time: '19:30',
    category: 'Đêm Hội An',
    title: 'Dạo phố cổ Hội An & Thả hoa đăng',
    location: 'Bờ sông Hoài, phố Bạch Đằng',
    costText: 'Thuyền + hoa: 100.000đ',
    pricePerPerson: 100000,
    statusText: 'Chờ chốt giờ',
    statusType: 'pending',
    iconType: 'night',
    details: 'Ngắm lồng đèn rực rỡ, thưởng thức chè mè đen và đi thuyền thả đèn hoa đăng',
    voteStats: 'Bình chọn lại'
  },
  // Day 3
  {
    id: 'act-301',
    dayNumber: 3,
    time: '08:00',
    category: 'Cà phê & Điểm tâm',
    title: 'Cà phê Faifo Hội An & Bánh mì Phượng',
    location: '130 Trần Phú, Minh An, Hội An',
    costText: '~60.000đ/người',
    statusText: 'Đã duyệt',
    statusType: 'approved',
    iconType: 'food',
    details: 'Góc sân thượng ngắm trọn vẹn mái ngói rêu phong phố cổ Hội An'
  },
  {
    id: 'act-302',
    dayNumber: 3,
    time: '15:00',
    category: 'Trải nghiệm văn hóa',
    title: 'Rừng dừa Bảy Mẫu & Thuyền thúng',
    location: 'Cẩm Thanh, Hội An',
    costText: '150.000đ/người',
    statusText: 'Đã đặt cọc',
    statusType: 'booked',
    iconType: 'landmark',
    details: 'Múa thúng xoay vòng vui nhộn, câu cua đá cùng ngư dân địa phương'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'vote',
    category: 'trip',
    title: 'BÌNH CHỌN MỚI',
    content: 'Linh vừa tạo bình chọn "Chọn nhà hàng hải sản tối ngày 2". Có 3 địa điểm đề xuất gần Bãi biển Mỹ Khê. Hạn chốt 18:00 hôm nay.',
    timeAgo: '15 phút trước',
    isUnread: true,
    actionText: 'Bình chọn ngay',
    meta: {
      voters: ['Linh', 'Huy', 'Minh Anh']
    }
  },
  {
    id: 'notif-2',
    type: 'expense',
    category: 'expense',
    title: 'KHOẢN CHI MỚI',
    content: 'Huy vừa thêm "Thuê xe máy & Xăng xe" (450.000 đ). Quỹ chung • 5 thành viên',
    timeAgo: '1 giờ trước',
    isUnread: true,
    actionText: 'Xem chi phí',
    meta: {
      amount: '450.000 đ',
      yourShare: '90.000 đ'
    }
  },
  {
    id: 'notif-3',
    type: 'reminder',
    category: 'trip',
    title: 'NHẮC NHỞ LỊCH TRÌNH',
    content: 'Còn 30 phút nữa đến hoạt động "Ngắm hoàng hôn & Cocktail tại A La Carte Rooftop Bar" tại 200 Võ Nguyên Giáp, Phước Mỹ, Sơn Trà',
    timeAgo: '3 giờ trước',
    isUnread: false
  },
  {
    id: 'notif-4',
    type: 'member',
    category: 'trip',
    title: 'THÀNH VIÊN MỚI',
    content: 'Minh Anh đã chấp nhận lời mời tham gia chuyến đi "Đà Nẵng — Hội An". Vai trò: Khách • Đồng bộ danh sách công việc',
    timeAgo: '18:30 hôm qua',
    isUnread: false
  },
  {
    id: 'notif-5',
    type: 'settle',
    category: 'expense',
    title: 'QUYẾT TOÁN HOÀN TẤT',
    content: 'Nam đã xác nhận bạn chuyển khoản thành công 120.000 đ. Giao dịch đối soát tiền bữa trưa bánh tráng cuốn thịt heo.',
    timeAgo: '14:15 hôm qua',
    isUnread: false
  },
  {
    id: 'notif-6',
    type: 'flight',
    category: 'trip',
    title: 'VÉ ĐIỆN TỬ & CHECK-IN',
    content: 'Chuyến bay VJ-628 khởi hành vào 08:30 sáng mai. Vui lòng chuẩn bị CCCD / Hộ chiếu.',
    timeAgo: '2 ngày trước',
    isUnread: false,
    meta: {
      flightCode: 'VJ-628',
      route: 'SGN → DAD',
      seat: '14A',
      gate: '04'
    }
  }
];

export const initialPolls: VotePoll[] = [
  {
    id: 'poll-1',
    title: 'Chọn nhà hàng hải sản tối ngày 2',
    creator: 'Ngọc Linh',
    deadline: '18:00 hôm nay',
    category: 'Ẩm thực tối',
    status: 'active',
    options: [
      {
        id: 'opt-101',
        title: 'Hải sản Bé Mặn (Võ Nguyên Giáp)',
        location: 'Lô 14 Võ Nguyên Giáp, Mân Thái',
        priceText: '~350.000đ/người',
        votes: 3,
        votedByMe: true,
        voterAvatars: ['VH', 'NL', 'KH']
      },
      {
        id: 'opt-102',
        title: 'Hải sản Năm Đảnh (K97/23 Trần Duy Chiến)',
        location: 'Trần Duy Chiến, Sơn Trà',
        priceText: '~250.000đ/người - Quán đồng giá',
        votes: 2,
        votedByMe: false,
        voterAvatars: ['MA', 'AN']
      },
      {
        id: 'opt-103',
        title: 'Hải sản Cua Đỏ (Hoàng Sa)',
        location: '233 Nguyễn Tất Thành',
        priceText: '~400.000đ/người - Không gian sang',
        votes: 0,
        votedByMe: false,
        voterAvatars: []
      }
    ]
  },
  {
    id: 'poll-2',
    title: 'Lựa chọn khung giờ đi thuyền thả hoa đăng Hội An',
    creator: 'Nguyễn Việt Hùng',
    deadline: '20:00 ngày 16/04',
    category: 'Trải nghiệm sông Hoài',
    status: 'active',
    options: [
      {
        id: 'opt-201',
        title: '18:30 - Ngay lúc chập tối (Hoàng hôn)',
        location: 'Bến thuyền Bạch Đằng',
        priceText: '100.000đ/thuyền (4 người)',
        votes: 4,
        votedByMe: true,
        voterAvatars: ['VH', 'MA', 'KH', 'NL']
      },
      {
        id: 'opt-202',
        title: '20:00 - Sau khi ăn tối xong (Đèn lồng sáng nhất)',
        location: 'Bến thuyền Bạch Đằng',
        priceText: '100.000đ/thuyền (4 người)',
        votes: 1,
        votedByMe: false,
        voterAvatars: ['AN']
      }
    ]
  }
];

export const initialExpenses: ExpenseItem[] = [
  {
    id: 'exp-1',
    title: 'Vé cáp treo Sun World Bà Nà Hills (5 vé)',
    category: 'ticket',
    amount: 4500000,
    paidBy: 'm1',
    paidByName: 'Nguyễn Việt Hùng',
    paidByAvatar: 'VH',
    splitWithCount: 5,
    date: '16/04/2025'
  },
  {
    id: 'exp-2',
    title: 'Thuê 3 xe máy & đổ xăng 3 ngày',
    category: 'transport',
    amount: 450000,
    paidBy: 'm2',
    paidByName: 'Khánh Huy',
    paidByAvatar: 'KH',
    splitWithCount: 5,
    date: '15/04/2025'
  },
  {
    id: 'exp-3',
    title: 'Ăn sáng Mì Quảng Bà Mua & nước mía',
    category: 'food',
    amount: 320000,
    paidBy: 'm4',
    paidByName: 'Ngọc Linh',
    paidByAvatar: 'NL',
    splitWithCount: 5,
    date: '16/04/2025'
  },
  {
    id: 'exp-4',
    title: 'Đặt cọc khách sạn Sala Danang Beach',
    category: 'stay',
    amount: 2000000,
    paidBy: 'm1',
    paidByName: 'Nguyễn Việt Hùng',
    paidByAvatar: 'VH',
    splitWithCount: 5,
    date: '14/04/2025'
  }
];

export const exploreSpots = [
  {
    id: 'spot-1',
    name: 'Cầu Rồng Đà Nẵng',
    category: 'Biểu tượng & Check-in',
    tag: 'Phù hợp đi nhóm đông',
    rating: 4.8,
    reviewsCount: 3280,
    address: 'Đường Nguyễn Văn Linh, Phước Ninh, Hải Châu',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&auto=format&fit=crop&q=80',
    tip: 'Nên ghé lúc 20:30 vào Thứ Bảy & Chủ Nhật để chọn chỗ đứng view thẳng đầu rồng xem phun lửa và nước.',
    priceText: 'Miễn phí tham quan'
  },
  {
    id: 'spot-2',
    name: 'Phố Cổ Hội An & Bến thuyền Bạch Đằng',
    category: 'Di sản & Văn hóa',
    tag: 'Lãng mạn & Ẩm thực',
    rating: 4.9,
    reviewsCount: 5410,
    address: 'Bạch Đằng, Phường Minh An, Hội An',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80',
    tip: 'Lung linh nhất từ 18:30 khi các dãy đèn lồng đồng loạt bật sáng dọc theo dòng sông Hoài.',
    priceText: 'Vé tham quan ~120.000đ'
  },
  {
    id: 'spot-3',
    name: 'Bãi biển Mỹ Khê',
    category: 'Biển & Nghỉ dưỡng',
    tag: 'Top bãi biển đẹp hành tinh',
    rating: 4.7,
    reviewsCount: 4120,
    address: 'Võ Nguyên Giáp, Phước Mỹ, Sơn Trà',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    tip: 'Bãi tắm sạch, cát trắng mịn, lý tưởng để tắm sáng sớm (5:30 - 7:00) hoặc lướt ván chiều tà.',
    priceText: 'Tự do tắm biển'
  },
  {
    id: 'spot-4',
    name: 'Chợ đêm Sơn Trà & Ẩm thực đường phố',
    category: 'Ẩm thực & Mua sắm',
    tag: 'Giá bình dân',
    rating: 4.6,
    reviewsCount: 1890,
    address: 'Mai Hắc Đế, An Hải Trung, Sơn Trà',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
    tip: 'Hải sản nướng mỡ hành, kem bơ sầu riêng cô Vân, bánh tráng nướng Đà Nẵng cực ngon.',
    priceText: '~30.000đ - 150.000đ'
  }
];

export interface GeneratePlanOptions {
  destination?: string;
  startDate?: string;
  endDate?: string;
  membersCount?: number;
  budget?: string;
  vibes?: string[];
  pace?: string;
  notes?: string;
}

function parseDateParts(dateStr: string): Date {
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    return new Date(y, m, d);
  }
  return new Date(dateStr);
}

function formatDateISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatDisplayDate(d: Date): string {
  const day = String(d.getDate()).padStart(2, '0');
  const m = String(d.getMonth() + 1).padStart(2, '0');
  return `${day}/${m}`;
}

function formatFullDateVN(d: Date): string {
  const day = String(d.getDate()).padStart(2, '0');
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const y = d.getFullYear();
  return `${day}/${m}/${y}`;
}

export function synchronizeTripDates(
  rawDays: TripDay[],
  rawActivities: TimelineActivity[],
  options: GeneratePlanOptions
): { days: TripDay[]; activities: TimelineActivity[]; datesSummary: string; totalDays: number } {
  const startStr = options.startDate || '2025-04-15';
  const endStr = options.endDate || '2025-04-18';
  let start = parseDateParts(startStr);
  let end = parseDateParts(endStr);

  if (start.getTime() > end.getTime()) {
    end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 3);
  }

  const timeDiff = end.getTime() - start.getTime();
  const dayCount = Math.max(1, Math.round(timeDiff / (1000 * 60 * 60 * 24)) + 1);
  const nightCount = Math.max(0, dayCount - 1);
  const durationLabel = dayCount === 1 ? '1 ngày (đi trong ngày)' : `${dayCount} ngày ${nightCount} đêm`;
  const datesSummary = `${formatFullDateVN(start)} – ${formatFullDateVN(end)} (${durationLabel})`;

  const days: TripDay[] = [];
  const activities: TimelineActivity[] = [];

  for (let i = 1; i <= dayCount; i++) {
    const dayDate = new Date(start.getFullYear(), start.getMonth(), start.getDate() + (i - 1));
    const dayDateISO = formatDateISO(dayDate);
    const dayDisplay = formatDisplayDate(dayDate);

    let title = `Khám phá & Trải nghiệm Ngày ${i}`;
    if (i === 1) {
      title = rawDays[0]?.title || 'Khởi hành & Đến nơi';
    } else if (i === dayCount && dayCount > 1) {
      title = rawDays[rawDays.length - 1]?.title || 'Mua sắm quà lưu niệm & Tạm biệt';
    } else if (rawDays[i - 1]) {
      title = rawDays[i - 1].title;
    } else if (rawDays.length > 2) {
      title = rawDays[Math.min(i - 1, rawDays.length - 2)]?.title || title;
    }

    days.push({
      dayNumber: i,
      date: dayDateISO,
      displayDate: dayDisplay,
      title,
      activitiesCount: 0,
    });
  }

  if (dayCount === rawDays.length) {
    rawActivities.forEach((act) => activities.push({ ...act }));
  } else if (dayCount < rawDays.length) {
    rawActivities.forEach((act) => {
      activities.push({
        ...act,
        dayNumber: Math.min(act.dayNumber, dayCount),
      });
    });
  } else {
    rawActivities.forEach((act) => activities.push({ ...act }));
    for (let extraDay = rawDays.length + 1; extraDay <= dayCount; extraDay++) {
      activities.push(
        {
          id: `extra-act-${extraDay}-1`,
          dayNumber: extraDay,
          time: '09:00',
          category: 'Khám phá tự do',
          title: `Trải nghiệm tự do & Thưởng thức đặc sản Ngày ${extraDay}`,
          location: 'Khu trung tâm địa phương',
          costText: '~150.000đ',
          statusText: 'Đã duyệt',
          statusType: 'approved',
          iconType: 'landmark',
          details: 'Dành thời gian dạo chơi các điểm đến lân cận, chụp ảnh kỷ niệm và mua sắm sản vật địa phương.'
        },
        {
          id: `extra-act-${extraDay}-2`,
          dayNumber: extraDay,
          time: '18:30',
          category: 'Ẩm thực & Thư giãn',
          title: 'Bữa tối ấm cúng cùng đoàn & Cafe ngắm cảnh',
          location: 'Phố ẩm thực trung tâm',
          costText: '~200.000đ/người',
          statusText: 'Đã duyệt',
          statusType: 'approved',
          iconType: 'food',
          details: 'Tận hưởng ẩm thực đêm phong phú và thư giãn sau một ngày dài khám phá.'
        }
      );
    }
  }

  days.forEach((d) => {
    d.activitiesCount = activities.filter((a) => a.dayNumber === d.dayNumber).length;
  });

  return {
    days,
    activities,
    datesSummary,
    totalDays: dayCount,
  };
}

export function generatePrototypeTripPlan(options: GeneratePlanOptions = {}): TripPlanData {
  const dest = options.destination?.trim() || 'Đà Nẵng — Hội An';
  const lower = dest.toLowerCase();
  const members = options.membersCount || 5;

  // PHÚ QUỐC
  if (lower.includes('phú quốc') || lower.includes('phu quoc')) {
    const days: TripDay[] = [
      { dayNumber: 1, date: options.startDate || '2025-05-10', displayDate: '10/05', title: 'Hạ cánh Đảo Ngọc & Sunset Sanato', activitiesCount: 4 },
      { dayNumber: 2, date: '2025-05-11', displayDate: '11/05', title: 'Tour 4 Đảo Cano & Cáp treo Hòn Thơm', activitiesCount: 4 },
      { dayNumber: 3, date: '2025-05-12', displayDate: '12/05', title: 'Grand World & Chợ đêm Phú Quốc', activitiesCount: 3 },
      { dayNumber: 4, date: options.endDate || '2025-05-13', displayDate: '13/05', title: 'Mua sắm ngọc trai & Tạm biệt đảo', activitiesCount: 2 }
    ];
    const activities: TimelineActivity[] = [
      {
        id: 'pq-101',
        dayNumber: 1,
        time: '10:00',
        category: 'Di chuyển & Đến nơi',
        title: 'Hạ cánh sân bay Quốc tế Phú Quốc (PQC)',
        location: 'Dương Tơ, Phú Quốc',
        costText: 'Đã gồm vé máy bay',
        statusText: 'Đúng giờ',
        statusType: 'transport',
        iconType: 'transport',
        details: 'Xe limousine 9 chỗ đón nhóm về thị trấn Dương Đông'
      },
      {
        id: 'pq-102',
        dayNumber: 1,
        time: '12:00',
        category: 'Ẩm thực trưa',
        title: 'Bún quậy Kiến Xây trứ danh',
        location: '28 Bạch Đằng, Dương Đông',
        costText: '~65.000đ/tô',
        statusText: 'Đã duyệt',
        statusType: 'approved',
        iconType: 'food',
        details: 'Tự tay pha nước chấm tắc ớt muối tiêu đặc trưng của quán'
      },
      {
        id: 'pq-103',
        dayNumber: 1,
        time: '14:30',
        category: 'Lưu trú',
        title: 'Check-in Sunset Town Resort & Spa',
        location: 'Thị trấn Hoàng Hôn, An Thới',
        costText: 'Đã đặt phòng',
        statusText: 'Đã đặt',
        statusType: 'booked',
        iconType: 'landmark',
        details: 'Phòng ban công nhìn thẳng ra Cầu Hôn (Kiss Bridge)'
      },
      {
        id: 'pq-104',
        dayNumber: 1,
        time: '17:00',
        category: 'Sống ảo & Biển',
        title: 'Check-in hoàng hôn Sunset Sanato Beach Club',
        location: 'Bãi Trường, Dương Tơ',
        costText: '100.000đ vé vào cổng',
        statusText: 'Đã duyệt',
        statusType: 'approved',
        iconType: 'beach',
        details: 'Chụp ảnh với đàn voi chân dài và tượng đầu người khổng lồ chia đôi'
      },
      {
        id: 'pq-201',
        dayNumber: 2,
        time: '08:00',
        category: 'Tour đảo & Trải nghiệm',
        title: 'Cano cao tốc khám phá Hòn Mây Rút & Gầm Ghì',
        location: 'Cảng An Thới',
        costText: 'Combo 650.000đ/người',
        statusText: 'Xe đón',
        statusType: 'transport',
        iconType: 'landmark',
        details: 'Lặn ngắm san hô tự nhiên, chụp ảnh flycam ván SUP miễn phí'
      },
      {
        id: 'pq-202',
        dayNumber: 2,
        time: '12:30',
        category: 'Ẩm thực hải sản',
        title: 'Ăn trưa hải sản trên bè Hòn Móng Tay',
        location: 'Hòn Móng Tay',
        costText: 'Bao gồm trong tour',
        statusText: 'Đã duyệt',
        statusType: 'approved',
        iconType: 'dining',
        details: 'Cá mú nướng than, nhum nướng mỡ hành, ghẹ hấp sả'
      },
      {
        id: 'pq-203',
        dayNumber: 2,
        time: '15:30',
        category: 'Điểm nhấn cáp treo',
        title: 'Cáp treo Hòn Thơm vượt biển dài nhất thế giới',
        location: 'Ga Ánh Dương, Sun World Hòn Thơm',
        costText: 'Bao gồm combo',
        statusText: 'Đã đặt',
        statusType: 'booked',
        iconType: 'landmark',
        details: 'Toàn cảnh vịnh biển An Thới ngút ngàn từ độ cao 160m'
      },
      {
        id: 'pq-204',
        dayNumber: 2,
        time: '19:30',
        category: 'Đêm & Ẩm thực',
        title: 'Chợ đêm Vui Phết (VUI-Fest Bazaar)',
        location: 'Bờ biển Sunset Town',
        costText: '~150.000đ/người',
        statusText: 'Đang bình chọn',
        statusType: 'voted',
        iconType: 'night',
        details: 'Thưởng thức ẩm thực đường phố và ngắm pháo hoa lúc 21:30'
      }
    ];

    const synced = synchronizeTripDates(days, activities, options);
    return {
      tripTitle: 'Kỳ nghỉ Phú Quốc — Đảo Ngọc Thiên Đường 🏝️',
      destination: 'Phú Quốc, Kiên Giang',
      datesSummary: synced.datesSummary,
      totalDays: synced.totalDays,
      coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=80',
      days: synced.days,
      activities: synced.activities,
      aiSummary: 'Kế hoạch đã tối ưu hướng di chuyển từ Nam Đảo lên Bắc Đảo. Tránh các khung giờ nắng gắt và kết hợp lặn san hô cùng hoàng hôn đẹp nhất Việt Nam!'
    };
  }

  // HUẾ (Cố đô di sản & Sông Hương)
  if (lower.includes('huế') || lower.includes('hue') || lower.includes('thừa thiên')) {
    const days: TripDay[] = [
      { dayNumber: 1, date: options.startDate || '2025-06-10', displayDate: '10/06', title: 'Đến Cố Đô & Đại Nội Hoàng Cung', activitiesCount: 4 },
      { dayNumber: 2, date: '2025-06-11', displayDate: '11/06', title: 'Chùa Thiên Mụ & Lăng Khải Định uy nghiêm', activitiesCount: 4 },
      { dayNumber: 3, date: '2025-06-12', displayDate: '12/06', title: 'Du thuyền Sông Hương & Chợ Đông Ba', activitiesCount: 3 },
      { dayNumber: 4, date: options.endDate || '2025-06-13', displayDate: '13/06', title: 'Thưởng thức Ẩm thực Cố Đô & Tạm biệt', activitiesCount: 2 }
    ];
    const activities: TimelineActivity[] = [
      {
        id: 'hue-101',
        dayNumber: 1,
        time: '10:30',
        category: 'Di chuyển & Đến nơi',
        title: 'Hạ cánh sân bay Phú Bài (HUI) & Nhận phòng',
        location: 'Khách sạn Silk Path Grand Huế, Lê Lợi',
        costText: 'Đã đặt phòng',
        statusText: 'Đúng giờ',
        statusType: 'booked',
        iconType: 'transport',
        details: 'Xe limousine đưa đoàn về khách sạn nhận phòng bên bờ sông Hương'
      },
      {
        id: 'hue-102',
        dayNumber: 1,
        time: '12:00',
        category: 'Ẩm thực trưa',
        title: 'Bún Bò Huế Mụ Rơi trứ danh',
        location: '40 Nguyễn Chí Diểu, Thuận Thành',
        costText: '~55.000đ/tô',
        statusText: 'Đã duyệt',
        statusType: 'approved',
        iconType: 'food',
        details: 'Tô bún bò đậm đà ruốc thơm lừng, thịt bắp hoa giòn sần sật'
      },
      {
        id: 'hue-103',
        dayNumber: 1,
        time: '14:30',
        category: 'Di sản & Văn hóa',
        title: 'Tham quan Đại Nội Huế & Cung Diên Thọ',
        location: 'Đường 23/8, Thuận Hòa, TP. Huế',
        costText: '200.000đ vé vào',
        statusText: 'Đã đặt vé',
        statusType: 'booked',
        iconType: 'landmark',
        details: 'Thuê áo Nhật Bình chụp ảnh tại Điện Thái Hòa và Cung Diên Thọ mới trùng tu'
      },
      {
        id: 'hue-104',
        dayNumber: 1,
        time: '18:30',
        category: 'Ẩm thực & Dạo đêm',
        title: 'Chè Hẻm Hùng Vương & Cầu Tràng Tiền lên đèn',
        location: 'Số 1 Kiệt 29 Hùng Vương, Phú Nhuận',
        costText: '~35.000đ/ly',
        statusText: '5/5 đồng ý',
        statusType: 'voted',
        iconType: 'night',
        details: 'Thử món chè bột lọc bọc heo quay độc bản và ngắm 12 nhịp cầu Tràng Tiền đổi màu'
      },
      {
        id: 'hue-201',
        dayNumber: 2,
        time: '08:30',
        category: 'Di sản & Tâm linh',
        title: 'Viếng Chùa Thiên Mụ bên bờ Sông Hương',
        location: 'Đồi Hà Khê, Kim Long, TP. Huế',
        costText: 'Miễn phí',
        statusText: 'Đã duyệt',
        statusType: 'approved',
        iconType: 'landmark',
        details: 'Đệ nhất cổ tự xứ Huế, chiêm ngưỡng tháp Phước Duyên 7 tầng soi bóng'
      },
      {
        id: 'hue-202',
        dayNumber: 2,
        time: '11:00',
        category: 'Di sản kiến trúc',
        title: 'Khám phá Lăng Khải Định (Ứng Lăng)',
        location: 'Xã Thủy Bằng, Hương Thủy, Thừa Thiên Huế',
        costText: '150.000đ vé vào',
        statusText: 'Xe đón',
        statusType: 'transport',
        iconType: 'landmark',
        details: 'Đỉnh cao nghệ thuật ghép sành sứ và bức tranh Cửu Long Ẩn Vân trên trần cung Thiên Định'
      },
      {
        id: 'hue-203',
        dayNumber: 2,
        time: '16:30',
        category: 'Ngắm cảnh & Trải nghiệm',
        title: 'Đón hoàng hôn tại Đồi Vọng Cảnh',
        location: 'Đồi Vọng Cảnh, Thủy Biều, TP. Huế',
        costText: 'Miễn phí',
        statusText: '5/5 đồng ý',
        statusType: 'voted',
        iconType: 'landmark',
        details: 'Góc ngắm khúc quanh sông Hương mềm mại như dải lụa giữa đồi thông xanh ngát'
      },
      {
        id: 'hue-204',
        dayNumber: 2,
        time: '19:30',
        category: 'Văn hóa ca Huế',
        title: 'Thuyền rồng nghe Ca Huế trên Sông Hương & Thả hoa đăng',
        location: 'Bến thuyền Tòa Khâm, Lê Lợi',
        costText: '100.000đ/người',
        statusText: 'Đã đặt',
        statusType: 'booked',
        iconType: 'night',
        details: 'Lắng nghe làn điệu Nam ai, Nam bình sâu lắng và thả hoa đăng ước nguyện'
      }
    ];

    const synced = synchronizeTripDates(days, activities, options);
    return {
      tripTitle: 'Hành Trình Cố Đô Huế — Dấu Ấn Hoàng Cung & Sông Hương 🏯🌸',
      destination: 'Huế, Thừa Thiên Huế',
      datesSummary: synced.datesSummary,
      totalDays: synced.totalDays,
      coverImage: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=1200&auto=format&fit=crop&q=80',
      days: synced.days,
      activities: synced.activities,
      aiSummary: 'Lịch trình kết hợp hài hòa giữa di sản cung đình triều Nguyễn, vẻ đẹp êm ả của sông Hương và nền ẩm thực tinh hoa đất Cố Đô!'
    };
  }

  // ĐÀ LẠT
  if (lower.includes('đà lạt') || lower.includes('da lat')) {
    const days: TripDay[] = [
      { dayNumber: 1, date: options.startDate || '2025-06-01', displayDate: '01/06', title: 'Lên đỉnh sương mù & Dạo Hồ Xuân Hương', activitiesCount: 4 },
      { dayNumber: 2, date: '2025-06-02', displayDate: '02/06', title: 'Săn mây Cầu Đất & Vườn hoa cẩm tú cầu', activitiesCount: 3 },
      { dayNumber: 3, date: '2025-06-03', displayDate: '03/06', title: 'Thác Datanla mạo hiểm & Cafe Túi Mơ To', activitiesCount: 3 },
      { dayNumber: 4, date: options.endDate || '2025-06-04', displayDate: '04/06', title: 'Chợ Đà Lạt & Tạm biệt phố núi', activitiesCount: 2 }
    ];
    const activities: TimelineActivity[] = [
      {
        id: 'dl-101',
        dayNumber: 1,
        time: '11:00',
        category: 'Đến nơi & Nhận phòng',
        title: 'Check-in Homestay Nhà Bên Rừng Thông',
        location: 'Đường Hùng Vương, Phường 11, Đà Lạt',
        costText: 'Đã cọc 50%',
        statusText: 'Đã đặt phòng',
        statusType: 'booked',
        iconType: 'landmark',
        details: 'Không gian yên bình giữa đồi thông, có sân nướng BBQ cho nhóm'
      },
      {
        id: 'dl-102',
        dayNumber: 1,
        time: '12:30',
        category: 'Ẩm thực trưa',
        title: 'Lẩu gà lá é Tao Ngộ',
        location: 'Số 5 đường 3/4, Phường 3',
        costText: '~80.000đ/người',
        statusText: 'Đã duyệt',
        statusType: 'approved',
        iconType: 'food',
        details: 'Lẩu gà nóng hổi, thịt gà đồi săn chắc và vị the the của lá é'
      },
      {
        id: 'dl-103',
        dayNumber: 1,
        time: '16:00',
        category: 'Check-in & Dạo mát',
        title: 'Quảng trường Lâm Viên & Đạp vịt Hồ Xuân Hương',
        location: 'Đường Trần Quốc Toản, Phường 1',
        costText: 'Miễn phí',
        statusText: 'Đã duyệt',
        statusType: 'approved',
        iconType: 'landmark',
        details: 'Chụp hình nụ hoa Atiso khổng lồ và ngắm hoàng hôn mặt hồ phẳng lặng'
      },
      {
        id: 'dl-104',
        dayNumber: 1,
        time: '19:30',
        category: 'Đêm phố núi',
        title: 'Chợ đêm Đà Lạt & Sữa đậu nành nóng',
        location: 'Khu Hoà Bình, Phường 1',
        costText: '~50.000đ/người',
        statusText: '5/5 đồng ý',
        statusType: 'voted',
        iconType: 'night',
        details: 'Bánh tráng nướng trứng lòng đào, dâu tây lắc và sữa đậu nành kem trứng'
      },
      {
        id: 'dl-201',
        dayNumber: 2,
        time: '05:00',
        category: 'Săn mây cực phẩm',
        title: 'Đón bình minh thảm gỗ săn mây Cầu Đất',
        location: 'Đồi chè Cầu Đất, Trạm Hành',
        costText: '120.000đ vé vào cổng + cafe',
        statusText: 'Xe đón',
        statusType: 'transport',
        iconType: 'landmark',
        details: 'Khoảnh khắc biển mây cuồn cuộn dưới ánh nắng vàng ươm lúc 5:45 - 6:30'
      }
    ];

    const synced = synchronizeTripDates(days, activities, options);
    return {
      tripTitle: 'Hành Trình Săn Mây & Chill Phố Núi Đà Lạt 🌲☕',
      destination: 'Đà Lạt, Lâm Đồng',
      datesSummary: synced.datesSummary,
      totalDays: synced.totalDays,
      coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1200&auto=format&fit=crop&q=80',
      days: synced.days,
      activities: synced.activities,
      aiSummary: 'Thời tiết Đà Lạt se lạnh vào sáng sớm và tối, nên chuẩn bị áo khoác mỏng. Đã bố trí xen kẽ giữa các quán cafe view thung lũng và điểm tham quan thiên nhiên.'
    };
  }

  // HÀ GIANG
  if (lower.includes('hà giang') || lower.includes('ha giang')) {
    const days: TripDay[] = [
      { dayNumber: 1, date: options.startDate || '2025-10-15', displayDate: '15/10', title: 'Cột Mốc Số 0 & Cổng Trời Quản Bạ', activitiesCount: 3 },
      { dayNumber: 2, date: '2025-10-16', displayDate: '16/10', title: 'Dốc Thẩm Mã & Dinh Thự Họ Vương', activitiesCount: 3 },
      { dayNumber: 3, date: '2025-10-17', displayDate: '17/10', title: 'Đèo Mã Pí Lèng & Thuyền Sông Nho Quế', activitiesCount: 4 },
      { dayNumber: 4, date: options.endDate || '2025-10-18', displayDate: '18/10', title: 'Phố cổ Đồng Văn & Hành trình trở về', activitiesCount: 2 }
    ];
    const activities: TimelineActivity[] = [
      {
        id: 'hg-101',
        dayNumber: 1,
        time: '08:00',
        category: 'Check-in khởi hành',
        title: 'Check-in Cột Mốc Km0 Hà Giang',
        location: 'Quảng trường 26/3, TP. Hà Giang',
        costText: 'Miễn phí',
        statusText: 'Đã duyệt',
        statusType: 'approved',
        iconType: 'landmark',
        details: 'Điểm khởi đầu thiêng liêng của cung đường đèo hùng vĩ nhất miền Bắc'
      },
      {
        id: 'hg-102',
        dayNumber: 1,
        time: '11:30',
        category: 'Danh thắng',
        title: 'Cổng Trời Quản Bạ & Núi Đôi Cô Tiên',
        location: 'Thị trấn Tam Sơn, Quản Bạ',
        costText: 'Miễn phí',
        statusText: 'Đã duyệt',
        statusType: 'approved',
        iconType: 'landmark',
        details: 'Ngắm trọn thung lũng Tam Sơn bồng bềnh mây trắng'
      },
      {
        id: 'hg-301',
        dayNumber: 3,
        time: '08:30',
        category: 'Tuyệt tác thiên nhiên',
        title: 'Chinh phục Đèo Mã Pí Lèng huyền thoại',
        location: 'Pải Lủng, Mèo Vạc',
        costText: 'Tự do trải nghiệm',
        statusText: 'Đã duyệt',
        statusType: 'approved',
        iconType: 'landmark',
        details: 'Một trong tứ đại đỉnh đèo hiểm trở và ngoạn mục nhất Việt Nam'
      },
      {
        id: 'hg-302',
        dayNumber: 3,
        time: '10:30',
        category: 'Trải nghiệm đỉnh cao',
        title: 'Đi thuyền hẻm vực Tu Sản & Sông Nho Quế',
        location: 'Bến thuyền Tà Làng, Pải Lủng',
        costText: '120.000đ/vé',
        statusText: 'Đã đặt',
        statusType: 'booked',
        iconType: 'beach',
        details: 'Dòng sông xanh ngọc bích len lỏi qua vách đá dựng đứng cao ngút trời'
      }
    ];

    const synced = synchronizeTripDates(days, activities, options);
    return {
      tripTitle: 'Chinh Phục Đèo Hùng Vĩ & Sông Nho Quế Hà Giang 🏔️🏍️',
      destination: 'Hà Giang',
      datesSummary: synced.datesSummary,
      totalDays: synced.totalDays,
      coverImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&auto=format&fit=crop&q=80',
      days: synced.days,
      activities: synced.activities,
      aiSummary: 'Cung đường có độ dốc cao và nhiều cua tay áo, khuyến nghị tài xế vững tay lái hoặc thuê tour xe máy người bản địa dẫn đường!'
    };
  }

  // HÀ NỘI
  if (lower.includes('hà nội') || lower.includes('ha noi')) {
    const days: TripDay[] = [
      { dayNumber: 1, date: options.startDate || '2025-10-10', displayDate: '10/10', title: 'Hồ Hoàn Kiếm & 36 Phố Phường', activitiesCount: 4 },
      { dayNumber: 2, date: '2025-10-11', displayDate: '11/10', title: 'Lăng Bác, Hoàng Thành & Văn Miếu', activitiesCount: 4 },
      { dayNumber: 3, date: '2025-10-12', displayDate: '12/10', title: 'Hoàng hôn Hồ Tây & Cafe Giảng', activitiesCount: 3 },
      { dayNumber: 4, date: options.endDate || '2025-10-13', displayDate: '13/10', title: 'Cốm Làng Vòng & Mua quà thủ đô', activitiesCount: 2 }
    ];
    const activities: TimelineActivity[] = [
      {
        id: 'hn-101',
        dayNumber: 1,
        time: '09:00',
        category: 'Đến nơi & Nhận phòng',
        title: 'Check-in Khách sạn Phố Cổ Boutique',
        location: 'Hàng Bè, Hoàn Kiếm, Hà Nội',
        costText: 'Đã đặt phòng',
        statusText: 'Đã nhận phòng',
        statusType: 'booked',
        iconType: 'landmark',
        details: 'Khách sạn phong cách kiến trúc Đông Dương giữa lòng phố cổ'
      },
      {
        id: 'hn-102',
        dayNumber: 1,
        time: '11:30',
        category: 'Ẩm thực trưa',
        title: 'Bún chả Hương Liên (Bún chả Obama)',
        location: '24 Lê Văn Hưu, Hai Bà Trưng',
        costText: '~60.000đ/suất',
        statusText: 'Đã duyệt',
        statusType: 'approved',
        iconType: 'food',
        details: 'Bún chả thịt nướng than hoa thơm lừng và nem hải sản giòn rụm'
      },
      {
        id: 'hn-103',
        dayNumber: 1,
        time: '15:00',
        category: 'Danh thắng & Check-in',
        title: 'Dạo quanh Hồ Gươm, Cầu Thê Húc & Đền Ngọc Sơn',
        location: 'Đinh Tiên Hoàng, Hoàn Kiếm',
        costText: '30.000đ vé đền',
        statusText: 'Đã duyệt',
        statusType: 'approved',
        iconType: 'landmark',
        details: 'Cầu Thê Húc cong cong màu son và kem Tràng Tiền thơm mát'
      },
      {
        id: 'hn-104',
        dayNumber: 1,
        time: '19:30',
        category: 'Đêm & Cà phê',
        title: 'Cà phê trứng Đinh & Phố bia Tạ Hiện',
        location: '13 Đinh Tiên Hoàng & Tạ Hiện',
        costText: '~100.000đ/người',
        statusText: 'Đã chốt',
        statusType: 'voted',
        iconType: 'night',
        details: 'Ly cà phê trứng ngậy béo ngắm trọn Hồ Gươm lung linh ánh đèn'
      }
    ];

    const synced = synchronizeTripDates(days, activities, options);
    return {
      tripTitle: 'Hà Nội Mùa Thu — Dấu Ấn Nghìn Năm Văn Hiến 🍂🏛️',
      destination: 'Hà Nội',
      datesSummary: synced.datesSummary,
      totalDays: synced.totalDays,
      coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
      days: synced.days,
      activities: synced.activities,
      aiSummary: 'Lịch trình được sắp xếp tối ưu để dạo bộ phố cổ, trải nghiệm ẩm thực di sản và tận hưởng trọn vẹn tiết trời thu se lạnh tuyệt đẹp của thủ đô!'
    };
  }

  // SA PA
  if (lower.includes('sa pa') || lower.includes('sapa') || lower.includes('fansipan')) {
    const days: TripDay[] = [
      { dayNumber: 1, date: options.startDate || '2025-11-01', displayDate: '01/11', title: 'Lên Sa Pa sương mù & Bản Cát Cát', activitiesCount: 3 },
      { dayNumber: 2, date: '2025-11-02', displayDate: '02/11', title: 'Chinh phục Đỉnh Fansipan 3.143m', activitiesCount: 3 },
      { dayNumber: 3, date: '2025-11-03', displayDate: '03/11', title: 'Cổng trời Đèo Ô Quy Hồ & Thác Bạc', activitiesCount: 3 },
      { dayNumber: 4, date: options.endDate || '2025-11-04', displayDate: '04/11', title: 'Chợ Sa Pa & Mua đặc sản hạt dẻ', activitiesCount: 2 }
    ];
    const activities: TimelineActivity[] = [
      {
        id: 'sp-101',
        dayNumber: 1,
        time: '12:00',
        category: 'Đến nơi',
        title: 'Check-in Ecolodge view thung lũng Mường Hoa',
        location: 'Bản Mường Hoa, Sa Pa',
        costText: 'Đã đặt phòng',
        statusText: 'Đã cọc',
        statusType: 'booked',
        iconType: 'landmark',
        details: 'Bungalow nhìn thẳng ra thung lũng mây trôi bồng bềnh'
      },
      {
        id: 'sp-102',
        dayNumber: 1,
        time: '14:30',
        category: 'Văn hóa bản làng',
        title: 'Dạo chơi Bản Cát Cát & Suối Hoa',
        location: 'Bản Cát Cát, Sa Pa',
        costText: '150.000đ vé vào cổng',
        statusText: 'Đã duyệt',
        statusType: 'approved',
        iconType: 'landmark',
        details: 'Thuê trang phục thổ cẩm dân tộc H’Mông check-in bánh xe nước'
      },
      {
        id: 'sp-103',
        dayNumber: 1,
        time: '19:00',
        category: 'Ẩm thực phố núi',
        title: 'Lẩu cá hồi & cá tầm Sa Pa nóng hổi',
        location: 'Đường Xuân Viên, Thị xã Sa Pa',
        costText: '~180.000đ/người',
        statusText: '5/5 đồng ý',
        statusType: 'voted',
        iconType: 'food',
        details: 'Thịt cá hồi tươi nhúng lẩu măng chua cay xé lưỡi ấm lòng đêm lạnh'
      }
    ];

    const synced = synchronizeTripDates(days, activities, options);
    return {
      tripTitle: 'Hành Trình Sa Pa — Nóc Nhà Đông Dương & Biển Mây 🏔️☁️',
      destination: 'Sa Pa, Lào Cai',
      datesSummary: synced.datesSummary,
      totalDays: synced.totalDays,
      coverImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&auto=format&fit=crop&q=80',
      days: synced.days,
      activities: synced.activities,
      aiSummary: 'Thời tiết Sa Pa thay đổi 4 mùa trong 1 ngày, AI đã tính toán khung giờ săn mây đỉnh Fansipan đẹp nhất lúc 9:30 - 11:30 sáng!'
    };
  }

  // NHA TRANG
  if (lower.includes('nha trang') || lower.includes('khánh hòa')) {
    const days: TripDay[] = [
      { dayNumber: 1, date: options.startDate || '2025-07-05', displayDate: '05/07', title: 'Hạ cánh biển xanh & Tháp Bà Ponagar', activitiesCount: 3 },
      { dayNumber: 2, date: '2025-07-06', displayDate: '06/07', title: 'Tour 3 Đảo Lặn San Hô & Hòn Tằm', activitiesCount: 4 },
      { dayNumber: 3, date: '2025-07-07', displayDate: '07/07', title: 'Vui chơi bùng nổ VinWonders Nha Trang', activitiesCount: 3 },
      { dayNumber: 4, date: options.endDate || '2025-07-08', displayDate: '08/07', title: 'Tắm bùn khoáng & Nem nướng Ninh Hòa', activitiesCount: 2 }
    ];
    const activities: TimelineActivity[] = [
      {
        id: 'nt-101',
        dayNumber: 1,
        time: '11:00',
        category: 'Khách sạn & Nghỉ ngơi',
        title: 'Nhận phòng Khách sạn mặt biển Trần Phú',
        location: 'Đường Trần Phú, Lộc Thọ, Nha Trang',
        costText: 'Đã thanh toán',
        statusText: 'Đã nhận',
        statusType: 'booked',
        iconType: 'landmark',
        details: 'Phòng hướng trọn vẹn vịnh biển Nha Trang trong xanh cát trắng'
      },
      {
        id: 'nt-102',
        dayNumber: 1,
        time: '12:30',
        category: 'Ẩm thực trưa',
        title: 'Nem nướng Đặng Văn Quyên',
        location: '16A Lãn Ông, Xương Huân',
        costText: '~65.000đ/phần',
        statusText: 'Đã duyệt',
        statusType: 'approved',
        iconType: 'food',
        details: 'Đặc sản nem nướng lụi cuốn bánh tráng rau sống chấm sốt tương nếp'
      },
      {
        id: 'nt-103',
        dayNumber: 1,
        time: '16:00',
        category: 'Di tích & Tâm linh',
        title: 'Quần thể Tháp Bà Ponagar huyền bí',
        location: 'Đường 2/4, Vĩnh Phước',
        costText: '30.000đ vé vào',
        statusText: 'Đã duyệt',
        statusType: 'approved',
        iconType: 'landmark',
        details: 'Kiến trúc Chăm Pa cổ đại uy nghi bên cửa sông Cái thơ mộng'
      }
    ];

    const synced = synchronizeTripDates(days, activities, options);
    return {
      tripTitle: 'Nha Trang Biển Xanh — Thiên Đường Vịnh Ngọc 🌊🏝️',
      destination: 'Nha Trang, Khánh Hòa',
      datesSummary: synced.datesSummary,
      totalDays: synced.totalDays,
      coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=80',
      days: synced.days,
      activities: synced.activities,
      aiSummary: 'Lịch trình cân bằng giữa nghỉ dưỡng biển cao cấp, lặn ngắm san hô rực rỡ và khám phá ẩm thực hải sản tươi sống trứ danh Nha Trang!'
    };
  }

  // ĐIỂM ĐẾN TỔNG QUÁT BẤT KỲ TRONG 63 TỈNH THÀNH (NẾU KHÔNG PHẢI ĐÀ NẴNG)
  if (!lower.includes('đà nẵng') && !lower.includes('da nang') && !lower.includes('hội an') && dest !== 'Đà Nẵng — Hội An') {
    const days: TripDay[] = [
      { dayNumber: 1, date: options.startDate || '2025-08-15', displayDate: '15/08', title: `Đến ${dest} & Nhận phòng`, activitiesCount: 3 },
      { dayNumber: 2, date: '2025-08-16', displayDate: '16/08', title: `Khám phá các danh thắng nổi tiếng tại ${dest}`, activitiesCount: 4 },
      { dayNumber: 3, date: '2025-08-17', displayDate: '17/08', title: `Trải nghiệm văn hóa & Ẩm thực bản địa ${dest}`, activitiesCount: 3 },
      { dayNumber: 4, date: options.endDate || '2025-08-18', displayDate: '18/08', title: `Check-in lưu niệm & Tạm biệt ${dest}`, activitiesCount: 2 }
    ];
    const activities: TimelineActivity[] = [
      {
        id: 'cust-101',
        dayNumber: 1,
        time: '10:00',
        category: 'Di chuyển & Đến nơi',
        title: `Có mặt tại trung tâm ${dest}`,
        location: `Trung tâm ${dest}`,
        costText: 'Đã hoàn tất',
        statusText: 'Đúng giờ',
        statusType: 'transport',
        iconType: 'transport',
        details: `Di chuyển thuận tiện, sẵn sàng cho hành trình khám phá ${dest}`
      },
      {
        id: 'cust-102',
        dayNumber: 1,
        time: '12:00',
        category: 'Ẩm thực trưa',
        title: `Thưởng thức đặc sản vùng miền ${dest}`,
        location: `Quán ăn truyền thống tại ${dest}`,
        costText: '~70.000đ/người',
        statusText: 'Đã duyệt',
        statusType: 'approved',
        iconType: 'food',
        details: `Ẩm thực đặc trưng mang đậm phong vị bản xứ ${dest}`
      },
      {
        id: 'cust-103',
        dayNumber: 1,
        time: '14:30',
        category: 'Lưu trú',
        title: `Check-in khách sạn trung tâm ${dest}`,
        location: `Khu vực trung tâm ${dest}`,
        costText: 'Đã đặt phòng',
        statusText: 'Đã nhận phòng',
        statusType: 'booked',
        iconType: 'landmark',
        details: 'Vị trí thuận tiện di chuyển tới các điểm vui chơi check-in'
      },
      {
        id: 'cust-104',
        dayNumber: 1,
        time: '17:30',
        category: 'Ngắm cảnh & Hoàng hôn',
        title: `Check-in hoàng hôn tuyệt đẹp tại ${dest}`,
        location: `Điểm ngắm cảnh biểu tượng của ${dest}`,
        costText: 'Miễn phí',
        statusText: '5/5 đồng ý',
        statusType: 'voted',
        iconType: 'beach',
        details: `Khoảnh khắc chiều tà bình yên và góc chụp ảnh ấn tượng tại ${dest}`
      }
    ];

    const synced = synchronizeTripDates(days, activities, options);
    return {
      tripTitle: `Hành Trình Khám Phá ${dest} — Bản Sắc Việt Nam 🌟✨`,
      destination: dest,
      datesSummary: synced.datesSummary,
      totalDays: synced.totalDays,
      coverImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&auto=format&fit=crop&q=80',
      days: synced.days,
      activities: synced.activities,
      aiSummary: `Lịch trình được TripMate AI tính toán tối ưu riêng cho ${dest}, phối hợp nhịp nhàng giữa các danh lam thắng cảnh, văn hóa ẩm thực và thời gian nghỉ dưỡng của đoàn!`
    };
  }

  // DEFAULT / ĐÀ NẴNG — HỘI AN (Exact screen match with Day 2 details!)
  const days: TripDay[] = [
    { dayNumber: 1, date: options.startDate || '2025-04-15', displayDate: '15/04', title: 'Đến nơi & Nhận phòng', activitiesCount: 3 },
    { dayNumber: 2, date: '2025-04-16', displayDate: '16/04', title: 'Bà Nà & Biển Mỹ Khê', activitiesCount: 5 },
    { dayNumber: 3, date: '2025-04-17', displayDate: '17/04', title: 'Phố cổ Hội An', activitiesCount: 4 },
    { dayNumber: 4, date: options.endDate || '2025-04-18', displayDate: '18/04', title: 'Mua sắm & Về lại', activitiesCount: 2 }
  ];

  const activities: TimelineActivity[] = [
    // Day 1
    {
      id: 'act-101',
      dayNumber: 1,
      time: '09:30',
      category: 'Chuyến bay & Di chuyển',
      title: 'Hạ cánh sân bay Quốc tế Đà Nẵng (DAD)',
      location: 'Cổng đến T1, Sân bay Đà Nẵng',
      costText: 'Đã thanh toán vé',
      statusText: 'Đúng giờ',
      statusType: 'transport',
      iconType: 'transport',
      details: 'Xe đón hợp đồng 7 chỗ đã chờ ở bãi xe B1',
      note: 'VJ-628 cất cánh từ SGN'
    },
    {
      id: 'act-102',
      dayNumber: 1,
      time: '11:30',
      category: 'Ẩm thực trưa',
      title: 'Bánh tráng cuốn thịt heo Đại Lộc',
      location: '97 Trưng Nữ Vương, Hải Châu',
      costText: '~75.000đ/phần',
      statusText: 'Đã duyệt',
      statusType: 'approved',
      iconType: 'food',
      details: 'Đặc sản thịt heo hai đầu da chấm mắm nêm đậm đà'
    },
    {
      id: 'act-103',
      dayNumber: 1,
      time: '14:00',
      category: 'Lưu trú',
      title: 'Check-in Sala Danang Beach Hotel',
      location: '36 Lâm Hoành, Phước Mỹ, Sơn Trà',
      costText: '2 phòng Ocean View',
      statusText: 'Đã đặt phòng',
      statusType: 'booked',
      iconType: 'landmark',
      details: 'Cách bãi biển Mỹ Khê 120m, có hồ bơi vô cực tầng 25'
    },
    // Day 2 (Exact match to Image 1)
    {
      id: 'act-201',
      dayNumber: 2,
      time: '08:30',
      category: 'Ẩm thực sáng',
      title: 'Ăn sáng Mì Quảng Bà Mua',
      location: '19 Trần Bình Trọng, Hải Châu',
      costText: '~55.000đ/tô',
      pricePerPerson: 55000,
      statusText: 'Đã duyệt',
      statusType: 'approved',
      iconType: 'food',
      details: 'Thực đơn: Mì Quảng ếch, tôm thịt, gà ta thả vườn',
      note: `${members} người ăn`
    },
    {
      id: 'act-202',
      dayNumber: 2,
      time: '10:00',
      category: 'Điểm nhấn chính',
      title: 'Check-in Cầu Vàng & Bà Nà Hills',
      location: 'Tuyến cáp treo Thác Tóc Tiên',
      costText: '900.000đ',
      pricePerPerson: 900000,
      statusText: 'Xe đón',
      statusType: 'transport',
      iconType: 'landmark',
      imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=300&auto=format&fit=crop&q=80',
      details: 'Vé cáp treo khứ hồi: 900.000đ',
      driverInfo: 'Tài xế Hùng (0912.xxx.888) đón tại sảnh khách sạn lúc 09:15'
    },
    {
      id: 'act-203',
      dayNumber: 2,
      time: '13:00',
      category: 'Ăn trưa',
      title: 'Ăn trưa Buffet Bốn Mùa',
      location: 'Tầng 2 Quả Cầu Bà Nà (Bàn 14)',
      costText: 'Bao gồm trong combo',
      statusText: 'Đã đặt bàn',
      statusType: 'booked',
      iconType: 'dining',
      details: 'Bao gồm trong combo vé',
      note: 'Kèm trái cây tráng miệng'
    },
    {
      id: 'act-204',
      dayNumber: 2,
      time: '16:30',
      category: 'Giải trí ngoài trời',
      title: 'Tắm biển Mỹ Khê & lướt ván',
      location: 'Bãi tắm số 2, Đà Nẵng',
      costText: 'Thuê ván ~150.000đ/giờ',
      pricePerPerson: 150000,
      statusText: '5/5 đồng ý',
      statusType: 'voted',
      iconType: 'beach',
      details: 'Thuê ván lướt sóng SUP & ngắm hoàng hôn rực rỡ trên bãi biển Mỹ Khê',
      note: 'Hoàng hôn đẹp'
    },
    {
      id: 'act-205',
      dayNumber: 2,
      time: '19:30',
      category: 'Đêm Hội An',
      title: 'Dạo phố cổ Hội An & Thả hoa đăng',
      location: 'Bờ sông Hoài, phố Bạch Đằng',
      costText: 'Thuyền + hoa: 100.000đ',
      pricePerPerson: 100000,
      statusText: 'Chờ chốt giờ',
      statusType: 'pending',
      iconType: 'night',
      details: 'Ngắm lồng đèn rực rỡ, thưởng thức chè mè đen và đi thuyền thả đèn hoa đăng',
      voteStats: 'Bình chọn lại'
    },
    // Day 3
    {
      id: 'act-301',
      dayNumber: 3,
      time: '08:00',
      category: 'Cà phê & Điểm tâm',
      title: 'Cà phê Faifo Hội An & Bánh mì Phượng',
      location: '130 Trần Phú, Minh An, Hội An',
      costText: '~60.000đ/người',
      statusText: 'Đã duyệt',
      statusType: 'approved',
      iconType: 'food',
      details: 'Góc sân thượng ngắm trọn vẹn mái ngói rêu phong phố cổ Hội An'
    },
    {
      id: 'act-302',
      dayNumber: 3,
      time: '10:00',
      category: 'Trải nghiệm văn hóa',
      title: 'Rừng dừa Bảy Mẫu & Thuyền thúng',
      location: 'Cẩm Thanh, Hội An',
      costText: '150.000đ/người',
      statusText: 'Đã đặt cọc',
      statusType: 'booked',
      iconType: 'landmark',
      details: 'Múa thúng xoay vòng vui nhộn, câu cua đá cùng ngư dân địa phương'
    },
    {
      id: 'act-303',
      dayNumber: 3,
      time: '13:00',
      category: 'Ẩm thực trưa',
      title: 'Cơm gà Bà Buội Hội An',
      location: '22 Phan Chu Trinh, Minh An',
      costText: '~65.000đ/dĩa',
      statusText: 'Đã duyệt',
      statusType: 'approved',
      iconType: 'food',
      details: 'Thịt gà xé trộn hành tây cay nồng, cơm vàng óng nấu từ nước luộc gà'
    },
    {
      id: 'act-304',
      dayNumber: 3,
      time: '18:30',
      category: 'Show biểu diễn',
      title: 'Show Ký Ức Hội An (Hoi An Memories)',
      location: 'Công viên Ấn tượng Hội An',
      costText: '600.000đ vé Eco',
      statusText: 'Đã đặt vé',
      statusType: 'booked',
      iconType: 'night',
      details: 'Đại cảnh sân khấu ngoài trời với hơn 500 diễn viên tái hiện 400 năm lịch sử'
    },
    // Day 4
    {
      id: 'act-401',
      dayNumber: 4,
      time: '08:30',
      category: 'Tham quan & Tâm linh',
      title: 'Bán đảo Sơn Trà & Chùa Linh Ứng',
      location: 'Hoàng Sa, Thọ Quang, Sơn Trà',
      costText: 'Miễn phí',
      statusText: 'Đã duyệt',
      statusType: 'approved',
      iconType: 'landmark',
      details: 'Tượng Phật Bà Quán Thế Âm cao 67m hướng mắt ra biển đông bình yên'
    },
    {
      id: 'act-402',
      dayNumber: 4,
      time: '11:00',
      category: 'Mua sắm đặc sản',
      title: 'Chợ Hàn mua quà & Tré Bà Đệ',
      location: '119 Trần Phú, Hải Châu',
      costText: 'Tự do mua sắm',
      statusText: 'Đã duyệt',
      statusType: 'approved',
      iconType: 'landmark',
      details: 'Chả bò Đà Nẵng, mực rim me, bánh khô mè cẩm lệ làm quà người thân'
    }
  ];

  const synced = synchronizeTripDates(days, activities, options);
  return {
    tripTitle: `Chuyến đi ${dest} rực rỡ 🌊🏮`,
    destination: dest,
    datesSummary: synced.datesSummary,
    totalDays: synced.totalDays,
    coverImage: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&auto=format&fit=crop&q=80',
    days: synced.days,
    activities: synced.activities,
    aiSummary: 'Lịch trình được AI tối ưu hóa tuyến đường di chuyển hợp lý, xen kẽ giữa trải nghiệm biển Mỹ Khê, danh thắng Bà Nà Hills và vẻ đẹp cổ kính lung linh đèn hoa đăng phố cổ Hội An!'
  };
}
