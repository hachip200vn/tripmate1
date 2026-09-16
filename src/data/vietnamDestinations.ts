export interface DestinationItem {
  id: string;
  name: string;
  province: string;
  region: 'Miền Bắc' | 'Miền Trung' | 'Miền Nam' | 'Tây Nguyên';
  tag: string;
  description?: string;
  popularSpots?: string[];
  googleMapQuery: string;
}

// 63 tỉnh thành phố Việt Nam + các thiên đường du lịch trọng điểm
export const VIETNAM_DESTINATIONS: DestinationItem[] = [
  // Điểm du lịch nổi tiếng hàng đầu
  {
    id: 'danang',
    name: 'Đà Nẵng — Hội An',
    province: 'Đà Nẵng',
    region: 'Miền Trung',
    tag: 'Biển Mỹ Khê & Bà Nà Hills',
    popularSpots: ['Cầu Rồng', 'Biển Mỹ Khê', 'Bà Nà Hills', 'Bán đảo Sơn Trà'],
    googleMapQuery: 'Đà Nẵng, Việt Nam',
  },
  {
    id: 'dalat',
    name: 'Đà Lạt',
    province: 'Lâm Đồng',
    region: 'Tây Nguyên',
    tag: 'Thành phố ngàn hoa & Sương mù',
    popularSpots: ['Hồ Xuân Hương', 'Săn mây Cầu Đất', 'Thác Datanla', 'Quảng trường Lâm Viên'],
    googleMapQuery: 'Đà Lạt, Lâm Đồng, Việt Nam',
  },
  {
    id: 'phuquoc',
    name: 'Phú Quốc',
    province: 'Kiên Giang',
    region: 'Miền Nam',
    tag: 'Đảo Ngọc & Cáp treo Hòn Thơm',
    popularSpots: ['Bãi Sao', 'Sunset Sanato', 'Grand World', 'Hòn Mây Rút'],
    googleMapQuery: 'Phú Quốc, Kiên Giang, Việt Nam',
  },
  {
    id: 'hagiang',
    name: 'Hà Giang',
    province: 'Hà Giang',
    region: 'Miền Bắc',
    tag: 'Đèo Mã Pí Lèng & Sông Nho Quế',
    popularSpots: ['Cột mốc số 0', 'Cổng trời Quản Bạ', 'Đèo Mã Pí Lèng', 'Sông Nho Quế'],
    googleMapQuery: 'Hà Giang, Việt Nam',
  },
  {
    id: 'hanoi',
    name: 'Hà Nội',
    province: 'Hà Nội',
    region: 'Miền Bắc',
    tag: 'Thủ đô nghìn năm văn hiến',
    popularSpots: ['Hồ Hoàn Kiếm', 'Phố cổ Hà Nội', 'Lăng Bác', 'Hồ Tây'],
    googleMapQuery: 'Hà Nội, Việt Nam',
  },
  {
    id: 'sapa',
    name: 'Sa Pa',
    province: 'Lào Cai',
    region: 'Miền Bắc',
    tag: 'Đỉnh Fansipan & Ruộng bậc thang',
    popularSpots: ['Đỉnh Fansipan', 'Bản Cát Cát', 'Đèo Ô Quy Hồ', 'Thung lũng Mường Hoa'],
    googleMapQuery: 'Sa Pa, Lào Cai, Việt Nam',
  },
  {
    id: 'nhatrang',
    name: 'Nha Trang',
    province: 'Khánh Hòa',
    region: 'Miền Trung',
    tag: 'Vịnh biển đẹp bậc nhất thế giới',
    popularSpots: ['VinWonders', 'Hòn Tằm', 'Tháp Bà Ponagar', 'Viện Hải dương học'],
    googleMapQuery: 'Nha Trang, Khánh Hòa, Việt Nam',
  },
  {
    id: 'halong',
    name: 'Hạ Long',
    province: 'Quảng Ninh',
    region: 'Miền Bắc',
    tag: 'Kỳ quan thiên nhiên thế giới',
    popularSpots: ['Vịnh Hạ Long', 'Đảo Tuần Châu', 'Hang Sửng Sốt', 'Bãi Cháy'],
    googleMapQuery: 'Hạ Long, Quảng Ninh, Việt Nam',
  },
  {
    id: 'hoian',
    name: 'Hội An',
    province: 'Quảng Nam',
    region: 'Miền Trung',
    tag: 'Phố cổ đèn lồng di sản',
    popularSpots: ['Chùa Cầu', 'Sông Hoài', 'Rừng dừa Bảy Mẫu', 'Show Ký Ức Hội An'],
    googleMapQuery: 'Hội An, Quảng Nam, Việt Nam',
  },
  {
    id: 'hue',
    name: 'Huế',
    province: 'Thừa Thiên Huế',
    region: 'Miền Trung',
    tag: 'Cố đô di sản & Sông Hương',
    popularSpots: ['Đại Nội Huế', 'Chùa Thiên Mụ', 'Lăng Khải Định', 'Cầu Tràng Tiền'],
    googleMapQuery: 'Huế, Thừa Thiên Huế, Việt Nam',
  },
  {
    id: 'hcm',
    name: 'TP. Hồ Chí Minh',
    province: 'TP. Hồ Chí Minh',
    region: 'Miền Nam',
    tag: 'Đô thị sầm uất & Năng động',
    popularSpots: ['Chợ Bến Thành', 'Phố đi bộ Nguyễn Huệ', 'Landmark 81', 'Dinh Độc Lập'],
    googleMapQuery: 'Thành phố Hồ Chí Minh, Việt Nam',
  },
  {
    id: 'quynhon',
    name: 'Quy Nhơn',
    province: 'Bình Định',
    region: 'Miền Trung',
    tag: 'Eo Gió & Kỳ Co hoang sơ',
    popularSpots: ['Eo Gió', 'Kỳ Co', 'Ghềnh Ráng Tiên Sa', 'Tháp Bánh Ít'],
    googleMapQuery: 'Quy Nhơn, Bình Định, Việt Nam',
  },
  {
    id: 'ninhbinh',
    name: 'Ninh Bình',
    province: 'Ninh Bình',
    region: 'Miền Bắc',
    tag: 'Tràng An & Hang Múa',
    popularSpots: ['Tràng An', 'Chùa Bái Đính', 'Hang Múa', 'Tam Cốc Bích Động'],
    googleMapQuery: 'Ninh Bình, Việt Nam',
  },
  {
    id: 'phongnha',
    name: 'Phong Nha — Kẻ Bàng',
    province: 'Quảng Bình',
    region: 'Miền Trung',
    tag: 'Vương quốc hang động',
    popularSpots: ['Động Thiên Đường', 'Động Phong Nha', 'Suối Nước Moọc', 'Sông Chày Hang Tối'],
    googleMapQuery: 'Phong Nha, Bố Trạch, Quảng Bình, Việt Nam',
  },
  {
    id: 'vungtau',
    name: 'Vũng Tàu',
    province: 'Bà Rịa – Vũng Tàu',
    region: 'Miền Nam',
    tag: 'Biển Bãi Sau & Hải đăng cổ',
    popularSpots: ['Tượng Chúa Kitô', 'Hải đăng Vũng Tàu', 'Bãi Trước', 'Bãi Sau'],
    googleMapQuery: 'Vũng Tàu, Bà Rịa - Vũng Tàu, Việt Nam',
  },
  {
    id: 'muine',
    name: 'Phan Thiết — Mũi Né',
    province: 'Bình Thuận',
    region: 'Miền Trung',
    tag: 'Đồi cát bay & Làng chài Mũi Né',
    popularSpots: ['Đồi Cát Trắng', 'Suối Tiên', 'Làng chài Mũi Né', 'Hải đăng Kê Gà'],
    googleMapQuery: 'Mũi Né, Phan Thiết, Bình Thuận, Việt Nam',
  },
  {
    id: 'condao',
    name: 'Côn Đảo',
    province: 'Bà Rịa – Vũng Tàu',
    region: 'Miền Nam',
    tag: 'Biển xanh ngọc & Lịch sử linh thiêng',
    popularSpots: ['Bãi Đầm Trầu', 'Nghĩa trang Hàng Dương', 'Vịnh Côn Sơn', 'Hòn Bảy Cạnh'],
    googleMapQuery: 'Côn Đảo, Bà Rịa - Vũng Tàu, Việt Nam',
  },
  {
    id: 'mocchau',
    name: 'Mộc Châu',
    province: 'Sơn La',
    region: 'Miền Bắc',
    tag: 'Đồi chè trái tim & Rừng thông Bản Áng',
    popularSpots: ['Đồi chè Trái Tim', 'Rừng thông Bản Áng', 'Thác Dải Yếm', 'Thung lũng mận Nà Ka'],
    googleMapQuery: 'Mộc Châu, Sơn La, Việt Nam',
  },
  {
    id: 'cantho',
    name: 'Cần Thơ',
    province: 'Cần Thơ',
    region: 'Miền Nam',
    tag: 'Thủ phủ miền Tây & Chợ nổi Cái Răng',
    popularSpots: ['Chợ nổi Cái Răng', 'Bến Ninh Kiều', 'Nhà cổ Bình Thủy', 'Cồn Sơn'],
    googleMapQuery: 'Cần Thơ, Việt Nam',
  },
  {
    id: 'catba',
    name: 'Cát Bà',
    province: 'Hải Phòng',
    region: 'Miền Bắc',
    tag: 'Vịnh Lan Hạ & Vườn quốc gia',
    popularSpots: ['Vịnh Lan Hạ', 'Đảo Khỉ', 'Pháo đài Thần Công', 'Vườn quốc gia Cát Bà'],
    googleMapQuery: 'Đảo Cát Bà, Hải Phòng, Việt Nam',
  },
  {
    id: 'phuyen',
    name: 'Phú Yên',
    province: 'Phú Yên',
    region: 'Miền Trung',
    tag: 'Ghềnh Đá Đĩa & Xứ sở hoa vàng cỏ xanh',
    popularSpots: ['Ghềnh Đá Đĩa', 'Bãi Xép', 'Mũi Điện', 'Tháp Nghinh Phong'],
    googleMapQuery: 'Tuy Hòa, Phú Yên, Việt Nam',
  },

  // Đầy đủ 63 Tỉnh Thành theo vần bảng chữ cái (Đặc biệt chữ H: Hà Nội, Hà Giang, Hà Tĩnh, Hải Dương, Hải Phòng, Hậu Giang, Hòa Bình, Hưng Yên...)
  { id: 'angiang', name: 'An Giang', province: 'An Giang', region: 'Miền Nam', tag: 'Rừng tràm Trà Sư & Miếu Bà Chúa Xứ', googleMapQuery: 'An Giang, Việt Nam' },
  { id: 'baria', name: 'Bà Rịa – Vũng Tàu', province: 'Bà Rịa – Vũng Tàu', region: 'Miền Nam', tag: 'Khu du lịch biển Vũng Tàu & Hồ Tràm', googleMapQuery: 'Bà Rịa - Vũng Tàu, Việt Nam' },
  { id: 'bacgiang', name: 'Bắc Giang', province: 'Bắc Giang', region: 'Miền Bắc', tag: 'Vùng vải thiều Lục Ngạn & Suối Mỡ', googleMapQuery: 'Bắc Giang, Việt Nam' },
  { id: 'backan', name: 'Bắc Kạn', province: 'Bắc Kạn', region: 'Miền Bắc', tag: 'Hồ Ba Bể xanh trong', googleMapQuery: 'Bắc Kạn, Việt Nam' },
  { id: 'baclieu', name: 'Bạc Liêu', province: 'Bạc Liêu', region: 'Miền Nam', tag: 'Nhà công tử Bạc Liêu & Cánh đồng quạt gió', googleMapQuery: 'Bạc Liêu, Việt Nam' },
  { id: 'bacninh', name: 'Bắc Ninh', province: 'Bắc Ninh', region: 'Miền Bắc', tag: 'Cái nôi dân ca Quan Họ', googleMapQuery: 'Bắc Ninh, Việt Nam' },
  { id: 'bentre', name: 'Bến Tre', province: 'Bến Tre', region: 'Miền Nam', tag: 'Xứ sở dừa bến nước', googleMapQuery: 'Bến Tre, Việt Nam' },
  { id: 'binhdinh', name: 'Bình Định', province: 'Bình Định', region: 'Miền Trung', tag: 'Vùng đất võ & Biển Quy Nhơn', googleMapQuery: 'Bình Định, Việt Nam' },
  { id: 'binhduong', name: 'Bình Dương', province: 'Bình Dương', region: 'Miền Nam', tag: 'Khu du lịch Đại Nam', googleMapQuery: 'Bình Dương, Việt Nam' },
  { id: 'binhphuoc', name: 'Bình Phước', province: 'Bình Phước', region: 'Miền Nam', tag: 'Vườn quốc gia Bù Gia Mập', googleMapQuery: 'Bình Phước, Việt Nam' },
  { id: 'binhthuan', name: 'Bình Thuận', province: 'Bình Thuận', region: 'Miền Trung', tag: 'Mũi Né & Cù Lao Câu', googleMapQuery: 'Bình Thuận, Việt Nam' },
  { id: 'camau', name: 'Cà Mau', province: 'Cà Mau', region: 'Miền Nam', tag: 'Mũi Cà Mau cực Nam tổ quốc', googleMapQuery: 'Cà Mau, Việt Nam' },
  { id: 'caobang', name: 'Cao Bằng', province: 'Cao Bằng', region: 'Miền Bắc', tag: 'Thác Bản Giốc & Suối Lê Nin', googleMapQuery: 'Cao Bằng, Việt Nam' },
  { id: 'daklak', name: 'Đắk Lắk', province: 'Đắk Lắk', region: 'Tây Nguyên', tag: 'Thủ phủ cà phê Buôn Ma Thuột & Hồ Lắk', googleMapQuery: 'Đắk Lắk, Việt Nam' },
  { id: 'daknong', name: 'Đắk Nông', province: 'Đắk Nông', region: 'Tây Nguyên', tag: 'Hồ Tà Đùng — Vịnh Hạ Long Tây Nguyên', googleMapQuery: 'Đắk Nông, Việt Nam' },
  { id: 'dienbien', name: 'Điện Biên', province: 'Điện Biên', region: 'Miền Bắc', tag: 'Chiến trường Điện Biên Phủ & Hoa ban trắng', googleMapQuery: 'Điện Biên, Việt Nam' },
  { id: 'dongnai', name: 'Đồng Nai', province: 'Đồng Nai', region: 'Miền Nam', tag: 'Thác Đá Hàn & Rừng Nam Cát Tiên', googleMapQuery: 'Đồng Nai, Việt Nam' },
  { id: 'dongthap', name: 'Đồng Tháp', province: 'Đồng Tháp', region: 'Miền Nam', tag: 'Đầm sen Tháp Mười & Làng hoa Sa Đéc', googleMapQuery: 'Đồng Tháp, Việt Nam' },
  { id: 'gialai', name: 'Gia Lai', province: 'Gia Lai', region: 'Tây Nguyên', tag: 'Biển Hồ T’Nưng & Núi lửa Chư Đăng Ya', googleMapQuery: 'Gia Lai, Việt Nam' },
  
  // TẤT CẢ CÁC TỈNH CHỮ H:
  { id: 'hatinh', name: 'Hà Tĩnh', province: 'Hà Tĩnh', region: 'Miền Trung', tag: 'Biển Thiên Cầm & Ngã ba Đồng Lộc', googleMapQuery: 'Hà Tĩnh, Việt Nam' },
  { id: 'haiduong', name: 'Hải Dương', province: 'Hải Dương', region: 'Miền Bắc', tag: 'Côn Sơn — Kiếp Bạc & Bánh đậu xanh', googleMapQuery: 'Hải Dương, Việt Nam' },
  { id: 'haiphong', name: 'Hải Phòng', province: 'Hải Phòng', region: 'Miền Bắc', tag: 'Thành phố hoa phượng đỏ & Food tour', googleMapQuery: 'Hải Phòng, Việt Nam' },
  { id: 'hanam', name: 'Hà Nam', province: 'Hà Nam', region: 'Miền Bắc', tag: 'Quần thể chùa Tam Chúc', googleMapQuery: 'Hà Nam, Việt Nam' },
  { id: 'haugiang', name: 'Hậu Giang', province: 'Hậu Giang', region: 'Miền Nam', tag: 'Chợ nổi Ngã Bảy & Khóm Cầu Đúc', googleMapQuery: 'Hậu Giang, Việt Nam' },
  { id: 'hoabinh', name: 'Hòa Bình', province: 'Hòa Bình', region: 'Miền Bắc', tag: 'Thung lũng Mai Châu & Hồ Hòa Bình', googleMapQuery: 'Hòa Bình, Việt Nam' },
  { id: 'hungyen', name: 'Hưng Yên', province: 'Hưng Yên', region: 'Miền Bắc', tag: 'Phố Hiến đệ nhị danh thắng', googleMapQuery: 'Hưng Yên, Việt Nam' },

  { id: 'khanhhoa', name: 'Khánh Hòa', province: 'Khánh Hòa', region: 'Miền Trung', tag: 'Nha Trang & Đảo Điệp Sơn', googleMapQuery: 'Khánh Hòa, Việt Nam' },
  { id: 'kiengiang', name: 'Kiên Giang', province: 'Kiên Giang', region: 'Miền Nam', tag: 'Phú Quốc & Quần đảo Nam Du', googleMapQuery: 'Kiên Giang, Việt Nam' },
  { id: 'kontum', name: 'Kon Tum', province: 'Kon Tum', region: 'Tây Nguyên', tag: 'Măng Đen đại ngàn & Nhà thờ gỗ', googleMapQuery: 'Kon Tum, Việt Nam' },
  { id: 'laichau', name: 'Lai Châu', province: 'Lai Châu', region: 'Miền Bắc', tag: 'Đèo Ô Quy Hồ & Cao nguyên Sìn Hồ', googleMapQuery: 'Lai Châu, Việt Nam' },
  { id: 'lamdong', name: 'Lâm Đồng', province: 'Lâm Đồng', region: 'Tây Nguyên', tag: 'Đà Lạt & Đồi chè Bảo Lộc', googleMapQuery: 'Lâm Đồng, Việt Nam' },
  { id: 'langson', name: 'Lạng Sơn', province: 'Lạng Sơn', region: 'Miền Bắc', tag: 'Đỉnh Mẫu Sơn tuyết phủ & Chợ Đông Kinh', googleMapQuery: 'Lạng Sơn, Việt Nam' },
  { id: 'laocai', name: 'Lào Cai', province: 'Lào Cai', region: 'Miền Bắc', tag: 'Sa Pa sương mù & Bắc Hà', googleMapQuery: 'Lào Cai, Việt Nam' },
  { id: 'longan', name: 'Long An', province: 'Long An', region: 'Miền Nam', tag: 'Làng nổi Tân Lập & Cánh đồng bất tận', googleMapQuery: 'Long An, Việt Nam' },
  { id: 'namdinh', name: 'Nam Định', province: 'Nam Định', region: 'Miền Bắc', tag: 'Phủ Dầy & Nhà thờ đổ Hải Lý', googleMapQuery: 'Nam Định, Việt Nam' },
  { id: 'nghean', name: 'Nghệ An', province: 'Nghệ An', region: 'Miền Trung', tag: 'Quê Bác Nam Đàn & Biển Cửa Lò', googleMapQuery: 'Nghệ An, Việt Nam' },
  { id: 'ninhthuan', name: 'Ninh Thuận', province: 'Ninh Thuận', region: 'Miền Trung', tag: 'Vịnh Vĩnh Hy & Vườn nho Ba Mọi', googleMapQuery: 'Ninh Thuận, Việt Nam' },
  { id: 'phutho', name: 'Phú Thọ', province: 'Phú Thọ', region: 'Miền Bắc', tag: 'Đền Hùng cội nguồn dân tộc', googleMapQuery: 'Phú Thọ, Việt Nam' },
  { id: 'quangbinh', name: 'Quảng Bình', province: 'Quảng Bình', region: 'Miền Trung', tag: 'Vương quốc hang động Phong Nha', googleMapQuery: 'Quảng Bình, Việt Nam' },
  { id: 'quangnam', name: 'Quảng Nam', province: 'Quảng Nam', region: 'Miền Trung', tag: 'Phố cổ Hội An & Thánh địa Mỹ Sơn', googleMapQuery: 'Quảng Nam, Việt Nam' },
  { id: 'quangngai', name: 'Quảng Ngãi', province: 'Quảng Ngãi', region: 'Miền Trung', tag: 'Đảo Lý Sơn — Vương quốc tỏi', googleMapQuery: 'Quảng Ngãi, Việt Nam' },
  { id: 'quangninh', name: 'Quảng Ninh', province: 'Quảng Ninh', region: 'Miền Bắc', tag: 'Vịnh Hạ Long, Yên Tử & Cô Tô', googleMapQuery: 'Quảng Ninh, Việt Nam' },
  { id: 'quangtri', name: 'Quảng Trị', province: 'Quảng Trị', region: 'Miền Trung', tag: 'Địa đạo Vịnh Mốc & Cầu Hiền Lương', googleMapQuery: 'Quảng Trị, Việt Nam' },
  { id: 'soctrang', name: 'Sóc Trăng', province: 'Sóc Trăng', region: 'Miền Nam', tag: 'Chùa Dơi & Lễ hội Oóc Om Bóc', googleMapQuery: 'Sóc Trăng, Việt Nam' },
  { id: 'sonla', name: 'Sơn La', province: 'Sơn La', region: 'Miền Bắc', tag: 'Thảo nguyên Mộc Châu & Tà Xùa săn mây', googleMapQuery: 'Sơn La, Việt Nam' },
  { id: 'tayninh', name: 'Tây Ninh', province: 'Tây Ninh', region: 'Miền Nam', tag: 'Núi Bà Đen nóc nhà Nam Bộ', googleMapQuery: 'Tây Ninh, Việt Nam' },
  { id: 'thaibinh', name: 'Thái Bình', province: 'Thái Bình', region: 'Miền Bắc', tag: 'Chùa Keo cổ kính & Biển Đồng Châu', googleMapQuery: 'Thái Bình, Việt Nam' },
  { id: 'thainguyen', name: 'Thái Nguyên', province: 'Thái Nguyên', region: 'Miền Bắc', tag: 'Đệ nhất danh trà Tân Cương & Hồ Núi Cốc', googleMapQuery: 'Thái Nguyên, Việt Nam' },
  { id: 'thanhhoa', name: 'Thanh Hóa', province: 'Thanh Hóa', region: 'Miền Trung', tag: 'Biển Sầm Sơn, Hải Tiến & Pù Luông', googleMapQuery: 'Thanh Hóa, Việt Nam' },
  { id: 'tiengiang', name: 'Tiền Giang', province: 'Tiền Giang', region: 'Miền Nam', tag: 'Chợ nổi Cái Bè & Cù lao Thới Sơn', googleMapQuery: 'Tiền Giang, Việt Nam' },
  { id: 'travinh', name: 'Trà Vinh', province: 'Trà Vinh', region: 'Miền Nam', tag: 'Chùa Hang & Biển Ba Động', googleMapQuery: 'Trà Vinh, Việt Nam' },
  { id: 'tuyenquang', name: 'Tuyên Quang', province: 'Tuyên Quang', region: 'Miền Bắc', tag: 'Khu di tích Tân Trào & Hồ Na Hang', googleMapQuery: 'Tuyên Quang, Việt Nam' },
  { id: 'vinhlong', name: 'Vĩnh Long', province: 'Vĩnh Long', region: 'Miền Nam', tag: 'Cù lao An Bình & Vườn cây ăn trái', googleMapQuery: 'Vĩnh Long, Việt Nam' },
  { id: 'vinhphuc', name: 'Vĩnh Phúc', province: 'Vĩnh Phúc', region: 'Miền Bắc', tag: 'Tam Đảo bồng bềnh mây & Tây Thiên', googleMapQuery: 'Vĩnh Phúc, Việt Nam' },
  { id: 'yenbai', name: 'Yên Bái', province: 'Yên Bái', region: 'Miền Bắc', tag: 'Mù Cang Chải ruộng bậc thang di sản', googleMapQuery: 'Yên Bái, Việt Nam' }
];

