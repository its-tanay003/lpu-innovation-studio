import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Rocket, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const FinalCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-purple/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-accent-cyan/10 border border-accent-cyan/20 mb-4">
            <Rocket className="w-10 h-10 text-accent-cyan" />
          </div>
          <h2 className="font-orbitron text-4xl md:text-6xl font-black text-white uppercase leading-tight">
            READY TO BUILD <br />
            <span className="text-accent-cyan">THE FUTURE?</span>
          </h2>
          <p className="text-white/60 font-exo2 text-lg md:text-xl max-w-2xl mx-auto">
            Join 30,000+ students at LPU's Innovation Studio and turn your engineering dreams into reality.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <Link href="/register">
            <Button size="lg" className="px-12 py-5 text-xl" rightIcon={<ArrowRight className="w-6 h-6" />}>
              APPLY NOW
            </Button>
          </Link>
          <Link href="/labs">
            <Button variant="outline" size="lg" className="px-12 py-5 text-xl">
              EXPLORE STUDIO
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
