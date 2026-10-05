import React, { useState, useMemo } from 'react';
import {
  Search,
  Star,
  MapPin,
  Compass,
  Check,
  Calendar,
  X,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Share2,
  Clock,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  Send,
  SlidersHorizontal,
  ExternalLink,
  BookOpen,
  Filter,
  User
} from 'lucide-react';
import { DESTINATION_CATALOG, DestinationItem } from '../data/destinationCatalog';
import { ExploreSpotItem } from '../data/destinationExploreData';

// Normalized Blog Article Model
export interface BlogArticleItem {
  id: string;
  name: string;
  categoryType: 'food' | 'landmark' | 'cafe' | 'nature' | 'stay';
  categoryLabel: string;
  destName: string;
  province: string;
  region: 'Miền Bắc' | 'Miền Trung' | 'Miền Nam' | 'Tây Nguyên';
  tag: string;
  rating: number;
  reviewsCount: number;
  address: string;
  image: string;
  priceText: string;
  tip: string;
  author: string;
  publishDate: string;
  readTime: string;
  highlights: string[];
  articleBody: string[];
  reviews: {
    id: string;
    authorName: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
    likes: number;
  }[];
}

interface ExploreViewProps {
  currentDestination?: string | null;
  onAddSpotToItinerary?: (spot: ExploreSpotItem) => void;
  onSwitchToItinerary?: () => void;
  onCreateItineraryForDestination?: (destinationName: string) => void;
}

// Transform spots into full blog articles
const generateBlogArticles = (): BlogArticleItem[] => {
  const articles: BlogArticleItem[] = [];

  const authors = [
    'Minh Anh (Food & Travel Blogger)',
    'Hoàng Long (Cẩm Nang Khám Phá)',
    'Thùy Chi (Reviewer Du Lịch)',
    'Vũ Tuấn (Bản Đồ Ẩm Thực)',
    'Lê Trang (Check-in Việt Nam)',
    'Ngọc Hải (Ký Sự Xê Dịch)',
  ];

  DESTINATION_CATALOG.forEach((dest, destIdx) => {
    dest.spots.forEach((spot, spotIdx) => {
      const catLower = (spot.category + ' ' + spot.name + ' ' + spot.tag).toLowerCase();
      let categoryType: BlogArticleItem['categoryType'] = 'landmark';
      let categoryLabel = 'Địa danh & Di tích';

      if (catLower.includes('ẩm thực') || catLower.includes('quán') || catLower.includes('nhà hàng') || catLower.includes('bánh') || catLower.includes('phở') || catLower.includes('cơm') || catLower.includes('ăn')) {
        categoryType = 'food';
        categoryLabel = 'Quán ăn & Nhà hàng';
      } else if (catLower.includes('cafe') || catLower.includes('cà phê') || catLower.includes('trà')) {
        categoryType = 'cafe';
        categoryLabel = 'Cà phê & Không gian đẹp';
      } else if (catLower.includes('biển') || catLower.includes('núi') || catLower.includes('thác') || catLower.includes('thiên nhiên') || catLower.includes('đồi')) {
        categoryType = 'nature';
        categoryLabel = 'Cảnh quan & Thiên nhiên';
      } else if (catLower.includes('nghỉ dưỡng') || catLower.includes('khách sạn') || catLower.includes('resort')) {
        categoryType = 'stay';
        categoryLabel = 'Nghỉ dưỡng & Lưu trú';
      }

      const author = authors[(destIdx * 7 + spotIdx) % authors.length];
      const readTime = `${3 + ((spotIdx + destIdx) % 4)} phút đọc`;

      const highlights = [
        `Khung cảnh ấn tượng, rất thích hợp chụp ảnh check-in và trải nghiệm`,
        `Vị trí thuận tiện tại ${dest.name}, dễ dàng di chuyển bằng xe máy hoặc taxi`,
        spot.tip || `Không gian đậm đà bản sắc địa phương, phục vụ chu đáo`,
      ];

      const articleBody = [
        `${spot.name} là một trong những điểm dừng chân nổi tiếng bậc nhất khi ghé thăm ${dest.name}. Nơi đây thu hút đông đảo du khách trong nước lẫn quốc tế nhờ ${spot.tag.toLowerCase()} và vẻ đẹp độc đáo khó lẫn.`,
        `Đến đây, bạn không chỉ được đắm mình vào không gian đặc trưng của ${dest.province} mà còn có cơ hội cảm nhận rõ nét nhịp sống, văn hóa và sự hiếu khách của người dân địa phương. Mức giá tại đây dao động khoảng ${spot.priceText}, rất tương xứng với chất lượng trải nghiệm nhận được.`,
        `Kinh nghiệm thực tế từ các du khách: ${spot.tip} Bạn nên chuẩn bị máy ảnh đầy pin và ghé thăm vào buổi sáng sớm hoặc hoàng hôn để có những góc ảnh đẹp nhất.`,
      ];

      const reviews = [
        {
          id: `rev-${spot.id}-1`,
          authorName: 'Nguyễn Thanh Tùng',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
          rating: 5,
          date: '3 ngày trước',
          comment: `Trải nghiệm tại ${spot.name} thực sự vượt ngoài mong đợi! Không gian thoáng đãng, nhân viên hỗ trợ nhiệt tình. Rất xứng đáng 5 sao.`,
          likes: 24,
        },
        {
          id: `rev-${spot.id}-2`,
          authorName: 'Phạm Thu Thảo',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
          rating: 5,
          date: '1 tuần trước',
          comment: `Địa điểm cực đẹp, đúng như cẩm nang review. Mình đi vào tầm chiều mát nên chụp được rất nhiều ảnh ưng ý. Chắc chắn sẽ quay lại!`,
          likes: 18,
        },
        {
          id: `rev-${spot.id}-3`,
          authorName: 'Đặng Tuấn Anh',
          avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
          rating: 4.8,
          date: '2 tuần trước',
          comment: `Chất lượng dịch vụ tốt, giá cả niêm yết rõ ràng (${spot.priceText}). Mọi người lưu ý lời khuyên: ${spot.tip.slice(0, 50)}... rất hữu ích.`,
          likes: 12,
        },
      ];

      articles.push({
        id: spot.id,
        name: spot.name,
        categoryType,
        categoryLabel,
        destName: dest.name,
        province: dest.province,
        region: dest.region,
        tag: spot.tag,
        rating: spot.rating,
        reviewsCount: spot.reviewsCount,
        address: spot.address,
        image: spot.image,
        priceText: spot.priceText,
        tip: spot.tip,
        author,
        publishDate: 'Tháng 10/2026',
        readTime,
        highlights,
        articleBody,
        reviews,
      });
    });
  });

  return articles;
};

