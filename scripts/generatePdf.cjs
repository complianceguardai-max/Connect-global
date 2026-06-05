const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Create a new PDF document
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 50, bottom: 50, left: 50, right: 50 }
});

// Pipe to output file
const outputPath = path.join(__dirname, '..', 'public', 'whitepaper.pdf');
doc.pipe(fs.createWriteStream(outputPath));

// Brand colors
const mintGreen = '#76fbd3';
const darkBg = '#0a1628';
const blackText = '#000000';
const darkText = '#0f1928';

// ============================================
// PAGE 1: COVER PAGE (Dark Background)
// ============================================

// Dark background
doc.rect(0, 0, 595, 842).fill(darkBg);

// Logo
const logoPath = path.join(__dirname, '..', 'public', 'logo.png.jpeg');
if (fs.existsSync(logoPath)) {
  doc.image(logoPath, 197.5, 120, { width: 200, align: 'center' });
}

// Title
doc.fillColor('#e2e8f0')
   .font('Helvetica-Bold')
   .fontSize(28)
   .text('The Startup Guide to', 50, 360, { align: 'center', width: 495 });

doc.fillColor(mintGreen)
   .fontSize(32)
   .text('EU AI Act Compliance', 50, 395, { align: 'center', width: 495 });

// Subtitle
doc.fillColor('#e2e8f0')
   .font('Helvetica')
   .fontSize(18)
   .text('2026 Edition', 50, 450, { align: 'center', width: 495 });

// Value proposition
doc.fontSize(14)
   .fillColor('rgba(226,232,240,0.8)')
   .text('Avoid the €35M Penalty & Automate Compliance', 50, 520, { align: 'center', width: 495 });

// Footer
doc.fillColor(mintGreen)
   .fontSize(14)
   .text('ConnectGlobal | ComplianceGuard AI', 50, 750, { align: 'center', width: 495 });

doc.fillColor('#e2e8f0')
   .fontSize(10)
   .text('© 2026 All Rights Reserved', 50, 775, { align: 'center', width: 495 });

// ============================================
// PAGE 2: EXECUTIVE SUMMARY (White Background, Black Text)
// ============================================
doc.addPage();

// White background
doc.rect(0, 0, 595, 842).fill('#ffffff');

// Header
doc.fillColor(mintGreen)
   .font('Helvetica-Bold')
   .fontSize(26)
   .text('Executive Summary', 50, 50);

doc.fillColor(blackText)
   .font('Helvetica')
   .fontSize(12)
   .text('The EU AI Act, effective from 2026, represents the world\'s first comprehensive regulatory framework for artificial intelligence. Non-compliance carries severe financial penalties.', 50, 100, { width: 495, align: 'justify', lineGap: 4 });

// The €35M Threat Section
doc.moveDown(1.5);
doc.fillColor(mintGreen)
   .font('Helvetica-Bold')
   .fontSize(20)
   .text('The €35M Non-Compliance Threat');

doc.fillColor(blackText)
   .font('Helvetica')
   .fontSize(12)
   .moveDown(0.8)
   .text('The EU AI Act introduces a risk-based classification system with tiered penalties:', { width: 495, lineGap: 4 });

doc.moveDown(0.8);
doc.font('Helvetica-Bold')
   .fontSize(11)
   .text('Financial Penalties:', 70);

doc.font('Helvetica')
   .fontSize(11)
   .text('• Prohibited AI Practices: €35M or 7% of global annual turnover', 70, doc.y + 5, { width: 475, lineGap: 3 })
   .text('• High-Risk System Violations: €15M or 3% of global turnover', 70, doc.y + 5, { width: 475, lineGap: 3 })
   .text('• Documentation Failures: €7.5M or 1.5% of global turnover', 70, doc.y + 5, { width: 475, lineGap: 3 });

doc.moveDown(1);
doc.font('Helvetica-Bold')
   .fontSize(11)
   .text('Beyond Financial Penalties:', 70);

doc.font('Helvetica')
   .fontSize(11)
   .text('• Immediate suspension of AI system operations across the EU', 70, doc.y + 5, { width: 475, lineGap: 3 })
   .text('• Market access restrictions in all 27 member states', 70, doc.y + 5, { width: 475, lineGap: 3 })
   .text('• Reputational damage and loss of enterprise customer trust', 70, doc.y + 5, { width: 475, lineGap: 3 })
   .text('• Mandatory third-party audits at company expense', 70, doc.y + 5, { width: 475, lineGap: 3 });

