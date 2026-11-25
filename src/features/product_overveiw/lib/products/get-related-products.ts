const API = process.env.NEXT_PUBLIC_API_URL ?? "https://rose-app.elevate-bootcamp.cloud/api";

export type RelatedProduct = {
  id: string;
  title: string;
  cover: string;
  price: number;
  finalPrice: number;
  hasDiscount: boolean;
  rating: number;
  stock: number;
  isHot: boolean;
  isNew: boolean;
};

type ApiProduct = {
  id: string;
  title: string;
  cover: string;
  price: string;
  discountType: "PERCENT" | "FIXED" | null;
  discountValue: string | null;
  rating: number;
  stock: number;
  categoryId: string;
  createdAt: string;
  _count?: { orderItems?: number };
};

const DAY = 86_400_000;

function map(p: ApiProduct): RelatedProduct {
  const price = Number(p.price);
  const dv = Number(p.discountValue ?? 0);
  let finalPrice = price;
  if (p.discountType === "PERCENT") finalPrice = price * (1 - dv / 100);
  else if (p.discountType === "FIXED") finalPrice = Math.max(price - dv, 0);

  return {
    id: p.id,
    title: p.title,
    cover: p.cover,
    price,
    finalPrice,
    hasDiscount: finalPrice < price,
    rating: p.rating,
    stock: p.stock,
    isHot: (p._count?.orderItems ?? 0) >= 10,
    isNew: Date.now() - new Date(p.createdAt).getTime() < 30 * DAY,
  };
}

export async function getRelatedProducts(
  productId: string,
  categoryId: string,
  max = 10
): Promise<RelatedProduct[]> {
  try {
    const res = await fetch(`${API}/products?limit=30`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const list: ApiProduct[] = json.payload?.data ?? [];
    return list
      .filter((p) => p.categoryId === categoryId && p.id !== productId)
      .slice(0, max)
      .map(map);
  } catch {
    return []; 
  }
}