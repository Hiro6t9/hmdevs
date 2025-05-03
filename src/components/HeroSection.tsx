
import React, { useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const nameRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simple effect to create a "typing" animation for the names
    if (nameRef.current) {
      const text = nameRef.current.innerText;
      nameRef.current.innerText = "";
      
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          nameRef.current!.innerText += text.charAt(i);
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 100);
      
      return () => clearInterval(typeInterval);
    }
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative py-20 px-4">
      {/* Main Hero Content */}
      <div className="text-center max-w-4xl mx-auto z-10">
        <div 
          ref={nameRef}
          className="text-5xl md:text-7xl font-bold mb-8 gradient-text animate-glow-pulse"
        >
          Hiro &amp; Mayu
        </div>
        
        <div className="relative mb-6 flex justify-center">
          <Heart className="w-8 h-8 text-couple-rose-pink animate-heartbeat" />
        </div>
        
        <h2 className="text-xl md:text-2xl mb-8 text-foreground/80 font-light">
          Two hearts. <span className="font-medium text-couple-rose-pink">One codebase.</span>
        </h2>
        
        <div className="max-w-md mx-auto bg-white/5 backdrop-blur-md rounded-lg p-6 mb-10 border border-white/20 shadow-glass">
          <p className="text-lg">
            We build beautiful digital experiences with love and code.
          </p>
        </div>
        
        <Link 
          to="/about"
          className="inline-flex items-center justify-center bg-gradient-to-r from-couple-rose-pink to-blue-400
                     text-white py-3 px-8 rounded-full font-medium shadow-neon hover:shadow-neon-strong
                     transition-all duration-300 transform hover:scale-105"
        >
          Enter Our World
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-couple-rose-pink/50 flex items-start justify-center">
          <div className="w-1.5 h-1.5 bg-couple-rose-pink rounded-full mt-2 animate-float-up"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
