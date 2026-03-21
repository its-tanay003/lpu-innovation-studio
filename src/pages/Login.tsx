import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Zap, Mail, Lock, ArrowRight, Chrome } from 'lucide-react';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 circuit-bg">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-dark p-10 rounded-3xl border-white/10 shadow-2xl space-y-8"
      >
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 mb-4">
            <Zap className="w-8 h-8 text-accent-cyan fill-accent-cyan" />
          </div>
          <h1 className="font-orbitron text-3xl font-black text-white">ACCESS PORTAL</h1>
          <p className="text-white/50 font-exo2 text-sm">Enter the Innovation Studio ecosystem</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-[10px] font-orbitron font-bold text-white/40 uppercase tracking-widest ml-1">
              Institutional Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
              <input
                type="email"
                placeholder="your.id@lpu.in"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-white focus:outline-none focus:border-accent-cyan transition-colors font-exo2"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-orbitron font-bold text-white/40 uppercase tracking-widest ml-1">
              Access Key
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-white focus:outline-none focus:border-accent-cyan transition-colors font-exo2"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Button className="w-full py-4 text-lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
            INITIALIZE SESSION
          </Button>
          
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <span className="relative px-4 bg-bg-surface text-[10px] font-orbitron font-bold text-white/20 uppercase tracking-widest">
              OR
            </span>
          </div>

          <Button
            variant="outline"
            className="w-full py-4 space-x-3"
            onClick={handleGoogleLogin}
            isLoading={isLoading}
            leftIcon={<Chrome className="w-5 h-5" />}
          >
            CONTINUE WITH GOOGLE
          </Button>
        </div>

        <p className="text-center text-[10px] font-exo2 text-white/30">
          By accessing the portal, you agree to the <br />
          <a href="#" className="text-accent-cyan hover:underline">STUDIO PROTOCOLS</a> and <br />
          <a href="#" className="text-accent-cyan hover:underline">DATA PRIVACY POLICY</a>
        </p>
      </motion.div>
    </div>
  );
};