// Key Insight Box
doc.moveDown(1.5);
doc.rect(50, doc.y, 495, 80)
   .fillAndStroke('rgba(118,251,211,0.1)', mintGreen);

doc.fillColor(darkText)
   .font('Helvetica-Bold')
   .fontSize(11)
   .text('Key Insight for CTOs:', 60, doc.y + 15, { width: 475 });

doc.font('Helvetica')
   .fontSize(10)
   .text('Compliance is not optional. Organizations deploying AI systems in the EU market must implement technical controls, maintain audit trails, and demonstrate ongoing regulatory alignment. The cost of non-compliance far exceeds the investment in proper compliance infrastructure.', 60, doc.y + 5, { width: 475, align: 'justify', lineGap: 3 });

// ============================================
// PAGE 3: RISK CLASSIFICATION MATRIX (White Background, Black Text)
// ============================================
doc.addPage();

// White background
doc.rect(0, 0, 595, 842).fill('#ffffff');

doc.fillColor(mintGreen)
   .font('Helvetica-Bold')
   .fontSize(26)
   .text('Risk Classification Matrix', 50, 50);

doc.fillColor(blackText)
   .font('Helvetica')
   .fontSize(12)
   .text('The EU AI Act categorizes AI systems into four risk tiers:', 50, 100, { width: 495, lineGap: 4 });

// Unacceptable Risk
doc.moveDown(1);
doc.fillColor('#dc2626')
   .font('Helvetica-Bold')
   .fontSize(16)
   .text('Unacceptable Risk (Prohibited)');

doc.fillColor(blackText)
   .font('Helvetica')
   .fontSize(10)
   .moveDown(0.5)
   .text('• Social scoring systems by governments', 70, doc.y, { width: 475, lineGap: 2 })
   .text('• Real-time biometric identification in public spaces', 70, doc.y + 3, { width: 475, lineGap: 2 })
   .text('• Subliminal manipulation techniques', 70, doc.y + 3, { width: 475, lineGap: 2 })
   .text('• Exploitation of vulnerable groups', 70, doc.y + 3, { width: 475, lineGap: 2 });

// High Risk
doc.moveDown(1);
doc.fillColor('#ea580c')
   .font('Helvetica-Bold')
   .fontSize(16)
   .text('High Risk (Strict Compliance Required)');

doc.fillColor(blackText)
   .font('Helvetica')
   .fontSize(10)
   .moveDown(0.5)
   .text('• Critical infrastructure management systems', 70, doc.y, { width: 475, lineGap: 2 })
   .text('• Educational assessment and admission systems', 70, doc.y + 3, { width: 475, lineGap: 2 })
   .text('• Employment, recruitment, and HR decision systems', 70, doc.y + 3, { width: 475, lineGap: 2 })
   .text('• Credit scoring and loan approval algorithms', 70, doc.y + 3, { width: 475, lineGap: 2 })
   .text('• Law enforcement predictive policing tools', 70, doc.y + 3, { width: 475, lineGap: 2 });

// Limited Risk
doc.moveDown(1);
doc.fillColor('#ca8a04')
   .font('Helvetica-Bold')
   .fontSize(16)
   .text('Limited Risk (Transparency Obligations)');

doc.fillColor(blackText)
   .font('Helvetica')
   .fontSize(10)
   .moveDown(0.5)
   .text('• Chatbots and conversational AI systems', 70, doc.y, { width: 475, lineGap: 2 })
   .text('• Emotion recognition systems', 70, doc.y + 3, { width: 475, lineGap: 2 })
   .text('• Deepfake generation tools', 70, doc.y + 3, { width: 475, lineGap: 2 })
   .text('• AI-generated content (must be clearly labeled)', 70, doc.y + 3, { width: 475, lineGap: 2 });

// Minimal Risk
doc.moveDown(1);
doc.fillColor('#059669')
   .font('Helvetica-Bold')
   .fontSize(16)
   .text('Minimal Risk (No Specific Requirements)');

doc.fillColor(blackText)
   .font('Helvetica')
   .fontSize(10)
   .moveDown(0.5)
   .text('• AI-enabled video games and entertainment', 70, doc.y, { width: 475, lineGap: 2 })
   .text('• Spam filters and recommendation engines', 70, doc.y + 3, { width: 475, lineGap: 2 })
   .text('• Inventory management and logistics systems', 70, doc.y + 3, { width: 475, lineGap: 2 });

// ============================================
// PAGE 4: CTO'S CHECKLIST & COMPLIANCEGUARD AI (White Background, Black Text)
// ============================================
doc.addPage();

