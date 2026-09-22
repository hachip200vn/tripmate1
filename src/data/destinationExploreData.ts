import { VIETNAM_DESTINATIONS, removeVietnameseTones } from './vietnamDestinations';

export interface ExploreSpotItem {
  id: string;
  name: string;
  category: string;
  tag: string;
  rating: number;
  reviewsCount: number;
  address: string;
  image: string;
  tip: string;
  priceText: string;
  bestTime?: string;
}

export interface ExploreArticle {
  id: string;
  title: string;
  readTime: string;
  category: string;
  image: string;
  excerpt: string;
  author: string;
  date: string;
  destination?: string;
  content?: string[];
  likesCount?: number;
  commentsCount?: number;
}

export interface DestinationExploreResult {
  destinationName: string;
  province: string;
  region: string;
  subtitle: string;
  spots: ExploreSpotItem[];
  articles: ExploreArticle[];
}

// 1. HÀ NỘI
const HANOI_DATA: DestinationExploreResult = {
  destinationName: 'Hà Nội',
  province: 'Hà Nội',
  region: 'Miền Bắc',
  subtitle: 'Thủ đô nghìn năm văn hiến, 36 phố phường rêu phong và ẩm thực di sản độc đáo',
  articles: [
    {
      id: 'art-hn-1',
      title: 'Cẩm nang 36 Phố Phường: 10 góc check-in hoài niệm & ngõ nhỏ thủ đô',
      readTime: '5 phút đọc',
      category: 'Cẩm nang di sản',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
      excerpt: 'Khám phá những ngõ nhỏ đầy chất thơ, ban công thời Pháp cổ kính và nhịp sống dung dị của người Tràng An.',
      author: 'Minh Trang',
      date: 'Hôm nay'
    },
    {
      id: 'art-hn-2',
      title: 'Bản đồ ẩm thực Hà Nội: Top quán Phở gia truyền & Cà phê trứng nức tiếng',
      readTime: '4 phút đọc',
      category: 'Food Tour',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
      excerpt: 'Thưởng thức bát Phở Thìn xào lăn đậm đà, bún chả nướng than hoa ngào ngạt và ly cà phê trứng béo ngậy.',
      author: 'Tuấn Nam',
      date: 'Mới cập nhật'
    },
    {
      id: 'art-hn-3',
      title: 'Hà Nội về đêm: Trải nghiệm trà đá Nhà Thờ Lớn & phố bia Tạ Hiện sôi động',
      readTime: '3 phút đọc',
      category: 'Trải nghiệm đêm',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80',
      excerpt: 'Hòa mình vào không khí trẻ trung, nhâm nhi hạt hướng dương trà chanh ngắm dòng người tấp nập phố cổ.',
      author: 'Lan Anh',
      date: 'Nổi bật'
    }
  ],
  spots: [
    {
      id: 'hn-spot-1',
      name: 'Hồ Hoàn Kiếm & Đền Ngọc Sơn',
      category: 'Biểu tượng & Check-in',
      tag: 'Trái tim của Thủ đô',
      rating: 4.9,
      reviewsCount: 6840,
      address: 'Đinh Tiên Hoàng, Hàng Trống, Hoàn Kiếm',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
      tip: 'Đi dạo quanh hồ vào sáng sớm lúc 6:00 ngắm sương sớm hoặc tối cuối tuần khi phố đi bộ mở cửa nhộn nhịp.',
      priceText: 'Vé Đền Ngọc Sơn 30.000đ'
    },
    {
      id: 'hn-spot-2',
      name: 'Cà phê Giảng — Cà phê trứng di sản từ 1946',
      category: 'Ẩm thực & Mua sắm',
      tag: 'Đặc sản ẩm thực độc bản',
      rating: 4.8,
      reviewsCount: 4210,
      address: '39 Nguyễn Hữu Huân, Lý Thái Tổ, Hoàn Kiếm',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
      tip: 'Nên gọi cà phê trứng nóng đặt trong bát nước ấm để giữ lớp kem béo ngậy không tanh và dậy mùi thơm.',
      priceText: '~35.000đ - 50.000đ'
    },
    {
      id: 'hn-spot-3',
      name: 'Văn Miếu — Quốc Tử Giám',
      category: 'Di sản & Văn hóa',
      tag: 'Trường đại học đầu tiên Việt Nam',
      rating: 4.8,
      reviewsCount: 5120,
      address: '58 Quốc Tử Giám, Văn Miếu, Đống Đa',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80',
      tip: 'Chiêm ngưỡng 82 bia tiến sĩ bằng đá nghìn năm tuổi và Khuê Văn Các uy nghiêm trên nền trời xanh.',
      priceText: '30.000đ vé vào'
    },
    {
      id: 'hn-spot-4',
      name: 'Phố Bia Tạ Hiện & Chợ đêm Phố Cổ',
      category: 'Ẩm thực & Mua sắm',
      tag: 'Tụ điểm giải trí xuyên đêm',
      rating: 4.7,
      reviewsCount: 3950,
      address: 'Tạ Hiện & Lương Ngọc Quyến, Hoàn Kiếm',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
      tip: 'Thưởng thức nem chua rán, chim quay mắc mật và bia tươi mát lạnh cùng khách du lịch quốc tế.',
      priceText: '~50.000đ - 150.000đ'
    },
    {
      id: 'hn-spot-5',
      name: 'Hoàng Thành Thăng Long di sản UNESCO',
      category: 'Di sản & Văn hóa',
      tag: 'Di sản thế giới UNESCO',
      rating: 4.7,
      reviewsCount: 2890,
      address: '19C Hoàng Diệu, Điện Biên, Ba Đình',
      image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=600&auto=format&fit=crop&q=80',
      tip: 'Ghé thăm Đoan Môn, Hậu Lâu và bậc rồng thời Lê Sơ. Rất đẹp khi mặc áo dài truyền thống chụp ảnh kỷ niệm.',
      priceText: '30.000đ vé người lớn'
    },
    {
      id: 'hn-spot-6',
      name: 'Hồ Tây & Chùa Trấn Quốc cổ kính',
      category: 'Thiên nhiên & Trải nghiệm',
      tag: 'Ngắm hoàng hôn đẹp nhất thủ đô',
      rating: 4.8,
      reviewsCount: 4670,
      address: 'Đường Thanh Niên, Yên Phụ, Tây Hồ',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
      tip: 'Đến lúc 17:00 chiều để ngắm trọn vẹn mặt trời đỏ rực lặn xuống mặt nước Hồ Tây mênh mông.',
      priceText: 'Miễn phí vãn cảnh'
    }
  ]
};

