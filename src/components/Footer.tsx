
import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 px-4 relative bg-gradient-to-t from-background to-transparent">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center space-x-2 mb-4">
            <Heart className="w-4 h-4 text-couple-rose-pink" />
            <span className="text-sm gradient-text font-medium">Mayu & Hiro</span>
            <Heart className="w-4 h-4 text-couple-rose-pink" />
          </div>
          
          <p className="text-xs text-foreground/60 text-center">
            Designed and developed with love by Mayu & Hiro. Built with Vite, React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
