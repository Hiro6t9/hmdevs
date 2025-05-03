
import React, { useState } from 'react';
import { Calendar, Code, Sparkles, Coffee } from 'lucide-react';

const AboutSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<'mayu' | 'hiro' | null>(null);
  
  const toggleCard = (card: 'mayu' | 'hiro') => {
    setActiveCard(activeCard === card ? null : card);
  };
  
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold mb-16 text-center gradient-text">About Us</h2>
        
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center">Our Journey</h3>
          
          {/* Timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-couple-rose-pink to-blue-400"></div>
            
            {/* Timeline items */}
            <TimelineItem 
              icon={<Coffee className="w-5 h-5" />}
              title="First Meeting" 
              date="June 2023"
              side="left"
              description="We met at a web development conference where Mayu was presenting on React optimization techniques."
            />
            
            <TimelineItem 
              icon={<Code className="w-5 h-5" />}
              title="First Collaboration" 
              date="August 2023"
              side="right"
              description="We started working together on an open-source project, combining our frontend and backend expertise."
            />
            
            <TimelineItem 
              icon={<Sparkles className="w-5 h-5" />}
              title="Love Blossoms" 
              date="October 2023"
              side="left"
              description="After many late nights coding together, we realized our connection went beyond markup and functions."
            />
            
            <TimelineItem 
              icon={<Calendar className="w-5 h-5" />}
              title="Building Our Future" 
              date="Present"
              side="right"
              description="Now we're building our dreams together, one commit at a time, creating beautiful digital experiences."
            />
          </div>
        </div>

        {/* Developer cards */}
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {/* Mayu's card */}
          <div 
            className={`glass-card glass-card-dark p-6 md:w-80 transition-all duration-500 ${
              activeCard === 'mayu' ? 'md:w-96 shadow-neon' : activeCard === 'hiro' ? 'md:w-72 opacity-80' : ''
            }`}
            onClick={() => toggleCard('mayu')}
          >
            <div className="text-center mb-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-couple-rose-pink to-purple-400 mb-4"></div>
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
          </div>

          {/* Heart connector */}
          <div className="flex items-center justify-center -my-4 md:my-auto">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-couple-rose-pink to-purple-400">
              <Heart className="w-5 h-5 text-white animate-heartbeat" />
            </div>
          </div>
          
          {/* Hiro's card */}
          <div 
            className={`glass-card glass-card-dark p-6 md:w-80 transition-all duration-500 ${
              activeCard === 'hiro' ? 'md:w-96 shadow-neon' : activeCard === 'mayu' ? 'md:w-72 opacity-80' : ''
            }`}
            onClick={() => toggleCard('hiro')}
          >
            <div className="text-center mb-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 mb-4"></div>
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
          </div>
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

interface TimelineItemProps {
  icon: React.ReactNode;
  title: string;
  date: string;
  side: 'left' | 'right';
  description: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ icon, title, date, side, description }) => {
  return (
    <div className={`relative flex items-center ${side === 'left' ? 'justify-end md:justify-start' : 'justify-end'} mb-12`}>
      <div className={`w-full md:w-5/12 ${side === 'right' ? 'md:ml-auto' : ''}`}>
        <div className="p-5 glass-card glass-card-dark">
          <h4 className="font-semibold text-lg mb-1">{title}</h4>
          <p className="text-sm text-foreground/60 mb-3">{date}</p>
          <p className="text-sm text-foreground/80">{description}</p>
        </div>
      </div>
      
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-couple-rose-pink to-blue-400 border-4 border-background flex items-center justify-center shadow-neon z-10">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
