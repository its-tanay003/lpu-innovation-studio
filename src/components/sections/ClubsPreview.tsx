import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe, Code, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import Link from 'next/link';

const clubs = [
  { name: 'REDDIX', icon: Shield, color: 'cyan', desc: 'World Robotics Champions' },
  { name: 'ASTRA', icon: Globe, color: 'purple', desc: 'Drone Olympics Winners' },
  { name: 'CODE GENESIS', icon: Code, color: 'orange', desc: 'SIH Software Winners' },
];

export const ClubsPreview = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-16">
      <div className="text-center space-y-4">
        <h2 className="font-orbitron text-3xl md:text-5xl font-black text-white uppercase">
          ELITE <span className="text-accent-orange">CLUBS</span>
        </h2>
        <p className="text-white/50 font-exo2 max-w-2xl mx-auto">
          Join the specialized teams that represent LPU at the highest levels of global competition.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {clubs.map((club, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-2xl border-white/5 hover:border-accent-orange/30 transition-all text-center space-y-6"
          >
            <div className={`w-16 h-16 rounded-2xl bg-accent-${club.color}/10 mx-auto flex items-center justify-center border border-accent-${club.color}/20`}>
              <club.icon className={`w-8 h-8 text-accent-${club.color}`} />
            </div>
            <div className="space-y-2">
              <h3 className="font-orbitron text-xl font-bold text-white">{club.name}</h3>
              <p className="text-white/40 text-sm font-exo2">{club.desc}</p>
            </div>
            <Link href="/clubs">
              <Button variant="ghost" size="sm" className="text-accent-orange" rightIcon={<ArrowRight className="w-4 h-4" />}>
                LEARN MORE
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
