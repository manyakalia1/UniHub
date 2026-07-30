import React from 'react';
import { Calendar, Clock, MapPin, Users, Ticket } from 'lucide-react';

export default function EventCard({ event, onClick }) {
  const getStatusText = (eventDate) => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;
    if (eventDate === todayStr) {
      return 'Live Today';
    }
    return 'Upcoming';
  };

  const status = getStatusText(event.date);

  // Parse Month and Day for IndiaCollegeFest style date box
  const getDateParts = (dateStr) => {
    try {
      const d = new Date(dateStr);
      const month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
      const day = d.getDate();
      return { month, day };
    } catch {
      return { month: 'FEB', day: '15' };
    }
  };

  const { month, day } = getDateParts(event.date);

  const getGradientBackground = (clubId) => {
    switch (clubId) {
      case 'stacatos': return 'linear-gradient(135deg, #fce7f3, #fbcfe8)';
      case 'cu_arcs': return 'linear-gradient(135deg, #d1fae5, #a7f3d0)';
      case 'ieee': return 'linear-gradient(135deg, #e0f2fe, #bae6fd)';
      case 'euphony': return 'linear-gradient(135deg, #f5f3ff, #ddd6fe)';
      case 'cut_c': return 'linear-gradient(135deg, #fef3c7, #fde68a)';
      case 'acm': return 'linear-gradient(135deg, #e0e7ff, #c7d2fe)';
      case 'hostel_committee': return 'linear-gradient(135deg, #e0f2fe, #ccfbf1)';
      case 'vibin_z': return 'linear-gradient(135deg, #ffe4e6, #fecdd3)';
      case 'iste': return 'linear-gradient(135deg, #f1f5f9, #cbd5e1)';
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
    <div 
      className="event-card" 
      onClick={(e) => {
        if (onClick) onClick(event);
      }}
      style={{ cursor: 'pointer' }}
    >
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
        
        {/* IndiaCollegeFest Style Date Badge Box */}
        <div className="event-date-badge">
          <span className="event-date-month">{month}</span>
          <span className="event-date-day">{day}</span>
        </div>

        {/* Ticket Price Badge (FREE TICKET vs ₹XX TICKET) */}
        <span className={`event-price-badge ${(!event.price || event.price === 0 || event.price === 'Free') ? 'free' : 'paid'}`}>
          {(!event.price || event.price === 0 || event.price === 'Free') ? '🎟️ FREE TICKET' : `🎟️ ₹${event.price} TICKET`}
        </span>

        <span className={`event-status-badge ${status.toLowerCase().includes('live') ? 'live' : 'upcoming'}`} style={{ right: 'auto', left: '4.8rem' }}>
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

        <div className="event-info-row" style={{ marginTop: '0.6rem' }}>
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
            <span>{event.registrants ? event.registrants.length : 0} Seats Booked</span>
          </span>
          <button 
            className="btn-card-action" 
            onClick={(e) => {
              e.stopPropagation();
              if (onClick) onClick(event);
            }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
          >
            <Ticket size={14} /> Get Ticket • {(!event.price || event.price === 0 || event.price === 'Free') ? 'FREE' : `₹${event.price}`}
          </button>
        </div>
      </div>
    </div>
  );
}