export const ExploreView: React.FC<ExploreViewProps> = () => {
  const allArticles = useMemo(() => generateBlogArticles(), []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('Tất cả');
  const [selectedDestination, setSelectedDestination] = useState<string>('Tất cả');
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'newest'>('rating');

  // Active Reading Article Modal
  const [readingArticle, setReadingArticle] = useState<BlogArticleItem | null>(null);

  // Bookmarked articles set
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  // Interactive Review Input State in reader modal
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [submittedReviews, setSubmittedReviews] = useState<Record<string, { name: string; rating: number; comment: string; date: string }[]>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleBookmark = (id: string, name: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast(`Đã bỏ lưu bài viết "${name}"`);
      } else {
        next.add(id);
        showToast(`Đã lưu bài viết "${name}" vào mục yêu thích`);
      }
      return next;
    });
  };

  // Category options
  const categoryFilters = [
    { id: 'all', label: 'Tất cả bài viết' },
    { id: 'landmark', label: '🏛️ Địa danh & Di tích' },
    { id: 'food', label: '🍲 Quán ăn & Nhà hàng' },
    { id: 'cafe', label: '☕ Cafe & Không gian' },
    { id: 'nature', label: '🏖️ Cảnh quan & Biển' },
    { id: 'stay', label: '🏨 Nghỉ dưỡng' },
  ];

  const regions = ['Tất cả', 'Miền Bắc', 'Miền Trung', 'Tây Nguyên', 'Miền Nam'];

  const popularDestinations = [
    'Tất cả',
    'Hà Nội',
    'Đà Nẵng',
    'Hội An',
    'Huế',
    'Sa Pa',
    'Hạ Long',
    'Đà Lạt',
    'Phú Quốc',
    'Ninh Bình',
    'TP. Hồ Chí Minh',
    'Quy Nhơn',
  ];

  // Filtered & Sorted Articles
  const filteredArticles = useMemo(() => {
    let list = [...allArticles];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (art) =>
          art.name.toLowerCase().includes(q) ||
          art.destName.toLowerCase().includes(q) ||
          art.province.toLowerCase().includes(q) ||
          art.address.toLowerCase().includes(q) ||
          art.tag.toLowerCase().includes(q) ||
          art.categoryLabel.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter((art) => art.categoryType === selectedCategory);
    }

    // Region filter
    if (selectedRegion !== 'Tất cả') {
      list = list.filter((art) => art.region === selectedRegion);
    }

    // Destination filter
    if (selectedDestination !== 'Tất cả') {
      list = list.filter((art) => art.destName.toLowerCase().includes(selectedDestination.toLowerCase()));
    }

    // Sort
    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'reviews') {
      list.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return list;
  }, [allArticles, searchQuery, selectedCategory, selectedRegion, selectedDestination, sortBy]);

  // Handle user submitting a review in modal
  const handleAddReview = () => {
    if (!readingArticle || !newReviewComment.trim()) return;

    const newRev = {
      name: 'Bạn (Du khách)',
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      date: 'Vừa xong',
    };

    setSubmittedReviews((prev) => ({
      ...prev,
      [readingArticle.id]: [newRev, ...(prev[readingArticle.id] || [])],
    }));

    setNewReviewComment('');
    showToast('Cảm ơn bạn! Đánh giá & nhận xét đã được đăng tải thành công.');
  };

  return (
    <div className="space-y-4 pb-20 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white text-xs font-bold px-4 py-2 rounded-2xl shadow-2xl border border-sky-500/40 animate-in fade-in slide-in-from-top-2">
          {toastMessage}
        </div>
      )}

      {/* Editorial Blog Header Banner */}
      <div className="bg-gradient-to-br from-sky-800 via-indigo-900 to-slate-950 rounded-3xl p-5 text-white shadow-xl shadow-sky-900/20 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-bold text-sky-200 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            <span>Blog Cẩm Nang Du Lịch & Ẩm Thực Việt Nam</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
            Khám Phá Địa Danh, Quán Ăn & Nhà Hàng Nổi Tiếng
          </h2>
          <p className="text-xs text-sky-100/90 mt-1.5 leading-relaxed max-w-lg">
            Tuyển tập các bài viết review chi tiết, đánh giá chân thực và số sao từ cộng đồng du khách. Dễ dàng tìm kiếm điểm tham quan, món ngon bản địa và kinh nghiệm bỏ túi!
          </p>

          <div className="flex items-center gap-4 mt-3 text-[11px] text-sky-200/90 font-medium">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              {allArticles.length} bài viết review
            </span>
            <span>•</span>
            <span>63 Tỉnh thành</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
              Đánh giá thực tế từ du khách
            </span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm bài viết: Tên địa danh (Cầu Rồng, Tràng An), món ăn (Phở, Cơm tấm), quán ăn, tỉnh thành..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-9 rounded-2xl bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 shadow-xs outline-none focus:ring-2 focus:ring-sky-500 font-medium transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categoryFilters.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-sky-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Region & Sort Bar */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-0.5">
          {/* Region selector */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none flex-1">
            <span className="text-[11px] font-bold text-slate-400 mr-1 whitespace-nowrap">Vùng miền:</span>
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
                  selectedRegion === reg
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className="text-[10px] text-slate-400 font-semibold">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-[11px] font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 outline-none"
            >
              <option value="rating">⭐ Đánh giá cao nhất</option>
              <option value="reviews">🔥 Nhiều đánh giá nhất</option>
            </select>
          </div>
        </div>

        {/* Quick Destination Tags */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] font-bold text-slate-400 mr-1 whitespace-nowrap">Điểm đến:</span>
          {popularDestinations.map((dest) => (
            <button
              key={dest}
              onClick={() => setSelectedDestination(dest)}
              className={`px-2 py-0.5 rounded-md text-[10px] font-medium whitespace-nowrap transition-colors ${
                selectedDestination === dest
                  ? 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 font-bold border border-sky-300 dark:border-sky-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {dest}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs px-1">
        <span className="text-slate-500 dark:text-slate-400 font-semibold">
          Tìm thấy <strong className="text-slate-900 dark:text-slate-100">{filteredArticles.length}</strong> bài viết review
        </span>
        {(searchQuery || selectedCategory !== 'all' || selectedRegion !== 'Tất cả' || selectedDestination !== 'Tất cả') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedRegion('Tất cả');
              setSelectedDestination('Tất cả');
            }}
            className="text-sky-600 dark:text-sky-400 font-bold hover:underline"
          >
            Đặt lại bộ lọc
          </button>
        )}
      </div>

      {/* Blog Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Không tìm thấy bài viết phù hợp
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Hãy thử tìm với các từ khóa phổ biến như "Phở", "Cầu Rồng", "Đà Lạt", "Bà Nà", "Huế"...
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedRegion('Tất cả');
              setSelectedDestination('Tất cả');
            }}
            className="mt-3 px-4 py-2 rounded-xl bg-sky-50 text-sky-600 font-bold text-xs hover:bg-sky-100 transition-colors"
          >
            Xem tất cả bài viết
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredArticles.map((article) => {
            const isBookmarked = bookmarkedIds.has(article.id);
            const userExtraReviews = submittedReviews[article.id] || [];
            const totalReviewsCount = article.reviewsCount + userExtraReviews.length;

            return (
              <article
                key={article.id}
                className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/90 dark:border-slate-700 overflow-hidden shadow-xs hover:shadow-md hover:border-sky-300 dark:hover:border-sky-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative h-44 w-full overflow-hidden cursor-pointer" onClick={() => setReadingArticle(article)}>
                    <img
                      src={article.image}
                      alt={article.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-white font-bold text-[10px] border border-white/10">
                        {article.categoryLabel}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(article.id, article.name);
                        }}
                        className={`w-7 h-7 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${
                          isBookmarked
                            ? 'bg-amber-500 text-white'
                            : 'bg-slate-950/60 text-white hover:bg-slate-900'
                        }`}
                        title={isBookmarked ? 'Bỏ lưu bài viết' : 'Lưu bài viết'}
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-bold">
                      <span className="flex items-center gap-1 text-slate-200 truncate">
                        <MapPin className="w-3 h-3 text-sky-400 flex-shrink-0" />
                        <span className="truncate">{article.destName} • {article.region}</span>
                      </span>

                      <span className="flex items-center gap-1 bg-amber-500/90 text-white px-2 py-0.5 rounded-lg shadow-sm font-extrabold flex-shrink-0">
                        <Star className="w-3 h-3 fill-white" />
                        {article.rating} ({totalReviewsCount.toLocaleString('vi-VN')})
                      </span>
                    </div>
                  </div>

                  {/* Article Content Preview */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <span>{article.author}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3
                      onClick={() => setReadingArticle(article)}
                      className="font-black text-sm text-slate-900 dark:text-slate-100 group-hover:text-sky-600 transition-colors line-clamp-1 cursor-pointer"
                    >
                      {article.name}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {article.articleBody[0]}
                    </p>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Chi phí / Giá:</span>
                      <span className="font-bold text-sky-700 dark:text-sky-300 truncate max-w-[180px]">
                        {article.priceText}
                      </span>
                    </div>

                    {/* Highlights badge */}
                    <div className="bg-sky-50 dark:bg-slate-750 p-2 rounded-xl text-[10px] text-slate-600 dark:text-slate-300 line-clamp-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                      <span className="truncate">{article.tag}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Read Article CTA */}
                <div className="p-4 pt-0">
                  <button
                    type="button"
                    onClick={() => setReadingArticle(article)}
                    className="w-full h-10 rounded-2xl bg-sky-600 hover:bg-sky-700 active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Đọc bài review & Đánh giá</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* FULL BLOG ARTICLE MODAL (EDITORIAL READER WITH REVIEWS AND STARS) */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh] overflow-hidden animate-in slide-in-from-bottom-4">
            {/* Modal Sticky Top Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/95 dark:bg-slate-900/95 border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                  {readingArticle.categoryLabel}
                </span>
                <span className="text-xs text-slate-400">• {readingArticle.destName}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleBookmark(readingArticle.id, readingArticle.name)}
                  className={`p-1.5 rounded-full ${
                    bookmarkedIds.has(readingArticle.id)
                      ? 'text-amber-500'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                  title="Lưu bài viết"
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                    }
                    showToast('Đã sao chép liên kết bài viết!');
                  }}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  title="Chia sẻ bài viết"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setReadingArticle(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-200 flex items-center justify-center ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Article Body */}
            <div className="overflow-y-auto p-5 space-y-5">
              {/* Article Hero Header */}
              <div>
                <div className="relative h-60 w-full rounded-2xl overflow-hidden mb-3.5 shadow-md">
                  <img
                    src={readingArticle.image}
                    alt={readingArticle.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Overall Star Score Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="flex items-center text-amber-300">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-4 h-4 fill-amber-300" />
                          ))}
                        </div>
                        <span className="text-sm font-black text-white">{readingArticle.rating} / 5.0</span>
                      </div>
                      <span className="text-[11px] text-slate-200">
                        Dựa trên {readingArticle.reviewsCount.toLocaleString('vi-VN')} đánh giá từ du khách
                      </span>
                    </div>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        readingArticle.name + ' ' + readingArticle.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-white/90 text-slate-900 text-xs font-bold flex items-center gap-1 hover:bg-white shadow"
                    >
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      <span>Xem bản đồ</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                  <span className="font-semibold text-sky-700 dark:text-sky-300">{readingArticle.author}</span>
                  <span>•</span>
                  <span>{readingArticle.publishDate}</span>
                  <span>•</span>
                  <span>{readingArticle.readTime}</span>
                </div>

                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
                  {readingArticle.name}
                </h1>

                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1.5 mt-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-600 flex-shrink-0 mt-0.5" />
                  <span>{readingArticle.address}</span>
                </p>
              </div>

              {/* Quick Info Box (Price & Tip) */}
              <div className="p-3.5 rounded-2xl bg-sky-50/80 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Chi phí tham quan / Giá món:</span>
                  <span className="font-black text-sky-700 dark:text-sky-300 text-sm">
                    {readingArticle.priceText}
                  </span>
                </div>
                <div className="pt-2 border-t border-sky-200/60 dark:border-slate-700 flex items-start gap-2">
                  <span className="font-bold text-slate-700 dark:text-slate-300 flex-shrink-0">
                    💡 Bí kíp bỏ túi:
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">
                    {readingArticle.tip}
                  </p>
                </div>
              </div>

              {/* Structured Article Paragraphs */}
              <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-200">
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <span>📖 Bài viết đánh giá & Giới thiệu chi tiết</span>
                </h4>
                {readingArticle.articleBody.map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Highlights List */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
                <h5 className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                  <span>Điểm đặc sắc không nên bỏ lỡ</span>
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {readingArticle.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* REVIEWS & RATINGS SECTION */}
              <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-sky-600" />
                      <span>Đánh giá từ du khách ({readingArticle.reviews.length + (submittedReviews[readingArticle.id]?.length || 0)})</span>
                    </h4>
                    <p className="text-[11px] text-slate-400">Những nhận xét thực tế từ cộng đồng du lịch</p>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-xl border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 font-black text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{readingArticle.rating} / 5.0</span>
                  </div>
                </div>

                {/* Write Review Form */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                    Gửi đánh giá & cảm nhận của bạn
                  </span>

                  {/* Rating Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500">Số sao:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReviewRating(star)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= newReviewRating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300 dark:text-slate-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {newReviewRating} sao
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Chia sẻ trải nghiệm hoặc lời khuyên của bạn về điểm này..."
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddReview();
                      }}
                      className="flex-1 h-10 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 outline-none focus:border-sky-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddReview}
                      disabled={!newReviewComment.trim()}
                      className="h-10 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Gửi</span>
                    </button>
                  </div>
                </div>

                {/* Submitted User Reviews */}
                {submittedReviews[readingArticle.id]?.map((rev, idx) => (
                  <div
                    key={`user-${idx}`}
                    className="p-3 rounded-2xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900 space-y-1.5 animate-in fade-in"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="font-bold text-xs text-slate-900 dark:text-slate-100">
                            {rev.name}
                          </span>
                          <span className="text-[10px] text-slate-400 ml-2">{rev.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-200 pl-9">
                      {rev.comment}
                    </p>
                  </div>
                ))}

                {/* Pre-populated Traveler Reviews */}
                {readingArticle.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rev.avatar}
                          alt={rev.authorName}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <span className="font-bold text-xs text-slate-900 dark:text-slate-100 block">
                            {rev.authorName}
                          </span>
                          <span className="text-[10px] text-slate-400">{rev.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center text-amber-400">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3 h-3 ${
                              s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 pl-10 leading-relaxed">
                      {rev.comment}
                    </p>

                    <div className="flex items-center justify-end pl-10 text-[10px] text-slate-400 gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{rev.likes} người thấy hữu ích</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Bottom Close Bar */}
            <div className="p-3.5 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setReadingArticle(null)}
                className="w-full h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs transition-colors"
              >
                Đóng bài viết
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
