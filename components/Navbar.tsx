'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Menu', href: '#products' },
  { label: 'Philosophy', href: '#features' },
  { label: 'Order Now', href: '#cta' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#140A07]/95 backdrop-blur-md border-b border-[#5A4034]/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <motion.div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
            style={{ background: 'linear-gradient(135deg, #E85D2A, #FFB300)' }}
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            🍔
          </motion.div>
          <span className="font-playfair text-xl font-bold text-[#F5E6D3] group-hover:text-[#FFB300] transition-colors">
            GRAVITAS
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
              className={`font-inter text-sm transition-all duration-300 ${
                item.label === 'Order Now'
                  ? 'px-5 py-2.5 rounded-xl font-semibold text-white'
                  : 'text-[#C9B8A0] hover:text-[#F5E6D3]'
              }`}
              style={
                item.label === 'Order Now'
                  ? { background: 'linear-gradient(135deg, #E85D2A, #FFB300)' }
                  : {}
              }
              id={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          id="mobile-menu-toggle"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-6 h-0.5 bg-[#F5E6D3] rounded-full"
              animate={
                menuOpen
                  ? i === 1
                    ? { opacity: 0 }
                    : i === 0
                    ? { y: 7, rotate: 45 }
                    : { y: -7, rotate: -45 }
                  : { y: 0, rotate: 0, opacity: 1 }
              }
              transition={{ duration: 0.2 }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={menuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-[#140A07]/98 backdrop-blur-md border-b border-[#5A4034]/50"
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="font-inter text-[#C9B8A0] hover:text-[#FFB300] transition-colors py-2"
            >
              {item.label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
