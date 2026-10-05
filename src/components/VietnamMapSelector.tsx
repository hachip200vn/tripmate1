import React, { useState } from 'react';
import {
  MapPin,
  PlaneTakeoff,
  PlaneLanding,
  Navigation,
  Compass,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';

export interface MapCityPoint {
  id: string;
  name: string;
  shortName: string;
  region: 'Miền Bắc' | 'Miền Trung' | 'Miền Nam' | 'Tây Nguyên';
  x: number; // SVG coordinates 0..360
  y: number; // SVG coordinates 0..520
  tag: string;
}

export const VIETNAM_MAP_CITIES: MapCityPoint[] = [
  // Miền Bắc
  { id: 'hagiang', name: 'Hà Giang', shortName: 'Hà Giang', region: 'Miền Bắc', x: 150, y: 35, tag: 'Đèo Mã Pí Lèng' },
  { id: 'sapa', name: 'Sa Pa', shortName: 'Sa Pa', region: 'Miền Bắc', x: 110, y: 55, tag: 'Đỉnh Fansipan' },
  { id: 'hanoi', name: 'Hà Nội', shortName: 'Hà Nội', region: 'Miền Bắc', x: 165, y: 95, tag: 'Thủ đô nghìn năm' },
  { id: 'haiphong', name: 'Hải Phòng', shortName: 'Hải Phòng', region: 'Miền Bắc', x: 205, y: 100, tag: 'Hoa phượng đỏ' },
  { id: 'halong', name: 'Hạ Long', shortName: 'Hạ Long', region: 'Miền Bắc', x: 230, y: 90, tag: 'Vịnh kỳ quan' },
  { id: 'ninhbinh', name: 'Ninh Bình', shortName: 'Ninh Bình', region: 'Miền Bắc', x: 168, y: 130, tag: 'Tràng An Bái Đính' },

  // Miền Trung
  { id: 'phongnha', name: 'Phong Nha', shortName: 'Quảng Bình', region: 'Miền Trung', x: 175, y: 185, tag: 'Vương quốc hang động' },
  { id: 'hue', name: 'Huế', shortName: 'Huế', region: 'Miền Trung', x: 208, y: 225, tag: 'Cố đô di sản' },
  { id: 'danang', name: 'Đà Nẵng — Hội An', shortName: 'Đà Nẵng', region: 'Miền Trung', x: 235, y: 250, tag: 'Cầu Rồng & Biển Mỹ Khê' },
  { id: 'quynhon', name: 'Quy Nhơn', shortName: 'Quy Nhơn', region: 'Miền Trung', x: 260, y: 315, tag: 'Kỳ Co & Eo Gió' },
  { id: 'phuyen', name: 'Phú Yên', shortName: 'Phú Yên', region: 'Miền Trung', x: 265, y: 340, tag: 'Ghềnh Đá Đĩa' },
  { id: 'nhatrang', name: 'Nha Trang', shortName: 'Nha Trang', region: 'Miền Trung', x: 262, y: 375, tag: 'Vịnh biển nhiệt đới' },
  { id: 'phanthiet', name: 'Phan Thiết', shortName: 'Mũi Né', region: 'Miền Trung', x: 235, y: 415, tag: 'Đồi cát bay' },

  // Tây Nguyên
  { id: 'pleiku', name: 'Pleiku', shortName: 'Gia Lai', region: 'Tây Nguyên', x: 215, y: 295, tag: 'Biển Hồ T’nưng' },
  { id: 'buonmathuot', name: 'Buôn Ma Thuột', shortName: 'Đắk Lắk', region: 'Tây Nguyên', x: 215, y: 345, tag: 'Thủ phủ cà phê' },
  { id: 'dalat', name: 'Đà Lạt', shortName: 'Đà Lạt', region: 'Tây Nguyên', x: 225, y: 385, tag: 'Xứ sở sương mù' },

  // Miền Nam
  { id: 'hcm', name: 'TP. Hồ Chí Minh', shortName: 'Sài Gòn', region: 'Miền Nam', x: 190, y: 435, tag: 'Đô thị năng động' },
  { id: 'vungtau', name: 'Vũng Tàu', shortName: 'Vũng Tàu', region: 'Miền Nam', x: 210, y: 450, tag: 'Biển Bãi Sau' },
  { id: 'cantho', name: 'Cần Thơ', shortName: 'Cần Thơ', region: 'Miền Nam', x: 155, y: 465, tag: 'Chợ nổi Cái Răng' },
  { id: 'phuquoc', name: 'Phú Quốc', shortName: 'Phú Quốc', region: 'Miền Nam', x: 95, y: 470, tag: 'Đảo ngọc thiên đường' },
  { id: 'camau', name: 'Cà Mau', shortName: 'Cà Mau', region: 'Miền Nam', x: 130, y: 505, tag: 'Đất mũi cực Nam' },
];

interface VietnamMapSelectorProps {
  currentDeparture: string;
  currentDestination: string;
  onSelectDeparture: (locationName: string) => void;
  onSelectDestination: (locationName: string) => void;
}

export const VietnamMapSelector: React.FC<VietnamMapSelectorProps> = ({
  currentDeparture,
  currentDestination,
  onSelectDeparture,
  onSelectDestination,
}) => {
  const [activeCity, setActiveCity] = useState<MapCityPoint | null>(null);
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('Tất cả');

  // Match coordinates of currently selected departure & destination
  const depPoint = VIETNAM_MAP_CITIES.find(
    (c) =>
      currentDeparture.toLowerCase().includes(c.shortName.toLowerCase()) ||
      c.name.toLowerCase().includes(currentDeparture.toLowerCase())
  );

  const destPoint = VIETNAM_MAP_CITIES.find(
    (c) =>
      currentDestination.toLowerCase().includes(c.shortName.toLowerCase()) ||
      c.name.toLowerCase().includes(currentDestination.toLowerCase())
  );

  const filteredCities = VIETNAM_MAP_CITIES.filter((c) => {
    if (selectedRegionFilter === 'Tất cả') return true;
    return c.region === selectedRegionFilter;
  });

  return (
    <div className="bg-gradient-to-b from-sky-900/90 via-slate-900 to-indigo-950 text-white rounded-2xl p-3.5 border border-sky-700/40 shadow-xl overflow-hidden relative">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex items-center justify-between pb-2.5 border-b border-sky-800/60 mb-2">
        <div className="flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-sky-400 animate-spin-slow" />
          <h4 className="text-xs font-black tracking-tight text-white flex items-center gap-1">
            <span>Bản đồ hành trình Việt Nam</span>
          </h4>
        </div>

        <span className="text-[10px] text-sky-300/80 bg-sky-950/80 px-2 py-0.5 rounded-full border border-sky-800/80">
          Chạm điểm để chọn
        </span>
      </div>

      {/* Region quick filter tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 mb-2 scrollbar-none relative z-10">
        {['Tất cả', 'Miền Bắc', 'Miền Trung', 'Tây Nguyên', 'Miền Nam'].map((reg) => (
          <button
            key={reg}
            type="button"
            onClick={() => setSelectedRegionFilter(reg)}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all ${
              selectedRegionFilter === reg
                ? 'bg-sky-500 text-white shadow-xs'
                : 'bg-white/10 hover:bg-white/20 text-slate-300'
            }`}
          >
            {reg}
          </button>
        ))}
      </div>

      {/* Map visual canvas area */}
      <div className="relative w-full h-[320px] bg-slate-950/60 rounded-xl overflow-hidden border border-sky-800/40 flex items-center justify-center">
        {/* SVG Graphic of Vietnam */}
        <svg
          viewBox="0 0 360 520"
          className="w-full h-full max-h-[320px] object-contain select-none"
        >
          {/* Subtle lat-long grid */}
          <defs>
            <linearGradient id="vietnamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#0d9488" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.45" />
            </linearGradient>
            <linearGradient id="flightArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>

          {/* Vietnam geographic shape representation */}
          <path
            d="
              M 115 50
              C 140 30, 185 30, 220 55
              C 235 70, 240 90, 225 105
              C 195 115, 175 125, 168 140
              C 160 165, 175 190, 195 215
              C 220 240, 240 260, 250 290
              C 265 330, 275 360, 265 390
              C 255 415, 230 435, 205 445
              C 175 460, 140 480, 125 510
              C 115 500, 130 460, 145 440
              C 165 420, 190 405, 195 380
              C 195 340, 180 300, 165 250
              C 150 200, 140 160, 130 120
              Z
            "
            fill="url(#vietnamGradient)"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            opacity="0.8"
          />

          {/* Islands: Phú Quốc */}
          <ellipse cx="95" cy="470" rx="10" ry="14" fill="#0d9488" opacity="0.6" stroke="#34d399" strokeWidth="1" />
          <text x="75" y="492" fill="#94a3b8" fontSize="8" fontWeight="bold">Phú Quốc</text>

          {/* Islands: Côn Đảo */}
          <circle cx="215" cy="495" r="5" fill="#0d9488" opacity="0.6" stroke="#34d399" strokeWidth="1" />

          {/* Quần đảo Hoàng Sa & Trường Sa annotations */}
          <g opacity="0.8">
            <circle cx="295" cy="225" r="4" fill="#38bdf8" />
            <circle cx="305" cy="235" r="3" fill="#38bdf8" />
            <circle cx="290" cy="245" r="3.5" fill="#38bdf8" />
            <text x="260" y="215" fill="#7dd3fc" fontSize="8" fontWeight="bold">QĐ. Hoàng Sa</text>
            <text x="270" y="224" fill="#bae6fd" fontSize="7">(Việt Nam)</text>
          </g>

          <g opacity="0.8">
            <circle cx="300" cy="385" r="4" fill="#34d399" />
            <circle cx="315" cy="395" r="3" fill="#34d399" />
            <circle cx="295" cy="410" r="3.5" fill="#34d399" />
            <text x="265" y="375" fill="#86efac" fontSize="8" fontWeight="bold">QĐ. Trường Sa</text>
            <text x="275" y="384" fill="#bbf7d0" fontSize="7">(Việt Nam)</text>
          </g>

          {/* Connection Arc between Departure & Destination */}
          {depPoint && destPoint && depPoint.id !== destPoint.id && (
            <g>
              {/* Curve line */}
              <path
                d={`M ${depPoint.x} ${depPoint.y} Q ${(depPoint.x + destPoint.x) / 2 + 35} ${(depPoint.y + destPoint.y) / 2} ${destPoint.x} ${destPoint.y}`}
                fill="none"
                stroke="url(#flightArcGrad)"
                strokeWidth="2.5"
                strokeDasharray="5,4"
                className="animate-pulse"
              />
            </g>
          )}

          {/* City Nodes */}
          {filteredCities.map((city) => {
            const isDeparture = depPoint?.id === city.id;
            const isDestination = destPoint?.id === city.id;
            const isSelected = activeCity?.id === city.id;

            return (
              <g
                key={city.id}
                className="cursor-pointer transition-transform duration-200"
                onClick={() => setActiveCity(city)}
              >
                {/* Glow ring if selected or destination */}
                {(isDeparture || isDestination || isSelected) && (
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={isDeparture || isDestination ? 14 : 10}
                    fill={isDeparture ? '#0284c7' : isDestination ? '#10b981' : '#f59e0b'}
                    opacity="0.35"
                    className="animate-ping"
                  />
                )}

                {/* Main Node Circle */}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={isDeparture || isDestination ? 7 : 4.5}
                  fill={isDeparture ? '#38bdf8' : isDestination ? '#34d399' : '#e2e8f0'}
                  stroke={isDeparture ? '#0369a1' : isDestination ? '#047857' : '#475569'}
                  strokeWidth="2"
                />

                {/* City name text */}
                <text
                  x={city.x + 9}
                  y={city.y + 3}
                  fill={isDeparture ? '#38bdf8' : isDestination ? '#4ade80' : isSelected ? '#fde047' : '#cbd5e1'}
                  fontSize={isDeparture || isDestination ? '10' : '8.5'}
                  fontWeight={isDeparture || isDestination || isSelected ? 'bold' : 'normal'}
                >
                  {city.shortName}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating City Quick Action Popover */}
        {activeCity && (
          <div className="absolute bottom-2 left-2 right-2 bg-slate-900/95 backdrop-blur-md rounded-xl p-2.5 border border-sky-700/60 shadow-xl flex items-center justify-between gap-2 z-20 animate-in fade-in slide-in-from-bottom-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-white truncate">{activeCity.name}</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-950 text-sky-300 border border-sky-800">
                  {activeCity.region}
                </span>
              </div>
              <p className="text-[10px] text-slate-300 truncate mt-0.5">{activeCity.tag}</p>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                type="button"
                onClick={() => {
                  onSelectDeparture(activeCity.name);
                  setActiveCity(null);
                }}
                className="px-2 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-[10px] font-bold flex items-center gap-1 transition-all"
                title="Đặt làm điểm xuất phát"
              >
                <PlaneTakeoff className="w-3 h-3" />
                <span>Nơi đi</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onSelectDestination(activeCity.name);
                  setActiveCity(null);
                }}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold flex items-center gap-1 transition-all"
                title="Đặt làm điểm đến trải nghiệm"
              >
                <MapPin className="w-3 h-3" />
                <span>Nơi đến</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Selected Route summary banner */}
      <div className="mt-2.5 pt-2 border-t border-sky-800/60 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1 truncate text-sky-200">
          <PlaneTakeoff className="w-3 h-3 text-sky-400 flex-shrink-0" />
          <span className="font-semibold text-white truncate">{currentDeparture || 'Hà Nội'}</span>
          <span className="text-sky-400 font-bold mx-0.5">➔</span>
          <MapPin className="w-3 h-3 text-emerald-400 flex-shrink-0" />
          <span className="font-semibold text-emerald-300 truncate">{currentDestination || 'Đà Nẵng'}</span>
        </div>

        <span className="text-[10px] text-sky-300/80 bg-sky-950 px-2 py-0.5 rounded-md border border-sky-800/60 flex-shrink-0">
          {depPoint && destPoint ? 'Đã kết nối lộ trình' : 'Bản đồ trực quan'}
        </span>
      </div>
    </div>
  );
};
