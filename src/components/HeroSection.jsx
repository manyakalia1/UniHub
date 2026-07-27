import React from 'react';
import { Search, Compass, FileText, Clock, Sparkles, Zap, ShieldCheck, Ticket, Wifi, Signal, Battery, Code, Flame, Music, Trophy, BookOpen, Layers } from 'lucide-react';
import TypewriterTitle from './TypewriterTitle';

export default function HeroSection({ 
  stats = { approvedCount: 0, clubsCount: 0, registrationsCount: 0 }, 
  onExploreClick,
  searchQuery = '',
  onSearchChange = () => {},
  selectedCategory = 'all',
  onCategorySelect = () => {}
}) {
  const categoryPills = [
    { id: 'all', label: 'All Fests', icon: <Layers size={14} /> },
    { id: 'tech', label: 'Tech & Hackathons', icon: <Code size={14} /> },
    { id: 'cultural', label: 'Cultural & Arts', icon: <Flame size={14} /> },
    { id: 'sports', label: 'Sports & Gaming', icon: <Trophy size={14} /> },
    { id: 'music', label: 'Music & Concerts', icon: <Music size={14} /> },
    { id: 'workshop', label: 'Workshops', icon: <BookOpen size={14} /> }
  ];

  const typewriterPhrases = [
    'Campus Fests & Hackathons',
    'Live Cultural Battles & Dance',
    'Instant Digital PDF Passes',
    'All College Societies Synced'
  ];

  return (
    <section className="hero">
      <div className="hero-container">
        
        {/* Top Tagline */}
        <span className="hero-tag">
          <Sparkles size={14} /> Next-Gen Campus Platform
        </span>

        {/* Movie-Style Typewriter Headline */}
        <h1 className="hero-title">
          Discover & Experience <br />
          <TypewriterTitle phrases={typewriterPhrases} speed={65} deleteSpeed={35} delay={2000} />
        </h1>

        <p className="hero-description">
          Find upcoming technical hackathons, cultural fests, sports leagues, and acoustic music nights in one unified, clean portal.
        </p>

        {/* Hero Search Box */}
        <div className="hero-search-box">
          <div className="hero-search-input-wrapper">
            <Search size={20} className="hero-search-icon" />
            <input
              type="text"
              className="hero-search-input"
              placeholder="Search by Fest Name, Club, Skill, or Location..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <button className="btn-primary hero-search-btn" onClick={onExploreClick}>
              Find Fests
            </button>
          </div>

          {/* Quick Category Pills with Lucide Icons */}
          <div className="category-pills-row">
            {categoryPills.map((pill) => (
              <button
                key={pill.id}
                className={`category-pill ${selectedCategory === pill.id ? 'active' : ''}`}
                onClick={() => onCategorySelect(pill.id)}
              >
                <span className="pill-icon">{pill.icon}</span>
                <span>{pill.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Production-Grade Realistic iPhone 15 Pro Experience Mockup */}
        <div className="iphone-production-wrapper fade-in-fast">
          <div className="iphone-glow-ambient"></div>
          
          <div className="iphone-chassis">
            {/* Side Buttons */}
            <div className="iphone-side-btn volume-up"></div>
            <div className="iphone-side-btn volume-down"></div>
            <div className="iphone-side-btn power"></div>

            {/* Inner Screen Display */}
            <div className="iphone-screen">
              
              {/* Dynamic Island */}
              <div className="iphone-dynamic-island">
                <div className="island-camera"></div>
                <div className="island-sensor"></div>
              </div>

              {/* iOS Status Bar */}
              <div className="iphone-status-bar">
                <span className="ios-time">9:41</span>
                <div className="ios-icons">
                  <Signal size={12} />
                  <Wifi size={12} />
                  <div className="ios-battery-pill">
                    <div className="battery-level"></div>
                  </div>
                </div>
              </div>

              {/* iOS App Shell Header */}
              <div className="iphone-app-header">
                <div className="iphone-app-brand">
                  <div className="brand-logo-small">E</div>
                  <span>EventSync</span>
                </div>
                <span className="iphone-live-feed-pill">● LIVE</span>
              </div>

              {/* Simulated Live Event Cards Inside Phone */}
              <div className="iphone-scroll-feed">
                
                {/* Event Card 1 */}
                <div className="iphone-card featured">
                  <div className="iphone-card-tag tech">
                    <Zap size={11} /> Hackathon &bull; 36 Hrs
                  </div>
                  <h3>HackOverflow 2026</h3>
                  <p>📍 Main Auditorium &bull; ⏰ Dec 12, 10:00 AM</p>
                  <div className="iphone-card-footer">
                    <span className="registrations-count">150 Passes Issued</span>
                    <button className="iphone-action-btn">Get Pass</button>
                  </div>
                </div>

                {/* Event Card 2 */}
                <div className="iphone-card">
                  <div className="iphone-card-tag dance">
                    Cultural Dance Battle
                  </div>
                  <h3>Beat Drop Fests</h3>
                  <p>📍 Amphitheatre &bull; ⏰ Dec 14, 4:00 PM</p>
                  <div className="iphone-card-footer">
                    <span className="registrations-count">42 Registered</span>
                    <button className="iphone-action-btn outline">Details</button>
                  </div>
                </div>

                {/* Event Card 3 */}
                <div className="iphone-card">
                  <div className="iphone-card-tag workshop">
                    AI & Tech Summit
                  </div>
                  <h3>Web3 & AI Workshop</h3>
                  <p>📍 Hall B &bull; ⏰ Dec 18, 11:00 AM</p>
                </div>

              </div>

              {/* iOS Home Indicator Bar */}
              <div className="iphone-home-indicator"></div>
            </div>
          </div>
        </div>

        {/* Platform Stats Row */}
        <div className="hero-stats" style={{ marginBottom: '3rem', marginTop: '2.5rem' }}>
          <div className="stat-item">
            <span className="stat-number">{stats.approvedCount || stats.eventsCount || 8}</span>
            <span className="stat-label">Active Fests</span>
          </div>
          <div className="stat-item" style={{ borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', padding: '0 3rem' }}>
            <span className="stat-number">{stats.clubsCount || 5}</span>
            <span className="stat-label">Organizing Societies</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.registrationsCount || 150}</span>
            <span className="stat-label">Passes Issued</span>
          </div>
        </div>

        {/* Visual Workflow Steps */}
        <div className="workflow-section">
          <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-brand)' }}>
              How EventSync Works
            </span>
            <h2 style={{ fontSize: '1.5rem', marginTop: '0.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              4 Easy Steps to Participate in Campus Fests
            </h2>
          </div>

          <div className="workflow-grid">
            <div className="workflow-card">
              <div className="workflow-step-badge">01</div>
              <div className="workflow-icon-wrapper" style={{ backgroundColor: 'var(--color-brand-light)', color: 'var(--color-brand)' }}>
                <Compass size={22} />
              </div>
              <h3 className="workflow-card-title">1. Discover Fests</h3>
              <p className="workflow-card-desc">
                Search & filter tech hackathons, dance battles, acoustic jams, and seminars.
              </p>
            </div>

            <div className="workflow-card">
              <div className="workflow-step-badge">02</div>
              <div className="workflow-icon-wrapper" style={{ backgroundColor: 'var(--accent-blue-light)', color: 'var(--accent-blue)' }}>
                <FileText size={22} />
              </div>
              <h3 className="workflow-card-title">2. Get PDF Pass</h3>
              <p className="workflow-card-desc">
                Register with your student ID to claim your pass and instantly download your Event PDF flyer.
              </p>
            </div>

            <div className="workflow-card">
              <div className="workflow-step-badge">03</div>
              <div className="workflow-icon-wrapper" style={{ backgroundColor: 'var(--accent-amber-light)', color: 'var(--accent-amber)' }}>
                <Clock size={22} />
              </div>
              <h3 className="workflow-card-title">3. Smart FIFO Queue</h3>
              <p className="workflow-card-desc">
                If capacity is full, you are automatically assigned a fair waiting queue position.
              </p>
            </div>

            <div className="workflow-card">
              <div className="workflow-step-badge">04</div>
              <div className="workflow-icon-wrapper" style={{ backgroundColor: 'var(--accent-green-light)', color: 'var(--accent-green)' }}>
                <Sparkles size={22} />
              </div>
              <h3 className="workflow-card-title">4. Auto-Promotion</h3>
              <p className="workflow-card-desc">
                When a registered student cancels, the next waiting student is instantly promoted to approved!
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
