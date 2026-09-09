import React, { useState } from 'react';
import { Search, Star, MapPin, Plus, MessageSquare, Compass, Heart, Share2, Check } from 'lucide-react';
import { exploreSpots } from '../data/tripData';

interface ExploreViewProps {
  onOpenReviewModal: (spotName: string) => void;
  onAddSpotToItinerary: (spot: typeof exploreSpots[0]) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  onOpenReviewModal,
  onAddSpotToItinerary,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [likedSpots, setLikedSpots] = useState<Record<string, boolean>>({});
  const [addedSpotId, setAddedSpotId] = useState<string | null>(null);

  const categories = ['Tất cả', 'Biểu tượng & Check-in', 'Biển & Nghỉ dưỡng', 'Di sản & Văn hóa', 'Ẩm thực & Mua sắm'];

  const filteredSpots = exploreSpots.filter((spot) => {
    const matchesSearch = spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.tag.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'Tất cả' || spot.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const toggleLike = (id: string) => {
    setLikedSpots((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAdd = (spot: typeof exploreSpots[0]) => {
    onAddSpotToItinerary(spot);
    setAddedSpotId(spot.id);
    setTimeout(() => setAddedSpotId(null), 2000);
  };

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Search and Filters Bar */}
      <div className="mb-4">
        <div className="relative flex items-center mb-3">
          <Search className="w-5 h-5 absolute left-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm địa điểm, quán ăn, trải nghiệm tại Đà Nẵng..."
            className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 text-xs sm:text-sm font-medium border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500 shadow-sm transition-all"
          />
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

      {/* Spots Grid */}
      <div className="space-y-4">
        {filteredSpots.map((spot) => {
          const isLiked = !!likedSpots[spot.id];
          const isAdded = addedSpotId === spot.id;

          return (
            <div
              key={spot.id}
              className="bg-white dark:bg-slate-800/90 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
            >
              {/* Photo & badges */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

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
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 tracking-tight">
                  {spot.name}
                </h3>
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
                        : 'bg-sky-600 hover:bg-sky-700 text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Đã thêm vào ngày 2!</span>
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
    </div>
  );
};
