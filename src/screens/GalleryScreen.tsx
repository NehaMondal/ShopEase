import React, { useCallback } from 'react';
import { StyleSheet, View, FlatList, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ProductCard, Header, FlyingImage } from '../components';
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

const ListHeader = () => <View style={styles.listHeader} />;
const ListFooter = () => <View style={styles.listFooter} />;

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
      <Animated.View
        entering={FadeInDown.delay(index * 50)
          .duration(400)
          .springify()}
      >
        <ProductCard
          productId={item.id}
          onPress={handleProductPress}
          index={index}
        />
      </Animated.View>
    ),
    [handleProductPress],
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />
      <Header title="ShopEase" showCart />
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={GRID_CONFIG.numColumns}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        getItemLayout={getItemLayout}
      />
      <FlyingImage />
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
