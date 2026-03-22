'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Shield, Code, Globe, Swords, Lightbulb, Trophy, ArrowRight } from 'lucide-react';

const clubs = [
  {
    id: 'reddix',
    name: 'REDDIX',
    description: 'World Robotics Championship Champions. Specializing in Robowar, Robo Soccer, and Drone Soccer. Beat 55+ countries.',
    icon: Shield,
    color: 'cyan',
    achievement: 'World Champions',
  },
  {
    id: 'astra',
    name: 'ASTRA',
    description: 'Drone Olympics 2026 Champions. Pushing the boundaries of autonomous flight and drone technology.',
    icon: Globe,
    color: 'purple',
    achievement: 'Drone Olympics Champs',
  },
  {
    id: 'code-genesis',
    name: 'Code Genesis',
    description: 'The premier competitive programming and software development club. Winners of SIH 2025 Software Category.',
    icon: Code,
    color: 'orange',
    achievement: 'SIH 2025 Winners',
  },
  {
    id: 'gdsc',
    name: 'GDSC LPU',
    description: 'Google Developer Student Club. Building community and solving local problems with Google technology.',
    icon: Globe,
    color: 'green',
    achievement: 'Google Partner',
  },
  {
    id: 'reptilian-robotics',
    name: 'Reptilian Robotics',
    description: 'Focusing on bio-inspired robotics and combat-ready machines for national level competitions.',
    icon: Swords,
    color: 'cyan',
    achievement: 'IIT/NIT Finalists',
  },
  {
    id: 'innotech',
    name: 'Innotech',
    description: 'Bridging the gap between innovation and entrepreneurship. Helping students file patents and launch startups.',
    icon: Lightbulb,
    color: 'purple',
    achievement: '250+ Startups',
  },
];

export default function ClubsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="font-orbitron text-4xl md:text-6xl font-black text-white uppercase">Student Clubs</h1>
        <p className="text-white/60 font-exo2 text-lg">
          Join the elite teams that compete at national and international levels. Find your tribe and build the future.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {clubs.map((club, index) => (
          <motion.div
            key={club.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            className="group relative glass p-8 rounded-2xl border-white/5 hover:border-accent-cyan/30 transition-all"
          >
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className={`w-14 h-14 rounded-xl bg-accent-${club.color}/10 flex items-center justify-center border border-accent-${club.color}/20`}>
                  <club.icon className={`w-8 h-8 text-accent-${club.color}`} />
                </div>
                <div className="flex items-center space-x-1 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  <Trophy className="w-3 h-3 text-yellow-500" />
                  <span className="text-[10px] font-orbitron font-bold text-white/70 uppercase">{club.achievement}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-orbitron text-2xl font-black text-white group-hover:text-accent-cyan transition-colors">
                  {club.name}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed font-exo2">
                  {club.description}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-bg-surface bg-gray-800 flex items-center justify-center overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=${club.id}${i}`} alt="Member" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-bg-surface bg-accent-cyan/20 flex items-center justify-center text-[10px] font-bold text-accent-cyan">
                    +50
                  </div>
                </div>
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  JOIN CLUB
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
