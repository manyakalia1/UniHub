import React, { useState } from 'react';
import { LogIn, LogOut, LayoutDashboard, Calendar, Menu, X, Sun, Moon, Info, Target, Smartphone, Ticket } from 'lucide-react';

export default function Header({ currentUser, onNavigate, activeTab, onLogout, theme = 'light', onToggleTheme, onOpenMyPasses, onOpenGetFreeTicket }) {
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
          <div className="logo-icon">E</div>
          <span className="logo-text">EventSync</span>
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

          <a
            href="#about"
            className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('about');
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Info size={16} /> About Us
            </span>
          </a>

          <a
            href="#motto"
            className={`nav-link ${activeTab === 'motto' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('motto');
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Target size={16} /> Our Motto
            </span>
          </a>

          {/* Get Free Ticket Primary Action Tab */}
          <button
            className="nav-link nav-btn-ticket"
            onClick={(e) => {
              e.preventDefault();
              if (onOpenGetFreeTicket) onOpenGetFreeTicket();
              setIsMenuOpen(false);
            }}
            style={{ 
              background: 'linear-gradient(135deg, #10b981, #059669)', 
              color: '#ffffff', 
              fontWeight: 700, 
              border: 'none',
              borderRadius: '9999px',
              padding: '0.45rem 1.05rem',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Ticket size={16} /> Get Free Ticket
          </button>

          <button
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              onOpenMyPasses();
              setIsMenuOpen(false);
            }}
            style={{ 
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(236, 72, 153, 0.2))', 
              color: 'var(--text-primary)', 
              fontWeight: 700, 
              border: '1px solid rgba(99, 102, 241, 0.4)',
              borderRadius: '9999px',
              padding: '0.4rem 0.9rem',
              cursor: 'pointer'
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Ticket size={15} style={{ color: 'var(--color-brand)' }} /> My Passes
            </span>
          </button>

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

          <a
            href="#about"
            className={`mobile-nav-link ${activeTab === 'about' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('about');
            }}
          >
            <Info size={18} /> About Us
          </a>

          <a
            href="#motto"
            className={`mobile-nav-link ${activeTab === 'motto' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('motto');
            }}
          >
            <Target size={18} /> Our Motto
          </a>

          <button
            className="mobile-nav-link"
            onClick={(e) => {
              e.preventDefault();
              if (onOpenGetFreeTicket) onOpenGetFreeTicket();
              setIsMenuOpen(false);
            }}
            style={{ 
              background: 'linear-gradient(135deg, #10b981, #059669)', 
              color: '#ffffff', 
              fontWeight: 700, 
              border: 'none',
              borderRadius: '8px',
              width: '100%',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.65rem 1rem',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
            }}
          >
            <Ticket size={18} /> Get Free Ticket
          </button>

          <button
            className="mobile-nav-link"
            onClick={(e) => {
              e.preventDefault();
              onOpenMyPasses();
              setIsMenuOpen(false);
            }}
            style={{ 
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(236, 72, 153, 0.2))', 
              color: 'var(--text-primary)', 
              fontWeight: 700, 
              border: '1px solid rgba(99, 102, 241, 0.4)',
              width: '100%',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            <Ticket size={18} style={{ color: 'var(--color-brand)' }} /> My Digital Passes
          </button>

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
