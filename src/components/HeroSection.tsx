
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
    <section className="min-h-screen flex flex-col justify-center items-center relative py-20 px-4">
      {/* Main Hero Content */}
      <div className="text-center max-w-4xl mx-auto z-10 mt-20">
        <animated.div style={fadeIn}>
          <div 
            ref={nameRef}
            className="text-5xl md:text-7xl font-bold mb-8 gradient-text animate-glow-pulse"
          >
            Hiro &amp; Mayu
          </div>
          
          <div className="relative mb-6 flex justify-center">
            <animated.div style={heartBeat}>
              <Heart className="w-12 h-12 text-couple-rose-pink drop-shadow-[0_0_15px_rgba(240,181,195,0.8)]" />
            </animated.div>
          </div>
          
          <h2 className="text-xl md:text-2xl mb-8 text-foreground/80 font-light bg-clip-text text-transparent bg-gradient-to-r from-white to-couple-rose-pink dark:from-white dark:to-couple-rose-pink">
            Two hearts. <span className="font-medium">One codebase.</span>
          </h2>
          
          <div className="max-w-md mx-auto glass-card backdrop-blur-2xl p-6 mb-10 border border-white/20 shadow-glass">
            <p className="text-lg">
              We build beautiful digital experiences with love and code.
            </p>
          </div>
        </animated.div>
        
        <animated.div style={fadeInButton}>
          <Link 
            to="/about"
            className="inline-flex items-center justify-center bg-gradient-to-r from-couple-rose-pink to-blue-400
                      text-white py-3 px-8 rounded-full font-medium shadow-neon hover:shadow-neon-strong
                      transition-all duration-300 transform hover:scale-110"
          >
            Enter Our World
          </Link>
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
