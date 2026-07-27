import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import EventGrid from './components/EventGrid';
import EventDetailModal from './components/EventDetailModal';
import Login from './components/Login';
import ClubDashboard from './components/ClubDashboard';
import AdminDashboard from './components/AdminDashboard';
import AboutUs from './components/AboutUs';
import MottoSection from './components/MottoSection';
import DeviceSimulator from './components/DeviceSimulator';
import GenZLiveToast from './components/GenZLiveToast';
import { INITIAL_EVENTS, INITIAL_NOTICES, CLUBS, CREDENTIALS } from './utils/mockData';

export default function App() {
  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('events');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notices, setNotices] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [theme, setTheme] = useState('light');
  const [credentials, setCredentials] = useState({});
  const [clubRequests, setClubRequests] = useState([]);

  // Load events from LocalStorage or seed default data
  useEffect(() => {
    let currentEvents = INITIAL_EVENTS;
    const savedEvents = localStorage.getItem('eventsync_events_v8');
    if (savedEvents) {
      try {
        currentEvents = JSON.parse(savedEvents);
      } catch (e) {
        console.error('Failed to parse saved events:', e);
      }
    } else {
      localStorage.setItem('eventsync_events_v8', JSON.stringify(INITIAL_EVENTS));
    }
    setEvents(currentEvents);

    let currentNotices = INITIAL_NOTICES;
    const savedNotices = localStorage.getItem('eventsync_notices_v2');
    if (savedNotices) {
      try {
        currentNotices = JSON.parse(savedNotices);
      } catch (e) {
        console.error('Failed to parse saved notices:', e);
      }
    } else {
      localStorage.setItem('eventsync_notices_v2', JSON.stringify(INITIAL_NOTICES));
    }
    setNotices(currentNotices);

    let currentClubs = CLUBS;
    const savedClubs = localStorage.getItem('eventsync_clubs_v3');
    if (savedClubs) {
      try {
        currentClubs = JSON.parse(savedClubs);
      } catch (e) {
        console.error('Failed to parse saved clubs:', e);
      }
    } else {
      localStorage.setItem('eventsync_clubs_v3', JSON.stringify(CLUBS));
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

    // Load credentials
    let currentCreds = CREDENTIALS;
    const savedCreds = localStorage.getItem('eventsync_credentials_v2');
    if (savedCreds) {
      try {
        currentCreds = JSON.parse(savedCreds);
      } catch (e) {
        console.error('Failed to parse saved credentials:', e);
      }
    } else {
      localStorage.setItem('eventsync_credentials_v2', JSON.stringify(CREDENTIALS));
    }
    setCredentials(currentCreds);

    // Load club requests
    let currentRequests = [];
    const savedRequests = localStorage.getItem('eventsync_club_requests');
    if (savedRequests) {
      try {
        currentRequests = JSON.parse(savedRequests);
      } catch (e) {
        console.error('Failed to parse saved club requests:', e);
      }
    }
    setClubRequests(currentRequests);

    // Load active session if saved
    const savedUser = localStorage.getItem('eventsync_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to restore session:', e);
      }
    }

    // Set theme on mount
    const savedTheme = localStorage.getItem('eventsync_theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Synchronize state changes to localStorage
  const updateEventsState = (newEventsList) => {
    setEvents(newEventsList);
    localStorage.setItem('eventsync_events_v8', JSON.stringify(newEventsList));
  };

  const updateNoticesState = (newNoticesList) => {
    setNotices(newNoticesList);
    localStorage.setItem('eventsync_notices_v2', JSON.stringify(newNoticesList));
  };

  const handleToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('eventsync_theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const handleUpdateClub = (updatedClub) => {
    const updatedClubsList = clubs.map(c => c.id === updatedClub.id ? updatedClub : c);
    setClubs(updatedClubsList);
    localStorage.setItem('eventsync_clubs_v3', JSON.stringify(updatedClubsList));
  };

  const handleRegisterRequest = (newRequest) => {
    const updatedRequests = [...clubRequests, newRequest];
    setClubRequests(updatedRequests);
    localStorage.setItem('eventsync_club_requests', JSON.stringify(updatedRequests));
  };

  const handleApproveClubRegistration = (requestId) => {
    const request = clubRequests.find(r => r.id === requestId);
    if (!request) return;

    // Create the new club
    const newClub = {
      id: request.clubId,
      name: request.name,
      logo: request.logo || '🏫',
      description: request.description || 'No description provided yet.',
      memberCount: 1,
      accentColor: request.accentColor || '#6366f1',
      banner: request.banner || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
      coreTeam: [
        { name: request.representativeName, role: 'Founder & Representative' }
      ]
    };

    // Create login credentials
    const newCreds = {
      ...credentials,
      [request.clubId.toLowerCase()]: {
        role: 'club',
        clubId: request.clubId,
        password: request.password,
        name: `${request.name} Rep`
      }
    };

    // Update clubs list
    const updatedClubsList = [...clubs, newClub];
    setClubs(updatedClubsList);
    localStorage.setItem('eventsync_clubs_v3', JSON.stringify(updatedClubsList));

    // Update credentials
    setCredentials(newCreds);
    localStorage.setItem('eventsync_credentials_v2', JSON.stringify(newCreds));

    // Remove request from pending list
    const updatedRequests = clubRequests.filter(r => r.id !== requestId);
    setClubRequests(updatedRequests);
    localStorage.setItem('eventsync_club_requests', JSON.stringify(updatedRequests));
  };

  const handleRejectClubRegistration = (requestId) => {
    const updatedRequests = clubRequests.filter(r => r.id !== requestId);
    setClubRequests(updatedRequests);
    localStorage.setItem('eventsync_club_requests', JSON.stringify(updatedRequests));
  };

  const handleLogin = (userSession) => {
    setCurrentUser(userSession);
    localStorage.setItem('eventsync_user', JSON.stringify(userSession));
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('eventsync_user');
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

        {activeTab === 'about' && (
          <AboutUs onNavigate={setActiveTab} />
        )}

        {activeTab === 'motto' && (
          <MottoSection onNavigate={setActiveTab} />
        )}

        {activeTab === 'simulator' && (
          <DeviceSimulator 
            events={events} 
            stats={stats} 
            notices={notices} 
            clubs={clubs} 
            onEventClick={handleOpenDetailModal} 
            theme={theme}
          />
        )}

        {activeTab === 'login' && (
          <Login 
            onLogin={handleLogin} 
            onCancel={() => setActiveTab('events')} 
            credentials={credentials}
            onRegisterRequest={handleRegisterRequest}
            clubs={clubs}
            clubRequests={clubRequests}
          />
        )}

        {activeTab === 'dashboard' && currentUser && (
          <div className="section-container">
            {currentUser.role === 'admin' ? (
              <AdminDashboard
                events={events}
                notices={notices}
                clubs={clubs}
                clubRequests={clubRequests}
                onApproveEvent={handleApproveEvent}
                onDeleteEvent={handleDeleteEvent}
                onUpdateNotices={updateNoticesState}
                onApproveClubRegistration={handleApproveClubRegistration}
                onRejectClubRegistration={handleRejectClubRegistration}
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
        <div className="footer-logo">EventSync</div>
        <p>A flagship campus activities coordination portal operated under <strong>RM Enterprises</strong>. Founded by <strong>Manya Kalia</strong>.</p>
        <p style={{ marginTop: '0.8rem', fontSize: '0.75rem', opacity: 0.8 }}>
          &copy; {new Date().getFullYear()} EventSync &bull; An RM Enterprises Venture. All rights reserved.
        </p>
      </footer>

      {/* Naughty Gen-Z Live Campus Events Toast Notification */}
      <GenZLiveToast onEventSelect={handleOpenDetailModal} />

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
