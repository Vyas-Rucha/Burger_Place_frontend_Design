'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { burgerProducts } from '@/data/products';
import ProductCard from './ProductCard';

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bannerParallax = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative bg-[#2A140F] py-24 overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #FFB300 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Section header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-[#E85D2A] font-inter text-sm uppercase tracking-[0.3em] mb-4">
            THE MENU
          </p>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-[#F5E6D3] mb-4">
            Choose Your
            <span className="text-[#FFB300] cheese-glow"> Obsession</span>
          </h2>
          <p className="font-inter text-[#C9B8A0] max-w-xl mx-auto leading-relaxed">
            Three levels of gravity-defying flavor. Each one engineered to destroy your expectations.
          </p>
        </motion.div>
      </div>

      {/* Cheese-drip banner */}
      <div className="relative z-10 overflow-hidden mb-16 max-w-7xl mx-auto px-6 lg:px-12 rounded-2xl">
        <motion.div
          className="relative rounded-2xl overflow-hidden h-52"
          style={{ y: bannerParallax }}
        >
          <img
            src="/burger-frames/frame_60.jpg"
            alt="Cheese drip banner"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2A140F]/90 via-[#2A140F]/40 to-[#2A140F]/90" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="font-playfair text-4xl font-bold text-[#FFB300] cheese-glow mb-2">
                Handcrafted Daily
              </p>
              <p className="font-inter text-[#C9B8A0] text-sm tracking-widest uppercase">
                Fresh ingredients · Precision-grilled · Zero compromise
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {burgerProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>

      {/* Floating ingredient particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['🧅', '🧀', '🥬', '🫙', '🌿'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-10 select-none"
            style={{
              left: `${15 + i * 18}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 15, -15, 0],
              opacity: [0.08, 0.15, 0.08],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