// 2. ĐÀ NẴNG — HỘI AN
const DANANG_DATA: DestinationExploreResult = {
  destinationName: 'Đà Nẵng — Hội An',
  province: 'Đà Nẵng',
  region: 'Miền Trung',
  subtitle: 'Thành phố đáng sống với biển xanh Mỹ Khê, cầu Rồng phun lửa và phố cổ ngập tràn đèn lồng',
  articles: [
    {
      id: 'art-dn-1',
      title: 'Trọn bộ bí kíp săn hoàng hôn biển Mỹ Khê & lướt ván chèo SUP cực chill',
      readTime: '4 phút đọc',
      category: 'Biển & Hoạt động',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
      excerpt: 'Hướng dẫn thuê ván SUP bãi tắm số 2, mẹo chụp ảnh hoàng hôn ngược sáng và lưu ý an toàn sóng biển.',
      author: 'Hoàng Nam',
      date: 'Hôm nay'
    },
    {
      id: 'art-dn-2',
      title: 'Hội An về đêm: Thả hoa đăng sông Hoài & thưởng thức cao lầu trứ danh',
      readTime: '5 phút đọc',
      category: 'Di sản & Đêm',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80',
      excerpt: 'Trải nghiệm ngồi thuyền gỗ ngắm hàng ngàn ánh đèn hoa đăng bồng bềnh cùng ly chè bắp thơm ngọt.',
      author: 'Thanh Thảo',
      date: 'Gợi ý hot'
    },
    {
      id: 'art-dn-3',
      title: 'Kinh nghiệm đi Bà Nà Hills: Khung giờ vắng khách nhất ở Cầu Vàng',
      readTime: '6 phút đọc',
      category: 'Check-in biểu tượng',
      image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&auto=format&fit=crop&q=80',
      excerpt: 'Lên cáp treo sớm chuyến 7:30 sáng để chụp ảnh Cầu Vàng nguyên vẹn không dính người giữa sương sớm mờ ảo.',
      author: 'Đức Anh',
      date: 'Mới cập nhật'
    }
  ],
  spots: [
    {
      id: 'dn-spot-1',
      name: 'Cầu Rồng Đà Nẵng',
      category: 'Biểu tượng & Check-in',
      tag: 'Phù hợp đi nhóm đông',
      rating: 4.8,
      reviewsCount: 3280,
      address: 'Đường Nguyễn Văn Linh, Phước Ninh, Hải Châu',
      image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&auto=format&fit=crop&q=80',
      tip: 'Nên ghé lúc 20:30 vào Thứ Bảy & Chủ Nhật để chọn chỗ đứng view thẳng đầu rồng xem phun lửa và nước.',
      priceText: 'Miễn phí tham quan'
    },
    {
      id: 'dn-spot-2',
      name: 'Phố Cổ Hội An & Bến thuyền Bạch Đằng',
      category: 'Di sản & Văn hóa',
      tag: 'Lãng mạn & Ẩm thực',
      rating: 4.9,
      reviewsCount: 5410,
      address: 'Bạch Đằng, Phường Minh An, Hội An',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80',
      tip: 'Lung linh nhất từ 18:30 khi các dãy đèn lồng đồng loạt bật sáng dọc theo dòng sông Hoài.',
      priceText: 'Vé tham quan ~120.000đ'
    },
    {
      id: 'dn-spot-3',
      name: 'Bãi biển Mỹ Khê',
      category: 'Biển & Nghỉ dưỡng',
      tag: 'Top bãi biển đẹp hành tinh',
      rating: 4.7,
      reviewsCount: 4120,
      address: 'Võ Nguyên Giáp, Phước Mỹ, Sơn Trà',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
      tip: 'Bãi tắm sạch, cát trắng mịn, lý tưởng để tắm sáng sớm (5:30 - 7:00) hoặc lướt ván chiều tà.',
      priceText: 'Tự do tắm biển'
    },
    {
      id: 'dn-spot-4',
      name: 'Chợ đêm Sơn Trà & Ẩm thực đường phố',
      category: 'Ẩm thực & Mua sắm',
      tag: 'Giá bình dân',
      rating: 4.6,
      reviewsCount: 1890,
      address: 'Mai Hắc Đế, An Hải Trung, Sơn Trà',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
      tip: 'Hải sản nướng mỡ hành, kem bơ sầu riêng cô Vân, bánh tráng nướng Đà Nẵng cực ngon.',
      priceText: '~30.000đ - 150.000đ'
    },
    {
      id: 'dn-spot-5',
      name: 'Bán đảo Sơn Trà & Chùa Linh Ứng',
      category: 'Thiên nhiên & Trải nghiệm',
      tag: 'Lá phổi xanh kỳ vĩ',
      rating: 4.8,
      reviewsCount: 3820,
      address: 'Hoàng Sa, Thọ Quang, Sơn Trà',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
      tip: 'Ngắm tượng Phật Bà 67m hướng biển và may mắn bắt gặp đàn voọc chà vá chân nâu quý hiếm.',
      priceText: 'Miễn phí vãn cảnh'
    },
    {
      id: 'dn-spot-6',
      name: 'Rừng dừa Bảy Mẫu Cẩm Thanh',
      category: 'Thiên nhiên & Trải nghiệm',
      tag: 'Vui nhộn & Sông nước',
      rating: 4.7,
      reviewsCount: 2650,
      address: 'Cẩm Thanh, Hội An, Quảng Nam',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80',
      tip: 'Trải nghiệm xoay thúng nghệ thuật cực đã cùng ngư dân địa phương và thử tài giăng lưới câu cua.',
      priceText: '~150.000đ/thúng'
    }
  ]
};

