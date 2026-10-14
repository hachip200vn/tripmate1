# 🗄️ HƯỚNG DẪN IMPORT CƠ SỞ DỮ LIỆU TRIPMATE VÀO SUPABASE

Tài liệu này hướng dẫn chi tiết cách thiết lập và import toàn bộ cơ sở dữ liệu của ứng dụng **TripMate** vào **Supabase** (PostgreSQL) chỉ trong 3 bước đơn giản.

---

## 📁 1. Các file CSDL đã được thiết kế sẵn trong thư mục dự án

1. **`supabase_schema.sql`** (Quan trọng nhất): Chứa toàn bộ cấu trúc bảng, kiểu dữ liệu Enum, khóa ngoại quan hệ, trigger tự động cập nhật thời gian, chỉ mục (Index) tăng tốc độ truy vấn, và chính sách bảo mật Row Level Security (RLS).
2. **`supabase_seed.sql`** (Tùy chọn): Chứa bộ dữ liệu mẫu thực tế của Việt Nam (Chuyến đi Đà Nẵng - Hội An, các địa điểm nổi tiếng, khách sạn, ẩm thực, bình chọn, thu chi nhóm và hồ sơ người dùng).

---

## 🚀 2. Các bước Import vào Supabase (3 phút)

### Bước 1: Tạo dự án Supabase mới
1. Truy cập [https://supabase.com](https://supabase.com) và đăng nhập (hoặc tạo tài khoản miễn phí).
2. Bấm **"New Project"**, chọn Organization, đặt tên dự án (ví dụ: `tripmate-app`), chọn mật khẩu CSDL và chọn khu vực máy chủ gần nhất (ví dụ: **Singapore - ap-southeast-1**).

### Bước 2: Chạy file Schema trong SQL Editor
1. Tại thanh menu bên trái của Dashboard Supabase, bấm vào biểu tượng **SQL Editor** (hình `>_`).
2. Bấm **"New Query"**.
3. Mở file **`supabase_schema.sql`** trong dự án này, copy toàn bộ nội dung và dán vào ô SQL Editor.
4. Bấm nút **"Run"** (hoặc nhấn `Ctrl + Enter` / `Cmd + Enter`).
5. Kết quả thông báo: `Success. No rows returned` nghĩa là tất cả 16 bảng và quan hệ đã được tạo thành công!

### Bước 3: (Tùy chọn) Chạy file Dữ liệu mẫu (Seed Data)
1. Trong SQL Editor, bấm tiếp **"New Query"**.
2. Mở file **`supabase_seed.sql`**, copy và dán vào ô SQL Editor.
3. Bấm **"Run"**.
4. Bạn có thể sang mục **Table Editor** ở menu bên trái để xem dữ liệu các chuyến đi, hoạt động và thành viên đã sẵn sàng.

---

## 📊 3. Sơ đồ các bảng trong CSDL (Database Schema)

| Tên bảng | Chức năng trong ứng dụng TripMate |
|---|---|
| `profiles` | Hồ sơ người dùng (liên kết với Supabase Auth `auth.users`), tên, avatar, số điện thoại, vai trò |
| `user_bank_qr` | Cấu hình tài khoản ngân hàng & mã VietQR của thành viên/thủ quỹ để quyết toán chia tiền |
| `trips` | Thông tin chuyến đi: Tên, điểm đến, điểm xuất phát, ngày đi/về, ngân sách, mã phòng (invite code), trạng thái |
| `trip_members` | Danh sách thành viên từng chuyến đi, vai trò (Trưởng nhóm, Thủ quỹ, Thành viên), số tiền đã trả và nợ |
| `trip_days` | Các ngày trong lịch trình (Ngày 1, Ngày 2, Ngày 3, ngày thực tế...) |
| `activities` | Các mốc thời gian hoạt động: Giờ, loại hình, địa điểm, chi phí, tọa độ GPS, trạng thái hoàn thành |
| `activity_comments` | Bình luận, trao đổi và lưu ý của thành viên dưới từng hoạt động |
| `vote_polls` | Các cuộc bình chọn của nhóm (chọn quán ăn, khách sạn, điểm check-in) |
| `vote_options` | Các phương án lựa chọn trong cuộc bình chọn kèm địa chỉ và giá |
| `poll_votes` | Lịch sử biểu quyết của từng thành viên trong nhóm |
| `expenses` | Thu chi nhóm: Khoản chi, người thanh toán, số người chia đều, ngày chi, trạng thái quyết toán |
| `notifications` | Thông báo hoạt động: Lời nhắc lịch trình, bình chọn mới, cập nhật thu chi |
| `explore_destinations` | Danh mục điểm đến Việt Nam (Hà Nội, Đà Nẵng, Hội An, Phú Quốc, Sa Pa...) |
| `explore_spots` | Địa danh, quán ăn, cafe nổi bật kèm đánh giá sao, địa chỉ và mẹo du lịch |
| `explore_articles` | Các bài viết cẩm nang du lịch và kinh nghiệm trải nghiệm |
| `explore_article_comments` | Nhận xét và đánh giá của cộng đồng du khách trên bài viết khám phá |

---

## 🔒 4. Bảo mật Row Level Security (RLS)

- Mặc định, file `supabase_schema.sql` đã bật **Row Level Security (RLS)** trên toàn bộ các bảng.
- Đã thiết lập các chính sách (Policies) để người dùng có thể đọc lịch trình công khai theo mã mời (`invite_code`), và chỉ những thành viên được phân quyền mới có thể chỉnh sửa hoạt động hoặc thu chi.

---

## ⚡ 5. Tự động truy vấn dữ liệu mà KHÔNG CẦN export từ app

Bạn **hoàn toàn có thể truy vấn, đọc, ghi và đồng bộ dữ liệu tự động 100%** mà không cần bất kỳ thao tác xuất (export) thủ công nào từ ứng dụng. Sau khi chạy file `supabase_schema.sql` lần đầu:

### Cách 1: Xem và truy vấn ngay trên Dashboard Supabase
1. **Table Editor**: Bấm vào mục **Table Editor** ở menu bên trái của Supabase. Bạn sẽ thấy 16 bảng dữ liệu xuất hiện trực quan như bảng tính Excel. Bạn có thể thêm, sửa, xóa trực tiếp dòng dữ liệu ngay trên web.
2. **SQL Editor**: Vào mục **SQL Editor** để viết các câu lệnh truy vấn bất kỳ:
   ```sql
   -- Xem toàn bộ chuyến đi kèm số lượng thành viên và tổng tiền đã chi:
   SELECT * FROM v_trip_summary;

   -- Xem các hoạt động trong Ngày 1 của chuyến đi:
   SELECT time_slot, title, location, status_text 
   FROM activities 
   WHERE day_number = 1 
   ORDER BY sort_order;
   ```
3. **API Docs**: Supabase tự động tạo tài liệu REST API cho mọi bảng tại menu **API Docs** (kèm curl, javascript, python).

### Cách 2: Ứng dụng tự động đọc & ghi trực tiếp qua Supabase SDK
Mã nguồn ứng dụng đã được trang bị sẵn module **`src/services/supabaseClient.ts`**:
- Bạn chỉ cần thêm 2 biến môi trường vào `.env`:
  ```env
  VITE_SUPABASE_URL=https://<your-project-id>.supabase.co
  VITE_SUPABASE_ANON_KEY=<your-anon-key>
  ```
- Ứng dụng sẽ tự động gọi các hàm:
  - `fetchTripsDirectly()`: Tự động tải chuyến đi từ database.
  - `addActivityDirectly()`: Tự động lưu mốc thời gian vào bảng `activities`.
  - `subscribeToTripRealtime()`: Tự động đồng bộ thời gian thực (Realtime WebSocket) — khi bạn bè thêm hoạt động hay khoản chi, màn hình của bạn tự cập nhật ngay tức thì!

