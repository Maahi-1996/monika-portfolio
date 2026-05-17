import React, { useState, useEffect } from 'react';
import { useAI } from '../context/AIContext';
import { Volume2, VolumeX, Briefcase, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import './Experience.css';

const experiences = [
  {
    id: 1,
    role: 'Senior QA Engineer',
    company: 'SkillJourney LLP, Pune',
    period: 'June 2024 – Present',
    promoted: 'Promoted from QA Engineer → Senior QA Engineer in June 2025',
    color: '#06b6d4',
    aiText: 'At SkillJourney LLP I was promoted to Senior QA Engineer in June 2025. I lead end-to-end quality assurance across multiple products — an AI Interview platform, an Education Tech platform, a college recommendation system, and an influencer marketing marketplace.',
    projects: [
      {
        globalProjId: 'proj-0',
        name: '🎓 Career Journey – Education Platform',
        domain: 'EdTech | June 2024 – Present',
        points: [
          'Built and maintained Robot Framework automation suites, improving test stability from 70% to 90%.',
          'Designed end-to-end test strategy covering UI, API, and database layers for microservices architecture.',
          'Created 150+ test cases achieving comprehensive functional and non-functional coverage.',
          'Reduced release cycle time through optimised regression testing and CI/CD integration.',
        ],
        tech: ['Selenium', 'Robot Framework', 'API Testing', 'CI/CD', 'Azure DevOps'],
        aiText: 'For Career Journey, an Education Technology platform, I built and maintained Robot Framework automation suites that improved test stability from 70 to 90 percent. I designed a full end-to-end test strategy across UI, A P I, and database layers and created over 150 test cases.',
      },
      {
        globalProjId: 'proj-1',
        name: '🎬 Oye Creators – Brand-Creator Collaboration Platform',
        domain: 'Creator Economy / Influencer Marketing | June 2024 – Present',
        points: [
          'Executed comprehensive QA across web, mobile app, and backend APIs for a brand-creator marketplace.',
          'Created and maintained detailed test cases from user stories for brand and creator personas.',
          'Performed cross-platform testing (web & mobile) and thorough regression testing pre-release.',
          'Validated campaign workflows, creator onboarding, collaboration features, and content lifecycle.',
          'Performed API validation and end-to-end testing across integrated third-party services.',
        ],
        tech: ['API Testing', 'Postman', 'Mobile Testing', 'Regression', 'JIRA'],
        aiText: 'Oye Creators is a brand-creator marketplace. I executed QA across web, mobile, and backend A P Is — testing campaign workflows, creator onboarding, cross-platform behavior, and all third-party integrations.',
      },
      {
        globalProjId: 'proj-2',
        name: '🏫 Future Bridge – College Recommendation System',
        domain: 'EdTech / Data-Driven | Jan 2025 – Present',
        points: [
          'Tested a rule-based college recommendation system using CET, NEET, and JEE percentages with cutoff trend analysis.',
          'Validated data extraction pipelines, prediction logic, and recommendation accuracy end-to-end.',
          'Designed test cases for admission probability workflows and edge-case data scenarios.',
          'Automated regression testing using Robot Framework; collaborated with clients on requirements.',
        ],
        tech: ['Robot Framework', 'Data Validation', 'MongoDB', 'Python', 'API Testing'],
        aiText: 'Future Bridge is a college recommendation system. I tested its rule-based logic using CET, NEET, and JEE percentages, validated data extraction pipelines and prediction accuracy, and designed edge-case scenarios for admission probabilities.',
      },
      {
        globalProjId: 'proj-3',
        name: '🤖 HyrAI – AI Interview Platform',
        domain: 'AI / HR Tech | Oct 2025 – Present',
        points: [
          'Led end-to-end QA for an AI-driven interview platform leveraging LLMs and Google Gemini.',
          'Validated resume screening, MCQ generation, coding assessments, and automated interview workflows.',
          'Tested AI-based video analysis, proctoring logic, and violation detection accuracy.',
          'Executed performance and scalability testing to ensure optimal response times under load.',
          'Built and maintained automated regression suites using Robot Framework; mentored QA team.',
          'Resolved production issues via client-facing troubleshooting and validation support.',
        ],
        tech: ['Robot Framework', 'LLMs', 'Google Gemini', 'Python', 'Performance Testing'],
        aiText: 'On the HyrAI project I led quality assurance for an AI-powered interview platform using Gemini. I validated resume screening, MCQ generation, coding assessments, video proctoring, and violation detection — building regression suites in Robot Framework and directly supporting clients.',
      },
    ],
  },
  {
    id: 2,
    role: 'Test Specialist',
    company: 'IBM India Pvt. Ltd., Pune',
    period: 'Feb 2022 – June 2023',
    promoted: null,
    color: '#6d28d9',
    aiText: 'At IBM India I worked as a Test Specialist on a critical A T and T telecom billing system. I performed manual and API testing, designed 150+ SIT test cases, and delivered zero production incidents across functional, regression, and non-functional testing cycles.',
    projects: [
      {
        globalProjId: 'proj-4',
        name: '📡 CADM – Customer Account Data Management (AT&T)',
        domain: 'Telecommunications',
        points: [
          'Performed Manual and API Testing using Postman for complex telecom billing systems (UP & legacy).',
          'Designed and executed 150+ end-to-end SIT test cases by analysing Software Requirements Specifications.',
          'Conducted Functional, Regression, and Non-Functional Testing across integrated middleware and legacy gateways.',
          'Validated service packages, billing offers, pricing components, and revenue management modules with zero production incidents.',
          'Managed defect lifecycle in I-Track and JIRA; prepared effort estimates and test coverage reports.',
          'Executed Unix commands for log analysis and backend verification in Linux environments.',
        ],
        tech: ['Postman', 'API Testing', 'SQL', 'Linux', 'JIRA', 'I-Track'],
        aiText: 'At IBM, I worked on CADM, the Customer Account Data Management system for AT&T. I handled API testing with Postman for complex telecom billing, designed over 150 system integration test cases from SRS documents, and achieved zero production incidents.',
      },
    ],
  },
];

function ProjectCard({ proj, speak, isHighlighted, isSpeaking }) {
  const [open, setOpen] = useState(false);
  const { isTourActive } = useAI();

  useEffect(() => {
    if (isTourActive && isHighlighted) {
      setOpen(true);
      // Wait for: previous card to close (200ms) + this card's expand animation (250ms) = 650ms total
      // Then scroll so card title sits just below the fixed navbar
      const t = setTimeout(() => {
        const isMobile = window.innerWidth <= 1024;
        const offset = isMobile ? (document.querySelector('.navbar')?.offsetHeight || 80) + 10 : 80;
        const el = document.getElementById(proj.globalProjId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 650);
      return () => clearTimeout(t);
    }
    if (isTourActive && !isHighlighted) {
      // Close quickly so the next card's scroll fires on a stable layout
      const t = setTimeout(() => setOpen(false), 200);
      return () => clearTimeout(t);
    }
  }, [isTourActive, isHighlighted, proj.globalProjId]);

  return (
    <div id={proj.globalProjId} className={`project-card ${isHighlighted ? 'active-glow' : ''}`}>
      <div className="proj-header" onClick={() => setOpen(!open)}>
        <div className="proj-title-row">
          <h4>{proj.name}</h4>
          <span className="proj-domain">{proj.domain}</span>
        </div>
        <div className="proj-actions">
          <button className="btn-ai small" onClick={e => { e.stopPropagation(); speak(proj.aiText, proj.globalProjId); }}>
             {(isSpeaking && isHighlighted) ? <Volume2 size={13} /> : <VolumeX size={13} />} AI Read
          </button>
          <button className="toggle-btn" aria-label="expand">
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="proj-body">
          <ul>
            {proj.points.map((pt, i) => <li key={i}>{pt}</li>)}
          </ul>
          <div className="tech-row">
            {proj.tech.map((t, i) => <span key={i} className="tech-badge">{t}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Experience() {
  const { speak, highlightedId, isSpeaking } = useAI();

  return (
    <section className="section" id="experience">
      <div className="container">
        <h2 className="section-title">
          Professional <span className="text-gradient">Experience</span>
        </h2>

        <div className="exp-timeline">
          {experiences.map(exp => (
            <div
              key={exp.id}
              id={`exp-${exp.id}`}
              className={`exp-block glass-card ${highlightedId === `exp-${exp.id}` ? 'active-glow' : ''}`}
            >
              {/* Company header */}
              <div className="exp-top">
                <div className="exp-left">
                  <div className="exp-dot" style={{ background: exp.color }} />
                  <div>
                    <h3 className="exp-role">{exp.role}</h3>
                    <p className="exp-company">{exp.company}</p>
                    {exp.promoted && <p className="exp-promoted">🚀 {exp.promoted}</p>}
                  </div>
                </div>
                <div className="exp-right">
                  <span className="exp-period"><Calendar size={13} /> {exp.period}</span>
                  <button className="btn-ai" onClick={() => speak(exp.aiText, `exp-${exp.id}`)}>
                    {(isSpeaking && highlightedId === `exp-${exp.id}`) ? <Volume2 size={14} /> : <VolumeX size={14} />} AI Explain
                  </button>
                </div>
              </div>

              {/* Projects */}
              <div className="projects-list">
                {exp.projects.map((proj, i) => (
                  <ProjectCard
                    key={i}
                    proj={proj}
                    speak={speak}
                    isHighlighted={highlightedId === proj.globalProjId}
                    isSpeaking={isSpeaking}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
