import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  FadeIn,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import { useHeroStore } from '../store/heroStore';
import {
  COLORS,
  SPACING,
  CAROUSEL_CONFIG,
  BORDER_RADIUS,
} from '../utils/constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HERO_ANIMATION_DELAY = 490;

interface ImageCarouselProps {
  images: string[];
  productId: string;
}

interface CarouselImageProps {
  uri: string;
  index: number;
  scrollX: SharedValue<number>;
  productId: string;
  isFirst: boolean;
  shouldDelay: boolean;
}

const CarouselImage: React.FC<CarouselImageProps> = React.memo(
  ({ uri, index, scrollX, productId, isFirst, shouldDelay }) => {
    const [isVisible, setIsVisible] = useState(!isFirst || !shouldDelay);

    useEffect(() => {
      if (isFirst && shouldDelay) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, HERO_ANIMATION_DELAY);
        return () => clearTimeout(timer);
      } else if (isFirst && !shouldDelay) {
        setIsVisible(true);
      }
    }, [isFirst, shouldDelay]);
    const animatedStyle = useAnimatedStyle(() => {
      const inputRange = [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ];

      const scale = interpolate(
        scrollX.value,
        inputRange,
        [0.85, 1, 0.85],
        Extrapolation.CLAMP,
      );

      const translateX = interpolate(
        scrollX.value,
        inputRange,
        [-30, 0, 30],
        Extrapolation.CLAMP,
      );

      const opacity = interpolate(
        scrollX.value,
        inputRange,
        [0.5, 1, 0.5],
        Extrapolation.CLAMP,
      );

      return {
        transform: [{ scale }, { translateX }],
        opacity,
      };
    });

    if (!isVisible) {
      return <View style={styles.imageWrapper} />;
    }

    return (
      <View style={styles.imageWrapper}>
        <Animated.Image
          source={{ uri }}
          style={[styles.image, animatedStyle]}
          resizeMode="cover"
          entering={isFirst && shouldDelay ? FadeIn.duration(200) : undefined}
        />
      </View>
    );
  },
);

interface PaginationDotProps {
  index: number;
  scrollX: SharedValue<number>;
}

const PaginationDot: React.FC<PaginationDotProps> = React.memo(
  ({ index, scrollX }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const inputRange = [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ];

      const width = interpolate(
        scrollX.value,
        inputRange,
        [
          CAROUSEL_CONFIG.dotSize,
          CAROUSEL_CONFIG.activeDotSize,
          CAROUSEL_CONFIG.dotSize,
        ],
        Extrapolation.CLAMP,
      );

      const opacity = interpolate(
        scrollX.value,
        inputRange,
        [0.4, 1, 0.4],
        Extrapolation.CLAMP,
      );

      return {
        width,
        opacity,
      };
    });

    return <Animated.View style={[styles.dot, animatedStyle]} />;
  },
);

export const ImageCarousel: React.FC<ImageCarouselProps> = React.memo(
  ({ images, productId }) => {
    const scrollX = useSharedValue(0);
    const isAnimating = useHeroStore(state => state.isAnimating);

    const scrollHandler = useAnimatedScrollHandler({
      onScroll: event => {
        scrollX.value = event.contentOffset.x;
      },
    });

    const renderImage = useCallback(
      (uri: string, index: number) => (
        <CarouselImage
          key={`${productId}-image-${index}`}
          uri={uri}
          index={index}
          scrollX={scrollX}
          productId={productId}
          isFirst={index === 0}
          shouldDelay={isAnimating}
        />
      ),
      [productId, scrollX, isAnimating],
    );

    return (
      <View style={styles.container}>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          decelerationRate="fast"
          bounces={false}
        >
          {images.map(renderImage)}
        </Animated.ScrollView>
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <PaginationDot
              key={`dot-${index}`}
              index={index}
              scrollX={scrollX}
            />
          ))}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    height: CAROUSEL_CONFIG.imageHeight,
    backgroundColor: COLORS.background,
  },
  imageWrapper: {
    width: SCREEN_WIDTH,
    height: CAROUSEL_CONFIG.imageHeight,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: SCREEN_WIDTH,
    height: CAROUSEL_CONFIG.imageHeight,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: SPACING.xl,
    left: 0,
    right: 0,
    gap: SPACING.sm,
  },
  dot: {
    height: CAROUSEL_CONFIG.dotSize,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.surface,
  },
});
