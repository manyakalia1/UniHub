import React from 'react';
import { Code, Palette, Trophy, Music, GraduationCap, ArrowRight } from 'lucide-react';

export default function ExploreCategories({ selectedCategory, onSelectCategory, events = [] }) {
  // Count events per category dynamically
  const getCategoryCount = (typeId) => {
    if (typeId === 'all') return events.filter(e => e.status === 'approved').length;
    return events.filter(event => {
      if (event.status !== 'approved') return false;
      const textToMatch = `${event.title} ${event.description} ${event.tags ? event.tags.join(' ') : ''} ${event.clubId}`.toLowerCase();
      if (typeId === 'tech') {
        return textToMatch.includes('code') || textToMatch.includes('hackathon') || textToMatch.includes('tech') || textToMatch.includes('iot') || textToMatch.includes('acm') || textToMatch.includes('ieee') || textToMatch.includes('iste');
      } else if (typeId === 'cultural') {
        return textToMatch.includes('dance') || textToMatch.includes('drama') || textToMatch.includes('nukkad') || textToMatch.includes('cultural') || textToMatch.includes('stacatos') || textToMatch.includes('cut_c') || textToMatch.includes('vibin');
      } else if (typeId === 'sports') {
        return textToMatch.includes('sport') || textToMatch.includes('cricket') || textToMatch.includes('football') || textToMatch.includes('arcs') || textToMatch.includes('tournament') || textToMatch.includes('league');
      } else if (typeId === 'music') {
        return textToMatch.includes('music') || textToMatch.includes('acoustic') || textToMatch.includes('singing') || textToMatch.includes('euphony') || textToMatch.includes('jamming');
      } else if (typeId === 'workshop') {
        return textToMatch.includes('workshop') || textToMatch.includes('seminar') || textToMatch.includes('training') || textToMatch.includes('lecture');
      }
      return false;
    }).length;
  };

  const categories = [
    {
      id: 'tech',
      title: 'Technical Fests & Hackathons',
      subtitle: 'Coding sprints, IoT hardware, competitive programming',
      icon: <Code size={24} />,
      color: '#6366f1',
      bgLight: '#e0e7ff',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
      count: getCategoryCount('tech')
    },
    {
      id: 'cultural',
      title: 'Cultural Fests & Dance',
      subtitle: 'Street plays, classical dance, mime acts, drama',
      icon: <Palette size={24} />,
      color: '#ec4899',
      bgLight: '#fce7f3',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
      count: getCategoryCount('cultural')
    },
    {
      id: 'sports',
      title: 'Sports Leagues & Gaming',
      subtitle: 'Cricket championships, football meets, athletic trials',
      icon: <Trophy size={24} />,
      color: '#10b981',
      bgLight: '#d1fae5',
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=600&q=80',
      count: getCategoryCount('sports')
    },
    {
      id: 'music',
      title: 'Music & Concert Jams',
      subtitle: 'Acoustic night sessions, vocal solos, band performances',
      icon: <Music size={24} />,
      color: '#8b5cf6',
      bgLight: '#f5f3ff',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
      count: getCategoryCount('music')
    },
    {
      id: 'workshop',
      title: 'Workshops & Seminars',
      subtitle: 'GenAI lectures, prompt engineering, hands-on kits',
      icon: <GraduationCap size={24} />,
      color: '#0ea5e9',
      bgLight: '#e0f2fe',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
      count: getCategoryCount('workshop')
    }
  ];

  const handleCardClick = (catId) => {
    onSelectCategory(catId);
    const section = document.getElementById('events-browse-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="explore-types-section">
      <div className="section-container" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-brand)' }}>
            AllCollegeEvent Portal
          </span>
          <h2 style={{ fontSize: '1.7rem', marginTop: '0.2rem', fontWeight: 800 }}>
            Explore by Event Type
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '600px', margin: '0.4rem auto 0 auto' }}>
            Discover campus activities categorized by interest. Click any category to view active listings.
          </p>
        </div>

        <div className="explore-types-grid">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`explore-type-card ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleCardClick(cat.id)}
            >
              <div className="type-card-banner">
                <img src={cat.image} alt={cat.title} className="type-card-img" />
                <div className="type-card-overlay" />
                <span className="type-card-count" style={{ color: '#ffffff', backgroundColor: cat.color }}>
                  {cat.count} Active Fests
                </span>
              </div>

              <div className="type-card-body">
                <div className="type-card-header">
                  <div className="type-card-icon" style={{ backgroundColor: cat.bgLight, color: cat.color }}>
                    {cat.icon}
                  </div>
                </div>
                <h3 className="type-card-title">{cat.title}</h3>
                <p className="type-card-subtitle">{cat.subtitle}</p>
                <div className="type-card-action">
                  <span>Explore Category</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
