import { VotePoll, ExpenseItem, Member } from '../types';
import { removeVietnameseTones, VIETNAM_DESTINATIONS } from './vietnamDestinations';

// Helper to recalculate member paid amounts based on expenses, considering excluded members
export function calculateMemberBalances(expenses: ExpenseItem[], baseMembers: Member[]): Member[] {
  const memberPaidMap: Record<string, number> = {};
  const memberShouldPayMap: Record<string, number> = {};

  baseMembers.forEach((m) => {
    memberPaidMap[m.name] = 0;
    memberShouldPayMap[m.name] = 0;
  });

  expenses.forEach((e) => {
    if (memberPaidMap[e.paidByName] !== undefined) {
      memberPaidMap[e.paidByName] += e.amount;
    } else {
      memberPaidMap[e.paidByName] = e.amount;
    }

    // Filter participants excluding exempted members
    const excluded = e.excludedMembers || [];
    const participants = baseMembers.filter((m) => !excluded.includes(m.name));
    const effectiveCount = participants.length > 0 ? participants.length : Math.max(1, e.splitWithCount || baseMembers.length);
    const perPersonShare = Math.round(e.amount / effectiveCount);

    participants.forEach((p) => {
      memberShouldPayMap[p.name] = (memberShouldPayMap[p.name] || 0) + perPersonShare;
    });
  });

  return baseMembers.map((m) => {
    const paid = memberPaidMap[m.name] || 0;
    const shouldPay = memberShouldPayMap[m.name] || 0;
    const diff = paid - shouldPay;
    return {
      ...m,
      paidAmount: paid,
      owesAmount: diff < 0 ? Math.abs(diff) : 0,
    };
  });
}

// 1. HÀ NỘI
const HANOI_POLLS: VotePoll[] = [
  {
    id: 'poll-hn-1',
    title: 'Chọn quán ăn đặc sản truyền thống cho bữa tối Ngày 2 tại Phố Cổ',
    creator: 'Nguyễn Việt Hùng',
    deadline: '20:00 tối nay',
    category: 'Ẩm thực phố cổ',
    status: 'active',
    options: [
      {
        id: 'hn-opt-1',
        title: 'Bún chả Hương Liên (Bún chả Obama gia truyền)',
        location: '24 Lê Văn Hưu, Hai Bà Trưng',
        priceText: '~60.000đ/suất',
        votes: 4,
        votedByMe: true,
        voterAvatars: ['VH', 'KH', 'NL', 'BT'],
      },
      {
        id: 'hn-opt-2',
        title: 'Phở Thìn Lò Đúc (Phở bò xào lăn nước béo đậm đà)',
        location: '13 Lò Đúc, Phạm Đình Hổ, Hai Bà Trưng',
        priceText: '~90.000đ/bát',
        votes: 1,
        votedByMe: false,
        voterAvatars: ['HN'],
      },
      {
        id: 'hn-opt-3',
        title: 'Chả cá Lã Vọng Hàng Sơn (Chả cá lăng nướng than hoa)',
        location: '14 Chả Cá, Hàng Bồ, Hoàn Kiếm',
        priceText: '~180.000đ/người',
        votes: 0,
        votedByMe: false,
        voterAvatars: [],
      },
    ],
  },
  {
    id: 'poll-hn-2',
    title: 'Khung giờ dạo bộ quanh Hồ Gươm & Thưởng thức cà phê trứng Giảng',
    creator: 'Bảo Trâm',
    deadline: '17:00 chiều mai',
    category: 'Lịch trình & Giờ giấc',
    status: 'active',
    options: [
      {
        id: 'hn-opt-4',
        title: '17:30 chiều đón hoàng hôn Tháp Rùa & uống cafe ấm',
        location: 'Hồ Hoàn Kiếm & 39 Nguyễn Hữu Huân',
        priceText: 'Miễn phí dạo hồ',
        votes: 3,
        votedByMe: true,
        voterAvatars: ['VH', 'BT', 'NL'],
      },
      {
        id: 'hn-opt-5',
        title: '20:00 tối phố đi bộ lên đèn nhộn nhịp & xem biểu diễn đường phố',
        location: 'Quảng trường Đông Kinh Nghĩa Thục',
        priceText: 'Miễn phí dạo phố',
        votes: 2,
        votedByMe: false,
        voterAvatars: ['KH', 'HN'],
      },
    ],
  },
  {
    id: 'poll-hn-3',
    title: 'Phương tiện trải nghiệm ngắm nhìn 36 Phố Phường Hà Nội',
    creator: 'Khánh Huy',
    deadline: '12:00 ngày kia',
    category: 'Phương tiện di chuyển',
    status: 'active',
    options: [
      {
        id: 'hn-opt-6',
        title: 'Xe điện du lịch Phố Cổ (Chở cả nhóm 5 người, có thuyết minh)',
        location: 'Bến xe điện Đinh Tiên Hoàng',
        priceText: '250.000đ/chuyến 5 người',
        votes: 4,
        votedByMe: true,
        voterAvatars: ['VH', 'KH', 'NL', 'HN'],
      },
      {
        id: 'hn-opt-7',
        title: 'Thuê 3 xe xích lô truyền thống thong dong từng ngõ ngách',
        location: 'Quanh hồ Hoàn Kiếm',
        priceText: '150.000đ/xe/giờ',
        votes: 1,
        votedByMe: false,
        voterAvatars: ['BT'],
      },
    ],
  },
];

