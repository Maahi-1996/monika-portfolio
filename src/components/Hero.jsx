import React from 'react';
import { useAI } from '../context/AIContext';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const { speak, isSpeaking, highlightedId } = useAI();
  const heroText = "Hi, I am Monika Bhivarkar, a Senior QA Engineer with over 3 years of experience in Automation, API, UI, Database, and Performance Testing. I specialize in building scalable test automation frameworks and validating AI-driven platforms to deliver zero-defect releases.";

  return (
    <section className="section hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I'm <span className="text-gradient">Monika Bhivarkar</span>
          </h1>
          <h2 className="hero-subtitle">Senior QA Engineer</h2>
          
          <p className="hero-description">
            Expert in building scalable test automation frameworks, validating AI-driven platforms (LLMs, Gemini), and ensuring high-quality, zero-defect resilient software releases.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={() => document.getElementById('contact').scrollIntoView()}>
              Get in Touch
            </button>
            <button className="btn-ai" onClick={() => speak(heroText, 'hero')}>
              {(isSpeaking && highlightedId === 'hero') ? <Volume2 size={18} /> : <VolumeX size={18} />} AI Introduction
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
