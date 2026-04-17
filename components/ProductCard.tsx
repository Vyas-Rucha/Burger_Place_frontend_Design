'use client';

import { motion } from 'framer-motion';
import { BurgerProduct } from '@/data/products';
import { useState } from 'react';

interface ProductCardProps {
  product: BurgerProduct;
  index: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className="w-3.5 h-3.5"
          viewBox="0 0 20 20"
          fill={star <= Math.floor(rating) ? '#FFB300' : star <= rating ? '#FFB300' : '#5A4034'}
          style={{ opacity: star <= rating ? 1 : 0.4 }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-[#C9B8A0] ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#3A221A] card-glow transition-all duration-500 cursor-pointer"
      id={`product-card-${product.id}`}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E85D2A] text-white tracking-wider">
            {product.badge}
          </span>
        </div>
      )}

      {/* Image container */}
      <div className="relative overflow-hidden h-64">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Cheese drip overlay */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/50 to-transparent" />
        {/* Shimmer on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-[#FFB300]/5 to-transparent transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div>
          <StarRating rating={product.rating} />
          <h3 className="font-playfair text-xl text-[#F5E6D3] mt-2 group-hover:text-[#FFB300] transition-colors duration-300">
            {product.name}
          </h3>
          <p className="font-inter text-sm text-[#C9B8A0] mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2">
          {product.features.map((feature) => (
            <span
              key={feature}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#2A140F] text-[#C9B8A0] border border-[#5A4034]"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#5A4034]">
          <div>
            <span className="font-playfair text-2xl font-bold text-[#FFB300]">
              {product.price}
            </span>
          </div>
          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.95 }}
            className="relative px-5 py-2.5 rounded-xl font-inter font-semibold text-sm transition-all duration-300 overflow-hidden"
            id={`add-to-cart-${product.id}`}
            style={{
              background: added
                ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                : 'linear-gradient(135deg, #E85D2A, #FFB300)',
              color: 'white',
            }}
          >
            <motion.span
              key={added ? 'added' : 'add'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {added ? '✓ Added!' : 'Add to Cart'}
            </motion.span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