const HANOI_EXPENSES: ExpenseItem[] = [
  {
    id: 'exp-hn-1',
    title: 'Đặt cọc Khách sạn Phố Cổ Hanoi Boutique Hotel (3 đêm)',
    category: 'stay',
    amount: 2400000,
    paidBy: 'm1',
    paidByName: 'Nguyễn Việt Hùng',
    paidByAvatar: 'VH',
    splitWithCount: 5,
    date: '14/04/2025',
  },
  {
    id: 'exp-hn-2',
    title: 'Bữa trưa Bún chả Hương Liên & Nem cua bể cả đoàn 5 người',
    category: 'food',
    amount: 520000,
    paidBy: 'm2',
    paidByName: 'Khánh Huy',
    paidByAvatar: 'KH',
    splitWithCount: 5,
    date: '15/04/2025',
  },
  {
    id: 'exp-hn-3',
    title: 'Vé tham quan Văn Miếu Quốc Tử Giám & Đền Ngọc Sơn',
    category: 'ticket',
    amount: 300000,
    paidBy: 'm3',
    paidByName: 'Ngọc Linh',
    paidByAvatar: 'NL',
    splitWithCount: 5,
    date: '15/04/2025',
  },
  {
    id: 'exp-hn-4',
    title: 'Cà phê Giảng (Cà phê trứng nức tiếng) & Trà chanh Nhà Thờ',
    category: 'food',
    amount: 280000,
    paidBy: 'm4',
    paidByName: 'Bảo Trâm',
    paidByAvatar: 'BT',
    splitWithCount: 5,
    date: '16/04/2025',
  },
  {
    id: 'exp-hn-5',
    title: 'Xe điện du lịch 36 Phố Phường vòng quanh hồ Hoàn Kiếm',
    category: 'transport',
    amount: 250000,
    paidBy: 'm5',
    paidByName: 'Hoàng Nam',
    paidByAvatar: 'HN',
    splitWithCount: 5,
    date: '16/04/2025',
  },
];

