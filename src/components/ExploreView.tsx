import React, { useState } from 'react';
import {
  Search,
  Star,
  MapPin,
  Plus,
  MessageSquare,
  Compass,
  Heart,
  Check,
  Sparkles,
  BookOpen,
  ArrowRight,
  Clock,
  User,
  Calendar,
  Layers,
  X
} from 'lucide-react';
import {
  getDestinationExploreData,
  ExploreSpotItem,
  ExploreArticle
} from '../data/destinationExploreData';

interface ExploreViewProps {
  currentDestination?: string | null;
  onOpenReviewModal: (spotName: string) => void;
  onAddSpotToItinerary: (spot: ExploreSpotItem) => void;
  onSwitchToItinerary: () => void;
  onOpenAiPlanner?: () => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  currentDestination,
  onOpenReviewModal,
  onAddSpotToItinerary,
  onSwitchToItinerary,
  onOpenAiPlanner,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [likedSpots, setLikedSpots] = useState<Record<string, boolean>>({});
  const [addedSpotId, setAddedSpotId] = useState<string | null>(null);
  const [activeArticle, setActiveArticle] = useState<ExploreArticle | null>(null);

  // 1. EMPTY STATE: When no trip plan has been created yet
  if (!currentDestination || !currentDestination.trim()) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 pb-20 text-center">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-sky-100 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/60 flex items-center justify-center text-sky-600 dark:text-sky-400 shadow-lg shadow-sky-500/10">
            <Compass className="w-12 h-12 stroke-[1.75]" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-bold mb-3">
          <span>⚠️ Chưa có lịch trình được chọn</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-2">
          Khám phá theo điểm đến du lịch
        </h2>

