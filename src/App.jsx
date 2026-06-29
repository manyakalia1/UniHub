import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import EventGrid from './components/EventGrid';
import EventDetailModal from './components/EventDetailModal';
import Login from './components/Login';
import ClubDashboard from './components/ClubDashboard';
import AdminDashboard from './components/AdminDashboard';
import { INITIAL_EVENTS, INITIAL_NOTICES, CLUBS } from './utils/mockData';

export default function App() {
  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('events');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notices, setNotices] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [theme, setTheme] = useState('light');

  // Load events from LocalStorage or seed default data
  useEffect(() => {
    let currentEvents = INITIAL_EVENTS;
    const savedEvents = localStorage.getItem('unihub_events_v7');
    if (savedEvents) {
      try {
        currentEvents = JSON.parse(savedEvents);
      } catch (e) {
        console.error('Failed to parse saved events:', e);
      }
    } else {
      localStorage.setItem('unihub_events_v7', JSON.stringify(INITIAL_EVENTS));
    }
    setEvents(currentEvents);

    let currentNotices = INITIAL_NOTICES;
    const savedNotices = localStorage.getItem('unihub_notices_v1');
    if (savedNotices) {
      try {
        currentNotices = JSON.parse(savedNotices);
      } catch (e) {
        console.error('Failed to parse saved notices:', e);
      }
    } else {
      localStorage.setItem('unihub_notices_v1', JSON.stringify(INITIAL_NOTICES));
    }
    setNotices(currentNotices);

    let currentClubs = CLUBS;
    const savedClubs = localStorage.getItem('unihub_clubs_v2');
    if (savedClubs) {
      try {
        currentClubs = JSON.parse(savedClubs);
      } catch (e) {
        console.error('Failed to parse saved clubs:', e);
      }
    } else {
      localStorage.setItem('unihub_clubs_v2', JSON.stringify(CLUBS));
    }
    setClubs(currentClubs);

    // Check for shared event parameter: ?event=event-id
    const params = new URLSearchParams(window.location.search);
    const sharedEventId = params.get('event');
    if (sharedEventId) {
      const foundEvent = currentEvents.find(e => e.id === sharedEventId && e.status === 'approved');
      if (foundEvent) {
        setSelectedEvent(foundEvent);
        setIsModalOpen(true);
      }
    }

    // Load active session if saved
    const savedUser = localStorage.getItem('unihub_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to restore session:', e);
      }
    }

    // Set theme on mount
    const savedTheme = localStorage.getItem('unihub_theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Synchronize state changes to localStorage
  const updateEventsState = (newEventsList) => {
    setEvents(newEventsList);
    localStorage.setItem('unihub_events_v7', JSON.stringify(newEventsList));
  };

  const updateNoticesState = (newNoticesList) => {
    setNotices(newNoticesList);
    localStorage.setItem('unihub_notices_v1', JSON.stringify(newNoticesList));
  };

  const handleToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('unihub_theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const handleUpdateClub = (updatedClub) => {
    const updatedClubsList = clubs.map(c => c.id === updatedClub.id ? updatedClub : c);
    setClubs(updatedClubsList);
    localStorage.setItem('unihub_clubs_v2', JSON.stringify(updatedClubsList));
  };

  const handleLogin = (userSession) => {
    setCurrentUser(userSession);
    localStorage.setItem('unihub_user', JSON.stringify(userSession));
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('unihub_user');
    setActiveTab('events');
  };

  const handleOpenDetailModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  // Student registers for an event
  const handleRegisterStudent = (eventId, studentData) => {
    const updatedEvents = events.map((event) => {
      if (event.id === eventId) {
        const registrants = event.registrants ? [...event.registrants] : [];
        // Check for duplicates
        const alreadyExists = registrants.some(r => r.roll.toLowerCase() === studentData.roll.toLowerCase());
        if (!alreadyExists) {
          registrants.push(studentData);
        }
        return { ...event, registrants };
      }
      return event;
    });
    updateEventsState(updatedEvents);
  };

  // Club adds a new event (pending approval)
  const handleAddEvent = (newEvent) => {
    const updatedEvents = [newEvent, ...events];
    updateEventsState(updatedEvents);
  };

  // Moderator approves an event
  const handleApproveEvent = (eventId) => {
    const updatedEvents = events.map((event) => {
      if (event.id === eventId) {
        return { ...event, status: 'approved' };
      }
      return event;
    });
    updateEventsState(updatedEvents);
  };

  // Remove/Delete/Reject event
  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter(e => e.id !== eventId);
    updateEventsState(updatedEvents);
  };

  // Stats for Hero Section (only active approved events count)
  const stats = React.useMemo(() => {
    const approvedEvents = events.filter(e => e.status === 'approved');
    let totalRegs = 0;
    events.forEach(e => {
      if (e.registrants) totalRegs += e.registrants.length;
    });
    // Active club count
    const uniqueClubs = new Set(events.map(e => e.clubId));

    return {
      approvedCount: approvedEvents.length,
      clubsCount: uniqueClubs.size || 5,
      registrationsCount: totalRegs
    };
  }, [events]);

  const scrollToEvents = () => {
    const section = document.getElementById('events-browse-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      <Header
        currentUser={currentUser}
        activeTab={activeTab}
        onNavigate={setActiveTab}
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="main-content">
        {activeTab === 'events' && (
          <EventGrid 
            events={events} 
            stats={stats}
            notices={notices}
            clubs={clubs}
            onEventClick={handleOpenDetailModal} 
          />
        )}

        {activeTab === 'login' && (
          <Login 
            onLogin={handleLogin} 
            onCancel={() => setActiveTab('events')} 
          />
        )}

        {activeTab === 'dashboard' && currentUser && (
          <div className="section-container">
            {currentUser.role === 'admin' ? (
              <AdminDashboard
                events={events}
                notices={notices}
                clubs={clubs}
                onApproveEvent={handleApproveEvent}
                onDeleteEvent={handleDeleteEvent}
                onUpdateNotices={updateNoticesState}
              />
            ) : (
              <ClubDashboard
                clubId={currentUser.clubId}
                events={events}
                clubs={clubs}
                onAddEvent={handleAddEvent}
                onDeleteEvent={handleDeleteEvent}
                onUpdateClub={handleUpdateClub}
              />
            )}
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="footer-logo">UniHub</div>
        <p>A unified campus activities coordination portal designed to keep students updated.</p>
        <p style={{ marginTop: '0.8rem', fontSize: '0.75rem' }}>&copy; {new Date().getFullYear()} UniHub College System. All rights reserved.</p>
      </footer>

      {/* Detail & Registration Modal */}
      <EventDetailModal
        event={selectedEvent}
        clubs={clubs}
        isOpen={isModalOpen}
        onClose={handleCloseDetailModal}
        onRegister={handleRegisterStudent}
      />
    </div>
  );
}
