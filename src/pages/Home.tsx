import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { LabsExplorer } from '../components/sections/LabsExplorer';
import { AchievementsWall } from '../components/sections/AchievementsWall';
import { ClubsPreview } from '../components/sections/ClubsPreview';
import { FinalCTA } from '../components/sections/FinalCTA';
import { motion } from 'framer-motion';

export const Home = () => {
  return (
    <div className="space-y-24 pb-24">
      <HeroSection />
      
      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: 'Facility Size', value: '50,000', suffix: 'sq ft', color: 'cyan' },
            { label: 'Specialized Labs', value: '9', suffix: '', color: 'purple' },
            { label: 'Patents Filed', value: '2,500', suffix: '+', color: 'orange' },
            { label: 'Countries Beaten', value: '55', suffix: '+', color: 'green' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl border-white/5 text-center group hover:border-accent-cyan/30 transition-all"
            >
              <h3 className="font-orbitron text-3xl font-black text-white mb-2">
                {stat.value}
                <span className="text-accent-cyan text-xl ml-1">{stat.suffix}</span>
              </h3>
              <p className="text-white/50 font-exo2 text-xs uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <LabsExplorer />

      <AchievementsWall />

      <ClubsPreview />

      {/* Mission Section */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-8">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="font-orbitron text-4xl md:text-5xl font-black text-white leading-tight"
        >
          WHERE <span className="text-accent-cyan">IDEAS</span> BECOME <span className="text-accent-purple">REALITY</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/70 text-lg md:text-xl font-exo2 leading-relaxed"
        >
          The LPU Innovation Studio is a world-class makerspace designed to democratize access to industrial-grade manufacturing, advanced computation, and venture capital. From theory to hands-on experience.
        </motion.p>
      </section>

      <FinalCTA />
    </div>
  );
};
