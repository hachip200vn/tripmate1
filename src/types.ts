export type NavTab = 'kham-pha' | 'lich-trinh' | 'chuyen-di' | 'binh-chon' | 'ngan-sach' | 'tai-khoan';
export type NavigationTab = NavTab;

export type TripDay = {
  dayNumber: number;
  date: string;
  displayDate: string;
  title: string;
  activitiesCount: number;
};

export type TripRole = 'Trưởng nhóm' | 'Thành viên' | 'Thủ quỹ';
export type TripStatus = 'active' | 'upcoming' | 'completed';

export type Trip = {
  id: string;
  title: string;
  destination: string;
  departureLocation?: string;
  datesSummary: string;
  startDate?: string;
  endDate?: string;
  totalDays: number;
  coverImage?: string;
  status: TripStatus;
  userRole: TripRole;
  inviteCode: string;
  days: TripDay[];
  activities: TimelineActivity[];
  members: Member[];
  polls: VotePoll[];
  expenses: ExpenseItem[];
  aiSummary?: string;
  transportType?: string;
  estimatedBudget?: number;
  notes?: string;
  createdAt?: string;
};

export type TripPlanData = {
  tripTitle: string;
  destination: string;
  departureLocation?: string;
  datesSummary: string;
  startDate?: string;
  endDate?: string;
  totalDays: number;
  coverImage?: string;
  days: TripDay[];
  activities: TimelineActivity[];
  aiSummary?: string;
  transportType?: string;
  estimatedBudget?: number;
  notes?: string;
};

export type TimelineActivity = {
  id: string;
  dayNumber: number;
  time: string;
  category: string;
  title: string;
  location: string;
  departureLocation?: string;
  destinationLocation?: string;
  costText?: string;
  pricePerPerson?: number;
  statusText: string;
  statusType: 'approved' | 'booked' | 'voted' | 'pending' | 'transport' | 'completed' | 'cancelled';
  iconType: 'food' | 'landmark' | 'dining' | 'beach' | 'night' | 'transport';
  details?: string;
  note?: string;
  imageUrl?: string;
  voteStats?: string;
  driverInfo?: string;
  isCompleted?: boolean;
  coordinates?: { lat: number; lng: number };
};

export type NotificationItem = {
  id: string;
  type: 'vote' | 'expense' | 'reminder' | 'member' | 'settle' | 'flight';
  category: 'trip' | 'expense' | 'all';
  title: string;
  content: string;
  timeAgo: string;
  isUnread: boolean;
  avatarText?: string;
  avatarBg?: string;
  actionText?: string;
  meta?: {
    flightCode?: string;
    route?: string;
    seat?: string;
    gate?: string;
    amount?: string;
    yourShare?: string;
    voters?: string[];
  };
};

export type VoteOption = {
  id: string;
  title: string;
  location: string;
  priceText: string;
  votes: number;
  votedByMe: boolean;
  voterAvatars: string[];
};

export type VotePoll = {
  id: string;
  title: string;
  creator: string;
  deadline: string;
  category: string;
  status: 'active' | 'closed';
  options: VoteOption[];
};

export type ExpenseItem = {
  id: string;
  title: string;
  category: 'food' | 'transport' | 'stay' | 'ticket' | 'other';
  amount: number;
  paidBy: string;
  paidByName: string;
  paidByAvatar: string;
  splitWithCount: number;
  date: string;
  excludedMembers?: string[];
  isSettled?: boolean;
  notes?: string;
};

export type Member = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  initials: string;
  isHost?: boolean;
  phone?: string;
  paidAmount: number;
  owesAmount: number;
};

export type UserBankQr = {
  bankId: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  customQrUrl?: string;
  transferSyntax?: string;
};
