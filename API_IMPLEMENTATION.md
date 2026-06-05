# ComplianceGuard AI - API Implementation Guide

## Overview

This document describes the serverless API architecture for AI model compliance evaluation using the EU AI Act framework.

## Architecture

### 1. Serverless API Route (`api/evaluate-model.js`)

A Vercel serverless function that:
- Accepts POST requests with AI model details
- Constructs an EU AI Act compliance evaluation prompt
- Calls OpenAI API for intelligent compliance assessment
- Updates the Supabase database with results
- Returns structured compliance data

**Endpoint:** `/api/evaluate-model`

**Method:** `POST`

**Request Body:**
```json
{
  "scan_id": "uuid-of-scan-record",
  "model_name": "GPT-4 Chatbot",
  "industry": "Healthcare"
}
```

**Response (Success):**
```json
{
  "success": true,
  "scan_id": "uuid-of-scan-record",
  "evaluation": {
    "status": "Compliant",
    "risk_level": "High Risk",
    "summary": "This AI system operates in healthcare, classified as high-risk under EU AI Act. Compliance requires robust documentation and human oversight.",
    "compliance_status": true
  },
  "updated_scan": {
    "id": "uuid",
    "model_name": "GPT-4 Chatbot",
    "industry": "Healthcare",
    "risk_tier": "High Risk",
    "compliance_status": true,
    "summary": "...",
    "created_at": "2026-05-22T14:00:00Z",
    "updated_at": "2026-05-22T14:00:05Z"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Error message",
  "details": "Stack trace (development only)"
}
```

### 2. Frontend Integration (`ComplianceGuardDashboard.jsx`)

The dashboard component:
1. Creates a new scan record in Supabase with pending status
2. Immediately displays the scan with "Evaluating..." state
3. Calls the `/api/evaluate-model` endpoint
4. Updates the UI with AI-generated results
5. Handles timeouts and errors gracefully

**Flow:**
```
User clicks "Run New AI Scan"
  ↓
Modal opens for input (model name, industry)
  ↓
User submits
  ↓
INSERT into Supabase ai_scans table
  ↓
Display "Scanning..." notification
  ↓
POST to /api/evaluate-model
  ↓
API calls OpenAI for evaluation
  ↓
API updates Supabase with results
  ↓
Frontend receives response
  ↓
UI updates with AI-generated compliance data
```

### 3. Database Schema (`ai_scans` table)

```sql
CREATE TABLE ai_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  risk_tier TEXT NOT NULL DEFAULT 'Minimal Risk',
  compliance_status BOOLEAN NOT NULL DEFAULT true,
  summary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory with:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI API Configuration
VITE_AI_API_KEY=your_openai_api_key
OPENAI_API_KEY=your_openai_api_key
```

**Getting API Keys:**

1. **Supabase:**
   - Go to https://app.supabase.com
   - Select your project
   - Navigate to Settings → API
   - Copy the Project URL and anon/public key

2. **OpenAI:**
   - Go to https://platform.openai.com/api-keys
   - Create a new API key
   - Copy and save it securely

### 2. Database Setup

Run the SQL schema in your Supabase SQL Editor:

```bash
# Copy the contents of supabase-schema.sql
# Paste into Supabase SQL Editor
# Execute the query
```

This creates:
- `ai_scans` table with proper indexes
- Row Level Security (RLS) policies
- Automatic timestamp triggers

### 3. Deploy to Vercel

The `api/` directory is automatically recognized by Vercel as serverless functions.

**Deployment Steps:**

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_AI_API_KEY` or `OPENAI_API_KEY`
4. Deploy

**Local Testing:**

```bash
# Install Vercel CLI
npm i -g vercel

# Run locally
vercel dev
```

This will run the serverless functions locally at `http://localhost:3000/api/evaluate-model`

### 4. Testing the API

**Using curl:**

```bash
curl -X POST http://localhost:3000/api/evaluate-model \
  -H "Content-Type: application/json" \
  -d '{
    "scan_id": "your-scan-uuid",
    "model_name": "GPT-4 Medical Assistant",
    "industry": "Healthcare"
  }'
```

**Using the UI:**

1. Navigate to the ComplianceGuard Dashboard
2. Click "Run New AI Scan"
3. Enter model name and industry
4. Submit and watch the evaluation process

## Error Handling

### Timeout Handling

The frontend implements a 30-second timeout:

```javascript
signal: AbortSignal.timeout(30000)
```

If the API takes longer than 30 seconds:
- User sees: "AI evaluation timed out. Scan saved with default values."
- The scan record remains in the database with initial values
- User can manually re-evaluate if needed

### API Errors

Common errors and solutions:

| Error | Cause | Solution |
|-------|-------|----------|
| `AI API key not configured` | Missing environment variable | Add `VITE_AI_API_KEY` to `.env` |
| `Failed to update scan` | Supabase RLS policy issue | Check RLS policies in Supabase |
| `Invalid JSON response from AI` | AI returned non-JSON | Check OpenAI API status |
| `Method not allowed` | Wrong HTTP method | Use POST only |

## EU AI Act Risk Levels

The API evaluates models against these risk tiers:

1. **Minimal Risk**: General-purpose AI (spam filters, recommendations)
2. **Limited Risk**: AI with transparency obligations (chatbots, emotion recognition)
3. **High Risk**: Critical applications (healthcare, law enforcement, employment)
4. **Unacceptable Risk**: Prohibited systems (social scoring, mass surveillance)

## Security Considerations

1. **API Keys**: Never commit `.env` files to version control
2. **RLS Policies**: Supabase Row Level Security protects data access
3. **Rate Limiting**: Consider adding rate limiting to the API endpoint
4. **Input Validation**: API validates all required fields
5. **Error Messages**: Production errors don't expose sensitive details

## Cost Optimization

**OpenAI API Costs:**
- Model: `gpt-4o-mini` (cost-effective)
- Max tokens: 500 per request
- Estimated cost: ~$0.001 per evaluation

**Supabase:**
- Free tier: 500MB database, 2GB bandwidth
- Sufficient for thousands of scans

## Monitoring

**Vercel Dashboard:**
- View function invocations
- Monitor response times
- Check error rates

**Supabase Dashboard:**
- Query the `ai_scans` table
- Monitor database performance
- View real-time updates

## Future Enhancements

1. **Caching**: Cache similar evaluations to reduce API calls
2. **Batch Processing**: Evaluate multiple models simultaneously
3. **Webhooks**: Notify users when evaluation completes
4. **Advanced Analytics**: Track compliance trends over time
5. **Custom Models**: Support for other AI providers (Anthropic, Cohere)

## Troubleshooting

### API not responding

```bash
# Check Vercel logs
vercel logs

# Test API directly
curl -X POST https://your-app.vercel.app/api/evaluate-model \
  -H "Content-Type: application/json" \
  -d '{"scan_id":"test","model_name":"Test","industry":"Test"}'
```

### Database connection issues

```javascript
// Test Supabase connection
import { supabase } from './src/lib/supabase';

const { data, error } = await supabase
  .from('ai_scans')
  .select('*')
  .limit(1);

console.log('Connection test:', { data, error });
```

### OpenAI API errors

- Check API key validity at https://platform.openai.com/api-keys
- Verify billing is set up
- Check rate limits and quotas

## Support

For issues or questions:
1. Check Vercel function logs
2. Review Supabase logs
3. Verify environment variables are set correctly
4. Test API endpoint independently

## License

This implementation is part of the ComplianceGuard AI system.
