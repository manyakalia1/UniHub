import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Award, CheckCircle, ExternalLink, ArrowRight, Download } from 'lucide-react';
import { exportEventToPDF } from '../utils/pdfGenerator';

export default function EventDetailModal({ event, clubs = [], isOpen, onClose, onRegister }) {
  const [formData, setFormData] = useState({
    name: '',
    roll: '',
    branch: '',
    year: '1st Year',
    email: '',
    phone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  if (!isOpen || !event) return null;

  const clubInfo = clubs.find(c => c.id === event.clubId);

  const handleShareClick = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?event=${event.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy share link:', err);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.roll || !formData.email || !formData.phone) {
      alert('Please fill in all required fields.');
      return;
    }

    if (event.price && Number(event.price) > 0 && !formData.utr) {
      alert('Please scan the QR code and enter your UPI Transaction/UTR Ref ID to claim your ticket.');
      return;
    }
    
    // Save claimed ticket to local tickets array
    const ticketCode = `TKT-${event.id.slice(0, 4).toUpperCase()}-${formData.roll.slice(-4) || '2026'}`;
    const newTicket = {
      ticketCode,
      event,
      studentName: formData.name,
      rollNo: formData.roll,
      branch: formData.branch,
      year: formData.year,
      email: formData.email,
      phone: formData.phone,
      utr: formData.utr || 'N/A (FREE ENTRY)',
      paymentStatus: (event.price && Number(event.price) > 0) ? 'Paid & Verified' : 'Free Entry Pass',
      claimedAt: new Date().toISOString()
    };
    try {
      const existing = JSON.parse(localStorage.getItem('eventsync_my_tickets') || '[]');
      const updated = [newTicket, ...existing.filter(t => t.event.id !== event.id)];
      localStorage.setItem('eventsync_my_tickets', JSON.stringify(updated));
    } catch (err) {
      console.error('Error saving ticket:', err);
    }

    // Register the student
    onRegister(event.id, { ...formData, paymentStatus: newTicket.paymentStatus });
    setIsSubmitted(true);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getGradientBackground = (clubId) => {
    switch (clubId) {
      case 'stacatos': return 'linear-gradient(135deg, #fce7f3, #fbcfe8)'; // Pink/Rose
      case 'cu_arcs': return 'linear-gradient(135deg, #d1fae5, #a7f3d0)'; // Emerald Green
      case 'ieee': return 'linear-gradient(135deg, #e0f2fe, #bae6fd)'; // Sky Blue
      case 'euphony': return 'linear-gradient(135deg, #f5f3ff, #ddd6fe)'; // Violet
      case 'cut_c': return 'linear-gradient(135deg, #fef3c7, #fde68a)'; // Amber
      case 'acm': return 'linear-gradient(135deg, #e0e7ff, #c7d2fe)'; // Indigo
      case 'hostel_committee': return 'linear-gradient(135deg, #e0f2fe, #ccfbf1)'; // Teal
      case 'vibin_z': return 'linear-gradient(135deg, #ffe4e6, #fecdd3)'; // Crimson/Rose
      case 'iste': return 'linear-gradient(135deg, #f1f5f9, #cbd5e1)'; // Slate
      default: return 'linear-gradient(135deg, #f1f5f9, #e2e8f0)';
    }
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {event.poster ? (
          <img 
            src={event.poster} 
            alt={event.title} 
            className="modal-poster"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentNode.style.height = '180px';
              e.target.parentNode.style.background = getGradientBackground(event.clubId);
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '180px', background: getGradientBackground(event.clubId) }} />
        )}

        <div className="modal-body">
          <div className="modal-header-info">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: '1', minWidth: '200px' }}>
                <span className="modal-club-info">
                  {event.clubName}
                </span>
                <h2 className="modal-title" style={{ margin: '0.2rem 0 0.5rem 0' }}>{event.title}</h2>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'nowrap', marginTop: '0.2rem' }}>
                <button 
                  onClick={() => exportEventToPDF(event, clubInfo)}
                  className="btn-share"
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.4rem',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    backgroundColor: 'var(--accent-indigo)',
                    border: '1px solid var(--accent-indigo)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    color: '#ffffff',
                    transition: 'var(--transition-fast)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Download size={14} /> Download PDF
                </button>
                <button 
                  onClick={handleShareClick}
                  className="btn-share"
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.4rem',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)',
                    transition: 'var(--transition-fast)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {shareCopied ? (
                    <>
                      <CheckCircle size={14} style={{ color: 'var(--accent-green)' }} /> Copied!
                    </>
                  ) : (
                    <>
                      <ExternalLink size={14} /> Share Event
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="modal-tags" style={{ marginTop: '0.5rem' }}>
              {event.tags && event.tags.map((tag, idx) => (
                <span key={idx} className="event-tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="modal-grid-info">
            <div className="modal-info-item">
              <div className="modal-info-icon-wrapper">
                <Calendar size={18} />
              </div>
              <div className="modal-info-details">
                <h4>Date</h4>
                <p>{formatDate(event.date)}</p>
              </div>
            </div>

            <div className="modal-info-item">
              <div className="modal-info-icon-wrapper">
                <Clock size={18} />
              </div>
              <div className="modal-info-details">
                <h4>Time & Duration</h4>
                <p>{event.time} ({event.duration})</p>
              </div>
            </div>

            <div className="modal-info-item">
              <div className="modal-info-icon-wrapper">
                <MapPin size={18} />
              </div>
              <div className="modal-info-details">
                <h4>Venue / Location</h4>
                <p>{event.venue}</p>
              </div>
            </div>

            <div className="modal-info-item">
              <div className="modal-info-icon-wrapper">
                <Award size={18} />
              </div>
              <div className="modal-info-details">
                <h4>Format / Type</h4>
                <p>{event.registrationType === 'internal' ? 'Registration Required' : 'External Register Link'}</p>
              </div>
            </div>

            <div className="modal-info-item">
              <div className="modal-info-icon-wrapper" style={{ color: (!event.price || event.price === 0 || event.price === 'Free') ? 'var(--accent-green)' : 'var(--color-brand)' }}>
                <Ticket size={18} />
              </div>
              <div className="modal-info-details">
                <h4>Ticket Fee / Price</h4>
                <p style={{ fontWeight: 800, color: (!event.price || event.price === 0 || event.price === 'Free') ? 'var(--accent-green)' : 'var(--color-brand)' }}>
                  {(!event.price || event.price === 0 || event.price === 'Free') ? 'FREE ENTRY (No Fee)' : `₹${event.price} / Pass`}
                </p>
              </div>
            </div>
          </div>

          <h3 className="modal-section-title">About the Event</h3>
          <p className="modal-desc-text">{event.description}</p>

          <h3 className="modal-section-title">Eligibility & Criteria</h3>
          <div className="modal-criteria-box">
            <strong>Important Guidelines:</strong>
            {event.criteria}
          </div>

          {/* Host Club & Core Team section */}
          {clubInfo && (
            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1.2rem', 
              borderRadius: 'var(--radius-lg)', 
              border: '1px solid var(--border-color)', 
              backgroundColor: 'var(--bg-tertiary)' 
            }}>
              <h3 className="modal-section-title" style={{ marginTop: '0', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '1rem' }}>
                Organizing Club Details
              </h3>
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '0.8rem' }}>
                <span style={{ fontSize: '1.8rem' }}>{clubInfo.logo}</span>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>{clubInfo.name}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Active Members: {clubInfo.memberCount}</p>
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.45', marginBottom: '1rem' }}>
                {clubInfo.description}
              </p>

              {clubInfo.coreTeam && clubInfo.coreTeam.length > 0 && (
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.8rem' }}>
                  <h5 style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>
                    Core Organizing Team
                  </h5>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.6rem' }}>
                    {clubInfo.coreTeam.map((member, idx) => (
                      <div key={idx} style={{ 
                        padding: '0.45rem 0.6rem', 
                        borderRadius: 'var(--radius-sm)', 
                        backgroundColor: 'var(--bg-secondary)', 
                        border: '1px solid var(--border-color)' 
                      }}>
                        <p style={{ fontSize: '0.8rem', fontWeight: 600, margin: 0, color: 'var(--text-primary)' }}>{member.name}</p>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', margin: 0 }}>{member.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Registration Section */}
          <div className="registration-container">
            <h3 className="modal-section-title">Participate & Register</h3>
            
            {isSubmitted ? (
              <div className="success-state" style={{ padding: '1rem 0' }}>
                <div className="success-icon-anim" style={{ margin: '0 auto 0.5rem auto' }}>
                  <CheckCircle size={32} />
                </div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', margin: '0.2rem 0' }}>Ticket Claimed Successfully!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '500px', margin: '0 auto 1rem auto' }}>
                  Here is your official digital entry pass for <strong>{event.title}</strong>. Present this ticket barcode at the venue entrance.
                </p>

                {/* Chitkara-Style Real Festival Entry Ticket Pass */}
                <div className="ticket-card-wrapper" style={{ margin: '1rem 0', textAlign: 'left' }}>
                  <div className="ticket-card-inner">
                    
                    {/* Left Stub */}
                    <div className="ticket-stub">
                      <div className="ticket-badge-pill" style={{ background: (!event.price || event.price === 0 || event.price === 'Free') ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ec4899, #8b5cf6)' }}>
                        {(!event.price || event.price === 0 || event.price === 'Free') ? 'FREE PASS' : `₹${event.price} PASS`}
                      </div>
                      <div className="ticket-qr-box">
                        <div className="barcode-bars">
                          <div className="bar b1"></div><div className="bar b2"></div><div className="bar b3"></div>
                          <div className="bar b1"></div><div className="bar b2"></div><div className="bar b1"></div>
                          <div className="bar b3"></div><div className="bar b1"></div>
                        </div>
                        <span className="barcode-text">TKT-{event.id.slice(0, 4).toUpperCase()}-{formData.roll ? formData.roll.slice(-4) : '2026'}</span>
                      </div>
                      <div className="ticket-status-tag approved">
                        <CheckCircle size={12} /> VERIFIED ENTRY
                      </div>
                    </div>

                    {/* Tear Notch */}
                    <div className="ticket-tear-notch top"></div>
                    <div className="ticket-tear-notch bottom"></div>

                    {/* Right Main Ticket Info */}
                    <div className="ticket-main-info">
                      <div className="ticket-brand">
                        <span className="brand-logo-small">E</span>
                        <span>EVENTSYNC DIGITAL PASS</span>
                      </div>
                      
                      <h3 className="ticket-event-title">{event.title}</h3>
                      <p className="ticket-club-subtitle">Organized by {event.clubName}</p>

                      <div className="ticket-user-grid">
                        <div>
                          <span className="ticket-label">ATTENDEE NAME</span>
                          <span className="ticket-val">{formData.name || 'Student Participant'}</span>
                        </div>
                        <div>
                          <span className="ticket-label">STUDENT ROLL NO</span>
                          <span className="ticket-val">{formData.roll || '2026CS1001'}</span>
                        </div>
                        <div>
                          <span className="ticket-label">DATE & TIME</span>
                          <span className="ticket-val">{event.date} • {event.time}</span>
                        </div>
                        <div>
                          <span className="ticket-label">TICKET PRICE</span>
                          <span className="ticket-val" style={{ color: (!event.price || event.price === 0 || event.price === 'Free') ? '#34d399' : '#818cf8' }}>
                            {(!event.price || event.price === 0 || event.price === 'Free') ? 'FREE ENTRY' : `₹${event.price}`}
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginTop: '1.2rem' }}>
                  <button 
                    type="button"
                    className="btn-primary"
                    onClick={() => exportEventToPDF(event, clubInfo)}
                    style={{ padding: '0.6rem 1.4rem', borderRadius: '50px' }}
                  >
                    <Download size={16} /> Download PDF Ticket
                  </button>
                  <button type="button" className="btn-secondary" onClick={onClose} style={{ borderRadius: '50px' }}>
                    Close Pass
                  </button>
                </div>
              </div>
            ) : event.registrationType === 'external' ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                  This event uses external registrations (e.g. Google Forms or a specialized club page).
                </p>
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ textDecoration: 'none' }}
                >
                  Go to Registration Form <ExternalLink size={16} />
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group-row">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      className="form-input"
                      required
                      placeholder="e.g. Rahul Verma"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Roll Number / ID *</label>
                    <input
                      type="text"
                      name="roll"
                      className="form-input"
                      required
                      placeholder="e.g. 2024CS1023"
                      value={formData.roll}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label className="form-label">Department / Branch *</label>
                    <input
                      type="text"
                      name="branch"
                      className="form-input"
                      required
                      placeholder="e.g. CSE / ECE"
                      value={formData.branch}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Year *</label>
                    <select
                      name="year"
                      className="form-input"
                      value={formData.year}
                      onChange={handleInputChange}
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="Faculty/Guest">Faculty / Guest</option>
                    </select>
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label className="form-label">Email ID *</label>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      required
                      placeholder="e.g. rahul@univ.edu"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">WhatsApp/Contact Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      required
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Scan & Pay QR Code Box for Paid Events */}
                {event.price && Number(event.price) > 0 && (
                  <div style={{
                    background: 'rgba(15, 23, 42, 0.5)',
                    border: '1px solid rgba(165, 180, 254, 0.3)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.2rem',
                    marginTop: '1.2rem',
                    textAlign: 'center'
                  }}>
                    <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, margin: '0 0 0.4rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                      💳 Step 2: Scan QR Code to Pay ₹{event.price} Ticket Fee
                    </h4>
                    <p style={{ color: '#cbd5e1', fontSize: '0.82rem', margin: '0 0 1rem 0' }}>
                      Scan with Google Pay, PhonePe, Paytm, or any UPI app to complete payment.
                    </p>
                    
                    <div style={{ display: 'inline-block', padding: '0.8rem', background: '#ffffff', borderRadius: 'var(--radius-md)', boxShadow: '0 8px 25px rgba(0,0,0,0.3)' }}>
                      <img 
                        src={event.paymentQr || `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${event.clubId}@upi&pn=${encodeURIComponent(event.title)}&am=${event.price}&cu=INR`}
                        alt="Club Payment QR Code" 
                        style={{ width: '180px', height: '180px', display: 'block' }} 
                      />
                    </div>

                    <div className="form-group" style={{ marginTop: '1rem', textAlign: 'left' }}>
                      <label className="form-label">Payment UTR / Transaction ID *</label>
                      <input
                        type="text"
                        name="utr"
                        className="form-input"
                        required
                        placeholder="Enter 12-digit UTR/UPI Transaction Ref Number"
                        value={formData.utr || ''}
                        onChange={handleInputChange}
                      />
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginTop: '0.2rem' }}>
                        Found in your UPI app payment receipt after paying ₹{event.price}.
                      </span>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                  <button type="button" className="btn-secondary" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Claim Pass • {(!event.price || event.price === 0 || event.price === 'Free') ? 'FREE' : `₹${event.price}`} <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
