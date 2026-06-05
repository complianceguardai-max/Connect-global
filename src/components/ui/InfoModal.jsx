import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Code, Shield, Lock } from 'lucide-react';
import ModalOverlay from './ModalOverlay';

const CONTENT = {
  'privacy-policy': {
    title: 'Privacy Policy',
    icon: Shield,
    content: `
# Privacy Policy

**Effective Date:** January 1, 2026

## 1. Introduction
ConnectGlobal ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.

## 2. Information We Collect
- **Personal Information:** Name, email address, phone number, business details
- **Usage Data:** IP address, browser type, device information, access times
- **Transaction Data:** Payment information, transaction history (encrypted)
- **Communication Data:** Messages, support tickets, feedback

## 3. How We Use Your Information
- Provide and maintain our services
- Process transactions and send notifications
- Improve user experience and platform functionality
- Comply with legal obligations and prevent fraud
- Send marketing communications (with your consent)

## 4. Data Security
We implement industry-standard security measures including:
- AES-256 encryption for data at rest
- TLS 1.3 for data in transit
- Multi-factor authentication
- Regular security audits and penetration testing
- SOC 2 Type II compliance

## 5. Your Rights
Under GDPR and applicable data protection laws, you have the right to:
- Access your personal data
- Rectify inaccurate data
- Request data deletion
- Object to data processing
- Data portability
- Withdraw consent at any time

## 6. Contact Us
For privacy inquiries: privacy@connectglobal.ai
Data Protection Officer: dpo@connectglobal.ai
    `.trim(),
  },
  'terms-of-service': {
    title: 'Terms of Service',
    icon: FileText,
    content: `
# Terms of Service

**Last Updated:** January 1, 2026

## 1. Acceptance of Terms
By accessing or using ConnectGlobal's platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.

## 2. Service Description
ConnectGlobal provides a unified platform for:
- Global commerce and marketplace access
- Decentralized finance services
- International talent recruitment
- Cross-border collaboration tools

## 3. User Obligations
You agree to:
- Provide accurate and complete information
- Maintain the security of your account credentials
- Comply with all applicable laws and regulations
- Not engage in fraudulent or malicious activities
- Respect intellectual property rights

## 4. Payment Terms
- All fees are in USD unless otherwise specified
- Payments are processed securely through our partners
- Refunds are subject to our refund policy
- Transaction fees may apply for certain services

## 5. Intellectual Property
All content, trademarks, and intellectual property on the platform are owned by ConnectGlobal or our licensors. Unauthorized use is prohibited.

## 6. Limitation of Liability
ConnectGlobal shall not be liable for indirect, incidental, special, or consequential damages arising from your use of the platform.

## 7. Dispute Resolution
Any disputes shall be resolved through binding arbitration in accordance with international arbitration rules.

## 8. Modifications
We reserve the right to modify these terms at any time. Continued use constitutes acceptance of modified terms.

## 9. Contact
Legal inquiries: legal@connectglobal.ai
    `.trim(),
  },
  'gdpr-compliance': {
    title: 'GDPR Compliance',
    icon: Lock,
    content: `
# GDPR Compliance Statement

**ConnectGlobal's Commitment to Data Protection**

## Overview
ConnectGlobal is fully compliant with the General Data Protection Regulation (GDPR) (EU) 2016/679, ensuring the highest standards of data protection for all European Union citizens.

## Legal Basis for Processing
We process personal data under the following legal bases:
- **Consent:** Explicit consent for marketing communications
- **Contract:** Processing necessary for service delivery
- **Legal Obligation:** Compliance with regulatory requirements
- **Legitimate Interest:** Fraud prevention and security

## Data Subject Rights
We facilitate the exercise of all GDPR rights:
- **Right to Access:** Request copies of your personal data
- **Right to Rectification:** Correct inaccurate information
- **Right to Erasure:** "Right to be forgotten"
- **Right to Restriction:** Limit processing of your data
- **Right to Data Portability:** Receive data in machine-readable format
- **Right to Object:** Object to processing for direct marketing

## Data Protection Measures
- **Encryption:** AES-256 encryption at rest, TLS 1.3 in transit
- **Access Controls:** Role-based access with multi-factor authentication
- **Data Minimization:** We collect only necessary data
- **Retention Policies:** Data deleted after retention period expires
- **Breach Notification:** 72-hour notification protocol

## International Data Transfers
We use Standard Contractual Clauses (SCCs) approved by the European Commission for data transfers outside the EU/EEA.

## Data Protection Officer
**Name:** Dr. Elena Kovač
**Email:** dpo@connectglobal.ai
**Address:** ConnectGlobal EU Data Protection Office, Dublin, Ireland

## Supervisory Authority
You have the right to lodge a complaint with your local data protection authority.

## Regular Audits
We conduct annual GDPR compliance audits and maintain detailed processing records.

**Last Audit:** December 2025
**Next Scheduled Audit:** December 2026
    `.trim(),
  },
  'eu-ai-act': {
    title: 'EU AI Act Compliance',
    icon: Shield,
    content: `
# EU AI Act Compliance

**ConnectGlobal's AI Governance Framework**

## Compliance Statement
ConnectGlobal complies with the EU Artificial Intelligence Act (2024/1689), implementing responsible AI practices across all platform services.

## AI System Classification
Our AI systems are classified as:
- **Limited Risk:** Chatbots and customer service automation
- **Minimal Risk:** Recommendation algorithms and content personalization

We do NOT deploy high-risk AI systems without proper conformity assessment.

## Transparency Obligations
We ensure:
- **Clear Disclosure:** Users are informed when interacting with AI systems
- **Explainability:** AI decisions can be explained in human-understandable terms
- **Human Oversight:** Critical decisions involve human review

## Technical Documentation
We maintain comprehensive technical documentation including:
- AI system architecture and design
- Training data sources and characteristics
- Performance metrics and accuracy rates
- Risk assessment and mitigation measures

## Data Governance
- **Training Data Quality:** Curated, diverse, and representative datasets
- **Bias Mitigation:** Regular bias audits and fairness assessments
- **Data Protection:** GDPR-compliant data handling

## Risk Management
We implement continuous risk management:
- Pre-deployment testing and validation
- Post-market monitoring and incident reporting
- Regular performance evaluations
- User feedback integration

## Conformity Assessment
Our AI systems undergo:
- Internal quality assurance processes
- Third-party audits by notified bodies
- Continuous compliance monitoring

## Human Oversight
All AI-assisted decisions include:
- Human-in-the-loop for critical operations
- Override mechanisms for automated decisions
- Clear escalation procedures

## Incident Reporting
We maintain a 24-hour incident response protocol for AI system malfunctions or adverse events.

## Contact
**AI Ethics Officer:** Dr. Marcus Chen
**Email:** ai-ethics@connectglobal.ai

**Compliance Officer:** Sarah Williams
**Email:** compliance@connectglobal.ai
    `.trim(),
  },
  'api-reference': {
    title: 'API Reference',
    icon: Code,
    content: `
# API Reference

**ConnectGlobal Platform API v2.4**

## Getting Started

### Authentication
All API requests require authentication using API keys:

\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
     https://api.connectglobal.ai/v2/endpoint
\`\`\`

### Base URL
\`\`\`
https://api.connectglobal.ai/v2
\`\`\`

## Core Endpoints

### 1. User Management

**Get User Profile**
\`\`\`http
GET /users/{userId}
\`\`\`

**Response:**
\`\`\`json
{
  "id": "usr_abc123",
  "email": "user@example.com",
  "name": "John Doe",
  "country": "US",
  "verified": true,
  "created_at": "2026-01-15T10:30:00Z"
}
\`\`\`

### 2. Transactions

**Create Transaction**
\`\`\`http
POST /transactions
Content-Type: application/json

{
  "amount": 1000.00,
  "currency": "USD",
  "recipient": "usr_xyz789",
  "description": "Payment for services"
}
\`\`\`

**Response:**
\`\`\`json
{
  "transaction_id": "txn_def456",
  "status": "pending",
  "estimated_completion": "2026-01-15T11:00:00Z"
}
\`\`\`

### 3. Global Commerce

**List Products**
\`\`\`http
GET /commerce/products?country=US&category=electronics
\`\`\`

### 4. DeFi Operations

**Swap Tokens**
\`\`\`http
POST /defi/swap
Content-Type: application/json

{
  "from_token": "USDC",
  "to_token": "USDT",
  "amount": 500.00
}
\`\`\`

## Rate Limits
- **Free Tier:** 100 requests/hour
- **Pro Tier:** 1,000 requests/hour
- **Enterprise:** Custom limits

## Webhooks
Subscribe to real-time events:
\`\`\`http
POST /webhooks
Content-Type: application/json

{
  "url": "https://your-domain.com/webhook",
  "events": ["transaction.completed", "user.verified"]
}
\`\`\`

## SDKs Available
- JavaScript/TypeScript
- Python
- Go
- Ruby

## Support
**Developer Support:** developers@connectglobal.ai
**Documentation:** https://docs.connectglobal.ai
    `.trim(),
  },
  'documentation': {
    title: 'Documentation',
    icon: FileText,
    content: `
# Platform Documentation

**ConnectGlobal Developer Guide**

## Quick Start

### 1. Create an Account
Sign up at https://connectglobal.ai/signup

### 2. Generate API Keys
Navigate to Dashboard → Settings → API Keys

### 3. Install SDK
\`\`\`bash
npm install @connectglobal/sdk
# or
pip install connectglobal-sdk
\`\`\`

### 4. Initialize Client
\`\`\`javascript
import ConnectGlobal from '@connectglobal/sdk';

const client = new ConnectGlobal({
  apiKey: process.env.CONNECTGLOBAL_API_KEY,
  environment: 'production'
});
\`\`\`

## Core Concepts

### Global Network
Access our unified network spanning 195+ countries with:
- Real-time data synchronization
- Multi-region redundancy
- Intelligent load balancing
- 99.99% uptime SLA

### Secure Payments
Process payments with:
- Multi-currency support (150+ currencies)
- Stablecoin integration (USDC, USDT, DAI)
- Smart contract automation
- Instant settlement

### International Markets
Connect to global marketplaces:
- Automated compliance checking
- Multi-language product listings
- Cross-border logistics integration
- Real-time inventory sync

### Collaboration Tools
Enable global teams with:
- Real-time messaging and video
- Shared workspaces and file storage
- Project management and Kanban boards
- Time zone-aware scheduling

## Integration Examples

### Payment Processing
\`\`\`javascript
const payment = await client.payments.create({
  amount: 1000,
  currency: 'USD',
  recipient: 'user@example.com',
  metadata: { orderId: 'ORD-12345' }
});
\`\`\`

### Product Listing
\`\`\`javascript
const product = await client.commerce.createProduct({
  name: 'Premium Widget',
  price: 99.99,
  currency: 'USD',
  countries: ['US', 'CA', 'GB'],
  inventory: 100
});
\`\`\`

## Best Practices
1. Always use environment variables for API keys
2. Implement proper error handling
3. Use webhooks for real-time updates
4. Cache responses when appropriate
5. Monitor rate limits

## Support Resources
- **Community Forum:** https://community.connectglobal.ai
- **Status Page:** https://status.connectglobal.ai
- **GitHub:** https://github.com/connectglobal
- **Email:** support@connectglobal.ai
    `.trim(),
  },
};

