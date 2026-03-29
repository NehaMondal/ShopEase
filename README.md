# ShopEase - E-Commerce Product Gallery

A highly polished, performant React Native e-commerce application showcasing premium UI transitions, smooth animations, and optimized user experience.

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

- **Performant Grid Layout**: FlatList with optimized rendering (`removeClippedSubviews`, `maxToRenderPerBatch`, `windowSize`)
- **Staggered Entry Animations**: Products fade in with spring physics using `FadeInDown`
- **Interactive Press States**: Scale and shadow animations on touch
- **Custom Hero Animation**: Manual hero transition using Zustand state management and Reanimated worklets

### Product Detail Screen

- **Image Carousel**: Horizontal paging with parallax/depth effects
  - Scale interpolation (0.85 → 1 → 0.85)
  - Horizontal parallax translation
  - Opacity fade for non-active images
- **Animated Pagination Dots**: Width and opacity interpolation based on scroll position
- **Staggered Content Entry**: Sequential `FadeInUp` and `SlideInRight` animations

### Add to Cart Animation

- **Button Feedback**: Scale bounce sequence on press
- **Flying Image Effect**: Product thumbnail animates from button to cart icon (1000ms duration)
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
│   ├── HeroImage.tsx      # Custom hero animation overlay
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
- `removeClippedSubviews`, `maxToRenderPerBatch`, `windowSize` configured for memory efficiency
- Static components (`ListHeader`, `ListFooter`, `keyExtractor`) defined outside render

### Component Design

- `React.memo` on list items and carousel images
- Product data fetched by ID rather than passing full objects through props
- Animated sub-components isolated to minimize re-render scope

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

## Design Liaison Brief

**To**: Lead Product Designer  
**Subject**: Animation Implementation Strategy for ShopEase Product Gallery

Hi,

I wanted to share my approach to the animation implementation for the product gallery feature. For the hero transition between gallery and detail screens, I have implemented a custom solution using Zustand for state management and Reanimated worklets for UI-thread animations. After testing Reanimated's experimental `sharedTransitionTag` API, we found reliability issues on physical devices, so we built a manual implementation that:

1. Measures the source image position using `measureInWindow` (with `requestAnimationFrame` for accuracy)
2. Renders an overlay image at the exact source position
3. Animates position, size, and border radius to the destination (550ms bezier curve)
4. Delays carousel image appearance (700ms) to prevent flicker
5. Fades out the overlay once the carousel is visible

This approach provides consistent 60 FPS performance and pixel-perfect positioning across all tested devices. The image carousel implements a parallax depth effect with scale interpolation (0.85x for adjacent images) and subtle horizontal translation, creating visual depth without impacting scroll performance.

For the "Add to Cart" interaction, I have implemented a multi-stage animation: the button performs a spring-based scale bounce, while a miniature product image flies toward the cart icon using a 1-second bezier-eased trajectory with rotation and fade. The cart badge then responds with its own bounce animation. All timing functions use spring physics with carefully tuned damping (15-20) and stiffness (150-300) values to feel responsive yet natural.

One trade-off worth noting: the original spec suggested a more complex particle burst effect on cart addition, but performance profiling showed frame drops on mid-range Android devices. We opted for the cleaner flying image approach which maintains 60 FPS across all tested devices. The hero animation required careful zIndex management to ensure the content section's rounded corners remain visible above the animating overlay.

Best regards,  
Engineering Team
