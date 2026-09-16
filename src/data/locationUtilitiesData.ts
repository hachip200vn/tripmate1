export interface LocationWeather {
  destinationName: string;
  badge: string;
  badgeColor: string;
  temperature: string;
  tempSubtext: string;
  uvIndex: string;
  uvLevel: string;
  uvAction: string;
  sunsetTime: string;
  sunsetSpot: string;
  humidity: string;
  windSpeed: string;
}

export interface AmbientSoundTrack {
  id: string;
  emoji: string;
  title: string;
  description: string;
  soundType: 'waves' | 'rain' | 'night' | 'wind' | 'fire' | 'stream';
}

export interface EmergencyContact {
  title: string;
  phone: string;
  displayPhone: string;
  type: 'police' | 'medical' | 'tourism' | 'rescue';
  note?: string;
}

export interface LocationUtilityConfig {
  id: string;
  name: string;
  keywords: string[];
  weather: LocationWeather;
  ambientSounds: AmbientSoundTrack[];
  hotlines: EmergencyContact[];
}

export const LOCATION_UTILITIES_DATABASE: LocationUtilityConfig[] = [
  // 1. ĐÀ NẴNG — HỘI AN
  {
    id: 'danang',
    name: 'Đà Nẵng — Hội An',
    keywords: ['đà nẵng', 'da nang', 'hội an', 'hoi an', 'bà nà', 'mỹ khê', 'quảng nam'],
    weather: {
      destinationName: 'Đà Nẵng — Hội An',
      badge: 'Lý tưởng du lịch biển',
      badgeColor: 'emerald',
      temperature: '29°C',
      tempSubtext: 'Gió biển mát rượi',
      uvIndex: '6.2 (Vừa)',
      uvLevel: 'Trung bình',
      uvAction: 'Thoa kem chống nắng',
      sunsetTime: '17:58',
      sunsetSpot: 'Hoàng hôn bãi biển Mỹ Khê',
      humidity: '76%',
      windSpeed: '12 km/h'
    },
    ambientSounds: [
      { id: 'waves', emoji: '🌊', title: 'Sóng Biển Mỹ Khê', description: 'Tiếng sóng vỗ bờ cát trắng mịn', soundType: 'waves' },
      { id: 'rain', emoji: '🌧️', title: 'Mưa Rừng Bà Nà', description: 'Mưa rơi êm đềm trên đỉnh núi Chúa', soundType: 'rain' },
      { id: 'night', emoji: '🏮', title: 'Đêm Phố Hội An', description: 'Chuông gió sông Hoài & thuyền hoa đăng', soundType: 'night' }
    ],
    hotlines: [
      { title: 'Trung tâm Hỗ trợ Du khách Đà Nẵng', phone: '02363550111', displayPhone: '0236.3550.111', type: 'tourism', note: 'Hỗ trợ 24/7 chỉ dẫn & an ninh du lịch' },
      { title: 'Cứu hộ bãi biển & Cấp cứu Đà Nẵng', phone: '115', displayPhone: '115 / 0236.3920.000', type: 'rescue', note: 'Đội cứu nạn bờ biển Sơn Trà - Mỹ Khê' },
      { title: 'Công an TP. Đà Nẵng (Phản ứng nhanh)', phone: '113', displayPhone: '113 / 0236.3822.222', type: 'police' }
    ]
  },

  // 2. ĐÀ LẠT
  {
    id: 'dalat',
    name: 'Đà Lạt',
    keywords: ['đà lạt', 'da lat', 'lâm đồng', 'lam dong', 'bảo lộc', 'cầu đất'],
    weather: {
      destinationName: 'Đà Lạt (Lâm Đồng)',
      badge: 'Se lạnh sương mù',
      badgeColor: 'sky',
      temperature: '19°C',
      tempSubtext: 'Sáng se lạnh, trưa nắng nhẹ',
      uvIndex: '4.5 (Thấp - Vừa)',
      uvLevel: 'Dịu nhẹ',
      uvAction: 'Mặc áo ấm mỏng',
      sunsetTime: '17:36',
      sunsetSpot: 'Hoàng hôn đồi thông & Dốc Robin',
      humidity: '84%',
      windSpeed: '8 km/h'
    },
    ambientSounds: [
      { id: 'wind', emoji: '🌲', title: 'Rặng Thông Reo', description: 'Gió cao nguyên rì rào qua đồi thông', soundType: 'wind' },
      { id: 'rain', emoji: '🌧️', title: 'Mưa Đồi Túi Mơ To', description: 'Tiếng mưa rơi tí tách trên mái hiên cafe', soundType: 'rain' },
      { id: 'fire', emoji: '🔥', title: 'Lửa Trại Phố Núi', description: 'Bếp than hồng sưởi ấm đêm sương mù', soundType: 'fire' }
    ],
    hotlines: [
      { title: 'Đường dây nóng Du lịch Đà Lạt', phone: '02633822128', displayPhone: '0263.3822.128', type: 'tourism', note: 'Hỗ trợ du khách & kiểm tra giá dịch vụ' },
      { title: 'Cứu nạn cứu hộ Lâm Đồng (Đèo dốc & Rừng)', phone: '114', displayPhone: '114 / 0263.3822.115', type: 'rescue', note: 'Đội cứu hộ đèo Prenn, Mimosa, Tuyền Lâm' },
      { title: 'Công an TP. Đà Lạt', phone: '02633822016', displayPhone: '0263.3822.016', type: 'police' }
    ]
  },

  // 3. PHÚ QUỐC
  {
    id: 'phuquoc',
    name: 'Phú Quốc',
    keywords: ['phú quốc', 'phu quoc', 'kiên giang', 'kien giang', 'nam du', 'hòn thơm', 'an thới'],
    weather: {
      destinationName: 'Đảo Ngọc Phú Quốc',
      badge: 'Nắng ấm & Biển êm',
      badgeColor: 'amber',
      temperature: '31°C',
      tempSubtext: 'Nắng vàng, sóng êm',
      uvIndex: '8.4 (Rất cao)',
      uvLevel: 'Cảnh báo UV cao',
      uvAction: 'Kính râm & Mũ rộng vành',
      sunsetTime: '18:12',
      sunsetSpot: 'Hoàng hôn huyền thoại Sunset Sanato',
      humidity: '72%',
      windSpeed: '14 km/h'
    },
    ambientSounds: [
      { id: 'waves', emoji: '🏝️', title: 'Sóng Biển Bãi Sao', description: 'Sóng vỗ êm đềm vùng vịnh Nam Đảo', soundType: 'waves' },
      { id: 'wind', emoji: '🌅', title: 'Gió Chiều Cầu Hôn', description: 'Làn gió hoàng hôn thị trấn Hoàng Hôn', soundType: 'wind' },
      { id: 'stream', emoji: '🌿', title: 'Suối Tranh Róc Rách', description: 'Nước suối nguồn rừng nguyên sinh Phú Quốc', soundType: 'stream' }
    ],
    hotlines: [
      { title: 'Đường dây nóng Du lịch Phú Quốc', phone: '02973846039', displayPhone: '0297.3846.039', type: 'tourism', note: 'Hỗ trợ du khách tham quan đảo & tour' },
      { title: 'Cứu hộ cứu nạn biển Đảo Phú Quốc', phone: '02973996115', displayPhone: '0297.3996.115', type: 'rescue', note: 'Cứu hộ cano, lặn ngắm san hô & tàu bè' },
      { title: 'Công an TP. Phú Quốc', phone: '02973846051', displayPhone: '0297.3846.051', type: 'police' }
    ]
  },

  // 4. HÀ GIANG
  {
    id: 'hagiang',
    name: 'Hà Giang',
    keywords: ['hà giang', 'ha giang', 'đồng văn', 'mèo vạc', 'mã pí lèng', 'nho quế'],
    weather: {
      destinationName: 'Hà Giang (Cao Nguyên Đá)',
      badge: 'Trời trong & Gió mát',
      badgeColor: 'teal',
      temperature: '22°C',
      tempSubtext: 'Không khí trong lành vùng cao',
      uvIndex: '5.2 (Vừa)',
      uvLevel: 'Trung bình',
      uvAction: 'Áo gió & Mũ che nắng',
      sunsetTime: '17:42',
      sunsetSpot: 'Đỉnh đèo Mã Pí Lèng nhìn xuống Nho Quế',
      humidity: '70%',
      windSpeed: '10 km/h'
    },
    ambientSounds: [
      { id: 'wind', emoji: '🏔️', title: 'Gió Đèo Mã Pí Lèng', description: 'Gió đại ngàn hùng vĩ rít qua vách đá', soundType: 'wind' },
      { id: 'stream', emoji: '🛶', title: 'Dòng Sông Nho Quế', description: 'Tiếng nước biếc len lỏi qua hẻm vực Tu Sản', soundType: 'stream' },
      { id: 'fire', emoji: '🪵', title: 'Bếp Lửa Homestay Bản', description: 'Tiếng củi tí tách ấm lòng đêm cao nguyên', soundType: 'fire' }
    ],
    hotlines: [
      { title: 'Đường dây nóng Du lịch Hà Giang', phone: '02193868899', displayPhone: '0219.3868.899', type: 'tourism', note: 'Chỉ dẫn lộ trình phượt, chỗ ở & homestay' },
      { title: 'Cứu hộ giao thông Đèo dốc Hà Giang', phone: '0913271388', displayPhone: '0913.271.388', type: 'rescue', note: 'Hỗ trợ xe máy, ô tô gặp sự cố đường đèo' },
      { title: 'Bệnh viện Đa khoa tỉnh Hà Giang', phone: '02193866425', displayPhone: '0219.3866.425', type: 'medical' }
    ]
  },

  // 5. HÀ NỘI
  {
    id: 'hanoi',
    name: 'Hà Nội',
    keywords: ['hà nội', 'ha noi', 'thủ đô', 'hồ tây', 'hồ gươm', 'hoan kiem'],
    weather: {
      destinationName: 'Thủ Đô Hà Nội',
      badge: 'Thu dịu mát & Trời quang',
      badgeColor: 'emerald',
      temperature: '26°C',
      tempSubtext: 'Nắng nhẹ, gió thu dịu mát',
      uvIndex: '5.6 (Trung bình)',
      uvLevel: 'Vừa phải',
      uvAction: 'Mũ vải & Kính nhẹ',
      sunsetTime: '18:02',
      sunsetSpot: 'Hoàng hôn Hồ Tây lộng gió',
      humidity: '68%',
      windSpeed: '11 km/h'
    },
    ambientSounds: [
      { id: 'wind', emoji: '🍂', title: 'Gió Heo May Hồ Tây', description: 'Làn gió thu thoảng hương hoa sữa', soundType: 'wind' },
      { id: 'rain', emoji: '🌧️', title: 'Mưa Đêm Phố Cổ', description: 'Mưa rơi trên mái ngói 36 phố phường', soundType: 'rain' },
      { id: 'night', emoji: '🔔', title: 'Chuông Chùa Trấn Quốc', description: 'Tiếng chuông sớm vang vọng mặt nước phẳng lặng', soundType: 'night' }
    ],
    hotlines: [
      { title: 'Tổng đài Du lịch Hà Nội (Sở Du lịch)', phone: '1800556896', displayPhone: '1800.556.896 (Miễn cước)', type: 'tourism', note: 'Giải đáp & tiếp nhận phản ánh du khách 24/7' },
      { title: 'Cảnh sát phản ứng nhanh Hà Nội', phone: '113', displayPhone: '113 / 0243.8242.424', type: 'police' },
      { title: 'Cấp cứu Y tế Hà Nội (115)', phone: '115', displayPhone: '115', type: 'medical' }
    ]
  },

  // 6. SA PA
  {
    id: 'sapa',
    name: 'Sa Pa',
    keywords: ['sapa', 'sa pa', 'lào cai', 'lao cai', 'fansipan', 'ô quy hồ', 'mường hoa'],
    weather: {
      destinationName: 'Sa Pa (Lào Cai)',
      badge: 'Mát lạnh quanh năm',
      badgeColor: 'sky',
      temperature: '16°C',
      tempSubtext: 'Sương sớm bồng bềnh thị trấn',
      uvIndex: '4.8 (Vừa)',
      uvLevel: 'Trung bình',
      uvAction: 'Áo khoác giữ ấm',
      sunsetTime: '17:34',
      sunsetSpot: 'Hoàng hôn biển mây đèo Ô Quy Hồ',
      humidity: '88%',
      windSpeed: '9 km/h'
    },
    ambientSounds: [
      { id: 'wind', emoji: '🏔️', title: 'Gió Đỉnh Fansipan', description: 'Gió trên nóc nhà Đông Dương ngút ngàn', soundType: 'wind' },
      { id: 'rain', emoji: '🌧️', title: 'Mưa Rào Thung Lũng', description: 'Tiếng mưa rơi trên ruộng bậc thang Mường Hoa', soundType: 'rain' },
      { id: 'night', emoji: '🎼', title: 'Tiếng Khèn Bản Cát Cát', description: 'Âm thanh bản làng mộc mạc vùng cao', soundType: 'night' }
    ],
    hotlines: [
      { title: 'Trung tâm Thông tin Du lịch Sa Pa', phone: '02143871975', displayPhone: '0214.3871.975', type: 'tourism', note: 'Hỗ trợ bản đồ, thời tiết cáp treo & trekking' },
      { title: 'Đội Cứu nạn Vườn quốc gia Hoàng Liên', phone: '02143871265', displayPhone: '0214.3871.265', type: 'rescue', note: 'Cứu nạn người đi lạc, leo núi mạo hiểm' },
      { title: 'Công an Thị xã Sa Pa', phone: '02143871224', displayPhone: '0214.3871.224', type: 'police' }
    ]
  },

  // 7. NHA TRANG
  {
    id: 'nhatrang',
    name: 'Nha Trang',
    keywords: ['nha trang', 'khánh hòa', 'khanh hoa', 'vịnh nha trang', 'hòn tằm', 'cam ranh'],
    weather: {
      destinationName: 'Nha Trang (Khánh Hòa)',
      badge: 'Nắng rực rỡ & Biển xanh',
      badgeColor: 'amber',
      temperature: '30°C',
      tempSubtext: 'Nắng đẹp tuyệt hảo cho lặn biển',
      uvIndex: '7.8 (Cao)',
      uvLevel: 'Cao',
      uvAction: 'Thoa kem chống nắng SPF 50+',
      sunsetTime: '17:55',
      sunsetSpot: 'Đường Trần Phú nhìn ra vịnh Nha Trang',
      humidity: '75%',
      windSpeed: '13 km/h'
    },
    ambientSounds: [
      { id: 'waves', emoji: '🌊', title: 'Sóng Biển Hòn Chồng', description: 'Tiếng sóng vỗ mạn đá nhấp nhô', soundType: 'waves' },
      { id: 'wind', emoji: '🌴', title: 'Dừa Nghiêng Đường Biển', description: 'Gió thổi qua hàng dừa xanh Trần Phú', soundType: 'wind' },
      { id: 'night', emoji: '⛵', title: 'Thuyền Cá Đêm Vịnh', description: 'Tiếng động cơ ghe chài bình yên xa xa', soundType: 'night' }
    ],
    hotlines: [
      { title: 'Trung tâm Hỗ trợ Du khách Khánh Hòa', phone: '0947528000', displayPhone: '*2258 / 0947.528.000', type: 'tourism', note: 'Đường dây nóng du lịch Nha Trang' },
      { title: 'Đội Cứu hộ bờ biển Nha Trang', phone: '02583524086', displayPhone: '0258.3524.086', type: 'rescue', note: 'Túc trực dọc bãi tắm đường Trần Phú' },
      { title: 'Công an TP. Nha Trang', phone: '02583822113', displayPhone: '0258.3822.113', type: 'police' }
    ]
  },

  // 8. HUẾ
  {
    id: 'hue',
    name: 'Huế',
    keywords: ['huế', 'hue', 'thừa thiên huế', 'sông hương', 'đại nội'],
    weather: {
      destinationName: 'Cố Đô Huế',
      badge: 'Trời trầm lắng & Thoáng đãng',
      badgeColor: 'teal',
      temperature: '27°C',
      tempSubtext: 'Gió nhẹ thổi ven bờ Sông Hương',
      uvIndex: '5.9 (Trung bình)',
      uvLevel: 'Vừa phải',
      uvAction: 'Nón lá truyền thống hoặc ô che',
      sunsetTime: '17:52',
      sunsetSpot: 'Hoàng hôn cầu Tràng Tiền & Sông Hương',
      humidity: '80%',
      windSpeed: '10 km/h'
    },
    ambientSounds: [
      { id: 'stream', emoji: '🚣', title: 'Mái Chèo Sông Hương', description: 'Nhịp chèo khoan thai trong đêm ca Huế', soundType: 'stream' },
      { id: 'rain', emoji: '🌧️', title: 'Mưa Ngự Cố Đô', description: 'Cơn mưa rào trầm mặc qua ngói hoàng thành', soundType: 'rain' },
      { id: 'night', emoji: '🔔', title: 'Chuông Chùa Thiên Mụ', description: 'Tiếng chuông ngân vang chiều tà thanh tịnh', soundType: 'night' }
    ],
    hotlines: [
      { title: 'Trung tâm Xúc tiến Du lịch Thừa Thiên Huế', phone: '02343828888', displayPhone: '0234.3828.888', type: 'tourism', note: 'Hỗ trợ thông tin di tích & vé tham quan' },
      { title: 'Công an TP. Huế', phone: '02343822266', displayPhone: '0234.3822.266', type: 'police' },
      { title: 'Cấp cứu 115 Bệnh viện TW Huế', phone: '115', displayPhone: '115', type: 'medical' }
    ]
  },

  // 9. TP. HỒ CHÍ MINH
  {
    id: 'hcm',
    name: 'TP. Hồ Chí Minh',
    keywords: ['hồ chí minh', 'sài gòn', 'saigon', 'hcm', 'tp.hcm', 'tphcm'],
    weather: {
      destinationName: 'TP. Hồ Chí Minh',
      badge: 'Nắng ấm năng động',
      badgeColor: 'amber',
      temperature: '32°C',
      tempSubtext: 'Nắng nhiệt đới, thỉnh thoảng có mưa rào nhẹ',
      uvIndex: '8.1 (Cao)',
      uvLevel: 'Cao',
      uvAction: 'Mang kính mát & Bình nước cá nhân',
      sunsetTime: '17:59',
      sunsetSpot: 'Hoàng hôn bến Bạch Đằng ngắm sông Sài Gòn',
      humidity: '74%',
      windSpeed: '12 km/h'
    },
    ambientSounds: [
      { id: 'night', emoji: '☕', title: 'Cà Phê Bệt Nhà Thờ Đức Bà', description: 'Âm vang rôm rả một sáng Sài Gòn bình yên', soundType: 'night' },
      { id: 'rain', emoji: '🌧️', title: 'Cơn Mưa Rào Bất Chợt', description: 'Tiếng mưa rào xua tan cái nóng phố thị', soundType: 'rain' },
      { id: 'stream', emoji: '🚢', title: 'Gió Bến Bạch Đằng', description: 'Sóng vỗ nhẹ mạn tàu buýt đường sông', soundType: 'stream' }
    ],
    hotlines: [
      { title: 'Tổng đài Thông tin & Hỗ trợ Du khách TP.HCM', phone: '1022', displayPhone: '1022 nhánh 8 / 028.3925.1077', type: 'tourism', note: 'Hỗ trợ giải đáp du lịch & an ninh trật tự' },
      { title: 'Cảnh sát phản ứng nhanh 113', phone: '113', displayPhone: '113', type: 'police' },
      { title: 'Cấp cứu Y tế 115', phone: '115', displayPhone: '115', type: 'medical' }
    ]
  }
];