        {/* Note requirement from user: "hãy tạo lịch trình trước khi khám phá địa điểm du lịch" */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mb-6 leading-relaxed bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <strong className="text-sky-700 dark:text-sky-300 block mb-1">💡 Lưu ý:</strong>
          Hãy tạo lịch trình trước khi khám phá địa điểm du lịch.
          <span className="block text-slate-500 dark:text-slate-400 text-xs mt-1">
            Tab Khám Phá sẽ tự động gợi ý bài viết, quán ăn và danh thắng đồng bộ chính xác với điểm đến bạn chọn!
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
          <button
            onClick={() => {
              if (onOpenAiPlanner) {
                onOpenAiPlanner();
              } else {
                onSwitchToItinerary();
              }
            }}
            className="w-full h-12 rounded-2xl bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-600/25 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Tạo lịch trình ngay</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={onSwitchToItinerary}
            className="w-full h-12 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Xem tab Lịch trình</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. DYNAMIC EXPLORE DATA: Synchronized with currentDestination
  const exploreData = getDestinationExploreData(currentDestination);

  if (!exploreData) {
    return null;
  }

  const categories = [
    'Tất cả',
    'Biểu tượng & Check-in',
    'Biển & Nghỉ dưỡng',
    'Di sản & Văn hóa',
    'Ẩm thực & Mua sắm',
    'Thiên nhiên & Trải nghiệm'
  ];

  const filteredSpots = exploreData.spots.filter((spot) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      spot.name.toLowerCase().includes(query) ||
      spot.address.toLowerCase().includes(query) ||
      spot.tag.toLowerCase().includes(query);
    const matchesCat = selectedCategory === 'Tất cả' || spot.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const toggleLike = (id: string) => {
    setLikedSpots((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAdd = (spot: ExploreSpotItem) => {
    onAddSpotToItinerary(spot);
    setAddedSpotId(spot.id);
    setTimeout(() => setAddedSpotId(null), 2000);
  };

  return (
    <div className="flex flex-col w-full pb-28 animate-in fade-in duration-200">
      {/* Synchronized Destination Banner */}
      <div className="mb-5 p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-sky-600 to-blue-700 text-white shadow-lg shadow-sky-600/15 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-extrabold mb-2 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Đồng bộ theo lịch trình: {exploreData.destinationName}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
            Khám phá {exploreData.destinationName}
          </h1>
          <p className="text-xs sm:text-sm text-sky-100 mt-1 max-w-xl line-clamp-2">
            {exploreData.subtitle}
          </p>

          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/15 text-[11px] font-semibold text-sky-100">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {exploreData.province} • {exploreData.region}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              {exploreData.spots.length} địa điểm gợi ý
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {exploreData.articles.length} bài viết
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="mb-5">
        <div className="relative flex items-center mb-3">
          <Search className="w-4 h-4 absolute left-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Tìm kiếm địa điểm, món ngon tại ${exploreData.destinationName}...`}
            className="w-full h-11 pl-10 pr-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 text-xs sm:text-sm font-medium border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500 shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 text-slate-400 hover:text-slate-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* FEATURED TRAVEL ARTICLES FOR THIS DESTINATION */}
      {exploreData.articles && exploreData.articles.length > 0 && selectedCategory === 'Tất cả' && !searchQuery && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-sky-600" />
              <span>Bài viết & Cẩm nang du lịch {exploreData.destinationName}</span>
            </h2>
            <span className="text-[11px] font-bold text-sky-600 bg-sky-50 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-sky-100 dark:border-slate-700">
              Mới nhất
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {exploreData.articles.map((art) => (
              <div
                key={art.id}
                onClick={() => setActiveArticle(art)}
                className="group cursor-pointer bg-white dark:bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-sky-300 dark:hover:border-sky-700 transition-all flex flex-col"
              >
                <div className="relative h-36 w-full overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-sky-800 dark:text-sky-300 text-[10px] font-extrabold shadow-sm">
                      {art.category}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px] font-semibold">
                    <span className="flex items-center gap-1 drop-shadow">
                      <Clock className="w-3 h-3" />
                      {art.readTime}
                    </span>
                    <span className="flex items-center gap-1 drop-shadow">
                      <User className="w-3 h-3" />
                      {art.author}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {art.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] font-bold text-sky-600 dark:text-sky-400">
                    <span>Đọc bài viết</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RECOMMENDED SPOTS LIST */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-sky-600" />
            <span>Địa điểm đề xuất tại {exploreData.destinationName} ({filteredSpots.length})</span>
          </h2>
          {searchQuery && (
            <span className="text-[11px] text-slate-400">
              Kết quả cho &ldquo;{searchQuery}&rdquo;
            </span>
          )}
        </div>

        {filteredSpots.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700">
            <p className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-2">
              Không tìm thấy địa điểm phù hợp
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Tất cả');
              }}
              className="text-xs text-sky-600 dark:text-sky-400 font-bold hover:underline"
            >
              Xem lại tất cả địa điểm tại {exploreData.destinationName}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSpots.map((spot) => {
              const isLiked = !!likedSpots[spot.id];
              const isAdded = addedSpotId === spot.id;

              return (
                <div
                  key={spot.id}
                  className="bg-white dark:bg-slate-800/90 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
                >
                  {/* Photo & Badges */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={spot.image}
                      alt={spot.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                    {/* Tag pill */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-sky-800 dark:text-sky-300 text-[11px] font-extrabold shadow-sm">
                        {spot.tag}
                      </span>
                    </div>

                    {/* Like button */}
                    <button
                      onClick={() => toggleLike(spot.id)}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:text-red-400 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>

                    {/* Rating & reviews on bottom image edge */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                      <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>{spot.rating}</span>
                        <span className="text-white/70 font-normal">({spot.reviewsCount})</span>
                      </div>
                      <span className="text-xs font-bold drop-shadow">
                        {spot.priceText}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 tracking-tight">
                        {spot.name}
                      </h3>
                      <span className="text-[10px] font-bold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-slate-700 px-2 py-0.5 rounded-md flex-shrink-0 border border-sky-100 dark:border-slate-600">
                        {spot.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span className="truncate">{spot.address}</span>
                    </p>

                    {/* Insider Tip Box */}
                    <div className="mt-3 p-3 rounded-2xl bg-sky-50 dark:bg-slate-700/50 border border-sky-100 dark:border-slate-700 text-xs">
                      <span className="font-bold text-sky-700 dark:text-sky-300">💡 Mẹo trải nghiệm: </span>
                      <span className="text-slate-600 dark:text-slate-300">{spot.tip}</span>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center gap-2">
                      <button
                        onClick={() => onOpenReviewModal(spot.name)}
                        className="flex-1 h-11 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                        <span>Viết đánh giá</span>
                      </button>

                      <button
                        onClick={() => handleAdd(spot)}
                        className={`flex-1 h-11 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Đã thêm vào lịch trình!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Thêm vào lịch trình</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ARTICLE READER MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto border border-slate-200 dark:border-slate-700 shadow-2xl p-5 relative">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative h-48 -mx-5 -mt-5 mb-4 overflow-hidden rounded-t-3xl">
              <img src={activeArticle.image} alt={activeArticle.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="px-2.5 py-0.5 rounded-full bg-sky-600 text-[10px] font-extrabold uppercase">
                  {activeArticle.category}
                </span>
                <h3 className="text-base font-black mt-1 leading-snug drop-shadow">
                  {activeArticle.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
              <span>✍️ {activeArticle.author}</span>
              <span>•</span>
              <span>⏱️ {activeArticle.readTime}</span>
              <span>•</span>
              <span>📍 {exploreData.destinationName}</span>
            </div>

            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 space-y-3 leading-relaxed">
              <p className="font-semibold text-slate-900 dark:text-slate-100">
                {activeArticle.excerpt}
              </p>
              <p>
                Khi đặt chân đến {exploreData.destinationName}, du khách sẽ được tận hưởng không khí trong lành cùng những thắng cảnh nổi tiếng mang đậm bản sắc vùng miền {exploreData.region}.
              </p>
              <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700">
                <strong className="text-sky-700 dark:text-sky-300 block mb-1">Mẹo du lịch bỏ túi:</strong>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Hãy lên sẵn danh sách các điểm tham quan cùng tuyến đường để tiết kiệm thời gian di chuyển. Đừng quên bấm &ldquo;Thêm vào lịch trình&rdquo; ở các địa điểm bên dưới để đồng bộ vào kế hoạch đi của bạn!
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2.5 rounded-xl bg-sky-600 text-white font-bold text-xs hover:bg-sky-700 transition-colors"
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
