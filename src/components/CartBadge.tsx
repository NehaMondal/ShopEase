import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useStore } from '../store/useStore';
import {
  COLORS,
  SPACING,
  FONT_SIZE,
  BORDER_RADIUS,
} from '../utils/constants';

export const CartBadge: React.FC = () => {
  const cartItemCount = useStore(state => state.getCartItemCount());

  if (cartItemCount === 0) {
    return null;
  }

  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>
        {cartItemCount > 99 ? '99+' : cartItemCount}
      </Text>
    </View>
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
