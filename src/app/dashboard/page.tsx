'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { 
  Zap, 
  Trophy, 
  Clock, 
  Calendar, 
  Settings, 
  Bell, 
  ChevronRight,
  Plus,
  Rocket,
  Cpu,
  Shield
} from 'lucide-react';

export default function DashboardPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-accent-cyan border-t-transparent rounded-full animate-spin" />
    </div>
  );
  
  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-accent-purple/20 border border-accent-purple/30 flex items-center justify-center overflow-hidden">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full object-cover" />
            ) : (
              <Zap className="w-8 h-8 text-accent-purple" />
            )}
          </div>
          <div>
            <h1 className="font-orbitron text-2xl font-black text-white uppercase tracking-tight">
              WELCOME BACK, {user.displayName?.split(' ')[0] || 'INNOVATOR'}
            </h1>
            <p className="text-white/40 font-exo2 text-sm uppercase tracking-widest">
              LPU ID: 12104567 • B.TECH ROBOTICS
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" leftIcon={<Bell className="w-4 h-4" />}>
            NOTIFICATIONS
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Score */}
        <div className="lg:col-span-2 space-y-8">
          {/* Innovation Score Card */}
          <div className="glass-dark p-8 rounded-3xl border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <Zap className="w-24 h-24 text-accent-cyan/5 -rotate-12" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="12"
                  />
                  <motion.circle
                    initial={{ strokeDasharray: '0 440' }}
                    animate={{ strokeDasharray: '330 440' }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="#00e5ff"
                    strokeWidth="12"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-orbitron text-4xl font-black text-white">750</span>
                  <span className="text-[10px] font-bold text-accent-cyan uppercase tracking-widest">SCORE</span>
                </div>
              </div>
              <div className="space-y-4 flex-1">
                <h3 className="font-orbitron text-xl font-bold text-white uppercase">Innovation Score</h3>
                <p className="text-white/50 text-sm font-exo2 leading-relaxed">
                  You're in the top 5% of innovators this month. Complete 2 more lab sessions to reach the 'Advanced' tier.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-[10px] font-bold text-accent-cyan uppercase tracking-wider">
                    +50 SIH Participation
                  </div>
                  <div className="px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-[10px] font-bold text-accent-purple uppercase tracking-wider">
                    +100 Patent Filed
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-orbitron text-sm font-bold text-white uppercase tracking-widest">Recent Activity</h3>
              <Button variant="ghost" size="sm" className="text-accent-cyan">VIEW ALL</Button>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Lab Booking Confirmed', desc: 'AI Lab - Slot 04', time: '2 hours ago', icon: Clock, color: 'cyan' },
                { title: 'Project Updated', desc: 'Pinaka Rocket V2', time: 'Yesterday', icon: Rocket, color: 'purple' },
                { title: 'Achievement Verified', desc: 'SIH 2025 Winner', time: '3 days ago', icon: Trophy, color: 'orange' },
              ].map((activity, i) => (
                <div key={i} className="glass p-4 rounded-2xl border-white/5 flex items-center justify-between group hover:border-white/10 transition-all">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-xl bg-accent-${activity.color}/10 flex items-center justify-center border border-accent-${activity.color}/20`}>
                      <activity.icon className={`w-5 h-5 text-accent-${activity.color}`} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{activity.title}</h4>
                      <p className="text-xs text-white/40 font-exo2">{activity.desc}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-white/20">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Quick Actions & Badges */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="glass-dark p-6 rounded-3xl border-white/5 space-y-4">
            <h3 className="font-orbitron text-xs font-bold text-white uppercase tracking-widest mb-4">Quick Actions</h3>
            <Button className="w-full justify-between" rightIcon={<Plus className="w-4 h-4" />}>
              NEW PROJECT
            </Button>
            <Button variant="secondary" className="w-full justify-between" rightIcon={<Calendar className="w-4 h-4" />}>
              BOOK A LAB
            </Button>
            <Button variant="outline" className="w-full justify-between" rightIcon={<ChevronRight className="w-4 h-4" />}>
              JOIN A CLUB
            </Button>
          </div>

          {/* Badges */}
          <div className="glass-dark p-6 rounded-3xl border-white/5 space-y-6">
            <h3 className="font-orbitron text-xs font-bold text-white uppercase tracking-widest">Earned Badges</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Rocket, color: 'cyan', label: 'Pioneer' },
                { icon: Cpu, color: 'purple', label: 'Techie' },
                { icon: Shield, color: 'orange', label: 'Champion' },
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center space-y-2">
                  <div className={`w-14 h-14 rounded-full bg-accent-${badge.color}/10 border border-accent-${badge.color}/20 flex items-center justify-center shadow-neon-${badge.color}`}>
                    <badge.icon className={`w-6 h-6 text-accent-${badge.color}`} />
                  </div>
                  <span className="text-[10px] font-orbitron font-bold text-white/40 uppercase">{badge.label}</span>
                </div>
              ))}
              <div className="flex flex-col items-center space-y-2 opacity-20 grayscale">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] font-orbitron font-bold text-white/40 uppercase">Elite</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
