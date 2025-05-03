
import React from 'react';
import { Github, Twitter, Mail, Send, Coffee, Heart } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold mb-6 text-center gradient-text">Get In Touch</h2>
        <p className="text-center mb-12 max-w-2xl mx-auto text-foreground/80">
          We're always open to new opportunities, collaborations, or just a friendly chat about web development.
        </p>
        
        {/* Contact form */}
        <div className="max-w-2xl mx-auto glass-card glass-card-dark p-8 mb-16">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 focus:border-couple-rose-pink focus:outline-none focus:ring-1 focus:ring-couple-rose-pink transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 focus:border-couple-rose-pink focus:outline-none focus:ring-1 focus:ring-couple-rose-pink transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 focus:border-couple-rose-pink focus:outline-none focus:ring-1 focus:ring-couple-rose-pink transition-colors"
                placeholder="What's this about?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea 
                rows={5}
                className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 focus:border-couple-rose-pink focus:outline-none focus:ring-1 focus:ring-couple-rose-pink transition-colors"
                placeholder="Your message here..."
              ></textarea>
            </div>
            <button 
              type="submit"
              className="inline-flex items-center justify-center bg-gradient-to-r from-couple-rose-pink to-blue-400
                       text-white py-3 px-8 rounded-md font-medium shadow-neon hover:shadow-neon-strong
                       transition-all duration-300 transform hover:scale-105 w-full"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </button>
          </form>
        </div>
        
        {/* Social links */}
        <div className="flex justify-center space-x-6 mb-16">
          <SocialLink href="https://github.com" icon={<Github />} label="GitHub" />
          <SocialLink href="https://twitter.com" icon={<Twitter />} label="Twitter" />
          <SocialLink href="mailto:contact@mayuandhiro.dev" icon={<Mail />} label="Email" />
        </div>
        
        {/* Footer */}
        <div className="text-center text-foreground/60 mt-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Coffee className="w-4 h-4" />
            <span className="text-sm">+</span>
            <Heart className="w-4 h-4 text-couple-rose-pink" />
            <span className="text-sm">=</span>
            <code className="text-sm font-mono bg-white/10 px-2 py-1 rounded">&lt;code /&gt;</code>
          </div>
          <p className="text-sm">Built with love, and lots of coffee.</p>
          <p className="text-xs mt-2">© {new Date().getFullYear()} Mayu & Hiro. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="p-3 glass-card glass-card-dark hover:shadow-neon transition-all duration-300 transform hover:scale-110"
      aria-label={label}
    >
      {icon}
    </a>
  );
};

export default ContactSection;
