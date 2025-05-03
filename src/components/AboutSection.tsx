
import React, { useState } from 'react';
import { Calendar, Code, Sparkles, Coffee, Heart } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';

const AboutSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<'mayu' | 'hiro' | null>(null);
  
  const toggleCard = (card: 'mayu' | 'hiro') => {
    setActiveCard(activeCard === card ? null : card);
  };
  
  const mayuCardSpring = useSpring({
    scale: activeCard === 'mayu' ? 1.05 : activeCard === 'hiro' ? 0.95 : 1,
    opacity: activeCard === 'hiro' ? 0.8 : 1,
    config: { tension: 300, friction: 30 }
  });
  
  const hiroCardSpring = useSpring({
    scale: activeCard === 'hiro' ? 1.05 : activeCard === 'mayu' ? 0.95 : 1,
    opacity: activeCard === 'mayu' ? 0.8 : 1,
    config: { tension: 300, friction: 30 }
  });
  
  const heartSpring = useSpring({
    from: { rotate: 0 },
    to: async (next) => {
      while (true) {
        await next({ rotate: -15 });
        await next({ rotate: 15 });
      }
    },
    config: { duration: 1000, friction: 10 }
  });

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold mb-16 text-center gradient-text">About Us</h2>

        {/* Developer cards */}
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {/* Mayu's card */}
          <animated.div 
            style={mayuCardSpring}
            className="glass-card glass-card-dark p-6 md:w-80"
            onClick={() => toggleCard('mayu')}
          >
            <div className="text-center mb-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-couple-rose-pink to-purple-400 mb-4 shadow-[0_0_15px_rgba(240,181,195,0.5)]"></div>
              <h3 className="text-2xl font-bold gradient-text">Mayu</h3>
              <p className="text-foreground/70">Frontend Developer</p>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-foreground/80">
                Passionate about creating beautiful UI with meticulous attention to detail. 
                When not coding, you'll find me sketching UI designs and exploring new animation techniques.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="tech-badge">HTML</span>
              <span className="tech-badge">Vite</span>
              <span className="tech-badge">TypeScript</span>
              <span className="tech-badge">React</span>
              <span className="tech-badge">Tailwind CSS</span>
              <span className="tech-badge">shadcn/ui</span>
            </div>
          </animated.div>

          {/* Heart connector */}
          <div className="flex items-center justify-center -my-4 md:my-auto">
            <animated.div 
              style={heartSpring}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-couple-rose-pink to-purple-400 shadow-[0_0_15px_rgba(240,181,195,0.5)]"
            >
              <Heart className="w-6 h-6 text-white" />
            </animated.div>
          </div>
          
          {/* Hiro's card */}
          <animated.div 
            style={hiroCardSpring}
            className="glass-card glass-card-dark p-6 md:w-80"
            onClick={() => toggleCard('hiro')}
          >
            <div className="text-center mb-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 mb-4 shadow-[0_0_15px_rgba(109,158,197,0.5)]"></div>
              <h3 className="text-2xl font-bold gradient-text">Hiro</h3>
              <p className="text-foreground/70">Fullstack Developer</p>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-foreground/80">
                Building robust backends and elegant frontends. I enjoy solving complex problems 
                and optimizing performance. Coffee enthusiast and open-source contributor.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="tech-badge">Node.js</span>
              <span className="tech-badge">TypeScript</span>
              <span className="tech-badge">React</span>
              <span className="tech-badge">PostgreSQL</span>
              <span className="tech-badge">Docker</span>
              <span className="tech-badge">AWS</span>
            </div>
          </animated.div>
        </div>
        
        {/* Love quote */}
        <div className="mt-16 text-center max-w-xl mx-auto">
          <blockquote className="italic text-lg text-foreground/80">
            "We believe that the best code, like the best relationships, is built with care, 
            passion, and a deep understanding of each other's strengths."
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
