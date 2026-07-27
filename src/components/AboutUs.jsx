import React from 'react';
import { Sparkles, Users, Award, ShieldCheck, Zap, Globe, HeartHandshake, Rocket, ArrowRight, Crown, Lightbulb } from 'lucide-react';

export default function AboutUs({ onNavigate }) {
  const stats = [
    { label: 'Campus Events Synced', value: '150+', icon: <Zap className="stat-icon" size={24} />, color: 'var(--accent-blue)' },
    { label: 'Active University Clubs', value: '25+', icon: <Users className="stat-icon" size={24} />, color: 'var(--accent-pink)' },
    { label: 'Student Registrations', value: '12,500+', icon: <Rocket className="stat-icon" size={24} />, color: 'var(--accent-green)' },
    { label: 'Real-time Approval Rate', value: '99.8%', icon: <Award className="stat-icon" size={24} />, color: 'var(--accent-amber)' },
  ];

  const team = [
    {
      name: 'Mrs. Manya Kalia',
      role: 'CEO & Sole Founder (The One & Only)',
      avatar: '👑',
      bio: 'The visionary force behind EventSync. Absolutely passionate about cutting-edge technology, innovation, and empowering students to experience seamless campus engagements.',
      tag: '👑 Founder & CEO',
      color: '#ec4899',
      isFounder: true
    },
    {
      name: 'Aarav Sharma',
      role: 'Lead System Architect',
      avatar: '👨‍💻',
      bio: 'Architected the real-time event pipeline and automated queue management system.',
      tag: 'Engineering',
      color: '#6366f1'
    },
    {
      name: 'Ananya Roy',
      role: 'Head of Product Experience & UI/UX',
      avatar: '👩‍🎨',
      bio: 'Crafted the Apple-inspired fluid design system, responsive glassmorphism, and accessible layouts.',
      tag: 'Design Chief',
      color: '#0ea5e9'
    },
    {
      name: 'Sneha Patel',
      role: 'Student Relations & Club Liaison',
      avatar: '🌟',
      bio: 'Coordinates onboarding across tech, cultural, and sports societies for vibrant campus collaboration.',
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
        <div className="about-hero-content">
          <div className="vibrant-badge">
            <Sparkles size={16} /> Empowering Campus Life
          </div>
          <h1 className="about-hero-title">
            The Digital Heart of <span className="shimmer-text">University Engagements</span>
          </h1>
          <p className="about-hero-subtitle">
            Founded by <strong>Mrs. Manya Kalia</strong>, EventSync bridges student passion with administrative synergy. We transform how events are created, discovered, and experienced across campus.
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

      {/* Founder Spotlight Card */}
      <section className="about-section-container">
        <div className="founder-spotlight-box">
          <div className="founder-avatar-circle">
            <Crown size={32} className="crown-icon-glow" />
            <span className="founder-emoji">👩‍💻</span>
          </div>
          <div className="founder-details">
            <span className="founder-tag-pill">✨ Founder & CEO</span>
            <h2 className="founder-name">Mrs. Manya Kalia</h2>
            <p className="founder-title-sub">The One and Only Founder & CEO of EventSync</p>
            <p className="founder-bio-text">
              "Absolutely passionate about technology and innovation. Mrs. Manya Kalia built EventSync to bridge the gap between student aspirations and campus ecosystem capabilities. Her vision fuels our relentless drive for Apple-grade design and performance."
            </p>
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

      {/* Leadership & Team Section */}
      <section className="about-section-container">
        <div className="section-header-center">
          <h2 className="section-title-gradient">Leadership & Team</h2>
          <p className="section-subtitle-clean">Spearheaded by Mrs. Manya Kalia & dedicated student architects.</p>
        </div>

        <div className="team-grid">
          {team.map((member, idx) => (
            <div key={idx} className={`team-card-vibrant ${member.isFounder ? 'founder-highlight-card' : ''}`}>
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
