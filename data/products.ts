export interface BurgerProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  rating: number;
  image: string;
  features: string[];
  badge?: string;
}

export const burgerProducts: BurgerProduct[] = [
  {
    id: 'classic-burger',
    name: 'Classic Cheeseburger',
    description: 'Juicy grilled beef, molten cheddar, crisp lettuce, and toasted bun.',
    price: '$6.99',
    rating: 4.9,
    image: '/burger-frames/frame_1.jpg',
    features: ['Beef Patty', 'Cheddar', 'Fresh Veggies'],
    badge: 'Fan Favorite',
  },
  {
    id: 'double-stack',
    name: 'Double Stack',
    description: 'Twice the meat, double the chaos, maximum satisfaction.',
    price: '$8.99',
    rating: 5.0,
    image: '/burger-frames/frame_50.jpg',
    features: ['Double Patty', 'Extra Cheese', 'Signature Sauce'],
    badge: 'Best Seller',
  },
  {
    id: 'smoky-bbq',
    name: 'Smoky BBQ',
    description: 'Char-grilled perfection glazed with rich BBQ flavor.',
    price: '$7.99',
    rating: 4.8,
    image: '/burger-frames/frame_100.jpg',
    features: ['BBQ Sauce', 'Smoked Patty', 'Caramelized Onions'],
    badge: 'Chef\'s Pick',
  },
];

export const features = [
  {
    title: 'Premium Ingredients',
    description: 'Each layer is handpicked, fresh, and crafted for maximum flavor impact. Only the finest make the cut.',
    position: 'left' as const,
    icon: '🌿',
    stat: '100% Fresh',
  },
  {
    title: 'Layered Engineering',
    description: 'A burger is not food. It is architecture you can eat—precision-stacked for the perfect bite ratio.',
    position: 'right' as const,
    icon: '🏗️',
    stat: '7 Layers',
  },
  {
    title: 'Flavor Explosion',
    description: 'Every bite delivers a controlled chaos of textures and taste that rewires your senses.',
    position: 'left' as const,
    icon: '💥',
    stat: '∞ Flavor',
  },
  {
    title: 'Grill Mastery',
    description: 'Perfect sear, perfect juice retention, perfect crust—every single time, every single burger.',
    position: 'right' as const,
    icon: '🔥',
    stat: '450°F Grill',
  },
];