// 2. ĐÀ NẴNG — HỘI AN
const DANANG_POLLS: VotePoll[] = [
  {
    id: 'poll-dn-1',
    title: 'Chọn nhà hàng hải sản tươi sống cho bữa tối Ngày 2 tại Đà Nẵng',
    creator: 'Nguyễn Việt Hùng',
    deadline: '20:00 tối nay',
    category: 'Bữa tối & Ẩm thực',
    status: 'active',
    options: [
      {
        id: 'dn-opt-1',
        title: 'Hải sản Năm Đảnh (Ngon rẻ trong hẻm, hải sản đồng giá)',
        location: 'K59/38 Trần Duy Chiến, Mân Thái',
        priceText: '~150.000đ/người',
        votes: 3,
        votedByMe: true,
        voterAvatars: ['VH', 'KH', 'NL'],
      },
      {
        id: 'dn-opt-2',
        title: 'Hải sản Bé Mặn (Mặt biển Võ Nguyên Giáp, hải sản bơi sống)',
        location: 'Lô 11 Võ Nguyên Giáp, Mân Thái',
        priceText: '~300.000đ/người',
        votes: 2,
        votedByMe: false,
        voterAvatars: ['BT', 'HN'],
      },
    ],
  },
  {
    id: 'poll-dn-2',
    title: 'Thời gian ngắm hoàng hôn bán đảo Sơn Trà & Chùa Linh Ứng',
    creator: 'Ngọc Linh',
    deadline: '15:30 chiều mai',
    category: 'Thời gian & Lộ trình',
    status: 'active',
    options: [
      {
        id: 'dn-opt-3',
        title: '16:30 chiều (Nắng dịu mát, kịp ngắm tượng Phật Bà 67m)',
        location: 'Bán đảo Sơn Trà',
        priceText: 'Miễn phí tham quan',
        votes: 4,
        votedByMe: true,
        voterAvatars: ['VH', 'NL', 'KH', 'HN'],
      },
      {
        id: 'dn-opt-4',
        title: '17:15 chiều (Sát giờ hoàng hôn rực rỡ mặt biển)',
        location: 'Đỉnh Bàn Cờ',
        priceText: 'Miễn phí tham quan',
        votes: 1,
        votedByMe: false,
        voterAvatars: ['BT'],
      },
    ],
  },
  {
    id: 'poll-dn-3',
    title: 'Phương tiện trải nghiệm tour cano lặn ngắm san hô Cù Lao Chàm',
    creator: 'Khánh Huy',
    deadline: '18:00 ngày kia',
    category: 'Trải nghiệm biển',
    status: 'active',
    options: [
      {
        id: 'dn-opt-5',
        title: 'Cano cao tốc lướt sóng (15 phút ra đảo)',
        location: 'Cảng Cửa Đại, Hội An',
        priceText: '450.000đ/vé trọn gói',
        votes: 4,
        votedByMe: true,
        voterAvatars: ['VH', 'KH', 'NL', 'BT'],
      },
      {
        id: 'dn-opt-6',
        title: 'Tàu gỗ du lịch ngắm cảnh biển thong thả (45 phút)',
        location: 'Cảng Cửa Đại',
        priceText: '250.000đ/vé',
        votes: 1,
        votedByMe: false,
        voterAvatars: ['HN'],
      },
    ],
  },
];

const DANANG_EXPENSES: ExpenseItem[] = [
  {
    id: 'exp-dn-1',
    title: 'Đặt cọc khách sạn Sala Danang Beach mặt biển',
    category: 'stay',
    amount: 2000000,
    paidBy: 'm1',
    paidByName: 'Nguyễn Việt Hùng',
    paidByAvatar: 'VH',
    splitWithCount: 5,
    date: '14/04/2025',
  },
  {
    id: 'exp-dn-2',
    title: 'Vé cáp treo Bà Nà Hills & Buffet trưa trên đỉnh',
    category: 'ticket',
    amount: 4750000,
    paidBy: 'm2',
    paidByName: 'Khánh Huy',
    paidByAvatar: 'KH',
    splitWithCount: 5,
    date: '15/04/2025',
  },
  {
    id: 'exp-dn-3',
    title: 'Bữa tối hải sản Bé Mặn mặt biển Võ Nguyên Giáp',
    category: 'food',
    amount: 1850000,
    paidBy: 'm3',
    paidByName: 'Ngọc Linh',
    paidByAvatar: 'NL',
    splitWithCount: 5,
    date: '16/04/2025',
  },
  {
    id: 'exp-dn-4',
    title: 'Cà phê view biển A La Carte & Ngắm cầu Rồng',
    category: 'food',
    amount: 320000,
    paidBy: 'm4',
    paidByName: 'Bảo Trâm',
    paidByAvatar: 'BT',
    splitWithCount: 5,
    date: '16/04/2025',
  },
];

