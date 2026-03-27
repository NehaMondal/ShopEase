import React, {useCallback} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import {Product} from '../types';
import {
  COLORS,
  SPACING,
  FONT_SIZE,
  BORDER_RADIUS,
  GRID_CONFIG,
  ANIMATION_CONFIG,
} from '../utils/constants';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  index: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const ProductCard: React.FC<ProductCardProps> = React.memo(
  ({product, onPress, index}) => {
    const scale = useSharedValue(1);
    const pressed = useSharedValue(0);

    const handlePressIn = useCallback(() => {
      scale.value = withSpring(0.96, ANIMATION_CONFIG.springFast);
      pressed.value = withSpring(1, ANIMATION_CONFIG.springFast);
    }, [scale, pressed]);

    const handlePressOut = useCallback(() => {
      scale.value = withSpring(1, ANIMATION_CONFIG.springFast);
      pressed.value = withSpring(0, ANIMATION_CONFIG.springFast);
    }, [scale, pressed]);

    const handlePress = useCallback(() => {
      onPress(product);
    }, [onPress, product]);

    const animatedContainerStyle = useAnimatedStyle(() => {
      const shadowOpacity = interpolate(
        pressed.value,
        [0, 1],
        [0.1, 0.2],
        Extrapolation.CLAMP,
      );
      return {
        transform: [{scale: scale.value}],
        shadowOpacity,
      };
    });

    const animatedImageStyle = useAnimatedStyle(() => {
      const imageScale = interpolate(
        pressed.value,
        [0, 1],
        [1, 1.05],
        Extrapolation.CLAMP,
      );
      return {
        transform: [{scale: imageScale}],
      };
    });

    return (
      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={[styles.container, animatedContainerStyle]}>
        <View style={styles.imageContainer}>
          <Animated.Image
            source={{uri: product.images[0]}}
            style={[styles.image, animatedImageStyle]}
            resizeMode="cover"
            sharedTransitionTag={`product-image-${product.id}`}
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
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
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
    shadowOffset: {width: 0, height: 4},
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
