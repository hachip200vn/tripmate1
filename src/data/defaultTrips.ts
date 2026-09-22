import { Trip, TripPlanData, TripRole, TripStatus, Member } from '../types';
import {
  initialMembers,
  initialDays,
  initialTimelineActivities,
  generatePrototypeTripPlan,
} from './tripData';
import {
  getDestinationPolls,
  getDestinationExpenses,
  calculateMemberBalances,
} from './destinationPollsAndBudgetData';

export const initialTrips: Trip[] = [
  {
    id: 'trip-dn-2025',
    title: 'Đà Nẵng — Hội An Nghỉ Dưỡng',
    destination: 'Đà Nẵng — Hội An',
    datesSummary: '15/04/2025 – 18/04/2025 (4 ngày 3 đêm)',
    startDate: '2025-04-15',
    endDate: '2025-04-18',
    totalDays: 4,
    status: 'active',
    userRole: 'Trưởng nhóm',
    inviteCode: 'TRIP-DN25',
    coverImage:
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&auto=format&fit=crop&q=80',
    days: initialDays,
    activities: initialTimelineActivities,
    members: calculateMemberBalances(
      getDestinationExpenses('Đà Nẵng — Hội An'),
      initialMembers
    ),
    polls: getDestinationPolls('Đà Nẵng — Hội An'),
    expenses: getDestinationExpenses('Đà Nẵng — Hội An'),
    aiSummary:
      'Lịch trình tối ưu dọc bãi biển Mỹ Khê, khám phá Bà Nà Hills ngày 2 và trải nghiệm không gian đêm phố cổ Hội An ngày 3.',
    createdAt: '2025-04-01',
  },
  {
    id: 'trip-pq-2025',
    title: 'Phú Quốc — Kỳ Nghỉ Hè Đảo Ngọc',
    destination: 'Phú Quốc, Kiên Giang',
    datesSummary: '30/04/2025 – 03/05/2025 (4 ngày 3 đêm)',
    startDate: '2025-04-30',
    endDate: '2025-05-03',
    totalDays: 4,
    status: 'upcoming',
    userRole: 'Thành viên',
    inviteCode: 'TRIP-PQ25',
    coverImage:
      'https://images.unsplash.com/photo-1589779256260-0a0efb38841a?w=1200&auto=format&fit=crop&q=80',
    days: generatePrototypeTripPlan({
      destination: 'Phú Quốc, Kiên Giang',
      startDate: '2025-04-30',
      endDate: '2025-05-03',
      membersCount: 6,
    }).days,
    activities: generatePrototypeTripPlan({
      destination: 'Phú Quốc, Kiên Giang',
      startDate: '2025-04-30',
      endDate: '2025-05-03',
      membersCount: 6,
    }).activities,
    members: [
      {
        id: 'pq-m1',
        name: 'Trần Gia Bảo',
        role: 'Trưởng nhóm',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        initials: 'GB',
        isHost: true,
        phone: '0912 888 999',
        paidAmount: 3200000,
        owesAmount: 0,
      },
      {
        id: 'm1',
        name: 'Nguyễn Việt Hùng',
        role: 'Thành viên',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        initials: 'VH',
        phone: '0987 654 321',
        paidAmount: 1200000,
        owesAmount: 450000,
      },
      {
        id: 'pq-m3',
        name: 'Lê Thùy Dương',
        role: 'Thủ quỹ',
        avatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        initials: 'TD',
        phone: '0903 555 777',
        paidAmount: 2500000,
        owesAmount: 0,
      },
      {
        id: 'pq-m4',
        name: 'Đặng Tuấn Anh',
        role: 'Thành viên',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        initials: 'TA',
        phone: '0988 222 111',
        paidAmount: 600000,
        owesAmount: 300000,
      },
    ],
    polls: getDestinationPolls('Phú Quốc, Kiên Giang'),
    expenses: getDestinationExpenses('Phú Quốc, Kiên Giang'),
    aiSummary:
      'Chuyến đi nghỉ dưỡng biển đảo tại Nam Đảo Phú Quốc, kết hợp trải nghiệm lặn ngắm san hô 4 đảo và vui chơi giải trí Grand World.',
    createdAt: '2025-04-10',
  },
  {
    id: 'trip-dl-2025',
    title: 'Đà Lạt — Săn Mây & Cà Phê Đồi Chè',
    destination: 'Đà Lạt, Lâm Đồng',
    datesSummary: '23/05/2025 – 25/05/2025 (3 ngày 2 đêm)',
    startDate: '2025-05-23',
    endDate: '2025-05-25',
    totalDays: 3,
    status: 'upcoming',
    userRole: 'Thủ quỹ',
    inviteCode: 'TRIP-DL25',
    coverImage:
      'https://images.unsplash.com/photo-1570783424177-3e5e40e28f09?w=1200&auto=format&fit=crop&q=80',
    days: generatePrototypeTripPlan({
      destination: 'Đà Lạt, Lâm Đồng',
      startDate: '2025-05-23',
      endDate: '2025-05-25',
      membersCount: 4,
    }).days,
    activities: generatePrototypeTripPlan({
      destination: 'Đà Lạt, Lâm Đồng',
      startDate: '2025-05-23',
      endDate: '2025-05-25',
      membersCount: 4,
    }).activities,
    members: [
      {
        id: 'dl-m1',
        name: 'Hoàng Kim Ngân',
        role: 'Trưởng nhóm',
        avatar:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        initials: 'KN',
        isHost: true,
        phone: '0979 112 334',
        paidAmount: 2100000,
        owesAmount: 0,
      },
      {
        id: 'm1',
        name: 'Nguyễn Việt Hùng',
        role: 'Thủ quỹ',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        initials: 'VH',
        phone: '0987 654 321',
        paidAmount: 1850000,
        owesAmount: 0,
      },
      {
        id: 'dl-m3',
        name: 'Phạm Đức Duy',
        role: 'Nhiếp ảnh',
        avatar:
          'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
        initials: 'DD',
        phone: '0915 667 889',
        paidAmount: 500000,
        owesAmount: 400000,
      },
    ],
    polls: getDestinationPolls('Đà Lạt, Lâm Đồng'),
    expenses: getDestinationExpenses('Đà Lạt, Lâm Đồng'),
    aiSummary:
      'Lịch trình săn mây Cầu Đất lúc bình minh, ghé các quán cà phê ngắm hoàng hôn đồi dốc và thưởng thức lẩu gà lá é Tao Ngộ.',
    createdAt: '2025-04-12',
  },
];

