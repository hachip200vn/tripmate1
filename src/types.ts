export type NavTab = 'kham-pha' | 'lich-trinh' | 'binh-chon' | 'ngan-sach' | 'tai-khoan';
export type NavigationTab = NavTab;

export type TripDay = {
  dayNumber: number;
  date: string;
  displayDate: string;
  title: string;
  activitiesCount: number;
};

export type TimelineActivity = {
  id: string;
  dayNumber: number;
  time: string;
  category: string;
  title: string;
  location: string;
  costText?: string;
  pricePerPerson?: number;
  statusText: string;
  statusType: 'approved' | 'booked' | 'voted' | 'pending' | 'transport';
  iconType: 'food' | 'landmark' | 'dining' | 'beach' | 'night' | 'transport';
  details?: string;
  note?: string;
  imageUrl?: string;
  voteStats?: string;
  driverInfo?: string;
  isCompleted?: boolean;
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

export type UtilitySetting = {
  currencyConverter: boolean;
  weatherRadar: boolean;
  packingList: boolean;
  sosDirectory: boolean;
  quickSplit: boolean;
  ambientSound: boolean;
};
