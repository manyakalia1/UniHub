import React, { useState, useEffect } from 'react';

export default function TypewriterTitle({ phrases = [], speed = 70, deleteSpeed = 35, delay = 2200 }) {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;

    const currentPhrase = phrases[phraseIndex];
    let timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setText(currentPhrase.substring(0, text.length - 1));
      }, deleteSpeed);
    } else {
      timeout = setTimeout(() => {
        setText(currentPhrase.substring(0, text.length + 1));
      }, speed);
    }

    if (!isDeleting && text === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases, speed, deleteSpeed, delay]);

  return (
    <span className="typewriter-container">
      <span className="shimmer-text">{text}</span>
      <span className="typewriter-cursor">|</span>
    </span>
  );
}