export function createNewTripFromPlan(
  plan: TripPlanData,
  userName = 'Nguyễn Việt Hùng',
  options: {
    userRole?: TripRole;
    status?: TripStatus;
    coverImage?: string;
  } = {}
): Trip {
  const destSlug = plan.destination
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .toUpperCase()
    .slice(0, 4);

  const newId = `trip-${destSlug.toLowerCase()}-${Date.now().toString().slice(-4)}`;
  const inviteCode = `TRIP-${destSlug || 'VN'}${new Date().getFullYear().toString().slice(-2)}`;

  const hostMember: Member = {
    id: `m-host-${Date.now()}`,
    name: userName,
    role: options.userRole || 'Trưởng nhóm',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    initials: userName
      .split(' ')
      .filter(Boolean)
      .map((w) => w[0])
      .join('')
      .slice(-2)
      .toUpperCase() || 'TN',
    isHost: true,
    phone: '0987 654 321',
    paidAmount: 0,
    owesAmount: 0,
  };

  const initialDestPolls = getDestinationPolls(plan.destination);
  const initialDestExpenses = getDestinationExpenses(plan.destination);

  return {
    id: newId,
    title: plan.tripTitle || `Chuyến đi ${plan.destination}`,
    destination: plan.destination,
    departureLocation: plan.departureLocation,
    datesSummary: plan.datesSummary || '4 ngày 3 đêm',
    startDate: plan.startDate,
    endDate: plan.endDate,
    totalDays: plan.totalDays || plan.days.length || 3,
    transportType: plan.transportType,
    estimatedBudget: plan.estimatedBudget,
    notes: plan.notes,
    status: options.status || 'active',
    userRole: options.userRole || 'Trưởng nhóm',
    inviteCode,
    coverImage:
      options.coverImage ||
      plan.coverImage ||
      'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&auto=format&fit=crop&q=80',
    days: plan.days,
    activities: plan.activities,
    members: [hostMember, ...initialMembers.slice(1, 4)],
    polls: initialDestPolls,
    expenses: initialDestExpenses,
    aiSummary:
      plan.aiSummary ||
      `Kế hoạch khám phá ${plan.destination} được đồng bộ thông minh cho cả nhóm.`,
    createdAt: new Date().toISOString().split('T')[0],
  };
}

