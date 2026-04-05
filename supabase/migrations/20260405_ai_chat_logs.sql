-- ─── AI Chat Logs & Sessions ───────────────────────────────────────────────
-- Run: supabase db push   OR paste into Supabase SQL editor

-- Chat log: one row per turn
CREATE TABLE IF NOT EXISTS ai_chat_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id      UUID NOT NULL,
  user_message    TEXT NOT NULL,
  ai_response     TEXT NOT NULL,
  show_lead_form  BOOLEAN DEFAULT FALSE,
  suggested_program TEXT,
  cta_type        TEXT,                    -- 'lead_form' | 'program' | 'soft_cta' | 'none'
  user_context    JSONB DEFAULT '{}',      -- { role, pain_point, intent }
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Session metadata (one row per visitor session)
CREATE TABLE IF NOT EXISTS ai_sessions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id    UUID UNIQUE NOT NULL,
  user_role     TEXT,                      -- 'HR' | 'CEO' | 'Manager' | 'Training Manager'
  pain_point    TEXT,                      -- e.g. 'communication', 'leadership', 'engagement'
  intent        TEXT,                      -- 'inquiry' | 'lead' | 'converted'
  message_count INT DEFAULT 0,
  lead_captured BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Row-level security: allow insert from anon (edge function uses service role)
ALTER TABLE ai_chat_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_sessions  ENABLE ROW LEVEL SECURITY;

-- Service role bypass (edge function uses service key — already bypasses RLS)
-- Public read-only for admin dashboard (optional — restrict further as needed)
CREATE POLICY "Service role full access on ai_chat_logs"
  ON ai_chat_logs FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access on ai_sessions"
  ON ai_sessions FOR ALL
  USING (true)
  WITH CHECK (true);

-- Indexes for admin queries
CREATE INDEX IF NOT EXISTS idx_ai_chat_logs_session_id ON ai_chat_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_ai_chat_logs_created_at ON ai_chat_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_sessions_created_at  ON ai_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_sessions_intent       ON ai_sessions(intent);
