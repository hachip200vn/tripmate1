-- ==============================================================================
-- TRIPMATE - SUPABASE SAMPLE SEED DATA
-- Chạy file này SAU KHI đã chạy supabase_schema.sql trong SQL Editor của Supabase
-- ==============================================================================

-- 1. TẠO HỒ SƠ NGƯỜI DÙNG MẪU (PROFILES)
INSERT INTO public.profiles (id, full_name, email, phone, avatar_url, initials, bio)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Nguyễn Minh Tuấn', 'tuan.nguyen@example.com', '0912345678', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80', 'NT', 'Trưởng nhóm mê phượt & check-in'),
  ('22222222-2222-2222-2222-222222222222', 'Trần Thu Hà', 'ha.tran@example.com', '0923456789', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80', 'TH', 'Thủ quỹ uy tín của nhóm'),
  ('33333333-3333-3333-3333-333333333333', 'Lê Hoàng Nam', 'nam.le@example.com', '0934567890', 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80', 'HN', 'Chuyên gia săn quán ăn ngon'),
  ('44444444-4444-4444-4444-444444444444', 'Phạm Quỳnh Anh', 'quynhanh@example.com', '0945678901', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80', 'QA', 'Nhiếp ảnh gia của cả hội')
ON CONFLICT (id) DO NOTHING;

-- 2. TÀI KHOẢN NGÂN HÀNG CHO THỦ QUỸ (USER_BANK_QR)
INSERT INTO public.user_bank_qr (user_id, bank_id, bank_name, account_number, account_name, custom_qr_url, transfer_syntax)
VALUES
  ('22222222-2222-2222-2222-222222222222', 'MB', 'MBBank (Quân Đội)', '0987654321', 'TRAN THU HA', 'https://api.vietqr.io/image/970422-0987654321-compact.jpg?amount=0&accountName=TRAN%20THU%20HA', 'CHIA TIEN CHUYEN DI')
ON CONFLICT (user_id) DO NOTHING;

-- 3. CHUYẾN ĐI MẪU: ĐÀ NẴNG - HỘI AN 3N2Đ (TRIPS)
INSERT INTO public.trips (
    id, title, destination, departure_location, origin, dates_summary, start_date, end_date, total_days,
    cover_image, status, user_role, invite_code, ai_summary, transport_type,
    estimated_budget, budget_per_person, budget_total, departure_time, return_time, travel_style,
    created_by
)
VALUES (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'Khám phá Đà Nẵng — Hội An 3N2Đ',
    'Đà Nẵng — Hội An',
    'Hà Nội',
    'Hà Nội',
    '15/05 - 17/05/2025',
    '2025-05-15',
    '2025-05-17',
    3,
    'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1000&auto=format&fit=crop&q=80',
    'active',
    'Trưởng nhóm',
    'DNA2025',
    'Lịch trình tối ưu dọc bãi biển Mỹ Khê, săn mây Bà Nà Hills và trải nghiệm thả đèn hoa đăng lung linh phố cổ Hội An!',
    'Máy bay & Thuê xe tự lái',
    18000000,
    4500000,
    18000000,
    '07:30',
    '19:00',
    'Nghỉ dưỡng & Food tour',
    '11111111-1111-1111-1111-111111111111'
)
ON CONFLICT (id) DO NOTHING;

-- 4. THÀNH VIÊN THAM GIA CHUYẾN ĐI (TRIP_MEMBERS)
INSERT INTO public.trip_members (trip_id, user_id, member_name, role, avatar, initials, is_host, paid_amount, owes_amount)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Nguyễn Minh Tuấn', 'Trưởng nhóm', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80', 'NT', true, 6500000, 0),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222', 'Trần Thu Hà', 'Thủ quỹ', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', 'TH', false, 8200000, 0),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333333', 'Lê Hoàng Nam', 'Thành viên', 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80', 'HN', false, 1200000, 2450000),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '44444444-4444-4444-4444-444444444444', 'Phạm Quỳnh Anh', 'Thành viên', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', 'QA', false, 0, 3650000)
ON CONFLICT DO NOTHING;

