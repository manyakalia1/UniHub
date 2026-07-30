import React from 'react';
import { X, Ticket, Calendar, MapPin, Download, CheckCircle, ExternalLink } from 'lucide-react';
import { exportEventToPDF } from '../utils/pdfGenerator';

export default function MyPassesModal({ isOpen, onClose, events = [], clubs = [], onSelectEvent }) {
  if (!isOpen) return null;

  // Retrieve user's claimed tickets from localStorage or events registrants
  const getMyTickets = () => {
    try {
      const savedTickets = localStorage.getItem('eventsync_my_tickets');
      if (savedTickets) {
        return JSON.parse(savedTickets);
      }
    } catch (e) {
      console.error('Failed to load my tickets:', e);
    }
    
    // Fallback: check events registrants
    const claimed = [];
    events.forEach(event => {
      if (event.registrants && event.registrants.length > 0) {
        event.registrants.forEach(reg => {
          claimed.push({
            ticketCode: `TKT-${String(event.id || 'EVT').slice(0, 4).toUpperCase()}-${reg.roll ? reg.roll.slice(-4) : '2026'}`,
            event,
            studentName: reg.name,
            rollNo: reg.roll,
            branch: reg.branch,
            year: reg.year
          });
        });
      }
    });
    return claimed;
  };

  const myTickets = getMyTickets();

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '800px', width: '92%' }} onClick={(e) => e.stopPropagation()}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'var(--color-brand-light)', color: 'var(--color-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ticket size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                My Digital Event Passes & Tickets
              </h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
                {myTickets.length} active fest passes claimed on EventSync
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} style={{ position: 'relative', top: 'auto', right: 'auto' }}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {myTickets.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎟️</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>No Event Passes Claimed Yet</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '400px', margin: '0.5rem auto 1.5rem auto' }}>
                Browse upcoming campus hackathons, cultural battles, and music nights to claim your free student pass!
              </p>
              <button className="btn-primary" onClick={onClose}>
                Browse Active Fests
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {myTickets.map((tkt, idx) => {
                const clubInfo = clubs.find(c => c.id === tkt.event.clubId);
                return (
                  <div key={idx} className="ticket-card-wrapper">
                    <div className="ticket-card-inner">
                      
                      {/* Left Stub */}
                      <div className="ticket-stub">
                        <div className="ticket-badge-pill" style={{ background: (!tkt.event.price || tkt.event.price === 0 || tkt.event.price === 'Free') ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ec4899, #8b5cf6)' }}>
                          {(!tkt.event.price || tkt.event.price === 0 || tkt.event.price === 'Free') ? 'FREE PASS' : `₹${tkt.event.price} PASS`}
                        </div>
                        <div className="ticket-qr-box">
                          <div className="barcode-bars">
                            <div className="bar b1"></div><div className="bar b2"></div><div className="bar b3"></div>
                            <div className="bar b1"></div><div className="bar b2"></div><div className="bar b1"></div>
                            <div className="bar b3"></div><div className="bar b1"></div>
                          </div>
                          <span className="barcode-text">{tkt.ticketCode}</span>
                        </div>
                        <div className="ticket-status-tag approved">
                          <CheckCircle size={12} /> VERIFIED PASS
                        </div>
                      </div>

                      {/* Tear Notch */}
                      <div className="ticket-tear-notch top"></div>
                      <div className="ticket-tear-notch bottom"></div>

                      {/* Right Main Pass Info */}
                      <div className="ticket-main-info">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <div className="ticket-brand">
                            <span className="brand-logo-small">E</span>
                            <span>EVENTSYNC DIGITAL PASS</span>
                          </div>
                          
                          <button
                            onClick={() => exportEventToPDF(tkt.event, clubInfo)}
                            className="btn-primary"
                            style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', borderRadius: '50px' }}
                          >
                            <Download size={13} /> PDF Pass
                          </button>
                        </div>

                        <h3 className="ticket-event-title">{tkt.event.title}</h3>
                        <p className="ticket-club-subtitle">Hosted by {tkt.event.clubName}</p>

                        <div className="ticket-user-grid">
                          <div>
                            <span className="ticket-label">ATTENDEE NAME</span>
                            <span className="ticket-val">{tkt.studentName || 'Student Participant'}</span>
                          </div>
                          <div>
                            <span className="ticket-label">ROLL NO / ID</span>
                            <span className="ticket-val">{tkt.rollNo || '2026CS1001'}</span>
                          </div>
                          <div>
                            <span className="ticket-label">DATE & TIME</span>
                            <span className="ticket-val">{tkt.event.date} • {tkt.event.time}</span>
                          </div>
                          <div>
                            <span className="ticket-label">PRICE / FEE</span>
                            <span className="ticket-val" style={{ color: (!tkt.event.price || tkt.event.price === 0 || tkt.event.price === 'Free') ? '#34d399' : '#818cf8' }}>
                              {(!tkt.event.price || tkt.event.price === 0 || tkt.event.price === 'Free') ? 'FREE ENTRY' : `₹${tkt.event.price}`}
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
