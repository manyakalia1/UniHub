import React, { useState, useMemo } from 'react';
import EventCard from './EventCard';
import HeroSection from './HeroSection';
import ExploreCategories from './ExploreCategories';
import { Search, Compass, Users } from 'lucide-react';

export default function EventGrid({ events, stats, notices = [], clubs = [], onEventClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClub, setSelectedClub] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  const todayStr = useMemo(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const scrollToEvents = () => {
    const section = document.getElementById('events-browse-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter events based on search, club, category pill, and date tab
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (event.status !== 'approved') return false;

      // Search matching
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        (event.tags && event.tags.some(tag => tag.toLowerCase().includes(query))) ||
        event.clubName.toLowerCase().includes(query) ||
        event.venue.toLowerCase().includes(query);

      // Club dropdown filter
      const matchesClub = selectedClub === 'all' || event.clubId === selectedClub;

      // Category Pill filter
      let matchesCategory = true;
      if (selectedCategory !== 'all') {
        const textToMatch = `${event.title} ${event.description} ${event.tags ? event.tags.join(' ') : ''} ${event.clubId}`.toLowerCase();
        if (selectedCategory === 'tech') {
          matchesCategory = textToMatch.includes('code') || textToMatch.includes('hackathon') || textToMatch.includes('tech') || textToMatch.includes('iot') || textToMatch.includes('acm') || textToMatch.includes('ieee') || textToMatch.includes('iste');
        } else if (selectedCategory === 'cultural') {
          matchesCategory = textToMatch.includes('dance') || textToMatch.includes('drama') || textToMatch.includes('nukkad') || textToMatch.includes('cultural') || textToMatch.includes('stacatos') || textToMatch.includes('cut_c') || textToMatch.includes('vibin');
        } else if (selectedCategory === 'sports') {
          matchesCategory = textToMatch.includes('sport') || textToMatch.includes('cricket') || textToMatch.includes('football') || textToMatch.includes('arcs') || textToMatch.includes('tournament') || textToMatch.includes('league');
        } else if (selectedCategory === 'music') {
          matchesCategory = textToMatch.includes('music') || textToMatch.includes('acoustic') || textToMatch.includes('singing') || textToMatch.includes('euphony') || textToMatch.includes('jamming');
        } else if (selectedCategory === 'workshop') {
          matchesCategory = textToMatch.includes('workshop') || textToMatch.includes('seminar') || textToMatch.includes('training') || textToMatch.includes('lecture');
        }
      }

      // Date status tab
      let matchesTab = true;
      if (activeTab === 'live') {
        matchesTab = event.date === todayStr;
      } else if (activeTab === 'upcoming') {
        matchesTab = event.date > todayStr;
      }

      return matchesSearch && matchesClub && matchesCategory && matchesTab;
    });
  }, [events, searchQuery, selectedClub, selectedCategory, activeTab, todayStr]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedClub('all');
    setSelectedCategory('all');
    setActiveTab('all');
  };

  return (
    <div>
      {/* Light-Themed Hero Banner with Search & Category Pills */}
      <HeroSection
        eventsCount={stats.approvedCount}
        clubsCount={stats.clubsCount}
        registrationsCount={stats.registrationsCount}
        onBrowseClick={scrollToEvents}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {/* Explore by Event Type Category Showcase */}
      <ExploreCategories
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        events={events}
      />

      <section id="events-browse-section" className="section-container" style={{ paddingTop: '1.5rem' }}>
        <div className="info-hub-layout">
          


          {/* Search Filter Bar & Event Grid (Full Width) */}
          <main className="info-hub-main" style={{ width: '100%' }}>
            
            <div className="filter-bar-compact">
              <div className="search-input-wrapper" style={{ flexGrow: 2 }}>
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Filter events, keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="filter-select-wrapper" style={{ flexGrow: 1 }}>
                <select
                  className="filter-select"
                  style={{ width: '100%' }}
                  value={selectedClub}
                  onChange={(e) => setSelectedClub(e.target.value)}
                >
                  <option value="all">All Societies</option>
                  {clubs.map((club) => (
                    <option key={club.id} value={club.id}>
                      {club.logo} {club.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="tab-buttons">
                <button
                  className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveTab('all')}
                >
                  All Fests
                </button>
                <button
                  className={`tab-btn ${activeTab === 'live' ? 'active' : ''}`}
                  onClick={() => setActiveTab('live')}
                >
                  Live Today
                </button>
                <button
                  className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
                  onClick={() => setActiveTab('upcoming')}
                >
                  Upcoming
                </button>
              </div>
            </div>

            {/* Event Grid Cards */}
            {filteredEvents.length > 0 ? (
              <div className="events-grid">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onClick={() => onEventClick(event)}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state" style={{ marginTop: '0' }}>
                <span className="empty-state-icon">🔍</span>
                <h3>No events match criteria</h3>
                <p>Check spelling, reset filters, or browse all events of the week.</p>
                <button className="btn-secondary" onClick={handleResetFilters}>
                  View All Events
                </button>
              </div>
            )}
          </main>

        </div>

        {/* Participating Societies Showcase (IndiaCollegeFest Directory Style) */}
        {clubs && clubs.length > 0 && (
          <div className="societies-directory-section" style={{ marginTop: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-brand)' }}>
                Campus Directory
              </span>
              <h2 style={{ fontSize: '1.6rem', marginTop: '0.2rem', fontWeight: 700 }}>
                Participating Student Societies & Clubs
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '600px', margin: '0.4rem auto 0 auto' }}>
                Discover student chapters, sports teams, cultural clubs, and technical societies hosting events on EventSync.
              </p>
            </div>

            <div className="societies-grid">
              {clubs.map((club) => (
                <div key={club.id} className="society-card">
                  <div className="society-avatar-wrapper" style={{ borderColor: club.accentColor || 'var(--color-brand)' }}>
                    <span className="society-logo-emoji">{club.logo}</span>
                  </div>
                  <div className="society-card-content">
                    <h4 className="society-name">{club.name}</h4>
                    <p className="society-desc">{club.description}</p>
                    <div className="society-footer-meta">
                      <span className="society-members">
                        <Users size={13} /> {club.memberCount} Active Members
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