// 3. ĐÀ LẠT
const DALAT_DATA: DestinationExploreResult = {
  destinationName: 'Đà Lạt',
  province: 'Lâm Đồng',
  region: 'Tây Nguyên',
  subtitle: 'Thành phố sương mù mộng mơ, đồi thông xanh ngát, biển mây bồng bềnh và quán cafe lãng mạn',
  articles: [
    {
      id: 'art-dl-1',
      title: 'Bản đồ săn mây Cầu Đất lúc 5:00 sáng: Những điểm ngắm đẹp quên lối về',
      readTime: '5 phút đọc',
      category: 'Săn mây',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80',
      excerpt: 'Thời điểm lý tưởng nhất để bắt trọn biển mây cuồn cuộn trôi qua tuabin gió khổng lồ Cầu Đất.',
      author: 'Hà My',
      date: 'Hôm nay'
    },
    {
      id: 'art-dl-2',
      title: 'Top 7 tiệm cafe sườn đồi ngắm hoàng hôn thông reo lãng mạn nhất Đà Lạt',
      readTime: '4 phút đọc',
      category: 'Cafe chill',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
      excerpt: 'Túi Mơ To, Cheo Veooo hay Lời Của Gió: Nơi bạn có thể ngồi hàng giờ ngắm thung lũng đèn lồng.',
      author: 'Bảo Trân',
      date: 'Nổi bật'
    },
    {
      id: 'art-dl-3',
      title: 'Ẩm thực phố núi đêm: Lẩu gà lá é, bánh tráng nướng & ly sữa đậu nóng',
      readTime: '4 phút đọc',
      category: 'Food Tour',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
      excerpt: 'Giữa cái rét se se 15 độ C, xì xụp nồi lẩu gà lá é the the cay nồng là cảm giác khó quên.',
      author: 'Thanh Phong',
      date: 'Mới đăng'
    }
  ],
  spots: [
    {
      id: 'dl-spot-1',
      name: 'Quảng trường Lâm Viên & Hồ Xuân Hương',
      category: 'Biểu tượng & Check-in',
      tag: 'Trái tim của Đà Lạt',
      rating: 4.8,
      reviewsCount: 5210,
      address: 'Trần Quốc Toản, Phường 1, Đà Lạt',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
      tip: 'Chụp hình với nụ hoa Atiso và bông hoa dã quỳ kính màu khổng lồ lúc bình minh hoặc hoàng hôn.',
      priceText: 'Miễn phí tham quan'
    },
    {
      id: 'dl-spot-2',
      name: 'Đồi chè Cầu Đất & Tuabin điện gió',
      category: 'Thiên nhiên & Trải nghiệm',
      tag: 'Biển mây huyền ảo',
      rating: 4.9,
      reviewsCount: 3890,
      address: 'Xuân Trường, Đà Lạt, Lâm Đồng',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80',
      tip: 'Có mặt từ 5:15 sáng để bắt trọn khoảnh khắc mặt trời đỏ rực nhô lên giữa bồng bềnh mây trắng.',
      priceText: 'Miễn phí vào đồi'
    },
    {
      id: 'dl-spot-3',
      name: 'Thác Datanla & Xe trượt máng Alpine Coaster',
      category: 'Thiên nhiên & Trải nghiệm',
      tag: 'Cảm giác mạnh giữa rừng thông',
      rating: 4.7,
      reviewsCount: 4120,
      address: 'Đèo Prenn, Phường 3, Đà Lạt',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
      tip: 'Máng trượt dài nhất Đông Nam Á 2.400m uốn lượn qua tán thông ngút ngàn cực kỳ phấn khích.',
      priceText: '~180.000đ/vé khứ hồi'
    },
    {
      id: 'dl-spot-4',
      name: 'Tiệm Cà Phê Túi Mơ To',
      category: 'Ẩm thực & Mua sắm',
      tag: 'Vườn cúc họa mi & View thung lũng',
      rating: 4.8,
      reviewsCount: 3670,
      address: 'Hẻm 31 Sào Nam, Phường 11, Đà Lạt',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
      tip: 'Ngồi hiên gỗ ngắm thung lũng thắp đèn lồng lung linh khi hoàng hôn buông xuống.',
      priceText: '~55.000đ - 75.000đ'
    },
    {
      id: 'dl-spot-5',
      name: 'Chợ Đêm Đà Lạt & Bánh tráng nướng cô Hoa',
      category: 'Ẩm thực & Mua sắm',
      tag: 'Ẩm thực đêm đặc sắc',
      rating: 4.6,
      reviewsCount: 6100,
      address: 'Khu Hoà Bình, Phường 1, Đà Lạt',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
      tip: 'Bánh tráng nướng mỡ hành trứng gà giòn rụm và dâu tây lắc muối ớt cay ngọt.',
      priceText: '~25.000đ - 80.000đ'
    }
  ]
};

