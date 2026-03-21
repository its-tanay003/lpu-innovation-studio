import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, FileText, Star, TrendingUp, Globe } from 'lucide-react';

const achievements = [
  {
    id: 'sih-nodal',
    title: 'SIH Nodal Centre',
    description: 'Selected as the Nodal Centre for Smart India Hackathon for 6 consecutive years (2019-2025).',
    icon: Star,
    date: '2019 - 2025',
    color: 'cyan',
  },
  {
    id: 'patent-filer',
    title: '#1 Patent Filer in India',
    description: 'Ranked #1 in India for IT patent filings, surpassing industry giants like Samsung and Google.',
    icon: FileText,
    date: '2024',
    color: 'purple',
  },
  {
    id: 'nirf-rank',
    title: 'NIRF Rank 31',
    description: 'Achieved NIRF Rank 31 Overall and NAAC A++ accreditation with a CGPA of 3.68.',
    icon: Award,
    date: '2025',
    color: 'orange',
  },
  {
    id: 'wuri-rank',
    title: 'WURI #4 India',
    description: 'Ranked #4 in India for Innovation by the World University Rankings for Innovation (WURI).',
    icon: Globe,
    date: '2024',
    color: 'green',
  },
  {
    id: 'startup-incubation',
    title: '250+ Startups Incubated',
    description: 'Successfully incubated over 250 student startups with a dedicated Rs. 20 Crore VC corpus.',
    icon: TrendingUp,
    date: 'Ongoing',
    color: 'cyan',
  },
  {
    id: 'world-robotics',
    title: 'World Robotics Champions',
    description: 'REDDIX club won the World Robotics Championship, beating teams from 55+ countries.',
    icon: Trophy,
    date: '2024',
    color: 'purple',
  },
];

export const Achievements = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="font-orbitron text-4xl md:text-6xl font-black text-white uppercase">Hall of Fame</h1>
        <p className="text-white/60 font-exo2 text-lg">
          A legacy of innovation. Celebrating the milestones and achievements that define LPU Innovation Studio.
        </p>
      </div>

      <div className="relative border-l border-white/10 ml-4 md:ml-0 md:before:absolute md:before:left-1/2 md:before:top-0 md:before:bottom-0 md:before:w-px md:before:bg-white/10 md:border-l-0">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative mb-12 md:mb-24 flex flex-col md:flex-row items-center ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-[-17px] md:left-1/2 md:ml-[-8px] w-4 h-4 rounded-full bg-accent-cyan shadow-neon-cyan z-10" />

            {/* Content Card */}
            <div className={`w-full md:w-[45%] ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
              <div className="glass p-8 rounded-2xl border-white/5 hover:border-accent-cyan/30 transition-all space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-lg bg-accent-${achievement.color}/10 flex items-center justify-center border border-accent-${achievement.color}/20`}>
                    <achievement.icon className={`w-6 h-6 text-accent-${achievement.color}`} />
                  </div>
                  <span className="font-mono text-xs font-bold text-white/30 tracking-widest">{achievement.date}</span>
                </div>
                <h3 className="font-orbitron text-xl font-bold text-white">{achievement.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed font-exo2">
                  {achievement.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
