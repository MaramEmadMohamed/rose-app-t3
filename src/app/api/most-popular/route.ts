import { NextResponse } from "next/server";
import { getProductsForOccasion } from "@/features/most-popular/api/get-products";

export async function GET(request: Request) {
  const occasionId = new URL(request.url).searchParams.get("occasionId");

  if (!occasionId) {
    return NextResponse.json({ products: [], unavailable: true });
  }

  if (!/^[0-9a-f-]{36}$/i.test(occasionId)) {
    return NextResponse.json({ message: "Invalid occasion." }, { status: 400 });
  }

  const products = await getProductsForOccasion(occasionId);
  return NextResponse.json({ products, unavailable: false });
}