export default function InfoModal({ contentKey, open, onClose }) {
  if (!open || !contentKey || !CONTENT[contentKey]) return null;

  const { title, icon: Icon, content } = CONTENT[contentKey];

  return (
    <AnimatePresence>
      {open && (
        <>
          <ModalOverlay onClick={onClose} />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="relative w-full max-w-3xl max-h-[85vh] rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(10, 22, 40, 0.98)',
                border: '1px solid rgba(118, 251, 211, 0.25)',
                boxShadow: '0 0 60px rgba(118, 251, 211, 0.2), 0 25px 50px rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
              }}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-8 py-6"
                style={{ borderBottom: '1px solid rgba(118, 251, 211, 0.15)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(118, 251, 211, 0.2), rgba(22, 181, 236, 0.15))',
                      border: '1px solid rgba(118, 251, 211, 0.3)',
                    }}
                  >
                    <Icon size={20} style={{ color: '#76fbd3' }} />
                  </div>
                  <h2 className="font-orbitron font-bold text-xl" style={{ color: '#e2e8f0' }}>
                    {title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl transition-all"
                  style={{ color: 'rgba(226, 232, 240, 0.6)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.color = '#76fbd3';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'rgba(226, 232, 240, 0.6)';
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div
                className="px-8 py-6 overflow-y-auto scroll-mint"
                style={{ maxHeight: 'calc(85vh - 100px)' }}
              >
                <div
                  className="prose prose-invert prose-sm max-w-none"
                  style={{
                    color: 'rgba(226, 232, 240, 0.8)',
                    lineHeight: '1.7',
                  }}
                >
                  {content.split('\n').map((line, i) => {
                    if (line.startsWith('# ')) {
                      return (
                        <h1
                          key={i}
                          className="font-orbitron font-bold text-2xl mb-4 mt-6"
                          style={{ color: '#76fbd3' }}
                        >
                          {line.substring(2)}
                        </h1>
                      );
                    }
                    if (line.startsWith('## ')) {
                      return (
                        <h2
                          key={i}
                          className="font-orbitron font-bold text-lg mb-3 mt-5"
                          style={{ color: '#16b5ec' }}
                        >
                          {line.substring(3)}
                        </h2>
                      );
                    }
                    if (line.startsWith('### ')) {
                      return (
                        <h3
                          key={i}
                          className="font-semibold text-base mb-2 mt-4"
                          style={{ color: 'rgba(226, 232, 240, 0.95)' }}
                        >
                          {line.substring(4)}
                        </h3>
                      );
                    }
                    if (line.startsWith('```')) {
                      const lang = line.substring(3);
                      return (
                        <div
                          key={i}
                          className="my-3 p-4 rounded-xl font-mono text-xs overflow-x-auto"
                          style={{
                            background: 'rgba(0, 0, 0, 0.4)',
                            border: '1px solid rgba(118, 251, 211, 0.2)',
                            color: '#76fbd3',
                          }}
                        >
                          {lang && <div className="text-xs mb-2 opacity-60">{lang}</div>}
                        </div>
                      );
                    }
                    if (line.startsWith('- ') || line.startsWith('* ')) {
                      return (
                        <li key={i} className="ml-6 mb-1" style={{ color: 'rgba(226, 232, 240, 0.75)' }}>
                          {line.substring(2)}
                        </li>
                      );
                    }
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return (
                        <p key={i} className="font-bold mb-2" style={{ color: 'rgba(226, 232, 240, 0.9)' }}>
                          {line.replace(/\*\*/g, '')}
                        </p>
                      );
                    }
                    if (line.trim() === '') {
                      return <div key={i} className="h-2" />;
                    }
                    return (
                      <p key={i} className="mb-3" style={{ color: 'rgba(226, 232, 240, 0.75)' }}>
                        {line}
                      </p>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