// 3. ĐÀ LẠT
const DALAT_POLLS: VotePoll[] = [
  {
    id: 'poll-dl-1',
    title: 'Nồi lẩu ấm bụng cho đêm se lạnh 15 độ C Ngày 2 tại Đà Lạt',
    creator: 'Nguyễn Việt Hùng',
    deadline: '20:00 tối nay',
    category: 'Ẩm thực phố núi',
    status: 'active',
    options: [
      {
        id: 'dl-opt-1',
        title: 'Lẩu gà lá é Tao Ngộ chính gốc đường 3/4',
        location: 'Số 5 đường 3 Tháng 4, Phường 3',
        priceText: '~300.000đ/nồi lớn',
        votes: 4,
        votedByMe: true,
        voterAvatars: ['VH', 'KH', 'NL', 'BT'],
      },
      {
        id: 'dl-opt-2',
        title: 'Lẩu bò Ba Toa Quán Gỗ đậm đà thịt thơm nức mũi',
        location: '1/29 Hoàng Diệu, Phường 5',
        priceText: '~350.000đ/nồi lớn',
        votes: 1,
        votedByMe: false,
        voterAvatars: ['HN'],
      },
    ],
  },
  {
    id: 'poll-dl-2',
    title: 'Thời gian xuất phát săn mây Đồi chè Cầu Đất lúc sáng sớm',
    creator: 'Bảo Trâm',
    deadline: '21:00 tối nay',
    category: 'Săn mây & Check-in',
    status: 'active',
    options: [
      {
        id: 'dl-opt-3',
        title: '04:45 sáng (Kịp đón biển mây bồng bềnh và bình minh rực đỏ)',
        location: 'Đồi chè Cầu Đất, Xuân Trường',
        priceText: 'Miễn phí vé',
        votes: 3,
        votedByMe: true,
        voterAvatars: ['VH', 'BT', 'NL'],
      },
      {
        id: 'dl-opt-4',
        title: '05:30 sáng (Ngủ thêm chút, lên đón nắng sớm mờ ảo)',
        location: 'Thảm gỗ săn mây',
        priceText: 'Miễn phí vé',
        votes: 2,
        votedByMe: false,
        voterAvatars: ['KH', 'HN'],
      },
    ],
  },
  {
    id: 'poll-dl-3',
    title: 'Quán cà phê sườn đồi ngắm hoàng hôn thông reo chiều Ngày 3',
    creator: 'Khánh Huy',
    deadline: '14:00 chiều mai',
    category: 'Cafe sống ảo',
    status: 'active',
    options: [
      {
        id: 'dl-opt-5',
        title: 'Tiệm Cà Phê Túi Mơ To (Vườn cúc họa mi & Nhà lồng thắp sáng)',
        location: 'Hẻm 31 Sào Nam, Phường 11',
        priceText: '~60.000đ/ly',
        votes: 4,
        votedByMe: true,
        voterAvatars: ['VH', 'KH', 'NL', 'BT'],
      },
      {
        id: 'dl-opt-6',
        title: 'Tiệm cà phê Cheo Veooo (Nhìn thẳng thung lũng nguyên sơ)',
        location: '116 Hùng Vương, Phường 11',
        priceText: '~55.000đ/ly',
        votes: 1,
        votedByMe: false,
        voterAvatars: ['HN'],
      },
    ],
  },
];

const DALAT_EXPENSES: ExpenseItem[] = [
  {
    id: 'exp-dl-1',
    title: 'Bungalow view đồi thông Đà Lạt (3 phòng ngủ)',
    category: 'stay',
    amount: 2500000,
    paidBy: 'm1',
    paidByName: 'Nguyễn Việt Hùng',
    paidByAvatar: 'VH',
    splitWithCount: 5,
    date: '14/04/2025',
  },
  {
    id: 'exp-dl-2',
    title: 'Vé xe trượt máng Alpine Coaster thác Datanla cả nhóm',
    category: 'ticket',
    amount: 900000,
    paidBy: 'm2',
    paidByName: 'Khánh Huy',
    paidByAvatar: 'KH',
    splitWithCount: 5,
    date: '15/04/2025',
  },
  {
    id: 'exp-dl-3',
    title: 'Lẩu gà lá é Tao Ngộ 2 nồi lớn & Bánh tráng nướng',
    category: 'food',
    amount: 680000,
    paidBy: 'm3',
    paidByName: 'Ngọc Linh',
    paidByAvatar: 'NL',
    splitWithCount: 5,
    date: '15/04/2025',
  },
  {
    id: 'exp-dl-4',
    title: 'Tiệm Cà Phê Túi Mơ To & Bánh ngọt ngắm hoàng hôn',
    category: 'food',
    amount: 350000,
    paidBy: 'm4',
    paidByName: 'Bảo Trâm',
    paidByAvatar: 'BT',
    splitWithCount: 5,
    date: '16/04/2025',
  },
  {
    id: 'exp-dl-5',
    title: 'Thuê 3 xe máy xăng đầy bình chạy săn mây Cầu Đất',
    category: 'transport',
    amount: 450000,
    paidBy: 'm5',
    paidByName: 'Hoàng Nam',
    paidByAvatar: 'HN',
    splitWithCount: 5,
    date: '16/04/2025',
  },
];

