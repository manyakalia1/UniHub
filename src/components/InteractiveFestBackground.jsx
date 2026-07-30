import React, { useEffect, useState } from 'react';

export default function InteractiveFestBackground() {
  const [mousePos, setMousePos] = useState({ x: 500, y: 300 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="interactive-fest-bg-wrapper">
      {/* Dynamic Cursor Spotlight Tracking */}
      <div 
        className="cursor-spotlight-glow"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`
        }}
      />

      {/* Floating Concert Ambient Orbs */}
      <div className="fest-orb orb-1" />
      <div className="fest-orb orb-2" />
      <div className="fest-orb orb-3" />
      <div className="fest-orb orb-4" />
    </div>
  );
}
