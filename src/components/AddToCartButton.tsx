import React, { useRef } from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import {
  COLORS,
  SPACING,
  FONT_SIZE,
  BORDER_RADIUS,
} from '../utils/constants';

interface AddToCartButtonProps {
  product: Product;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const addToCart = useStore(state => state.addToCart);
  const setFlyingImage = useStore(state => state.setFlyingImage);
  const buttonRef = useRef<View>(null);
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handlePress = () => {
    addToCart(product);
    if (buttonRef.current) {
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        const centerX = pageX + width / 2;
        const centerY = pageY + height / 2;
        setFlyingImage(product, { x: centerX, y: centerY });
      });
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View ref={buttonRef} collapsable={false}>
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={[styles.button, animatedStyle]}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
        <Text style={styles.priceText}>₹{product.price.toLocaleString('en-IN')}</Text>
      </AnimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: COLORS.surface,
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
  },
  priceText: {
    color: COLORS.surface,
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
  },
});