// 4. PHÚ QUỐC
const PHUQUOC_POLLS: VotePoll[] = [
  {
    id: 'poll-pq-1',
    title: 'Tọa độ ngắm hoàng hôn biển & chill cocktail chiều Ngày 2',
    creator: 'Nguyễn Việt Hùng',
    deadline: '16:00 ngày mai',
    category: 'Hoàng hôn biển',
    status: 'active',
    options: [
      {
        id: 'pq-opt-1',
        title: 'Sunset Sanato Beach Club (Chụp ảnh đàn voi chân dài huyền thoại)',
        location: 'Bãi Trường, Dương Tơ',
        priceText: 'Vé vào cổng 100.000đ',
        votes: 4,
        votedByMe: true,
        voterAvatars: ['VH', 'KH', 'NL', 'BT'],
      },
      {
        id: 'pq-opt-2',
        title: 'OCSEN Beach Bar & Club (Ngồi gối lười màu cam sát mép sóng)',
        location: '118/10 Trần Hưng Đạo, Dương Đông',
        priceText: 'Đồ uống từ 80.000đ',
        votes: 1,
        votedByMe: false,
        voterAvatars: ['HN'],
      },
    ],
  },
  {
    id: 'poll-pq-2',
    title: 'Phương tiện trải nghiệm tour 4 đảo Nam Phú Quốc',
    creator: 'Khánh Huy',
    deadline: '18:00 hôm nay',
    category: 'Tour cano đảo',
    status: 'active',
    options: [
      {
        id: 'pq-opt-3',
        title: 'Cano cao tốc bao trọn thuyền riêng (Chụp ảnh ván SUP flycam miễn phí)',
        location: 'Cảng An Thới',
        priceText: '550.000đ/người kèm ăn trưa',
        votes: 5,
        votedByMe: true,
        voterAvatars: ['VH', 'KH', 'NL', 'BT', 'HN'],
      },
      {
        id: 'pq-opt-4',
        title: 'Du thuyền gỗ ngắm hoàng hôn và câu mực đêm',
        location: 'Cảng Dương Đông',
        priceText: '400.000đ/người',
        votes: 0,
        votedByMe: false,
        voterAvatars: [],
      },
    ],
  },
];

const PHUQUOC_EXPENSES: ExpenseItem[] = [
  {
    id: 'exp-pq-1',
    title: 'Resort mặt biển Bãi Trường Phú Quốc (2 đêm 2 bungalow)',
    category: 'stay',
    amount: 3600000,
    paidBy: 'm1',
    paidByName: 'Nguyễn Việt Hùng',
    paidByAvatar: 'VH',
    splitWithCount: 5,
    date: '14/04/2025',
  },
  {
    id: 'exp-pq-2',
    title: 'Vé cáp treo Hòn Thơm vượt biển 7.899m & Công viên nước Aquatopia',
    category: 'ticket',
    amount: 2850000,
    paidBy: 'm2',
    paidByName: 'Khánh Huy',
    paidByAvatar: 'KH',
    splitWithCount: 5,
    date: '15/04/2025',
  },
  {
    id: 'exp-pq-3',
    title: 'Bữa tối hải sản ghẹ Hàm Ninh & Bún quậy Kiến Xây',
    category: 'food',
    amount: 1450000,
    paidBy: 'm3',
    paidByName: 'Ngọc Linh',
    paidByAvatar: 'NL',
    splitWithCount: 5,
    date: '15/04/2025',
  },
  {
    id: 'exp-pq-4',
    title: 'Tour cano 4 đảo lặn ngắm san hô Hòn Gầm Ghì & Hòn Mây Rút',
    category: 'ticket',
    amount: 2750000,
    paidBy: 'm4',
    paidByName: 'Bảo Trâm',
    paidByAvatar: 'BT',
    splitWithCount: 5,
    date: '16/04/2025',
  },
];

