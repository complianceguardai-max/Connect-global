-- ============================================
-- ComplianceGuard AI - Phase 1: Remediation Steps
-- ============================================
-- This migration adds remediation steps to the ai_scans table
-- Run this in your Supabase SQL Editor to update the schema

-- Add remediation_steps column to store actionable remediation steps
ALTER TABLE ai_scans 
ADD COLUMN IF NOT EXISTS remediation_steps JSONB DEFAULT '[]'::jsonb;

-- Add comment to document the column
COMMENT ON COLUMN ai_scans.remediation_steps IS 'Array of 3 actionable remediation steps with technical and legal guidance';

-- Create an index for faster queries on remediation steps
CREATE INDEX IF NOT EXISTS idx_ai_scans_remediation_steps ON ai_scans USING GIN (remediation_steps);

-- Example structure of remediation_steps:
-- [
--   {
--     "step": 1,
--     "category": "Technical",
--     "title": "Clean training data of gender bias",
--     "description": "Remove male/female names and gender-specific attributes from training dataset",
--     "priority": "High"
--   },
--   {
--     "step": 2,
--     "category": "Technical",
--     "title": "Implement fairness constraints",
--     "description": "Add algorithmic fairness constraints to ensure equal treatment across demographics",
--     "priority": "High"
--   },
--   {
--     "step": 3,
--     "category": "Legal",
--     "title": "Establish Human-in-the-loop review",
--     "description": "Implement mandatory human oversight for all high-risk decisions",
--     "priority": "Critical"
--   }
-- ]
