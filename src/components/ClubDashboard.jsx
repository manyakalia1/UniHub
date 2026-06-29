import React, { useState, useMemo } from 'react';
import { PlusCircle, FileText, Users, Trash2, Calendar, FileSpreadsheet, Send, Info, Settings, Plus } from 'lucide-react';

export default function ClubDashboard({ clubId, events, clubs = [], onAddEvent, onDeleteEvent, onUpdateClub }) {
  const [activeSubTab, setActiveSubTab] = useState('manage');
  
  // Event Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '',
    venue: '',
    criteria: '',
    tags: '',
    poster: '',
    registrationType: 'internal',
    registrationLink: '',
    responsesLink: ''
  });

  const club = useMemo(() => clubs.find(c => c.id === clubId), [clubs, clubId]);

  // Profile Editor States
  const [profileName, setProfileName] = useState(club?.name || '');
  const [profileLogo, setProfileLogo] = useState(club?.logo || '');
  const [profileBanner, setProfileBanner] = useState(club?.banner || '');
  const [profileDesc, setProfileDesc] = useState(club?.description || '');
  const [coreTeam, setCoreTeam] = useState(club?.coreTeam || []);
  const [newMember, setNewMember] = useState({ name: '', role: '' });

  React.useEffect(() => {
    if (club) {
      setProfileName(club.name);
      setProfileLogo(club.logo);
      setProfileBanner(club.banner || '');
      setProfileDesc(club.description);
      setCoreTeam(club.coreTeam || []);
    }
  }, [club]);

  // Filter events belonging to this club
  const clubEvents = useMemo(() => {
    return events.filter(e => e.clubId === clubId);
  }, [events, clubId]);

  // Filter external events belonging to this club (e.g. Google Forms)
  const clubExternalEvents = useMemo(() => {
    return clubEvents.filter(e => e.registrationType === 'external');
  }, [clubEvents]);

  // Aggregate all registrants for events of this club
  const clubRegistrants = useMemo(() => {
    const list = [];
    clubEvents.forEach(event => {
      if (event.registrants && event.registrants.length > 0) {
        event.registrants.forEach(reg => {
          list.push({
            ...reg,
            eventTitle: event.title,
            eventId: event.id
          });
        });
      }
    });
    return list;
  }, [clubEvents]);

  // Preset Poster templates
  const PRESET_POSTERS = [
    { name: 'Coding/Tech', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80' },
    { name: 'Music/Art', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80' },
    { name: 'Seminar/Business', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80' },
    { name: 'Hardware/IoT', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80' },
    { name: 'Sports/Games', url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time || !formData.duration || !formData.venue) {
      alert('Please fill out all mandatory fields.');
      return;
    }

    const newEvent = {
      id: `event-${Date.now()}`,
      title: formData.title,
      clubId: club.id,
      clubName: club.name,
      description: formData.description || 'No description provided.',
      date: formData.date,
      time: formData.time,
      duration: formData.duration,
      venue: formData.venue,
      criteria: formData.criteria || 'Open to all students.',
      registrationType: formData.registrationType,
      registrationLink: formData.registrationType === 'external' ? formData.registrationLink : '',
      responsesLink: formData.registrationType === 'external' ? formData.responsesLink : '',
      status: 'pending', // Submits to Admin for review
      featured: false,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : ['Event'],
      poster: formData.poster || PRESET_POSTERS[0].url,
      registrants: []
    };

    onAddEvent(newEvent);
    alert('Event submitted! It has been sent to the University Admin for verification.');
    
    // Reset Form
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      duration: '',
      venue: '',
      criteria: '',
      tags: '',
      poster: '',
      registrationType: 'internal',
      registrationLink: '',
      responsesLink: ''
    });
    setActiveSubTab('manage');
  };

  const handleExportCSV = () => {
    if (clubRegistrants.length === 0) {
      alert('No registrations available to export.');
      return;
    }

    // Create CSV content
    const headers = ['Student Name', 'Roll Number', 'Branch', 'Year', 'Email', 'Phone', 'Registered Event'];
    const rows = clubRegistrants.map(r => [
      r.name,
      r.roll,
      r.branch,
      r.year,
      r.email,
      r.phone,
      `"${r.eventTitle.replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${clubId}_registrations_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-profile">
          <div className="profile-avatar">{club.logo}</div>
          <h3 className="profile-name">{club.name}</h3>
          <span className="profile-role">Club Representative</span>
        </div>

        <nav>
          <ul className="dashboard-nav-list">
            <li>
              <button 
                className={`dashboard-nav-item ${activeSubTab === 'manage' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('manage')}
              >
                <FileText size={18} /> Manage Events ({clubEvents.length})
              </button>
            </li>
            <li>
              <button 
                className={`dashboard-nav-item ${activeSubTab === 'add' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('add')}
              >
                <PlusCircle size={18} /> Publish Event
              </button>
            </li>
            <li>
              <button 
                className={`dashboard-nav-item ${activeSubTab === 'registrants' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('registrants')}
              >
                <Users size={18} /> Registrations ({clubRegistrants.length})
              </button>
            </li>
            <li>
              <button 
                className={`dashboard-nav-item ${activeSubTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('profile')}
              >
                <Settings size={18} /> Club Profile Settings
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Panel Content */}
      <main className="dashboard-main">
        {activeSubTab === 'manage' && (
          <div>
            <div className="dashboard-header">
              <div>
                <h2>Your Published Events</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Review approval states, registration counts, or remove active listings.</p>
              </div>
              <button className="btn-primary" onClick={() => setActiveSubTab('add')}>
                <PlusCircle size={16} /> New Event
              </button>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-card-icon">
                  <Calendar size={20} />
                </div>
                <div>
                  <div className="stat-card-val">{clubEvents.length}</div>
                  <div className="stat-card-lbl">Total Events</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-card-icon" style={{ color: 'var(--accent-green)' }}>
                  <Users size={20} />
                </div>
                <div>
                  <div className="stat-card-val">{clubRegistrants.length}</div>
                  <div className="stat-card-lbl">Total Signups</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-card-icon" style={{ color: 'var(--accent-amber)' }}>
                  <Info size={20} />
                </div>
                <div>
                  <div className="stat-card-val">
                    {clubEvents.filter(e => e.status === 'pending').length}
                  </div>
                  <div className="stat-card-lbl">Pending Review</div>
                </div>
              </div>
            </div>

            {clubEvents.length > 0 ? (
              <div className="table-responsive">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Event Title</th>
                      <th>Date</th>
                      <th>Venue</th>
                      <th>Status</th>
                      <th>Signups</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clubEvents.map(event => (
                      <tr key={event.id}>
                        <td style={{ fontWeight: 600 }}>{event.title}</td>
                        <td>{event.date}</td>
                        <td>{event.venue}</td>
                        <td>
                          <span className={`badge-status ${event.status}`}>
                            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center', fontWeight: 600 }}>{event.registrants ? event.registrants.length : 0}</td>
                        <td>
                          <div className="actions-cell">
                            <button 
                              className="btn-icon-action reject"
                              title="Delete Event"
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
                                  onDeleteEvent(event.id);
                                }
                              }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state" style={{ padding: '2.5rem 1rem' }}>
                <span className="empty-state-icon">🗓️</span>
                <h3>No events found</h3>
                <p>You haven't scheduled any weekly events yet. Create one now!</p>
                <button className="btn-primary" onClick={() => setActiveSubTab('add')}>Create Event</button>
              </div>
            )}
          </div>
        )}

        {activeSubTab === 'add' && (
          <div>
            <div className="dashboard-header">
              <div>
                <h2>Publish a New Weekly Event</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Fill out the form below. Once approved, the event will instantly appear on the student bulletin.</p>
              </div>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="form-label">Event Title *</label>
                <input
                  type="text"
                  name="title"
                  className="form-input"
                  required
                  placeholder="e.g. CodeSprint 2026 Hackathon"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Full Description *</label>
                <textarea
                  name="description"
                  className="form-textarea"
                  required
                  placeholder="Explain what the event is about, what participants will do, rewards, etc..."
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label className="form-label">Date *</label>
                  <input
                    type="date"
                    name="date"
                    className="form-input"
                    required
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Start Time *</label>
                  <input
                    type="time"
                    name="time"
                    className="form-input"
                    required
                    value={formData.time}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label className="form-label">Duration *</label>
                  <input
                    type="text"
                    name="duration"
                    className="form-input"
                    required
                    placeholder="e.g. 3 Hours / 2 Days"
                    value={formData.duration}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Venue *</label>
                  <input
                    type="text"
                    name="venue"
                    className="form-input"
                    required
                    placeholder="e.g. Seminar Hall Block C / Online"
                    value={formData.venue}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Eligibility / Registration Criteria *</label>
                <input
                  type="text"
                  name="criteria"
                  className="form-input"
                  required
                  placeholder="e.g. Open to B.Tech/BCA students, Laptop required"
                  value={formData.criteria}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label className="form-label">Tags (comma-separated)</label>
                  <input
                    type="text"
                    name="tags"
                    className="form-input"
                    placeholder="e.g. Workshop, IoT, Tech, Music"
                    value={formData.tags}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Event Poster URL (Leave empty for preset)</label>
                  <input
                    type="url"
                    name="poster"
                    className="form-input"
                    placeholder="https://example.com/poster.jpg"
                    value={formData.poster}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Preset Selectors */}
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <span className="form-label" style={{ marginBottom: '0.6rem' }}>Or choose a theme-based poster preset:</span>
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                  {PRESET_POSTERS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`btn-card-action ${formData.poster === p.url ? 'active' : ''}`}
                      style={{ 
                        border: formData.poster === p.url ? '2px solid var(--color-brand)' : '1px solid var(--border-color)',
                        padding: '0.4rem 0.8rem',
                        fontSize: '0.8rem',
                        backgroundColor: formData.poster === p.url ? 'var(--color-brand-light)' : 'var(--bg-secondary)'
                      }}
                      onClick={() => setFormData(prev => ({ ...prev, poster: p.url }))}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Registration Options */}
              <div className="form-group-row" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.2rem', marginTop: '1.2rem' }}>
                <div className="form-group">
                  <label className="form-label">Registration Gateway *</label>
                  <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="registrationType"
                        value="internal"
                        checked={formData.registrationType === 'internal'}
                        onChange={handleInputChange}
                      />
                      On-site (UniHub Form)
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="registrationType"
                        value="external"
                        checked={formData.registrationType === 'external'}
                        onChange={handleInputChange}
                      />
                      External Link (Google Forms)
                    </label>
                  </div>
                </div>

                {formData.registrationType === 'external' && (
                  <div className="form-group-row">
                    <div className="form-group">
                      <label className="form-label">External Registration URL *</label>
                      <input
                        type="url"
                        name="registrationLink"
                        className="form-input"
                        required
                        placeholder="https://forms.gle/..."
                        value={formData.registrationLink}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Google Sheet Responses URL (Optional)</label>
                      <input
                        type="url"
                        name="responsesLink"
                        className="form-input"
                        placeholder="https://docs.google.com/spreadsheets/d/..."
                        value={formData.responsesLink}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setActiveSubTab('manage')}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Submit Event For Approval <Send size={15} />
                </button>
              </div>
            </form>
          </div>
        )}

        {activeSubTab === 'registrants' && (
          <div>
            <div className="dashboard-header">
              <div>
                <h2>Student Registrations</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Real-time database of students who signed up for your events.</p>
              </div>
              {clubRegistrants.length > 0 && (
                <button className="btn-primary" onClick={handleExportCSV}>
                  <FileSpreadsheet size={16} /> Export CSV List
                </button>
              )}
            </div>

            {/* On-Site Registrations Section */}
            <h3 className="modal-section-title" style={{ fontSize: '1.05rem', margin: '1rem 0 0.8rem 0' }}>On-Site Registrations</h3>
            {clubRegistrants.length > 0 ? (
              <>
                <div className="table-responsive">
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th>Student Name</th>
                        <th>Roll Number</th>
                        <th>Branch</th>
                        <th>Year</th>
                        <th>Contact Number</th>
                        <th>Registered Event</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clubRegistrants.map((reg, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 600 }}>{reg.name}</td>
                          <td>{reg.roll}</td>
                          <td>{reg.branch}</td>
                          <td>{reg.year}</td>
                          <td>{reg.phone}</td>
                          <td style={{ color: 'var(--color-brand)', fontWeight: 500 }}>{reg.eventTitle}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                  Showing {clubRegistrants.length} total signups across all active events.
                </p>
              </>
            ) : (
              <div className="empty-state" style={{ padding: '2rem 1rem', marginBottom: '2rem' }}>
                <span className="empty-state-icon">👥</span>
                <h3>No on-site registrations yet</h3>
                <p>No students have registered through the portal form for your on-site events.</p>
              </div>
            )}

            {/* Google Forms / Sheets Section */}
            {clubExternalEvents.length > 0 && (
              <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                <h3 className="modal-section-title" style={{ fontSize: '1.05rem', margin: '0 0 0.8rem 0' }}>Google Forms & Sheets Tracker</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  The following events collect registrations externally. Click to open your Google Sheets databases.
                </p>
                <div className="table-responsive">
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th>Event Title</th>
                        <th>Google Form Link</th>
                        <th>Responses Spreadsheet</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clubExternalEvents.map((event) => (
                        <tr key={event.id}>
                          <td style={{ fontWeight: 600 }}>{event.title}</td>
                          <td>
                            <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-brand)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', fontWeight: 600 }}>
                              Form Link ↗
                            </a>
                          </td>
                          <td>
                            {event.responsesLink ? (
                              <a href={event.responsesLink} target="_blank" rel="noopener noreferrer" className="btn-card-action" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none', padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>
                                View Sheets Responses ↗
                              </a>
                            ) : (
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                No sheets responses link linked
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeSubTab === 'profile' && (
          <div>
            <div className="dashboard-header">
              <div>
                <h2>Edit Club Profile</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Update your club name, description, logo, and banner. These changes are broadcasted immediately across the UniHub platform.
                </p>
              </div>
            </div>

            {/* LIVE PREVIEW BOX */}
            <div style={{ 
              borderRadius: 'var(--radius-lg)', 
              overflow: 'hidden', 
              border: '1px solid var(--border-color)', 
              marginBottom: '2rem', 
              boxShadow: 'var(--shadow-md)',
              backgroundColor: 'var(--bg-secondary)'
            }}>
              {/* Banner Preview */}
              <div style={{ 
                height: '160px', 
                width: '100%', 
                background: profileBanner ? `url(${profileBanner}) center/cover no-repeat` : 'linear-gradient(135deg, var(--color-brand-light), var(--bg-tertiary))',
                position: 'relative'
              }}>
                {/* Logo Preview */}
                <div style={{ 
                  position: 'absolute', 
                  bottom: '-25px', 
                  left: '30px', 
                  width: '70px', 
                  height: '70px', 
                  borderRadius: 'var(--radius-md)', 
                  backgroundColor: 'var(--bg-secondary)', 
                  border: '3px solid var(--bg-secondary)',
                  boxShadow: 'var(--shadow-md)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '2rem',
                  overflow: 'hidden'
                }}>
                  {profileLogo.startsWith('http') ? (
                    <img src={profileLogo} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    profileLogo || 'ℹ️'
                  )}
                </div>
              </div>
              
              <div style={{ padding: '2rem 2rem 1.5rem 2rem' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.3rem', marginTop: '0.5rem' }}>
                  {profileName || 'Your Club Name'}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4', maxWidth: '800px' }}>
                  {profileDesc || 'Provide a compelling description of your society...'}
                </p>
              </div>
            </div>

            {/* FORM AND CORE TEAM SPLIT GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              
              {/* Left Column: Basic Details Form */}
              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                  <Settings size={18} style={{ color: 'var(--color-brand)' }} /> Club Details
                </h3>
                
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Club Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    placeholder="e.g. ACM Student Chapter"
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label">About / Description *</label>
                  <textarea
                    className="form-textarea"
                    style={{ minHeight: '100px' }}
                    value={profileDesc}
                    onChange={(e) => setProfileDesc(e.target.value)}
                    placeholder="Write details about your society's purpose, events, recruitments..."
                    required
                  />
                </div>

                <div className="form-group-row">
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Logo Emoji or URL *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={profileLogo}
                      onChange={(e) => setProfileLogo(e.target.value)}
                      placeholder="e.g. 💻 or https://..."
                      required
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Banner Image URL</label>
                    <input
                      type="url"
                      className="form-input"
                      value={profileBanner}
                      onChange={(e) => setProfileBanner(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                </div>

                <button 
                  type="button" 
                  className="btn-primary" 
                  style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
                  onClick={() => {
                    if (!profileName.trim() || !profileDesc.trim() || !profileLogo.trim()) {
                      alert('Please fill out all mandatory fields.');
                      return;
                    }
                    onUpdateClub({
                      ...club,
                      name: profileName.trim(),
                      logo: profileLogo.trim(),
                      banner: profileBanner.trim(),
                      description: profileDesc.trim(),
                      coreTeam: coreTeam
                    });
                    alert('Club Profile saved successfully! Changes are updated.');
                  }}
                >
                  Save Profile Settings
                </button>
              </div>

              {/* Right Column: Core Team Manager */}
              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                  <Users size={18} style={{ color: 'var(--color-brand)' }} /> Core Team Members
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>
                  List the lead roles (President, Secretary, Technical head, etc.) of your society.
                </p>

                {/* Core Members List */}
                {coreTeam.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem', maxHeight: '220px', overflowY: 'auto', paddingRight: '0.3rem' }}>
                    {coreTeam.map((member, idx) => (
                      <div key={idx} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '0.6rem 0.8rem', 
                        border: '1px solid var(--border-color)', 
                        borderRadius: 'var(--radius-md)', 
                        backgroundColor: 'var(--bg-primary)' 
                      }}>
                        <div>
                          <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{member.name}</p>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{member.role}</p>
                        </div>
                        <button
                          type="button"
                          className="btn-icon-action reject"
                          style={{ width: '26px', height: '26px', minWidth: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          onClick={() => {
                            const updatedTeam = coreTeam.filter((_, i) => i !== idx);
                            setCoreTeam(updatedTeam);
                          }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '1.5rem 0', color: 'var(--text-muted)', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                    <p style={{ fontSize: '0.8rem' }}>No core team members listed.</p>
                  </div>
                )}

                {/* Add Member Form */}
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '0.8rem', fontWeight: 600 }}>Add New Core Member</h4>
                  <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                      <input
                        type="text"
                        placeholder="Name (e.g. Kunal)"
                        className="form-input"
                        style={{ flex: 1, fontSize: '0.85rem', padding: '0.45rem 0.7rem' }}
                        value={newMember.name}
                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="Role (e.g. President)"
                        className="form-input"
                        style={{ flex: 1, fontSize: '0.85rem', padding: '0.45rem 0.7rem' }}
                        value={newMember.role}
                        onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn-secondary"
                      style={{ padding: '0.45rem', fontSize: '0.8rem', justifyContent: 'center', display: 'flex', gap: '0.3rem', fontWeight: 600 }}
                      onClick={() => {
                        if (!newMember.name.trim() || !newMember.role.trim()) {
                          alert('Please enter both Name and Role.');
                          return;
                        }
                        setCoreTeam([...coreTeam, { name: newMember.name.trim(), role: newMember.role.trim() }]);
                        setNewMember({ name: '', role: '' });
                      }}
                    >
                      <Plus size={14} /> Add Member
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
