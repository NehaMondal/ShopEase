import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, Image } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { useStore } from '../store/useStore';
import { COLORS, BORDER_RADIUS } from '../utils/constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CART_ICON_POSITION = {
  x: SCREEN_WIDTH - 50,
  y: 50,
};

const FLYING_IMAGE_SIZE = 60;

export const FlyingImage: React.FC = () => {
  const flyingProduct = useStore(state => state.flyingProduct);
  const flyingImagePosition = useStore(state => state.flyingImagePosition);
  const setFlyingImage = useStore(state => state.setFlyingImage);
  const triggerCartAnimation = useStore(state => state.triggerCartAnimation);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (flyingProduct && flyingImagePosition) {
      translateX.value = flyingImagePosition.x - FLYING_IMAGE_SIZE / 2;
      translateY.value = flyingImagePosition.y - FLYING_IMAGE_SIZE / 2;
      scale.value = 1;
      opacity.value = 1;
      rotation.value = 0;

      const targetX = CART_ICON_POSITION.x - FLYING_IMAGE_SIZE / 2;
      const targetY = CART_ICON_POSITION.y - FLYING_IMAGE_SIZE / 2;

      translateX.value = withTiming(targetX, {
        duration: 1000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });

      translateY.value = withTiming(targetY, {
        duration: 1000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });

      scale.value = withTiming(0.3, {
        duration: 1000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });

      rotation.value = withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      });

      opacity.value = withTiming(
        0,
        {
          duration: 1000,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        },
        finished => {
          if (finished) {
            runOnJS(triggerCartAnimation)();
            runOnJS(setFlyingImage)(null, null);
          }
        },
      );
    }
  }, [
    flyingProduct,
    flyingImagePosition,
    translateX,
    translateY,
    scale,
    opacity,
    rotation,
    setFlyingImage,
    triggerCartAnimation,
  ]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
    opacity: opacity.value,
  }));

  if (!flyingProduct || !flyingImagePosition) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Image
        source={{ uri: flyingProduct.images[0] }}
        style={styles.image}
        resizeMode="cover"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: FLYING_IMAGE_SIZE,
    height: FLYING_IMAGE_SIZE,
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
    zIndex: 1000,
    elevation: 1000,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
