export interface ProductFeature {
  icon: string;
  text: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  rating: number;
  reviews: number;
  features: ProductFeature[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type RootStackParamList = {
  Gallery: undefined;
  ProductDetail: {
    productId: string;
  };
};
