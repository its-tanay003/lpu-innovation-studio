import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Rocket, Bus, Plane, Github, ExternalLink, Trophy } from 'lucide-react';

const projects = [
  {
    id: 'pinaka-rocket',
    title: 'Pinaka Rocket',
    description: 'The lightest student-built rocket in India. Designed for high-altitude atmospheric research with advanced telemetry systems.',
    image: 'https://picsum.photos/seed/rocket/800/600',
    icon: Rocket,
    tags: ['Aerospace', 'Robotics', 'Electronics'],
    achievement: 'Lightest Student Rocket India',
    color: 'cyan',
  },
  {
    id: 'autonomous-solar-bus',
    title: 'Autonomous Solar Bus',
    description: "India's first autonomous solar-powered bus. Used by PM Narendra Modi at the 106th Indian Science Congress in 2019.",
    image: 'https://picsum.photos/seed/bus/800/600',
    icon: Bus,
    tags: ['EV', 'AI', 'Autonomous'],
    achievement: "India's First Solar Bus",
    color: 'purple',
  },
  {
    id: 'flying-farmer-drone',
    title: 'Flying Farmer Drone',
    description: 'An open-sourced agricultural drone featured in Forbes India. Designed for precision pesticide spraying and crop health monitoring.',
    image: 'https://picsum.photos/seed/drone/800/600',
    icon: Plane,
    tags: ['Agritech', 'Drones', 'Open Source'],
    achievement: 'Forbes India Featured',
    color: 'orange',
  },
];

export const Projects = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="font-orbitron text-4xl md:text-6xl font-black text-white uppercase">Innovation Showcase</h1>
        <p className="text-white/60 font-exo2 text-lg">
          From concept to national impact. Explore the groundbreaking projects built at LPU Innovation Studio.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
          >
            {/* Project Image */}
            <div className="w-full lg:w-1/2 relative group">
              <div className={`absolute -inset-1 bg-gradient-to-r from-accent-${project.color} to-accent-purple rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000`}></div>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-base/80 to-transparent flex items-end p-8">
                  <div className="flex items-center space-x-2 bg-accent-cyan/20 backdrop-blur-md border border-accent-cyan/30 px-4 py-2 rounded-full">
                    <Trophy className="w-4 h-4 text-accent-cyan" />
                    <span className="text-xs font-orbitron font-bold text-white uppercase tracking-wider">{project.achievement}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <project.icon className={`w-8 h-8 text-accent-${project.color}`} />
                  <h2 className="font-orbitron text-3xl font-black text-white">{project.title}</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono font-bold text-white/40 border border-white/10 px-2 py-1 rounded uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-white/60 text-lg font-exo2 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button variant="primary" rightIcon={<ExternalLink className="w-4 h-4" />}>
                  CASE STUDY
                </Button>
                <Button variant="ghost" leftIcon={<Github className="w-4 h-4" />}>
                  VIEW SOURCE
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
