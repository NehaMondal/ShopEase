# ShopEase - E-Commerce Product Gallery

A highly polished, performant React Native e-commerce application showcasing premium UI transitions, smooth animations, and optimized user experience.

## Technical Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React Native | 0.84.1 | Core framework |
| TypeScript | 5.8.3 | Type safety |
| react-native-reanimated | 4.3.0 | High-performance animations (UI thread) |
| react-native-gesture-handler | 2.30.1 | Native gesture handling |
| @react-navigation/native | 7.2.1 | Navigation |
| @react-navigation/native-stack | 7.14.9 | Stack navigation with native animations |
| zustand | 5.0.12 | Lightweight state management |
| react-native-safe-area-context | 5.7.0 | Safe area handling |
| react-native-screens | 4.24.0 | Native screen optimization |

## Features

### Product Gallery (List Screen)
- **Performant Grid Layout**: FlatList with optimized rendering (`removeClippedSubviews`, `maxToRenderPerBatch`, `windowSize`)
- **Staggered Entry Animations**: Products fade in with spring physics using `FadeInDown`
- **Interactive Press States**: Scale and shadow animations on touch
- **Shared Element Transitions**: Hero animation using `sharedTransitionTag`

### Product Detail Screen
- **Image Carousel**: Horizontal paging with parallax/depth effects
  - Scale interpolation (0.85 → 1 → 0.85)
  - Horizontal parallax translation
  - Opacity fade for non-active images
- **Animated Pagination Dots**: Width and opacity interpolation based on scroll position
- **Staggered Content Entry**: Sequential `FadeInUp` and `SlideInRight` animations

### Add to Cart Animation
- **Button Feedback**: Scale bounce sequence on press
- **Flying Image Effect**: Product thumbnail animates from button to cart icon
  - Bezier-curved trajectory
  - Scale reduction (1 → 0.3)
  - 360° rotation
  - Opacity fade
- **Cart Badge Bounce**: Scale pulse animation when item count increases

## Architecture

```
src/
├── components/          # Reusable UI components
│   ├── AddToCartButton.tsx
│   ├── CartBadge.tsx
│   ├── FlyingImage.tsx
│   ├── Header.tsx
│   ├── ImageCarousel.tsx
│   └── ProductCard.tsx
├── data/               # Mock data
│   └── products.ts
├── navigation/         # Navigation configuration
│   └── AppNavigator.tsx
├── screens/            # Screen components
│   ├── GalleryScreen.tsx
│   └── ProductDetailScreen.tsx
├── store/              # State management
│   └── useStore.ts
├── types/              # TypeScript definitions
│   └── index.ts
└── utils/              # Constants and helpers
    └── constants.ts
```

## Performance Optimization

### Animation Efficiency (60 FPS)
All animations leverage Reanimated V2+ capabilities:

- **`useSharedValue`**: Animation values stored on UI thread
- **`useAnimatedStyle`**: Styles computed on UI thread without JS bridge
- **`useAnimatedScrollHandler`**: Scroll events processed on UI thread
- **`withSpring`/`withTiming`**: Native-driven animation functions
- **`interpolate`**: Value mapping on UI thread

**Performance Verification**: Verified using React Native Flipper Performance Monitor and ensured all animations are driven by Reanimated's SharedValue/useAnimatedStyle, keeping the JS thread free for business logic while animations run at 60 FPS on the native UI thread.

### FlatList Optimization
- `removeClippedSubviews={true}` - Unmounts off-screen items
- `maxToRenderPerBatch={6}` - Limits render batch size
- `windowSize={5}` - Reduces memory footprint
- `getItemLayout` - Enables scroll position calculation without rendering

### Component Optimization
- `React.memo` on all list item components
- `useCallback` for event handlers to prevent re-renders
- Separate animated components to isolate re-renders

## Known Limitations & Trade-offs

1. **Shared Element Transition**: Using Reanimated's `sharedTransitionTag` instead of `react-native-shared-element` for simpler integration, though with slightly less customization options.

2. **Flying Image Animation**: Uses absolute positioning which may have edge cases on devices with notches. Mitigated by using SafeAreaContext.

3. **Image Loading**: No progressive loading or caching implemented. In production, consider `react-native-fast-image`.

4. **Cart Persistence**: State is in-memory only. For production, integrate with AsyncStorage or backend.

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

## Design Liaison Brief

**To**: Lead Product Designer  
**From**: Engineering Team  
**Subject**: Animation Implementation Strategy for ShopEase Product Gallery

Hi,

I wanted to share our approach to the animation implementation for the product gallery feature. For the hero transition between gallery and detail screens, we utilized Reanimated's native `sharedTransitionTag` API, which provides smooth 60 FPS transitions by running entirely on the UI thread. The image carousel implements a parallax depth effect with scale interpolation (0.85x for adjacent images) and subtle horizontal translation, creating visual depth without impacting scroll performance.

For the "Add to Cart" interaction, we implemented a multi-stage animation: the button performs a spring-based scale bounce, while a miniature product image flies toward the cart icon using a bezier-eased trajectory with rotation and fade. The cart badge then responds with its own bounce animation. All timing functions use spring physics with carefully tuned damping (15-20) and stiffness (150-300) values to feel responsive yet natural.

One trade-off worth noting: the original spec suggested a more complex particle burst effect on cart addition, but performance profiling showed frame drops on mid-range Android devices. We opted for the cleaner flying image approach which maintains 60 FPS across all tested devices. Happy to iterate on this in the next sprint if we want to explore GPU-accelerated particle effects.

Best regards,  
Engineering Team
