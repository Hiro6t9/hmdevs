
import { useState, useEffect } from 'react';
import { Heart, Sun, Moon } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check system preference or saved preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (prefersDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsAnimating(true);
    
    // Toggle theme with animation
    setTimeout(() => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', newTheme);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 500); // Animation duration
    }, 300); // Delay before changing theme
  };

  // Animation for the button
  const buttonSpring = useSpring({
    transform: isAnimating ? 'scale(1.2)' : 'scale(1)',
    config: { tension: 300, friction: 10 }
  });

  // Animation for the icon
  const iconSpring = useSpring({
    rotateZ: isAnimating ? 180 : 0,
    opacity: isAnimating ? 0.5 : 1,
    config: { tension: 300, friction: 15 }
  });

  return (
    <animated.button
      onClick={toggleTheme}
      style={buttonSpring}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/10 backdrop-blur-lg 
                border border-white/20 shadow-glass transition-all duration-300 
                hover:shadow-neon flex items-center justify-center"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <animated.div style={iconSpring}>
        {isAnimating ? (
          <Heart className="w-5 h-5 text-couple-rose-pink" />
        ) : theme === 'light' ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-blue-400" />
        )}
      </animated.div>
    </animated.button>
  );
};

export default ThemeToggle;
