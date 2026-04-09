import { supabase } from './supabaseClient';

export const ceoService = {
  /**
   * Generates a booking code in the format CEO-YYYYMMDD-XXX
   */
  generateBookingCode: async (prefix = 'CEO') => {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
    
    // Count existing bookings for today to get the sequence
    const { count, error } = await supabase
      .from('ceo_bookings')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today.toISOString().slice(0, 10));
      
    if (error) console.error('Error counting bookings:', error);
    
    const sequence = ((count || 0) + 1).toString().padStart(3, '0');
    return `${prefix}-${dateStr}-${sequence}`;
  },

  /**
   * Creates a full booking record with profile update
   */
  createBooking: async (profileData: any, bookingType: 'session' | 'membership', planName?: string, sessionDate?: string) => {
    // 1. Update Profile
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        ...profileData,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (profileError) throw profileError;

    // 2. Create Booking
    const bookingCode = await ceoService.generateBookingCode();
    const { data: booking, error: bookingError } = await supabase
      .from('ceo_bookings')
      .insert({
        booking_code: bookingCode,
        user_id: user.id,
        type: bookingType,
        plan_name: planName || (bookingType === 'session' ? 'Single Session' : 'Monthly Member'),
        session_date: sessionDate,
        status: 'pending'
      })
      .select()
      .single();

    if (bookingError) throw bookingError;

    return booking;
  },

  /**
   * Records a payment entry
   */
  recordPayment: async (bookingId: string, amount: number, method: 'stripe' | 'transfer', status = 'pending', slipUrl?: string) => {
    const { data: payment, error } = await supabase
      .from('ceo_payments')
      .insert({
        booking_id: bookingId,
        amount,
        method,
        status,
        slip_url: slipUrl
      })
      .select()
      .single();

    if (error) throw error;
    return payment;
  }
};
