import { TripDay, TimelineActivity, NotificationItem, VotePoll, ExpenseItem, Member } from '../types';

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
