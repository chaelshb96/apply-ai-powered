-- Run this in the Supabase SQL Editor to create the responses table.
-- Table: responses
-- Stores quiz submissions with shareable token links.

CREATE TABLE IF NOT EXISTS responses (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  share_token TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  answers     JSONB NOT NULL DEFAULT '{}'::jsonb,
  scores      JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Faster lookups by share token.
CREATE INDEX IF NOT EXISTS idx_responses_share_token ON responses (share_token);

-- Allow the anon role to insert and read.
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert for anon"
  ON responses FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow read by share_token for anon"
  ON responses FOR SELECT
  TO anon
  USING (true);
