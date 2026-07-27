import React from 'react';
import { Sparkles, Users, Award, ShieldCheck, Zap, Globe, HeartHandshake, Rocket, ArrowRight, Crown, Building2, Cpu } from 'lucide-react';

export default function AboutUs({ onNavigate }) {
  const stats = [
    { label: 'Campus Events Synced', value: '150+', icon: <Zap className="stat-icon" size={24} />, color: 'var(--accent-blue)' },
    { label: 'Active University Clubs', value: '25+', icon: <Users className="stat-icon" size={24} />, color: 'var(--accent-pink)' },
    { label: 'Student Registrations', value: '12,500+', icon: <Rocket className="stat-icon" size={24} />, color: 'var(--accent-green)' },
    { label: 'Real-time Approval Rate', value: '99.8%', icon: <Award className="stat-icon" size={24} />, color: 'var(--accent-amber)' },
  ];

  const team = [
    {
      name: 'Manya Kalia',
      role: 'CEO & Sole Founder (The One & Only)',
      avatar: '👑',
      bio: 'The visionary leader behind EventSync. Passionate about cutting-edge technology, innovation, and empowering students with seamless campus experiences under RM Enterprises.',
      tag: '👑 Founder & CEO',
      color: '#ec4899',
      isFounder: true
    },
    {
      name: 'Manik Mittal',
      role: 'Key Technical Contributor | Founder, RN2M Technologies',
      avatar: '👨‍💻',
      bio: 'Tech innovator and Founder of RN2M Technologies (creators of Classync.). Trusted partner & key contributor who helped architect EventSync’s scheduling & sync algorithms.',
      tag: '🚀 Tech Collaborator',
      color: '#6366f1'
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
            <Building2 size={16} /> An RM Enterprises Technology Venture
          </div>
          <h1 className="about-hero-title">
            The Digital Heart of <span className="shimmer-text">University Engagements</span>
          </h1>
          <p className="about-hero-subtitle">
            Founded by <strong>Manya Kalia</strong> under <strong>RM Enterprises</strong>, EventSync bridges student passion with administrative synergy across colleges nationwide.
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
            <h2 className="founder-name">Manya Kalia</h2>
            <p className="founder-title-sub">The One and Only Founder & CEO of EventSync | RM Enterprises</p>
            <p className="founder-bio-text">
              "Absolutely passionate about technology and innovation. Manya Kalia engineered EventSync under RM Enterprises to revolutionize student activities, society coordination, and campus digital passes."
            </p>
          </div>
        </div>
      </section>

      {/* Partner & Tech Ecosystem Box (RN2M Technologies) */}
      <section className="about-section-container">
        <div className="partner-tech-box">
          <div className="partner-icon-wrapper">
            <Cpu size={28} />
          </div>
          <div className="partner-content">
            <span className="partner-badge">🤝 Key Technology Partner</span>
            <h3>Collaborative Synergy with RN2M Technologies</h3>
            <p>
              Special thanks to <strong>Manik Mittal</strong> (Founder, RN2M Technologies - architects of Classync.) for his valuable technical insights and contribution to EventSync’s high-performance scheduling core.
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

      {/* Leadership & Key Team Section */}
      <section className="about-section-container">
        <div className="section-header-center">
          <h2 className="section-title-gradient">Leadership & Key Contributors</h2>
          <p className="section-subtitle-clean">Spearheaded by Manya Kalia (RM Enterprises) with key contribution from Manik Mittal (RN2M Technologies).</p>
        </div>

        <div className="team-grid-two">
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
