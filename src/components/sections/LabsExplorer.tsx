import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
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
  { id: 'ideation', name: 'Ideation Lab', icon: Lightbulb, color: 'cyan' },
  { id: 'ai', name: 'AI Lab', icon: Cpu, color: 'purple' },
  { id: 'student-project', name: 'Student Project', icon: Rocket, color: 'orange' },
  { id: 'prototyping', name: 'Prototyping', icon: Layers, color: 'green' },
  { id: 'machine-diagnostic', name: 'Diagnostics', icon: Activity, color: 'cyan' },
  { id: 'fabrication', name: 'Fabrication', icon: Hammer, color: 'purple' },
  { id: 'metal-casting', name: 'Metal Casting', icon: Flame, color: 'orange' },
  { id: 'paint-booth', name: 'Paint Booth', icon: Paintbrush, color: 'green' },
  { id: 'machining', name: 'Machining', icon: Settings, color: 'cyan' },
];

export const LabsExplorer = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <h2 className="font-orbitron text-3xl md:text-5xl font-black text-white uppercase leading-tight">
            NINE LABS. <br />
            <span className="text-accent-cyan">ONE ECOSYSTEM.</span>
          </h2>
          <p className="text-white/50 font-exo2 max-w-xl">
            Our specialized facilities are designed to support every stage of the engineering lifecycle, from initial ideation to precision manufacturing.
          </p>
        </div>
        <Link to="/labs">
          <Button variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />}>
            VIEW ALL FACILITIES
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8">
        {labs.map((lab, index) => (
          <motion.div
            key={lab.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            className="group relative glass p-6 md:p-8 rounded-2xl border-white/5 hover:border-accent-cyan/30 transition-all cursor-pointer overflow-hidden"
          >
            <div className={`absolute -top-12 -right-12 w-24 h-24 bg-accent-${lab.color}/10 blur-3xl rounded-full group-hover:bg-accent-${lab.color}/20 transition-all`} />
            
            <div className="relative z-10 space-y-4">
              <div className={`w-12 h-12 rounded-xl bg-accent-${lab.color}/10 flex items-center justify-center border border-accent-${lab.color}/20`}>
                <lab.icon className={`w-6 h-6 text-accent-${lab.color}`} />
              </div>
              <h3 className="font-orbitron text-sm md:text-lg font-bold text-white uppercase tracking-wider">
                {lab.name}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
