export interface Product {
  id: string;
  title: string;
  description: string;
  rating: number;
  ratings: number;
  stock: number;
  price: string;
  discountType: "PERCENT" | "FIXED" | null;
  discountValue: string | null;
  cover: string;
  gallery: string;
  deletedAt: string | null;

  _count: {
    reviews: number;
    cartItems: number;
    wishlistItems: number;
    orderItems: number;
  };
}

export interface ProductsResponse {
  status: boolean;
  code: number;
  payload: {
    data: Product[];
    metadata: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}