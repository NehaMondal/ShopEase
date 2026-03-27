export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type RootStackParamList = {
  Gallery: undefined;
  ProductDetail: {
    product: Product;
    sharedTransitionTag: string;
  };
};
