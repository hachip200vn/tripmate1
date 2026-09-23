import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ItineraryView } from './components/ItineraryView';
import { ExploreView } from './components/ExploreView';
import { VotingView } from './components/VotingView';
import { BudgetView } from './components/BudgetView';
import { ProfileView } from './components/ProfileView';

import { AiPlannerModal } from './components/AiPlannerModal';
import { NotificationsModal } from './components/NotificationsModal';
import { PhoneOtpModal } from './components/PhoneOtpModal';
import { PasswordModal } from './components/PasswordModal';
import { AuthModal } from './components/AuthModal';
import { SettleQrModal } from './components/SettleQrModal';
import { AddExpenseModal } from './components/AddExpenseModal';
import { CreatePollModal } from './components/CreatePollModal';
import { InviteMembersModal } from './components/InviteMembersModal';
import { UpdateUserQrModal } from './components/UpdateUserQrModal';
import { TripManagerModal } from './components/TripManagerModal';
import { JoinTripModal } from './components/JoinTripModal';
import { TripsListView } from './components/TripsListView';
import { ManualTripModal } from './components/ManualTripModal';
import { AiDestinationRecommendModal } from './components/AiDestinationRecommendModal';
import { AuthScreen } from './components/AuthScreen';

import {
  initialMembers,
  initialNotifications,
  exploreSpots,
  generatePrototypeTripPlan,
} from './data/tripData';
import {
  initialTrips,
  createNewTripFromPlan,
  generateJoinedTripFromCode,
} from './data/defaultTrips';
import {
  getDestinationPolls,
  getDestinationExpenses,
  calculateMemberBalances,
} from './data/destinationPollsAndBudgetData';
import {
  NavTab,
  TimelineActivity,
  TripDay,
  TripPlanData,
  VotePoll,
  ExpenseItem,
  NotificationItem,
  Member,
  UserBankQr,
  Trip,
} from './types';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation & Theme
  const [currentTab, setCurrentTab] = useState<NavTab>('lich-trinh');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('tripmate_theme') === 'dark';
  });

  // User Authentication State (Persisted in localStorage)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const savedAuth = localStorage.getItem('tripmate_is_logged_in');
    return savedAuth !== null ? savedAuth === 'true' : true;
  });

  // User Profile information
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('tripmate_user_name') || 'Nguyễn Việt Hùng';
  });
  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem('tripmate_user_email') || 'nguyenviethung.co@gmail.com';
  });
  const [userPhone, setUserPhone] = useState(() => {
    return localStorage.getItem('tripmate_user_phone') || '0987 654 321';
  });

  // Multi-Trip State Management (Persisted in localStorage)
  const [trips, setTrips] = useState<Trip[]>(() => {
    const saved = localStorage.getItem('tripmate_user_trips');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse saved trips', e);
      }
    }
    return initialTrips;
  });

  const [currentTripId, setCurrentTripId] = useState<string>(() => {
    const savedId = localStorage.getItem('tripmate_current_trip_id');
    if (savedId) return savedId;
    return initialTrips[0]?.id || '';
  });

  // Selected Day within active trip
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);

  // Active trip reference
  const activeTrip: Trip | null =
    trips.find((t) => t.id === currentTripId) || trips[0] || null;

  // Active Trip derived properties
  const activeTripDays: TripDay[] = activeTrip?.days || [];
  const activeActivities: TimelineActivity[] = activeTrip?.activities || [];
  const activePolls: VotePoll[] = activeTrip?.polls || [];
  const activeExpenses: ExpenseItem[] = activeTrip?.expenses || [];
  const activeMembers: Member[] = activeTrip?.members || initialMembers;

  // Save trips and currentTripId to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tripmate_user_trips', JSON.stringify(trips));
    } catch (e) {
      console.error('Error saving trips', e);
    }
  }, [trips]);

  useEffect(() => {
    if (currentTripId) {
      localStorage.setItem('tripmate_current_trip_id', currentTripId);
    }
  }, [currentTripId]);

  // Adjust selected day if out of range for the switched trip
  useEffect(() => {
    if (activeTripDays.length > 0 && selectedDayNumber > activeTripDays.length) {
      setSelectedDayNumber(1);
    }
  }, [currentTripId, activeTripDays.length, selectedDayNumber]);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  // Modals state
  const [showAiPlannerModal, setShowAiPlannerModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSettleQrModal, setShowSettleQrModal] = useState(false);
  const [settlePayer, setSettlePayer] = useState<{
    name: string;
    amount: number;
    mode?: 'pay' | 'receive';
  }>({ name: 'Khánh Huy', amount: 90000, mode: 'pay' });
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showCreatePollModal, setShowCreatePollModal] = useState(false);
  const [editingPoll, setEditingPoll] = useState<VotePoll | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showUpdateQrModal, setShowUpdateQrModal] = useState(false);
  const [showTripManagerModal, setShowTripManagerModal] = useState(false);
  const [showJoinTripModal, setShowJoinTripModal] = useState(false);
  const [showManualTripModal, setShowManualTripModal] = useState(false);
  const [showAiRecommendModal, setShowAiRecommendModal] = useState(false);

  // Selected trip for Invite Modal (defaults to activeTrip)
  const [tripForInvite, setTripForInvite] = useState<Trip | null>(null);

  // User Bank QR state (Persisted in localStorage)
  const [userBankQr, setUserBankQr] = useState<UserBankQr>(() => {
    const saved = localStorage.getItem('tripmate_user_bank_qr');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved bank qr', e);
      }
    }
    return {
      bankId: 'MB',
      bankName: 'MB Bank (Quân Đội)',
      accountNumber: '0987 654 321',
      accountName: 'NGUYEN VIET HUNG',
      transferSyntax: 'TRIPMATE CHIA TIEN',
    };
  });

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Dark Mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('tripmate_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('tripmate_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      showToast(next ? 'Đã bật chế độ Tối (Dark Mode) 🌙' : 'Đã chuyển giao diện Sáng ☀️');
      return next;
    });
  };

  // Switch Active Trip
  const handleSelectTrip = (tripId: string) => {
    setCurrentTripId(tripId);
    setSelectedDayNumber(1);
    const target = trips.find((t) => t.id === tripId);
    if (target) {
      showToast(`Đã chuyển sang chuyến: "${target.title}" ✈️`);
    }
  };

  // Delete / Leave a Trip
  const handleDeleteTrip = (tripId: string) => {
    const targetTrip = trips.find((t) => t.id === tripId);
    const remaining = trips.filter((t) => t.id !== tripId);
    setTrips(remaining);

    if (currentTripId === tripId) {
      if (remaining.length > 0) {
        setCurrentTripId(remaining[0].id);
        setSelectedDayNumber(1);
      } else {
        setCurrentTripId('');
      }
    }

    showToast(`Đã xóa chuyến đi "${targetTrip?.title || ''}"`);
  };

  // Apply AI Generated Trip Plan -> Adds as a new Trip
  const handleApplyAiGeneratedPlan = (plan: TripPlanData) => {
    const newTrip = createNewTripFromPlan(plan, userName);
    setTrips((prev) => [newTrip, ...prev]);
    setCurrentTripId(newTrip.id);
    setSelectedDayNumber(1);
    setCurrentTab('lich-trinh');
    showToast(`Đã tạo chuyến đi mới: "${newTrip.title}"! 🎉`);
  };

  // Join Trip by Code
  const handleJoinTripByCode = (code: string) => {
    const upper = code.trim().toUpperCase();
    const existing = trips.find((t) => t.inviteCode.toUpperCase() === upper);
    if (existing) {
      setCurrentTripId(existing.id);
      setSelectedDayNumber(1);
      setCurrentTab('lich-trinh');
      showToast(`Bạn đã tham gia chuyến: "${existing.title}" rồi!`);
      return;
    }

    const joinedTrip = generateJoinedTripFromCode(upper, userName);
    setTrips((prev) => [joinedTrip, ...prev]);
    setCurrentTripId(joinedTrip.id);
    setSelectedDayNumber(1);
    setCurrentTab('lich-trinh');
    showToast(`Gia nhập thành công chuyến đi "${joinedTrip.title}"! 🎒✨`);
  };

  // Add Spot To Current Trip Itinerary from Explore View
  const handleAddSpotToItinerary = (spot: {
    id: string;
    name: string;
    category: string;
    address: string;
    priceText: string;
    tip: string;
  }) => {
    if (!activeTrip) {
      // If no active trip, create a fresh one first
      const defaultPlan = generatePrototypeTripPlan({
        destination: spot.address.split(',').pop()?.trim() || 'Hà Nội',
      });
      const newTrip = createNewTripFromPlan(defaultPlan, userName);
      setTrips([newTrip]);
      setCurrentTripId(newTrip.id);
      showToast(`Đã tạo chuyến đi mới và thêm "${spot.name}"!`);
      return;
    }

    const targetDayNumber = activeTripDays.length === 0 ? 1 : selectedDayNumber;

    const newAct: TimelineActivity = {
      id: `act-${Date.now()}`,
      dayNumber: targetDayNumber,
      time: '16:00',
      category: spot.category,
      title: spot.name,
      location: spot.address,
      costText: spot.priceText,
      statusText: 'Đã thêm từ Khám phá',
      statusType: 'approved',
      iconType: spot.category.includes('Ẩm thực') ? 'food' : 'landmark',
      details: spot.tip,
    };

    setTrips((prev) =>
      prev.map((t) =>
        t.id === activeTrip.id
          ? {
              ...t,
              activities: [...t.activities, newAct],
            }
          : t
      )
    );

    showToast(`Đã thêm "${spot.name}" vào Ngày ${targetDayNumber}!`);
  };

  // Create itinerary directly from Explore Destination card
  const handleCreateItineraryForDestination = (destinationName: string) => {
    const plan = generatePrototypeTripPlan({ destination: destinationName });
    const newTrip = createNewTripFromPlan(plan, userName);
    setTrips((prev) => [newTrip, ...prev]);
    setCurrentTripId(newTrip.id);
    setSelectedDayNumber(1);
    setCurrentTab('lich-trinh');
    showToast(`Đã tạo chuyến đi khám phá ${destinationName}! ✨`);
  };

  // Vote on option in Poll
  const handleVoteOption = (pollId: string, optionId: string) => {
    if (!activeTrip) return;

    setTrips((prev) =>
      prev.map((t) => {
        if (t.id !== activeTrip.id) return t;
        const updatedPolls = t.polls.map((poll) => {
          if (poll.id !== pollId) return poll;
          return {
            ...poll,
            options: poll.options.map((opt) => {
              if (opt.id === optionId) {
                const nextVotes = opt.votedByMe ? opt.votes - 1 : opt.votes + 1;
                return {
                  ...opt,
                  votes: Math.max(0, nextVotes),
                  votedByMe: !opt.votedByMe,
                  voterAvatars: opt.votedByMe
                    ? opt.voterAvatars.filter((a) => a !== 'VH')
                    : [...opt.voterAvatars, 'VH'],
                };
              }
              return opt;
            }),
          };
        });
        return { ...t, polls: updatedPolls };
      })
    );

    showToast('Đã ghi nhận phiếu bình chọn của bạn! ✨');
  };

  // Create Poll trigger
  const handleCreatePoll = () => {
    setEditingPoll(null);
    setShowCreatePollModal(true);
  };

  // Edit Poll trigger
  const handleEditPoll = (poll: VotePoll) => {
    setEditingPoll(poll);
    setShowCreatePollModal(true);
  };

  // Delete Poll trigger
  const handleDeletePoll = (pollId: string) => {
    if (!activeTrip) return;
    const pollToRemove = activeTrip.polls.find((p) => p.id === pollId);
    setTrips((prev) =>
      prev.map((t) =>
        t.id === activeTrip.id
          ? {
              ...t,
              polls: t.polls.filter((p) => p.id !== pollId),
            }
          : t
      )
    );
    showToast(`Đã xóa cuộc bình chọn: "${pollToRemove?.title || 'Bình chọn'}"! 🗑️`);
  };

  // Save (Create or Update) Poll
  const handleSavePoll = (savedPoll: VotePoll) => {
    if (!activeTrip) return;

    const isExisting = activeTrip.polls.some((p) => p.id === savedPoll.id);

    setTrips((prev) =>
      prev.map((t) => {
        if (t.id !== activeTrip.id) return t;

        const updatedPolls = isExisting
          ? t.polls.map((p) => (p.id === savedPoll.id ? savedPoll : p))
          : [savedPoll, ...t.polls];

        return {
          ...t,
          polls: updatedPolls,
        };
      })
    );

    if (isExisting) {
      showToast(`Đã cập nhật cuộc bình chọn: "${savedPoll.title}"! ✏️`);
    } else {
      showToast(`Đã tạo cuộc biểu quyết: "${savedPoll.title}"! 🗳️`);
    }
    setEditingPoll(null);
  };

  // Direct add member from invite modal
  const handleAddMemberDirectly = (name: string, phone: string) => {
    if (!activeTrip) return;

    const newMember: Member = {
      id: `m-${Date.now()}`,
      name,
      role: 'Thành viên',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      initials:
        name
          .split(' ')
          .filter(Boolean)
          .map((w) => w[0])
          .join('')
          .slice(-2)
          .toUpperCase() || 'TV',
      phone: phone || undefined,
      paidAmount: 0,
      owesAmount: 0,
    };

    setTrips((prev) =>
      prev.map((t) =>
        t.id === activeTrip.id
          ? {
              ...t,
              members: [...t.members, newMember],
            }
          : t
      )
    );

    showToast(`Đã thêm thành viên "${name}" vào chuyến đi! 🎒`);
  };

  // Save personal QR Data
  const handleSaveQrData = (newData: UserBankQr) => {
    setUserBankQr(newData);
    localStorage.setItem('tripmate_user_bank_qr', JSON.stringify(newData));
    showToast('Đã cập nhật mã QR nhận tiền cá nhân của bạn! 💳');
  };

  // Add Expense with excluded members & notes support
  const handleAddExpense = (expense: {
    title: string;
    amount: number;
    paidByName: string;
    splitWithCount: number;
    excludedMembers?: string[];
    notes?: string;
  }) => {
    if (!activeTrip) return;

    const newExp: ExpenseItem = {
      id: `exp-${Date.now()}`,
      title: expense.title,
      category: 'other',
      amount: expense.amount,
      paidBy: 'm1',
      paidByName: expense.paidByName,
      paidByAvatar: expense.paidByName.slice(0, 2).toUpperCase(),
      splitWithCount: expense.splitWithCount,
      excludedMembers: expense.excludedMembers,
      notes: expense.notes,
      isSettled: false,
      date: 'Hôm nay',
    };

    setTrips((prev) =>
      prev.map((t) => {
        if (t.id !== activeTrip.id) return t;
        const updatedExpenses = [newExp, ...t.expenses];
        const updatedMembers = calculateMemberBalances(updatedExpenses, t.members);
        return {
          ...t,
          expenses: updatedExpenses,
          members: updatedMembers,
        };
      })
    );

    showToast(`Đã thêm khoản chi "${expense.title}"!`);
  };

  // Update existing expense
  const handleUpdateExpense = (updatedExpense: ExpenseItem) => {
    if (!activeTrip) return;

    setTrips((prev) =>
      prev.map((t) => {
        if (t.id !== activeTrip.id) return t;
        const updatedExpenses = t.expenses.map((exp) =>
          exp.id === updatedExpense.id ? updatedExpense : exp
        );
        const updatedMembers = calculateMemberBalances(updatedExpenses, t.members);
        return {
          ...t,
          expenses: updatedExpenses,
          members: updatedMembers,
        };
      })
    );

    showToast(`Đã lưu thay đổi: ${updatedExpense.title}`);
  };

  // Delete expense
  const handleDeleteExpense = (expenseId: string) => {
    if (!activeTrip) return;

    setTrips((prev) =>
      prev.map((t) => {
        if (t.id !== activeTrip.id) return t;
        const updatedExpenses = t.expenses.filter((exp) => exp.id !== expenseId);
        const updatedMembers = calculateMemberBalances(updatedExpenses, t.members);
        return {
          ...t,
          expenses: updatedExpenses,
          members: updatedMembers,
        };
      })
    );

    showToast('Đã xóa khoản chi khỏi danh sách');
  };

  // Update activity status in timeline
  const handleUpdateActivityStatus = (
    activityId: string,
    newStatusType: TimelineActivity['statusType'],
    newStatusText: string
  ) => {
    if (!activeTrip) return;

    setTrips((prev) =>
      prev.map((t) => {
        if (t.id !== activeTrip.id) return t;
        const updatedActs = t.activities.map((act) =>
          act.id === activityId
            ? { ...act, statusType: newStatusType, statusText: newStatusText }
            : act
        );
        return { ...t, activities: updatedActs };
      })
    );

    showToast(`Đã cập nhật trạng thái hoạt động: ${newStatusText}`);
  };

  // Delete activity from timeline
  const handleDeleteActivity = (activityId: string) => {
    if (!activeTrip) return;

    setTrips((prev) =>
      prev.map((t) => {
        if (t.id !== activeTrip.id) return t;
        return {
          ...t,
          activities: t.activities.filter((act) => act.id !== activityId),
        };
      })
    );

    showToast('Đã xóa hoạt động khỏi lịch trình');
  };

  // Activity Comments Handlers
  const handleAddActivityComment = (activityId: string, content: string) => {
    if (!activeTrip) return;
    const newComment = {
      id: `cmt-${Date.now()}`,
      activityId,
      authorName: userName,
      authorRole: activeTrip.userRole || 'Thành viên',
      content,
      createdAt: 'Vừa xong',
    };

    setTrips((prev) =>
      prev.map((t) => {
        if (t.id !== activeTrip.id) return t;
        return {
          ...t,
          activities: t.activities.map((act) => {
            if (act.id !== activityId) return act;
            return {
              ...act,
              comments: [...(act.comments || []), newComment],
            };
          }),
        };
      })
    );
    showToast('Đã gửi bình luận thành công! 💬');
  };

  const handleDeleteActivityComment = (activityId: string, commentId: string) => {
    if (!activeTrip) return;
    setTrips((prev) =>
      prev.map((t) => {
        if (t.id !== activeTrip.id) return t;
        return {
          ...t,
          activities: t.activities.map((act) => {
            if (act.id !== activityId) return act;
            return {
              ...act,
              comments: (act.comments || []).filter((c) => c.id !== commentId),
            };
          }),
        };
      })
    );
    showToast('Đã xóa bình luận.');
  };

  // Optimize route simulation
  const handleOptimizeRoute = () => {
    showToast('AI đã tối ưu lộ trình: Tiết kiệm 45 phút di chuyển!');
  };

  // Add activity prompt
  const handleAddActivity = () => {
    setCurrentTab('kham-pha');
    showToast('Chọn địa điểm muốn ghé thăm từ mục Khám phá để thêm vào!');
  };

  // Mark all notifications read
  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
    showToast('Đã đánh dấu đọc tất cả thông báo!');
  };

  // Logout handler - transitions completely to full-screen AuthScreen (not a modal popup)
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('tripmate_is_logged_in', 'false');
    setShowAuthModal(false);
    showToast('Đã đăng xuất tài khoản.');
  };

  // Login handler
  const handleLoginSuccess = (userData: { name: string; email: string; phone?: string }) => {
    setIsLoggedIn(true);
    localStorage.setItem('tripmate_is_logged_in', 'true');
    setUserName(userData.name);
    localStorage.setItem('tripmate_user_name', userData.name);
    setUserEmail(userData.email);
    localStorage.setItem('tripmate_user_email', userData.email);
    if (userData.phone) {
      setUserPhone(userData.phone);
      localStorage.setItem('tripmate_user_phone', userData.phone);
    }
    setCurrentTab('lich-trinh');
    showToast(`Chào mừng ${userData.name} quay trở lại TripMate! ✨`);
  };

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  // When logged out, show the full-screen Login / Register page instead of the main app or a popup
  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <AuthScreen
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          onLoginSuccess={handleLoginSuccess}
          onContinueAsGuest={() => {
            setIsLoggedIn(true);
            localStorage.setItem('tripmate_is_logged_in', 'true');
            showToast('Bạn đang sử dụng TripMate với tư cách Khách.');
          }}
          lastUserEmail={userEmail}
          lastUserName={userName}
        />

        {/* Toast Feedback Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 font-bold text-xs shadow-2xl flex items-center gap-2 backdrop-blur-md"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 flex-shrink-0" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center selection:bg-sky-500 selection:text-white transition-colors duration-200">
      {/* Mobile Frame Wrapper with modern aesthetic */}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col shadow-2xl relative pt-16 pb-16">
        {/* Fixed Header */}
        <Header
          currentTab={currentTab}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          unreadCount={unreadCount}
          onOpenNotifications={() => setShowNotificationsModal(true)}
          onOpenProfileOrAuth={() => setCurrentTab('tai-khoan')}
          isLoggedIn={isLoggedIn}
          activeTripTitle={activeTrip?.title}
        />

        {/* Main Content with Framer-motion Transitions */}
        <main className="flex-1 w-full px-4 pt-4 pb-4 overflow-x-hidden">
          <AnimatePresence mode="wait">
            {currentTab === 'chuyen-di' && (
              <motion.div
                key="chuyen-di"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <TripsListView
                  trips={trips}
                  currentTripId={currentTripId}
                  onBack={() => setCurrentTab('lich-trinh')}
                  onSelectTrip={(id) => {
                    handleSelectTrip(id);
                    setCurrentTab('lich-trinh');
                  }}
                  onOpenCreateWithAi={() => setShowAiRecommendModal(true)}
                  onOpenManualCreate={() => setShowManualTripModal(true)}
                  onOpenJoinTrip={() => setShowJoinTripModal(true)}
                  onOpenInviteForTrip={(t) => {
                    setTripForInvite(t);
                    setShowInviteModal(true);
                  }}
                  onDeleteTrip={handleDeleteTrip}
                />
              </motion.div>
            )}

            {currentTab === 'lich-trinh' && (
              <motion.div
                key="lich-trinh"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <ItineraryView
                  days={activeTripDays}
                  selectedDay={selectedDayNumber}
                  onSelectDay={setSelectedDayNumber}
                  activities={activeActivities}
                  members={activeMembers}
                  tripTitle={activeTrip?.title}
                  tripDatesSummary={activeTrip?.datesSummary}
                  tripCoverImage={activeTrip?.coverImage}
                  tripOrigin={activeTrip?.origin}
                  tripDestination={activeTrip?.destination}
                  tripBudgetPerPerson={activeTrip?.budgetPerPerson}
                  tripBudgetTotal={activeTrip?.budgetTotal}
                  tripDepartureTime={activeTrip?.departureTime}
                  tripReturnTime={activeTrip?.returnTime}
                  tripTravelStyle={activeTrip?.travelStyle}
                  currentUserName={userName}
                  aiSummary={activeTrip?.aiSummary}
                  trips={trips}
                  currentTripId={currentTripId}
                  onSelectTrip={handleSelectTrip}
                  onOpenTripManager={() => setCurrentTab('chuyen-di')}
                  onOpenJoinTrip={() => setShowJoinTripModal(true)}
                  onOpenManualCreateTrip={() => setShowManualTripModal(true)}
                  onOpenAiRecommendTrip={() => setShowAiRecommendModal(true)}
                  onOpenAiPlanner={() => setShowAiRecommendModal(true)}
                  onAddActivity={handleAddActivity}
                  onOpenInviteModal={() => {
                    setTripForInvite(activeTrip);
                    setShowInviteModal(true);
                  }}
                  onVoteAgain={(actTitle) => {
                    setCurrentTab('binh-chon');
                    showToast(`Chuyển đến bình chọn cho: ${actTitle}`);
                  }}
                  onOpenFullscreenMap={() => {
                    showToast('Bản đồ toàn màn hình cùng định vị GPS');
                  }}
                  onOptimizeRoute={handleOptimizeRoute}
                  onUpdateActivityStatus={handleUpdateActivityStatus}
                  onDeleteActivity={handleDeleteActivity}
                  onAddActivityComment={handleAddActivityComment}
                  onDeleteActivityComment={handleDeleteActivityComment}
                  onResetTrip={() => {
                    if (activeTrip) {
                      handleDeleteTrip(activeTrip.id);
                    }
                  }}
                />
              </motion.div>
            )}

            {currentTab === 'kham-pha' && (
              <motion.div
                key="kham-pha"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <ExploreView
                  currentDestination={activeTrip?.destination}
                  onAddSpotToItinerary={handleAddSpotToItinerary}
                  onSwitchToItinerary={() => setCurrentTab('lich-trinh')}
                  onCreateItineraryForDestination={handleCreateItineraryForDestination}
                />
              </motion.div>
            )}

            {currentTab === 'binh-chon' && (
              <motion.div
                key="binh-chon"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <VotingView
                  polls={activePolls}
                  currentDestination={activeTrip?.destination}
                  onVoteOption={handleVoteOption}
                  onCreatePoll={handleCreatePoll}
                  onEditPoll={handleEditPoll}
                  onDeletePoll={handleDeletePoll}
                  onSwitchToItinerary={() => setCurrentTab('lich-trinh')}
                  onOpenAiPlanner={() => {
                    setCurrentTab('lich-trinh');
                    setShowAiPlannerModal(true);
                  }}
                />
              </motion.div>
            )}

            {currentTab === 'ngan-sach' && (
              <motion.div
                key="ngan-sach"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <BudgetView
                  expenses={activeExpenses}
                  members={activeMembers}
                  currentDestination={activeTrip?.destination}
                  userBankQr={userBankQr}
                  onOpenUpdateQr={() => setShowUpdateQrModal(true)}
                  onAddExpense={() => setShowAddExpenseModal(true)}
                  onOpenSettleQr={(payer, amount, mode = 'pay') => {
                    setSettlePayer({ name: payer, amount, mode });
                    setShowSettleQrModal(true);
                  }}
                  onUpdateExpense={handleUpdateExpense}
                  onDeleteExpense={handleDeleteExpense}
                  onSwitchToItinerary={() => setCurrentTab('lich-trinh')}
                  onOpenAiPlanner={() => {
                    setCurrentTab('lich-trinh');
                    setShowAiPlannerModal(true);
                  }}
                />
              </motion.div>
            )}

            {currentTab === 'tai-khoan' && (
              <motion.div
                key="tai-khoan"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <ProfileView
                  userName={userName}
                  userEmail={userEmail}
                  userPhone={userPhone}
                  darkMode={darkMode}
                  tripsCount={trips.length}
                  onToggleDarkMode={toggleDarkMode}
                  onOpenPhoneModal={() => setShowPhoneModal(true)}
                  onOpenPasswordModal={() => setShowPasswordModal(true)}
                  onOpenNotifications={() => setShowNotificationsModal(true)}
                  onOpenTripManager={() => setCurrentTab('chuyen-di')}
                  onLogoutOrSwitchAccount={handleLogout}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Fixed Bottom Navigation */}
        <BottomNav
          currentTab={currentTab}
          onChangeTab={setCurrentTab}
        />

        {/* Toast Feedback Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-slate-900/90 dark:bg-slate-100/95 text-white dark:text-slate-900 backdrop-blur-md shadow-xl flex items-center gap-2 border border-slate-700/50 dark:border-slate-300 max-w-[90vw]"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 flex-shrink-0" />
              <span className="text-xs font-bold truncate">{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* All Modals */}
        <AiPlannerModal
          isOpen={showAiPlannerModal}
          onClose={() => setShowAiPlannerModal(false)}
          onApplyGeneratedPlan={handleApplyAiGeneratedPlan}
        />

        <NotificationsModal
          isOpen={showNotificationsModal}
          onClose={() => setShowNotificationsModal(false)}
          notifications={notifications}
          onMarkAllAsRead={handleMarkAllNotificationsRead}
          onOpenVotingTab={() => setCurrentTab('binh-chon')}
          onOpenBudgetTab={() => setCurrentTab('ngan-sach')}
        />

        <PhoneOtpModal
          isOpen={showPhoneModal}
          onClose={() => setShowPhoneModal(false)}
          currentPhone={userPhone}
          onUpdatePhoneSuccess={(newP) => {
            setUserPhone(newP);
            showToast('Đã cập nhật số điện thoại thành công!');
          }}
        />

        <PasswordModal
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          onPasswordChanged={() => {
            showToast('Đã đổi mật khẩu tài khoản thành công!');
          }}
        />

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={(email) => {
            showToast(`Đã đăng nhập thành công: ${email}!`);
          }}
        />

        <SettleQrModal
          isOpen={showSettleQrModal}
          onClose={() => setShowSettleQrModal(false)}
          payerName={settlePayer.name}
          amount={settlePayer.amount}
          mode={settlePayer.mode}
          userBankQr={userBankQr}
          onOpenUpdateQr={() => setShowUpdateQrModal(true)}
          onSettledSuccess={() => {
            showToast(
              settlePayer.mode === 'receive'
                ? 'Đã xác nhận nhận tiền thành công!'
                : 'Đã xác nhận thanh toán chuyển khoản!'
            );
          }}
        />

        <AddExpenseModal
          isOpen={showAddExpenseModal}
          onClose={() => setShowAddExpenseModal(false)}
          members={activeMembers}
          onAddExpense={handleAddExpense}
        />

        {/* Create / Edit Poll Modal */}
        <CreatePollModal
          isOpen={showCreatePollModal}
          onClose={() => {
            setShowCreatePollModal(false);
            setEditingPoll(null);
          }}
          destination={activeTrip?.destination}
          creatorName={userName}
          onSavePoll={handleSavePoll}
          initialPoll={editingPoll}
        />

        {/* Invite Members Modal */}
        <InviteMembersModal
          isOpen={showInviteModal}
          onClose={() => setShowInviteModal(false)}
          tripTitle={tripForInvite?.title || activeTrip?.title}
          destination={tripForInvite?.destination || activeTrip?.destination}
          datesSummary={tripForInvite?.datesSummary || activeTrip?.datesSummary}
          inviteCode={tripForInvite?.inviteCode || activeTrip?.inviteCode}
          members={tripForInvite?.members || activeMembers}
          onAddMemberDirectly={handleAddMemberDirectly}
        />

        {/* Update User QR Modal */}
        <UpdateUserQrModal
          isOpen={showUpdateQrModal}
          onClose={() => setShowUpdateQrModal(false)}
          currentQrData={userBankQr}
          onSaveQrData={handleSaveQrData}
        />

        {/* Trip Manager Modal */}
        <TripManagerModal
          isOpen={showTripManagerModal}
          onClose={() => setShowTripManagerModal(false)}
          trips={trips}
          currentTripId={currentTripId}
          onSelectTrip={handleSelectTrip}
          onOpenCreateWithAi={() => setShowAiPlannerModal(true)}
          onOpenJoinTrip={() => setShowJoinTripModal(true)}
          onOpenInviteForTrip={(t) => {
            setTripForInvite(t);
            setShowInviteModal(true);
          }}
          onDeleteTrip={handleDeleteTrip}
        />

        {/* Join Trip Modal */}
        <JoinTripModal
          isOpen={showJoinTripModal}
          onClose={() => setShowJoinTripModal(false)}
          onJoinTrip={handleJoinTripByCode}
        />

        {/* Manual Trip Creation Modal */}
        <ManualTripModal
          isOpen={showManualTripModal}
          onClose={() => setShowManualTripModal(false)}
          onApplyManualTrip={(plan) => {
            handleApplyAiGeneratedPlan(plan);
            setShowManualTripModal(false);
          }}
          onCreateTrip={(plan) => {
            handleApplyAiGeneratedPlan(plan);
            setShowManualTripModal(false);
          }}
        />

        {/* AI Auto Destination Recommendation Modal */}
        <AiDestinationRecommendModal
          isOpen={showAiRecommendModal}
          onClose={() => setShowAiRecommendModal(false)}
          onApplyPlan={(plan) => {
            handleApplyAiGeneratedPlan(plan);
            setShowAiRecommendModal(false);
          }}
          onApplyTripPlan={(plan) => {
            handleApplyAiGeneratedPlan(plan);
            setShowAiRecommendModal(false);
          }}
          onOpenManualPlanner={() => {
            setShowAiRecommendModal(false);
            setShowManualTripModal(true);
          }}
        />
      </div>
    </div>
  );
}
