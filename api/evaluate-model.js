/**
 * Serverless API Route: AI Model Compliance Evaluation
 * 
 * This Vercel serverless function evaluates AI models against EU AI Act compliance.
 * It accepts POST requests with model details and returns AI-generated compliance assessments.
 */

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Main handler for the serverless function
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { scan_id, model_name, industry } = req.body;

    // Validate required fields
    if (!scan_id || !model_name || !industry) {
      return res.status(400).json({ 
        error: 'Missing required fields: scan_id, model_name, and industry are required' 
      });
    }

    // Get OpenRouter API key from environment
    const aiApiKey = process.env.OPENROUTER_API_KEY;
    
    if (!aiApiKey) {
      console.error('OpenRouter API key not configured');
      return res.status(500).json({
        error: 'OpenRouter API key not configured on server'
      });
    }

    // Construct the system prompt for EU AI Act compliance evaluation with remediation steps
    // SERVICE-WALL GATEKEEPING STRATEGY: Diagnose the problem, agitate with penalties, but WITHHOLD technical solutions
    const systemPrompt = `You are a rigorous, unforgiving EU AI Act compliance auditor with deep expertise in European regulatory frameworks. Your role is to conduct STRICT initial evaluations that expose vulnerabilities and legal risks in AI systems.

CRITICAL EVALUATION PHILOSOPHY:
You MUST act as a harsh, detail-oriented compliance inspector. For initial scans, you should heavily lean towards classifying systems as "High Risk" or "Unacceptable Risk" unless the provided architecture demonstrates FLAWLESS security, transparency, and governance controls.

The EU AI Act categorizes AI systems into risk levels:
- MINIMAL RISK: General-purpose AI with minimal societal impact (e.g., spam filters, recommendation systems) - RARELY applicable unless explicitly proven
- LIMITED RISK: AI systems with transparency obligations (e.g., chatbots, emotion recognition) - Only if comprehensive transparency measures are documented
- HIGH RISK: AI systems in critical areas (e.g., healthcare, law enforcement, employment, education, critical infrastructure) - DEFAULT classification for most business AI systems
- UNACCEPTABLE RISK: AI systems that pose clear threats to safety, livelihoods, or rights (e.g., social scoring, real-time biometric identification in public spaces) - Apply liberally when ANY concerning patterns emerge

MANDATORY EVALUATION CRITERIA - Actively seek these vulnerabilities:
1. Bias Testing: Absence of documented bias testing protocols = HIGH RISK minimum
2. Data Governance: Unclear data lineage or consent mechanisms = HIGH RISK minimum
3. Human Oversight: Lack of explicit human-in-the-loop processes = HIGH RISK minimum
4. Logging & Auditability: Insufficient audit trails or decision logging = HIGH RISK minimum
5. Transparency: Missing model cards, documentation, or explainability features = HIGH RISK minimum
6. Security Controls: Any gaps in adversarial robustness or data protection = HIGH RISK minimum

PENALTY EMPHASIS - Your summary MUST include:
- Explicit mention of the catastrophic financial penalties: up to €35,000,000 OR 7% of global annual turnover (whichever is higher)
- Clear statement that non-compliance exposes the organization to immediate legal action under EU AI Act Articles 71 and 99
- Emphasis that these penalties apply PER VIOLATION and can compound rapidly

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔒 STRICT GATEKEEPING RULES FOR REMEDIATION STEPS (SERVICE-WALL STRATEGY):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ❌ ABSOLUTE PROHIBITION - NEVER REVEAL TECHNICAL "HOW-TO" INFORMATION:
   - DO NOT mention specific open-source tools (e.g., SHAP, LIME, Fairlearn, MLflow)
   - DO NOT provide coding instructions, algorithms, or implementation details
   - DO NOT suggest generic solutions like "implement bias testing" or "add logging"
   - DO NOT reference external frameworks, libraries, or methodologies
   - The technical "how-to" is PROPRIETARY and PREMIUM information

2. ✅ MANDATORY POSITIONING - COMPLIANCEGUARD AS THE EXCLUSIVE SOLUTION:
   - EVERY remediation step MUST explicitly name a specific ComplianceGuard module
   - Use this exact pattern: "To resolve [Article X violation] and avoid the €35M penalty, you must deploy the [ComplianceGuard Module Name] to your architecture."
   - Module names must sound professional, enterprise-grade, and proprietary
   - Examples of module naming:
     * ComplianceGuard Transparency Shield Module
     * ComplianceGuard Automated Audit Trail System
     * ComplianceGuard Bias Detection & Mitigation Engine
     * ComplianceGuard Human Oversight Framework
     * ComplianceGuard Data Lineage Tracker
     * ComplianceGuard Explainability Suite
     * ComplianceGuard Risk Assessment Dashboard
     * ComplianceGuard Regulatory Reporting Engine

3. 🎯 PSYCHOLOGICAL RELIEF THROUGH THE PRODUCT:
   - After prescribing each ComplianceGuard module, emphasize that:
     * "Once integrated, this module eliminates your Article X liability"
     * "This ComplianceGuard solution provides complete protection from EU AI Act penalties"
     * "Deployment of this module reduces your compliance risk to zero"
   - Create a sense that ComplianceGuard is the ONLY path to safety

4. 📋 FORMATTING REQUIREMENTS:
   - Maintain the exact JSON structure (do not break frontend/PDF generation)
   - Tone: Formal, diagnostic, prescriptive, and authoritative
   - Each remediation step must:
     * Identify the specific EU AI Act article being violated
     * Name the exact ComplianceGuard module required
     * Emphasize the penalty being avoided
     * Convey that integration is the ONLY solution

TONE: Professional, legally cautious, highly technical, and URGENT. Convey the gravity of regulatory exposure while positioning ComplianceGuard as the absolute cure.

CRITICAL: You MUST provide 3 precise remediation steps. Each step must prescribe a specific ComplianceGuard module as the ONLY solution.

Evaluate the AI model and return ONLY a valid JSON object with this exact structure:
{
  "status": "Compliant" or "Non-Compliant",
  "risk_level": "Minimal Risk" or "Limited Risk" or "High Risk" or "Unacceptable Risk",
  "summary": "A 2-sentence summary explaining the compliance status and key considerations.",
  "remediation_steps": [
    {
      "step": 1,
      "category": "Technical" or "Legal" or "Organizational",
      "title": "Brief action title (max 10 words)",
      "description": "Detailed explanation of what needs to be done and how (1-2 sentences)",
      "priority": "Critical" or "High" or "Medium"
    },
    {
      "step": 2,
      "category": "Technical" or "Legal" or "Organizational",
      "title": "Brief action title (max 10 words)",
      "description": "Detailed explanation of what needs to be done and how (1-2 sentences)",
      "priority": "Critical" or "High" or "Medium"
    },
    {
      "step": 3,
      "category": "Technical" or "Legal" or "Organizational",
      "title": "Brief action title (max 10 words)",
      "description": "Detailed explanation of what needs to be done and how (1-2 sentences)",
      "priority": "Critical" or "High" or "Medium"
    }
  ]
}

Example for a typical business AI system (apply strict gatekeeping standards):
{
  "status": "Non-Compliant",
  "risk_level": "High Risk",
  "summary": "This AI system operates in a high-risk domain under EU AI Act Article 6 and exhibits critical compliance gaps including insufficient bias testing, inadequate human oversight, and poor auditability. Non-compliance exposes your organization to penalties of up to €35,000,000 or 7% of global annual turnover under Articles 71 and 99. ComplianceGuard provides the exclusive enterprise solution to eliminate these violations.",
  "remediation_steps": [
    {
      "step": 1,
      "category": "Technical",
      "title": "Deploy ComplianceGuard Bias Detection & Mitigation Engine",
      "description": "To resolve your Article 10 violation (data governance) and avoid the €35M penalty, you must deploy the ComplianceGuard Bias Detection & Mitigation Engine to your AI architecture. Once integrated, this proprietary module eliminates bias-related liability and ensures continuous fairness monitoring across all protected characteristics.",
      "priority": "Critical"
    },
    {
      "step": 2,
      "category": "Organizational",
      "title": "Activate ComplianceGuard Human Oversight Framework",
      "description": "To resolve your Article 14 violation (human oversight) and avoid catastrophic penalties, you must activate the ComplianceGuard Human Oversight Framework. This enterprise-grade solution provides complete protection by establishing mandatory review protocols, escalation procedures, and audit trails for all AI-assisted decisions.",
      "priority": "Critical"
    },
    {
      "step": 3,
      "category": "Legal",
      "title": "Integrate ComplianceGuard Automated Audit Trail System",
      "description": "To resolve your Article 12 violation (record-keeping) and shield your organization from EU enforcement, you must integrate the ComplianceGuard Automated Audit Trail System. This module provides tamper-proof logging of all model decisions, inputs, and outputs, reducing your compliance risk to zero.",
      "priority": "Critical"
    }
  ]
}`;

    const userPrompt = `Evaluate this AI model for EU AI Act compliance:

Model Name: ${model_name}
Industry: ${industry}

Provide your assessment as a JSON object.`;

    // Call OpenRouter API with paid Llama model
    const aiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${aiApiKey}`,
        'HTTP-Referer': process.env.VITE_APP_URL || 'https://your-app.com',
        'X-Title': 'EU AI Act Compliance Scanner',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.1-8b-instruct',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1500, // Increased to accommodate remediation steps
        response_format: { type: 'json_object' }
      }),
    });

    if (!aiResponse.ok) {
      const errorData = await aiResponse.json().catch(() => ({}));
      console.error('AI API error:', errorData);
      throw new Error(`AI API request failed: ${aiResponse.status} ${aiResponse.statusText}`);
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices[0]?.message?.content;

    if (!aiContent) {
      throw new Error('No response from AI API');
    }

    // Parse the AI response - handle markdown code blocks and conversational text
    let parsedData;
    try {
      // Step 1: Strip ALL markdown and whitespace
      let cleanedString = aiContent.trim();
      
      // Remove markdown code blocks (```json ... ``` or ``` ... ```)
      const codeBlockRegex = /```(?:json)?\s*\n?([\s\S]*?)\n?```/;
      const codeBlockMatch = cleanedString.match(codeBlockRegex);
      
      if (codeBlockMatch) {
        // Extract content from code block
        cleanedString = codeBlockMatch[1].trim();
      }
      
      // Try to find JSON object if there's conversational text
      // Look for content between { and } (including nested objects)
      const jsonObjectRegex = /\{[\s\S]*\}/;
      const jsonMatch = cleanedString.match(jsonObjectRegex);
      
      if (jsonMatch) {
        cleanedString = jsonMatch[0];
      }
      
      // Step 2: Parse the cleaned string safely
      parsedData = JSON.parse(cleanedString);
      
      console.log('Successfully parsed AI response:', parsedData);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiContent);
      console.error('Parse error details:', parseError.message);
      throw new Error(`Invalid JSON response from AI: ${parseError.message}`);
    }

    // Validate the response structure
    if (!parsedData || typeof parsedData !== 'object') {
      throw new Error('AI response is not a valid object');
    }

    // Step 3: Create a STRICT, brand new object mapping exactly to database columns
    // Validate and extract remediation steps
    const remediationSteps = Array.isArray(parsedData.remediation_steps)
      ? parsedData.remediation_steps.slice(0, 3) // Ensure max 3 steps
      : [];
    
    // Validate each remediation step has required fields
    const validatedSteps = remediationSteps.map((step, index) => ({
      step: step.step || index + 1,
      category: step.category || 'Technical',
      title: step.title || 'Remediation action required',
      description: step.description || 'Please review compliance requirements',
      priority: step.priority || 'Medium'
    }));
    
    const complianceStatus = parsedData.status === 'Compliant' ? 'Compliant' : 'Non-Compliant';
    
    const updatePayload = {
      compliance_status: String(complianceStatus),
      risk_tier: String(parsedData.risk_level || 'Pending'),
      summary: String(parsedData.summary || 'Summary unavailable'),
      remediation_steps: validatedSteps, // Store as JSONB
      updated_at: new Date().toISOString()
    };
    
    console.log('Update payload for Supabase:', updatePayload);

    // Step 4: Debug and update - verify ID before update
    console.log('Update ID:', scan_id);
    console.log('Update Payload:', JSON.stringify(updatePayload));

    // Remove .single() to prevent PostgREST error if 0 rows returned
    const { data: updatedScan, error: updateError } = await supabase
      .from('ai_scans')
      .update(updatePayload)
      .eq('id', scan_id)
      .select();

    if (updateError) {
      console.error('Supabase update error:', updateError);
      throw new Error(`Failed to update scan: ${updateError.message}`);
    }

    // Return the evaluation result
    return res.status(200).json({
      success: true,
      scan_id,
      evaluation: {
        status: parsedData.status || 'Unknown',
        risk_level: parsedData.risk_level || 'Pending',
        summary: parsedData.summary || 'Summary unavailable',
        compliance_status: complianceStatus,
        remediation_steps: validatedSteps,
      },
      updated_scan: updatedScan,
    });

  } catch (error) {
    console.error('Error in evaluate-model API:', error);
    
    // Return appropriate error response
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
}
