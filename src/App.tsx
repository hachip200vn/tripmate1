import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ItineraryView } from './components/ItineraryView';
import { ExploreView } from './components/ExploreView';
import { VotingView } from './components/VotingView';
import { BudgetView } from './components/BudgetView';
import { ProfileView } from './components/ProfileView';

import { UtilityDashboardModal } from './components/UtilityDashboardModal';
import { AiPlannerModal } from './components/AiPlannerModal';
import { NotificationsModal } from './components/NotificationsModal';
import { PhoneOtpModal } from './components/PhoneOtpModal';
import { PasswordModal } from './components/PasswordModal';
import { ReviewModal } from './components/ReviewModal';
import { AuthModal } from './components/AuthModal';
import { SettleQrModal } from './components/SettleQrModal';
import { AddExpenseModal } from './components/AddExpenseModal';

import {
  initialMembers,
  initialDays,
  initialTimelineActivities,
  initialNotifications,
  initialPolls,
  initialExpenses,
  exploreSpots,
} from './data/tripData';
import { NavTab, TimelineActivity, TripDay, TripPlanData, VotePoll, ExpenseItem, NotificationItem } from './types';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation & Theme
  const [currentTab, setCurrentTab] = useState<NavTab>('lich-trinh');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('tripmate_theme') === 'dark';
  });

  // User Profile information
  const [userName, setUserName] = useState('Nguyễn Việt Hùng');
  const [userEmail, setUserEmail] = useState('nguyenviethung.co@gmail.com');
  const [userPhone, setUserPhone] = useState('0987 654 321');

  // Trip and Views state - Initially empty itinerary as requested by user
  const [tripPlan, setTripPlan] = useState<TripPlanData | null>(null);
  const [tripDays, setTripDays] = useState<TripDay[]>([]);
  const [activities, setActivities] = useState<TimelineActivity[]>([]);
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);

  const [polls, setPolls] = useState<VotePoll[]>(initialPolls);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(initialExpenses);
  const [members, setMembers] = useState(initialMembers);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  // Modals state
  const [showUtilitiesModal, setShowUtilitiesModal] = useState(false);
  const [showAiPlannerModal, setShowAiPlannerModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewSpotName, setReviewSpotName] = useState('Cầu Rồng Đà Nẵng');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSettleQrModal, setShowSettleQrModal] = useState(false);
  const [settlePayer, setSettlePayer] = useState({ name: 'Khánh Huy', amount: 90000 });
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
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

  // Add Spot To Itinerary from Explore View
  const handleAddSpotToItinerary = (spot: typeof exploreSpots[0]) => {
    // If no days yet, initialize Day 1
    if (tripDays.length === 0) {
      const defaultDay: TripDay = {
        dayNumber: 1,
        date: 'Hôm nay',
        displayDate: 'Ngày 1',
        title: 'Khởi hành & Khám phá',
        activitiesCount: 1,
      };
      setTripDays([defaultDay]);
      setSelectedDayNumber(1);
    }

    const newAct: TimelineActivity = {
      id: `act-${Date.now()}`,
      dayNumber: tripDays.length === 0 ? 1 : selectedDayNumber,
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
    setActivities((prev) => [...prev, newAct]);
    showToast(`Đã thêm "${spot.name}" vào lịch trình Ngày ${tripDays.length === 0 ? 1 : selectedDayNumber}!`);
  };

  // Vote on option in Poll
  const handleVoteOption = (pollId: string, optionId: string) => {
    setPolls((prev) =>
      prev.map((poll) => {
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
      })
    );
    showToast('Đã ghi nhận phiếu bình chọn của bạn! ✨');
  };

  // Create Poll
  const handleCreatePoll = () => {
    const newPoll: VotePoll = {
      id: `poll-${Date.now()}`,
      title: 'Chọn điểm ngắm pháo hoa Quốc tế DIFF tối nay',
      creator: 'Nguyễn Việt Hùng',
      deadline: '19:00 hôm nay',
      category: 'Sự kiện đặc biệt',
      status: 'active',
      options: [
        {
          id: `opt-${Date.now()}-1`,
          title: 'Khán đài bờ sông Hàn',
          location: 'Đường Trần Hưng Đạo',
          priceText: '300.000đ/vé',
          votes: 1,
          votedByMe: true,
          voterAvatars: ['VH'],
        },
        {
          id: `opt-${Date.now()}-2`,
          title: 'Rooftop Bar Novotel Danang',
          location: '36 Bạch Đằng',
          priceText: 'Đồ uống gọi món',
          votes: 0,
          votedByMe: false,
          voterAvatars: [],
        },
      ],
    };
    setPolls((prev) => [newPoll, ...prev]);
    showToast('Đã tạo cuộc bình chọn mới cho nhóm!');
  };

  // Add Expense
  const handleAddExpense = (expense: {
    title: string;
    amount: number;
    paidByName: string;
    splitWithCount: number;
  }) => {
    const newExp: ExpenseItem = {
      id: `exp-${Date.now()}`,
      title: expense.title,
      category: 'other',
      amount: expense.amount,
      paidBy: 'm1',
      paidByName: expense.paidByName,
      paidByAvatar: expense.paidByName.slice(0, 2).toUpperCase(),
      splitWithCount: expense.splitWithCount,
      date: 'Hôm nay',
    };
    setExpenses((prev) => [newExp, ...prev]);

    // Update paid amount
    setMembers((prev) =>
      prev.map((m) =>
        m.name === expense.paidByName
          ? { ...m, paidAmount: m.paidAmount + expense.amount }
          : m
      )
    );

    showToast(`Đã thêm khoản chi "${expense.title}"!`);
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

  const unreadCount = notifications.filter((n) => n.isUnread).length;

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
          onOpenUtilities={() => setShowUtilitiesModal(true)}
          onOpenProfileOrAuth={() => setCurrentTab('tai-khoan')}
          isLoggedIn={true}
        />

        {/* Main Content with Framer-motion Transitions */}
        <main className="flex-1 w-full px-4 pt-4 pb-4 overflow-x-hidden">
          <AnimatePresence mode="wait">
            {currentTab === 'lich-trinh' && (
              <motion.div
                key="lich-trinh"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <ItineraryView
                  days={tripDays}
                  selectedDay={selectedDayNumber}
                  onSelectDay={setSelectedDayNumber}
                  activities={activities}
                  members={members}
                  tripTitle={tripPlan?.tripTitle}
                  tripDatesSummary={tripPlan?.datesSummary}
                  tripCoverImage={tripPlan?.coverImage}
                  aiSummary={tripPlan?.aiSummary}
                  onOpenAiPlanner={() => setShowAiPlannerModal(true)}
                  onAddActivity={handleAddActivity}
                  onOpenInviteModal={() =>
                    showToast('Mã mời nhóm: TRIPMATE-DN2025 (Đã sao chép)')
                  }
                  onVoteAgain={(actTitle) => {
                    setCurrentTab('binh-chon');
                    showToast(`Chuyển đến bình chọn cho: ${actTitle}`);
                  }}
                  onOpenFullscreenMap={() => {
                    showToast('Bản đồ toàn màn hình cùng định vị GPS');
                  }}
                  onOptimizeRoute={handleOptimizeRoute}
                  onResetTrip={() => {
                    setTripPlan(null);
                    setTripDays([]);
                    setActivities([]);
                    setSelectedDayNumber(1);
                    showToast('Đã làm mới lại lịch trình!');
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
                  onOpenReviewModal={(spotName) => {
                    setReviewSpotName(spotName);
                    setShowReviewModal(true);
                  }}
                  onAddSpotToItinerary={handleAddSpotToItinerary}
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
                  polls={polls}
                  onVoteOption={handleVoteOption}
                  onCreatePoll={handleCreatePoll}
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
                  expenses={expenses}
                  members={members}
                  onAddExpense={() => setShowAddExpenseModal(true)}
                  onOpenSettleQr={(payer, amount) => {
                    setSettlePayer({ name: payer, amount });
                    setShowSettleQrModal(true);
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
                  onToggleDarkMode={toggleDarkMode}
                  onOpenPhoneModal={() => setShowPhoneModal(true)}
                  onOpenPasswordModal={() => setShowPasswordModal(true)}
                  onOpenUtilitiesModal={() => setShowUtilitiesModal(true)}
                  onOpenNotifications={() => setShowNotificationsModal(true)}
                  onLogoutOrSwitchAccount={() => setShowAuthModal(true)}
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
        <UtilityDashboardModal
          isOpen={showUtilitiesModal}
          onClose={() => setShowUtilitiesModal(false)}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
        />

        <AiPlannerModal
          isOpen={showAiPlannerModal}
          onClose={() => setShowAiPlannerModal(false)}
          onApplyGeneratedPlan={(plan) => {
            setTripPlan(plan);
            setTripDays(plan.days);
            setActivities(plan.activities);
            setSelectedDayNumber(1);
            setCurrentTab('lich-trinh');
            showToast(`AI đã lập lịch trình hoàn tất: ${plan.tripTitle}! 🎉`);
          }}
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

        <ReviewModal
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          spotName={reviewSpotName}
          onSubmitSuccess={() => {
            showToast('Đã đăng cảm nhận & hình ảnh thực tế thành công!');
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
          onSettledSuccess={() => {
            showToast('Đã xác nhận thanh toán chuyển khoản!');
          }}
        />

        <AddExpenseModal
          isOpen={showAddExpenseModal}
          onClose={() => setShowAddExpenseModal(false)}
          members={members}
          onAddExpense={handleAddExpense}
        />
      </div>
    </div>
  );
}
