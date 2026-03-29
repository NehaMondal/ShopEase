import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import { COLORS, FONT_SIZE } from '../utils/constants';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.2, {
        duration: 800,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, []);

  useEffect(() => {
    opacity.value = withDelay(
      1500,
      withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      }),
    );

    const timer = setTimeout(() => {
      onFinish();
    }, 1800);

    return () => clearTimeout(timer);
  }, [opacity, onFinish]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const loadingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>🛍️</Text>
        </View>
        <Text style={styles.appName}>ShopEase</Text>
        <Animated.View style={[styles.loadingContainer, loadingStyle]}>
          <View style={styles.loadingDot} />
          <View style={[styles.loadingDot, styles.loadingDot2]} />
          <View style={[styles.loadingDot, styles.loadingDot3]} />
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  iconText: {
    fontSize: 60,
  },
  appName: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 24,
    marginBottom: 8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginHorizontal: 4,
  },
  loadingDot2: {
    opacity: 0.7,
  },
  loadingDot3: {
    opacity: 0.4,
  },
});
