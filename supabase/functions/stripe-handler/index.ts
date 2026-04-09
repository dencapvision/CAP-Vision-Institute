import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";
import Stripe from "https://esm.sh/stripe@14.23.0?target=deno";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  const { method } = req;

  // Handle CORS
  if (method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname.split("/").pop();

    // 1. CREATE CHECKOUT SESSION
    if (path === "create-checkout") {
      const { priceId, userEmail, userId, bookingId, metadata } = await req.json();

      const session = await stripe.checkout.sessions.create({
        customer_email: userEmail,
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: metadata?.isSubscription ? "subscription" : "payment",
        success_url: `${req.headers.get("origin")}/ceo-dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get("origin")}/ceo-tier-community`,
        metadata: {
          userId,
          bookingId,
          ...metadata,
        },
      });

      return new Response(JSON.stringify({ id: session.id, url: session.url }), {
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // 2. WEBHOOK HANDLER
    if (path === "webhook") {
      const signature = req.headers.get("stripe-signature");
      if (!signature) throw new Error("No signature");

      const body = await req.text();
      const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
      
      let event;
      try {
        event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret ?? "");
      } catch (err) {
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
      }

      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const { userId, bookingId } = session.metadata || {};

        // Update payment status
        await supabaseAdmin
          .from("ceo_payments")
          .update({ 
            status: "completed", 
            stripe_session_id: session.id,
            paid_at: new Date().toISOString()
          })
          .eq("booking_id", bookingId);

        // Update booking status
        await supabaseAdmin
          .from("ceo_bookings")
          .update({ status: "confirmed" })
          .eq("id", bookingId);

        // If it's a membership, handle membership creation
        if (session.mode === "subscription") {
           // Logic to add to ceo_memberships
           const endDate = new Date();
           endDate.setMonth(endDate.getMonth() + 1); // 1 month for Monthly

           await supabaseAdmin.from("ceo_memberships").insert({
             user_id: userId,
             plan_type: "monthly",
             status: "active",
             end_date: endDate.toISOString()
           });

           await supabaseAdmin.from("profiles").update({ is_ceo_member: true }).eq("id", userId);
        }

        // Trigger LINE Notification via another function or call directly
        await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/line-notify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`
          },
          body: JSON.stringify({
            formType: "New Payment (Stripe)",
            data: {
              "User ID": userId,
              "Booking ID": bookingId,
              "Amount": session.amount_total ? session.amount_total / 100 : 0,
              "Status": "Paid & Confirmed"
            }
          })
        });
      }

      return new Response(JSON.stringify({ received: true }), { status: 200 });
    }

    return new Response("Not Found", { status: 404 });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
