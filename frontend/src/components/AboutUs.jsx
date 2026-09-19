import React from 'react';
import { Sparkles, Users, Award, ShieldCheck, Zap, Globe, HeartHandshake, Rocket, ArrowRight, Crown, Building2, UserCheck, CheckCircle2 } from 'lucide-react';

export default function AboutUs({ onNavigate }) {
  const stats = [
    { label: 'Campus Events Synced', value: '150+', icon: <Zap size={22} />, color: 'var(--accent-blue)' },
    { label: 'Active University Societies', value: '25+', icon: <Users size={22} />, color: 'var(--accent-pink)' },
    { label: 'Verified Registrations', value: '12,500+', icon: <Rocket size={22} />, color: 'var(--accent-green)' },
    { label: 'Instant Approval Rate', value: '99.8%', icon: <Award size={22} />, color: 'var(--accent-amber)' },
  ];

  const team = [
    {
      name: 'Manya Kalia',
      role: 'Founder & CEO',
      icon: <Crown size={32} color="#ec4899" />,
      bio: 'The visionary leader behind EventSync. Passionate about technology, digital transformation, and empowering student societies with seamless campus solutions under RM Enterprises.',
      tag: 'Founder & CEO',
      color: '#ec4899',
      isFounder: true
    }
  ];

  const pillars = [
    {
      title: 'Seamless Event Discovery',
      description: 'Discover workshops, hackathons, cultural showcases, and athletic leagues with real-time category filtering.',
      icon: <Globe size={26} />,
      gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)'
    },
    {
      title: 'Empowered Societies & Clubs',
      description: 'Autonomous event lifecycle management for club coordinators—from proposal drafting to QR check-in.',
      icon: <ShieldCheck size={26} />,
      gradient: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)'
    },
    {
      title: 'Unified Student Community',
      description: 'Fostering active campus participation through instant digital PDF passes and live notice broadcasts.',
      icon: <HeartHandshake size={26} />,
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)'
    }
  ];

  return (
    <div className="about-page-wrapper fade-in-section">
      {/* Hero Header Section */}
      <section className="about-hero-banner">
        <div className="about-hero-content">
          <div className="vibrant-badge">
            <Building2 size={15} /> RM Enterprises Technology Venture
          </div>
          <h1 className="about-hero-title">
            The Digital Heart of <span className="shimmer-text">University Engagements</span>
          </h1>
          <p className="about-hero-subtitle">
            Founded by <strong>Manya Kalia</strong> under <strong>RM Enterprises</strong>, EventSync unifies student passion with administrative synergy across institutions nationwide.
          </p>

          <div className="about-hero-actions">
            <button className="btn-primary-vibrant" onClick={() => onNavigate('events')}>
              Explore Live Events <ArrowRight size={17} />
            </button>
            <button className="btn-secondary-vibrant" onClick={() => onNavigate('motto')}>
              Our Core Motto
            </button>
          </div>
        </div>
      </section>

      {/* Founder Spotlight Card */}
      <section className="about-section-container">
        <div className="founder-spotlight-box">
          <div className="founder-avatar-circle">
            <Crown size={32} className="crown-icon-glow" />
          </div>
          <div className="founder-details">
            <span className="founder-tag-pill">
              <UserCheck size={13} style={{ display: 'inline', marginRight: '4px' }} /> Founder & CEO
            </span>
            <h2 className="founder-name">Manya Kalia</h2>
            <p className="founder-title-sub">Founder & CEO of EventSync | RM Enterprises</p>
            <p className="founder-bio-text">
              "Passionate about cutting-edge technology and digital innovation. Manya Kalia engineered EventSync under RM Enterprises to revolutionize student activities, society coordination, and campus pass issuance."
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="about-section-container">
        <div className="stats-grid-vibrant">
          {stats.map((item, idx) => (
            <div key={idx} className="stat-card-vibrant" style={{ borderTop: `3px solid ${item.color}` }}>
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
          <p className="section-subtitle-clean">Designed for high performance, intuitive clarity, and professional standards.</p>
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

      {/* Founder & Leadership Section */}
      <section className="about-section-container">
        <div className="section-header-center">
          <h2 className="section-title-gradient">Founder & Leadership</h2>
          <p className="section-subtitle-clean">Spearheaded by Manya Kalia under RM Enterprises.</p>
        </div>

        <div className="team-grid-single">
          {team.map((member, idx) => (
            <div key={idx} className="team-card-vibrant founder-highlight-card">
              <div className="team-avatar-box" style={{ borderColor: member.color }}>
                {member.icon}
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
