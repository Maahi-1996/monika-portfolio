import React from 'react';
import { useAI } from '../context/AIContext';
import { Mail, MessageSquare, Volume2, VolumeX } from 'lucide-react';
import './Contact.css';

const LinkedinIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Contact() {
  const { speak, highlightedId, isSpeaking } = useAI();
  const contactAiText = "Feel free to reach out to me for opportunities. You can connect with me directly on LinkedIn, via email, or message me on WhatsApp.";

  return (
    <section className="section" id="contact">
      <div className="container contact-container">
        <div className="contact-header">
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <button className="btn-ai" onClick={() => speak(contactAiText, 'contact')}>
            {(isSpeaking && highlightedId === 'contact') ? <Volume2 size={18} /> : <VolumeX size={18} />} AI Guide
          </button>
        </div>

        <div className="contact-grid">
          <a
            href="https://linkedin.com/in/monika-bhivarkar-864354284"
            target="_blank" rel="noreferrer"
            id="contact-linkedin"
            className={`glass-card contact-card linkedin ${highlightedId === 'contact-linkedin' ? 'active-glow' : ''}`}
          >
            <div className="contact-icon-wrap">
              <LinkedinIcon size={32} />
            </div>
            <h3>LinkedIn</h3>
            <p>Connect professionally</p>
          </a>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=monika.bhivarkar1996@gmail.com"
            target="_blank" rel="noreferrer"
            id="contact-email"
            className={`glass-card contact-card email ${highlightedId === 'contact-email' ? 'active-glow' : ''}`}
          >
            <div className="contact-icon-wrap">
              <Mail size={32} />
            </div>
            <h3>Email</h3>
            <p>monika.bhivarkar1996@gmail.com</p>
          </a>

          <a
            href="https://wa.me/918308775936"
            target="_blank" rel="noreferrer"
            id="contact-whatsapp"
            className={`glass-card contact-card whatsapp ${highlightedId === 'contact-whatsapp' ? 'active-glow' : ''}`}
          >
            <div className="contact-icon-wrap">
              <MessageSquare size={32} />
            </div>
            <h3>WhatsApp</h3>
            <p>+91 8308775936</p>
          </a>
        </div>
      </div>
    </section>
  );
}
