import React, { useState } from 'react';
import { LogIn, LogOut, LayoutDashboard, Calendar, Menu, X, Sun, Moon } from 'lucide-react';

export default function Header({ currentUser, onNavigate, activeTab, onLogout, theme = 'light', onToggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getRoleDotClass = (role) => {
    if (role === 'admin') return 'role-dot admin';
    if (role === 'club') return 'role-dot club';
    return 'role-dot student';
  };

  const getRoleLabel = (role, clubId) => {
    if (role === 'admin') return 'Admin';
    if (role === 'club') return `${clubId.charAt(0).toUpperCase() + clubId.slice(1)} Club`;
    return 'Student / Faculty';
  };

  const handleLinkClick = (tab) => {
    onNavigate(tab);
    setIsMenuOpen(false);
  };

  const handleLogoutClick = () => {
    onLogout();
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section" onClick={() => handleLinkClick('events')}>
          <div className="logo-icon">U</div>
          <span className="logo-text">UniHub</span>
        </div>

        {/* Desktop Navigation Link Panel */}
        <nav className="nav-links">
          <a
            href="#events"
            className={`nav-link ${activeTab === 'events' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('events');
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Calendar size={16} /> Events
            </span>
          </a>

          {currentUser ? (
            <>
              <a
                href="#dashboard"
                className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('dashboard');
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <LayoutDashboard size={16} /> Dashboard
                </span>
              </a>
              
              <div className="user-badge">
                <span className={getRoleDotClass(currentUser.role)}></span>
                <span>{getRoleLabel(currentUser.role, currentUser.clubId)}</span>
              </div>

              <button
                className="btn-card-action"
                onClick={handleLogoutClick}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', border: '1px solid var(--border-color)' }}
              >
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            <button
              className="btn-primary"
              onClick={() => handleLinkClick('login')}
              style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
            >
              <LogIn size={15} /> Club / Admin Login
            </button>
          )}

          <button
            onClick={onToggleTheme}
            style={{
              background: 'none',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              width: '2.2rem',
              height: '2.2rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              transition: 'var(--transition-fast)',
              padding: 0
            }}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <button 
          className="menu-toggle-btn" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {isMenuOpen && (
        <div className="mobile-nav-menu">
          <a
            href="#events"
            className={`mobile-nav-link ${activeTab === 'events' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('events');
            }}
          >
            <Calendar size={18} /> Events
          </a>

          {currentUser ? (
            <>
              <a
                href="#dashboard"
                className={`mobile-nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('dashboard');
                }}
              >
                <LayoutDashboard size={18} /> Dashboard ({getRoleLabel(currentUser.role, currentUser.clubId)})
              </a>
              
              <button
                className="btn-danger"
                onClick={handleLogoutClick}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <button
              className="btn-primary"
              onClick={() => handleLinkClick('login')}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}
            >
              <LogIn size={16} /> Club / Admin Login
            </button>
          )}

          <button
            onClick={onToggleTheme}
            className="mobile-nav-link"
            style={{
              background: 'none',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.6rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              width: '100%',
              textAlign: 'left',
              marginTop: '0.5rem'
            }}
          >
            {theme === 'light' ? (
              <>
                <Moon size={18} /> Dark Mode: Off
              </>
            ) : (
              <>
                <Sun size={18} /> Dark Mode: On
              </>
            )}
          </button>
        </div>
      )}
    </header>
  );
}
