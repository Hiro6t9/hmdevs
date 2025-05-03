
import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const GradientBlobs: React.FC = () => {
  const blob1Spring = useSpring({
    from: { transform: 'translate(0%, 0%)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'translate(5%, 10%)' });
        await next({ transform: 'translate(-10%, 5%)' });
        await next({ transform: 'translate(8%, -8%)' });
        await next({ transform: 'translate(-5%, -5%)' });
        await next({ transform: 'translate(0%, 0%)' });
      }
    },
    config: { duration: 20000, friction: 120 }
  });
  
  const blob2Spring = useSpring({
    from: { transform: 'translate(0%, 0%)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'translate(-8%, -5%)' });
        await next({ transform: 'translate(10%, -8%)' });
        await next({ transform: 'translate(-5%, 10%)' });
        await next({ transform: 'translate(8%, 5%)' });
        await next({ transform: 'translate(0%, 0%)' });
      }
    },
    config: { duration: 25000, friction: 120 }
  });
  
  const blob3Spring = useSpring({
    from: { transform: 'translate(0%, 0%)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'translate(10%, -10%)' });
        await next({ transform: 'translate(-8%, 8%)' });
        await next({ transform: 'translate(5%, 5%)' });
        await next({ transform: 'translate(-5%, -8%)' });
        await next({ transform: 'translate(0%, 0%)' });
      }
    },
    config: { duration: 18000, friction: 120 }
  });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-2]">
      <animated.div 
        style={blob1Spring}
        className="blob blob-1 left-1/4 top-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(240,181,195,0.7)_0%,rgba(240,181,195,0)_70%)]"
      ></animated.div>
      <animated.div 
        style={blob2Spring}
        className="blob blob-2 right-1/4 bottom-1/3 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(109,158,197,0.7)_0%,rgba(109,158,197,0)_70%)]"
      ></animated.div>
      <animated.div 
        style={blob3Spring}
        className="blob blob-3 left-1/3 bottom-1/4 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(160,120,156,0.7)_0%,rgba(160,120,156,0)_70%)]"
      ></animated.div>
    </div>
  );
};

export default GradientBlobs;
