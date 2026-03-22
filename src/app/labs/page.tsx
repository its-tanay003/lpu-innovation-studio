'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  Lightbulb, 
  Cpu, 
  Rocket, 
  Layers, 
  Activity, 
  Hammer, 
  Flame, 
  Paintbrush, 
  Settings,
  ArrowRight
} from 'lucide-react';

const labs = [
  {
    id: 'ideation',
    name: 'Ideation Lab',
    description: 'Where concepts take root. Equipped with collaborative tools for brainstorming and design thinking.',
    icon: Lightbulb,
    color: 'cyan',
  },
  {
    id: 'ai',
    name: 'AI Lab',
    description: 'High-performance computing for machine learning, computer vision, and neural network development.',
    icon: Cpu,
    color: 'purple',
  },
  {
    id: 'student-project',
    name: 'Student Project Lab',
    description: 'A dedicated space for long-term student projects and competition preparation.',
    icon: Rocket,
    color: 'orange',
  },
  {
    id: 'prototyping',
    name: 'Prototyping Lab',
    description: 'Equipped with 3D printers, laser cutters, and rapid prototyping tools.',
    icon: Layers,
    color: 'green',
  },
  {
    id: 'machine-diagnostic',
    name: 'Machine Diagnostic & Analysis Centre',
    description: 'Advanced sensors and diagnostic tools for analyzing mechanical and electronic systems.',
    icon: Activity,
    color: 'cyan',
  },
  {
    id: 'fabrication',
    name: 'Fabrication Lab',
    description: 'Heavy-duty tools for metal and wood fabrication, welding, and assembly.',
    icon: Hammer,
    color: 'purple',
  },
  {
    id: 'metal-casting',
    name: 'Metal Casting Lab',
    description: 'Facilities for foundry work, sand casting, and metal forming.',
    icon: Flame,
    color: 'orange',
  },
  {
    id: 'paint-booth',
    name: 'Paint Booth',
    description: 'Professional finishing and painting facility for prototypes and projects.',
    icon: Paintbrush,
    color: 'green',
  },
  {
    id: 'machining',
    name: 'Machining Lab',
    description: 'Precision CNC machines, lathes, and milling equipment for high-accuracy parts.',
    icon: Settings,
    color: 'cyan',
  },
];

export default function LabsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="font-orbitron text-4xl md:text-6xl font-black text-white">SPECIALIZED LABS</h1>
        <p className="text-white/60 font-exo2 text-lg">
          9 world-class facilities equipped with industry-standard technology to turn your ideas into reality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {labs.map((lab, index) => (
          <motion.div
            key={lab.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            className="group relative glass p-8 rounded-2xl border-white/5 hover:border-accent-cyan/30 transition-all overflow-hidden"
          >
            {/* Background Glow */}
            <div className={`absolute -top-24 -right-24 w-48 h-48 bg-accent-${lab.color}/10 blur-[80px] rounded-full group-hover:bg-accent-${lab.color}/20 transition-all`} />
            
            <div className="relative z-10 space-y-6">
              <div className={`w-14 h-14 rounded-xl bg-accent-${lab.color}/10 flex items-center justify-center border border-accent-${lab.color}/20`}>
                <lab.icon className={`w-8 h-8 text-accent-${lab.color}`} />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-orbitron text-xl font-bold text-white group-hover:text-accent-cyan transition-colors">
                  {lab.name}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed font-exo2">
                  {lab.description}
                </p>
              </div>

              <Button 
                variant="ghost" 
                size="sm" 
                className="p-0 text-accent-cyan hover:bg-transparent group-hover:translate-x-2 transition-transform"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                LEARN MORE
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