// 4. PHÚ QUỐC
const PHUQUOC_DATA: DestinationExploreResult = {
  destinationName: 'Phú Quốc',
  province: 'Kiên Giang',
  region: 'Miền Nam',
  subtitle: 'Đảo Ngọc thiên đường nhiệt đới, cáp treo vượt biển kỷ lục thế giới và hoàng hôn biển tráng lệ',
  articles: [
    {
      id: 'art-pq-1',
      title: 'Cẩm nang du lịch Nam Đảo Phú Quốc: Tour cano 4 đảo & ngắm san hô tự nhiên',
      readTime: '5 phút đọc',
      category: 'Tour biển đảo',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
      excerpt: 'Kinh nghiệm chụp ảnh flycam ván SUP miễn phí ở Hòn Mây Rút và lặn ngắm san hô ở Hòn Gầm Ghì.',
      author: 'Quốc Đạt',
      date: 'Hôm nay'
    },
    {
      id: 'art-pq-2',
      title: 'Bãi Sao vs Sunset Sanato: Địa điểm nào sống ảo hoàng hôn đỉnh nhất?',
      readTime: '4 phút đọc',
      category: 'Sống ảo',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
      excerpt: 'So sánh chi tiết vẻ đẹp bãi cát trắng mịn như kem và dàn tượng voi chân dài nghệ thuật bên bờ biển.',
      author: 'Thùy Chi',
      date: 'Nổi bật'
    },
    {
      id: 'art-pq-3',
      title: 'Food tour chợ đêm VUI-Fest: Ăn gì ở thị trấn Hoàng Hôn ngắm pháo hoa?',
      readTime: '3 phút đọc',
      category: 'Chợ đêm',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
      excerpt: 'Thưởng thức bún quậy Kiến Xây trứ danh, ghẹ Hàm Ninh hấp ngọt thịt và show pháo hoa lúc 21:30.',
      author: 'Bảo Anh',
      date: 'Mới đăng'
    }
  ],
  spots: [
    {
      id: 'pq-spot-1',
      name: 'Sunset Sanato Beach Club',
      category: 'Biển & Nghỉ dưỡng',
      tag: 'Tọa độ hoàng hôn trứ danh',
      rating: 4.8,
      reviewsCount: 4320,
      address: 'Bãi Trường, Dương Tơ, Phú Quốc',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
      tip: 'Đến lúc 16:45 để chụp ảnh với đàn voi chân dài và tượng đầu người chia đôi hướng thẳng mặt trời lặn.',
      priceText: 'Vé vào cổng 100.000đ'
    },
    {
      id: 'pq-spot-2',
      name: 'Cáp Treo Hòn Thơm 7.899m',
      category: 'Biểu tượng & Check-in',
      tag: 'Kỷ lục Guinness thế giới',
      rating: 4.9,
      reviewsCount: 5120,
      address: 'Ga Ánh Dương, Thị trấn Hoàng Hôn, An Thới',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
      tip: 'Ngắm toàn cảnh vịnh biển An Thới ngút ngàn từ độ cao 160m trên biển trong xanh như ngọc bích.',
      priceText: 'Combo cáp treo ~600.000đ'
    },
    {
      id: 'pq-spot-3',
      name: 'Bãi Sao Phú Quốc',
      category: 'Biển & Nghỉ dưỡng',
      tag: 'Bãi cát trắng mịn như kem',
      rating: 4.7,
      reviewsCount: 4890,
      address: 'Ấp Bãi Sao, An Thới, Phú Quốc',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
      tip: 'Sóng biển êm đềm thoai thoải, thích hợp cho gia đình và nhóm bạn tắm biển thư giãn.',
      priceText: 'Miễn phí tắm biển'
    },
    {
      id: 'pq-spot-4',
      name: 'Bún Quậy Kiến Xây Phú Quốc',
      category: 'Ẩm thực & Mua sắm',
      tag: 'Ẩm thực bản địa độc đáo',
      rating: 4.7,
      reviewsCount: 3980,
      address: '28 Đường Bạch Đằng, Dương Đông',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
      tip: 'Tự tay pha bát nước chấm quậy từ muối ớt đường tắc, sợi bún tươi ép trực tiếp vào nồi nước dùng.',
      priceText: '~55.000đ - 70.000đ/tô'
    },
    {
      id: 'pq-spot-5',
      name: 'Cầu Hôn (Kiss Bridge) & Sun World Sunset Town',
      category: 'Biểu tượng & Check-in',
      tag: 'Kiệt tác kiến trúc biểu tượng',
      rating: 4.9,
      reviewsCount: 3410,
      address: 'Thị trấn Hoàng Hôn, An Thới, Phú Quốc',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
      tip: 'Cây cầu với hai nhánh không chạm nhau tạo khoảng hở 30cm đón trọn vẹn quả cầu lửa hoàng hôn rực rỡ.',
      priceText: 'Vé lên cầu ~100.000đ'
    }
  ]
};

