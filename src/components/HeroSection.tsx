
import React, { useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';

const HeroSection: React.FC = () => {
  const nameRef = useRef<HTMLDivElement>(null);
  
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 2800,
    config: { tension: 280, friction: 60 }
  });

  const fadeInButton = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 3200,
    config: { tension: 280, friction: 60 }
  });

  const heartBeat = useSpring({
    from: { transform: 'scale(1)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'scale(1.3)' });
        await next({ transform: 'scale(1)' });
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    },
    config: { tension: 300, friction: 10 }
  });
  
  useEffect(() => {
    // Simple effect to create a "typing" animation for the names
    if (nameRef.current) {
      const text = nameRef.current.innerText;
      nameRef.current.innerText = "";
      
      let i = 0;
      const typeInterval = setTimeout(() => {
        const typeAnimation = setInterval(() => {
          if (i < text.length) {
            nameRef.current!.innerText += text.charAt(i);
            i++;
          } else {
            clearInterval(typeAnimation);
          }
        }, 100);
        
        return () => clearInterval(typeAnimation);
      }, 2500); // Start typing after loading animation
      
      return () => clearTimeout(typeInterval);
    }
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative py-20 px-4 bg-couple-midnight-black">
      {/* Main Hero Content */}
      <div className="text-center max-w-4xl mx-auto z-10 mt-20">
        <animated.div style={fadeIn}>
          <div className="mb-6 flex justify-center">
            <img 
              src="/lovable-uploads/8a8a2230-86a1-4492-892d-99bf8ba7c6b0.png" 
              alt="Lovable Logo" 
              className="w-24 h-24 object-contain"
            />
          </div>
          
          <div 
            ref={nameRef}
            className="text-5xl md:text-7xl font-bold mb-6 text-white"
          >
            lovable
          </div>
          
          <h2 className="text-2xl md:text-3xl mb-8 text-white font-medium">
            Your superhuman full stack engineer.
          </h2>
          
          <div className="max-w-md mx-auto glass-card backdrop-blur-2xl p-6 mb-10 border border-white/20 shadow-glass">
            <p className="text-lg text-white/90">
              Idea to app in seconds.
            </p>
          </div>
        </animated.div>
        
        <animated.div style={fadeInButton}>
          <div className="relative mt-6">
            <div className="flex items-center bg-gray-800/80 border border-gray-700 rounded-full px-4 py-3 w-full max-w-md mx-auto">
              <input 
                type="text" 
                placeholder="What are you building next?"
                className="bg-transparent border-none flex-1 text-white focus:outline-none px-2"
              />
              <div className="bg-gray-900 rounded-full p-2 hover:bg-gray-800 transition-colors cursor-pointer">
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </animated.div>
      </div>

      {/* Scroll indicator */}
      <animated.div 
        style={fadeInButton}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <div className="w-6 h-10 rounded-full border-2 border-couple-rose-pink/50 flex items-start justify-center">
          <div className="w-1.5 h-1.5 bg-couple-rose-pink rounded-full mt-2 animate-float-up"></div>
        </div>
      </animated.div>
    </section>
  );
};

export default HeroSection;