// 5. SA PA (LÀO CAI)
const SAPA_POLLS: VotePoll[] = [
  {
    id: 'poll-sp-1',
    title: 'Khung giờ lên đỉnh Fansipan 3.143m để săn mây không bị sương mù',
    creator: 'Nguyễn Việt Hùng',
    deadline: '21:00 tối nay',
    category: 'Nóc nhà Đông Dương',
    status: 'active',
    options: [
      {
        id: 'sp-opt-1',
        title: '09:30 sáng (Nắng lên xua tan sương mù, trời trong xanh)',
        location: 'Sun World Fansipan Legend',
        priceText: '850.000đ/vé cáp treo',
        votes: 4,
        votedByMe: true,
        voterAvatars: ['VH', 'KH', 'NL', 'BT'],
      },
      {
        id: 'sp-opt-2',
        title: '14:00 chiều (Biển mây dày đặc và đón hoàng hôn trên đỉnh)',
        location: 'Đỉnh Fansipan 3.143m',
        priceText: '850.000đ/vé',
        votes: 1,
        votedByMe: false,
        voterAvatars: ['HN'],
      },
    ],
  },
  {
    id: 'poll-sp-2',
    title: 'Món lẩu đặc sản Tây Bắc cho bữa tối Ngày 2 tại Sa Pa',
    creator: 'Ngọc Linh',
    deadline: '17:00 ngày mai',
    category: 'Ẩm thực Tây Bắc',
    status: 'active',
    options: [
      {
        id: 'sp-opt-3',
        title: 'Lẩu cá hồi măng chua cay tươi sống quán A Quỳnh',
        location: '15 Thạch Sơn, Sa Pa',
        priceText: '~750.000đ/nồi lớn',
        votes: 4,
        votedByMe: true,
        voterAvatars: ['VH', 'NL', 'KH', 'HN'],
      },
      {
        id: 'sp-opt-4',
        title: 'Lẩu cá tầm suối nấu lá giang & Thắng cố truyền thống',
        location: 'Phố nướng Cầu Mây',
        priceText: '~800.000đ/nồi',
        votes: 1,
        votedByMe: false,
        voterAvatars: ['BT'],
      },
    ],
  },
];

const SAPA_EXPENSES: ExpenseItem[] = [
  {
    id: 'exp-sp-1',
    title: 'Sapa Eco Ecolodge view thung lũng Mường Hoa',
    category: 'stay',
    amount: 2700000,
    paidBy: 'm1',
    paidByName: 'Nguyễn Việt Hùng',
    paidByAvatar: 'VH',
    splitWithCount: 5,
    date: '14/04/2025',
  },
  {
    id: 'exp-sp-2',
    title: 'Vé cáp treo Sun World Fansipan Legend khứ hồi cả nhóm',
    category: 'ticket',
    amount: 4250000,
    paidBy: 'm2',
    paidByName: 'Khánh Huy',
    paidByAvatar: 'KH',
    splitWithCount: 5,
    date: '15/04/2025',
  },
  {
    id: 'exp-sp-3',
    title: 'Lẩu cá hồi tươi Sa Pa A Quỳnh & Cơm lam nướng than hoa',
    category: 'food',
    amount: 950000,
    paidBy: 'm3',
    paidByName: 'Ngọc Linh',
    paidByAvatar: 'NL',
    splitWithCount: 5,
    date: '15/04/2025',
  },
  {
    id: 'exp-sp-4',
    title: 'Vé tham quan bản Cát Cát & Thuê đồ thổ cẩm H\'Mông chụp ảnh',
    category: 'ticket',
    amount: 750000,
    paidBy: 'm4',
    paidByName: 'Bảo Trâm',
    paidByAvatar: 'BT',
    splitWithCount: 5,
    date: '16/04/2025',
  },
];