export function generateJoinedTripFromCode(
  code: string,
  currentUserName = 'Nguyễn Việt Hùng'
): Trip {
  const upperCode = code.trim().toUpperCase();
  let destination = 'Hà Giang — Cao Nguyên Đá';
  let title = 'Hà Giang — Chinh Phục Mã Pí Lèng & Hoa Tam Giác Mạch';
  let coverImage =
    'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&auto=format&fit=crop&q=80';

  if (upperCode.includes('HN') || upperCode.includes('HANOI')) {
    destination = 'Hà Nội';
    title = 'Hà Nội — Mùa Thu & 36 Phố Phường';
    coverImage =
      'https://images.unsplash.com/photo-1509067237077-83c92a95c8ba?w=1200&auto=format&fit=crop&q=80';
  } else if (upperCode.includes('SAPA') || upperCode.includes('SP')) {
    destination = 'Sa Pa, Lào Cai';
    title = 'Sa Pa — Chinh Phục Fansipan & Bản Cát Cát';
    coverImage =
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&auto=format&fit=crop&q=80';
  } else if (upperCode.includes('HUE')) {
    destination = 'Huế, Thừa Thiên Huế';
    title = 'Huế — Cố Đô Thơ Mộng & Ẩm Thực Cung Đình';
    coverImage =
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&auto=format&fit=crop&q=80';
  } else if (upperCode.includes('NT') || upperCode.includes('NHATRANG')) {
    destination = 'Nha Trang, Khánh Hòa';
    title = 'Nha Trang — Biển Xanh & Lặn Biển Hòn Mun';
    coverImage =
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=80';
  }

  const generated = generatePrototypeTripPlan({
    destination,
    startDate: '2025-06-12',
    endDate: '2025-06-15',
    membersCount: 5,
  });

  const tripId = `trip-joined-${Date.now()}`;

  const joinedMember: Member = {
    id: `m-me-${Date.now()}`,
    name: currentUserName,
    role: 'Thành viên',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    initials: currentUserName
      .split(' ')
      .filter(Boolean)
      .map((w) => w[0])
      .join('')
      .slice(-2)
      .toUpperCase() || 'TV',
    phone: '0987 654 321',
    paidAmount: 0,
    owesAmount: 0,
  };

  const groupLeader: Member = {
    id: `m-leader-${Date.now()}`,
    name: 'Phạm Minh Trí',
    role: 'Trưởng nhóm',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    initials: 'MT',
    isHost: true,
    phone: '0938 123 456',
    paidAmount: 3500000,
    owesAmount: 0,
  };

  return {
    id: tripId,
    title,
    destination,
    datesSummary: '12/06/2025 – 15/06/2025 (4 ngày 3 đêm)',
    startDate: '2025-06-12',
    endDate: '2025-06-15',
    totalDays: 4,
    status: 'upcoming',
    userRole: 'Thành viên',
    inviteCode: upperCode,
    coverImage,
    days: generated.days,
    activities: generated.activities,
    members: [groupLeader, joinedMember, initialMembers[1], initialMembers[2]],
    polls: getDestinationPolls(destination),
    expenses: getDestinationExpenses(destination),
    aiSummary: `Bạn vừa gia nhập chuyến đi "${title}" do bạn Minh Trí làm Trưởng nhóm. Mọi người đã lập xong lịch trình cơ bản và đang mở bình chọn các quán ăn!`,
    createdAt: new Date().toISOString().split('T')[0],
  };
}
