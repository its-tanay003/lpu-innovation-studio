import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Github, Twitter, Linkedin, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-bg-surface border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <Zap className="w-8 h-8 text-accent-cyan fill-accent-cyan" />
              <div className="flex flex-col">
                <span className="font-orbitron font-black text-xl leading-none text-white">INNOVATION</span>
                <span className="font-exo2 font-bold text-xs tracking-[0.3em] text-accent-cyan">STUDIO LPU</span>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Lovely Professional University's 50,000 sq ft technology facility. Empowering students to build the future of robotics, electronics, and software.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-accent-cyan hover:bg-white/10 transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-accent-cyan hover:bg-white/10 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-accent-cyan hover:bg-white/10 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-accent-cyan hover:bg-white/10 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-orbitron text-sm font-bold text-white mb-6 uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Labs', 'Projects', 'Clubs', 'Achievements'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-white/50 hover:text-accent-cyan text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-orbitron text-sm font-bold text-white mb-6 uppercase tracking-widest">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-white/50 text-sm">
                <MapPin className="w-5 h-5 text-accent-cyan shrink-0" />
                <span>Block 39, LPU Campus, Phagwara, Punjab, India</span>
              </li>
              <li className="flex items-center space-x-3 text-white/50 text-sm">
                <Phone className="w-5 h-5 text-accent-cyan shrink-0" />
                <span>+91 1824 444007</span>
              </li>
              <li className="flex items-center space-x-3 text-white/50 text-sm">
                <Mail className="w-5 h-5 text-accent-cyan shrink-0" />
                <span>innovation@lpu.in</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-orbitron text-sm font-bold text-white mb-6 uppercase tracking-widest">Stay Updated</h4>
            <p className="text-white/50 text-sm mb-4">Subscribe to our newsletter for the latest tech updates.</p>
            <form className="relative">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-cyan transition-colors"
              />
              <button className="absolute right-2 top-2 bottom-2 px-4 bg-accent-cyan text-bg-base rounded-md font-orbitron font-bold text-xs hover:bg-opacity-90 transition-all">
                JOIN
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-white/30 text-xs font-mono">
            © 2026 LPU INNOVATION STUDIO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex space-x-6 text-white/30 text-xs font-mono">
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