// 5. HÀ GIANG
const HAGIANG_DATA: DestinationExploreResult = {
  destinationName: 'Hà Giang',
  province: 'Hà Giang',
  region: 'Miền Bắc',
  subtitle: 'Vương quốc đá kỳ vĩ, đèo Mã Pí Lèng hiểm trở, dòng sông Nho Quế ngọc bích và bản sắc vùng cao',
  articles: [
    {
      id: 'art-hg-1',
      title: 'Chinh phục Tứ Đại Đỉnh Đèo: Cẩm nang phượt xe máy Mã Pí Lèng an toàn',
      readTime: '6 phút đọc',
      category: 'Phượt mạo hiểm',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80',
      excerpt: 'Hướng dẫn kiểm tra phanh xe, vào cua tay áo an toàn và các điểm dừng chân chụp ảnh đèo ngoạn mục.',
      author: 'Văn Chung',
      date: 'Hôm nay'
    },
    {
      id: 'art-hg-2',
      title: 'Trải nghiệm đi thuyền hẻm Tu Sản: Nước sông Nho Quế xanh ngọc bích',
      readTime: '4 phút đọc',
      category: 'Thiên nhiên',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
      excerpt: 'Chiêm ngưỡng hẻm vực sâu nhất Đông Nam Á với vách đá dựng đứng cao gần 800m hùng vĩ.',
      author: 'Mai Hương',
      date: 'Nổi bật'
    },
    {
      id: 'art-hg-3',
      title: 'Chợ phiên Đồng Văn & Homestay nhà trình tường người Mông',
      readTime: '4 phút đọc',
      category: 'Văn hóa bản địa',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
      excerpt: 'Nếm thử bát bánh tam giác mạch nướng than ấm nóng và chén rượu ngô men lá thơm nồng nàn.',
      author: 'Khánh Linh',
      date: 'Mới đăng'
    }
  ],
  spots: [
    {
      id: 'hg-spot-1',
      name: 'Đèo Mã Pí Lèng huyền thoại',
      category: 'Thiên nhiên & Trải nghiệm',
      tag: 'Tứ đại đỉnh đèo Việt Nam',
      rating: 4.9,
      reviewsCount: 3820,
      address: 'Quốc lộ 4C, Pải Lủng, Mèo Vạc',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80',
      tip: 'Đứng tại mỏm đá Panorama ngắm trọn vẹn cung đường đèo uốn lượn ôm sát vách đá thẳng đứng.',
      priceText: 'Tự do trải nghiệm'
    },
    {
      id: 'hg-spot-2',
      name: 'Hẻm vực Tu Sản & Đi thuyền Sông Nho Quế',
      category: 'Thiên nhiên & Trải nghiệm',
      tag: 'Hẻm vực sâu nhất Đông Nam Á',
      rating: 4.9,
      reviewsCount: 4210,
      address: 'Bến thuyền Tà Làng, Pải Lủng, Mèo Vạc',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
      tip: 'Nên thuê xe ôm chở từ đầu dốc xuống bến thuyền Tà Làng để đảm bảo an toàn nếu chưa quen lái đèo dốc.',
      priceText: '120.000đ vé thuyền'
    },
    {
      id: 'hg-spot-3',
      name: 'Cột Cờ Quốc Gia Lũng Cú',
      category: 'Biểu tượng & Check-in',
      tag: 'Điểm cực Bắc thiêng liêng',
      rating: 4.8,
      reviewsCount: 3670,
      address: 'Đỉnh núi Rồng, Xã Lũng Cú, Đồng Văn',
      image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=600&auto=format&fit=crop&q=80',
      tip: 'Vượt qua 839 bậc đá để chạm tay vào lá cờ tổ quốc rộng 54m2 tung bay kiêu hãnh trên đỉnh núi Rồng.',
      priceText: '25.000đ vé vào'
    },
    {
      id: 'hg-spot-4',
      name: 'Dinh Thự Vua Mèo họ Vương',
      category: 'Di sản & Văn hóa',
      tag: 'Kiến trúc đá & Gỗ sa mộc cổ',
      rating: 4.7,
      reviewsCount: 2940,
      address: 'Xã Sà Phìn, Huyện Đồng Văn',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
      tip: 'Lắng nghe giai thoại hào hùng về cụ Vương Chính Đức và ngắm hoa văn điêu khắc bằng bạc và đồng tinh xảo.',
      priceText: '20.000đ vé vào'
    }
  ]
};

