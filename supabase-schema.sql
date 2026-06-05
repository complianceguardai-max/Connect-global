-- ============================================
-- ComplianceGuard AI - Database Schema
-- ============================================
-- This file contains the SQL schema for the ComplianceGuard AI system
-- Run this in your Supabase SQL Editor to create the necessary tables

-- Create ENUM type for AI Risk Tiers
CREATE TYPE ai_risk_tier AS ENUM ('Minimal', 'Limited', 'High', 'Unacceptable');

-- Create the products table
CREATE TABLE products (
  -- Primary key with auto-increment
  id BIGSERIAL PRIMARY KEY,
  
  -- Product information
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  
  -- AI Compliance fields
  ai_risk_tier ai_risk_tier NOT NULL DEFAULT 'Minimal',
  compliance_status BOOLEAN NOT NULL DEFAULT false,
  
  -- Immutable audit log (JSONB for flexible audit data)
  -- This column stores the complete history of changes
  audit_log JSONB NOT NULL DEFAULT '[]'::jsonb,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create an index on ai_risk_tier for faster filtering
CREATE INDEX idx_products_ai_risk_tier ON products(ai_risk_tier);

-- Create an index on compliance_status for faster filtering
CREATE INDEX idx_products_compliance_status ON products(compliance_status);

-- Create a composite index for common queries
CREATE INDEX idx_products_risk_compliance ON products(ai_risk_tier, compliance_status);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow read access to all authenticated users
CREATE POLICY "Allow read access to all users" ON products
  FOR SELECT
  USING (true);

-- Create a policy to allow insert for authenticated users
CREATE POLICY "Allow insert for authenticated users" ON products
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Create a policy to allow update for authenticated users
CREATE POLICY "Allow update for authenticated users" ON products
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function before any update
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to append to audit_log (immutable pattern)
-- This ensures audit_log can only be appended to, never modified or deleted
CREATE OR REPLACE FUNCTION append_to_audit_log()
RETURNS TRIGGER AS $$
DECLARE
  audit_entry JSONB;
BEGIN
  -- Create audit entry with change details
  audit_entry := jsonb_build_object(
    'timestamp', NOW(),
    'action', TG_OP,
    'user_id', auth.uid(),
    'changes', CASE
      WHEN TG_OP = 'INSERT' THEN jsonb_build_object('new', row_to_json(NEW))
      WHEN TG_OP = 'UPDATE' THEN jsonb_build_object(
        'old', row_to_json(OLD),
        'new', row_to_json(NEW)
      )
      WHEN TG_OP = 'DELETE' THEN jsonb_build_object('old', row_to_json(OLD))
    END
  );
  
  -- Append to audit_log (immutable - only append, never modify existing entries)
  IF TG_OP = 'DELETE' THEN
    -- For DELETE, we can't modify NEW, so we just return OLD
    RETURN OLD;
  ELSE
    NEW.audit_log = COALESCE(OLD.audit_log, '[]'::jsonb) || audit_entry;
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically append to audit_log
CREATE TRIGGER audit_log_trigger
  BEFORE INSERT OR UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION append_to_audit_log();

-- ============================================
-- Sample Data (Optional - for testing)
-- ============================================

INSERT INTO products (name, category, ai_risk_tier, compliance_status) VALUES
  ('AI-Powered Chatbot', 'Customer Service', 'Minimal', true),
  ('Facial Recognition System', 'Security', 'High', false),
  ('Predictive Analytics Tool', 'Business Intelligence', 'Limited', true),
  ('Autonomous Weapon System', 'Defense', 'Unacceptable', false),
  ('Medical Diagnosis AI', 'Healthcare', 'High', true),
  ('Content Recommendation Engine', 'Media', 'Minimal', true),
  ('Credit Scoring Algorithm', 'Finance', 'High', false),
  ('Social Scoring System', 'Government', 'Unacceptable', false),
  ('Email Spam Filter', 'Communication', 'Minimal', true),
  ('Hiring Screening AI', 'Human Resources', 'Limited', false);

-- ============================================
-- Useful Queries
-- ============================================

-- Get all products by risk tier
-- SELECT * FROM products WHERE ai_risk_tier = 'High';

-- Get non-compliant high-risk products
-- SELECT * FROM products WHERE ai_risk_tier = 'High' AND compliance_status = false;

-- Get products with their audit history
-- SELECT id, name, ai_risk_tier, compliance_status, 
--        jsonb_pretty(audit_log) as audit_history 
-- FROM products;

-- Count products by risk tier
-- SELECT ai_risk_tier, COUNT(*) as count
-- FROM products
-- GROUP BY ai_risk_tier
-- ORDER BY count DESC;

-- ============================================
-- AI Scans Table
-- ============================================
-- This table stores AI model compliance scans

CREATE TABLE ai_scans (
  -- Primary key with UUID
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Scan information
  model_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  
  -- AI Compliance evaluation results
  risk_tier TEXT NOT NULL DEFAULT 'Minimal Risk',
  compliance_status BOOLEAN NOT NULL DEFAULT true,
  summary TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX idx_ai_scans_risk_tier ON ai_scans(risk_tier);
CREATE INDEX idx_ai_scans_compliance_status ON ai_scans(compliance_status);
CREATE INDEX idx_ai_scans_created_at ON ai_scans(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE ai_scans ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow read access to all users
CREATE POLICY "Allow read access to all users" ON ai_scans
  FOR SELECT
  USING (true);

-- Create a policy to allow insert for all users (for demo purposes)
CREATE POLICY "Allow insert for all users" ON ai_scans
  FOR INSERT
  WITH CHECK (true);

-- Create a policy to allow update for all users (for API updates)
CREATE POLICY "Allow update for all users" ON ai_scans
  FOR UPDATE
  USING (true);

-- Trigger to automatically update the updated_at timestamp
CREATE TRIGGER update_ai_scans_updated_at
  BEFORE UPDATE ON ai_scans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