-- 5. CÁC NGÀY TRONG LỊCH TRÌNH (TRIP_DAYS)
INSERT INTO public.trip_days (id, trip_id, day_number, trip_date, display_date, title, activities_count)
VALUES
  ('bbbbbbbb-1111-bbbb-bbbb-bbbbbbbbbbbb', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 1, '2025-05-15', '15/05', 'Hạ cánh Đà Nẵng, Check-in & Biển Mỹ Khê', 4),
  ('bbbbbbbb-2222-bbbb-bbbb-bbbbbbbbbbbb', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 2, '2025-05-16', '16/05', 'Chinh phục Bà Nà Hills & Cầu Vàng', 4),
  ('bbbbbbbb-3333-bbbb-bbbb-bbbbbbbbbbbb', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 3, '2025-05-17', '17/05', 'Phố cổ Hội An hoài niệm & Mua quà về', 3)
ON CONFLICT DO NOTHING;

-- 6. HOẠT ĐỘNG TIMELINE NGÀY 1 & 2 (ACTIVITIES)
INSERT INTO public.activities (
    id, trip_id, day_number, time_slot, category, title, location, departure_location, destination_location,
    cost_text, price_per_person, status_text, status_type, icon_type, details, image_url, sort_order
)
VALUES
  (
    'cccccccc-1111-cccc-cccc-cccccccccccc',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 1, '08:30 - 10:00', 'Di chuyển',
    'Bay Hà Nội ➔ Đà Nẵng (VJ511)', 'Sân bay Quốc tế Đà Nẵng', 'Nội Bài', 'Đà Nẵng',
    '1.850.000đ/vé', 1850000, 'Đã đặt chỗ', 'booked', 'transport',
    'Hạ cánh lấy hành lý xong hẹn xe đón ở sảnh Đến Cổng A2.',
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=80', 1
  ),
  (
    'cccccccc-2222-cccc-cccc-cccccccccccc',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 1, '11:30 - 13:00', 'Ẩm thực',
    'Thưởng thức Mì Quảng Bà Mua', '95A Nguyễn Tri Phương, Đà Nẵng', NULL, NULL,
    '55.000đ/tô', 55000, 'Đã duyệt', 'approved', 'food',
    'Mì quảng ếch và mì quảng tôm thịt đậm đà, kèm bánh tráng nướng giòn rụm.',
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80', 2
  ),
  (
    'cccccccc-3333-cccc-cccc-cccccccccccc',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 1, '14:00 - 15:00', 'Lưu trú',
    'Nhận phòng Sala Danang Beach Hotel', '36 Lâm Hoành, Phước Mỹ, Sơn Trà', NULL, NULL,
    '1.200.000đ/phòng/đêm', 600000, 'Đã đặt chỗ', 'booked', 'landmark',
    'Khách sạn 4 sao view trọn biển Mỹ Khê, có bể bơi vô cực tầng thượng.',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80', 3
  ),
  (
    'cccccccc-4444-cccc-cccc-cccccccccccc',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 1, '16:30 - 18:30', 'Biển đảo',
    'Tắm biển & Ngắm hoàng hôn Mỹ Khê', 'Bãi biển Mỹ Khê, Đà Nẵng', NULL, NULL,
    'Miễn phí', 0, 'Đã duyệt', 'approved', 'beach',
    'Một trong những bãi biển đẹp nhất hành tinh, cát trắng mịn và sóng êm dịu.',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80', 4
  ),
  (
    'cccccccc-5555-cccc-cccc-cccccccccccc',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 2, '08:30 - 14:00', 'Tham quan',
    'Cáp treo Sun World & Check-in Cầu Vàng', 'Bà Nà Hills, Hòa Vang, Đà Nẵng', NULL, NULL,
    '950.000đ/vé cáp', 950000, 'Đã duyệt', 'approved', 'landmark',
    'Cây Cầu Vàng trứ danh nâng đỡ bởi đôi bàn tay khổng lồ giữa biển mây.',
    'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&auto=format&fit=crop&q=80', 5
  )
ON CONFLICT DO NOTHING;