// 6. SA PA (LÀO CAI)
const SAPA_DATA: DestinationExploreResult = {
  destinationName: 'Sa Pa',
  province: 'Lào Cai',
  region: 'Miền Bắc',
  subtitle: 'Thị xã trong sương, nóc nhà Đông Dương Fansipan và ruộng bậc thang kỳ vĩ bậc nhất thế giới',
  articles: [
    {
      id: 'art-sp-1',
      title: 'Chinh phục đỉnh Fansipan 3.143m: Hướng dẫn cáp treo và mẹo săn mây',
      readTime: '5 phút đọc',
      category: 'Cáp treo & Mây',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80',
      excerpt: 'Khung giờ từ 9:30 đến 11:30 sáng là lúc sương tan, trời trong xanh nhất để check-in cột mốc 3.143m.',
      author: 'Hoàng Long',
      date: 'Hôm nay'
    },
    {
      id: 'art-sp-2',
      title: 'Bản Cát Cát có gì đẹp? Kinh nghiệm thuê trang phục dân tộc check-in suối Hoa',
      readTime: '4 phút đọc',
      category: 'Văn hóa bản làng',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
      excerpt: 'Bí kíp chọn trang phục thổ cẩm đẹp nhất và các góc chụp thơ mộng bên cối xay nước khổng lồ.',
      author: 'Ngọc Bích',
      date: 'Nổi bật'
    }
  ],
  spots: [
    {
      id: 'sp-spot-1',
      name: 'Đỉnh Fansipan — Nóc Nhà Đông Dương 3.143m',
      category: 'Biểu tượng & Check-in',
      tag: 'Đỉnh cao thiêng liêng',
      rating: 4.9,
      reviewsCount: 5890,
      address: 'Sun World Fansipan Legend, Sa Pa, Lào Cai',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80',
      tip: 'Mặc áo ấm vì nhiệt độ trên đỉnh thường thấp hơn thị xã 8-10 độ C, mang theo kính râm chụp hình.',
      priceText: 'Vé cáp treo ~850.000đ'
    },
    {
      id: 'sp-spot-2',
      name: 'Bản Cát Cát & Thác Tiên Sa',
      category: 'Di sản & Văn hóa',
      tag: 'Bản làng H\'Mông mộng mơ',
      rating: 4.8,
      reviewsCount: 4620,
      address: 'Xã San Sả Hồ, Sa Pa, Lào Cai',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
      tip: 'Thuê bộ đồ thổ cẩm chỉ từ 50.000đ ngay cổng vào bản, đi xuôi dòng suối Hoa ngắm bánh xe nước.',
      priceText: '150.000đ vé vào cổng'
    },
    {
      id: 'sp-spot-3',
      name: 'Đèo Ô Quy Hồ & Cổng Trời Sa Pa',
      category: 'Thiên nhiên & Trải nghiệm',
      tag: 'Tứ đại đỉnh đèo miền Bắc',
      rating: 4.8,
      reviewsCount: 3780,
      address: 'Quốc lộ 4D, ranh giới Lào Cai — Lai Châu',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
      tip: 'Hoàng hôn Ô Quy Hồ được mệnh danh là đẹp nhất Tây Bắc với biển mây nhuộm màu cam vàng rực rỡ.',
      priceText: 'Miễn phí ngắm cảnh'
    },
    {
      id: 'sp-spot-4',
      name: 'Lẩu cá hồi & cá tầm Sa Pa A Quỳnh',
      category: 'Ẩm thực & Mua sắm',
      tag: 'Ẩm thực phố núi nóng hổi',
      rating: 4.7,
      reviewsCount: 3100,
      address: '15 Thạch Sơn, Thị xã Sa Pa',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
      tip: 'Thịt cá hồi nuôi tại suối lạnh Sa Pa tươi rói, nhúng lẩu măng cay chua thanh ấm lòng đêm lạnh.',
      priceText: '~150.000đ - 220.000đ/người'
    }
  ]
};

// 7. NHA TRANG (KHÁNH HÒA)
const NHATRANG_DATA: DestinationExploreResult = {
  destinationName: 'Nha Trang',
  province: 'Khánh Hòa',
  region: 'Miền Trung',
  subtitle: 'Vịnh biển đẹp bậc nhất hành tinh với cát trắng mịn, suối khoáng bùn và thiên đường giải trí',
  articles: [
    {
      id: 'art-nt-1',
      title: 'Top 5 hòn đảo hoang sơ nước trong vắt tại vịnh biển Nha Trang',
      readTime: '4 phút đọc',
      category: 'Biển đảo',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
      excerpt: 'Khám phá Hòn Mun, Hòn Tằm, Hòn Một với hệ sinh thái san hô ngầm nguyên sinh phong phú nhất.',
      author: 'Anh Khoa',
      date: 'Hôm nay'
    },
    {
      id: 'art-nt-2',
      title: 'Ăn sập Nha Trang: Nem nướng Ninh Hòa, bánh căn mực và hải sản tươi sống',
      readTime: '4 phút đọc',
      category: 'Food Tour',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
      excerpt: 'Địa chỉ những quán ăn lâu năm nức tiếng được người dân địa phương ưa chuộng nhất.',
      author: 'Hồng Nhung',
      date: 'Nổi bật'
    }
  ],
  spots: [
    {
      id: 'nt-spot-1',
      name: 'Quần thể Tháp Bà Ponagar',
      category: 'Di sản & Văn hóa',
      tag: 'Kiến trúc Chăm Pa cổ đại',
      rating: 4.8,
      reviewsCount: 4620,
      address: 'Đường 2/4, Vĩnh Phước, Nha Trang',
      image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=600&auto=format&fit=crop&q=80',
      tip: 'Kiến trúc gạch nung độc đáo từ thế kỷ thứ 8 nằm bên cửa sông Cái thơ mộng.',
      priceText: '30.000đ vé vào'
    },
    {
      id: 'nt-spot-2',
      name: 'Hòn Tằm & Bãi tắm biển lặn san hô',
      category: 'Biển & Nghỉ dưỡng',
      tag: 'Khu phức hợp tắm bùn khoáng đảo',
      rating: 4.8,
      reviewsCount: 3950,
      address: 'Đảo Hòn Tằm, Vịnh Nha Trang',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
      tip: 'Ngâm bùn khoáng nóng view nhìn thẳng ra biển cả bao la, thư giãn xua tan mọi mệt mỏi.',
      priceText: 'Combo tắm bùn ~450.000đ'
    },
    {
      id: 'nt-spot-3',
      name: 'VinWonders Nha Trang (Hòn Tre)',
      category: 'Biểu tượng & Check-in',
      tag: 'Công viên giải trí kỷ lục',
      rating: 4.9,
      reviewsCount: 6120,
      address: 'Đảo Hòn Tre, Vĩnh Nguyên, Nha Trang',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
      tip: 'Xem show Tata triệu đô buổi tối và trải nghiệm đường trượt Zipline kỷ lục dài 880m.',
      priceText: 'Vé trọn gói ~800.000đ'
    },
    {
      id: 'nt-spot-4',
      name: 'Nem nướng Đặng Văn Quyên',
      category: 'Ẩm thực & Mua sắm',
      tag: 'Đặc sản Ninh Hòa trứ danh',
      rating: 4.7,
      reviewsCount: 3410,
      address: '16A Lãn Ông, Xương Huân, Nha Trang',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
      tip: 'Cuốn nem thịt nướng thơm lừng cùng xoài xanh, dưa chuột và bánh tráng chiên giòn tan.',
      priceText: '~60.000đ/suất'
    }
  ]
};

