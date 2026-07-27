import React, { useState, useEffect } from 'react';
import { Sparkles, X, Zap } from 'lucide-react';

const GENZ_NOTIFICATIONS = [
  {
    id: 1,
    user: 'Rahul M.',
    action: 'claimed pass for',
    event: 'HackOverflow 2026 💻',
    meme: 'Code aati nahi par free T-shirt lene gaya hai 💀',
    time: '2m ago',
    tag: '🔥 Hot Pass'
  },
  {
    id: 2,
    user: 'Ananya & 4 friends',
    action: 'registered for',
    event: 'Beat Drop Dance Battle 💃',
    meme: 'Professors se attendance ka mast bahana mil gaya 😜',
    time: 'Just now',
    tag: '⚡ Trending'
  },
  {
    id: 3,
    user: 'Karan S.',
    action: 'joined',
    event: 'Acoustic Jam Night 🎸',
    meme: 'Guitar bajana aata nahi par crush aayi hai wahan 💘',
    time: '4m ago',
    tag: '🎵 Live Vibe'
  },
  {
    id: 4,
    user: 'Canteen Alert 🍕',
    action: 'Only 8 passes left for',
    event: 'Food Fest & Mocktail Night 🍹',
    meme: 'Samosa & free drinks khatam hone se pehle book kar lo 🏃‍♂️',
    time: '1m ago',
    tag: '🚨 Selling Fast'
  },
  {
    id: 5,
    user: 'Vikram T.',
    action: 'booked front row seat at',
    event: 'RoboWars Championship 🤖',
    meme: 'Aaj pakka lab ke saare circuits aur fuse fukenge ⚡',
    time: '5m ago',
    tag: '💥 High Tension'
  },
  {
    id: 6,
    user: 'Priya K.',
    action: 'unlocked VIP pass for',
    event: 'E-Sports BGMI Tournament 🎮',
    meme: 'Exam ki tayari chhod ke squad ko clutch karwane chali 💀',
    time: '3m ago',
    tag: '🏆 Winner Vibe'
  }
];

export default function GenZLiveToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % GENZ_NOTIFICATIONS.length);
        setIsAnimating(false);
      }, 300);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const current = GENZ_NOTIFICATIONS[currentIndex];

  return (
    <div className={`genz-toast-card ${isAnimating ? 'toast-slide-out' : 'toast-slide-in'}`}>
      <div className="genz-toast-header">
        <div className="genz-toast-tag">
          <Sparkles size={12} /> {current.tag}
        </div>
        <button 
          className="genz-toast-close" 
          onClick={() => setIsVisible(false)}
          title="Dismiss live feed"
        >
          <X size={14} />
        </button>
      </div>

      <div className="genz-toast-body">
        <div className="genz-toast-user">
          <strong>{current.user}</strong> {current.action}
        </div>
        <div className="genz-toast-event">{current.event}</div>
        <div className="genz-toast-meme">"{current.meme}"</div>
      </div>

      <div className="genz-toast-footer">
        <span className="genz-toast-time">● {current.time}</span>
        <span className="genz-toast-pulse">Live Campus Sync</span>
      </div>
    </div>
  );
}
