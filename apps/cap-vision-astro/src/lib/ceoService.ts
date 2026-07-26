import { supabase } from './supabase';

export const ceoService = {
  /**
   * Generates a booking code in the format CEO-YYYYMMDD-XXX
   */
  generateBookingCode: async (prefix = 'CEO') => {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
    
    // Generate a short random suffix (4 chars) to prevent collisions
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    
    // Format: PREFIX-YYYYMMDD-RAND
    return `${prefix}-${dateStr}-${randomSuffix}`;
  },

  /**
   * Creates a full booking record with profile update (supports guests)
   */
  createBooking: async (profileData: any, bookingType: 'session' | 'membership', planName?: string, sessionDate?: string) => {
    // 1. Get current user (Optional for guests)
    const { data: { user } } = await supabase.auth.getUser();
    
    // 2. Update Profile only if user is logged in
    if (user) {
      try {
        await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            ...profileData,
            updated_at: new Date().toISOString()
          });
      } catch (profileErr) {
        console.warn('Profile update failed, proceeding with booking:', profileErr);
      }
    }

    // 3. Create Booking (Robust with contact info redundancy for guests)
    const bookingCode = await ceoService.generateBookingCode();
    const { data: booking, error: bookingError } = await supabase
      .from('ceo_bookings')
      .insert({
        booking_code: bookingCode,
        user_id: user?.id || null,
        user_email: profileData.email || user?.email,
        user_full_name: profileData.full_name,
        user_phone: profileData.phone,
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
  recordPayment: async (
    bookingId: string, 
    amount: number, 
    method: 'stripe' | 'transfer', 
    status = 'pending', 
    slipUrl?: string,
    transferDate?: string,
    transferTime?: string
  ) => {
    const { data: payment, error } = await supabase
      .from('ceo_payments')
      .insert({
        booking_id: bookingId,
        amount,
        method,
        status,
        slip_url: slipUrl,
        transfer_date: transferDate,
        transfer_time: transferTime
      })
      .select()
      .single();

    if (error) throw error;
    return payment;
  }
};