// 8. HUẾ (THỪA THIÊN HUẾ)
const HUE_DATA: DestinationExploreResult = {
  destinationName: 'Huế',
  province: 'Thừa Thiên Huế',
  region: 'Miền Trung',
  subtitle: 'Cố đô di sản nghìn năm, sông Hương êm đềm, lăng tẩm uy nghiêm và nét ẩm thực cung đình tinh tế',
  articles: [
    {
      id: 'art-hue-1',
      title: 'Hành trình di sản cố đô: Khám phá Đại Nội và các lăng tẩm triều Nguyễn',
      readTime: '6 phút đọc',
      category: 'Di sản lịch sử',
      image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=600&auto=format&fit=crop&q=80',
      excerpt: 'Từ Ngọ Môn, Điện Thái Hòa đến Lăng Khải Định tinh xảo: câu chuyện lịch sử hào hùng triều Nguyễn.',
      author: 'Vĩnh Hoàng',
      date: 'Hôm nay'
    },
    {
      id: 'art-hue-2',
      title: 'Ẩm thực xứ Huế: Thiên đường bánh bèo nậm lọc và tô bún bò đậm đà',
      readTime: '4 phút đọc',
      category: 'Ẩm thực cố đô',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
      excerpt: 'Vị cay nồng của ớt sa tế hòa quyện mắm ruốc thơm lừng tạo nên sức hút khó cưỡng của tô bún bò Huế.',
      author: 'Như Quỳnh',
      date: 'Nổi bật'
    }
  ],
  spots: [
    {
      id: 'hue-spot-1',
      name: 'Đại Nội Huế (Hoàng Thành & Tử Cấm Thành)',
      category: 'Di sản & Văn hóa',
      tag: 'Di sản Văn hóa Thế giới UNESCO',
      rating: 4.9,
      reviewsCount: 5820,
      address: 'Đường 23/8, Thuận Hòa, TP. Huế',
      image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=600&auto=format&fit=crop&q=80',
      tip: 'Thuê áo Nhật Bình hoặc Cổ phục cung đình chụp ảnh tại Cung Diên Thọ và Điện Kiến Trung mới phục dựng.',
      priceText: '200.000đ vé Đại Nội'
    },
    {
      id: 'hue-spot-2',
      name: 'Chùa Thiên Mụ cổ kính bên bờ Sông Hương',
      category: 'Di sản & Văn hóa',
      tag: 'Đệ nhất cổ tự xứ Huế',
      rating: 4.8,
      reviewsCount: 4310,
      address: 'Đồi Hà Khê, Kim Long, TP. Huế',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80',
      tip: 'Tháp Phước Duyên 7 tầng soi bóng xuống dòng sông Hương êm đềm lúc ráng chiều.',
      priceText: 'Miễn phí vãn cảnh'
    },
    {
      id: 'hue-spot-3',
      name: 'Lăng Khải Định (Ứng Lăng)',
      category: 'Di sản & Văn hóa',
      tag: 'Đỉnh cao nghệ thuật ghép gốm sứ',
      rating: 4.9,
      reviewsCount: 3980,
      address: 'Xã Thủy Bằng, Hương Thủy, Thừa Thiên Huế',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
      tip: 'Chiêm ngưỡng bức tranh cửu long ẩn vân trên trần cung Thiên Định và nghệ thuật ghép sành sứ tinh xảo.',
      priceText: '150.000đ vé vào'
    },
    {
      id: 'hue-spot-4',
      name: 'Bún Bò Huế Mụ Rơi & Chè Hẻm Hùng Vương',
      category: 'Ẩm thực & Mua sắm',
      tag: 'Hương vị cung đình dân dã',
      rating: 4.7,
      reviewsCount: 2950,
      address: '40 Nguyễn Chí Diểu & Số 1 Kiệt 29 Hùng Vương',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
      tip: 'Tô bún bò giò heo chả cua thơm lừng mắm ruốc, tráng miệng bằng ly chè bột lọc bọc heo quay độc lạ.',
      priceText: '~40.000đ - 65.000đ'
    }
  ]
};