// White background
doc.rect(0, 0, 595, 842).fill('#ffffff');

doc.fillColor(mintGreen)
   .font('Helvetica-Bold')
   .fontSize(26)
   .text('The CTO\'s Compliance Checklist', 50, 50);

doc.fillColor(blackText)
   .font('Helvetica')
   .fontSize(11)
   .text('Essential technical controls for EU AI Act compliance:', 50, 95, { width: 495 });

doc.moveDown(0.8);
doc.font('Helvetica-Bold')
   .fontSize(12)
   .text('☐ Data Governance', 70);

doc.font('Helvetica')
   .fontSize(10)
   .text('Implement data lineage tracking, bias detection, and quality validation', 85, doc.y + 3, { width: 460, lineGap: 2 });

doc.moveDown(0.5);
doc.font('Helvetica-Bold')
   .fontSize(12)
   .text('☐ Immutable Audit Trails', 70);

doc.font('Helvetica')
   .fontSize(10)
   .text('Deploy blockchain-based logging for all AI decisions and model changes', 85, doc.y + 3, { width: 460, lineGap: 2 });

doc.moveDown(0.5);
doc.font('Helvetica-Bold')
   .fontSize(12)
   .text('☐ Human-in-the-Loop Controls', 70);

doc.font('Helvetica')
   .fontSize(10)
   .text('Design oversight interfaces and escalation protocols for high-risk decisions', 85, doc.y + 3, { width: 460, lineGap: 2 });

doc.moveDown(0.5);
doc.font('Helvetica-Bold')
   .fontSize(12)
   .text('☐ Technical Documentation', 70);

doc.font('Helvetica')
   .fontSize(10)
   .text('Maintain conformity assessments and system architecture documentation', 85, doc.y + 3, { width: 460, lineGap: 2 });

// ComplianceGuard AI Section
doc.moveDown(1.5);
doc.fillColor(mintGreen)
   .font('Helvetica-Bold')
   .fontSize(20)
   .text('Automate Compliance with ComplianceGuard AI', 50);

doc.fillColor(blackText)
   .font('Helvetica')
   .fontSize(11)
   .moveDown(0.8)
   .text('ConnectGlobal\'s ComplianceGuard AI platform reduces manual compliance overhead by 85% while ensuring continuous regulatory alignment.', { width: 495, align: 'justify', lineGap: 4 });

doc.moveDown(0.8);
doc.font('Helvetica-Bold')
   .fontSize(11)
   .text('Platform Features:', 70);

doc.font('Helvetica')
   .fontSize(10)
   .text('• Automated risk classification and system categorization', 70, doc.y + 5, { width: 475, lineGap: 2 })
   .text('• Real-time compliance monitoring and drift detection', 70, doc.y + 3, { width: 475, lineGap: 2 })
   .text('• Blockchain-based immutable audit trails', 70, doc.y + 3, { width: 475, lineGap: 2 })
   .text('• Auto-generated technical documentation', 70, doc.y + 3, { width: 475, lineGap: 2 })
   .text('• Regulatory update alerts and impact analysis', 70, doc.y + 3, { width: 475, lineGap: 2 });

// CTA Box
doc.moveDown(1.5);
doc.rect(50, doc.y, 495, 110)
   .fillAndStroke('rgba(118,251,211,0.15)', mintGreen);

doc.fillColor(darkText)
   .font('Helvetica-Bold')
   .fontSize(14)
   .text('Get Started Today', 60, doc.y + 15, { width: 475 });

doc.font('Helvetica')
   .fontSize(11)
   .text('Schedule a free compliance assessment with our regulatory experts:', 60, doc.y + 8, { width: 475, lineGap: 3 });

doc.fillColor(mintGreen)
   .fontSize(11)
   .text('🌐 connectglobal.ai/compliance', 70, doc.y + 10, { width: 475 })
   .text('📧 compliance@connectglobal.ai', 70, doc.y + 5, { width: 475 })
   .text('📞 +1 (555) 123-4567', 70, doc.y + 5, { width: 475 });

// Footer disclaimer
doc.fillColor('#666666')
   .fontSize(8)
   .text('This whitepaper is provided for informational purposes only and does not constitute legal advice. Consult with qualified legal counsel for compliance guidance specific to your organization.', 50, 780, { width: 495, align: 'center', lineGap: 2 });

// Finalize PDF
doc.end();

console.log('✅ 4-page whitepaper PDF generated successfully at:', outputPath);
