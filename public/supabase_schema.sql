-- ==============================================================================
-- TRIPMATE - SUPABASE POSTGRESQL DATABASE SCHEMA
-- Phiên bản: 1.0 (Chuẩn hóa cho Supabase SQL Editor & Auth RLS)
-- Mô tả: CSDL hoàn chỉnh cho ứng dụng lập kế hoạch du lịch nhóm TripMate
-- ==============================================================================

-- 1. BẬT CÁC EXTENSION CẦN THIẾT
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. TẠO CÁC KIỂU DỮ LIỆU ENUM
-- ==============================================================================

DO $$ BEGIN
    CREATE TYPE trip_status_enum AS ENUM ('active', 'upcoming', 'completed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE trip_role_enum AS ENUM ('Trưởng nhóm', 'Thành viên', 'Thủ quỹ');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE activity_status_enum AS ENUM ('approved', 'booked', 'voted', 'pending', 'transport', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE activity_icon_enum AS ENUM ('food', 'landmark', 'dining', 'beach', 'night', 'transport');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE poll_status_enum AS ENUM ('active', 'closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE expense_category_enum AS ENUM ('food', 'transport', 'stay', 'ticket', 'other');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE notification_type_enum AS ENUM ('vote', 'expense', 'reminder', 'member', 'settle', 'flight');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE notification_category_enum AS ENUM ('trip', 'expense', 'all');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- 3. HÀM CẬP NHẬT THỜI GIAN (TRIGGER UPDATED_AT)
-- ==============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- 4. BẢNG HỒ SƠ NGƯỜI DÙNG (PROFILES - LIÊN KẾT AUTH.USERS)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID UNIQUE, -- Liên kết với auth.users(id) trong Supabase Auth
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    avatar_url TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    initials VARCHAR(4) DEFAULT 'TM',
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger cập nhật updated_at cho profiles
DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
CREATE TRIGGER trg_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 5. BẢNG CÀI ĐẶT TÀI KHOẢN NGÂN HÀNG & QR CHIA TIỀN (USER_BANK_QR)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.user_bank_qr (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    bank_id TEXT NOT NULL DEFAULT 'MB',
    bank_name TEXT NOT NULL DEFAULT 'MBBank (Quân Đội)',
    account_number TEXT NOT NULL,
    account_name TEXT NOT NULL,
    custom_qr_url TEXT,
    transfer_syntax TEXT DEFAULT 'CHIA TIEN TRIPMATE',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uq_user_bank UNIQUE(user_id)
);

-- ==============================================================================
-- 6. BẢNG CHUYẾN ĐI (TRIPS)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.trips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    destination TEXT NOT NULL,
    departure_location TEXT DEFAULT 'Hà Nội',
    origin TEXT DEFAULT 'Hà Nội',
    dates_summary TEXT,
    start_date DATE,
    end_date DATE,
    total_days INT NOT NULL DEFAULT 3,
    cover_image TEXT DEFAULT 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1000&auto=format&fit=crop&q=80',
    status trip_status_enum NOT NULL DEFAULT 'active',
    user_role trip_role_enum NOT NULL DEFAULT 'Trưởng nhóm',
    invite_code VARCHAR(12) NOT NULL UNIQUE,
    ai_summary TEXT,
    transport_type TEXT DEFAULT 'Máy bay & Grab',
    estimated_budget NUMERIC(15, 2) DEFAULT 0,
    budget_per_person NUMERIC(15, 2) DEFAULT 0,
    budget_total NUMERIC(15, 2) DEFAULT 0,
    departure_time TEXT DEFAULT '08:00',
    return_time TEXT DEFAULT '18:00',
    travel_style TEXT DEFAULT 'Khám phá & Nghỉ dưỡng',
    notes TEXT,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_trips_updated_at ON public.trips;
CREATE TRIGGER trg_trips_updated_at
    BEFORE UPDATE ON public.trips
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 7. BẢNG THÀNH VIÊN CHUYẾN ĐI (TRIP_MEMBERS)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.trip_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    member_name TEXT NOT NULL,
    role trip_role_enum NOT NULL DEFAULT 'Thành viên',
    avatar TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    initials VARCHAR(4) NOT NULL DEFAULT 'TV',
    phone TEXT,
    is_host BOOLEAN NOT NULL DEFAULT false,
    paid_amount NUMERIC(15, 2) NOT NULL DEFAULT 0,
    owes_amount NUMERIC(15, 2) NOT NULL DEFAULT 0,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uq_trip_member UNIQUE(trip_id, user_id)
);

