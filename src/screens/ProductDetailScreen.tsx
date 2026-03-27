import React, {useCallback} from 'react';
import {StyleSheet, Text, View, ScrollView, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RouteProp, useRoute} from '@react-navigation/native';
import Animated, {
  FadeInUp,
  FadeInDown,
  SlideInRight,
} from 'react-native-reanimated';
import {ImageCarousel, Header, AddToCartButton, FlyingImage} from '../components';
import {RootStackParamList} from '../types';
import {COLORS, SPACING, FONT_SIZE, BORDER_RADIUS} from '../utils/constants';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

export const ProductDetailScreen: React.FC = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const {product} = route.params;

  const handleAddToCart = useCallback((position: {x: number; y: number}) => {
    // Animation is handled by the FlyingImage component
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />
      <Header title={product.name} showBack showCart />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={true}>
        <ImageCarousel images={product.images} productId={product.id} />

        <View style={styles.content}>
          <Animated.View
            entering={FadeInUp.delay(100).duration(400).springify()}>
            <View style={styles.categoryRow}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{product.category}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Text style={styles.star}>★</Text>
                <Text style={styles.rating}>{product.rating}</Text>
                <Text style={styles.reviews}>({product.reviews} reviews)</Text>
              </View>
            </View>
          </Animated.View>

          <Animated.Text
            style={styles.name}
            entering={FadeInUp.delay(150).duration(400).springify()}>
            {product.name}
          </Animated.Text>

          <Animated.Text
            style={styles.price}
            entering={FadeInUp.delay(200).duration(400).springify()}>
            ${product.price.toFixed(2)}
          </Animated.Text>

          <Animated.View
            entering={FadeInUp.delay(250).duration(400).springify()}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </Animated.View>

          <Animated.View
            style={styles.features}
            entering={SlideInRight.delay(300).duration(400).springify()}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.featureList}>
              <FeatureItem icon="✓" text="Premium Quality Materials" />
              <FeatureItem icon="✓" text="Free Shipping Worldwide" />
              <FeatureItem icon="✓" text="30-Day Return Policy" />
              <FeatureItem icon="✓" text="1 Year Warranty" />
            </View>
          </Animated.View>
        </View>
      </ScrollView>

      <Animated.View
        style={styles.footer}
        entering={FadeInDown.delay(400).duration(400).springify()}>
        <AddToCartButton product={product} onAddToCart={handleAddToCart} />
      </Animated.View>
      <FlyingImage />
    </SafeAreaView>
  );
};

interface FeatureItemProps {
  icon: string;
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({icon, text}) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    marginTop: -SPACING.lg,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  categoryBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  categoryText: {
    color: COLORS.surface,
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    color: COLORS.star,
    fontSize: FONT_SIZE.md,
    marginRight: 4,
  },
  rating: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.text,
    marginRight: SPACING.xs,
  },
  reviews: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  name: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.sm,
    lineHeight: 32,
  },
  price: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: '800',
    color: COLORS.accent,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: SPACING.lg,
  },
  features: {
    marginBottom: SPACING.xl,
  },
  featureList: {
    gap: SPACING.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  featureIcon: {
    fontSize: FONT_SIZE.md,
    color: COLORS.success,
    marginRight: SPACING.md,
    fontWeight: '700',
  },
  featureText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
  },
  footer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});
