
import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import GradientBlobs from '../components/GradientBlobs';
import ThemeToggle from '../components/ThemeToggle';
import Navigation from '../components/Navigation';
import LoadingAnimation from '../components/LoadingAnimation';

const Index: React.FC = () => {
  useEffect(() => {
    document.title = 'Mayu & Hiro | Love & Code';
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <LoadingAnimation />
      <ParticleBackground />
      <GradientBlobs />
      <ThemeToggle />
      <Navigation />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
