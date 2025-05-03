
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

const LoadingAnimation: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loading screen after 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500"
      style={{ 
        opacity: loading ? '1' : '0',
        pointerEvents: loading ? 'auto' : 'none'
      }}
    >
      <div className="flex flex-col items-center">
        <div className="relative">
          <Heart className="w-16 h-16 text-couple-rose-pink animate-pulse" />
          <div className="absolute inset-0 bg-white/20 blur-xl rounded-full"></div>
        </div>
        <h1 className="mt-6 text-2xl font-bold gradient-text">Mayu & Hiro</h1>
        <div className="mt-4 w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-couple-rose-pink rounded-full"
            style={{ 
              width: '100%',
              animation: 'loading 2s ease-in-out'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
