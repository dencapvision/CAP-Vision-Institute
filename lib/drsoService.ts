import { supabase } from './supabaseClient';

export const drsoService = {
  /**
   * Generates a booking code in the format SO-YYYYMMDD-XXXX
   */
  generateBookingCode: async (prefix = 'SO') => {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
    
    // Generate a short random suffix (4 chars) to prevent collisions
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    
    // Format: PREFIX-YYYYMMDD-RAND
    return `${prefix}-${dateStr}-${randomSuffix}`;
  },

  /**
   * Creates a service booking record (supports guests)
   */
  createBooking: async (profileData: {
    full_name: string;
    email?: string;
    phone?: string;
    line_id?: string;
    challenge?: string;
    expectation?: string;
  }, serviceType: string) => {
    // 1. Get current user (Optional for guests)
    const { data: { user } } = await supabase.auth.getUser();
    
    // 2. Update Profile only if user is logged in
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
        console.warn('Profile update failed, proceeding with booking:', profileErr);
      }
    }

    // 3. Create Booking
    const bookingCode = await drsoService.generateBookingCode();
    const { data: booking, error: bookingError } = await supabase
      .from('drso_bookings')
      .insert({
        booking_code: bookingCode,
        user_id: user?.id || null,
        user_email: profileData.email || user?.email,
        user_full_name: profileData.full_name,
        user_phone: profileData.phone,
        user_line_id: profileData.line_id,
        service_type: serviceType,
        challenge: profileData.challenge,
        expectation: profileData.expectation,
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
    slipUrl?: string,
    transferDate?: string,
    transferTime?: string
  ) => {
    const { data: payment, error } = await supabase
      .from('drso_payments')
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
