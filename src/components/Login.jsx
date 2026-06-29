import React, { useState } from 'react';
import { CREDENTIALS } from '../utils/mockData';
import { KeyRound, ShieldAlert, LogIn } from 'lucide-react';

export default function Login({ onLogin, onCancel }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const matchedCred = CREDENTIALS[username.toLowerCase()];
    if (matchedCred && matchedCred.password === password) {
      // Login successful
      onLogin({
        username: username.toLowerCase(),
        role: matchedCred.role,
        clubId: matchedCred.clubId || null,
        name: matchedCred.name
      });
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="login-card">
      <div className="login-header">
        <h2 style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
          <KeyRound size={24} style={{ color: 'var(--color-brand)' }} /> Portal Login
        </h2>
        <p>Log in to manage weekly events or moderate submissions.</p>
      </div>

      {error && (
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
          <ShieldAlert size={16} /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            <LogIn size={16} /> Access Dashboard
          </button>
          
          <button type="button" className="btn-secondary" onClick={onCancel} style={{ width: '100%' }}>
            Back to Events Board
          </button>
        </div>
      </form>

      <div className="login-demo-accounts" style={{ marginTop: '2rem' }}>
        <h4>Demo Accounts:</h4>
        <ul style={{ listStyleType: 'none', paddingLeft: 0, marginTop: '0.4rem', fontSize: '0.8rem' }}>
          <li style={{ marginBottom: '0.2rem' }}>🔑 <strong>Admin:</strong> <code>admin</code> / <code>admin123</code></li>
          <li style={{ marginBottom: '0.2rem' }}>💻 <strong>ACM:</strong> <code>acm</code> / <code>acm123</code></li>
          <li style={{ marginBottom: '0.2rem' }}>🎵 <strong>Euphony:</strong> <code>euphony</code> / <code>euphony123</code></li>
          <li>💃 <strong>Stacatos:</strong> <code>stacatos</code> / <code>stacatos123</code></li>
        </ul>
      </div>
    </div>
  );
}
