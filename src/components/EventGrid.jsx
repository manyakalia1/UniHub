import React, { useState, useMemo } from 'react';
import EventCard from './EventCard';
// CLUBS import removed, using clubs prop instead
import { Search, Calendar, Megaphone, Bell, Flame, Award, Lightbulb, Compass } from 'lucide-react';

const getNoticeIcon = (type) => {
  switch (type) {
    case 'flame':
      return <Flame size={16} className="text-pink" />;
    case 'bell':
      return <Bell size={16} className="text-blue" />;
    case 'lightbulb':
      return <Lightbulb size={16} className="text-amber" />;
    case 'award':
      return <Award size={16} className="text-green" />;
    default:
      return <Megaphone size={16} style={{ color: 'var(--color-brand)' }} />;
  }
};

export default function EventGrid({ events, stats, notices = [], clubs = [], onEventClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClub, setSelectedClub] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  // Get today's date dynamically in YYYY-MM-DD format
  const todayStr = useMemo(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }, []);



  // Filter events based on criteria
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // 1. Only show approved events to students
      if (event.status !== 'approved') return false;

      // 2. Search query match (title, desc, tags, clubName)
      const matchesSearch = 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.tags && event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        event.clubName.toLowerCase().includes(searchQuery.toLowerCase());

      // 3. Club filter
      const matchesClub = selectedClub === 'all' || event.clubId === selectedClub;

      // 4. Tab filter (All, Live Today, Upcoming)
      let matchesTab = true;
      if (activeTab === 'live') {
        matchesTab = event.date === todayStr;
      } else if (activeTab === 'upcoming') {
        matchesTab = event.date > todayStr;
      }

      return matchesSearch && matchesClub && matchesTab;
    });
  }, [events, searchQuery, selectedClub, activeTab, todayStr]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedClub('all');
    setActiveTab('all');
  };



  return (
    <section className="section-container" style={{ paddingTop: '1.5rem' }}>
      <div className="info-hub-layout">
        
        {/* LEFT COLUMN: Sidebar Notice Board (Desktop only - Hidden on Mobile) */}
        <aside className="info-hub-sidebar">
          {/* Section 1: Campus Stats */}
          <div className="sidebar-section-card stats">
            <h3 className="sidebar-section-title">
              <Compass size={16} /> Campus Stats
            </h3>
            <div className="compact-stats-list">
              <div className="compact-stat-row">
                <span className="compact-stat-lbl">Active Events</span>
                <span className="compact-stat-val">{stats.approvedCount}</span>
              </div>
              <div className="compact-stat-row">
                <span className="compact-stat-lbl">Active Societies</span>
                <span className="compact-stat-val">{stats.clubsCount}</span>
              </div>
              <div className="compact-stat-row">
                <span className="compact-stat-lbl">Seat Reservations</span>
                <span className="compact-stat-val">{stats.registrationsCount}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Announcements Bulletin */}
          <div className="sidebar-section-card notice-board">
            <h3 className="sidebar-section-title">
              <Megaphone size={16} /> Notice Board & Updates
            </h3>
            <div className="notices-list">
              {notices.length > 0 ? (
                notices.map((notice) => (
                  <div key={notice.id} className="notice-item">
                    <div className="notice-icon-circle">
                      {getNoticeIcon(notice.type)}
                    </div>
                    <div className="notice-body">
                      <p className="notice-text">{notice.text}</p>
                      <span className="notice-date">{notice.date}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem 0' }}>
                  No recent announcements.
                </p>
              )}
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: Search, Filters, Tab Selectors & Live Events */}
        <main className="info-hub-main">
          
          {/* Consolidated Search, Filter & Tabs bar */}
          <div className="filter-bar-compact">
            <div className="search-input-wrapper" style={{ flexGrow: 2 }}>
              <Search size={16} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search events, skills..."
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
                All Board
              </button>
              <button
                className={`tab-btn ${activeTab === 'live' ? 'active' : ''}`}
                onClick={() => setActiveTab('live')}
              >
                Live
              </button>
              <button
                className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming
              </button>
            </div>
          </div>


          {/* Grid Display */}
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
    </section>
  );
}
