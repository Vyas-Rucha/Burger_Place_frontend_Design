'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';

const FRAME_PATH = '/burger-frames';
const TOTAL_FRAMES = 192;

const SECTIONS = [
  {
    frameStart: 0,
    frameEnd: 40,
    title: 'Elevate the Bite',
    subtitle: 'Where flavor defies gravity',
    align: 'center',
  },
  {
    frameStart: 41,
    frameEnd: 90,
    title: 'Crafted in Layers',
    subtitle: 'Every ingredient, a deliberate masterpiece',
    align: 'left',
  },
  {
    frameStart: 91,
    frameEnd: 140,
    title: 'Elastic Perfection',
    subtitle: 'Cheese that stretches time itself',
    align: 'right',
  },
  {
    frameStart: 141,
    frameEnd: 192,
    title: 'Build Your Burger',
    subtitle: 'Customized chaos. Your way.',
    align: 'center',
  },
];

export default function HeroCanvasAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.5,
  });

  const scrollVelocity = useVelocity(scrollYProgress);

  const yOffset = useTransform(scrollVelocity, [-1, 0, 1], [25, 0, -25]);
  const smoothY = useSpring(yOffset, { stiffness: 80, damping: 25 });

  const canvasOpacity = useTransform(smoothProgress, [0, 0.02], [0, 1]);

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedSoFar = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.onload = () => {
        loadedSoFar++;
        setLoadedCount(loadedSoFar);
      };
      img.src = `${FRAME_PATH}/frame_${i}.jpg`;
      images.push(img);
    }
    framesRef.current = images;
  }, []);

  // Draw frame to canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = framesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    // Letterbox / contain the image
    const scale = Math.min(width / img.naturalWidth, height / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    const dx = (width - dw) / 2;
    const dy = (height - dh) / 2;
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  // React to scroll progress
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (v) => {
      const rawFrame = Math.round(v * (TOTAL_FRAMES - 1));
      const frameIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, rawFrame));

      currentFrameRef.current = frameIndex;

      // Determine current section
      const sectionIndex = SECTIONS.findIndex(
        (s) =>
          frameIndex >= s.frameStart &&
          frameIndex <= s.frameEnd
      );
      if (sectionIndex !== -1) setCurrentSection(sectionIndex);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
    });
    return () => unsubscribe();
  }, [smoothProgress, drawFrame]);

  // Handle canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawFrame]);

  const loadPercentage = Math.round((loadedCount / TOTAL_FRAMES) * 100);
  const isLoaded = loadedCount >= Math.floor(TOTAL_FRAMES * 0.2);
  const section = SECTIONS[currentSection];

  const textAlign = section.align === 'left'
    ? 'items-start text-left pl-12 lg:pl-24'
    : section.align === 'right'
    ? 'items-end text-right pr-12 lg:pr-24'
    : 'items-center text-center';

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative"
      style={{ height: '600vh' }}
    >
      {/* Loading state */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#140A07]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="text-6xl animate-bounce">🍔</div>
            <div className="font-playfair text-2xl text-[#F5E6D3]">Loading Experience…</div>
            <div className="w-64 h-1 bg-[#3A221A] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#E85D2A] to-[#FFB300] rounded-full"
                style={{ width: `${loadPercentage}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="text-[#C9B8A0] text-sm">{loadPercentage}% loaded</div>
          </motion.div>
        </div>
      )}

      {/* Sticky canvas container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Canvas */}
        <motion.canvas
          ref={canvasRef}
          style={{ y: smoothY, opacity: canvasOpacity }}
          className="absolute inset-0 w-full h-full"
        />

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#140A07] via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#140A07]/40 via-transparent to-transparent pointer-events-none" />

        {/* Particle layer — floating sesame seeds */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#FFB300]/30"
              style={{
                left: `${10 + i * 8}%`,
                top: `${20 + (i % 4) * 20}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3 + i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Hero text overlay */}
        <div className={`absolute inset-0 flex flex-col justify-center ${textAlign} pointer-events-none`}>
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="px-8 max-w-3xl"
          >
            {currentSection === 0 ? (
              <>
                <motion.p
                  className="text-[#FFB300] font-inter text-sm uppercase tracking-[0.3em] mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  GRAVITAS BURGER
                </motion.p>
                <h1
                  className="font-playfair text-8xl md:text-9xl font-bold leading-none mb-6 cheese-glow"
                  style={{ color: '#F5E6D3' }}
                >
                  Elevate
                  <br />
                  <span style={{ color: '#FFB300' }}>the Bite</span>
                </h1>
                <p className="font-inter text-xl text-[#C9B8A0] max-w-md leading-relaxed">
                  Where flavor defies gravity
                </p>
                <motion.div
                  className="mt-8 flex gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-2 text-[#C9B8A0] text-sm">
                    <span className="text-[#E85D2A]">↓</span> Scroll to experience
                  </div>
                </motion.div>
              </>
            ) : (
              <>
                <motion.h2
                  className="font-playfair text-6xl md:text-7xl font-bold leading-tight mb-4"
                  style={{ color: '#F5E6D3' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {section.title.split(' ').map((word, wi) => (
                    <span key={wi}>
                      {wi === 0 ? word : (
                        <span style={{ color: '#FFB300' }}> {word}</span>
                      )}
                    </span>
                  ))}
                </motion.h2>
                <motion.p
                  className="font-inter text-lg text-[#C9B8A0] max-w-md leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {section.subtitle}
                </motion.p>
              </>
            )}
          </motion.div>

          {/* Section indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {SECTIONS.map((_, i) => (
              <div
                key={i}
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: i === currentSection ? '32px' : '8px',
                  backgroundColor: i === currentSection ? '#FFB300' : '#5A4034',
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#140A07] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
