import React from 'react';
import { useAI } from '../context/AIContext';
import { Volume2, VolumeX, Code2, Cpu, Wrench, Layers } from 'lucide-react';
import './Skills.css';

const skillCategories = [
  {
    globalSkillId: 'skill-0',
    title: "Test Automation",
    icon: <Code2 size={24} />,
    skills: ["Selenium WebDriver", "Robot Framework", "TestNG", "Page Object Model", "Maven", "Python", "Java"],
    aiText: "In Test Automation, I use Selenium WebDriver, Robot Framework, and TestNG along with Page Object Model and Maven, using Python and Java to build scalable frameworks."
  },
  {
    globalSkillId: 'skill-1',
    title: "API & Database",
    icon: <Cpu size={24} />,
    skills: ["Postman", "REST Assured", "Swagger", "REST APIs", "JSON", "XML", "SQL", "MongoDB", "PostgreSQL", "Oracle"],
    aiText: "For API and database testing, I use Postman, REST Assured, and Swagger for APIs, handling JSON and XML. For databases, I write complex SQL queries across PostgreSQL, MongoDB, and Oracle."
  },
  {
    globalSkillId: 'skill-2',
    title: "DevOps & Tools",
    icon: <Wrench size={24} />,
    skills: ["Azure DevOps", "CI/CD Pipelines", "JIRA", "Git", "Kubernetes", "Linux"],
    aiText: "My DevOps and tooling stack includes Azure DevOps, continuous integration pipelines, JIRA, Git, Kubernetes, and Linux environments."
  },
  {
    globalSkillId: 'skill-3',
    title: "Testing Methodologies",
    icon: <Layers size={24} />,
    skills: ["Agile/Scrum", "SDLC & STLC", "BDD", "Functional & Regression", "End-to-End Testing", "API & Database Testing"],
    aiText: "My testing approach is rooted in Agile and Scrum methodologies, covering the full SDLC and STLC using BDD. I have extensive experience in functional, regression, API, database, and end-to-end testing."
  }
];

export default function Skills() {
  const { speak, highlightedId, isSpeaking } = useAI();

  return (
    <section className="section" id="skills">
      <div className="container">
        <h2 className="section-title">
          Technical <span className="text-gradient">Skills</span>
        </h2>
        
        <div className="skills-grid">
          {skillCategories.map((category, idx) => (
            <div 
              key={idx} 
              id={category.globalSkillId} 
              className={`glass-card skill-card ${highlightedId === category.globalSkillId ? 'active-glow' : ''}`}
            >
              <div className="skill-header">
                <div className="skill-icon-wrap">{category.icon}</div>
                <h3>{category.title}</h3>
                <button className="btn-ai icon-only" onClick={() => speak(category.aiText, category.globalSkillId)} title="AI Explain">
                  {(isSpeaking && highlightedId === category.globalSkillId) ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
              </div>
              <div className="skill-tags">
                {category.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

