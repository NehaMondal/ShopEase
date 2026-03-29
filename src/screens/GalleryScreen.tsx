import React, { useCallback } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProductCard, Header } from '../components';
import { products } from '../data/products';
import { Product, RootStackParamList } from '../types';
import { COLORS, SPACING, GRID_CONFIG } from '../utils/constants';

type GalleryNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Gallery'
>;

const ITEM_HEIGHT = GRID_CONFIG.itemWidth * 1.5;

const getItemLayout = (_: unknown, index: number) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * Math.floor(index / 2),
  index,
});

const keyExtractor = (item: Product) => item.id;

export const GalleryScreen: React.FC = () => {
  const navigation = useNavigation<GalleryNavigationProp>();

  const handleProductPress = useCallback(
    (productId: string) => {
      navigation.navigate('ProductDetail', { productId });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Product; index: number }) => (
      <ProductCard
        productId={item.id}
        onPress={handleProductPress}
        index={index}
      />
    ),
    [handleProductPress],
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="ShopEase" showCart />
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={GRID_CONFIG.numColumns}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        getItemLayout={getItemLayout}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  listHeader: {
    height: SPACING.md,
  },
  listFooter: {
    height: SPACING.xxl,
  },
});
