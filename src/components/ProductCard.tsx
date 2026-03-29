import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { getProductById } from '../data/products';
import { useHeroStore } from '../store/heroStore';
import {
  COLORS,
  SPACING,
  FONT_SIZE,
  BORDER_RADIUS,
  GRID_CONFIG,
} from '../utils/constants';

interface ProductCardProps {
  productId: string;
  onPress: (productId: string) => void;
  index: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const ProductCard: React.FC<ProductCardProps> = React.memo(
  ({ productId, onPress, index }) => {
    const product = useMemo(() => getProductById(productId), [productId]);
    const imageRef = useRef<View>(null);
    const setHeroSource = useHeroStore(state => state.setHeroSource);
    const scale = useSharedValue(1);

    const handlePressIn = () => {
      scale.value = withSpring(0.96);
    };

    const handlePressOut = () => {
      scale.value = withSpring(1);
    };

    const handlePress = useCallback(() => {
      if (imageRef.current && product) {
        imageRef.current.measureInWindow((x, y, width, height) => {
          setHeroSource(productId, { x, y, width, height }, product.images[0]);
          onPress(productId);
        });
      } else {
        onPress(productId);
      }
    }, [onPress, productId, product, setHeroSource]);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    if (!product) {
      return null;
    }

    return (
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={[styles.container, animatedStyle]}
      >
        <View ref={imageRef} style={styles.imageContainer} collapsable={false}>
          <FastImage
            source={{ uri: product?.images[0] }}
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={2}>
            {product.name}
          </Text>
          <View style={styles.ratingRow}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.rating}>{product.rating}</Text>
            <Text style={styles.reviews}>({product.reviews})</Text>
          </View>
          <Text style={styles.price}>₹{product.price.toLocaleString('en-IN')}</Text>
        </View>
      </AnimatedPressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: GRID_CONFIG.itemWidth,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: GRID_CONFIG.itemWidth * 1.1,
    overflow: 'hidden',
    backgroundColor: COLORS.background,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    top: SPACING.sm,
    left: SPACING.sm,
    backgroundColor: 'rgba(26, 26, 46, 0.8)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  categoryText: {
    color: COLORS.surface,
    fontSize: FONT_SIZE.xs,
    fontWeight: '600',
  },
  infoContainer: {
    padding: SPACING.md,
  },
  name: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
    lineHeight: 20,
    height: 40,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  star: {
    color: COLORS.star,
    fontSize: FONT_SIZE.sm,
    marginRight: 2,
  },
  rating: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.text,
    marginRight: SPACING.xs,
  },
  reviews: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  price: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.accent,
  },
});
