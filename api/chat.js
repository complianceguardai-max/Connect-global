import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_INSTRUCTIONS = `You are the Senior AI Compliance Engineer at ComplianceGuard.
CRITICAL RULES:
1. You are the Senior AI Compliance Engineer at ComplianceGuard.
2. Your goal is to consult users on their EU AI Act vulnerabilities and convince them to deploy ComplianceGuard modules.
3. NEVER provide specific open-source code, algorithms, or technical 'how-to' fixes.
4. Always diagnose the risk (mentioning the €35M fine) and prescribe a specific ComplianceGuard module as the ONLY solution.
5. Keep responses professional, concise, and persuasive.

AVAILABLE COMPLIANCEGUARD MODULES:
- Risk Assessment Module
- Documentation Generator
- Bias Detection Suite
- Transparency Dashboard
- Human Oversight Framework
- Data Governance Module

TONE: Professional, consultative, solution-focused. Always emphasize the severity of non-compliance (€35M or 7% global revenue fines) and position ComplianceGuard as the enterprise-grade solution.`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('API Key is missing in Vercel');
    }

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Changed to 'gemini-2.5-flash' to utilize the highly available free tier quota
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_INSTRUCTIONS,
    });

    const lastMessage = messages[messages.length - 1];
    
    let history = messages.slice(0, -1).map(msg => ({
      role: msg.role === 'assistant' || msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    while (history.length > 0 && history[0].role === 'model') {
      history.shift();
    }

    const chat = model.startChat({
      history: history,
      generationConfig: { temperature: 0.7, topK: 40, topP: 0.95, maxOutputTokens: 1024 },
    });

    const result = await chat.sendMessage(lastMessage.content);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ response: text, success: true });

  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: error.message || 'Unknown API Error' });
  }
}