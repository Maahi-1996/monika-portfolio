import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

const AIContext = createContext();

/* ── Abbreviation map: expands acronyms so TTS reads letter-by-letter ── */
const ABBR_MAP = [
  [/\bHyrAI\b/g, 'Hire A I'],
  [/\bHireAI\b/g, 'Hire A I'],
  [/\bAI\b/g, 'A I'],
  [/\bAPI[sS]?\b/g, (m) => m.toLowerCase().endsWith('s') ? 'A P I s' : 'A P I'],
  [/\bQA\b/g, 'Q A'],
  [/\bSQL\b/g, 'S Q L'],
  [/\bMCQ\b/g, 'M C Q'],
  [/\bCET\b/g, 'C E T'],
  [/\bNEET\b/g, 'N E E T'],
  [/\bJEE\b/g, 'J E E'],
  [/\bIBM\b/g, 'I B M'],
  [/\bCADM\b/g, 'Cadam'],
  [/\bAT&T\b/g, 'A T and T'],
  [/\bHR\b/g, 'H R'],
  [/\bJDAC\b/g, 'J D A C'],
  [/\bJIRA\b/g, 'Jira'],
  // Strip any leftover dot-separated letters (e.g. A.I. → A I)
  [/\b([A-Z])\.(([A-Z])\.)+/g, (m) => m.replace(/\./g, ' ').trim()],
];

function preprocessText(raw) {
  let t = raw;
  for (const [pattern, replacement] of ABBR_MAP) {
    t = t.replace(pattern, replacement);
  }
  return t;
}

/* ── Full portfolio narration script (section by section) ── */
const PORTFOLIO_TOUR = [
  { text: "Hi! I am Monika Bhivarkar, a Senior QA Engineer with over 3 years of experience in Automation, AI, UI, and Database testing and performance testing. I specialise in building scalable test automation frameworks and validating AI-driven platforms to deliver zero defect releases.", sectionId: "top" },
  { text: "In my professional career I have worked across exciting domains — AI and HR Tech, EdTech, Telecommunications, and Creator Economy. Let me walk you through my experience.", sectionId: "top" },
  { text: "At SkillJourney LLP in Pune, I was promoted to Senior QA Engineer in June 2025. I lead quality assurance across four major products.", sectionId: "experience", highlightId: "exp-1" },
  { text: "My first project is Career Journey — an Education platform. I built Robot Framework automation suites that improved test stability from 70 to 90 percent and created over 150 comprehensive test cases.", sectionId: "proj-0", highlightId: "proj-0" },
  { text: "My second project is Oye Creators — a brand and creator collaboration marketplace. I executed QA across web, mobile, and backend APIs, testing campaign workflows and creator onboarding.", sectionId: "proj-1", highlightId: "proj-1" },
  { text: "Third is Future Bridge — a college recommendation system. I tested its rule-based logic for CET, NEET, and JEE admissions, validated data extraction pipelines and recommendation accuracy.", sectionId: "proj-2", highlightId: "proj-2" },
  { text: "Fourth is HyrAI — an AI Interview Platform using Gemini. I led end-to-end QA including resume screening, MCQ generation, coding assessments, proctoring logic, and video analysis.", sectionId: "proj-3", highlightId: "proj-3" },
  { text: "Before SkillJourney, I worked at IBM India as a Test Specialist on the CADM project for AT&T — a complex telecom billing system. I designed 150 plus test cases and achieved zero production incidents.", sectionId: "proj-4", highlightId: "proj-4" },
  { text: "In terms of technical skills, I work with Selenium WebDriver, Robot Framework, TestNG, Python, and Java for test automation.", sectionId: "skills", highlightId: "skill-0" },
  { text: "For API and database testing I use Postman, Insomnia, Swagger, REST APIs, SQL, MongoDB, and PostgreSQL.", sectionId: "skills", highlightId: "skill-1" },
  { text: "For DevOps and Tools, my stack includes Azure DevOps, JIRA, Git, Kubernetes, and Linux environments.", sectionId: "skills", highlightId: "skill-2" },
  { text: "I hold a Java Developer Associate Certification (JDAC 24), validating my proficiency in Java programming fundamentals and object-oriented design.", sectionId: "cert-0", highlightId: "cert-0" },
  { text: "I completed a Selenium Automation Workshop that covered practical end-to-end automation techniques and scalable framework design patterns.", sectionId: "cert-1", highlightId: "cert-1" },
  { text: "I am currently open to new opportunities!", sectionId: "top", highlightId: "nav-badge" },
  { text: "Feel free to reach out to me for opportunities. You can connect with me directly on LinkedIn,", sectionId: "contact", highlightId: "contact-linkedin", pauseAfter: 100 },
  { text: "via email,", sectionId: "contact", highlightId: "contact-email", pauseAfter: 100 },
  { text: "or message me on WhatsApp. Thank you so much for exploring my portfolio!", sectionId: "contact", highlightId: "contact-whatsapp" },
];

