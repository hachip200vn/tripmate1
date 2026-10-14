/// <reference types="vite/client" />
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Đọc thông tin kết nối từ biến môi trường (Vite)
const env = (import.meta as unknown as { env?: Record<string, string> }).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || '';

// Khởi tạo Supabase client trực tiếp
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      })
    : null;

/**
 * Kiểm tra xem ứng dụng đã kết nối trực tiếp với Supabase hay chưa
 */
export const isSupabaseConfigured = (): boolean => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};

// ==============================================================================
// CÁC HÀM TRUY VẤN DỮ LIỆU TỰ ĐỘNG TRỰC TIẾP (KHÔNG CẦN EXPORT THỦ CÔNG)
// ==============================================================================

/**
 * 1. Tự động truy vấn danh sách chuyến đi từ bảng 'trips'
 */
export async function fetchTripsDirectly() {
  if (!supabase) return { data: null, error: 'Chưa cấu hình VITE_SUPABASE_URL' };
  
  const { data, error } = await supabase
    .from('trips')
    .select(`
      *,
      trip_members (*),
      trip_days (*),
      activities (*),
      expenses (*),
      vote_polls (
        *,
        vote_options (*)
      )
    `)
    .order('created_at', { ascending: false });

  return { data, error };
}

/**
 * 2. Tự động truy vấn chi tiết 1 chuyến đi theo mã phòng (invite code)
 */
export async function fetchTripByInviteCode(inviteCode: string) {
  if (!supabase) return { data: null, error: 'Chưa cấu hình Supabase' };

  const { data, error } = await supabase
    .from('trips')
    .select(`
      *,
      trip_members (*),
      trip_days (*),
      activities (*),
      expenses (*),
      vote_polls (
        *,
        vote_options (*)
      )
    `)
    .eq('invite_code', inviteCode.trim().toUpperCase())
    .single();

  return { data, error };
}

/**
 * 3. Tự động lưu hoặc cập nhật chuyến đi lên Supabase
 */
export async function saveTripDirectly(tripData: Record<string, unknown>) {
  if (!supabase) return { data: null, error: 'Chưa cấu hình Supabase' };

  const { data, error } = await supabase
    .from('trips')
    .upsert(tripData, { onConflict: 'id' })
    .select()
    .single();

  return { data, error };
}

/**
 * 4. Tự động thêm một mốc hoạt động mới vào bảng 'activities'
 */
export async function addActivityDirectly(activityData: Record<string, unknown>) {
  if (!supabase) return { data: null, error: 'Chưa cấu hình Supabase' };

  const { data, error } = await supabase
    .from('activities')
    .insert(activityData)
    .select()
    .single();

  return { data, error };
}

/**
 * 5. Tự động thêm khoản chi tiêu vào bảng 'expenses'
 */
export async function addExpenseDirectly(expenseData: Record<string, unknown>) {
  if (!supabase) return { data: null, error: 'Chưa cấu hình Supabase' };

  const { data, error } = await supabase
    .from('expenses')
    .insert(expenseData)
    .select()
    .single();

  return { data, error };
}

/**
 * 6. Lắng nghe thay đổi Realtime (Thời gian thực)
 * Khi bất kỳ thành viên nào thêm hoạt động hoặc chi tiền, máy của các bạn khác tự động nhận dữ liệu!
 */
export function subscribeToTripRealtime(tripId: string, onUpdate: (payload: unknown) => void) {
  if (!supabase) return () => {};

  const channel = supabase
    .channel(`trip-${tripId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'activities',
        filter: `trip_id=eq.${tripId}`,
      },
      (payload) => onUpdate(payload)
    )
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'expenses',
        filter: `trip_id=eq.${tripId}`,
      },
      (payload) => onUpdate(payload)
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
