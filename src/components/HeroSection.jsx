import React from 'react';
import { CalendarRange, ShieldCheck, Users } from 'lucide-react';

export default function HeroSection({ eventsCount, clubsCount, registrationsCount, onBrowseClick }) {
  return (
    <section className="hero">
      <div className="hero-container">
        <span className="hero-tag">Weekly College Bulletin</span>
        <h1 className="hero-title">Discover What's Happening on Campus This Week</h1>
        <p className="hero-description">
          Say goodbye to cluttered WhatsApp groups and missed notifications. UniHub brings all student club events, workshops, hackathons, and sports trials under a single clean, easy-to-use platform.
        </p>

        <button 
          className="btn-primary" 
          onClick={onBrowseClick}
          style={{ padding: '0.8rem 2rem', fontSize: '1.05rem', marginBottom: '2.5rem' }}
        >
          <CalendarRange size={18} /> Browse Live & Upcoming Events
        </button>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">{eventsCount}</span>
            <span className="stat-label">Events This Week</span>
          </div>
          <div className="stat-item" style={{ borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', padding: '0 3rem' }}>
            <span className="stat-number">{clubsCount}</span>
            <span className="stat-label">Active Clubs</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{registrationsCount}</span>
            <span className="stat-label">Registrations Sent</span>
          </div>
        </div>
      </div>
    </section>
  );
}
