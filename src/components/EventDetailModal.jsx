import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Award, CheckCircle, ExternalLink, ArrowRight } from 'lucide-react';

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
    
    // Register the student
    onRegister(event.id, formData);
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
                  marginTop: '0.2rem',
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
              <div className="success-state">
                <div className="success-icon-anim">
                  <CheckCircle size={32} />
                </div>
                <h3>Registration Successful!</h3>
                <p>You have successfully registered for <strong>{event.title}</strong>. A confirmation message code has been saved to the portal database.</p>
                <button className="btn-secondary" onClick={onClose}>Close Window</button>
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

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                  <button type="button" className="btn-secondary" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Submit Registration <ArrowRight size={16} />
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
