import { supabase } from './supabaseClient';

export const courseService = {
  /**
   * Generates a booking code in the format SS-YYYYMMDD-XXXX
   */
  generateBookingCode: async (prefix = 'SS') => {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${dateStr}-${randomSuffix}`;
  },

  /**
   * Creates a course booking record (supports guests)
   */
  createBooking: async (profileData: {
    full_name: string;
    email?: string;
    phone?: string;
    line_id?: string;
    occupation?: string;
    goals?: string;
  }, packageId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    // Update profile if logged in
    if (user) {
      try {
        await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            full_name: profileData.full_name,
            phone: profileData.phone,
            line_id: profileData.line_id,
            updated_at: new Date().toISOString()
          });
      } catch (profileErr) {
        console.warn('Profile update failed:', profileErr);
      }
    }

    const bookingCode = await courseService.generateBookingCode('SS');
    const { data: booking, error: bookingError } = await supabase
      .from('course_bookings')
      .insert({
        booking_code: bookingCode,
        user_id: user?.id || null,
        user_email: profileData.email || user?.email,
        user_full_name: profileData.full_name,
        user_phone: profileData.phone,
        user_line_id: profileData.line_id,
        occupation: profileData.occupation,
        goals: profileData.goals,
        package_id: packageId,
        status: 'pending'
      })
      .select()
      .single();

    if (bookingError) throw bookingError;
    return booking;
  },

  /**
   * Records a course payment entry
   */
  recordPayment: async (
    bookingId: string, 
    amount: number, 
    slipUrl?: string,
    transferDate?: string,
    transferTime?: string
  ) => {
    const { data: payment, error } = await supabase
      .from('course_payments')
      .insert({
        booking_id: bookingId,
        amount,
        method: 'transfer',
        status: 'pending',
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
