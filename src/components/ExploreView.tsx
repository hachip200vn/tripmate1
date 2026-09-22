import React, { useState, useMemo } from 'react';
import {
  Search,
  Star,
  MapPin,
  Plus,
  Compass,
  Check,
  Sparkles,
  Calendar,
  X,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Bookmark,
  Share2,
  Info
} from 'lucide-react';
import { DESTINATION_CATALOG, DestinationItem } from '../data/destinationCatalog';
import { ExploreSpotItem } from '../data/destinationExploreData';

interface ExploreViewProps {
  currentDestination?: string | null;
  onAddSpotToItinerary: (spot: ExploreSpotItem) => void;
  onSwitchToItinerary: () => void;
  onCreateItineraryForDestination: (destinationName: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  currentDestination,
  onAddSpotToItinerary,
  onSwitchToItinerary,
  onCreateItineraryForDestination,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('Tất cả');
  const [expandedDestIds, setExpandedDestIds] = useState<Record<string, boolean>>({
    danang: true,
    hue: true,
    dalat: true,
    phuquoc: true,
    hoian: true,
  });
  const [selectedSpot, setSelectedSpot] = useState<{
    spot: ExploreSpotItem;
    destName: string;
  } | null>(null);
  const [addedSpotId, setAddedSpotId] = useState<string | null>(null);

  const regions = ['Tất cả', 'Miền Bắc', 'Miền Trung', 'Miền Nam', 'Tây Nguyên'];

  const toggleExpand = (destId: string) => {
    setExpandedDestIds((prev) => ({
      ...prev,
      [destId]: !prev[destId],
    }));
  };

  // Filter destinations and their spots by search and region
  const filteredDestinations = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return DESTINATION_CATALOG.filter((dest) => {
      // Region filter
      if (selectedRegion !== 'Tất cả' && dest.region !== selectedRegion) {
        return false;
      }

      // If no search, keep all
      if (!q) return true;

      // Match destination name, province or tag
      const matchDest =
        dest.name.toLowerCase().includes(q) ||
        dest.province.toLowerCase().includes(q) ||
        dest.tag.toLowerCase().includes(q) ||
        dest.summary.toLowerCase().includes(q);

      // Match any spot in destination
      const matchSpot = dest.spots.some(
        (spot) =>
          spot.name.toLowerCase().includes(q) ||
          spot.category.toLowerCase().includes(q) ||
          spot.address.toLowerCase().includes(q) ||
          spot.tag.toLowerCase().includes(q)
      );

      return matchDest || matchSpot;
    });
  }, [searchQuery, selectedRegion]);

  const handleAddSpot = (spot: ExploreSpotItem) => {
    onAddSpotToItinerary(spot);
    setAddedSpotId(spot.id);
    setTimeout(() => {
      setAddedSpotId(null);
    }, 2000);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-sky-600 via-sky-700 to-indigo-800 rounded-3xl p-5 text-white shadow-xl shadow-sky-600/10 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold text-sky-100 mb-2.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Danh mục địa danh du lịch Việt Nam</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
            Khám Phá Điểm Đến & Địa Danh Nổi Bật
          </h2>
          <p className="text-xs text-sky-100/90 mt-1.5 leading-relaxed max-w-md">
            Xem danh sách các địa danh du lịch hấp dẫn theo từng tỉnh thành. Bấm nút{' '}
            <span className="font-bold text-white underline decoration-sky-300">Tạo lịch trình</span>{' '}
            để tự động lên kế hoạch trọn vẹn cho điểm đến đó!
          </p>
        </div>
      </div>

      {/* Search & Region Filter Bar */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tỉnh thành (Đà Nẵng, Huế...) hoặc địa danh (Cầu Rồng, Đại Nội...)"
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

        {/* Region Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedRegion === reg
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-sky-300'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>
      </div>

      {/* Destinations List */}
      <div className="space-y-5">
        {filteredDestinations.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700">
            <MapPin className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Không tìm thấy địa danh phù hợp với từ khóa
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Thử tìm kiếm với tên "Đà Nẵng", "Huế", "Đà Lạt", "Cầu Rồng", hoặc "Đại Nội"
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRegion('Tất cả');
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-sky-50 text-sky-600 font-bold text-xs hover:bg-sky-100 transition-colors"
            >
              Xóa bộ lọc tìm kiếm
            </button>
          </div>
        ) : (
          filteredDestinations.map((dest) => {
            const isExpanded = expandedDestIds[dest.id] ?? false;
            const isCurrentTripDest =
              currentDestination &&
              currentDestination.toLowerCase().includes(dest.name.toLowerCase());

            return (
              <div
                key={dest.id}
                className="bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-all"
              >
                {/* Destination Hero Header */}
                <div className="relative h-44 sm:h-52 w-full overflow-hidden">
                  <img
                    src={dest.coverImage}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-bold text-[10px] border border-white/20">
                      {dest.region} • {dest.province}
                    </span>

                    {isCurrentTripDest && (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white font-black text-[10px] shadow-md flex items-center gap-1">
                        <Check className="w-3 h-3" /> Điểm đến hiện tại
                      </span>
                    )}
                  </div>

                  {/* Bottom Destination Info & Main Create Itinerary CTA */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-1.5">
                          <span>{dest.name}</span>
                        </h3>
                        <p className="text-xs text-slate-200 line-clamp-1 mt-0.5 font-medium">
                          {dest.tag}
                        </p>
                      </div>

                      {/* MAIN USER REQUEST: Nút tạo lịch trình trên địa danh */}
                      <button
                        onClick={() => onCreateItineraryForDestination(dest.name)}
                        className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 active:scale-95 text-white font-extrabold text-xs shadow-lg shadow-sky-950/40 flex items-center gap-1.5 flex-shrink-0 transition-all border border-sky-300/30"
                        title={`Tạo ngay lịch trình chi tiết cho ${dest.name}`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-pulse" />
                        <span>Tạo lịch trình {dest.name}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Destination Description & Accordion Toggle Bar */}
                <div className="p-3.5 border-b border-slate-100 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-800/40">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex-1 line-clamp-2">
                      {dest.summary}
                    </p>
                    <button
                      onClick={() => toggleExpand(dest.id)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-[11px] border border-slate-200 dark:border-slate-600 flex items-center gap-1 flex-shrink-0 hover:bg-slate-100 transition-colors shadow-2xs"
                    >
                      <span>{dest.spots.length} địa danh</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Spots Inside Destination */}
                {isExpanded && (
                  <div className="p-3.5 space-y-3 bg-white dark:bg-slate-800/80">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Danh sách các địa danh nổi tiếng tại {dest.name}
                      </span>
                      <span className="text-[11px] text-sky-600 dark:text-sky-400 font-semibold">
                        Gợi ý tham quan
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {dest.spots.map((spot) => {
                        const isAdded = addedSpotId === spot.id;

                        return (
                          <div
                            key={spot.id}
                            className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/80 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-600 transition-all flex flex-col justify-between group"
                          >
                            <div>
                              {/* Spot Image & Tag */}
                              <div className="relative h-28 w-full rounded-xl overflow-hidden mb-2.5">
                                <img
                                  src={spot.image}
                                  alt={spot.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-slate-900/80 backdrop-blur-md text-white font-bold text-[9px]">
                                  {spot.category}
                                </span>
                                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[10px] font-bold">
                                  <span className="truncate mr-1 text-slate-200">{spot.tag}</span>
                                  <span className="flex items-center gap-0.5 text-amber-300 flex-shrink-0">
                                    <Star className="w-3 h-3 fill-amber-300" />
                                    {spot.rating}
                                  </span>
                                </div>
                              </div>

                              {/* Title & Address */}
                              <h4
                                onClick={() => setSelectedSpot({ spot, destName: dest.name })}
                                className="font-extrabold text-xs text-slate-800 dark:text-slate-100 hover:text-sky-600 cursor-pointer line-clamp-1 transition-colors"
                              >
                                {spot.name}
                              </h4>
                              <p className="text-[10px] text-slate-400 dark:text-slate-400 line-clamp-1 mt-0.5 flex items-center gap-1">
                                <MapPin className="w-3 h-3 flex-shrink-0 text-slate-400" />
                                <span>{spot.address}</span>
                              </p>

                              {/* Price text with formatted thousand separator */}
                              <div className="mt-1.5 flex items-center justify-between text-[11px]">
                                <span className="text-slate-500 font-medium">Chi phí dự kiến:</span>
                                <span className="font-bold text-sky-700 dark:text-sky-300">
                                  {spot.priceText}
                                </span>
                              </div>

                              {/* Tip */}
                              {spot.tip && (
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5 bg-white dark:bg-slate-800 p-1.5 rounded-lg border border-slate-100 dark:border-slate-600/50 italic">
                                  💡 {spot.tip}
                                </p>
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-3 pt-2.5 border-t border-slate-200/70 dark:border-slate-600/70 flex items-center gap-1.5">
                              <button
                                onClick={() => onCreateItineraryForDestination(dest.name)}
                                className="flex-1 h-8 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow-xs transition-colors"
                                title={`Tạo lịch trình ${dest.name} với địa danh này`}
                              >
                                <Sparkles className="w-3 h-3 text-yellow-200" />
                                <span>Tạo lịch trình</span>
                              </button>

                              <button
                                onClick={() => handleAddSpot(spot)}
                                className={`h-8 px-2.5 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-colors ${
                                  isAdded
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-slate-200/80 dark:bg-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-500'
                                }`}
                                title="Thêm địa danh này vào lịch trình đang xem"
                              >
                                {isAdded ? (
                                  <>
                                    <Check className="w-3 h-3" />
                                    <span>Đã thêm</span>
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-3 h-3" />
                                    <span>Thêm</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Spot Detail Modal */}
      {selectedSpot && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <span className="text-[10px] font-extrabold uppercase text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950 px-2.5 py-1 rounded-full">
                {selectedSpot.destName} • {selectedSpot.spot.category}
              </span>
              <button
                onClick={() => setSelectedSpot(null)}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-300 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-3">
              <img
                src={selectedSpot.spot.image}
                alt={selectedSpot.spot.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-amber-300 text-xs font-bold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                <span>{selectedSpot.spot.rating} ({selectedSpot.spot.reviewsCount.toLocaleString('vi-VN')} đánh giá)</span>
              </div>
            </div>

            <h3 className="text-base font-black text-slate-900 dark:text-slate-100 mb-1">
              {selectedSpot.spot.name}
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-3">
              <MapPin className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
              <span>{selectedSpot.spot.address}</span>
            </p>

            <div className="p-3 rounded-2xl bg-sky-50 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700 text-xs space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Chi phí vé/dịch vụ:</span>
                <span className="font-extrabold text-sky-700 dark:text-sky-300">
                  {selectedSpot.spot.priceText}
                </span>
              </div>
              <div className="pt-2 border-t border-sky-200/50 dark:border-slate-700">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                  Kinh nghiệm du lịch hữu ích:
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedSpot.spot.tip}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  onCreateItineraryForDestination(selectedSpot.destName);
                  setSelectedSpot(null);
                }}
                className="w-full h-11 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4 text-yellow-200" />
                <span>Tạo lịch trình trọn gói {selectedSpot.destName}</span>
              </button>

              <button
                onClick={() => {
                  handleAddSpot(selectedSpot.spot);
                  setSelectedSpot(null);
                }}
                className="w-full h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm riêng địa danh này vào lịch trình</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
