
import React, { useEffect } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import GradientBlobs from '../components/GradientBlobs';
import ThemeToggle from '../components/ThemeToggle';
import Navigation from '../components/Navigation';
import ProjectsSection from '../components/ProjectsSection';
import Footer from '../components/Footer';

const Projects: React.FC = () => {
  useEffect(() => {
    document.title = 'Projects | Mayu & Hiro';
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <ParticleBackground />
      <GradientBlobs />
      <ThemeToggle />
      <Navigation />
      
      <main className="pt-20">
        <div className="container mx-auto max-w-6xl py-12 px-4">
          <h1 className="text-5xl font-bold mb-8 text-center gradient-text">Our Projects</h1>
          <p className="text-center mb-16 max-w-2xl mx-auto text-foreground/80">
            Explore our collaborative creations and individual works of passion.
          </p>
        </div>
        
        <ProjectsSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
