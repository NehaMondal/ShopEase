import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import {useStore} from '../store/useStore';
import {COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, ANIMATION_CONFIG} from '../utils/constants';

export const CartBadge: React.FC = () => {
  const cartItemCount = useStore(state => state.getCartItemCount());
  const scale = useSharedValue(1);
  const previousCount = useSharedValue(cartItemCount);

  useEffect(() => {
    if (cartItemCount > previousCount.value) {
      scale.value = withSequence(
        withSpring(1.4, ANIMATION_CONFIG.springBouncy),
        withSpring(1, ANIMATION_CONFIG.spring),
      );
    }
    previousCount.value = cartItemCount;
  }, [cartItemCount, scale, previousCount]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  if (cartItemCount === 0) {
    return null;
  }

  return (
    <Animated.View style={[styles.badge, animatedStyle]}>
      <Text style={styles.badgeText}>
        {cartItemCount > 99 ? '99+' : cartItemCount}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -SPACING.xs,
    right: -SPACING.xs,
    backgroundColor: COLORS.accent,
    minWidth: 20,
    height: 20,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xs,
  },
  badgeText: {
    color: COLORS.surface,
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
  },
});
