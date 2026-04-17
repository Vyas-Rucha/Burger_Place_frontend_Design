'use client';

import { motion } from 'framer-motion';

export default function FinalCTA() {
  return (
    <section
      id="cta"
      className="relative bg-[#140A07] py-32 overflow-hidden"
    >
      {/* Background burst */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E85D2A]/8 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#FFB300]/10 blur-2xl" />
      </div>

      {/* Burger frame visual */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 pointer-events-none overflow-hidden">
        <img
          src="/burger-frames/frame_192.jpg"
          alt="Exploded burger"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#140A07] to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.p
            className="text-[#E85D2A] font-inter text-sm uppercase tracking-[0.4em] mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            THE EXPERIENCE AWAITS
          </motion.p>

          <h2 className="font-playfair text-6xl md:text-7xl lg:text-8xl font-bold text-[#F5E6D3] mb-6 leading-tight">
            Ready to
            <br />
            <span className="text-[#FFB300] cheese-glow">Break Gravity?</span>
          </h2>

          <p className="font-inter text-xl text-[#C9B8A0] mb-12 max-w-lg mx-auto leading-relaxed">
            This isn't just food. It's an experience — a controlled explosion of flavor, texture, and obsession.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              id="cta-build-burger"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-10 py-4 rounded-2xl font-inter font-bold text-lg text-white overflow-hidden group"
              style={{ background: 'linear-gradient(135deg, #E85D2A, #FFB300)' }}
            >
              <span className="relative z-10">Build Your Burger</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #FFB300, #E85D2A)' }}
              />
            </motion.button>

            <motion.button
              id="cta-view-menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 rounded-2xl font-inter font-semibold text-lg text-[#F5E6D3] border border-[#5A4034] hover:border-[#E85D2A] transition-colors duration-300"
            >
              View Full Menu
            </motion.button>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-20 grid grid-cols-3 gap-8 pt-12 border-t border-[#5A4034]"
        >
          {[
            { label: 'Burgers Served', value: '100K+' },
            { label: 'Fresh Ingredients', value: '28' },
            { label: 'Avg. Rating', value: '4.9 ★' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-playfair text-3xl font-bold text-[#FFB300]">{stat.value}</p>
              <p className="font-inter text-xs text-[#C9B8A0] mt-1 tracking-wider uppercase">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
