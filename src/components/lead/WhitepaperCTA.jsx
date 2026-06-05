import { useState } from 'react';
import { FileText, CheckCircle } from 'lucide-react';

export default function WhitepaperCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      // Open PDF in new tab
      window.open('/whitepaper.pdf', '_blank');
      
      // Show success message
      setSubmitted(true);
      
      // Here you would typically send to your email service/CRM
      console.log('Whitepaper accessed by:', email);
    }
  };

  return (
    <div className="w-full flex justify-center items-center overflow-hidden">
      <section
        className="w-full py-20 md:py-24 relative z-10"
        style={{ background: '#0a0e17' }}
      >
        <div className="w-full mx-auto px-4 md:px-6 lg:px-8">
        <div
          className="rounded-3xl p-10 md:p-14 lg:p-16 relative overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(118,251,211,0.05) 0%, rgba(22,181,236,0.03) 100%)',
            border: '1px solid rgba(118,251,211,0.2)',
            boxShadow: '0 0 40px rgba(118,251,211,0.08)',
          }}
        >
          <div className="relative z-10 w-full flex flex-col items-center justify-center text-center">
            {!submitted ? (
              <>
                {/* Tag */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold"
                  style={{
                    background: 'rgba(118,251,211,0.1)',
                    border: '1px solid rgba(118,251,211,0.3)',
                    color: '#76fbd3',
                  }}
                >
                  <FileText size={14} />
                  FREE REGTECH RESOURCE
                </div>

                {/* Heading */}
                <h2 className="font-orbitron font-black text-2xl md:text-4xl mb-4 w-full">
                  <span style={{ color: '#e2e8f0' }}>Master the </span>
                  <span className="gradient-text">EU AI Act in 2026</span>
                </h2>

                {/* Subtext */}
                <p
                  className="text-sm md:text-base leading-relaxed mb-8 w-full max-w-3xl mx-auto"
                  style={{ color: 'rgba(226,232,240,0.65)' }}
                >
                  Download our comprehensive whitepaper to learn how to automate validation frameworks,
                  avoid the €35M compliance penalty, and protect your SaaS architecture.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 w-full max-w-2xl mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your corporate email"
                    required
                    className="flex-1 px-5 py-3.5 rounded-xl text-sm transition-all duration-300 outline-none"
                    style={{
                      background: 'rgba(15, 25, 40, 0.8)',
                      border: '1px solid rgba(118,251,211,0.2)',
                      color: '#e2e8f0',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(118,251,211,0.5)';
                      e.target.style.boxShadow = '0 0 20px rgba(118,251,211,0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(118,251,211,0.2)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap"
                    style={{
                      background: 'linear-gradient(135deg, rgba(118,251,211,0.25) 0%, rgba(22,181,236,0.2) 100%)',
                      border: '2px solid rgba(118,251,211,0.6)',
                      color: '#ffffff',
                      boxShadow: '0 0 20px rgba(118,251,211,0.3)',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, rgba(118,251,211,0.35) 0%, rgba(22,181,236,0.3) 100%)';
                      e.target.style.borderColor = 'rgba(118,251,211,0.8)';
                      e.target.style.boxShadow = '0 0 30px rgba(118,251,211,0.5)';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, rgba(118,251,211,0.25) 0%, rgba(22,181,236,0.2) 100%)';
                      e.target.style.borderColor = 'rgba(118,251,211,0.6)';
                      e.target.style.boxShadow = '0 0 20px rgba(118,251,211,0.3)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    Get Free Access
                  </button>
                </form>

                {/* Trust indicator */}
                <p
                  className="text-xs mt-4 w-full"
                  style={{ color: 'rgba(226,232,240,0.4)' }}
                >
                  🔒 Your email is secure. No spam, unsubscribe anytime.
                </p>
              </>
            ) : (
              /* Success Message */
              <div className="text-center py-8">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                  style={{
                    background: 'rgba(118,251,211,0.15)',
                    border: '2px solid rgba(118,251,211,0.4)',
                  }}
                >
                  <CheckCircle size={32} style={{ color: '#76fbd3' }} />
                </div>
                <h3 
                  className="font-orbitron font-bold text-xl md:text-2xl mb-3"
                  style={{ color: '#76fbd3' }}
                >
                  Thank You!
                </h3>
                <p
                  className="text-sm md:text-base max-w-md mx-auto"
                  style={{ color: 'rgba(226,232,240,0.7)' }}
                >
                  Your whitepaper is now open in a new tab. Enjoy your priority access to the EU AI Act Compliance Guide!
                </p>
              </div>
            )}
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}
