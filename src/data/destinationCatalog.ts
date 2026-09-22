import { ExploreSpotItem } from './destinationExploreData';

export interface DestinationItem {
  id: string;
  name: string;
  province: string;
  region: 'Miền Bắc' | 'Miền Trung' | 'Miền Nam' | 'Tây Nguyên';
  tag: string;
  coverImage: string;
  summary: string;
  spotsCount: number;
  spots: ExploreSpotItem[];
}

export const DESTINATION_CATALOG: DestinationItem[] = [
  {
    id: 'danang',
    name: 'Đà Nẵng',
    province: 'Đà Nẵng',
    region: 'Miền Trung',
    tag: 'Thành phố đáng sống & Cầu Rồng phun lửa',
    coverImage: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&auto=format&fit=crop&q=80',
    summary: 'Đà Nẵng hội tụ đủ biển xanh Mỹ Khê, núi Ngũ Hành Sơn hùng vĩ, Cầu Vàng trên mây và ẩm thực miền Trung trứ danh.',
    spotsCount: 6,
    spots: [
      {
        id: 'dn-spot-1',
        name: 'Cầu Rồng Đà Nẵng',
        category: 'Biểu tượng & Check-in',
        tag: 'Phun lửa & nước 21h cuối tuần',
        rating: 4.9,
        reviewsCount: 6850,
        address: 'Đường Nguyễn Văn Linh, Phước Ninh, Hải Châu, Đà Nẵng',
        image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&auto=format&fit=crop&q=80',
        tip: 'Đứng phía bờ Đông hoặc du thuyền trên sông Hàn lúc 20:45 để xem trọn màn phun lửa.',
        priceText: 'Miễn phí tham quan'
      },
      {
        id: 'dn-spot-2',
        name: 'Bà Nà Hills & Cầu Vàng',
        category: 'Khu vui chơi & Cảnh quan',
        tag: 'Đôi bàn tay khổng lồ trên mây',
        rating: 4.8,
        reviewsCount: 12400,
        address: 'Hòa Ninh, Hòa Vang, Đà Nẵng',
        image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
        tip: 'Nên đi cáp treo chuyến sáng sớm 7:30 để đón nắng sớm chiếu lên Cầu Vàng và tránh đông đúc.',
        priceText: 'Vé cáp treo ~850.000đ'
      },
      {
        id: 'dn-spot-3',
        name: 'Biển Mỹ Khê',
        category: 'Biển & Nghỉ dưỡng',
        tag: 'Top bãi biển quyến rũ nhất hành tinh',
        rating: 4.8,
        reviewsCount: 5200,
        address: 'Đường Võ Nguyên Giáp, Phước Mỹ, Sơn Trà, Đà Nẵng',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
        tip: 'Khung giờ tắm biển an toàn và đẹp nhất là 5:30 - 7:30 sáng hoặc 16:30 - 18:30 chiều.',
        priceText: 'Tự do tắm biển miễn phí'
      },
      {
        id: 'dn-spot-4',
        name: 'Bán đảo Sơn Trà & Chùa Linh Ứng',
        category: 'Thiên nhiên & Tâm linh',
        tag: 'Tượng Phật Bà cao 67m ngắm vịnh biển',
        rating: 4.9,
        reviewsCount: 4890,
        address: 'Hoàng Sa, Thọ Quang, Sơn Trà, Đà Nẵng',
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80',
        tip: 'Lái xe máy ven đường biển lên Đỉnh Bàn Cờ và Cây Đa Ngàn Năm đón gió lộng.',
        priceText: 'Miễn phí vãn cảnh'
      },
      {
        id: 'dn-spot-5',
        name: 'Danh thắng Ngũ Hành Sơn',
        category: 'Di sản & Khám phá',
        tag: 'Động Huyền Không kỳ bí',
        rating: 4.7,
        reviewsCount: 3820,
        address: '81 Huyền Trân Công Chúa, Hòa Hải, Ngũ Hành Sơn',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
        tip: 'Tia nắng rọi qua vòm động Huyền Không tạo nên luồng sáng tâm linh ảo diệu lúc giữa trưa.',
        priceText: '40.000đ vé vào'
      },
      {
        id: 'dn-spot-6',
        name: 'Chợ đêm Sơn Trà & Chợ Cồn',
        category: 'Ẩm thực & Mua sắm',
        tag: 'Thiên đường ẩm thực đường phố',
        rating: 4.6,
        reviewsCount: 3100,
        address: 'Đường Mai Hắc Đế, An Hải Trung & Hùng Vương, Hải Châu',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
        tip: 'Thưởng thức bánh xèo bà Dưỡng, ốc hút cay nồng, nem lụi và chè sầu Liên.',
        priceText: '~35.000đ - 70.000đ'
      }
    ]
  },
  {
    id: 'hue',
    name: 'Huế',
    province: 'Thừa Thiên Huế',
    region: 'Miền Trung',
    tag: 'Cố đô di sản & Dòng Sông Hương êm đềm',
    coverImage: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=1200&auto=format&fit=crop&q=80',
    summary: 'Cố đô Huế trầm mặc với quần thể Đại Nội Hoàng cung, lăng tẩm các vị vua triều Nguyễn, chùa Thiên Mụ và ẩm thực cung đình thanh nhã.',
    spotsCount: 6,
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
        tip: 'Thuê áo Nhật Bình hoặc Cổ phục cung đình chụp ảnh tại Cung Diên Thọ và Điện Kiến Trung.',
        priceText: '200.000đ vé Đại Nội'
      },
      {
        id: 'hue-spot-2',
        name: 'Chùa Thiên Mụ bên bờ Sông Hương',
        category: 'Di sản & Tâm linh',
        tag: 'Đệ nhất cổ tự xứ Huế hơn 400 năm',
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
        category: 'Di sản kiến trúc',
        tag: 'Đỉnh cao nghệ thuật ghép sành sứ',
        rating: 4.9,
        reviewsCount: 3980,
        address: 'Xã Thủy Bằng, Hương Thủy, Thừa Thiên Huế',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
        tip: 'Chiêm ngưỡng bức tranh Cửu Long Ẩn Vân trên trần cung Thiên Định và tượng đồng mạ vàng tinh xảo.',
        priceText: '150.000đ vé vào'
      },
      {
        id: 'hue-spot-4',
        name: 'Đồi Vọng Cảnh ngắm khúc quanh Sông Hương',
        category: 'Thiên nhiên & Hoàng hôn',
        tag: 'Góc ngắm sông Hương thơ mộng nhất',
        rating: 4.7,
        reviewsCount: 2200,
        address: '102 Huyền Trân Công Chúa, Thủy Biều, TP. Huế',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
        tip: 'Địa điểm lý tưởng để cắm trại nhẹ ngắm hoàng hôn đỏ ối rọi xuống dòng sông uốn lượn.',
        priceText: 'Miễn phí tham quan'
      },
      {
        id: 'hue-spot-5',
        name: 'Cầu Tràng Tiền & Ca Huế trên Sông Hương',
        category: 'Trải nghiệm & Văn hóa',
        tag: '12 nhịp cầu lịch sử đổi màu về đêm',
        rating: 4.8,
        reviewsCount: 3450,
        address: 'Đường Lê Lợi, Bến thuyền Tòa Khâm, TP. Huế',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
        tip: 'Đi thuyền rồng thả hoa đăng ước nguyện và nghe những làn điệu dân ca Huế xao xuyến.',
        priceText: '100.000đ/vé thuyền'
      },
      {
        id: 'hue-spot-6',
        name: 'Bún Bò Huế Mụ Rơi & Chè Hẻm Hùng Vương',
        category: 'Ẩm thực truyền thống',
        tag: 'Hương vị cay nồng đậm đà xứ Huế',
        rating: 4.8,
        reviewsCount: 2950,
        address: '40 Nguyễn Chí Diểu & Số 1 Kiệt 29 Hùng Vương',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
        tip: 'Tô bún bò giò heo chả cua thơm lừng mắm ruốc, tráng miệng bằng ly chè bột lọc bọc heo quay độc lạ.',
        priceText: '~40.000đ - 65.000đ'
      }
    ]
  },
  {
    id: 'hoian',
    name: 'Hội An',
    province: 'Quảng Nam',
    region: 'Miền Trung',
    tag: 'Phố cổ đèn lồng di sản UNESCO',
    coverImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&auto=format&fit=crop&q=80',
    summary: 'Hội An quyến rũ với những bức tường vàng hoa giấy, Chùa Cầu trăm năm tuổi, dòng sông Hoài hoa đăng lung linh và làng nghề truyền thống.',
    spotsCount: 5,
    spots: [
      {
        id: 'ha-spot-1',
        name: 'Phố Cổ Hội An & Chùa Cầu',
        category: 'Di sản & Văn hóa',
        tag: 'Biểu tượng lịch sử trên tờ tiền 20.000đ',
        rating: 4.9,
        reviewsCount: 15300,
        address: 'Khu phố cổ Hội An, Quảng Nam',
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80',
        tip: 'Dạo bộ khi phố lên đèn lồng lúc 18:30 - 20:30, thưởng thức nước Mót thảo mộc thanh mát.',
        priceText: '80.000đ vé trọn gói phố cổ'
      },
      {
        id: 'ha-spot-2',
        name: 'Rừng dừa Bảy Mẫu Cẩm Thanh',
        category: 'Trải nghiệm sông nước',
        tag: 'Múa thúng lắc vòng cảm giác mạnh',
        rating: 4.8,
        reviewsCount: 6200,
        address: 'Tổ 2, Thôn Vạn Lăng, Xã Cẩm Thanh, Hội An',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
        tip: 'Ngồi thuyền thúng len lỏi giữa rặng dừa xanh ngút ngàn và xem nghệ nhân xoay thúng điêu luyện.',
        priceText: '~150.000đ/thúng 2 người'
      },
      {
        id: 'ha-spot-3',
        name: 'Bến thuyền Sông Hoài thả hoa đăng',
        category: 'Lãng mạn & Đêm',
        tag: 'Dòng sông ngập tràn ánh đèn hoa đăng',
        rating: 4.9,
        reviewsCount: 7800,
        address: 'Bạch Đằng, Phường Minh An, Hội An',
        image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&auto=format&fit=crop&q=80',
        tip: 'Đi thuyền gỗ ngắm phố cổ phản chiếu lung linh trên mặt nước và gửi gắm điều ước.',
        priceText: '~100.000đ/thuyền'
      },
      {
        id: 'ha-spot-4',
        name: 'Biển An Bàng hoang sơ',
        category: 'Biển & Nghỉ dưỡng',
        tag: 'Bãi biển lọt top đẹp nhất châu Á',
        rating: 4.7,
        reviewsCount: 4200,
        address: 'Đường Hai Bà Trưng, Phường Cẩm An, Hội An',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
        tip: 'Thưởng thức nước dừa tươi tại The DeckHouse trong tiếng sóng vỗ bờ cát trắng.',
        priceText: 'Miễn phí tắm biển'
      },
      {
        id: 'ha-spot-5',
        name: 'Cơm gà Bà Buội & Bánh mì Phượng',
        category: 'Ẩm thực di sản',
        tag: 'Hương vị trứ danh thế giới',
        rating: 4.7,
        reviewsCount: 5900,
        address: '22 Phan Chu Trinh & 2B Phan Chu Trinh, Hội An',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
        tip: 'Cơm gà vàng óng thơm nghệ, thịt gà ta xé phay trộn rau răm dưa chua giòn rụm.',
        priceText: '~35.000đ - 65.000đ'
      }
    ]
  },
  {
    id: 'dalat',
    name: 'Đà Lạt',
    province: 'Lâm Đồng',
    region: 'Tây Nguyên',
    tag: 'Thành phố ngàn hoa & Săn mây đồi thông',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
    summary: 'Đà Lạt mộng mơ với khí hậu se lạnh quanh năm, những đồi thông reo trong gió, biển mây bồng bềnh và văn hóa cà phê chill độc đáo.',
    spotsCount: 5,
    spots: [
      {
        id: 'dl-spot-1',
        name: 'Hồ Xuân Hương & Quảng trường Lâm Viên',
        category: 'Biểu tượng & Dạo chơi',
        tag: 'Nụ hoa Atiso khổng lồ & Hồ nước êm đềm',
        rating: 4.9,
        reviewsCount: 9800,
        address: 'Đường Trần Quốc Toản, Phường 1, Đà Lạt',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
        tip: 'Thuê xe đạp đôi quanh hồ buổi chiều tà khi ánh đèn hoàng hôn buông xuống.',
        priceText: 'Miễn phí tham quan'
      },
      {
        id: 'dl-spot-2',
        name: 'Đồi chè Cầu Đất & Thảm gỗ săn mây',
        category: 'Thiên nhiên & Sống ảo',
        tag: 'Biển mây cuồn cuộn lúc bình minh',
        rating: 4.8,
        reviewsCount: 7400,
        address: 'Thôn Cầu Đất, Xã Xuân Trường, Đà Lạt',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
        tip: 'Khởi hành từ trung tâm lúc 4:30 sáng để kịp có mặt đón bình minh trên thảm gỗ 5:45.',
        priceText: '120.000đ vé vào cổng + cafe'
      },
      {
        id: 'dl-spot-3',
        name: 'Thác Datanla (Máng trượt dài nhất ĐNA)',
        category: 'Mạo hiểm & Trải nghiệm',
        tag: 'Trượt máng xuyên qua rừng thông nguyên sinh',
        rating: 4.8,
        reviewsCount: 6800,
        address: 'Quốc lộ 20, Đèo Prenn, Phường 3, Đà Lạt',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
        tip: 'Thử thách trò trượt Alpine Coaster 2.400m và canyoning đu dây vượt thác bọt tung trắng xóa.',
        priceText: '~180.000đ/vé khứ hồi'
      },
      {
        id: 'dl-spot-4',
        name: 'Chợ đêm Đà Lạt & Cây số 0',
        category: 'Ẩm thực & Đêm',
        tag: 'Bánh tráng nướng & Sữa đậu nành nóng',
        rating: 4.6,
        reviewsCount: 8200,
        address: 'Khu Hoà Bình, Phường 1, Đà Lạt',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
        tip: 'Ngồi bậc thang nhâm nhi bánh tráng nướng trứng xúc xích phô mai giữa cái lạnh 16 độ C.',
        priceText: '~30.000đ - 60.000đ'
      },
      {
        id: 'dl-spot-5',
        name: 'Ga xe lửa cổ Đà Lạt',
        category: 'Kiến trúc & Di sản',
        tag: 'Ga xe lửa đẹp nhất Đông Dương',
        rating: 4.7,
        reviewsCount: 4500,
        address: 'Số 1 Quang Trung, Phường 10, Đà Lạt',
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80',
        tip: 'Tạo dáng bên đầu tàu hơi nước cổ kính và mua vé tàu hỏa trải nghiệm xuống Trại Mát.',
        priceText: '50.000đ vé vào'
      }
    ]
  },
  {
    id: 'phuquoc',
    name: 'Phú Quốc',
    province: 'Kiên Giang',
    region: 'Miền Nam',
    tag: 'Đảo Ngọc thiên đường biển nhiệt đới',
    coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=80',
    summary: 'Đảo Ngọc Phú Quốc sở hữu những bờ cát trắng mịn như kem, làn nước ngọc bích trong vắt, cáp treo vượt biển kỷ lục Guinness và hải sản tươi rói.',
    spotsCount: 5,
    spots: [
      {
        id: 'pq-spot-1',
        name: 'Cáp treo Sun World Hòn Thơm',
        category: 'Kỷ lục & Toàn cảnh',
        tag: 'Cáp treo 3 dây vượt biển dài nhất thế giới (7.899m)',
        rating: 4.9,
        reviewsCount: 8700,
        address: 'Bãi Đất Đỏ, Thị trấn An Thới, Phú Quốc',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
        tip: 'Từ cabin trên cao ngắm nhìn toàn bộ làng chài An Thới và những chiếc tàu đánh cá rực rỡ.',
        priceText: 'Combo cáp treo ~600.000đ'
      },
      {
        id: 'pq-spot-2',
        name: 'Bãi Sao Phú Quốc',
        category: 'Biển & Nghỉ dưỡng',
        tag: 'Bãi cát trắng mịn như kem & Cây dừa đổ',
        rating: 4.8,
        reviewsCount: 7100,
        address: 'Ấp Bãi Sao, An Thới, Phú Quốc',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
        tip: 'Nước biển êm ả thoai thoải rất an toàn cho gia đình, góc chụp cây dừa cong vươn ra biển.',
        priceText: 'Miễn phí tắm biển'
      },
      {
        id: 'pq-spot-3',
        name: 'Sunset Sanato Beach Club',
        category: 'Check-in & Hoàng hôn',
        tag: 'Hoàng hôn voi chân dài siêu thực',
        rating: 4.7,
        reviewsCount: 6500,
        address: 'Bãi Trường, Dương Tơ, Phú Quốc',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
        tip: 'Khung giờ vàng 17:15 - 18:00 để bắt trọn quả cầu lửa lặn xuống giữa tượng đầu người.',
        priceText: 'Vé vào cổng 100.000đ'
      },
      {
        id: 'pq-spot-4',
        name: 'Thị trấn Hoàng Hôn (Sunset Town) & Cầu Hôn',
        category: 'Kiến trúc & Nghệ thuật',
        tag: 'Cầu Hôn Kiss Bridge & Show Kiss of the Sea',
        rating: 4.9,
        reviewsCount: 5400,
        address: 'Bờ Tây Nam đảo Phú Quốc, An Thới',
        image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&auto=format&fit=crop&q=80',
        tip: 'Dạo bước trên cây cầu không chạm nhau và xem pháo hoa rực rỡ mỗi tối lúc 21:30.',
        priceText: 'Vé lên cầu ~100.000đ'
      },
      {
        id: 'pq-spot-5',
        name: 'Bún Quậy Kiến Xây & Chợ đêm Phú Quốc',
        category: 'Ẩm thực độc bản',
        tag: 'Tự pha nước chấm bún quậy nóng hổi',
        rating: 4.8,
        reviewsCount: 4900,
        address: '28 Bạch Đằng, Dương Đông, Phú Quốc',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
        tip: 'Tô bún tươi chả tôm mực quậy trực tiếp trong nước dùng ngọt thanh nóng hổi.',
        priceText: '~55.000đ - 75.000đ/tô'
      }
    ]
  },
  {
    id: 'hanoi',
    name: 'Hà Nội',
    province: 'Hà Nội',
    region: 'Miền Bắc',
    tag: 'Thủ đô ngàn năm văn hiến',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
    summary: 'Hà Nội lắng đọng nét cổ kính 36 phố phường, Hồ Gươm bảng lảng sương sớm, Văn Miếu uy nghiêm và nền ẩm thực phố cổ đậm đà bản sắc.',
    spotsCount: 5,
    spots: [
      {
        id: 'hn-spot-1',
        name: 'Hồ Hoàn Kiếm & Đền Ngọc Sơn',
        category: 'Di sản & Biểu tượng',
        tag: 'Trái tim của Thủ đô Hà Nội',
        rating: 4.9,
        reviewsCount: 18200,
        address: 'Đinh Tiên Hoàng, Hàng Trống, Hoàn Kiếm, Hà Nội',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
        tip: 'Cầu Thê Húc đỏ son dẫn vào đền Ngọc Sơn rực rỡ nhất khi đón ánh nắng sớm mùa thu.',
        priceText: 'Vé Đền Ngọc Sơn 30.000đ'
      },
      {
        id: 'hn-spot-2',
        name: 'Văn Miếu — Quốc Tử Giám',
        category: 'Di sản & Giáo dục',
        tag: 'Trường đại học đầu tiên của Việt Nam',
        rating: 4.8,
        reviewsCount: 9200,
        address: '58 Quốc Tử Giám, Văn Miếu, Đống Đa, Hà Nội',
        image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=600&auto=format&fit=crop&q=80',
        tip: 'Khuê Văn Các cổ kính và 82 bia Tiến sĩ vinh danh truyền thống hiếu học ngàn đời.',
        priceText: '30.000đ vé vào'
      },
      {
        id: 'hn-spot-3',
        name: 'Phố Cổ Hà Nội 36 Phố Phường',
        category: 'Văn hóa & Dạo bộ',
        tag: 'Nét rêu phong nghìn năm',
        rating: 4.8,
        reviewsCount: 14000,
        address: 'Khu vực Hoàn Kiếm, Hà Nội',
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80',
        tip: 'Khám phá Hàng Mã rực rỡ sắc màu, Hàng Bạc chế tác trang sức và ngõ chợ Đồng Xuân.',
        priceText: 'Miễn phí tham quan'
      },
      {
        id: 'hn-spot-4',
        name: 'Hoàng Thành Thăng Long',
        category: 'Di sản thế giới',
        tag: 'Dấu tích kinh đô qua nhiều triều đại',
        rating: 4.8,
        reviewsCount: 6100,
        address: '19C Hoàng Diệu, Điện Biên, Ba Đình, Hà Nội',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
        tip: 'Đoan Môn cổ kính và khu khảo cổ 18 Hoàng Diệu với hàng ngàn hiện vật quý hiếm.',
        priceText: '30.000đ vé người lớn'
      },
      {
        id: 'hn-spot-5',
        name: 'Cà phê Trứng Giảng & Phở Bát Đàn',
        category: 'Ẩm thực phố cổ',
        tag: 'Hương vị cà phê trứng béo ngậy độc nhất',
        rating: 4.9,
        reviewsCount: 7600,
        address: '39 Nguyễn Hữu Huân & 49 Bát Đàn, Hoàn Kiếm',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
        tip: 'Ly cà phê trứng nóng hổi được ủ trong bát nước ấm thơm ngậy nức lòng du khách.',
        priceText: '~35.000đ - 65.000đ'
      }
    ]
  },
  {
    id: 'sapa',
    name: 'Sa Pa',
    province: 'Lào Cai',
    region: 'Miền Bắc',
    tag: 'Nóc nhà Đông Dương & Bản làng sương mù',
    coverImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&auto=format&fit=crop&q=80',
    summary: 'Sa Pa chìm trong biển mây với đỉnh Fansipan hùng vĩ cao 3.143m, những thửa ruộng bậc thang kỳ vĩ và nét văn hóa thổ cẩm đặc sắc của đồng bào.',
    spotsCount: 5,
    spots: [
      {
        id: 'sp-spot-1',
        name: 'Đỉnh Fansipan — Sun World Fansipan Legend',
        category: 'Kỷ lục & Cảnh quan',
        tag: 'Nóc nhà Đông Dương độ cao 3.143m',
        rating: 4.9,
        reviewsCount: 11200,
        address: 'Thị xã Sa Pa, Lào Cai',
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80',
        tip: 'Nên chọn khung giờ từ 9:30 đến 11:30 để mây tan, nắng chiếu rực rỡ tượng Phật A Di Đà.',
        priceText: 'Vé cáp treo ~850.000đ'
      },
      {
        id: 'sp-spot-2',
        name: 'Bản Cát Cát của người H’Mông',
        category: 'Văn hóa bản làng',
        tag: 'Cối xay nước & Nhà gỗ truyền thống',
        rating: 4.7,
        reviewsCount: 8400,
        address: 'Xã Hoàng Liên, Thị xã Sa Pa',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
        tip: 'Thuê trang phục dân tộc thổ cẩm để check-in bên thác nước Tiên Sa và bánh xe nước khổng lồ.',
        priceText: '150.000đ vé vào cổng'
      },
      {
        id: 'sp-spot-3',
        name: 'Đèo Ô Quy Hồ & Cổng Trời Sa Pa',
        category: 'Tứ đại đỉnh đèo',
        tag: 'Hoàng hôn đỉnh đèo hùng vĩ nhất Tây Bắc',
        rating: 4.9,
        reviewsCount: 5300,
        address: 'Quốc lộ 4D, ranh giới Lào Cai — Lai Châu',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
        tip: 'Khoảnh khắc mặt trời đỏ rực lặn sau rặng Hoàng Liên Sơn nhìn từ Cây Cô Đơn Ô Quy Hồ.',
        priceText: 'Miễn phí ngắm cảnh'
      },
      {
        id: 'sp-spot-4',
        name: 'Thung lũng Mường Hoa & Ruộng bậc thang',
        category: 'Thiên nhiên tuyệt mỹ',
        tag: 'Bãi đá cổ Sa Pa & Suối Mường Hoa',
        rating: 4.8,
        reviewsCount: 4600,
        address: 'Xã Hầu Thào, Sa Pa',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
        tip: 'Mùa lúa chín tháng 9 - 10 thung lũng khoác lên tấm áo vàng óng ả đẹp nao lòng.',
        priceText: '80.000đ vé vào'
      },
      {
        id: 'sp-spot-5',
        name: 'Lẩu cá hồi cá tầm & Thắng cố Sa Pa',
        category: 'Ẩm thực phố núi',
        tag: 'Cá hồi tươi rói nước lẩu măng chua cay',
        rating: 4.8,
        reviewsCount: 5100,
        address: 'Đường Xuân Viên, Thị xã Sa Pa',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
        tip: 'Thưởng thức nồi lẩu bốc khói nghi ngút cùng đĩa rau cải mèo xanh giòn giữa tiết trời se lạnh.',
        priceText: '~180.000đ/người'
      }
    ]
  },
  {
    id: 'ninhbinh',
    name: 'Ninh Bình',
    province: 'Ninh Bình',
    region: 'Miền Bắc',
    tag: 'Tràng An di sản thế giới & Hang Múa',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
    summary: 'Ninh Bình — "Vịnh Hạ Long trên cạn" với những dãy núi đá vôi sừng sững bên sông nước Tràng An, Tam Cốc mộng mơ và đỉnh Ngọa Long kỳ ảo.',
    spotsCount: 4,
    spots: [
      {
        id: 'nb-spot-1',
        name: 'Quần thể danh thắng Tràng An',
        category: 'Di sản thế giới kép UNESCO',
        tag: 'Chèo thuyền qua các hang động xuyên thủy',
        rating: 4.9,
        reviewsCount: 14200,
        address: 'Tràng An, Hoa Lư, Ninh Bình',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
        tip: 'Tuyến thuyền số 3 đưa du khách qua Hang Mây dài 1km và phim trường Đảo Đầu Lâu.',
        priceText: '250.000đ/vé thuyền'
      },
      {
        id: 'nb-spot-2',
        name: 'Hang Múa & Đỉnh Ngọa Long',
        category: 'Check-in & Toàn cảnh',
        tag: 'Gần 500 bậc thang đá ngắm trọn Tam Cốc',
        rating: 4.9,
        reviewsCount: 8900,
        address: 'Thôn Khê Hạ, Xã Ninh Xuân, Hoa Lư',
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80',
        tip: 'Leo lên đỉnh rồng lúc bình minh hoặc chiều muộn để ngắm trọn cánh đồng lúa chín vàng.',
        priceText: '100.000đ vé vào'
      },
      {
        id: 'nb-spot-3',
        name: 'Chùa Bái Đính kỷ lục châu Á',
        category: 'Tâm linh & Kiến trúc',
        tag: 'Bảo tháp cao nhất Đông Nam Á',
        rating: 4.8,
        reviewsCount: 7800,
        address: 'Xã Gia Sinh, Gia Viễn, Ninh Bình',
        image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=600&auto=format&fit=crop&q=80',
        tip: 'Hành lang 500 vị La Hán bằng đá xanh nguyên khối và chuông đồng lớn nhất Việt Nam.',
        priceText: 'Xe điện 30.000đ/lượt'
      },
      {
        id: 'nb-spot-4',
        name: 'Cơm cháy chà bông & Thịt dê núi Ninh Bình',
        category: 'Đặc sản địa phương',
        tag: 'Dê núi tái chanh & Cơm cháy nước sốt tim cật',
        rating: 4.8,
        reviewsCount: 5300,
        address: 'Khu vực Hoa Lư & TP. Ninh Bình',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
        tip: 'Miếng cơm cháy giòn rụm chấm nước sốt đậm đà, thịt dê núi thơm chắc thịt không hề bị hôi.',
        priceText: '~120.000đ - 180.000đ/người'
      }
    ]
  },
  {
    id: 'halong',
    name: 'Hạ Long',
    province: 'Quảng Ninh',
    region: 'Miền Bắc',
    tag: 'Kỳ quan thiên nhiên thế giới UNESCO',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
    summary: 'Vịnh Hạ Long với hàng ngàn hòn đảo đá vôi nhấp nhô trên mặt biển xanh lục bảo, hệ thống hang động thạch nhũ lung linh và du thuyền sang trọng.',
    spotsCount: 4,
    spots: [
      {
        id: 'hl-spot-1',
        name: 'Vịnh Hạ Long & Hang Sửng Sốt',
        category: 'Kỳ quan thiên nhiên',
        tag: 'Hàng ngàn đảo đá vôi & Thạch nhũ triệu năm',
        rating: 4.9,
        reviewsCount: 16800,
        address: 'Vịnh Hạ Long, TP. Hạ Long, Quảng Ninh',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
        tip: 'Đi tàu tham quan tuyến 2 qua Hòn Trống Mái, Hang Sửng Sốt và Đảo Ti Tốp tắm biển.',
        priceText: '290.000đ vé tham quan + tàu'
      },
      {
        id: 'hl-spot-2',
        name: 'Đảo Ti Tốp ngắm toàn cảnh Vịnh',
        category: 'Toàn cảnh & Biển',
        tag: 'Đỉnh ngắm vịnh Hạ Long 360 độ đẹp nhất',
        rating: 4.8,
        reviewsCount: 9200,
        address: 'Vịnh Hạ Long, Quảng Ninh',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
        tip: 'Leo khoảng 400 bậc thang lên chòi ngắm cảnh trên đỉnh đảo để chụp toàn cảnh vịnh ngoạn mục.',
        priceText: 'Bao gồm trong vé tuyến 2'
      },
      {
        id: 'hl-spot-3',
        name: 'Bảo tàng Quảng Ninh',
        category: 'Kiến trúc & Văn hóa',
        tag: 'Viên ngọc đen bên bờ vịnh Hạ Long',
        rating: 4.9,
        reviewsCount: 7500,
        address: 'Trần Quốc Nghiễn, Tuần Châu, TP. Hạ Long',
        image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=600&auto=format&fit=crop&q=80',
        tip: 'Tòa nhà lắp kính đen tuyền phản chiếu bầu trời là background check-in cực chất của giới trẻ.',
        priceText: '40.000đ vé vào'
      },
      {
        id: 'hl-spot-4',
        name: 'Chả mực giã tay & Bún bề bề Hạ Long',
        category: 'Ẩm thực biển',
        tag: 'Chả mực giòn sần sật nức tiếng',
        rating: 4.8,
        reviewsCount: 5800,
        address: 'Chợ Hạ Long 1 & Phố ẩm thực Bãi Cháy',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
        tip: 'Miếng chả mực giã tay rán vàng ươm ăn kèm bánh cuốn nóng và bát bún bề bề ngọt lịm.',
        priceText: '~45.000đ - 70.000đ'
      }
    ]
  },
  {
    id: 'nhatrang',
    name: 'Nha Trang',
    province: 'Khánh Hòa',
    region: 'Miền Trung',
    tag: 'Vịnh biển đẹp bậc nhất thế giới',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
    summary: 'Nha Trang ngập tràn ánh nắng nhiệt đới với bờ biển cát vàng trải dài, các hòn đảo lặn ngắm san hô rực rỡ và thiên đường vui chơi VinWonders.',
    spotsCount: 4,
    spots: [
      {
        id: 'nt-spot-1',
        name: 'VinWonders Nha Trang (Đảo Hòn Tre)',
        category: 'Khu vui chơi & Cáp treo',
        tag: 'Thiên đường giải trí hàng đầu Đông Nam Á',
        rating: 4.9,
        reviewsCount: 13500,
        address: 'Đảo Hòn Tre, Vĩnh Nguyên, Nha Trang',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
        tip: 'Trải nghiệm vòng xoay bánh xe khổng lồ ngắm vịnh biển và xem show diễn thực cảnh Tata Show.',
        priceText: 'Vé trọn gói ~800.000đ'
      },
      {
        id: 'nt-spot-2',
        name: 'Tháp Bà Ponagar nghìn năm',
        category: 'Di sản & Văn hóa Chăm',
        tag: 'Quần thể tháp Chăm Pa cổ kính bên sông Cái',
        rating: 4.8,
        reviewsCount: 8100,
        address: 'Đường 2/4, Vĩnh Phước, Nha Trang',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
        tip: 'Thưởng thức điệu múa Chăm Pa uyển chuyển của các nghệ nhân trong tiếng trống Gi-năng rộn rã.',
        priceText: '30.000đ vé vào'
      },
      {
        id: 'nt-spot-3',
        name: 'Hòn Tằm tắm bùn khoáng trên đảo',
        category: 'Nghỉ dưỡng & Spa',
        tag: 'Khu tắm bùn khoáng biển lớn nhất Việt Nam',
        rating: 4.8,
        reviewsCount: 6200,
        address: 'Đảo Hòn Tằm, Vịnh Nha Trang',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
        tip: 'Ngâm mình trong bồn bùn khoáng nóng nhìn ra vịnh biển xanh ngắt giúp thư giãn phục hồi cơ thể.',
        priceText: 'Combo tắm bùn ~450.000đ'
      },
      {
        id: 'nt-spot-4',
        name: 'Nem nướng Đặng Văn Quyên & Bún sứa',
        category: 'Ẩm thực địa phương',
        tag: 'Nem nướng lụi cuốn bánh tráng ram giòn',
        rating: 4.8,
        reviewsCount: 5400,
        address: '16A Lãn Ông & 87 Hoàng Văn Thụ, Nha Trang',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
        tip: 'Cuốn nem lụi thơm phức với bánh tráng chiên giòn, xoài non và chấm nước sốt tương đậu bí truyền.',
        priceText: '~60.000đ/suất'
      }
    ]
  },
  {
    id: 'hagiang',
    name: 'Hà Giang',
    province: 'Hà Giang',
    region: 'Miền Bắc',
    tag: 'Đèo Mã Pí Lèng & Dòng Sông Nho Quế',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
    summary: 'Hà Giang hùng vĩ với Công viên địa chất Cao nguyên đá Đồng Văn, đèo Mã Pí Lèng huyền thoại và dòng sông Nho Quế màu ngọc bích xẻ dọc hẻm vực Tu Sản.',
    spotsCount: 4,
    spots: [
      {
        id: 'hg-spot-1',
        name: 'Đèo Mã Pí Lèng & Panorama',
        category: 'Tứ đại đỉnh đèo',
        tag: 'Cung đường đèo hiểm trở và ngoạn mục nhất',
        rating: 5.0,
        reviewsCount: 9600,
        address: 'Quốc lộ 4C, Huyện Mèo Vạc, Hà Giang',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
        tip: 'Dừng chân ngắm vực sâu hun hút và dòng sông Nho Quế mềm như sợi chỉ xanh dưới chân đèo.',
        priceText: 'Tự do trải nghiệm miễn phí'
      },
      {
        id: 'hg-spot-2',
        name: 'Hẻm vực Tu Sản & Chèo thuyền Sông Nho Quế',
        category: 'Kỳ quan địa chất',
        tag: 'Hẻm vực sâu nhất Đông Nam Á',
        rating: 4.9,
        reviewsCount: 8800,
        address: 'Huyện Mèo Vạc, Hà Giang',
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=80',
        tip: 'Đi thuyền máy hoặc tự chèo SUP lướt giữa hai vách đá vôi dựng đứng cao hàng trăm mét.',
        priceText: '120.000đ vé thuyền'
      },
      {
        id: 'hg-spot-3',
        name: 'Cột cờ Quốc gia Lũng Cú',
        category: 'Linh thiêng & Địa đầu',
        tag: 'Điểm cực Bắc thiêng liêng của Tổ quốc',
        rating: 4.9,
        reviewsCount: 7100,
        address: 'Xã Lũng Cú, Huyện Đồng Văn, Hà Giang',
        image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=600&auto=format&fit=crop&q=80',
        tip: 'Lá cờ Tổ quốc rộng 54m2 tượng trưng cho 54 dân tộc anh em bay phấp phới trên đỉnh núi Rồng.',
        priceText: '25.000đ vé vào'
      },
      {
        id: 'hg-spot-4',
        name: 'Dinh thự họ Vương (Vua Mèo)',
        category: 'Kiến trúc & Lịch sử',
        tag: 'Dinh thự đá tiền tỷ giữa thung lũng Sà Phìn',
        rating: 4.8,
        reviewsCount: 5200,
        address: 'Xã Sà Phìn, Huyện Đồng Văn, Hà Giang',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80',
        tip: 'Kiến trúc kết hợp độc đáo giữa người Mông, phong kiến Trung Hoa và phong cách Pháp cổ.',
        priceText: '20.000đ vé vào'
      }
    ]
  },
  {
    id: 'hcm',
    name: 'TP. Hồ Chí Minh',
    province: 'TP. Hồ Chí Minh',
    region: 'Miền Nam',
    tag: 'Đô thị sầm uất & Hòn ngọc Viễn Đông',
    coverImage: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&auto=format&fit=crop&q=80',
    summary: 'Sài Gòn năng động, giao thoa giữa những công trình kiến trúc Pháp cổ kính, tòa nhà chọc trời hiện đại và nhịp sống ẩm thực đường phố sôi động xuyên đêm.',
    spotsCount: 4,
    spots: [
      {
        id: 'hcm-spot-1',
        name: 'Dinh Độc Lập & Nhà thờ Đức Bà',
        category: 'Di sản & Biểu tượng',
        tag: 'Chứng tích lịch sử giữa trung tâm thành phố',
        rating: 4.8,
        reviewsCount: 16500,
        address: '135 Nam Kỳ Khởi Nghĩa, Bến Thành, Quận 1',
        image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=600&auto=format&fit=crop&q=80',
        tip: 'Tham quan hệ thống hầm ngầm thời chiến và ngồi uống cà phê bệt ngắm Bưu điện Thành phố.',
        priceText: '40.000đ vé Dinh Độc Lập'
      },
      {
        id: 'hcm-spot-2',
        name: 'Chợ Bến Thành & Phố đi bộ Nguyễn Huệ',
        category: 'Văn hóa & Mua sắm',
        tag: 'Biểu tượng trăm năm của đất Sài Gòn',
        rating: 4.7,
        reviewsCount: 14200,
        address: 'Đường Lê Lợi, Bến Thành, Quận 1',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
        tip: 'Dạo phố đi bộ buổi tối đón gió sông Sài Gòn và xem trình diễn nhạc nước.',
        priceText: 'Tự do tham quan'
      },
      {
        id: 'hcm-spot-3',
        name: 'Đài quan sát Landmark 81 SkyView',
        category: 'Hiện đại & Toàn cảnh',
        tag: 'Tòa nhà cao nhất Việt Nam (461m)',
        rating: 4.8,
        reviewsCount: 8900,
        address: '720A Điện Biên Phủ, Phường 22, Bình Thạnh',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
        tip: 'Ngắm nhìn toàn cảnh thành phố rực sáng ánh đèn từ độ cao hơn 380m qua sàn kính trong suốt.',
        priceText: 'Vé SkyView ~420.000đ'
      },
      {
        id: 'hcm-spot-4',
        name: 'Cơm tấm sườn bì chả & Cà phê sữa đá Sài Gòn',
        category: 'Ẩm thực đường phố',
        tag: 'Món ăn quốc dân gắn liền với đời sống',
        rating: 4.9,
        reviewsCount: 9100,
        address: 'Cơm tấm Ba Ghiền Đặng Văn Ngữ & Các quán vỉa hè',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
        tip: 'Dĩa cơm tấm sườn nướng mỡ hành thơm phức kèm ly cà phê sữa đá nhiều đá ngọt béo đậm vị.',
        priceText: '~40.000đ - 75.000đ'
      }
    ]
  }
];

export function getDestinationsCatalog(): DestinationItem[] {
  return DESTINATION_CATALOG;
}
