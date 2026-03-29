import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, Image } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeroStore } from '../store/heroStore';
import { CAROUSEL_CONFIG } from '../utils/constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ANIMATION_DURATION = 550;
const HEADER_HEIGHT = 57;

export const HeroImage: React.FC = () => {
  const { sourcePosition, imageUri, isAnimating, clearHero } = useHeroStore();
  const insets = useSafeAreaInsets();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const width = useSharedValue(0);
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);
  const borderRadius = useSharedValue(0);

  useEffect(() => {
    if (sourcePosition && imageUri && isAnimating) {
      translateX.value = sourcePosition.x;
      translateY.value = sourcePosition.y;
      width.value = sourcePosition.width;
      height.value = sourcePosition.height;
      opacity.value = 1;
      const targetX = 0;
      const targetY = insets.top + HEADER_HEIGHT + 20;
      const targetWidth = SCREEN_WIDTH;
      const targetHeight = CAROUSEL_CONFIG.imageHeight;

      const timingConfig = {
        duration: ANIMATION_DURATION,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      };

      translateX.value = withTiming(targetX, timingConfig);
      translateY.value = withTiming(targetY, timingConfig);
      width.value = withTiming(targetWidth, timingConfig);
      height.value = withTiming(targetHeight, timingConfig);
      borderRadius.value = withTiming(0, timingConfig);

      // Clear after animation completes - fade out before carousel fades in
      setTimeout(() => {
        opacity.value = withTiming(0, { duration: 150 }, finished => {
          if (finished) {
            runOnJS(clearHero)();
          }
        });
      }, ANIMATION_DURATION);
    }
  }, [
    sourcePosition,
    imageUri,
    isAnimating,
    translateX,
    translateY,
    width,
    height,
    opacity,
    borderRadius,
    clearHero,
    insets.top,
  ]);

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: translateX.value,
    top: translateY.value,
    width: width.value,
    height: height.value,
    opacity: opacity.value,
    borderRadius: borderRadius.value,
    zIndex: 9999,
    elevation: 9999,
  }));

  if (!imageUri || !isAnimating) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="cover"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
