import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap, User, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { auth } from '../../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user] = useAuthState(auth);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Labs', path: '/labs' },
    { name: 'Projects', path: '/projects' },
    { name: 'Clubs', path: '/clubs' },
    { name: 'Achievements', path: '/achievements' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'h-16 glass-dark border-b border-white/10' : 'h-20 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Zap className="w-8 h-8 text-accent-cyan fill-accent-cyan" />
          <div className="flex flex-col">
            <span className="font-orbitron font-black text-xl leading-none text-white">INNOVATION</span>
            <span className="font-exo2 font-bold text-xs tracking-[0.3em] text-accent-cyan">STUDIO LPU</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`font-orbitron text-xs font-bold tracking-widest hover:text-accent-cyan transition-colors ${
                location.pathname === link.path ? 'text-accent-cyan' : 'text-white/70'
              }`}
            >
              {link.name.toUpperCase()}
            </Link>
          ))}
          
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 rounded-full bg-accent-purple flex items-center justify-center border border-white/20 overflow-hidden">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
              </Link>
              <button onClick={() => signOut(auth)} className="text-white/50 hover:text-red-400 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm">LOGIN</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 top-16 bg-bg-base/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="font-orbitron text-2xl font-black tracking-tighter text-white hover:text-accent-cyan"
              >
                {link.name.toUpperCase()}
              </Link>
            ))}
            {user ? (
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                <Button variant="secondary">DASHBOARD</Button>
              </Link>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button>LOGIN</Button>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
