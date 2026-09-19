import React, { useState } from 'react';
import { Laptop, Smartphone, Monitor, Sparkles, RefreshCw, CheckCircle, Eye, ShieldCheck, Zap } from 'lucide-react';
import EventGrid from './EventGrid';
import HeroSection from './HeroSection';

export default function DeviceSimulator({ events, stats, notices, clubs, onEventClick, theme }) {
  const [deviceMode, setDeviceMode] = useState('laptop'); // 'laptop' | 'mobile' | 'full'
  const [simulatedTab, setSimulatedTab] = useState('events');

  return (
    <div className="simulator-page-wrapper fade-in-section">
      {/* Header Info */}
      <div className="simulator-header-box">
        <div className="vibrant-badge">
          <Sparkles size={16} /> Device Responsive Engine
        </div>
        <h1 className="section-title-gradient">
          Interactive <span className="shimmer-text">Device Simulator</span>
        </h1>
        <p className="section-subtitle-clean">
          Test how EventSync dynamically adapts across Laptop screens and Mobile viewports with smooth transitions and Apple-grade responsiveness.
        </p>

        {/* Device Switcher Toggle Buttons */}
        <div className="device-switcher-bar">
          <button 
            className={`device-btn ${deviceMode === 'laptop' ? 'active' : ''}`}
            onClick={() => setDeviceMode('laptop')}
          >
            <Laptop size={18} /> Laptop View (MacBook)
          </button>
          
          <button 
            className={`device-btn ${deviceMode === 'mobile' ? 'active' : ''}`}
            onClick={() => setDeviceMode('mobile')}
          >
            <Smartphone size={18} /> Mobile View (iPhone)
          </button>

          <button 
            className={`device-btn ${deviceMode === 'full' ? 'active' : ''}`}
            onClick={() => setDeviceMode('full')}
          >
            <Monitor size={18} /> Full Screen
          </button>
        </div>
      </div>

      {/* Simulator Display Screen Container */}
      <div className="simulator-viewport-area">
        {deviceMode === 'laptop' && (
          <div className="laptop-mockup-wrapper fade-in-fast">
            <div className="laptop-screen-bezel">
              <div className="laptop-camera-dot"></div>
              <div className="laptop-screen-content">
                {/* Mock Browser Header Bar */}
                <div className="browser-mock-header">
                  <div className="browser-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <div className="browser-address-bar">
                    <span className="secure-icon">🔒</span> https://eventsync.campus.edu/events
                  </div>
                  <div className="browser-actions">
                    <RefreshCw size={13} className="refresh-icon" />
                  </div>
                </div>

                {/* Rendered Live Site inside Laptop Frame */}
                <div className="mock-scroll-area">
                  <HeroSection stats={stats} onExploreClick={() => {}} />
                  <div style={{ padding: '1.5rem' }}>
                    <EventGrid 
                      events={events} 
                      stats={stats} 
                      notices={notices} 
                      clubs={clubs} 
                      onEventClick={onEventClick} 
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="laptop-base-stand">
              <div className="laptop-notch-cutout"></div>
            </div>
          </div>
        )}

        {deviceMode === 'mobile' && (
          <div className="mobile-mockup-wrapper fade-in-fast">
            <div className="phone-screen-bezel">
              <div className="phone-dynamic-island">
                <div className="phone-camera-lens"></div>
              </div>
              <div className="phone-screen-content">
                {/* Mobile Header status bar */}
                <div className="mobile-status-bar">
                  <span>9:41</span>
                  <span>5G 🔋</span>
                </div>

                {/* Rendered Live Site inside Phone Frame */}
                <div className="mock-scroll-area mobile-compact">
                  <div className="mobile-app-header">
                    <span className="mobile-app-logo">⚡ EventSync</span>
                    <span className="mobile-app-badge">Live</span>
                  </div>

                  <EventGrid 
                    events={events} 
                    stats={stats} 
                    notices={notices} 
                    clubs={clubs} 
                    onEventClick={onEventClick} 
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {deviceMode === 'full' && (
          <div className="fullscreen-preview-card fade-in-fast">
            <div className="preview-notification-pill">
              <Eye size={16} /> Currently viewing full viewport layout
            </div>
            <EventGrid 
              events={events} 
              stats={stats} 
              notices={notices} 
              clubs={clubs} 
              onEventClick={onEventClick} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
