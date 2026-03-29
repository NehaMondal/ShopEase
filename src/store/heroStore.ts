import { create } from 'zustand';

interface ImagePosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface HeroState {
  activeProductId: string | null;
  sourcePosition: ImagePosition | null;
  imageUri: string | null;
  isAnimating: boolean;
  setHeroSource: (
    productId: string,
    position: ImagePosition,
    imageUri: string,
  ) => void;
  clearHero: () => void;
  setAnimating: (isAnimating: boolean) => void;
}

export const useHeroStore = create<HeroState>(set => ({
  activeProductId: null,
  sourcePosition: null,
  imageUri: null,
  isAnimating: false,
  setHeroSource: (productId, position, imageUri) => {
    set({
      activeProductId: productId,
      sourcePosition: position,
      imageUri,
      isAnimating: true,
    });
  },
  clearHero: () => {
    set({
      activeProductId: null,
      sourcePosition: null,
      imageUri: null,
      isAnimating: false,
    });
  },
  setAnimating: isAnimating => {
    set({ isAnimating });
  },
}));
