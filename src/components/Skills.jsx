import React from 'react';
import { useAI } from '../context/AIContext';
import { Volume2, VolumeX, Code2, Cpu, Wrench } from 'lucide-react';
import './Skills.css';

const skillCategories = [
  {
    globalSkillId: 'skill-0',
    title: "Test Automation",
    icon: <Code2 size={24} />,
    skills: ["Selenium WebDriver", "Robot Framework", "TestNG", "Python", "Java"],
    aiText: "In Test Automation, I use Selenium WebDriver, Robot Framework, and TestNG with Python and Java to build scalable and robust testing frameworks."
  },
  {
    globalSkillId: 'skill-1',
    title: "API & Database",
    icon: <Cpu size={24} />,
    skills: ["Postman", "Insomnia", "Swagger", "REST APIs", "SQL", "MongoDB", "PostgreSQL"],
    aiText: "For API and database testing, I am highly proficient with Postman, Insomnia, Swagger for API documentation and testing, and complex SQL queries across PostgreSQL and MongoDB."
  },
  {
    globalSkillId: 'skill-2',
    title: "DevOps & Tools",
    icon: <Wrench size={24} />,
    skills: ["Azure DevOps", "JIRA", "Git", "Kubernetes", "Linux"],
    aiText: "My DevOps and tooling stack includes Azure DevOps, JIRA, Git, and foundational knowledge of Kubernetes and Linux environments."
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
