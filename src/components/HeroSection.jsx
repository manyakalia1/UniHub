import React from 'react';
import { CalendarRange, ShieldCheck, Users } from 'lucide-react';

export default function HeroSection({ eventsCount, clubsCount, registrationsCount, onBrowseClick }) {
  return (
    <section className="hero">
      <div className="hero-container">
        <span className="hero-tag">🔥 What's the Campus Vibe?</span>
        <h1 className="hero-title">Unfiltered Campus Buzz: No Caps, Just Events</h1>
        <p className="hero-description">
          Ditch those spammy WhatsApp groups and 99+ missed notifications. UniHub has entered the chat. All club events, workshops, and sports trials, served hot and fresh. Real, no cap. 💅
        </p>

        <button 
          className="btn-primary" 
          onClick={onBrowseClick}
          style={{ padding: '0.8rem 2rem', fontSize: '1.05rem', marginBottom: '2.5rem' }}
        >
          <CalendarRange size={18} /> Find Your Vibe ✨
        </button>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">{eventsCount}</span>
            <span className="stat-label">Happenings Cooking</span>
          </div>
          <div className="stat-item" style={{ borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', padding: '0 3rem' }}>
            <span className="stat-number">{clubsCount}</span>
            <span className="stat-label">Clubs Active</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{registrationsCount}</span>
            <span className="stat-label">RSVPs Secured 🎟️</span>
          </div>
        </div>
      </div>
    </section>
  );
}
