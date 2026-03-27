import React, {useCallback} from 'react';
import {StyleSheet, View, FlatList, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {ProductCard, Header, FlyingImage} from '../components';
import {products} from '../data/products';
import {Product, RootStackParamList} from '../types';
import {COLORS, SPACING, GRID_CONFIG} from '../utils/constants';

type GalleryNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Gallery'
>;

export const GalleryScreen: React.FC = () => {
  const navigation = useNavigation<GalleryNavigationProp>();

  const handleProductPress = useCallback(
    (product: Product) => {
      navigation.navigate('ProductDetail', {
        product,
        sharedTransitionTag: `product-image-${product.id}`,
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({item, index}: {item: Product; index: number}) => (
      <Animated.View
        entering={FadeInDown.delay(index * 50)
          .duration(400)
          .springify()}>
        <ProductCard product={item} onPress={handleProductPress} index={index} />
      </Animated.View>
    ),
    [handleProductPress],
  );

  const keyExtractor = useCallback((item: Product) => item.id, []);

  const ListHeaderComponent = useCallback(
    () => <View style={styles.listHeader} />,
    [],
  );

  const ListFooterComponent = useCallback(
    () => <View style={styles.listFooter} />,
    [],
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
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        removeClippedSubviews={true}
        maxToRenderPerBatch={6}
        windowSize={5}
        initialNumToRender={6}
        getItemLayout={(_, index) => ({
          length: GRID_CONFIG.itemWidth * 1.5,
          offset: GRID_CONFIG.itemWidth * 1.5 * Math.floor(index / 2),
          index,
        })}
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
