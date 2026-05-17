import React, { useRef, useState, useEffect } from 'react';
import { useAI } from '../context/AIContext';
import './AIAgent.css';

export default function AIAgent() {
  const { isSpeaking, isTourActive, toggleTour } = useAI();
  const clickTimer = useRef(null);
  const clickCount = useRef(0);
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);

  /* Video Sync Effect */
  useEffect(() => {
    if (videoRef.current) {
      if (isSpeaking) {
        videoRef.current.play().catch(e => console.log('Video play error:', e));
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0; // Reset to neutral idle frame when speech stops
      }
    }
  }, [isSpeaking]);

  /* Double-click detection (works on both mouse and touch) */
  const handleClick = () => {
    clickCount.current += 1;
    if (clickCount.current === 1) {
      clickTimer.current = setTimeout(() => {
        clickCount.current = 0; // single click — ignore
      }, 280);
    } else if (clickCount.current >= 2) {
      clearTimeout(clickTimer.current);
      clickCount.current = 0;
      toggleTour();
    }
  };

  /* Animation phase: idle gently sways; speaking has full body motion */
  const phase = isSpeaking ? 'speaking' : 'idle';

  return (
    <aside className={`ai-presenter ai-${phase}`}>



      {/* ── The character ── */}
      <div
        className="ai-char-wrap"
        onDoubleClick={handleClick}   // real dblclick
        onClick={handleClick}         // counted clicks fallback
        title={isTourActive ? 'Double-click to stop' : 'Double-click to start AI tour'}
      >
        {/* Body layers for animation splitting */}
        <div className="ai-body-anim">
          {/* Head layer for lip/expression movement */}
          <div className="ai-head-anim">
            {videoError ? (
              <img
                src="/avatar.png"
                alt="AI Presenter Monika"
                className="ai-char-img"
                draggable={false}
              />
            ) : (
              <video
                ref={videoRef}
                src="/avatar.webm"
                className="ai-char-img"
                muted
                playsInline
                onError={() => setVideoError(true)}
              />
            )}
            
            {/* Mobile AI Icon Wrapper */}
            <div className="ai-mobile-icon" title="AI Agent is Active">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
