
import React, { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  developer: 'mayu' | 'hiro' | 'both';
}

const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "Our shared developer portfolio showcasing our projects and skills.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
    githubUrl: "https://github.com",
    liveUrl: "#",
    developer: "both"
  },
  {
    id: 2,
    title: "HEXRA.CLOUD",
    description: "A free and paid Minecraft server hosting and cheap VPS hosting service.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "AWS", "Docker"],
    githubUrl: "https://github.com",
    liveUrl: "https://hexra.cloud",
    developer: "mayu"
  },
  {
    id: 3,
    title: "HEXRA.CLOUD",
    description: "Backend infrastructure for Minecraft server hosting with containerization and VPS management.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
    tags: ["Node.js", "Express", "Docker", "Kubernetes", "AWS", "Infrastructure"],
    githubUrl: "https://github.com",
    liveUrl: "https://hexra.cloud",
    developer: "hiro"
  }
];

const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'mayu' | 'hiro' | 'both'>('all');
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.developer === filter);
  
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold mb-6 text-center gradient-text">Our Projects</h2>
        <p className="text-center mb-12 max-w-2xl mx-auto text-foreground/80">
          A showcase of our collaborative and individual work, bringing together frontend magic and backend wizardry.
        </p>
        
        {/* Filter buttons */}
        <div className="flex justify-center mb-12 space-x-4 flex-wrap">
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
            label="All Projects"
          />
          <FilterButton 
            active={filter === 'both'} 
            onClick={() => setFilter('both')}
            label="Collaborative"
          />
          <FilterButton 
            active={filter === 'mayu'} 
            onClick={() => setFilter('mayu')}
            label="Mayu's"
          />
          <FilterButton 
            active={filter === 'hiro'} 
            onClick={() => setFilter('hiro')}
            label="Hiro's"
          />
        </div>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ active, onClick, label }) => {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-full mb-2 transition-all duration-300 ${
        active 
          ? 'bg-gradient-to-r from-couple-rose-pink to-blue-400 text-white shadow-neon' 
          : 'bg-white/10 backdrop-blur-sm text-foreground border border-white/20'
      }`}
    >
      {label}
    </button>
  );
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [hovered, setHovered] = useState(false);
  
  const cardSpring = useSpring({
    transform: hovered ? 'scale(1.03) translateY(-10px)' : 'scale(1) translateY(0px)',
    boxShadow: hovered 
      ? '0 0 25px rgba(240, 181, 195, 0.5), 0 0 10px rgba(240, 181, 195, 0.3)'
      : '0 0 5px rgba(240, 181, 195, 0.3), 0 0 20px rgba(0, 0, 0, 0.1)',
    config: { tension: 300, friction: 20 }
  });
  
  return (
    <animated.div 
      style={cardSpring}
      className="glass-card glass-card-dark overflow-hidden group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{
            transform: hovered ? 'scale(1.1)' : 'scale(1)'
          }}
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="mb-4 flex justify-between items-start">
          <h3 className="text-xl font-semibold gradient-text">{project.title}</h3>
          <div className="flex space-x-2">
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="View source on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="View live project"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
        
        <p className="text-sm text-foreground/80 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="tech-badge text-xs">
              {tag}
            </span>
          ))}
        </div>
        
        {/* Developer indicator */}
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center">
          {project.developer === 'both' && (
            <>
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-couple-rose-pink to-purple-400"></div>
              <div className="w-6 h-6 -ml-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300"></div>
              <span className="ml-2 text-xs text-foreground/70">Mayu & Hiro</span>
            </>
          )}
          {project.developer === 'mayu' && (
            <>
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-couple-rose-pink to-purple-400"></div>
              <span className="ml-2 text-xs text-foreground/70">Mayu</span>
            </>
          )}
          {project.developer === 'hiro' && (
            <>
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300"></div>
              <span className="ml-2 text-xs text-foreground/70">Hiro</span>
            </>
          )}
        </div>
      </div>
    </animated.div>
  );
};

export default ProjectsSection;