-- 7. BÌNH CHỌN MẪU (VOTE_POLLS & VOTE_OPTIONS)
INSERT INTO public.vote_polls (id, trip_id, title, creator, deadline, category, status)
VALUES
  ('dddddddd-1111-dddd-dddd-dddddddddddd', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Bình chọn quán Hải Sản ăn tối Ngày 1?', 'Nguyễn Minh Tuấn', '18:00 Ngày 1', 'Ẩm thực', 'active')
ON CONFLICT DO NOTHING;

INSERT INTO public.vote_options (id, poll_id, title, location, price_text, votes_count)
VALUES
  ('eeeeeeee-1111-eeee-eeee-eeeeeeeeeeee', 'dddddddd-1111-dddd-dddd-dddddddddddd', 'Hải Sản Bé Mặn (Bờ kè ven biển)', 'Lô 14 Hoàng Sa, Sơn Trà', '~300.000đ/người', 3),
  ('eeeeeeee-2222-eeee-eeee-eeeeeeeeeeee', 'dddddddd-1111-dddd-dddd-dddddddddddd', 'Hải Sản Năm Đảnh (Ngõ nhỏ ăn chất)', 'K139/H59/38 Trần Quang Khải', '~200.000đ/người', 1),
  ('eeeeeeee-3333-eeee-eeee-eeeeeeeeeeee', 'dddddddd-1111-dddd-dddd-dddddddddddd', 'Nhà Hàng Cơm Niêu Nhà Đỏ', '86 Nguyễn Tri Phương', '~150.000đ/người', 0)
ON CONFLICT DO NOTHING;

-- 8. KHOẢN CHI TIÊU & CHIA TIỀN (EXPENSES)
INSERT INTO public.expenses (id, trip_id, title, category, amount, paid_by_name, split_with_count, expense_date, is_settled, notes)
VALUES
  ('ffffffff-1111-ffff-ffff-ffffffffffff', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Vé cáp treo Bà Nà Hills cả nhóm', 'ticket', 3800000, 'Trần Thu Hà', 4, '2025-05-16', false, 'Đặt online mã giảm giá trên Klook'),
  ('ffffffff-2222-ffff-ffff-ffffffffffff', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Bữa tối Hải Sản Bé Mặn hải vị tươi sống', 'food', 1850000, 'Nguyễn Minh Tuấn', 4, '2025-05-15', true, 'Đã chia đều 4 người'),
  ('ffffffff-3333-ffff-ffff-ffffffffffff', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Tiền cọc thuê xe 7 chỗ 3 ngày', 'transport', 2500000, 'Trần Thu Hà', 4, '2025-05-14', false, 'Xe đón tận sân bay')
ON CONFLICT DO NOTHING;

-- 9. DANH MỤC KHÁM PHÁ VIỆT NAM (EXPLORE_DESTINATIONS)
INSERT INTO public.explore_destinations (id, name, province, region, subtitle, cover_image)
VALUES
  ('10000000-0000-0000-0000-000000000001', 'Hà Nội', 'Hà Nội', 'Miền Bắc', 'Thủ đô nghìn năm văn hiến, 36 phố phường rêu phong và ẩm thực di sản độc đáo', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80'),
  ('10000000-0000-0000-0000-000000000002', 'Đà Nẵng', 'Đà Nẵng', 'Miền Trung', 'Thành phố đáng sống bậc nhất với bãi biển Mỹ Khê và những cây cầu huyền thoại', 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&auto=format&fit=crop&q=80'),
  ('10000000-0000-0000-0000-000000000003', 'Hội An', 'Quảng Nam', 'Miền Trung', 'Phố hội lung linh đèn lồng, sông Hoài thơ mộng và kiến trúc di sản UNESCO', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80'),
  ('10000000-0000-0000-0000-000000000004', 'Phú Quốc', 'Kiên Giang', 'Miền Nam', 'Đảo ngọc thiên đường nhiệt đới với hoàng hôn Bãi Dài và tour lặn ngắm san hô', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80'),
  ('10000000-0000-0000-0000-000000000005', 'Sa Pa', 'Lào Cai', 'Miền Bắc', 'Thị trấn mờ sương, đỉnh thiêng Fansipan và ruộng bậc thang kỳ vĩ', 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80')
ON CONFLICT (name) DO NOTHING;

-- HOÀN TẤT DỮ LIỆU MẪU
