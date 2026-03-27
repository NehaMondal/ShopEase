import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CartBadge} from './CartBadge';
import {COLORS, SPACING, FONT_SIZE} from '../utils/constants';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showCart?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showCart = true,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {showBack && (
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Text style={styles.backIcon}>←</Text>
          </Pressable>
        )}
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.rightSection}>
        {showCart && (
          <View style={styles.cartButton}>
            <Text style={styles.cartIcon}>🛒</Text>
            <CartBadge />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  leftSection: {
    width: 44,
    alignItems: 'flex-start',
  },
  rightSection: {
    width: 44,
    alignItems: 'flex-end',
  },
  title: {
    flex: 1,
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  backButton: {
    padding: SPACING.xs,
  },
  backIcon: {
    fontSize: FONT_SIZE.xxl,
    color: COLORS.text,
  },
  cartButton: {
    padding: SPACING.xs,
    position: 'relative',
  },
  cartIcon: {
    fontSize: FONT_SIZE.xl,
  },
});
