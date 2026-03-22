import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Star, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import Link from 'next/link';

const achievements = [
  { title: 'SIH Nodal Centre', desc: '6 Consecutive Years (2019-2025)', icon: Star, color: 'cyan' },
  { title: '#1 Patent Filer', desc: 'Beating Samsung & Google in IT', icon: Award, color: 'purple' },
  { title: 'World Champions', desc: 'REDDIX: World Robotics Championship', icon: Trophy, color: 'orange' },
  { title: 'NIRF Rank 31', desc: 'NAAC A++ Accreditation', icon: Award, color: 'green' },
];

export const AchievementsWall = () => {
  return (
    <section className="py-24 bg-bg-surface/50 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <h2 className="font-orbitron text-3xl md:text-5xl font-black text-white uppercase leading-tight">
            HALL OF <span className="text-accent-purple">FAME</span>
          </h2>
          <p className="text-white/50 font-exo2 max-w-xl">
            Celebrating the milestones that define our legacy of innovation and excellence on the global stage.
          </p>
        </div>
        <Link href="/achievements">
          <Button variant="ghost" className="text-accent-purple" rightIcon={<ArrowRight className="w-4 h-4" />}>
            VIEW ALL ACHIEVEMENTS
          </Button>
        </Link>
      </div>

      <div className="flex space-x-6 px-4 md:px-0 overflow-x-auto pb-8 scrollbar-hide">
        <div className="flex space-x-6 min-w-max mx-auto px-4 md:px-8">
          {achievements.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="w-[300px] glass p-8 rounded-2xl border-white/5 hover:border-accent-purple/30 transition-all space-y-6"
            >
              <div className={`w-12 h-12 rounded-xl bg-accent-${item.color}/10 flex items-center justify-center border border-accent-${item.color}/20`}>
                <item.icon className={`w-6 h-6 text-accent-${item.color}`} />
              </div>
              <div className="space-y-2">
                <h3 className="font-orbitron text-lg font-bold text-white uppercase tracking-tight">{item.title}</h3>
                <p className="text-white/40 text-sm font-exo2">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
