import { supabase } from './supabase';

export const speakerService = {
  /**
   * Create a new booking for a speaker
   */
  async createBooking(data: {
    instructor_id: string;
    full_name: string;
    email: string;
    phone: string;
    line_id: string;
    service_type: string;
    challenge?: string;
    expectation?: string;
  }) {
    // Generate booking code: SP-YYYYMMDD-XXXX
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.floor(1000 + Math.random() * 9000);
    const bookingCode = `SP-${dateStr}-${random}`;

    const { data: { user } } = await supabase.auth.getUser();

    const { data: booking, error } = await supabase
      .from('speaker_bookings')
      .insert({
        booking_code: bookingCode,
        instructor_id: data.instructor_id,
        user_id: user?.id || null,
        user_email: data.email,
        user_full_name: data.full_name,
        user_phone: data.phone,
        user_line_id: data.line_id,
        service_type: data.service_type,
        challenge: data.challenge,
        expectation: data.expectation,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating speaker booking:', error);
      throw error;
    }

    return booking;
  },

  /**
   * Record a payment for a speaker booking
   */
  async recordPayment(
    bookingId: string,
    amount: number,
    method: string,
    status: 'pending' | 'completed',
    slipUrl?: string,
    transferDate?: string,
    transferTime?: string
  ) {
    const { data: payment, error } = await supabase
      .from('speaker_payments')
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

    if (error) {
      console.error('Error recording speaker payment:', error);
      throw error;
    }

    return payment;
  }
};
