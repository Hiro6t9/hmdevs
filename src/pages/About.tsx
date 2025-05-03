
import React, { useEffect } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import GradientBlobs from '../components/GradientBlobs';
import ThemeToggle from '../components/ThemeToggle';
import Navigation from '../components/Navigation';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';

const About: React.FC = () => {
  useEffect(() => {
    document.title = 'About Us | Mayu & Hiro';
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <ParticleBackground />
      <GradientBlobs />
      <ThemeToggle />
      <Navigation />
      
      <main className="pt-20">
        <div className="container mx-auto max-w-6xl py-12 px-4">
          <h1 className="text-5xl font-bold mb-8 text-center gradient-text">About Us</h1>
          <p className="text-center mb-16 max-w-2xl mx-auto text-foreground/80">
            Get to know the developers behind the code. A love story written in code.
          </p>
        </div>
        
        <AboutSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