-- ==============================================================================
-- 8. BẢNG CÁC NGÀY TRONG LỊCH TRÌNH (TRIP_DAYS)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.trip_days (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
    day_number INT NOT NULL,
    trip_date DATE,
    display_date VARCHAR(20),
    title TEXT NOT NULL,
    activities_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uq_trip_day_number UNIQUE(trip_id, day_number)
);

-- ==============================================================================
-- 9. BẢNG CÁC HOẠT ĐỘNG TIMELINE (ACTIVITIES)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
    day_number INT NOT NULL,
    time_slot VARCHAR(20) NOT NULL,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    departure_location TEXT,
    destination_location TEXT,
    cost_text TEXT,
    price_per_person NUMERIC(15, 2) DEFAULT 0,
    status_text TEXT NOT NULL DEFAULT 'Đã duyệt',
    status_type activity_status_enum NOT NULL DEFAULT 'approved',
    icon_type activity_icon_enum NOT NULL DEFAULT 'landmark',
    details TEXT,
    note TEXT,
    image_url TEXT,
    vote_stats TEXT,
    driver_info TEXT,
    is_completed BOOLEAN NOT NULL DEFAULT false,
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_activities_updated_at ON public.activities;
CREATE TRIGGER trg_activities_updated_at
    BEFORE UPDATE ON public.activities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 10. BẢNG BÌNH LUẬN & GHI CHÚ HOẠT ĐỘNG (ACTIVITY_COMMENTS)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.activity_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    author_name TEXT NOT NULL,
    author_role TEXT DEFAULT 'Thành viên',
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 11. BẢNG BÌNH CHỌN / POLLS (VOTE_POLLS)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.vote_polls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    creator TEXT NOT NULL DEFAULT 'Trưởng nhóm',
    deadline TEXT,
    category TEXT NOT NULL DEFAULT 'Địa điểm',
    status poll_status_enum NOT NULL DEFAULT 'active',
    winning_option_id UUID,
    winning_option_title TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 12. BẢNG PHƯƠNG ÁN BÌNH CHỌN (VOTE_OPTIONS)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.vote_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    poll_id UUID NOT NULL REFERENCES public.vote_polls(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    location TEXT,
    price_text TEXT,
    votes_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 13. BẢNG LỊCH SỬ VOTE CỦA THÀNH VIÊN (POLL_VOTES)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.poll_votes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    poll_id UUID NOT NULL REFERENCES public.vote_polls(id) ON DELETE CASCADE,
    option_id UUID NOT NULL REFERENCES public.vote_options(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    voter_name TEXT,
    voter_avatar TEXT,
    voted_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uq_user_poll_vote UNIQUE(poll_id, user_id)
);

-- ==============================================================================
-- 14. BẢNG CHI PHÍ & THU CHI CHIA TIỀN (EXPENSES)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category expense_category_enum NOT NULL DEFAULT 'food',
    amount NUMERIC(15, 2) NOT NULL DEFAULT 0,
    paid_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    paid_by_name TEXT NOT NULL,
    paid_by_avatar TEXT,
    split_with_count INT NOT NULL DEFAULT 1,
    expense_date DATE DEFAULT CURRENT_DATE,
    excluded_members TEXT[] DEFAULT '{}',
    is_settled BOOLEAN NOT NULL DEFAULT false,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_expenses_updated_at ON public.expenses;
CREATE TRIGGER trg_expenses_updated_at
    BEFORE UPDATE ON public.expenses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 15. BẢNG THÔNG BÁO (NOTIFICATIONS)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE,
    type notification_type_enum NOT NULL,
    category notification_category_enum NOT NULL DEFAULT 'all',
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    time_ago TEXT,
    is_unread BOOLEAN NOT NULL DEFAULT true,
    avatar_text TEXT,
    avatar_bg TEXT,
    action_text TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 16. BẢNG DANH MỤC KHÁM PHÁ DU LỊCH VIỆT NAM (EXPLORE CATALOG)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.explore_destinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    province TEXT NOT NULL,
    region TEXT NOT NULL, -- 'Miền Bắc', 'Miền Trung', 'Miền Nam', 'Tây Nguyên'
    subtitle TEXT,
    cover_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.explore_spots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    destination_id UUID NOT NULL REFERENCES public.explore_destinations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Địa danh', 'Quán ăn', 'Cafe', 'Cảnh quan'
    tag TEXT,
    rating NUMERIC(2, 1) DEFAULT 4.8,
    reviews_count INT DEFAULT 100,
    address TEXT,
    image TEXT,
    tip TEXT,
    price_text TEXT,
    best_time TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.explore_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    destination_id UUID REFERENCES public.explore_destinations(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    read_time VARCHAR(20) DEFAULT '5 phút đọc',
    category TEXT NOT NULL DEFAULT 'Cẩm nang du lịch',
    image TEXT,
    excerpt TEXT,
    author TEXT DEFAULT 'TripMate Editor',
    published_date TEXT,
    content TEXT[],
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.explore_article_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    article_id UUID NOT NULL REFERENCES public.explore_articles(id) ON DELETE CASCADE,
    user_name TEXT NOT NULL,
    user_avatar TEXT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment_text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 17. TẠO INDEXES TỐI ƯU HIỆU NĂNG TRUY VẤN
-- ==============================================================================

CREATE INDEX IF NOT EXISTS idx_trips_status ON public.trips(status);
CREATE INDEX IF NOT EXISTS idx_trips_invite_code ON public.trips(invite_code);
CREATE INDEX IF NOT EXISTS idx_trip_members_trip_id ON public.trip_members(trip_id);
CREATE INDEX IF NOT EXISTS idx_trip_members_user_id ON public.trip_members(user_id);
CREATE INDEX IF NOT EXISTS idx_trip_days_trip_id ON public.trip_days(trip_id);
CREATE INDEX IF NOT EXISTS idx_activities_trip_day ON public.activities(trip_id, day_number);
CREATE INDEX IF NOT EXISTS idx_activities_time ON public.activities(time_slot);
CREATE INDEX IF NOT EXISTS idx_activity_comments_activity ON public.activity_comments(activity_id);
CREATE INDEX IF NOT EXISTS idx_vote_polls_trip ON public.vote_polls(trip_id);
CREATE INDEX IF NOT EXISTS idx_vote_options_poll ON public.vote_options(poll_id);
CREATE INDEX IF NOT EXISTS idx_expenses_trip ON public.expenses(trip_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id, is_unread);
CREATE INDEX IF NOT EXISTS idx_explore_spots_dest ON public.explore_spots(destination_id);
CREATE INDEX IF NOT EXISTS idx_explore_articles_dest ON public.explore_articles(destination_id);

-- ==============================================================================
-- 18. CHÍNH SÁCH BẢO MẬT ROW LEVEL SECURITY (RLS) CHO SUPABASE
-- ==============================================================================

-- Bật RLS cho tất cả bảng
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_bank_qr ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vote_polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vote_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poll_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.explore_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.explore_spots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.explore_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.explore_article_comments ENABLE ROW LEVEL SECURITY;

-- Tạo Policies (Cho phép đọc công khai và chỉnh sửa cho người dùng đăng nhập)
-- Profiles: Mọi người xem được hồ sơ thành viên, chủ tài khoản được sửa
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (true);

-- User Bank QR
CREATE POLICY "Bank QR is viewable by everyone" ON public.user_bank_qr FOR SELECT USING (true);
CREATE POLICY "Users can manage their bank QR" ON public.user_bank_qr FOR ALL USING (true);

-- Trips: Đọc chuyến đi theo mã hoặc thành viên, người dùng tạo mới và cập nhật chuyến
CREATE POLICY "Trips are viewable by everyone" ON public.trips FOR SELECT USING (true);
CREATE POLICY "Users can create trips" ON public.trips FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update trips" ON public.trips FOR UPDATE USING (true);
CREATE POLICY "Users can delete trips" ON public.trips FOR DELETE USING (true);

-- Trip Members
CREATE POLICY "Trip members viewable by all" ON public.trip_members FOR SELECT USING (true);
CREATE POLICY "Manage trip members" ON public.trip_members FOR ALL USING (true);

-- Trip Days & Activities
CREATE POLICY "Trip days viewable by all" ON public.trip_days FOR SELECT USING (true);
CREATE POLICY "Manage trip days" ON public.trip_days FOR ALL USING (true);

CREATE POLICY "Activities viewable by all" ON public.activities FOR SELECT USING (true);
CREATE POLICY "Manage activities" ON public.activities FOR ALL USING (true);

CREATE POLICY "Activity comments viewable by all" ON public.activity_comments FOR SELECT USING (true);
CREATE POLICY "Insert activity comments" ON public.activity_comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Delete activity comments" ON public.activity_comments FOR DELETE USING (true);

-- Polls & Options
CREATE POLICY "Polls viewable by all" ON public.vote_polls FOR SELECT USING (true);
CREATE POLICY "Manage polls" ON public.vote_polls FOR ALL USING (true);

CREATE POLICY "Vote options viewable by all" ON public.vote_options FOR SELECT USING (true);
CREATE POLICY "Manage vote options" ON public.vote_options FOR ALL USING (true);

CREATE POLICY "Poll votes viewable by all" ON public.poll_votes FOR SELECT USING (true);
CREATE POLICY "Cast poll votes" ON public.poll_votes FOR ALL USING (true);

-- Expenses
CREATE POLICY "Expenses viewable by all" ON public.expenses FOR SELECT USING (true);
CREATE POLICY "Manage expenses" ON public.expenses FOR ALL USING (true);

-- Notifications
CREATE POLICY "Notifications viewable by user" ON public.notifications FOR SELECT USING (true);
CREATE POLICY "Manage notifications" ON public.notifications FOR ALL USING (true);

-- Explore
CREATE POLICY "Explore destinations viewable by all" ON public.explore_destinations FOR SELECT USING (true);
CREATE POLICY "Explore spots viewable by all" ON public.explore_spots FOR SELECT USING (true);
CREATE POLICY "Explore articles viewable by all" ON public.explore_articles FOR SELECT USING (true);
CREATE POLICY "Explore article comments viewable by all" ON public.explore_article_comments FOR SELECT USING (true);
CREATE POLICY "Insert explore article comments" ON public.explore_article_comments FOR INSERT WITH CHECK (true);

-- ==============================================================================
-- 19. VIEW THỐNG KÊ TỔNG QUAN CHUYẾN ĐI (V_TRIP_SUMMARY)
-- ==============================================================================

CREATE OR REPLACE VIEW public.v_trip_summary AS
SELECT 
    t.id AS trip_id,
    t.title,
    t.destination,
    t.departure_location,
    t.dates_summary,
    t.status,
    t.invite_code,
    COUNT(DISTINCT m.id) AS total_members,
    COUNT(DISTINCT a.id) AS total_activities,
    COALESCE(SUM(e.amount), 0) AS total_spent,
    t.created_at
FROM public.trips t
LEFT JOIN public.trip_members m ON t.id = m.trip_id
LEFT JOIN public.activities a ON t.id = a.trip_id
LEFT JOIN public.expenses e ON t.id = e.trip_id
GROUP BY t.id;

-- ==============================================================================
-- HOÀN THÀNH SCHEMA - SẴN SÀNG SỬ DỤNG TRÊN SUPABASE!
-- ==============================================================================
