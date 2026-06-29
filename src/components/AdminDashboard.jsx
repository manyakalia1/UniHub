import React, { useState, useMemo } from 'react';
import { Shield, Check, X, Calendar, Users, Activity, ListOrdered, Megaphone, Flame, Bell, Lightbulb, Award } from 'lucide-react';
import { CLUBS } from '../utils/mockData';

export default function AdminDashboard({ events, notices = [], onApproveEvent, onDeleteEvent, onUpdateNotices }) {
  const [activeSubTab, setActiveSubTab] = useState('moderation');
  const [newNotice, setNewNotice] = useState({
    text: '',
    type: 'bell',
    date: 'Today'
  });

  // Stats calculation
  const stats = useMemo(() => {
    const approved = events.filter(e => e.status === 'approved');
    const pending = events.filter(e => e.status === 'pending');
    let totalRegs = 0;
    events.forEach(e => {
      if (e.registrants) totalRegs += e.registrants.length;
    });

    return {
      totalApproved: approved.length,
      totalPending: pending.length,
      totalRegistrations: totalRegs,
      totalClubs: CLUBS.length
    };
  }, [events]);

  const pendingEvents = useMemo(() => {
    return events.filter(e => e.status === 'pending');
  }, [events]);

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-profile">
          <div className="profile-avatar">🛡️</div>
          <h3 className="profile-name">Uni Admin</h3>
          <span className="profile-role">Portal Moderator</span>
        </div>

        <nav>
          <ul className="dashboard-nav-list">
            <li>
              <button 
                className={`dashboard-nav-item ${activeSubTab === 'moderation' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('moderation')}
              >
                <Activity size={18} /> Moderation Queue ({pendingEvents.length})
              </button>
            </li>
            <li>
              <button 
                className={`dashboard-nav-item ${activeSubTab === 'broadcasts' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('broadcasts')}
              >
                <Megaphone size={18} /> Live Broadcasts ({notices.length})
              </button>
            </li>
            <li>
              <button 
                className={`dashboard-nav-item ${activeSubTab === 'clubs' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('clubs')}
              >
                <ListOrdered size={18} /> Registered Clubs ({CLUBS.length})
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Panel Content */}
      <main className="dashboard-main">
        {activeSubTab === 'moderation' && (
          <div>
            <div className="dashboard-header">
              <div>
                <h2>Moderation Queue</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Verify events requested by student clubs. Approved listings appear on the student event wall immediately.
                </p>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-card-icon" style={{ color: 'var(--accent-amber)' }}>
                  <Shield size={20} />
                </div>
                <div>
                  <div className="stat-card-val">{stats.totalPending}</div>
                  <div className="stat-card-lbl">Pending Review</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-card-icon" style={{ color: 'var(--color-brand)' }}>
                  <Calendar size={20} />
                </div>
                <div>
                  <div className="stat-card-val">{stats.totalApproved}</div>
                  <div className="stat-card-lbl font-heading">Approved Active</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-card-icon" style={{ color: 'var(--accent-green)' }}>
                  <Users size={20} />
                </div>
                <div>
                  <div className="stat-card-val">{stats.totalRegistrations}</div>
                  <div className="stat-card-lbl">Total Registrations</div>
                </div>
              </div>
            </div>

            {pendingEvents.length > 0 ? (
              <div className="table-responsive">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Club</th>
                      <th>Event Title</th>
                      <th>Scheduled Date</th>
                      <th>Venue</th>
                      <th>Eligibility Criteria</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingEvents.map(event => (
                      <tr key={event.id}>
                        <td style={{ fontWeight: 600, color: 'var(--color-brand)' }}>{event.clubName}</td>
                        <td style={{ fontWeight: 600 }}>{event.title}</td>
                        <td>{event.date} at {event.time}</td>
                        <td>{event.venue}</td>
                        <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} title={event.criteria}>
                          {event.criteria}
                        </td>
                        <td>
                          <div className="actions-cell">
                            <button
                              className="btn-icon-action approve"
                              title="Approve Event"
                              onClick={() => {
                                onApproveEvent(event.id);
                                alert(`"${event.title}" has been approved!`);
                              }}
                            >
                              <Check size={16} />
                            </button>
                            <button
                              className="btn-icon-action reject"
                              title="Reject & Delete"
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to reject and delete "${event.title}"?`)) {
                                  onDeleteEvent(event.id);
                                }
                              }}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state" style={{ padding: '3rem 1rem' }}>
                <span className="empty-state-icon">✅</span>
                <h3>No pending requests</h3>
                <p>All club events have been reviewed. The dashboard board is currently clear.</p>
              </div>
            )}
          </div>
        )}

        {activeSubTab === 'clubs' && (
          <div>
            <div className="dashboard-header">
              <div>
                <h2>Registered Clubs</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Profiles and metrics of registered student clubs on the UniHub platform.</p>
              </div>
            </div>

            <div className="table-responsive">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Club Name</th>
                    <th>About</th>
                    <th>Representative Account</th>
                    <th>Total Events Listed</th>
                  </tr>
                </thead>
                <tbody>
                  {CLUBS.map(club => {
                    const totalClubEvents = events.filter(e => e.clubId === club.id).length;
                    return (
                      <tr key={club.id}>
                        <td style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                          <span style={{ fontSize: '1.2rem' }}>{club.logo}</span>
                          <span>{club.name}</span>
                        </td>
                        <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '300px' }}>
                          {club.description}
                        </td>
                        <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                          {club.id} / {club.id}123
                        </td>
                        <td style={{ fontWeight: 600, textAlign: 'center' }}>
                          {totalClubEvents}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSubTab === 'broadcasts' && (
          <div>
            <div className="dashboard-header">
              <div>
                <h2>Live Broadcast Board</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Create campus-wide alerts or updates. Anything posted here is broadcasted instantly to the student notice wall.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
              {/* Form to Add Broadcast */}
              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                  <Megaphone size={18} style={{ color: 'var(--color-brand)' }} /> Post New Announcement
                </h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!newNotice.text.trim()) {
                    alert('Please enter announcement text.');
                    return;
                  }
                  const addedNotice = {
                    id: `notice-${Date.now()}`,
                    text: newNotice.text.trim(),
                    type: newNotice.type,
                    date: newNotice.date.trim() || 'Today'
                  };
                  onUpdateNotices([addedNotice, ...notices]);
                  setNewNotice({ text: '', type: 'bell', date: 'Today' });
                  alert('Announcement broadcasted successfully!');
                }}>
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Announcement Text *</label>
                    <textarea
                      className="form-input"
                      style={{ width: '100%', minHeight: '80px', resize: 'vertical', padding: '0.6rem', fontFamily: 'inherit' }}
                      placeholder="e.g. ACM Hackathon starts at 10 AM in CS Lab 1..."
                      required
                      value={newNotice.text}
                      onChange={(e) => setNewNotice({ ...newNotice, text: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Icon Theme / Vibe *</label>
                    <select
                      className="form-input"
                      style={{ width: '100%' }}
                      value={newNotice.type}
                      onChange={(e) => setNewNotice({ ...newNotice, type: e.target.value })}
                    >
                      <option value="bell">🔔 Bell (General Alert)</option>
                      <option value="flame">🔥 Flame (Urgent / Hot Event)</option>
                      <option value="lightbulb">💡 Lightbulb (Idea / Workshop)</option>
                      <option value="award">🏆 Award (Achievement / Result)</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label">Date Display Text *</label>
                    <input
                      type="text"
                      className="form-input"
                      style={{ width: '100%' }}
                      placeholder="e.g. Today, June 29, Live"
                      required
                      value={newNotice.date}
                      onChange={(e) => setNewNotice({ ...newNotice, date: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Broadcast Announcement
                  </button>
                </form>
              </div>

              {/* Active Broadcasts List */}
              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Active Broadcasts ({notices.length})</h3>
                {notices.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {notices.map((notice) => (
                      <div key={notice.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '0.8rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-primary)' }}>
                        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                          <span style={{ fontSize: '1.2rem', marginTop: '0.1rem', display: 'inline-flex', alignSelf: 'center' }}>
                            {notice.type === 'flame' && <Flame size={16} className="text-pink" />}
                            {notice.type === 'bell' && <Bell size={16} className="text-blue" />}
                            {notice.type === 'lightbulb' && <Lightbulb size={16} className="text-amber" />}
                            {notice.type === 'award' && <Award size={16} className="text-green" />}
                          </span>
                          <div>
                            <p style={{ fontSize: '0.85rem', fontWeight: 500, lineHeight: 1.4, color: 'var(--text-primary)' }}>{notice.text}</p>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{notice.date}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this announcement?')) {
                              const updated = notices.filter(n => n.id !== notice.id);
                              onUpdateNotices(updated);
                            }
                          }}
                          className="btn-icon-action reject"
                          style={{ padding: '0.3rem', width: '28px', height: '28px', minWidth: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-0.2rem' }}
                          title="Delete Broadcast"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
                    <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📢</p>
                    <p style={{ fontSize: '0.85rem' }}>No announcements broadcasted yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
