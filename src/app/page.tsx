'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Zap, Rocket, Cpu, Shield, ArrowRight, Globe, Code, Award, Trophy, Star } from 'lucide-react';
// @ts-ignore
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

function ParticleSystem() {
  const particles = React.useMemo(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  return (
    <Points positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00e5ff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <color attach="background" args={['#050d1a']} />
            <ambientLight intensity={0.5} />
            <Suspense fallback={null}>
              <ParticleSystem />
              <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh position={[0, 0, 0]}>
                  <octahedronGeometry args={[1, 0]} />
                  <meshStandardMaterial color="#00e5ff" wireframe />
                </mesh>
              </Float>
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>

        <div className="relative z-10 text-center space-y-8 px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan font-orbitron text-[10px] font-bold tracking-[0.2em] uppercase">
              <Zap className="w-3 h-3 fill-accent-cyan" />
              <span>Next Gen Engineering Hub</span>
            </div>
            
            <h1 className="font-orbitron text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter">
              BUILD THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">FUTURE</span>
            </h1>
            
            <p className="font-exo2 text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Lovely Professional University's 50,000 sq ft technology facility. 
              From theory to hands-on. From idea to national competition.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button className="px-8 py-4 bg-accent-cyan text-bg-base font-orbitron font-bold rounded-lg hover:bg-white transition-all flex items-center gap-2">
              EXPLORE LABS <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-4 border border-white/20 text-white font-orbitron font-bold rounded-lg hover:bg-white/10 transition-all">
              VIEW PROJECTS
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
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

      {/* Labs Section */}
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'AI Lab', icon: Cpu, color: 'purple', desc: 'Advanced computation and neural network research.' },
            { name: 'Robotics Lab', icon: Shield, color: 'cyan', desc: 'Autonomous systems and industrial automation.' },
            { name: 'Fab Lab', icon: Rocket, color: 'orange', desc: 'Precision manufacturing and rapid prototyping.' },
          ].map((lab, i) => (
            <motion.div
              key={i}
              className="glass p-8 rounded-2xl border-white/5 hover:border-white/20 transition-all space-y-6"
            >
              <div className={`w-12 h-12 rounded-xl bg-accent-${lab.color}/10 flex items-center justify-center`}>
                <lab.icon className={`w-6 h-6 text-accent-${lab.color}`} />
              </div>
              <h3 className="font-orbitron text-xl font-bold text-white uppercase">{lab.name}</h3>
              <p className="text-white/40 font-exo2">{lab.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