// Hàm bỏ dấu tiếng Việt để tìm kiếm thông minh
export function removeVietnameseTones(str: string): string {
  let result = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  result = result.replace(/[đĐ]/g, 'd');
  return result.toLowerCase().trim();
}

// Tìm kiếm điểm đến thông minh theo từ khóa
export function searchDestinations(query: string): DestinationItem[] {
  if (!query || !query.trim()) {
    // Trả về top các điểm đến nổi tiếng nhất khi chưa gõ
    return VIETNAM_DESTINATIONS.slice(0, 10);
  }

  const cleanQuery = removeVietnameseTones(query);
  const rawQuery = query.trim().toLowerCase();

  // 1. Nhóm khớp từ đầu tiên (ví dụ "h" -> Hà Nội, Hà Giang, Hải Phòng...)
  const startsWithRaw: DestinationItem[] = [];
  const startsWithClean: DestinationItem[] = [];
  const containsRaw: DestinationItem[] = [];
  const containsClean: DestinationItem[] = [];

  for (const item of VIETNAM_DESTINATIONS) {
    const rawName = item.name.toLowerCase();
    const cleanName = removeVietnameseTones(item.name);
    const rawProvince = item.province.toLowerCase();
    const cleanProvince = removeVietnameseTones(item.province);

    if (rawName.startsWith(rawQuery) || rawProvince.startsWith(rawQuery)) {
      startsWithRaw.push(item);
    } else if (cleanName.startsWith(cleanQuery) || cleanProvince.startsWith(cleanQuery)) {
      startsWithClean.push(item);
    } else if (rawName.includes(rawQuery) || rawProvince.includes(rawQuery)) {
      containsRaw.push(item);
    } else if (cleanName.includes(cleanQuery) || cleanProvince.includes(cleanQuery) || removeVietnameseTones(item.tag).includes(cleanQuery)) {
      containsClean.push(item);
    }
  }

  // Gộp theo thứ tự ưu tiên chính xác nhất
  const combined = [
    ...startsWithRaw,
    ...startsWithClean,
    ...containsRaw,
    ...containsClean
  ];

  // Loại bỏ trùng lặp id
  const seen = new Set<string>();
  const uniqueResults: DestinationItem[] = [];
  for (const item of combined) {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      uniqueResults.push(item);
    }
  }

  return uniqueResults.slice(0, 15);
}

export const POPULAR_DESTINATIONS: DestinationItem[] = VIETNAM_DESTINATIONS.slice(0, 10);
