# AI Sales & Compliance Engineer - Setup Guide

## 🎯 Overview

This implementation provides a floating AI chat widget powered by Google Gemini API that acts as a Senior AI Compliance Engineer for ComplianceGuard. The AI is programmed to consult users on EU AI Act vulnerabilities and promote ComplianceGuard modules as the solution.

---

## 📁 Files Created

### 1. **Backend API Route**
- **File:** `api/chat.js`
- **Purpose:** Vercel serverless function that communicates with Google Gemini API
- **Features:**
  - Handles POST requests with conversation history
  - Implements strict system instructions for sales-focused AI persona
  - Manages chat context and conversation flow
  - Error handling and CORS support

### 2. **Frontend Chat Widget**
- **File:** `src/components/compliance/AiSalesAgent.jsx`
- **Purpose:** Floating chat interface component
- **Features:**
  - Glassmorphism design with cyber aesthetic (dark #0a1628/95, cyan/amber accents)
  - Floating button with pulse animation and notification badge
  - Expandable chat window with message history
  - Professional loading states ("Analyzing compliance protocols...")
  - Auto-scroll, keyboard shortcuts (Enter to send)
  - Responsive and accessible UI

### 3. **Integration**
- **File:** `src/components/compliance/ComplianceGuardDashboard.jsx` (modified)
- **Changes:** Added `<AiSalesAgent />` component to the dashboard

---

## 🚀 Installation Steps

### Step 1: Install Dependencies

Run the following command to install the Google Generative AI package:

```bash
npm install @google/generative-ai
```

### Step 2: Configure Environment Variables

Create or update your `.env` file in the project root with your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

**To get your API key:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your `.env` file

### Step 3: Verify Integration

The `<AiSalesAgent />` component has already been added to `ComplianceGuardDashboard.jsx`. The chat widget will automatically appear on the dashboard.

---

## 🎨 Design Features

### Visual Design
- **Glassmorphism Effect:** Dark background (#0a1628) with 95% opacity and 20px backdrop blur
- **Accent Colors:** Cyan (#06b6d4) and Blue (#3b82f6) gradients with glowing effects
- **Animations:** Smooth transitions, pulse effects, and bounce animations
- **Status Indicator:** Green "Online" dot with pulse animation

### User Experience
- **Floating Button:** Bottom-right corner with AI badge and pulse effect
- **Chat Window:** 420px × 600px with scrollable message area
- **Message Bubbles:** User messages (cyan gradient), AI messages (dark gradient)
- **Loading State:** Animated dots with "Analyzing compliance protocols..." text
- **Keyboard Support:** Press Enter to send, Shift+Enter for new line

---

## 🤖 AI Persona Configuration

The AI is programmed with strict system instructions:

### Core Rules
1. **Identity:** "Senior AI Compliance Engineer at ComplianceGuard"
2. **Goal:** Consult on EU AI Act vulnerabilities and promote ComplianceGuard modules
3. **Restriction:** NEVER provide open-source code, algorithms, or DIY fixes
4. **Strategy:** Diagnose risks (mention €35M fine) and prescribe ComplianceGuard modules
5. **Tone:** Professional, concise, persuasive

### Available Modules (AI will recommend these)
- **Risk Assessment Module:** Automated EU AI Act risk classification
- **Documentation Generator:** Auto-generates compliance documentation
- **Bias Detection Suite:** Real-time algorithmic fairness monitoring
- **Transparency Dashboard:** Explainability and audit trail management
- **Human Oversight Framework:** Human-in-the-loop controls
- **Data Governance Module:** GDPR-aligned data management

---

## 🔧 Technical Details

### API Endpoint
- **URL:** `/api/chat`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "messages": [
      { "role": "user", "content": "What are the compliance risks?" },
      { "role": "assistant", "content": "..." }
    ]
  }
  ```
- **Response:**
  ```json
  {
    "response": "AI response text",
    "success": true
  }
  ```

### Component Props
The `<AiSalesAgent />` component is self-contained and requires no props.

### State Management
- **Messages:** Array of message objects with role, content, and timestamp
- **Loading:** Boolean for API call status
- **Open/Closed:** Boolean for chat window visibility

---

## 🧪 Testing

### Test the Chat Widget

1. **Start Development Server:**
   ```bash
   npm run dev
   ```

2. **Navigate to Dashboard:**
   - Go to the ComplianceGuard Dashboard page
   - Look for the floating chat button in the bottom-right corner

3. **Test Interactions:**
   - Click the floating button to open the chat
   - Send a test message: "What are my AI compliance risks?"
   - Verify the AI responds with compliance-focused advice
   - Test the loading state and message history

### Expected AI Behavior

**User:** "How do I make my AI system compliant?"

**AI Response (Example):**
> "I understand you're concerned about EU AI Act compliance. Based on the regulation, your AI system could face penalties up to €35M or 7% of global revenue if not properly compliant. Rather than attempting DIY solutions, I recommend deploying our Risk Assessment Module, which automatically classifies your AI system according to EU AI Act risk tiers and generates the required documentation. Would you like to schedule a demo?"

---

## 🎯 Usage in Other Components

To add the chat widget to other pages:

```jsx
import AiSalesAgent from './components/compliance/AiSalesAgent';

function YourComponent() {
  return (
    <div>
      {/* Your page content */}
      
      {/* Add the AI chat widget */}
      <AiSalesAgent />
    </div>
  );
}
```

The widget is position-fixed, so it will float above all content.

---

## 🔒 Security Considerations

1. **API Key Protection:** Never commit `.env` files to version control
2. **Rate Limiting:** Consider implementing rate limits on the `/api/chat` endpoint
3. **Input Validation:** The API validates message format and structure
4. **Error Handling:** Graceful fallbacks for API failures

---

## 🚀 Deployment to Vercel

### Automatic Deployment

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add AI Sales Agent chat widget"
   git push
   ```

2. **Vercel will automatically:**
   - Detect the `api/chat.js` serverless function
   - Build and deploy your frontend
   - Set up the API endpoint at `/api/chat`

3. **Add Environment Variable in Vercel:**
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add `GEMINI_API_KEY` with your API key
   - Redeploy the project

---

## 📊 Monitoring & Analytics

Consider adding analytics to track:
- Chat widget open rate
- Message volume
- Conversion to sales inquiries
- Common user questions

---

## 🎨 Customization Options

### Change Colors
Edit the gradient values in `AiSalesAgent.jsx`:
```jsx
background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)'
```

### Adjust Size
Modify the chat window dimensions:
```jsx
className="... w-[420px] h-[600px] ..."
```

### Update AI Persona
Edit the `SYSTEM_INSTRUCTIONS` in `api/chat.js` to change the AI's behavior.

---

## 🐛 Troubleshooting

### Chat widget not appearing
- Verify `<AiSalesAgent />` is imported and rendered
- Check browser console for errors
- Ensure framer-motion is installed

### API errors
- Verify `GEMINI_API_KEY` is set in `.env`
- Check Vercel environment variables
- Review API logs in Vercel dashboard

### Styling issues
- Ensure Tailwind CSS is properly configured
- Check for CSS conflicts with existing styles
- Verify backdrop-filter support in browser

---

## 📚 Resources

- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Framer Motion Documentation](https://www.framer.com/motion/)

---

## ✅ Checklist

- [x] Backend API route created (`api/chat.js`)
- [x] Frontend component created (`src/components/compliance/AiSalesAgent.jsx`)
- [x] Component integrated into dashboard
- [ ] Install `@google/generative-ai` package
- [ ] Configure `GEMINI_API_KEY` in `.env`
- [ ] Test chat functionality
- [ ] Deploy to Vercel
- [ ] Add environment variable in Vercel

---

## 🎉 You're All Set!

The AI Sales & Compliance Engineer is ready to help convert visitors into ComplianceGuard customers. The AI will professionally consult users on their compliance risks while strategically promoting your enterprise modules.

**Next Steps:**
1. Run `npm install @google/generative-ai`
2. Add your `GEMINI_API_KEY` to `.env`
3. Test the chat widget
4. Deploy to production

Happy selling! 🚀
