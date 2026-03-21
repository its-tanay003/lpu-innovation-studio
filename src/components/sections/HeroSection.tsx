import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls, Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Zap, ArrowRight } from 'lucide-react';

function ParticleSystem() {
  const ref = useRef<THREE.Points>(null!);
  
  const particles = useMemo(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.05;
    ref.current.rotation.x = Math.sin(t * 0.05) * 0.1;
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
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

export const HeroSection = () => {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
      {/* Three.js Background */}
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

      {/* Content Overlay */}
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
          <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
            EXPLORE LABS
          </Button>
          <Button variant="outline" size="lg">
            VIEW PROJECTS
          </Button>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bg-base to-transparent z-10" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-base to-transparent z-10" />
    </section>
  );
};
