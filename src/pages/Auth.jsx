import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Shield, Globe2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signIn, signUp } = useAuth();
  const { addToast } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await signIn(email, password);
        if (error) throw error;
        addToast('Welcome back! Redirecting to dashboard...', 'success');
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        const { data, error } = await signUp(email, password, {
          first_name: firstName,
          last_name: lastName
        });
        if (error) throw error;
        addToast('Account created! Please check your email to verify.', 'success');
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
      addToast(err.message || 'Authentication failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handler for bottom feature buttons
  const handleFeatureClick = (label) => {
    if (label === 'Premium') {
      addToast('Redirecting to Enterprise Sales...', 'info');
      const salesEmail = 'Complianceguard.ai@gmail.com';
      const subject = 'Enterprise Premium Features Inquiry';
      const body = 'Hello ComplianceGuard Team, I am interested in learning more about the Premium Enterprise features and EU AI Act compliance.';
      
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${salesEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const newWindow = window.open(gmailUrl, '_blank');
      
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        window.open(`mailto:${salesEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
      }
    } else if (label === 'Secure') {
      addToast('Military-Grade 256-bit Encryption Active', 'success');
    } else if (label === 'Global') {
      addToast('EU AI Act & Global Compliance Framework Ready', 'success');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ background: '#0a1628' }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(118,251,211,0.3), transparent)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(22,181,236,0.3), transparent)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Logo - Top Left */}
      <motion.div
        className="absolute top-6 left-6 flex items-center gap-2 cursor-pointer"
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(118,251,211,0.2), rgba(22,181,236,0.15))',
            border: '1px solid rgba(118,251,211,0.35)',
            boxShadow: '0 0 18px rgba(118,251,211,0.22)',
          }}
        >
          <Globe2 size={20} style={{ color: '#76fbd3' }} />
        </div>
        <span className="font-orbitron text-lg font-bold">
          <span style={{ color: '#e2e8f0' }}>Connect</span>
          <span style={{ color: '#76fbd3', textShadow: '0 0 12px rgba(118,251,211,0.5)' }}>Global</span>
        </span>
      </motion.div>

      {/* Main Auth Card */}
      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div
          className="rounded-3xl p-8 md:p-10"
          style={{
            background: 'rgba(15,23,42,0.95)',
            border: '1px solid rgba(118,251,211,0.2)',
            boxShadow: '0 0 60px rgba(118,251,211,0.15), 0 20px 60px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
              style={{
                background: 'linear-gradient(135deg, rgba(118,251,211,0.15), rgba(22,181,236,0.1))',
                border: '1px solid rgba(118,251,211,0.3)',
              }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(118,251,211,0.3)',
                  '0 0 40px rgba(118,251,211,0.5)',
                  '0 0 20px rgba(118,251,211,0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Shield size={32} style={{ color: '#76fbd3' }} />
            </motion.div>
            
            <h1
              className="text-3xl font-bold font-orbitron mb-2"
              style={{ color: '#e2e8f0' }}
            >
              {isLogin ? 'Welcome Back' : 'Join ComplianceGuard'}
            </h1>
            <p className="text-sm" style={{ color: 'rgba(226,232,240,0.6)' }}>
              {isLogin 
                ? 'Access your global compliance dashboard' 
                : 'Start your journey to global compliance excellence'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name and Last Name - Only for Sign Up */}
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                {/* First Name Input */}
                <div>
                  <label
                    className="block text-xs font-medium mb-2 uppercase tracking-wide"
                    style={{ color: 'rgba(118,251,211,0.8)' }}
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2"
                      style={{ color: 'rgba(118,251,211,0.5)' }}
                    />
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required={!isLogin}
                      placeholder="John"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm transition-all duration-200 focus:outline-none"
                      style={{
                        background: 'rgba(15,23,42,0.6)',
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
                  </div>
                </div>

                {/* Last Name Input */}
                <div>
                  <label
                    className="block text-xs font-medium mb-2 uppercase tracking-wide"
                    style={{ color: 'rgba(118,251,211,0.8)' }}
                  >
                    Last Name
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2"
                      style={{ color: 'rgba(118,251,211,0.5)' }}
                    />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required={!isLogin}
                      placeholder="Doe"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm transition-all duration-200 focus:outline-none"
                      style={{
                        background: 'rgba(15,23,42,0.6)',
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
                  </div>
                </div>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label 
                className="block text-xs font-medium mb-2 uppercase tracking-wide"
                style={{ color: 'rgba(118,251,211,0.8)' }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail 
                  size={18} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                  style={{ color: 'rgba(118,251,211,0.5)' }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm transition-all duration-200 focus:outline-none"
                  style={{
                    background: 'rgba(15,23,42,0.6)',
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
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label 
                className="block text-xs font-medium mb-2 uppercase tracking-wide"
                style={{ color: 'rgba(118,251,211,0.8)' }}
              >
                Password
              </label>
              <div className="relative">
                <Lock 
                  size={18} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                  style={{ color: 'rgba(118,251,211,0.5)' }}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  minLength={6}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm transition-all duration-200 focus:outline-none"
                  style={{
                    background: 'rgba(15,23,42,0.6)',
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
              </div>
              {!isLogin && (
                <p className="text-xs mt-1.5" style={{ color: 'rgba(226,232,240,0.5)' }}>
                  Minimum 6 characters
                </p>
              )}
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 py-3 rounded-xl text-sm"
                  style={{
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    color: '#fca5a5',
                  }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-orbitron font-bold text-sm tracking-wider flex items-center justify-center gap-2 transition-all duration-200"
              style={{
                background: loading 
                  ? 'rgba(118,251,211,0.3)' 
                  : 'linear-gradient(135deg, rgba(118,251,211,0.2), rgba(22,181,236,0.2))',
                border: '1px solid rgba(118,251,211,0.4)',
                color: loading ? 'rgba(226,232,240,0.5)' : '#76fbd3',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
              whileHover={!loading ? { 
                scale: 1.02,
                boxShadow: '0 0 30px rgba(118,251,211,0.4)',
              } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-t-transparent rounded-full"
                    style={{ borderColor: 'rgba(118,251,211,0.5)' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  Processing...
                </>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          {/* Toggle Login/Register */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFirstName('');
                setLastName('');
              }}
              className="text-sm transition-colors duration-200"
              style={{ color: 'rgba(226,232,240,0.6)' }}
              onMouseEnter={(e) => e.target.style.color = '#76fbd3'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(226,232,240,0.6)'}
            >
              {isLogin ? (
                <>
                  Don't have an account? <span className="font-semibold">Sign Up</span>
                </>
              ) : (
                <>
                  Already have an account? <span className="font-semibold">Sign In</span>
                </>
              )}
            </button>
          </div>

          {/* Features - Now Clickable Buttons */}
          <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(118,251,211,0.1)' }}>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Shield, label: 'Secure' },
                { icon: Globe2, label: 'Global' },
                { icon: Sparkles, label: 'Premium' },
              ].map((item, idx) => (
                <motion.button
                  key={idx}
                  type="button"
                  onClick={() => handleFeatureClick(item.label)}
                  className="flex flex-col items-center gap-2 cursor-pointer w-full focus:outline-none"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all"
                    style={{
                      background: item.label === 'Premium' ? 'rgba(245,158,11,0.1)' : 'rgba(118,251,211,0.08)',
                      border: item.label === 'Premium' ? '1px solid rgba(245,158,11,0.3)' : '1px solid rgba(118,251,211,0.15)',
                    }}
                  >
                    <item.icon size={18} style={{ color: item.label === 'Premium' ? '#fbbf24' : '#76fbd3' }} />
                  </div>
                  <span className="text-xs transition-colors" style={{ color: item.label === 'Premium' ? '#fbbf24' : 'rgba(226,232,240,0.6)' }}>
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}