
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
    
    // Set favicon to "HM"
    const link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (link) {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, 64, 64);
        gradient.addColorStop(0, '#f0b5c3');
        gradient.addColorStop(1, '#6D9EC5');
        
        // Draw background
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
        
        // Draw text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 32px Inter, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('HM', 32, 32);
        
        // Apply glow effect
        ctx.shadowColor = '#f0b5c3';
        ctx.shadowBlur = 10;
        ctx.fillText('HM', 32, 32);
        
        // Update favicon
        link.href = canvas.toDataURL();
      }
    }
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
