import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const COLORS = {
  primary: '#1A1A2E',
  secondary: '#16213E',
  accent: '#E94560',
  background: '#F8F9FA',
  surface: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#6C757D',
  textLight: '#ADB5BD',
  border: '#E9ECEF',
  success: '#28A745',
  warning: '#FFC107',
  star: '#FFD700',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONT_SIZE = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const ANIMATION_CONFIG = {
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
  springFast: {
    damping: 20,
    stiffness: 300,
    mass: 0.8,
  },
  springBouncy: {
    damping: 10,
    stiffness: 180,
    mass: 1,
  },
  timing: {
    duration: 300,
  },
  timingFast: {
    duration: 200,
  },
};

export const GRID_CONFIG = {
  numColumns: 2,
  gap: SPACING.md,
  itemWidth: (SCREEN_WIDTH - SPACING.md * 3) / 2,
};

export const CAROUSEL_CONFIG = {
  imageHeight: SCREEN_HEIGHT * 0.45,
  dotSize: 8,
  activeDotSize: 24,
};
