import React, { useState, useEffect } from 'react';
import { useAI } from '../context/AIContext';
import { Volume2, VolumeX, Award, ChevronDown, ChevronUp } from 'lucide-react';
import './Certifications.css';

const certs = [
  {
    id: 'cert-0',
    title: 'Java Developer Associate Certification',
    code: 'JDAC-24',
    image: '/cert-jdac.jpg',
    aiText: 'I hold a Java Developer Associate Certification (JDAC 24), validating my proficiency in Java programming fundamentals and object-oriented design.'
  },
  {
    id: 'cert-1',
    title: 'Selenium Automation Workshop',
    code: 'Practical automation techniques & framework design',
    image: '/cert-selenium.png',
    aiText: 'I completed a Selenium Automation Workshop that covered practical end-to-end automation techniques and scalable framework design patterns.'
  }
];

function CertCard({ cert, isHighlighted, speak, isSpeaking }) {
  const [open, setOpen] = useState(false);
  const { isTourActive } = useAI();

  useEffect(() => {
    if (isTourActive && isHighlighted) {
      setOpen(true);
      // Scroll the cert card below the navbar after it expands
      const t = setTimeout(() => {
        const el = document.getElementById(cert.id);
        if (el) {
          const isMobile = window.innerWidth <= 1024;
          const offset = isMobile ? (document.querySelector('.navbar')?.offsetHeight || 80) + 10 : 80;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 400);
      return () => clearTimeout(t);
    }
    if (isTourActive && !isHighlighted) {
      const t = setTimeout(() => setOpen(false), 200);
      return () => clearTimeout(t);
    }
  }, [isTourActive, isHighlighted, cert.id]);

  return (
    <div
      id={cert.id}
      className={`glass-card cert-card ${isHighlighted ? 'active-glow' : ''}`}
    >
      {/* Main row */}
      <div className="cert-main-row">
        <div className="cert-icon-wrap">
          <Award size={28} />
        </div>
        <div className="cert-info">
          <h3>{cert.title}</h3>
          <p className="cert-code">{cert.code}</p>
        </div>
        <div className="cert-actions">
          <button className="btn-ai" onClick={() => speak(cert.aiText, cert.id)}>
            {(isSpeaking && isHighlighted) ? <Volume2 size={14} /> : <VolumeX size={14} />} AI Explain
          </button>
          <button
            className="toggle-cert-btn"
            onClick={() => setOpen(o => !o)}
            title={open ? 'Hide certificate' : 'View certificate'}
          >
            {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {/* Expandable certificate image */}
      {open && (
        <div className="cert-image-wrap">
          <img
            src={cert.image}
            alt={cert.title}
            className="cert-image"
          />
        </div>
      )}
    </div>
  );
}

export default function Certifications() {
  const { speak, highlightedId, isSpeaking } = useAI();

  return (
    <section className="section" id="certs">
      <div className="container">
        <h2 className="section-title">
          <span className="text-gradient">Certifications</span>
        </h2>
        <div className="certs-grid">
          {certs.map(cert => (
            <CertCard
              key={cert.id}
              cert={cert}
              isHighlighted={highlightedId === cert.id}
              speak={speak}
              isSpeaking={isSpeaking}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
