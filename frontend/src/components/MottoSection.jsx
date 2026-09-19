import React, { useState } from 'react';
import { Target, Compass, Flame, Sparkles, ChevronDown, CheckCircle2, ArrowRight, Search, Users, Zap, Award, Gem, Eye } from 'lucide-react';

export default function MottoSection({ onNavigate }) {
  const [activeAccordion, setActiveAccordion] = useState(0);

  const mottoItems = [
    {
      title: '1. Empower Every Voice',
      subtitle: 'Democratizing campus participation across all departments',
      icon: <Flame size={24} />,
      color: '#ec4899',
      details: 'Every student, regardless of year or department, deserves equal access to leadership opportunities, club events, and skill-building hackathons. EventSync guarantees transparency and zero-barrier registration.'
    },
    {
      title: '2. Synchronize Campus Life',
      subtitle: 'Eliminating clutter, overlap, and forgotten announcements',
      icon: <Compass size={24} />,
      color: '#6366f1',
      details: 'No more overlapping major fests or buried notices. EventSync provides an intelligent master schedule where clubs synchronize dates seamlessly with faculty approvals.'
    },
    {
      title: '3. Elevate Academic & Cultural Harmony',
      subtitle: 'Where technical rigor meets creative expression',
      icon: <Target size={24} />,
      color: '#10b981',
      details: 'We believe learning extends far beyond the lecture hall. By uniting coding competitions, literary debates, dance showcases, and sports leagues under one umbrella, we celebrate holistic excellence.'
    },
    {
      title: '4. Drive Continuous Innovation',
      subtitle: 'Pioneering modern Web UI/UX and instant digital entry passes',
      icon: <Sparkles size={24} />,
      color: '#0ea5e9',
      details: 'Paper tickets are a thing of the past. EventSync delivers instant PDF passes, QR verification, dynamic theme customization, and fluid device cross-compatibility.'
    }
  ];

  const coreValues = [
    { title: 'Transparency', desc: 'Real-time approval status for every event request.', icon: <Search size={26} color="#6366f1" /> },
    { title: 'Inclusivity', desc: 'Open to all colleges, clubs, and student organizations.', icon: <Users size={26} color="#ec4899" /> },
    { title: 'Velocity', desc: 'Instant event publishing and instant student registration.', icon: <Zap size={26} color="#10b981" /> },
    { title: 'Excellence', desc: 'Apple-grade design standards, fluid motion, and dark mode.', icon: <Gem size={26} color="#0ea5e9" /> },
  ];

  return (
    <div className="motto-page-wrapper fade-in-section">
      {/* Banner */}
      <section className="motto-hero-banner">
        <div className="motto-hero-overlay"></div>
        <div className="motto-hero-content">
          <div className="vibrant-badge motto-badge">
            <Target size={16} /> Our Guiding Philosophy
          </div>
          <h1 className="motto-hero-title">
            "Connect. Create. <span className="shimmer-text">Celebrate Campus.</span>"
          </h1>
          <p className="motto-hero-subtitle">
            EventSync was built on the belief that campus life should be vibrant, effortless, and connected for every single student and leader.
          </p>
        </div>
      </section>

      {/* Philosophy Accordion Grid */}
      <section className="about-section-container">
        <div className="section-header-center">
          <h2 className="section-title-gradient">The Four Pillars of Our Motto</h2>
          <p className="section-subtitle-clean">Click each pillar to discover how we turn our vision into everyday campus reality.</p>
        </div>

        <div className="motto-accordion-container">
          {mottoItems.map((item, idx) => {
            const isOpen = activeAccordion === idx;
            return (
              <div 
                key={idx} 
                className={`motto-accordion-card ${isOpen ? 'expanded' : ''}`}
                onClick={() => setActiveAccordion(isOpen ? -1 : idx)}
                style={{ '--item-accent': item.color }}
              >
                <div className="motto-card-header">
                  <div className="motto-icon-box" style={{ background: `${item.color}20`, color: item.color }}>
                    {item.icon}
                  </div>
                  <div className="motto-header-text">
                    <h3 className="motto-card-title">{item.title}</h3>
                    <p className="motto-card-subtitle">{item.subtitle}</p>
                  </div>
                  <div className={`motto-chevron ${isOpen ? 'rotate' : ''}`}>
                    <ChevronDown size={20} />
                  </div>
                </div>

                {isOpen && (
                  <div className="motto-card-body fade-in-fast">
                    <p className="motto-details-text">{item.details}</p>
                    <div className="motto-body-footer">
                      <span className="motto-verified-tag">
                        <CheckCircle2 size={16} style={{ color: item.color }} /> Active Principle
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Values Cards */}
      <section className="about-section-container">
        <div className="section-header-center">
          <h2 className="section-title-gradient">Core Values We Live By</h2>
          <p className="section-subtitle-clean">Standards that define every feature we engineer into EventSync.</p>
        </div>

        <div className="values-grid">
          {coreValues.map((val, idx) => (
            <div key={idx} className="value-card-vibrant">
              <div className="value-icon-box">{val.icon}</div>
              <h3 className="value-title">{val.title}</h3>
              <p className="value-desc">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="about-section-container">
        <div className="motto-cta-box">
          <div className="motto-cta-content">
            <h2>Ready to experience the motto in action?</h2>
            <p>Join thousands of students discovering fests, workshops, and hackathons daily.</p>
          </div>
          <button className="btn-primary-vibrant" onClick={() => onNavigate('events')}>
            Browse Live Events <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
