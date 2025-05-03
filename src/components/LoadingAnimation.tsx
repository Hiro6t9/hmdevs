
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';

const LoadingAnimation: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Animated progress value
  const progressAnimation = useSpring({
    width: `${progress}%`,
    from: { width: '0%' },
    config: { tension: 120, friction: 14 }
  });

  // Fade animation for the whole component
  const fadeAnimation = useSpring({
    opacity: loading ? 1 : 0,
    transform: loading ? 'translateY(0)' : 'translateY(-50px)',
    config: { tension: 280, friction: 60 }
  });

  // Heartbeat animation for the heart icon
  const heartAnimation = useSpring({
    from: { scale: 1 },
    to: async (next) => {
      while (loading) {
        await next({ scale: 1.3 });
        await next({ scale: 1 });
      }
    },
    config: { tension: 300, friction: 10 }
  });

  // Simulated loading progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (loading) {
      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + 5;
          if (next >= 100) {
            clearInterval(interval);
            // Slight delay before hiding the loader after reaching 100%
            setTimeout(() => setLoading(false), 500);
            return 100;
          }
          return next;
        });
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading]);

  if (!loading) return null;

  return (
    <animated.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      style={fadeAnimation}
    >
      <div className="flex flex-col items-center">
        <div className="relative">
          <animated.div style={heartAnimation}>
            <Heart className="w-20 h-20 text-couple-rose-pink drop-shadow-[0_0_15px_rgba(240,181,195,0.8)]" />
          </animated.div>
          <div className="absolute inset-0 bg-white/20 blur-xl rounded-full"></div>
        </div>
        
        <div className="mt-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold gradient-text mb-4">Mayu & Hiro</h1>
          <p className="text-sm text-foreground/70 mb-4 italic">Two hearts. One codebase.</p>
          
          <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mt-4">
            <animated.div 
              className="h-full bg-gradient-to-r from-couple-rose-pink to-purple-400 rounded-full"
              style={progressAnimation}
            />
          </div>
          <p className="mt-2 text-xs text-foreground/50">{`${Math.round(progress)}%`}</p>
        </div>
      </div>
    </animated.div>
  );
};

export default LoadingAnimation;