export function AIProvider({ children }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);
  const [highlightedId, setHighlightedId] = useState(null);
  const synthRef = useRef(window.speechSynthesis);
  const voicesRef = useRef([]);
  const tourIdx = useRef(0);
  const activeRef = useRef(false); // tracks whether tour should continue

  useEffect(() => {
    const load = () => { voicesRef.current = window.speechSynthesis.getVoices(); };
    load();
    window.speechSynthesis.addEventListener('voiceschanged', load);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', load);
  }, []);

  const pickVoice = () => {
    const vs = voicesRef.current;
    if (!vs || vs.length === 0) return null;

    // 1. Microsoft Heera (Windows Indian Female)
    let voice = vs.find(v => v.name.includes('Heera'));
    if (voice) return voice;

    // 2. Google UK English Female / Google US English (Very clear on Chrome Desktop)
    voice = vs.find(v => v.name === 'Google UK English Female');
    if (voice) return voice;
    voice = vs.find(v => v.name === 'Google US English');
    if (voice) return voice;

    // 3. Microsoft Zira or Aria (Windows standard female)
    voice = vs.find(v => v.name.includes('Zira') || v.name.includes('Aria'));
    if (voice) return voice;

    // 4. Android Network Voices (Cloud-based, very natural high-quality human voices)
    voice = vs.find(v => v.lang.startsWith('en') && v.name.includes('network'));
    if (voice) return voice;

    // 5. Any English Female voice
    voice = vs.find(v => v.lang.startsWith('en') && /female/i.test(v.name));
    if (voice) return voice;

    // 6. Safe standard English voices (avoids robotic default OEM voices like Samsung TTS)
    voice = vs.find(v => v.lang === 'en-US' || v.lang === 'en-GB');
    if (voice) return voice;

    // 7. Absolute fallback
    return vs.find(v => v.lang.startsWith('en')) || vs[0];
  };

  /* ── Speak a single segment and auto-scroll to its section ── */
  const speakSegment = useCallback((segment, onDone) => {
    if (!activeRef.current) return;

    const text = typeof segment === 'string' ? segment : segment.text;
    const targetId = typeof segment === 'string' ? null : (segment.highlightId || segment.sectionId);
    const highlightId = typeof segment === 'string' ? null : segment.highlightId;

    if (highlightId) setHighlightedId(highlightId);
    else setHighlightedId(null);

    // Scroll routing:
    // - proj-*  → ProjectCard component owns scroll (skipped here)
    // - cert-*  → CertCard component owns scroll (skipped here)
    // - skill-0 → scroll to the #skills SECTION (all 3 skill cards are same horizontal row)
    // - skill-1/2 → already in view from skill-0 scroll, skip
    // - everything else → navbar-offset scroll at 300ms (settled page, no mid-animation error)
    if (targetId && !/^proj-/.test(targetId) && !/^cert-/.test(targetId)) {
      if (targetId === 'top' || targetId === 'nav-badge') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (targetId === 'skill-0') {
        // Scroll to the skills section heading so all skill cards are visible
        const section = document.getElementById('skills');
        if (section) {
          setTimeout(() => {
            const isMobile = window.innerWidth <= 1024;
            const navbarOffset = isMobile ? (document.querySelector('.navbar')?.offsetHeight || 80) + 10 : 80;
            const top = section.getBoundingClientRect().top + window.scrollY - navbarOffset;
            window.scrollTo({ top, behavior: 'smooth' });
          }, 300);
        }
      } else if (/^skill-/.test(targetId)) {
        const isMobile = window.innerWidth <= 1024;
        if (isMobile) {
          const el = document.getElementById(targetId);
          if (el) {
            setTimeout(() => {
              const navbarOffset = (document.querySelector('.navbar')?.offsetHeight || 80) + 10;
              const top = el.getBoundingClientRect().top + window.scrollY - navbarOffset;
              window.scrollTo({ top, behavior: 'smooth' });
            }, 300);
          }
        }
        // If desktop, skill-1 and skill-2 are in the same horizontal row as skill-0 → no scroll needed
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          setTimeout(() => {
            const isMobile = window.innerWidth <= 1024;
            const navbarOffset = isMobile ? (document.querySelector('.navbar')?.offsetHeight || 80) + 10 : 80;
            const top = el.getBoundingClientRect().top + window.scrollY - navbarOffset;
            window.scrollTo({ top, behavior: 'smooth' });
          }, 300);
        }
      }
    }

    const u = new SpeechSynthesisUtterance(preprocessText(text));
    const voice = pickVoice();
    if (voice) u.voice = voice;

    // Adjust rate for mobile to prevent distortion, keep pitch at 1.0 for natural human tone
    const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
    u.rate = isMobile ? 1.3 : 1.7;
    u.pitch = 1.0;
    u.volume = 1;
    u.onend = () => { if (activeRef.current) onDone(); };
    u.onerror = onDone;
    synthRef.current.speak(u);
  }, []);

  /* ── Auto-tour: speak each segment in sequence ── */
  const runTour = useCallback(() => {
    if (!activeRef.current) return;
    const idx = tourIdx.current;
    if (idx >= PORTFOLIO_TOUR.length) {
      // Loop back to start
      tourIdx.current = 0;
      activeRef.current = false;
      setIsSpeaking(false);
      setIsTourActive(false);
      setHighlightedId(null);
      return;
    }
    setIsSpeaking(true);
    speakSegment(PORTFOLIO_TOUR[idx], () => {
      tourIdx.current = idx + 1;
      setIsSpeaking(false);
      const pause = PORTFOLIO_TOUR[idx]?.pauseAfter ?? 600;
      setTimeout(() => runTour(), pause);
    });
  }, [speakSegment]);

  /* ── start tour ── */
  const startTour = useCallback(() => {
    synthRef.current.cancel();
    tourIdx.current = 0;
    activeRef.current = true;
    setIsTourActive(true);
    setTimeout(runTour, 200);
  }, [runTour]);

  /* ── stop tour ── */
  const stopTour = useCallback(() => {
    activeRef.current = false;
    synthRef.current.cancel();
    setIsSpeaking(false);
    setIsTourActive(false);
    setHighlightedId(null);
  }, []);

  /* ── toggle on double-click ── */
  const toggleTour = useCallback(() => {
    if (isTourActive) stopTour();
    else startTour();
  }, [isTourActive, startTour, stopTour]);

  /* ── one-shot speak (for individual section buttons) ── */
  const speak = useCallback((text, id = null) => {
    // If it's already speaking the SAME button, clicking it acts as an "OFF" switch
    if (isSpeaking && highlightedId === id) {
      activeRef.current = false;
      synthRef.current.cancel();
      setIsTourActive(false);
      setIsSpeaking(false);
      setHighlightedId(null);
      return;
    }

    // Otherwise, start speaking (and cancel anything else currently playing)
    activeRef.current = false;
    synthRef.current.cancel();
    setIsTourActive(false);

    if (id) {
      setHighlightedId(id);
    } else {
      setHighlightedId(null);
    }

    setTimeout(() => {
      activeRef.current = true;
      setIsSpeaking(true);
      const u = new SpeechSynthesisUtterance(preprocessText(text));
      const voice = pickVoice();
      if (voice) u.voice = voice;

      const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
      u.rate = isMobile ? 1.3 : 1.7;
      u.pitch = 1.0;
      u.volume = 1;
      u.onend = u.onerror = () => {
        activeRef.current = false;
        setIsSpeaking(false);
        setHighlightedId(null);
      };
      synthRef.current.speak(u);
    }, 100);
  }, [highlightedId]);

  const stopSpeaking = useCallback(() => {
    activeRef.current = false;
    synthRef.current.cancel();
    setIsSpeaking(false);
    setIsTourActive(false);
    setHighlightedId(null);
  }, []);

  return (
    <AIContext.Provider value={{ speak, stopSpeaking, isSpeaking, isTourActive, startTour, stopTour, toggleTour, highlightedId }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAI() { return useContext(AIContext); }