// Hàm tìm cấu hình tiện ích cho một điểm đến bất kỳ
export function getLocationUtility(destinationQuery?: string): LocationUtilityConfig {
  if (!destinationQuery || !destinationQuery.trim()) {
    return LOCATION_UTILITIES_DATABASE[0]; // Mặc định Đà Nẵng
  }

  const clean = destinationQuery.toLowerCase().trim();

  // Tìm trong cơ sở dữ liệu đã chuẩn hóa
  for (const item of LOCATION_UTILITIES_DATABASE) {
    if (item.keywords.some((k) => clean.includes(k))) {
      return item;
    }
  }

  // Nếu là điểm đến khác (ví dụ thuộc các tỉnh thành khác của Việt Nam):
  // Tạo động cấu hình tiện ích thông minh cho điểm đến đó!
  const isCoast = ['biển', 'đảo', 'bãi', 'vũng', 'nha', 'quy', 'bình thuận', 'quảng ninh', 'hải phòng', 'thanh hóa', 'quảng bình', 'bình định', 'phú yên', 'vịnh'].some((k) => clean.includes(k));
  const isMountain = ['núi', 'đèo', 'hà giang', 'lai châu', 'điện biên', 'yên bái', 'cao bằng', 'lạng sơn', 'sơn la', 'mộc châu', 'tây nguyên', 'kon tum', 'gia lai', 'đắk'].some((k) => clean.includes(k));

  return {
    id: 'custom',
    name: destinationQuery,
    keywords: [clean],
    weather: {
      destinationName: destinationQuery,
      badge: isMountain ? 'Mát mẻ vùng cao' : isCoast ? 'Gió biển trong lành' : 'Thời tiết dễ chịu',
      badgeColor: isMountain ? 'sky' : isCoast ? 'amber' : 'emerald',
      temperature: isMountain ? '21°C' : isCoast ? '30°C' : '28°C',
      tempSubtext: isMountain ? 'Độ ẩm 78%, trời se se' : isCoast ? 'Gió đại dương lồng lộng' : 'Trời quang, nắng chan hòa',
      uvIndex: isMountain ? '5.1 (Vừa)' : isCoast ? '7.5 (Cao)' : '6.0 (Trung bình)',
      uvLevel: isMountain ? 'Vừa phải' : isCoast ? 'Khá cao' : 'Bình thường',
      uvAction: isMountain ? 'Mặc thêm áo khoác mỏng' : isCoast ? 'Thoa kem chống nắng kỹ' : 'Trang phục thoải mái',
      sunsetTime: '17:50',
      sunsetSpot: `Điểm ngắm hoàng hôn đẹp tại ${destinationQuery}`,
      humidity: '75%',
      windSpeed: '11 km/h'
    },
    ambientSounds: isMountain
      ? [
          { id: 'wind', emoji: '🌲', title: 'Gió Đại Ngàn Rừng Núi', description: 'Gió cao nguyên thổi qua ngọn cây', soundType: 'wind' },
          { id: 'stream', emoji: '💧', title: 'Suối Nguồn Khe Đá', description: 'Tiếng nước chảy róc rách thanh tịnh', soundType: 'stream' },
          { id: 'fire', emoji: '🔥', title: 'Lửa Trại Đêm Vùng Cao', description: 'Tiếng than hồng sưởi ấm bên lều trại', soundType: 'fire' }
        ]
      : isCoast
      ? [
          { id: 'waves', emoji: '🌊', title: 'Sóng Vỗ Bờ Cát Vàng', description: 'Gió biển và sóng dạt dào êm tai', soundType: 'waves' },
          { id: 'wind', emoji: '🌴', title: 'Làn Gió Đại Dương', description: 'Gió biển mang hơi thở mát lành', soundType: 'wind' },
          { id: 'night', emoji: '✨', title: 'Đêm Biển Sao Trời', description: 'Không gian tĩnh lặng ngắm sao trên biển', soundType: 'night' }
        ]
      : [
          { id: 'night', emoji: '🍃', title: 'Gió Mát Chiều Tà', description: 'Tiếng lá cây xào xạc trong công viên', soundType: 'night' },
          { id: 'rain', emoji: '🌧️', title: 'Mưa Rào Thanh Bình', description: 'Cơn mưa nhẹ làm dịu không khí chuyến đi', soundType: 'rain' },
          { id: 'stream', emoji: '☕', title: 'Quán Nhỏ Phố Xưa', description: 'Tiếng nhạc acoustic du dương thư thái', soundType: 'stream' }
        ],
    hotlines: [
      { title: `Đường dây nóng Du lịch & An ninh ${destinationQuery}`, phone: '1800556896', displayPhone: '1800.556.896', type: 'tourism', note: 'Tổng đài du lịch quốc gia & tiếp nhận phản ánh' },
      { title: `Cảnh sát phản ứng nhanh (${destinationQuery})`, phone: '113', displayPhone: '113', type: 'police' },
      { title: 'Cấp cứu Y tế & Bệnh viện', phone: '115', displayPhone: '115', type: 'medical' }
    ]
  };
}
