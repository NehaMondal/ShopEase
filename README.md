# ShopEase - E-Commerce Product Gallery

A performant React Native e-commerce application with smooth animations and optimized user experience. Prices displayed in Indian Rupees (₹).

## Demo

https://github.com/user-attachments/assets/08cad7e5-a5fb-4885-b329-0af64233cbb3

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
| react-native-fast-image        | 8.6.3   | Image caching and performance           |

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
  - Linear trajectory
  - Scale reduction (1 → 0.3)
  - Opacity fade
- **Cart Badge Bounce**: Scale pulse animation (1 → 1.4 → 1) on every cart count change

### Splash Screen

- **Native Splash**: Light background (#F8F9FA) with centered icon
  - Android: App icon via `splash_background.xml` drawable
  - iOS: Shopping bag emoji (🛍️) via storyboard, matching JS splash
- **JS Splash**: Shopping bag emoji icon (🛍️), app name, and animated loading dots
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

**Verification**: Tested on Android emulator and physical devices using Flashlight's Performance Monitor. Confirmed consistent 58~59 FPS during carousel swipes, hero transitions, and add-to-cart animations.

### FlatList Tuning

- `getItemLayout` moved outside component to avoid recreation
- `keyExtractor` defined outside render
- Simplified rendering without extra wrapper components

### Component Design

- `React.memo` on list items and carousel images
- Product data fetched by ID rather than passing full objects through props
- Simplified animations using `withSpring` defaults for cleaner code

## Known Limitations & Trade-offs

1. **Hero Animation**: Custom implementation using manual position measurement and Reanimated worklets. Replaced `sharedTransitionTag` due to reliability issues on physical devices. Current implementation provides consistent 58~59 FPS performance across all tested devices.

2. **Cart Persistence**: State is in-memory only. For production, integrate with AsyncStorage or backend.

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
- **Flying image**: 1-second linear trajectory with scale and fade
- **Cart badge**: Bounce animation using `withSequence` for visual feedback
- **Splash screen**: Native splash + JS loading dots animation

### Currency

All prices are displayed in Indian Rupees (₹) with locale formatting (`toLocaleString('en-IN')`).

---

## Design Communication Brief

**To**: Lead Product Designer  
**Subject**: Animation Implementation Strategy for ShopEase

Hi,

I wanted to share my approach to the animation implementation for the product gallery. For the hero transition between gallery and detail screens, I implemented a custom solution using Zustand for state management and Reanimated worklets for UI-thread animations. After testing Reanimated's experimental `sharedTransitionTag` API, I found reliability issues on physical devices, so I built a manual implementation that measures source image position using `measureInWindow`, renders an overlay image at that exact position, and animates position, size, and border radius to the destination.

The flying image animation uses a linear trajectory with scale and fade. These trade-offs ensure the app maintains 58~59 FPS on mid-range Android devices while keeping the codebase clean and maintainable.

For image loading, I integrated `react-native-fast-image` for disk and memory caching. Since FastImage doesn't support animated styles directly, I wrapped images in `Animated.View` components for the carousel parallax effects. The cart badge uses a `withSequence` animation (scale 1 → 1.3 → 1) to provide clear visual feedback when items are added, with careful ref management to ensure the animation completes properly on repeated additions of the same product.

Best regards
