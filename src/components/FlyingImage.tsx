import React, { useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useStore } from '../store/useStore';
import { COLORS, BORDER_RADIUS } from '../utils/constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CART_ICON_POSITION = { x: SCREEN_WIDTH - 50, y: 50 };
const FLYING_IMAGE_SIZE = 60;
const ANIMATION_DURATION = 1000;

export const FlyingImage: React.FC = () => {
  const flyingProduct = useStore(state => state.flyingProduct);
  const flyingImagePosition = useStore(state => state.flyingImagePosition);
  const setFlyingImage = useStore(state => state.setFlyingImage);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (flyingProduct && flyingImagePosition) {
      translateX.value = flyingImagePosition.x - FLYING_IMAGE_SIZE / 2;
      translateY.value = flyingImagePosition.y - FLYING_IMAGE_SIZE / 2;
      scale.value = 1;
      opacity.value = 1;

      const targetX = CART_ICON_POSITION.x - FLYING_IMAGE_SIZE / 2;
      const targetY = CART_ICON_POSITION.y - FLYING_IMAGE_SIZE / 2;

      translateX.value = withTiming(targetX, { duration: ANIMATION_DURATION });
      translateY.value = withTiming(targetY, { duration: ANIMATION_DURATION });
      scale.value = withTiming(0.3, { duration: ANIMATION_DURATION });
      opacity.value = withTiming(0, { duration: ANIMATION_DURATION });

      setTimeout(() => {
        setFlyingImage(null, null);
      }, ANIMATION_DURATION);
    }
  }, [flyingProduct, flyingImagePosition]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  if (!flyingProduct || !flyingImagePosition) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <FastImage
        source={{ uri: flyingProduct?.images?.[0] }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover}
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