// 6. HÀ GIANG
const HAGIANG_POLLS: VotePoll[] = [
  {
    id: 'poll-hg-1',
    title: 'Trải nghiệm du ngoạn hẻm Tu Sản dòng sông Nho Quế ngọc bích',
    creator: 'Nguyễn Việt Hùng',
    deadline: '20:00 tối nay',
    category: 'Thiên nhiên hùng vĩ',
    status: 'active',
    options: [
      {
        id: 'hg-opt-1',
        title: 'Đi thuyền du lịch bản địa xuôi dòng hẻm Tu Sản (Có áo phao)',
        location: 'Bến thuyền Tà Làng, Pải Lủng',
        priceText: '120.000đ/vé',
        votes: 4,
        votedByMe: true,
        voterAvatars: ['VH', 'KH', 'NL', 'BT'],
      },
      {
        id: 'hg-opt-2',
        title: 'Tự chèo thuyền Kayak đôi vượt hẻm đá sâu nhất Đông Nam Á',
        location: 'Bến thuyền Sông Nho Quế',
        priceText: '150.000đ/thuyền',
        votes: 1,
        votedByMe: false,
        voterAvatars: ['HN'],
      },
    ],
  },
  {
    id: 'poll-hg-2',
    title: 'Bữa tối đặc sản cao nguyên đá tại Phố cổ Đồng Văn',
    creator: 'Khánh Huy',
    deadline: '17:00 ngày mai',
    category: 'Ẩm thực bản địa',
    status: 'active',
    options: [
      {
        id: 'hg-opt-3',
        title: 'Lẩu gà đen vùng cao nhúng rau cải mèo & Rượu ngô men lá',
        location: 'Phố cổ Đồng Văn',
        priceText: '~650.000đ/nồi lớn',
        votes: 4,
        votedByMe: true,
        voterAvatars: ['VH', 'KH', 'NL', 'HN'],
      },
      {
        id: 'hg-opt-4',
        title: 'Thịt trâu gác bếp, Bánh bao tam giác mạch nướng & Thắng dền',
        location: 'Chợ đêm Đồng Văn',
        priceText: '~100.000đ/người',
        votes: 1,
        votedByMe: false,
        voterAvatars: ['BT'],
      },
    ],
  },
];

const HAGIANG_EXPENSES: ExpenseItem[] = [
  {
    id: 'exp-hg-1',
    title: 'Homestay nhà trình tường người Mông tại Phố cổ Đồng Văn (2 đêm)',
    category: 'stay',
    amount: 1800000,
    paidBy: 'm1',
    paidByName: 'Nguyễn Việt Hùng',
    paidByAvatar: 'VH',
    splitWithCount: 5,
    date: '14/04/2025',
  },
  {
    id: 'exp-hg-2',
    title: 'Thuê 3 xe máy phượt đèo Mã Pí Lèng & Đổ xăng đầy bình',
    category: 'transport',
    amount: 1050000,
    paidBy: 'm2',
    paidByName: 'Khánh Huy',
    paidByAvatar: 'KH',
    splitWithCount: 5,
    date: '15/04/2025',
  },
  {
    id: 'exp-hg-3',
    title: 'Vé thuyền du ngoạn hẻm Tu Sản sông Nho Quế cả đoàn',
    category: 'ticket',
    amount: 600000,
    paidBy: 'm3',
    paidByName: 'Ngọc Linh',
    paidByAvatar: 'NL',
    splitWithCount: 5,
    date: '15/04/2025',
  },
  {
    id: 'exp-hg-4',
    title: 'Bữa tối lẩu gà đen vùng cao nhúng rau cải mèo & Rượu ngô',
    category: 'food',
    amount: 720000,
    paidBy: 'm4',
    paidByName: 'Bảo Trâm',
    paidByAvatar: 'BT',
    splitWithCount: 5,
    date: '16/04/2025',
  },
];

