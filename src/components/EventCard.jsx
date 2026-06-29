import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

export default function EventCard({ event, onClick }) {
  // Helper to determine status style
  const getStatusText = (eventDate) => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;
    if (eventDate === todayStr) {
      return 'Live';
    }
    return 'Upcoming';
  };

  const status = getStatusText(event.date);

  // Fallback gradient if poster is missing or fails
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

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="event-card" onClick={onClick}>
      <div className="event-poster-wrapper">
        {event.poster ? (
          <img 
            src={event.poster} 
            alt={event.title} 
            className="event-poster"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentNode.style.background = getGradientBackground(event.clubId);
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: getGradientBackground(event.clubId) }} />
        )}
        
        <span className={`event-status-badge ${status.toLowerCase()}`}>
          {status}
        </span>
        
        <span className="event-club-badge">
          <span>{event.clubName}</span>
        </span>
      </div>

      <div className="event-card-body">
        <div className="event-card-tags">
          {event.tags && event.tags.map((tag, idx) => (
            <span key={idx} className="event-tag">{tag}</span>
          ))}
        </div>

        <h3 className="event-card-title">{event.title}</h3>

        <div className="event-info-row" style={{ marginTop: '0.8rem' }}>
          <Calendar size={14} />
          <span>{formatDate(event.date)}</span>
        </div>

        <div className="event-info-row">
          <Clock size={14} />
          <span>{event.time} ({event.duration})</span>
        </div>

        <div className="event-info-row">
          <MapPin size={14} />
          <span>{event.venue}</span>
        </div>

        <div className="event-card-footer">
          <span className="registrations-count">
            <Users size={14} />
            <span>{event.registrants ? event.registrants.length : 0} Registered</span>
          </span>
          <button className="btn-card-action">View Details</button>
        </div>
      </div>
    </div>
  );
}
