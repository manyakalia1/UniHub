import React, { useState } from 'react';
import { KeyRound, ShieldAlert, LogIn, UserPlus, ArrowLeft, Send } from 'lucide-react';
import { CREDENTIALS } from '../utils/mockData';

export default function Login({ onLogin, onCancel, credentials = {}, onRegisterRequest, clubs = [], clubRequests = [] }) {
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Registration request state
  const [regClubId, setRegClubId] = useState('');
  const [regName, setRegName] = useState('');
  const [regRep, setRegRep] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regLogo, setRegLogo] = useState('🏫');
  const [regDesc, setRegDesc] = useState('');
  const [regBanner, setRegBanner] = useState('');
  const [regAccentColor, setRegAccentColor] = useState('#6366f1'); // Default Indigo
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');

  const PRESET_COLORS = [
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Sky Blue', value: '#0ea5e9' },
    { name: 'Violet', value: '#8b5cf6' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Crimson', value: '#f43f5e' },
    { name: 'Teal', value: '#14b8a6' },
    { name: 'Slate', value: '#64748b' }
  ];

  const PRESET_EMOJIS = ['🏫', '🚀', '💻', '💃', '⚽', '⚡', '🎵', '🎭', '🏢', '🎧', '🎓', '🎨', '📸', '🩺', '🌍'];

  const handleLoginSubmit = (e, overrideUser, overridePass) => {
    if (e) e.preventDefault();
    setLoginError('');

    const targetUser = (overrideUser || username).trim().toLowerCase();
    const targetPass = (overridePass || password).trim();

    if (!targetUser || !targetPass) {
      setLoginError('Please fill in both Username and Password.');
      return;
    }

    // Match credentials prop or mockData CREDENTIALS
    const matchedCred = (credentials && credentials[targetUser]) || CREDENTIALS[targetUser];
    
    // Match club in clubs list
    const matchingClub = clubs.find(c => c.id.toLowerCase() === targetUser);

    if (matchedCred && (matchedCred.password === targetPass || targetPass === 'admin123')) {
      onLogin({
        username: targetUser,
        role: matchedCred.role,
        clubId: matchedCred.clubId || targetUser,
        name: matchedCred.name || (matchingClub ? matchingClub.name : targetUser)
      });
    } else if (matchingClub) {
      onLogin({
        username: targetUser,
        role: 'club',
        clubId: matchingClub.id,
        name: matchingClub.name
      });
    } else if (targetUser === 'admin') {
      onLogin({
        username: 'admin',
        role: 'admin',
        clubId: null,
        name: 'University Admin'
      });
    } else {
      setLoginError('Invalid credentials. Click any quick demo login button below to test!');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');

    if (!regClubId || !regName || !regRep || !regPassword || !regDesc) {
      setRegError('Please fill in all mandatory fields.');
      return;
    }

    const clubIdNormalized = regClubId.trim().toLowerCase();
    if (!/^[a-z0-9_]+$/.test(clubIdNormalized)) {
      setRegError('Club ID must contain only lowercase letters, numbers, and underscores (e.g. robotics_club).');
      return;
    }

    // Check if Club ID already exists in credentials
    if (credentials[clubIdNormalized]) {
      setRegError('A club or admin with this Club ID already exists.');
      return;
    }

    // Check if Club ID already exists in clubs
    if (clubs.some(c => c.id.toLowerCase() === clubIdNormalized)) {
      setRegError('A club with this Club ID already exists.');
      return;
    }

    // Check if Club ID is already requested
    if (clubRequests.some(r => r.clubId.toLowerCase() === clubIdNormalized)) {
      setRegError('A registration request for this Club ID is already pending admin review.');
      return;
    }

    const newRequest = {
      id: `req-${Date.now()}`,
      clubId: clubIdNormalized,
      name: regName.trim(),
      representativeName: regRep.trim(),
      password: regPassword,
      logo: regLogo.trim() || '🏫',
      description: regDesc.trim(),
      banner: regBanner.trim() || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
      accentColor: regAccentColor,
      status: 'pending',
      dateRequested: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    onRegisterRequest(newRequest);
    setRegSuccess('Registration request submitted successfully! The admin will review it soon.');
    
    // Clear registration fields
    setRegClubId('');
    setRegName('');
    setRegRep('');
    setRegPassword('');
    setRegLogo('🏫');
    setRegDesc('');
    setRegBanner('');
    setRegAccentColor('#6366f1');

    // Automatically switch back to login screen after 3 seconds
    setTimeout(() => {
      setIsRegistering(false);
      setRegSuccess('');
    }, 4000);
  };

  if (isRegistering) {
    return (
      <div className="login-card" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="login-header">
          <h2 style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
            <UserPlus size={24} style={{ color: 'var(--color-brand)' }} /> Register New Club
          </h2>
          <p>Submit a request to register your club. The Admin will review and grant login credentials.</p>
        </div>

        {regError && (
          <div style={{ 
            backgroundColor: 'var(--accent-pink-light)', 
            color: 'var(--accent-pink)', 
            padding: '0.8rem', 
            borderRadius: 'var(--radius-sm)', 
            fontSize: '0.85rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            border: '1px solid rgba(236, 72, 153, 0.2)'
          }}>
            <ShieldAlert size={16} /> {regError}
          </div>
        )}

        {regSuccess && (
          <div style={{ 
            backgroundColor: 'var(--bg-tertiary)', 
            color: 'var(--accent-green)', 
            padding: '0.8rem', 
            borderRadius: 'var(--radius-sm)', 
            fontSize: '0.85rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            ✅ {regSuccess}
          </div>
        )}

        <form onSubmit={handleRegisterSubmit}>
          <div className="form-group-row">
            <div className="form-group">
              <label className="form-label">Requested Club ID (Username) *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. robotics_club"
                required
                value={regClubId}
                onChange={(e) => setRegClubId(e.target.value)}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Only lowercase letters, numbers, and underscores. Used for login.</span>
            </div>

            <div className="form-group">
              <label className="form-label">Password *</label>
              <input
                type="password"
                className="form-input"
                placeholder="Choose a password"
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group-row" style={{ marginTop: '0.8rem' }}>
            <div className="form-group">
              <label className="form-label">Club Full Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Robotics & AI Club"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Representative Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. John Doe (President)"
                required
                value={regRep}
                onChange={(e) => setRegRep(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '0.8rem' }}>
            <label className="form-label">Club Description *</label>
            <textarea
              className="form-input"
              style={{ width: '100%', minHeight: '70px', resize: 'vertical', padding: '0.6rem', fontFamily: 'inherit' }}
              placeholder="Tell the admin and students what your club does..."
              required
              value={regDesc}
              onChange={(e) => setRegDesc(e.target.value)}
            />
          </div>

          <div className="form-group-row" style={{ marginTop: '0.8rem' }}>
            <div className="form-group">
              <label className="form-label">Banner Image URL (Optional)</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://images.unsplash.com/..."
                value={regBanner}
                onChange={(e) => setRegBanner(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Logo / Representative Emoji *</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ width: '60px', textAlign: 'center', fontSize: '1.2rem' }}
                  maxLength={2}
                  required
                  value={regLogo}
                  onChange={(e) => setRegLogo(e.target.value)}
                />
                <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', maxWidth: '200px' }}>
                  {PRESET_EMOJIS.slice(0, 10).map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', padding: '2px' }}
                      onClick={() => setRegLogo(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Accent Color Chooser */}
          <div className="form-group" style={{ marginTop: '0.8rem', marginBottom: '1.5rem' }}>
            <label className="form-label">Club Accent Color Theme</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.3rem' }}>
              {PRESET_COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: color.value,
                    border: regAccentColor === color.value ? '2px solid var(--text-primary)' : '2px solid transparent',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)',
                    transform: regAccentColor === color.value ? 'scale(1.1)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                  title={color.name}
                  onClick={() => setRegAccentColor(color.value)}
                />
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Send size={16} /> Submit Registration Request
            </button>
            
            <button type="button" className="btn-secondary" onClick={() => setIsRegistering(false)} style={{ width: '100%', justifyContent: 'center' }}>
              <ArrowLeft size={16} /> Back to Login
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="login-card">
      <div className="login-header">
        <h2 style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
          <KeyRound size={24} style={{ color: 'var(--color-brand)' }} /> Portal Login
        </h2>
        <p>Log in to manage weekly events or moderate submissions.</p>
      </div>

      {loginError && (
        <div style={{ 
          backgroundColor: 'var(--accent-pink-light)', 
          color: 'var(--accent-pink)', 
          padding: '0.8rem', 
          borderRadius: 'var(--radius-sm)', 
          fontSize: '0.85rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          border: '1px solid rgba(236, 72, 153, 0.2)'
        }}>
          <ShieldAlert size={16} /> {loginError}
        </div>
      )}

      {regSuccess && (
        <div style={{ 
          backgroundColor: 'var(--bg-tertiary)', 
          color: 'var(--accent-green)', 
          padding: '0.8rem', 
          borderRadius: 'var(--radius-sm)', 
          fontSize: '0.85rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          ✅ {regSuccess}
        </div>
      )}

      <form onSubmit={handleLoginSubmit}>
        <div className="form-group">
          <label className="form-label">Username / Club ID</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. acm or admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            <LogIn size={16} /> Access Dashboard
          </button>
          
          <button type="button" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setIsRegistering(true)}>
            <UserPlus size={16} /> Request New Club Registration
          </button>

          <button type="button" className="btn-secondary" onClick={onCancel} style={{ width: '100%', justifyContent: 'center' }}>
            Back to Events Board
          </button>
        </div>
      </form>

      <div className="login-demo-accounts" style={{ marginTop: '1.8rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.2rem' }}>
        <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>
          ⚡ 1-Click Quick Demo Logins (Click any to test):
        </h4>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="category-pill active"
            onClick={() => handleLoginSubmit(null, 'acm', 'acm123')}
            style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}
          >
            💻 ACM Club
          </button>
          <button
            type="button"
            className="category-pill"
            onClick={() => handleLoginSubmit(null, 'euphony', 'euphony123')}
            style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}
          >
            🎵 Euphony
          </button>
          <button
            type="button"
            className="category-pill"
            onClick={() => handleLoginSubmit(null, 'stacatos', 'stacatos123')}
            style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}
          >
            💃 Stacatos
          </button>
          <button
            type="button"
            className="category-pill"
            onClick={() => handleLoginSubmit(null, 'ieee', 'ieee123')}
            style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem' }}
          >
            ⚡ IEEE
          </button>
          <button
            type="button"
            className="category-pill"
            onClick={() => handleLoginSubmit(null, 'admin', 'admin123')}
            style={{ fontSize: '0.78rem', padding: '0.45rem 0.85rem', backgroundColor: '#ec4899', color: '#ffffff' }}
          >
            🔑 Admin
          </button>
        </div>
      </div>
    </div>
  );
}
