import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  pulse: number; // For pulsing effect
  pulseSpeed: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const isDrawingRef = useRef(true);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const mouseActiveRef = useRef(false);

  // Create particles on component mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      mouseActiveRef.current = true;
      
      // Create a few particles at mouse position for a trail effect
      if (Math.random() > 0.7) {
        for (let i = 0; i < 2; i++) {
          addParticleAtMouse();
        }
      }
    };
    
    // Add particle at mouse position
    const addParticleAtMouse = () => {
      if (!canvas) return;
      
      // Colors matching our theme
      const colors = [
        '#f0b5c3', // rose pink
        '#6D9EC5', // sky blue
        '#A0789C', // warm purple
        '#f3d3cc', // sunset beige
      ];
      
      particlesRef.current.push({
        x: mousePositionRef.current.x,
        y: mousePositionRef.current.y,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.2,
        pulse: Math.random() * Math.PI,
        pulseSpeed: 0.02 + Math.random() * 0.02
      });
      
      // Keep particle count manageable
      if (particlesRef.current.length > 200) {
        particlesRef.current.shift();
      }
    };
    
    const handleMouseLeave = () => {
      mouseActiveRef.current = false;
    };

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.05), 100); // Responsive particle count
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: getRandomColor(),
          alpha: Math.random() * 0.5 + 0.1,
          pulse: Math.random() * Math.PI,
          pulseSpeed: 0.01 + Math.random() * 0.01
        });
      }
    };

    const getRandomColor = () => {
      const colors = [
        '#f0b5c3', // rose pink
        '#6D9EC5', // sky blue
        '#A0789C', // warm purple
        '#f3d3cc', // sunset beige
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    // Draw particles
    const drawParticles = () => {
      if (!isDrawingRef.current) return;
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw each particle
      particlesRef.current.forEach((particle, i) => {
        // Move particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Pulsing effect
        particle.pulse += particle.pulseSpeed;
        const pulseFactor = Math.sin(particle.pulse) * 0.5 + 0.5;
        const size = particle.size * (1 + pulseFactor * 0.3);

        // Bounce off edges
        if (particle.x > canvas.width || particle.x < 0) {
          particle.speedX *= -1;
        }
        if (particle.y > canvas.height || particle.y < 0) {
          particle.speedY *= -1;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        
        // Create a glow effect with gradient
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, size * 2
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw connections
        connectParticles(particle, i);
      });

      requestAnimationFrame(drawParticles);
    };

    // Connect particles with lines if they're close enough
    const connectParticles = (particle: Particle, index: number) => {
      if (!ctx) return;
      
      const maxDistance = 150; // Max distance to draw a line
      
      for (let i = index + 1; i < particlesRef.current.length; i++) {
        const otherParticle = particlesRef.current[i];
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          // Calculate opacity based on distance
          const opacity = 1 - (distance / maxDistance);
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(240, 181, 195, ${opacity * 0.5})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      }

      // Connect to mouse if nearby and mouse is active
      if (mouseActiveRef.current) {
        const dx = particle.x - mousePositionRef.current.x;
        const dy = particle.y - mousePositionRef.current.y;
        const mouseDistance = Math.sqrt(dx * dx + dy * dy);
        
        if (mouseDistance < maxDistance * 1.5) {
          const opacity = 1 - (mouseDistance / (maxDistance * 1.5));
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(240, 181, 195, ${opacity * 0.8})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mousePositionRef.current.x, mousePositionRef.current.y);
          ctx.stroke();
          
          // Attract particles slightly to cursor
          if (mouseDistance > 5) { // Avoid extreme attraction
            particle.speedX += (mousePositionRef.current.x - particle.x) * 0.0005;
            particle.speedY += (mousePositionRef.current.y - particle.y) * 0.0005;
            
            // Limit speed
            const maxSpeed = 2;
            const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
            if (currentSpeed > maxSpeed) {
              particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
              particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
            }
          }
        }
      }
    };

    // Set up and start animation
    resizeCanvas();
    initParticles();
    drawParticles();

    // Add event listeners
    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Clean up
    return () => {
      isDrawingRef.current = false;
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
    />
  );
};

export default ParticleBackground;
