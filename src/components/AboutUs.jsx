import React from 'react';
import { Sparkles, Users, Award, ShieldCheck, Zap, Globe, HeartHandshake, Rocket, ArrowRight } from 'lucide-react';

export default function AboutUs({ onNavigate }) {
  const stats = [
    { label: 'Campus Events Synced', value: '150+', icon: <Zap className="stat-icon" size={24} />, color: 'var(--accent-blue)' },
    { label: 'Active University Clubs', value: '25+', icon: <Users className="stat-icon" size={24} />, color: 'var(--accent-pink)' },
    { label: 'Student Registrations', value: '12,500+', icon: <Rocket className="stat-icon" size={24} />, color: 'var(--accent-green)' },
    { label: 'Real-time Approval Rate', value: '99.8%', icon: <Award className="stat-icon" size={24} />, color: 'var(--accent-amber)' },
  ];

  const team = [
    {
      name: 'Aarav Sharma',
      role: 'Founding Director & Lead Architect',
      avatar: '👨‍💻',
      bio: 'Envisioned a centralized digital ecosystem to replace fragmented bulletin boards and campus chat groups.',
      tag: 'Core Founder',
      color: '#6366f1'
    },
    {
      name: 'Ananya Roy',
      role: 'Head of Student Experience & UI/UX',
      avatar: '👩‍🎨',
      bio: 'Crafted the Apple-inspired fluid aesthetic and accessible design language that students love navigating.',
      tag: 'Design Chief',
      color: '#ec4899'
    },
    {
      name: 'Vikramaditya Verma',
      role: 'Chief Technology Officer',
      avatar: '🚀',
      bio: 'Architected real-time notification engine, QR ticket verification, and instant club sync capabilities.',
      tag: 'Engineering Lead',
      color: '#10b981'
    },
    {
      name: 'Sneha Patel',
      role: 'Student Relations & Club Liaison',
      avatar: '🌟',
      bio: 'Coordinates onboarding across tech, cultural, and sports clubs to foster vibrant campus engagements.',
      tag: 'Operations',
      color: '#f59e0b'
    }
  ];

  const pillars = [
    {
      title: 'Seamless Discovery',
      description: 'Find workshops, hackathons, cultural fests, and sports meets effortlessly with real-time categorizations.',
      icon: <Globe size={28} />,
      gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)'
    },
    {
      title: 'Empowered Clubs',
      description: 'Autonomous event lifecycle management for club leads—from proposal submission to instant guest check-in.',
      icon: <ShieldCheck size={28} />,
      gradient: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)'
    },
    {
      title: 'Vibrant Community',
      description: 'Fostering active student participation through automated pass creation and live notice announcements.',
      icon: <HeartHandshake size={28} />,
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)'
    }
  ];

  return (
    <div className="about-page-wrapper fade-in-section">
      {/* Hero Header Section */}
      <section className="about-hero-banner">
        <div className="about-hero-backdrop"></div>
        <div className="about-hero-content">
          <div className="vibrant-badge">
            <Sparkles size={16} /> Empowering Campus Life
          </div>
          <h1 className="about-hero-title">
            The Digital Heart of <span className="shimmer-text">University Engagements</span>
          </h1>
          <p className="about-hero-subtitle">
            EventSync bridges student passion with administrative synergy. We transform how events are created, discovered, and experienced across campus.
          </p>

          <div className="about-hero-actions">
            <button className="btn-primary-vibrant" onClick={() => onNavigate('events')}>
              Explore Live Events <ArrowRight size={18} />
            </button>
            <button className="btn-secondary-vibrant" onClick={() => onNavigate('motto')}>
              Our Core Motto
            </button>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="about-section-container">
        <div className="stats-grid-vibrant">
          {stats.map((item, idx) => (
            <div key={idx} className="stat-card-vibrant" style={{ borderTop: `4px solid ${item.color}` }}>
              <div className="stat-icon-wrapper" style={{ color: item.color, background: `${item.color}15` }}>
                {item.icon}
              </div>
              <div className="stat-value-vibrant">{item.value}</div>
              <div className="stat-label-vibrant">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story & Ecosystem Cards */}
      <section className="about-section-container">
        <div className="section-header-center">
          <h2 className="section-title-gradient">Our Core Pillars</h2>
          <p className="section-subtitle-clean">Designed for high performance, intuitive clarity, and vibrant aesthetics.</p>
        </div>

        <div className="pillars-grid">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="pillar-card-glass">
              <div className="pillar-icon-box" style={{ background: pillar.gradient }}>
                {pillar.icon}
              </div>
              <h3 className="pillar-card-title">{pillar.title}</h3>
              <p className="pillar-card-desc">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="about-section-container">
        <div className="section-header-center">
          <h2 className="section-title-gradient">Meet The Visionaries</h2>
          <p className="section-subtitle-clean">The team behind EventSync's fluid user experience and campus coordination.</p>
        </div>

        <div className="team-grid">
          {team.map((member, idx) => (
            <div key={idx} className="team-card-vibrant">
              <div className="team-avatar-box" style={{ borderColor: member.color }}>
                <span className="team-emoji-avatar">{member.avatar}</span>
              </div>
              <span className="team-tag" style={{ background: `${member.color}20`, color: member.color }}>
                {member.tag}
              </span>
              <h3 className="team-name">{member.name}</h3>
              <div className="team-role">{member.role}</div>
              <p className="team-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