// Helper to look up or generate dynamic explore data for any destination
export function getDestinationExploreData(destinationQuery?: string): DestinationExploreResult | null {
  if (!destinationQuery || !destinationQuery.trim()) {
    return null;
  }

  const clean = removeVietnameseTones(destinationQuery.toLowerCase()).trim();

  if (clean.includes('ha noi')) return HANOI_DATA;
  if (clean.includes('da nang') || clean.includes('hoi an')) return DANANG_DATA;
  if (clean.includes('da lat') || clean.includes('lam dong')) return DALAT_DATA;
  if (clean.includes('phu quoc') || clean.includes('kien giang')) return PHUQUOC_DATA;
  if (clean.includes('ha giang')) return HAGIANG_DATA;
  if (clean.includes('sa pa') || clean.includes('sapa') || clean.includes('lao cai')) return SAPA_DATA;
  if (clean.includes('nha trang') || clean.includes('khanh hoa')) return NHATRANG_DATA;
  if (clean.includes('hue') || clean.includes('thua thien')) return HUE_DATA;

  // Find in 63 Vietnam destinations dataset
  const matched = VIETNAM_DESTINATIONS.find((d) => {
    const dClean = removeVietnameseTones(d.name.toLowerCase());
    const pClean = removeVietnameseTones(d.province.toLowerCase());
    return clean.includes(dClean) || clean.includes(pClean) || dClean.includes(clean);
  });

  const destName = matched ? matched.name : destinationQuery.trim();
  const province = matched ? matched.province : destName;
  const region = matched ? matched.region : 'Việt Nam';
  const spotsList = matched?.popularSpots || ['Danh thắng biểu tượng', 'Điểm ngắm hoàng hôn', 'Chợ ẩm thực đêm'];

  return {
    destinationName: destName,
    province,
    region,
    subtitle: `Khám phá các danh thắng nổi bật, văn hóa địa phương và ẩm thực trứ danh tại ${destName}`,
    articles: [
      {
        id: `art-dyn-1`,
        title: `Cẩm nang du lịch ${destName}: Top những điểm đến không thể bỏ lỡ`,
        readTime: '5 phút đọc',
        category: 'Cẩm nang du lịch',
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80',
        excerpt: `Kinh nghiệm chi tiết di chuyển, thời điểm đẹp nhất và những trải nghiệm văn hóa bản sắc tại ${destName}.`,
        author: 'TripMate Editor',
        date: 'Hôm nay'
      },
      {
        id: `art-dyn-2`,
        title: `Bản đồ ẩm thực đặc sản ${destName}: Ăn gì, ở đâu ngon và rẻ?`,
        readTime: '4 phút đọc',
        category: 'Food Tour',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
        excerpt: `Gợi ý những món ăn đặc sản truyền thống nức tiếng của vùng đất ${destName} mà du khách nhất định phải thử.`,
        author: 'Ban Ẩm Thực',
        date: 'Gợi ý'
      }
    ],
    spots: spotsList.map((spotName, idx) => ({
      id: `dyn-spot-${idx}`,
      name: `${spotName} — ${destName}`,
      category: idx % 2 === 0 ? 'Biểu tượng & Check-in' : 'Thiên nhiên & Trải nghiệm',
      tag: matched?.tag || 'Điểm đến được yêu thích',
      rating: +(4.6 + (idx * 0.1)).toFixed(1),
      reviewsCount: 1200 + idx * 340,
      address: `Khu vực trung tâm ${destName}, tỉnh ${province}`,
      image:
        idx === 0
          ? 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80'
          : idx === 1
          ? 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
      tip: `Thời điểm lý tưởng nhất trong ngày để ghé thăm ${spotName} là sáng sớm hoặc chiều tà khi ánh sáng dịu mát.`,
      priceText: 'Miễn phí hoặc giá bình dân'
    }))
  };
}

/**
 * Returns all top-rated curated articles across Vietnam for the Travel Blog Home
 */
export function getAllFeaturedArticles(): ExploreArticle[] {
  const allSets = [
    { dest: 'Hà Nội', articles: HANOI_DATA.articles },
    { dest: 'Đà Nẵng — Hội An', articles: DANANG_DATA.articles },
    { dest: 'Đà Lạt', articles: DALAT_DATA.articles },
    { dest: 'Phú Quốc', articles: PHUQUOC_DATA.articles },
    { dest: 'Sa Pa', articles: SAPA_DATA.articles },
    { dest: 'Hà Giang', articles: HAGIANG_DATA.articles },
  ];

  const enriched: ExploreArticle[] = [];
  allSets.forEach(({ dest, articles }) => {
    articles.forEach((art, i) => {
      enriched.push({
        ...art,
        destination: dest,
        likesCount: 128 + i * 47,
        commentsCount: 24 + i * 9,
        content: [
          `Du lịch khám phá ${dest} luôn mang lại những cung bậc cảm xúc khó quên cho mỗi lữ khách. Với vẻ đẹp đặc trưng, sự giao thoa hài hòa giữa cảnh sắc thiên nhiên và nếp sống bản địa giàu bản sắc, đây là điểm hẹn lý tưởng cho những chuyến đi tái tạo năng lượng.`,
          `Theo kinh nghiệm của các tín đồ xê dịch, khoảng thời gian đẹp nhất để tận hưởng trọn vẹn cảnh sắc là lúc sáng sớm tinh mơ khi không khí trong lành, hoặc thời khắc hoàng hôn buông xuống nhuộm vàng cả không gian. Đừng quên chuẩn bị trang phục phù hợp với thời tiết địa phương và mang theo máy ảnh để bắt trọn những khung hình đắt giá.`,
          `Về văn hóa ẩm thực, hãy ưu tiên ghé qua các khu chợ truyền thống và quán ăn lâu đời của người dân bản địa. Hương vị nguyên bản, mộc mạc cùng sự hiếu khách nồng hậu chắc chắn sẽ để lại dư vị ấm áp trong hành trình của bạn.`,
          `Lưu ý hữu ích: Hãy đặt trước dịch vụ lưu trú và vé tham quan trong mùa cao điểm, đồng thời duy trì ý thức bảo vệ môi trường, không xả rác tại các danh lam thắng cảnh thiên nhiên.`
        ]
      });
    });
  });

  return enriched;
}

/**
 * Returns all top-rated spots across destinations for the Travel Blog Home
 */
export function getAllFeaturedSpots(): ExploreSpotItem[] {
  const allDestSpots = [
    ...HANOI_DATA.spots,
    ...DANANG_DATA.spots,
    ...DALAT_DATA.spots,
    ...PHUQUOC_DATA.spots,
    ...SAPA_DATA.spots,
    ...HAGIANG_DATA.spots,
  ];

  // Return highest rated spots
  return allDestSpots.sort((a, b) => b.rating - a.rating);
}