// Helper to get destination polls
export function getDestinationPolls(destinationQuery?: string): VotePoll[] {
  if (!destinationQuery || !destinationQuery.trim()) {
    return [];
  }

  const clean = removeVietnameseTones(destinationQuery.toLowerCase()).trim();

  if (clean.includes('ha noi')) return HANOI_POLLS;
  if (clean.includes('da nang') || clean.includes('hoi an')) return DANANG_POLLS;
  if (clean.includes('da lat') || clean.includes('lam dong')) return DALAT_POLLS;
  if (clean.includes('phu quoc') || clean.includes('kien giang')) return PHUQUOC_POLLS;
  if (clean.includes('sa pa') || clean.includes('sapa') || clean.includes('lao cai')) return SAPA_POLLS;
  if (clean.includes('ha giang')) return HAGIANG_POLLS;

  // Fallback for other provinces
  const matched = VIETNAM_DESTINATIONS.find((d) => {
    const dClean = removeVietnameseTones(d.name.toLowerCase());
    return clean.includes(dClean) || dClean.includes(clean);
  });
  const name = matched ? matched.name : destinationQuery.trim();

  return [
    {
      id: `poll-gen-1`,
      title: `Chọn nhà hàng ẩm thực đặc sản tiêu biểu cho bữa tối Ngày 2 tại ${name}`,
      creator: 'Nguyễn Việt Hùng',
      deadline: '20:00 tối nay',
      category: 'Ẩm thực địa phương',
      status: 'active',
      options: [
        {
          id: 'gen-opt-1',
          title: `Nhà hàng đặc sản truyền thống nức tiếng ${name}`,
          location: `Trung tâm ${name}`,
          priceText: '~150.000đ/người',
          votes: 4,
          votedByMe: true,
          voterAvatars: ['VH', 'KH', 'NL', 'BT'],
        },
        {
          id: 'gen-opt-2',
          title: `Khu ẩm thực chợ đêm & Quán ăn gia truyền`,
          location: `Chợ trung tâm ${name}`,
          priceText: '~90.000đ/người',
          votes: 1,
          votedByMe: false,
          voterAvatars: ['HN'],
        },
      ],
    },
    {
      id: `poll-gen-2`,
      title: `Thời gian bắt đầu hành trình tham quan các danh thắng tại ${name}`,
      creator: 'Khánh Huy',
      deadline: '07:30 sáng mai',
      category: 'Giờ giấc khởi hành',
      status: 'active',
      options: [
        {
          id: 'gen-opt-3',
          title: '07:30 sáng (Xuất phát sớm, thời tiết dịu mát không đông đúc)',
          location: `Khu du lịch tiêu biểu ${name}`,
          priceText: 'Theo vé điểm đến',
          votes: 3,
          votedByMe: true,
          voterAvatars: ['VH', 'KH', 'NL'],
        },
        {
          id: 'gen-opt-4',
          title: '08:45 sáng (Ăn sáng thong thả cà phê ngắm cảnh rồi đi)',
          location: `Khu du lịch tiêu biểu ${name}`,
          priceText: 'Theo vé điểm đến',
          votes: 2,
          votedByMe: false,
          voterAvatars: ['BT', 'HN'],
        },
      ],
    },
  ];
}

// Helper to get destination expenses
export function getDestinationExpenses(destinationQuery?: string): ExpenseItem[] {
  if (!destinationQuery || !destinationQuery.trim()) {
    return [];
  }

  const clean = removeVietnameseTones(destinationQuery.toLowerCase()).trim();

  if (clean.includes('ha noi')) return HANOI_EXPENSES;
  if (clean.includes('da nang') || clean.includes('hoi an')) return DANANG_EXPENSES;
  if (clean.includes('da lat') || clean.includes('lam dong')) return DALAT_EXPENSES;
  if (clean.includes('phu quoc') || clean.includes('kien giang')) return PHUQUOC_EXPENSES;
  if (clean.includes('sa pa') || clean.includes('sapa') || clean.includes('lao cai')) return SAPA_EXPENSES;
  if (clean.includes('ha giang')) return HAGIANG_EXPENSES;

  // Fallback for other provinces
  const matched = VIETNAM_DESTINATIONS.find((d) => {
    const dClean = removeVietnameseTones(d.name.toLowerCase());
    return clean.includes(dClean) || dClean.includes(clean);
  });
  const name = matched ? matched.name : destinationQuery.trim();

  return [
    {
      id: 'exp-gen-1',
      title: `Đặt cọc phòng khách sạn trung tâm ${name} (3 đêm)`,
      category: 'stay',
      amount: 2200000,
      paidBy: 'm1',
      paidByName: 'Nguyễn Việt Hùng',
      paidByAvatar: 'VH',
      splitWithCount: 5,
      date: '14/04/2025',
    },
    {
      id: 'exp-gen-2',
      title: `Vé tham quan quần thể danh thắng biểu tượng tại ${name}`,
      category: 'ticket',
      amount: 1250000,
      paidBy: 'm2',
      paidByName: 'Khánh Huy',
      paidByAvatar: 'KH',
      splitWithCount: 5,
      date: '15/04/2025',
    },
    {
      id: 'exp-gen-3',
      title: `Bữa tối hải sản / đặc sản truyền thống nức tiếng ${name}`,
      category: 'food',
      amount: 980000,
      paidBy: 'm3',
      paidByName: 'Ngọc Linh',
      paidByAvatar: 'NL',
      splitWithCount: 5,
      date: '15/04/2025',
    },
    {
      id: 'exp-gen-4',
      title: `Chi phí xe trung chuyển & Thuê phương tiện di chuyển đoàn`,
      category: 'transport',
      amount: 600000,
      paidBy: 'm4',
      paidByName: 'Bảo Trâm',
      paidByAvatar: 'BT',
      splitWithCount: 5,
      date: '16/04/2025',
    },
  ];
}
