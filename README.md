# ShopEase - E-Commerce Product Gallery

A performant React Native e-commerce application with smooth animations and optimized user experience. Prices displayed in Indian Rupees (₹).

## Technical Stack

| Technology                     | Version | Purpose                                 |
| ------------------------------ | ------- | --------------------------------------- |
| React Native                   | 0.84.1  | Core framework                          |
| TypeScript                     | 5.8.3   | Type safety                             |
| react-native-reanimated        | 4.3.0   | High-performance animations (UI thread) |
| react-native-gesture-handler   | 2.30.1  | Native gesture handling                 |
| @react-navigation/native       | 7.2.1   | Navigation                              |
| @react-navigation/native-stack | 7.14.9  | Stack navigation with native animations |
| zustand                        | 5.0.12  | Lightweight state management            |
| react-native-safe-area-context | 5.7.0   | Safe area handling                      |
| react-native-screens           | 4.24.0  | Native screen optimization              |

## Features

### Product Gallery (List Screen)

- **Performant Grid Layout**: FlatList with optimized rendering
- **Simple Press States**: Scale animation on touch using `withSpring`
- **Custom Hero Animation**: Manual hero transition using Zustand state management and Reanimated worklets

### Product Detail Screen

- **Image Carousel**: Horizontal paging with parallax/depth effects
  - Scale interpolation (0.85 → 1 → 0.85)
  - Horizontal parallax translation
  - Opacity fade for non-active images
- **Animated Pagination Dots**: Width and opacity interpolation based on scroll position
- **Staggered Content Entry**: Sequential `FadeInUp` and `SlideInRight` animations

### Add to Cart Animation

- **Button Feedback**: Simple scale animation on press
- **Flying Image Effect**: Product thumbnail animates from button to cart icon (1000ms duration)
  - Bezier-curved trajectory
  - Scale reduction (1 → 0.3)
  - 360° rotation
  - Opacity fade
- **Cart Badge Bounce**: Scale pulse animation when item count increases

### Splash Screen

- **Native Splash**: Light background with app icon (Android)
- **JS Splash**: Shopping bag icon, app name, and shimmer loading animation
- **Smooth Transition**: Fades out after 1.5 seconds

## Architecture

```
src/
├── components/          # Reusable UI components
│   ├── AddToCartButton.tsx
│   ├── CartBadge.tsx
│   ├── FlyingImage.tsx
│   ├── Header.tsx
│   ├── HeroImage.tsx      # Custom hero animation overlay
│   ├── ImageCarousel.tsx
│   ├── ProductCard.tsx
│   └── SplashScreen.tsx   # JS splash screen with shimmer
├── data/               # Mock data
│   └── products.ts        # Product data with INR prices
├── navigation/         # Navigation configuration
│   └── AppNavigator.tsx
├── screens/            # Screen components
│   ├── GalleryScreen.tsx
│   └── ProductDetailScreen.tsx
├── store/              # State management
│   ├── heroStore.ts       # Hero animation state
│   └── useStore.ts        # Cart and app state
├── types/              # TypeScript definitions
│   └── index.ts
└── utils/              # Constants and helpers
    └── constants.ts
```

## Performance Optimization

### Animation Strategy

All animations run on the native UI thread via Reanimated, keeping the JS thread free:

- `useSharedValue` / `useAnimatedStyle` for UI-thread driven styles
- `useAnimatedScrollHandler` for scroll-driven animations without bridge overhead
- Spring physics (`withSpring`) tuned for natural feel (damping: 15-20, stiffness: 150-300)

**Verification**: Tested on Android emulator and physical devices using the built-in Performance Monitor (Dev Menu → Perf Monitor). Confirmed consistent 60 FPS during carousel swipes, hero transitions, and add-to-cart animations.

### FlatList Tuning

- `getItemLayout` moved outside component to avoid recreation
- `keyExtractor` defined outside render
- Simplified rendering without extra wrapper components

### Component Design

- `React.memo` on list items and carousel images
- Product data fetched by ID rather than passing full objects through props
- Simplified animations using `withSpring` defaults for cleaner code

## Known Limitations & Trade-offs

1. **Hero Animation**: Custom implementation using manual position measurement and Reanimated worklets. Replaced `sharedTransitionTag` due to reliability issues on physical devices. Current implementation provides consistent 60 FPS performance across all tested devices.

2. **Flying Image Animation**: Uses absolute positioning which may have edge cases on devices with notches. Mitigated by using SafeAreaContext.

3. **Image Loading**: No progressive loading or caching implemented. In production, consider `react-native-fast-image`.

4. **Cart Persistence**: State is in-memory only. For production, integrate with AsyncStorage or backend.

5. **Product Data**: Uses Map-based O(1) lookup for optimal performance when fetching products by ID.

## Getting Started

### Prerequisites

- Node.js >= 22.11.0
- React Native development environment set up

### Installation

```bash
# Install dependencies
npm install

# iOS only - Install CocoaPods
cd ios && bundle install && bundle exec pod install && cd ..

# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Design Notes

### Animation Philosophy

The app uses simplified animations for better maintainability:

- **Press animations**: Simple `withSpring(0.95)` / `withSpring(1)` for scale feedback
- **Hero transition**: Custom implementation using Zustand + Reanimated worklets
- **Flying image**: 1-second bezier trajectory with rotation and fade
- **Splash screen**: Native splash + JS shimmer animation

### Currency

All prices are displayed in Indian Rupees (₹) with locale formatting (`toLocaleString('en-IN')`).
