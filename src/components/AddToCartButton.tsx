import React, {useCallback, useRef} from 'react';
import {StyleSheet, Text, Pressable, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  interpolateColor,
} from 'react-native-reanimated';
import {Product} from '../types';
import {useStore} from '../store/useStore';
import {
  COLORS,
  SPACING,
  FONT_SIZE,
  BORDER_RADIUS,
  ANIMATION_CONFIG,
} from '../utils/constants';

interface AddToCartButtonProps {
  product: Product;
  onAddToCart?: (position: {x: number; y: number}) => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  onAddToCart,
}) => {
  const addToCart = useStore(state => state.addToCart);
  const setFlyingImage = useStore(state => state.setFlyingImage);
  const buttonRef = useRef<View>(null);

  const scale = useSharedValue(1);
  const pressed = useSharedValue(0);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.95, ANIMATION_CONFIG.springFast);
    pressed.value = withSpring(1, ANIMATION_CONFIG.springFast);
  }, [scale, pressed]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION_CONFIG.springFast);
    pressed.value = withSpring(0, ANIMATION_CONFIG.springFast);
  }, [scale, pressed]);

  const handlePress = useCallback(() => {
    scale.value = withSequence(
      withSpring(0.9, ANIMATION_CONFIG.springFast),
      withSpring(1.05, ANIMATION_CONFIG.springBouncy),
      withSpring(1, ANIMATION_CONFIG.spring),
    );

    addToCart(product);

    if (buttonRef.current) {
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        const centerX = pageX + width / 2;
        const centerY = pageY + height / 2;
        setFlyingImage(product, {x: centerX, y: centerY});
        onAddToCart?.({x: centerX, y: centerY});
      });
    }
  }, [scale, addToCart, product, setFlyingImage, onAddToCart]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      pressed.value,
      [0, 1],
      [COLORS.accent, '#C73E52'],
    );

    return {
      transform: [{scale: scale.value}],
      backgroundColor,
    };
  });

  return (
    <View ref={buttonRef} collapsable={false}>
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={[styles.button, animatedStyle]}>
        <Text style={styles.buttonText}>Add to Cart</Text>
        <Text style={styles.priceText}>${product.price.toFixed(2)}</Text>
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
    shadowOffset: {width: 0, height: 4},
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
