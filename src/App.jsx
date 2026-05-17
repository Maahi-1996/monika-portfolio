import React, { useEffect } from 'react';
import { AIProvider } from './context/AIContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';

function App() {
  /* Always scroll to top on page load / refresh */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <AIProvider>
      <Navbar />
      <main id="top">
        <Hero />
        <Experience />
        <Skills />
        <Certifications />
        <Contact />
      </main>
    </AIProvider>
  );
}

export default App;
