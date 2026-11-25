

export type ApiResponse<T> = {
  status: boolean;
  code: number;
  message?: string;
  payload: T;
};

export type ApiProduct = {
  id: string;
  title: string;
  description: string;
  rating: number;
  ratings: number;
  stock: number;
  price: string;
  discountType: "PERCENT" | "FIXED" | null;
  discountValue: string;
  cover: string;
  gallery: string; // JSON string
  categoryId: string;
  subCategoryId: string | null;
  createdAt: string;
  updatedAt: string;
  category?: { id: string; title: string };
};

export type Product = Omit<ApiProduct, "price" | "discountValue" | "gallery"> & {
  price: number;
  finalPrice: number;
  hasDiscount: boolean;
  images: string[];
};