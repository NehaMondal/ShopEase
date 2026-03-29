import { Product } from '../types';

const productsArray: Product[] = [
  {
    id: '1',
    name: 'Premium Leather Jacket',
    price: 299.99,
    category: 'Clothing',
    description:
      'Crafted from genuine Italian leather, this premium jacket features a timeless design with modern details. Perfect for any occasion, from casual outings to evening events.',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800',
      'https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=800',
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800',
    ],
    rating: 4.8,
    reviews: 256,
    features: [
      { icon: '✓', text: 'Genuine Italian Leather' },
      { icon: '✓', text: 'Water-Resistant Finish' },
      { icon: '✓', text: 'Multiple Interior Pockets' },
      { icon: '✓', text: '2 Year Warranty' },
    ],
  },
  {
    id: '2',
    name: 'Wireless Noise-Canceling Headphones',
    price: 349.99,
    category: 'Electronics',
    description:
      'Experience pure audio bliss with industry-leading noise cancellation. 30-hour battery life, premium comfort, and crystal-clear sound quality.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800',
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800',
    ],
    rating: 4.9,
    reviews: 1024,
    features: [
      { icon: '✓', text: 'Active Noise Cancellation' },
      { icon: '✓', text: '30-Hour Battery Life' },
      { icon: '✓', text: 'Hi-Res Audio Certified' },
      { icon: '✓', text: 'Foldable Design' },
    ],
  },
  {
    id: '3',
    name: 'Minimalist Watch',
    price: 189.99,
    category: 'Accessories',
    description:
      'A stunning timepiece that combines Swiss precision with Scandinavian design. Sapphire crystal glass and genuine leather strap.',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800',
      'https://images.unsplash.com/photo-1434056886845-dbd39c1cc727?w=800',
    ],
    rating: 4.7,
    reviews: 512,
    features: [
      { icon: '✓', text: 'Swiss Movement' },
      { icon: '✓', text: 'Sapphire Crystal Glass' },
      { icon: '✓', text: 'Water Resistant 50m' },
      { icon: '✓', text: 'Genuine Leather Strap' },
    ],
  },
  {
    id: '4',
    name: 'Designer Sunglasses',
    price: 159.99,
    category: 'Accessories',
    description:
      'UV400 protection meets Italian craftsmanship. Lightweight titanium frame with polarized lenses for ultimate clarity.',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800',
    ],
    rating: 4.6,
    reviews: 328,
    features: [
      { icon: '✓', text: 'UV400 Protection' },
      { icon: '✓', text: 'Polarized Lenses' },
      { icon: '✓', text: 'Titanium Frame' },
      { icon: '✓', text: 'Includes Hard Case' },
    ],
  },
  {
    id: '5',
    name: 'Running Sneakers Pro',
    price: 179.99,
    category: 'Footwear',
    description:
      'Engineered for performance with responsive cushioning and breathable mesh upper. Perfect for marathons or daily runs.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800',
      'https://images.unsplash.com/photo-1491553895911-0055uj8d0?w=800',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800',
    ],
    rating: 4.8,
    reviews: 892,
    features: [
      { icon: '✓', text: 'Responsive Cushioning' },
      { icon: '✓', text: 'Breathable Mesh Upper' },
      { icon: '✓', text: 'Lightweight Design' },
      { icon: '✓', text: 'Anti-Slip Sole' },
    ],
  },
  {
    id: '6',
    name: 'Smart Fitness Tracker',
    price: 129.99,
    category: 'Electronics',
    description:
      'Track your health 24/7 with heart rate monitoring, sleep analysis, and GPS. Water-resistant up to 50 meters.',
    images: [
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800',
      'https://images.unsplash.com/photo-1510017803434-a899398421b3?w=800',
      'https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=800',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800',
    ],
    rating: 4.5,
    reviews: 1567,
    features: [
      { icon: '✓', text: '24/7 Heart Rate Monitor' },
      { icon: '✓', text: 'Built-in GPS' },
      { icon: '✓', text: 'Sleep Tracking' },
      { icon: '✓', text: '7-Day Battery Life' },
    ],
  },
  {
    id: '7',
    name: 'Canvas Backpack',
    price: 89.99,
    category: 'Bags',
    description:
      'Vintage-inspired design meets modern functionality. Padded laptop compartment, water-resistant canvas, and genuine leather accents.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
      'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800',
      'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=800',
    ],
    rating: 4.7,
    reviews: 445,
    features: [
      { icon: '✓', text: 'Padded Laptop Compartment' },
      { icon: '✓', text: 'Water-Resistant Canvas' },
      { icon: '✓', text: 'Leather Accents' },
      { icon: '✓', text: 'Multiple Pockets' },
    ],
  },
  {
    id: '8',
    name: 'Ceramic Coffee Set',
    price: 69.99,
    category: 'Home',
    description:
      'Handcrafted ceramic pour-over set includes dripper, carafe, and two cups. Minimalist Japanese-inspired design.',
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800',
      'https://images.unsplash.com/photo-1497515114889-1f074f91c24c?w=800',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800',
    ],
    rating: 4.9,
    reviews: 234,
    features: [
      { icon: '✓', text: 'Handcrafted Ceramic' },
      { icon: '✓', text: 'Complete Pour-Over Set' },
      { icon: '✓', text: 'Dishwasher Safe' },
      { icon: '✓', text: 'Gift Box Included' },
    ],
  },
  {
    id: '9',
    name: 'Wireless Charging Pad',
    price: 49.99,
    category: 'Electronics',
    description:
      'Fast wireless charging for all Qi-enabled devices. Sleek aluminum design with LED indicator and foreign object detection.',
    images: [
      'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=800',
      'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=800',
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800',
      'https://images.unsplash.com/photo-1622675363311-3e1904dc1885?w=800',
    ],
    rating: 4.4,
    reviews: 678,
    features: [
      { icon: '✓', text: '15W Fast Charging' },
      { icon: '✓', text: 'Qi Certified' },
      { icon: '✓', text: 'Foreign Object Detection' },
      { icon: '✓', text: 'LED Status Indicator' },
    ],
  },
  {
    id: '10',
    name: 'Cashmere Sweater',
    price: 249.99,
    category: 'Clothing',
    description:
      'Pure Mongolian cashmere in a classic crew neck design. Exceptionally soft, lightweight, and warm for all-day comfort.',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
    ],
    rating: 4.8,
    reviews: 189,
    features: [
      { icon: '✓', text: '100% Mongolian Cashmere' },
      { icon: '✓', text: 'Lightweight & Warm' },
      { icon: '✓', text: 'Machine Washable' },
      { icon: '✓', text: 'Anti-Pilling Treatment' },
    ],
  },
  {
    id: '11',
    name: 'Portable Bluetooth Speaker',
    price: 79.99,
    category: 'Electronics',
    description:
      '360° immersive sound with deep bass. IPX7 waterproof rating, 24-hour playtime, and built-in microphone for calls.',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800',
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800',
      'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=800',
      'https://images.unsplash.com/photo-1507646227500-4d389b0012be?w=800',
    ],
    rating: 4.6,
    reviews: 923,
    features: [
      { icon: '✓', text: '360° Immersive Sound' },
      { icon: '✓', text: 'IPX7 Waterproof' },
      { icon: '✓', text: '24-Hour Playtime' },
      { icon: '✓', text: 'Built-in Microphone' },
    ],
  },
  {
    id: '12',
    name: 'Yoga Mat Premium',
    price: 59.99,
    category: 'Fitness',
    description:
      'Eco-friendly natural rubber with superior grip. Extra thick 6mm cushioning for joint protection. Includes carrying strap.',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
      'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800',
    ],
    rating: 4.7,
    reviews: 567,
    features: [
      { icon: '✓', text: 'Eco-Friendly Natural Rubber' },
      { icon: '✓', text: '6mm Extra Thick' },
      { icon: '✓', text: 'Non-Slip Surface' },
      { icon: '✓', text: 'Carrying Strap Included' },
    ],
  },
  {
    id: '13',
    name: 'Mechanical Keyboard',
    price: 149.99,
    category: 'Electronics',
    description:
      'Cherry MX switches with per-key RGB lighting. Aircraft-grade aluminum frame with detachable USB-C cable.',
    images: [
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800',
    ],
    rating: 4.8,
    reviews: 445,
    features: [
      { icon: '✓', text: 'Cherry MX Switches' },
      { icon: '✓', text: 'Per-Key RGB Lighting' },
      { icon: '✓', text: 'Aluminum Frame' },
      { icon: '✓', text: 'Detachable USB-C Cable' },
    ],
  },
  {
    id: '14',
    name: 'Leather Wallet',
    price: 79.99,
    category: 'Accessories',
    description:
      'Full-grain leather bifold wallet with RFID blocking. Slim profile with 8 card slots and bill compartment.',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
      'https://images.unsplash.com/photo-1606503825008-909a67e63c3d?w=800',
      'https://images.unsplash.com/photo-1612902456551-333ac5afa26e?w=800',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    ],
    rating: 4.6,
    reviews: 334,
    features: [
      { icon: '✓', text: 'Full-Grain Leather' },
      { icon: '✓', text: 'RFID Blocking' },
      { icon: '✓', text: '8 Card Slots' },
      { icon: '✓', text: 'Slim Profile Design' },
    ],
  },
  {
    id: '15',
    name: 'Plant Pot Set',
    price: 44.99,
    category: 'Home',
    description:
      'Set of 3 geometric concrete planters with bamboo saucers. Perfect for succulents and small plants. Drainage holes included.',
    images: [
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800',
      'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800',
      'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=800',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
    ],
    rating: 4.5,
    reviews: 223,
    features: [
      { icon: '✓', text: 'Set of 3 Planters' },
      { icon: '✓', text: 'Bamboo Saucers Included' },
      { icon: '✓', text: 'Drainage Holes' },
      { icon: '✓', text: 'Geometric Design' },
    ],
  },
];

// Create a Map for O(1) lookup performance
const productsMap = new Map<string, Product>(
  productsArray.map(product => [product.id, product]),
);

// Export the array for iteration (e.g., in FlatList)
export const products = productsArray;

// Optimized O(1) lookup by ID
export const getProductById = (id: string): Product | undefined => {
  return productsMap.get(id);
};
