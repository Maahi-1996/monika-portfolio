import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useAI } from '../context/AIContext';
import './Navbar.css';

const links = [
  { label: 'Home',           href: '#top' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Certifications', href: '#certs' },
  { label: 'Contact',        href: '#contact' },
];

const PROFILE = {
  name:    'Monika Bhivarkar',
  role:    'Senior QA Engineer',
  email:   'monika.bhivarkar1996@gmail.com',
  phone:   '+91 8308775936',
};

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [profileOpen,  setProfileOpen]  = useState(false);
  const [resumeOpen,   setResumeOpen]   = useState(false);
  const { isTourActive, toggleTour, highlightedId } = useAI();
  const cardRef = useRef(null);

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close profile card on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    setProfileOpen(false); // Close menu first
    setTimeout(() => {
      const el = document.querySelector(href === '#top' ? 'body' : href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50); // slight delay ensures DOM paints before scrolling
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        
        {/* ── Left side Availability Badge ── */}
        <div className="nav-badge-wrap">
          <div 
            id="nav-badge"
            className={`nav-badge ${highlightedId === 'nav-badge' ? 'active-glow' : ''}`} 
            onClick={() => setResumeOpen(true)}
          >
            <span>Available for New Opportunities</span>
          </div>
          <div className="nav-badge-hint">
            <span className="badge-arrow">&#8593;</span>
            <span className="badge-hint-text">Click to Download Resume</span>
          </div>
        </div>

        {/* ── Resume Download Popup (Portaled to root so it covers AI model) ── */}
        {resumeOpen && createPortal(
          <>
            <div className="resume-overlay" onClick={() => setResumeOpen(false)} />
            <div className="resume-modal" role="dialog" aria-modal="true" aria-label="Download Resume">
              <button className="resume-modal-close" onClick={() => setResumeOpen(false)} aria-label="Close">✕</button>
              <div className="resume-modal-icon">📄</div>
              <h3 className="resume-modal-title">Monika Bhivarkar</h3>
              <p className="resume-modal-sub">Senior QA Engineer · Resume 2026</p>
              <a
                className="resume-download-btn"
                href="/Monika_Bhivarkar_Resume_2026_Updated.pdf"
                download="Monika_Bhivarkar_Resume_2026.pdf"
              >
                ⬇ Download Resume
              </a>
            </div>
          </>,
          document.body
        )}
        {/* ── Nav links ── */}
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.label}>
              <a href={l.href} onClick={e => scrollTo(e, l.href)}>{l.label}</a>
            </li>
          ))}
        </ul>

        {/* ── Right side actions (AI Toggle + Profile) ── */}
        <div className="nav-actions">
          {/* ── AI toggle ── */}
          <div className="nav-ai-toggle" onClick={toggleTour} title="Toggle AI Presenter">
            <label className="switch">
              <input type="checkbox" checked={isTourActive} readOnly />
              <span className="slider round"></span>
            </label>
            <span className="toggle-label">Enable AI Explanation</span>
          </div>

          {/* ── Profile avatar ── */}
          <div className="nav-profile-wrap" ref={cardRef}>
            <button
              className="nav-avatar"
              onClick={() => setProfileOpen(o => !o)}
              title="View profile details"
              aria-label="Profile"
            >
              MB
            </button>

            {profileOpen && (
              <React.Fragment>
                <div className="profile-overlay" onClick={() => setProfileOpen(false)}></div>
                <div className="profile-card">
                  <h3 className="profile-card-name">{PROFILE.name}</h3>
                  <span className="profile-card-role">{PROFILE.role}</span>
                  <div className="profile-card-divider" />
                  <div className="profile-card-row">
                    <span className="profile-label">Email</span>
                    <a href={`mailto:${PROFILE.email}`} className="profile-value">{PROFILE.email}</a>
                  </div>
                  <div className="profile-card-row">
                    <span className="profile-label">Phone</span>
                    <a href={`tel:${PROFILE.phone}`} className="profile-value">{PROFILE.phone}</a>
                  </div>

                  {/* ── Mobile menu elements inside profile ── */}
                  <div className="mobile-only-nav">
                    <div className="profile-card-divider" />
                    
                    <ul className="mobile-nav-links">
                      {links.map(l => (
                        <li key={l.label}>
                          <a href={l.href} onClick={(e) => scrollTo(e, l.href)}>{l.label}</a>
                        </li>
                      ))}
                    </ul>

                    <div className="mobile-nav-ai-toggle" onClick={toggleTour} title="Toggle AI Presenter">
                      <label className="switch">
                        <input type="checkbox" checked={isTourActive} readOnly />
                        <span className="slider round"></span>
                      </label>
                      <span className="toggle-label-mobile">Enable AI Explanation</span>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
