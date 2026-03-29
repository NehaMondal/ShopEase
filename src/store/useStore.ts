import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface StoreState {
  cart: CartItem[];
  cartBadgeScale: number;
  flyingImagePosition: { x: number; y: number } | null;
  flyingProduct: Product | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  triggerCartAnimation: () => void;
  setFlyingImage: (
    product: Product | null,
    position: { x: number; y: number } | null,
  ) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  cart: [],
  cartBadgeScale: 1,
  flyingImagePosition: null,
  flyingProduct: null,

  addToCart: (product: Product) => {
    set(state => {
      const existingItem = state.cart.find(
        item => item.product.id === product.id,
      );
      if (existingItem) {
        return {
          cart: state.cart.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return { cart: [...state.cart, { product, quantity: 1 }] };
    });
  },

  removeFromCart: (productId: string) => {
    set(state => ({
      cart: state.cart.filter(item => item.product.id !== productId),
    }));
  },

  updateQuantity: (productId: string, quantity: number) => {
    set(state => ({
      cart:
        quantity <= 0
          ? state.cart.filter(item => item.product.id !== productId)
          : state.cart.map(item =>
              item.product.id === productId ? { ...item, quantity } : item,
            ),
    }));
  },

  getCartTotal: () => {
    const { cart } = get();
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  },

  getCartItemCount: () => {
    const { cart } = get();
    return cart.reduce((count, item) => count + item.quantity, 0);
  },

  triggerCartAnimation: () => {
    set({ cartBadgeScale: 1.3 });
    setTimeout(() => set({ cartBadgeScale: 1 }), 200);
  },

  setFlyingImage: (
    product: Product | null,
    position: { x: number; y: number } | null,
  ) => {
    set({ flyingProduct: product, flyingImagePosition: position });
  },
}));
