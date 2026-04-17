'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { features } from '@/data/products';

export default function FeatureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative bg-[#140A07] py-24 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#E85D2A]/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[#E85D2A] font-inter text-sm uppercase tracking-[0.3em] mb-4">
            THE PHILOSOPHY
          </p>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-[#F5E6D3]">
            The Art of the
            <span className="text-[#FFB300] cheese-glow"> Perfect Burger</span>
          </h2>
        </motion.div>

        {/* Feature items */}
        <div className="flex flex-col gap-24">
          {features.map((feature, index) => (
            <FeatureItem key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureItem({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [feature.position === 'left' ? -60 : 60, 0]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const isLeft = feature.position === 'left';

  // Pick a frame for the visual based on index
  const frameNumbers = [30, 80, 130, 180];
  const frameNum = frameNumbers[index % frameNumbers.length];

  return (
    <motion.div
      ref={ref}
      style={{ x, opacity }}
      className={`flex flex-col ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
        } items-center gap-12 lg:gap-20`}
    >
      {/* Visual */}
      <div className="relative flex-shrink-0 w-72 h-72 lg:w-80 lg:h-80">
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <img
            src={`/burger-frames/frame_${frameNum}.jpg`}
            alt={feature.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140A07]/60 to-transparent" />
        </div>
        {/* Floating stat */}
        <motion.div
          className="absolute -bottom-4 -right-4 bg-[#E85D2A] rounded-xl px-4 py-3 shadow-lg"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <p className="font-playfair text-xl font-bold text-white">{feature.stat}</p>
        </motion.div>
        {/* Icon bubble */}
        <motion.div
          className="absolute -top-4 -left-4 w-12 h-12 bg-[#3A221A] border border-[#5A4034] rounded-full flex items-center justify-center text-xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {feature.icon}
        </motion.div>
      </div>

      {/* Text */}
      <div className={`flex-1 ${isLeft ? 'lg:pl-4' : 'lg:pr-4'}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-[#E85D2A]" />
          <span className="text-[#E85D2A] font-inter text-xs uppercase tracking-widest">
            Step {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <h3 className="font-playfair text-4xl md:text-5xl font-bold text-[#F5E6D3] mb-4 leading-tight">
          {feature.title}
        </h3>
        <p className="font-inter text-lg text-[#C9B8A0] leading-relaxed max-w-lg">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}
