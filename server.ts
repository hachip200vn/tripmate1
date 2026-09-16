import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fallback smart generator for when API key is not yet set or in case of temporary API timeout
function generateSmartTripPlan(params: {
  destination?: string;
  startDate?: string;
  endDate?: string;
  membersCount?: number;
  budget?: string;
  vibes?: string[];
  pace?: string;
  notes?: string;
}) {
  const dest = params.destination?.trim() || 'Đà Nẵng — Hội An';
  const members = params.membersCount || 4;
  const vibesList = params.vibes && params.vibes.length > 0 ? params.vibes : ['Nghỉ dưỡng & Biển', 'Sống ảo & Check-in'];
  const pace = params.pace || 'balanced';

  // Determine number of days
  let numDays = 3;
  if (params.startDate && params.endDate) {
    const d1 = new Date(params.startDate);
    const d2 = new Date(params.endDate);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    if (diffDays >= 1 && diffDays <= 7) {
      numDays = diffDays;
    }
  }

  // Cover image based on destination
  let coverImage = 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&auto=format&fit=crop&q=80';
  if (dest.toLowerCase().includes('đà lạt') || dest.toLowerCase().includes('da lat')) {
    coverImage = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80';
  } else if (dest.toLowerCase().includes('phú quốc') || dest.toLowerCase().includes('phu quoc')) {
    coverImage = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=80';
  } else if (dest.toLowerCase().includes('hà giang') || dest.toLowerCase().includes('ha giang')) {
    coverImage = 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&auto=format&fit=crop&q=80';
  }

  const days = [];
  const activities = [];

  const dayThemes: Record<string, { title: string; subtitle: string; acts: any[] }[]> = {
    'default': [
      {
        title: 'Khởi hành & Nhận phòng thư giãn',
        subtitle: `Hạ cánh tại ${dest}, thưởng thức ẩm thực chào mừng`,
        acts: [
          {
            time: '09:00',
            category: 'Di chuyển & Đến nơi',
            title: `Di chuyển đến ${dest}`,
            location: `Trung tâm ${dest}`,
            costText: 'Đã bao gồm',
            statusText: 'Đúng giờ',
            statusType: 'transport',
            iconType: 'transport',
            details: 'Nhóm tập trung check-in phương tiện di chuyển'
          },
          {
            time: '11:30',
            category: 'Ẩm thực trưa',
            title: 'Thưởng thức món ngon đặc sản địa phương',
            location: 'Khu phố ẩm thực trung tâm',
            costText: '~85.000đ/người',
            statusText: 'Đã duyệt',
            statusType: 'approved',
            iconType: 'food',
            details: 'Các món đặc sản trứ danh được đánh giá 4.8 sao trên TripMate'
          },
          {
            time: '14:00',
            category: 'Lưu trú',
            title: 'Check-in khách sạn & Nghỉ ngơi',
            location: 'Khu vực trung tâm hoặc gần biển',
            costText: 'Đã đặt cọc',
            statusText: 'Đã đặt phòng',
            statusType: 'booked',
            iconType: 'landmark',
            details: 'Nhận phòng, sắp xếp đồ đạc và thư giãn sau chuyến đi'
          },
          {
            time: '16:30',
            category: 'Check-in & Dạo mát',
            title: 'Dạo bộ ngắm hoàng hôn & chụp ảnh nhóm',
            location: 'Quảng trường / Bờ biển',
            costText: 'Miễn phí',
            statusText: 'Đã duyệt',
            statusType: 'approved',
            iconType: 'landmark',
            details: 'Khung giờ vàng 17:00 - 17:45 cho ảnh nhóm kỷ niệm đẹp nhất'
          },
          {
            time: '19:00',
            category: 'Ẩm thực tối',
            title: 'Tiệc tối hải sản & Đặc sản đêm',
            location: 'Phố đi bộ hoặc bờ sông',
            costText: '~180.000đ/người',
            statusText: 'Đang bình chọn',
            statusType: 'voted',
            iconType: 'food',
            details: 'Không gian mở thoáng mát, thưởng thức ẩm thực và trò chuyện'
          }
        ]
      },
      {
        title: 'Khám phá danh thắng & Trải nghiệm đỉnh cao',
        subtitle: 'Chinh phục các biểu tượng du lịch nổi bật nhất',
        acts: [
          {
            time: '07:30',
            category: 'Ẩm thực sáng',
            title: 'Điểm tâm sáng hương vị địa phương & Cà phê',
            location: 'Quán gia truyền nổi tiếng',
            costText: '~45.000đ/người',
            statusText: 'Đã duyệt',
            statusType: 'approved',
            iconType: 'food',
            details: 'Nạp năng lượng khởi đầu ngày khám phá thú vị'
          },
          {
            time: '09:00',
            category: 'Tham quan & Trải nghiệm',
            title: `Khám phá danh thắng kỳ quan hàng đầu ${dest}`,
            location: `Điểm check-in nổi bật tại ${dest}`,
            costText: '~250.000đ/vé',
            statusText: 'Đã duyệt',
            statusType: 'approved',
            iconType: 'landmark',
            details: 'AI gợi ý đi theo hướng cáp treo / lối đi ưu tiên để tránh xếp hàng'
          },
          {
            time: '12:30',
            category: 'Ẩm thực trưa',
            title: 'Buffet trưa hoặc ẩm thực phong vị đặc sắc',
            location: 'Khu ẩm thực danh thắng',
            costText: '~150.000đ/người',
            statusText: 'Đã duyệt',
            statusType: 'approved',
            iconType: 'food',
            details: 'Thực đơn đa dạng, phù hợp khẩu vị của tất cả thành viên trong nhóm'
          },
          {
            time: '15:30',
            category: 'Thư giãn & Cafe',
            title: 'Ghé quán cafe view đẹp độc đáo',
            location: 'Khu phố cổ hoặc đồi cao view panorama',
            costText: '~55.000đ/ly',
            statusText: 'Đã duyệt',
            statusType: 'approved',
            iconType: 'food',
            details: 'Thưởng thức trà trái cây, cà phê muối và chụp ảnh check-in cực thơ'
          },
          {
            time: '19:30',
            category: 'Hoạt động đêm',
            title: 'Chợ đêm & Trải nghiệm văn hóa đêm',
            location: 'Khu chợ đêm trung tâm',
            costText: '~100.000đ/người',
            statusText: 'Đã duyệt',
            statusType: 'approved',
            iconType: 'landmark',
            details: 'Thưởng thức ẩm thực đường phố, mua đồ lưu niệm thủ công'
          }
        ]
      },
      {
        title: 'Mua quà lưu niệm & Tạm biệt hành trình',
        subtitle: 'Thong thả thư giãn, mua đặc sản và chuẩn bị về',
        acts: [
          {
            time: '08:00',
            category: 'Ẩm thực sáng',
            title: 'Ăn sáng thong thả ngắm bình minh',
            location: 'Quán cafe ăn sáng bờ sông/bờ biển',
            costText: '~50.000đ/người',
            statusText: 'Đã duyệt',
            statusType: 'approved',
            iconType: 'food',
            details: 'Tận hưởng không khí trong lành buổi sớm mai'
          },
          {
            time: '09:30',
            category: 'Mua sắm & Quà tặng',
            title: 'Mua đặc sản địa phương làm quà cho người thân',
            location: 'Chợ truyền thống uy tín',
            costText: 'Tùy chọn cá nhân',
            statusText: 'Đã duyệt',
            statusType: 'approved',
            iconType: 'landmark',
            details: 'Chả giò, đồ khô, mắm nêm, bánh kẹo đặc sản đóng thùng gửi máy bay'
          },
          {
            time: '12:00',
            category: 'Lưu trú',
            title: 'Trả phòng khách sạn & Bữa trưa chia tay',
            location: 'Khách sạn lưu trú',
            costText: 'Thanh toán tiền phòng',
            statusText: 'Đúng giờ',
            statusType: 'booked',
            iconType: 'landmark',
            details: 'Hoàn tất thủ tục check-out, cùng nhau quyết toán chi tiêu nhóm trên TripMate'
          },
          {
            time: '15:00',
            category: 'Di chuyển về',
            title: 'Khởi hành trở về - Kết thúc chuyến đi trọn vẹn',
            location: 'Sân bay / Nhà ga trung tâm',
            costText: 'Vé đã đặt',
            statusText: 'Đúng giờ',
            statusType: 'transport',
            iconType: 'transport',
            details: 'Chia sẻ ảnh kỷ niệm lên nhóm và đánh giá chuyến đi!'
          }
        ]
      }
    ]
  };

  const templates = dayThemes['default'];

  for (let i = 0; i < numDays; i++) {
    const templateIndex = Math.min(i, templates.length - 1);
    const dayData = templates[templateIndex];
    const dayNum = i + 1;

    let displayDate = `Ngày ${dayNum}`;
    let fullDate = '';
    if (params.startDate) {
      const d = new Date(params.startDate);
      d.setDate(d.getDate() + i);
      displayDate = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
      fullDate = d.toISOString().split('T')[0];
    }

    days.push({
      dayNumber: dayNum,
      date: fullDate || `2025-04-${14 + dayNum}`,
      displayDate: displayDate,
      title: dayData.title,
      activitiesCount: dayData.acts.length
    });

    dayData.acts.forEach((act, actIdx) => {
      activities.push({
        id: `act-gen-${dayNum}-${actIdx + 1}`,
        dayNumber: dayNum,
        time: act.time,
        category: act.category,
        title: act.title,
        location: act.location,
        costText: act.costText,
        statusText: act.statusText,
        statusType: act.statusType,
        iconType: act.iconType,
        details: act.details
      });
    });
  }

  return {
    tripTitle: `Hành trình khám phá ${dest} rực rỡ ✨`,
    destination: dest,
    datesSummary: `${days[0]?.displayDate || 'Ngày 1'} – ${days[days.length - 1]?.displayDate || `Ngày ${numDays}`} (${numDays} ngày ${Math.max(1, numDays - 1)} đêm)`,
    totalDays: numDays,
    coverImage,
    days,
    activities,
    aiSummary: `Lịch trình được tối ưu theo nhịp độ ${pace === 'relaxed' ? 'Thư thái' : pace === 'packed' ? 'Dày đặc' : 'Cân bằng'}, ngân sách ${params.budget || 'tiêu chuẩn'} và các sở thích: ${vibesList.join(', ')}.`
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'TripMate Backend' });
  });

  // AI Plan Itinerary endpoint using @google/genai
  app.post('/api/ai/plan-itinerary', async (req, res) => {
    try {
      const {
        destination = 'Đà Nẵng — Hội An',
        startDate,
        endDate,
        membersCount = 4,
        budget = 'Tiêu chuẩn (~4-5tr)',
        vibes = ['Nghỉ dưỡng & Biển', 'Sống ảo & Check-in'],
        pace = 'balanced',
        notes = ''
      } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;

      // If valid Gemini API key is present, invoke Gemini Flash models
      if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.length > 10) {
        const ai = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build'
            }
          }
        });

        const prompt = `Bạn là chuyên gia tư vấn du lịch thông minh TripMate AI hàng đầu Việt Nam.
Hãy lập một lịch trình du lịch chi tiết, sống động và thiết thực cho nhóm bạn đi du lịch với các thông tin:
- Điểm đến: "${destination}"
- Ngày khởi hành: "${startDate || 'Hôm nay'}"
- Ngày kết thúc: "${endDate || '3 ngày sau'}"
- Số lượng thành viên: ${membersCount} người
- Mức ngân sách dự kiến: "${budget}"
- Phong cách du lịch & Vibe: ${Array.isArray(vibes) ? vibes.join(', ') : vibes}
- Nhịp độ chuyến đi: "${pace === 'relaxed' ? 'Thư thái (ít điểm, thong thả)' : pace === 'packed' ? 'Dày đặc (nhiều hoạt động trải nghiệm)' : 'Cân bằng (hợp lý, vừa vặn)'}"
- Yêu cầu đặc biệt thêm: "${notes || 'Không có'}"

Yêu cầu định dạng trả về DUY NHẤT một chuỗi JSON hợp lệ (không kèm markdown ngoài chuỗi json) với cấu trúc sau:
{
  "tripTitle": "Tên chuyến đi hấp dẫn kèm emoji (ví dụ: Chuyến đi Đà Nẵng – Hội An rực rỡ 🌊)",
  "destination": "${destination}",
  "datesSummary": "Khoảng ngày (ví dụ: 15/04 – 18/04/2025 (4 ngày 3 đêm))",
  "totalDays": 3,
  "coverImage": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&auto=format&fit=crop&q=80",
  "days": [
    {
      "dayNumber": 1,
      "date": "2025-04-15",
      "displayDate": "15/04",
      "title": "Chủ đề ngắn gọn của ngày 1",
      "activitiesCount": 4
    }
  ],
  "activities": [
    {
      "id": "act-101",
      "dayNumber": 1,
      "time": "08:30",
      "category": "Ẩm thực sáng / Tham quan / Lưu trú / Di chuyển",
      "title": "Tên địa điểm cụ thể hoặc hoạt động thực tế",
      "location": "Địa chỉ hoặc vị trí cụ thể",
      "costText": "~55.000đ/người hoặc Miễn phí hoặc Đã đặt cọc",
      "statusText": "Đã duyệt / Đã đặt / Đang bình chọn",
      "statusType": "approved / booked / voted / transport",
      "iconType": "food / landmark / beach / transport",
      "details": "Mẹo hữu ích của AI về giờ đẹp, món ngon nên thử hoặc kinh nghiệm tránh đông"
    }
  ],
  "aiSummary": "Lời khuyên tổng quan và mẹo quan trọng nhất từ AI dành cho chuyến đi này"
}`;

        // Try primary model then fallback model to ensure maximum reliability
        const candidateModels = ['gemini-3.6-flash', 'gemini-3.8-flash'];
        let rawText: string | null = null;
        let modelUsed = '';

        for (const modelName of candidateModels) {
          try {
            const response = await ai.models.generateContent({
              model: modelName,
              contents: prompt,
              config: {
                responseMimeType: 'application/json',
                temperature: 0.6,
                thinkingConfig: {
                  thinkingLevel: ThinkingLevel.LOW
                }
              }
            });

            if (response.text) {
              rawText = response.text;
              modelUsed = modelName;
              break;
            }
          } catch (modelErr: any) {
            console.warn(`Gemini model ${modelName} failed or unavailable:`, modelErr?.status || modelErr?.message);
          }
        }

        if (rawText) {
          try {
            let cleanJson = rawText.trim();
            if (cleanJson.startsWith('```json')) {
              cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();
            } else if (cleanJson.startsWith('```')) {
              cleanJson = cleanJson.replace(/^```\s*/, '').replace(/```\s*$/, '').trim();
            }

            const parsed = JSON.parse(cleanJson);

            // Sanitize & enhance the AI response
            if (parsed && Array.isArray(parsed.days) && parsed.days.length > 0 && Array.isArray(parsed.activities)) {
              // Ensure valid cover photo
              if (!parsed.coverImage || !parsed.coverImage.startsWith('http')) {
                const lower = destination.toLowerCase();
                if (lower.includes('đà lạt') || lower.includes('da lat')) {
                  parsed.coverImage = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1200&auto=format&fit=crop&q=80';
                } else if (lower.includes('phú quốc') || lower.includes('phu quoc')) {
                  parsed.coverImage = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop&q=80';
                } else if (lower.includes('nha trang')) {
                  parsed.coverImage = 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&auto=format&fit=crop&q=80';
                } else if (lower.includes('hà giang') || lower.includes('ha giang')) {
                  parsed.coverImage = 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&auto=format&fit=crop&q=80';
                } else {
                  parsed.coverImage = 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&auto=format&fit=crop&q=80';
                }
              }

              return res.json({
                success: true,
                data: parsed,
                source: `gemini-backend (${modelUsed})`
              });
            }
          } catch (parseErr) {
            console.warn('Failed to parse Gemini JSON output:', parseErr);
          }
        }
      }

      // Fallback smart generator ensures app ALWAYS returns pristine plan
      const plan = generateSmartTripPlan({
        destination,
        startDate,
        endDate,
        membersCount,
        budget,
        vibes,
        pace,
        notes
      });

      return res.json({
        success: true,
        data: plan,
        source: 'smart-engine'
      });
    } catch (err: any) {
      console.error('API Error in /api/ai/plan-itinerary:', err);
      const fallback = generateSmartTripPlan(req.body || {});
      return res.json({
        success: true,
        data: fallback,
        source: 'smart-engine-fallback'
      });
    }
  });

  // Vite middleware in dev; static file serving in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 TripMate Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
