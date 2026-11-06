import { NextResponse } from "next/server";
import { getProductsForOccasion } from "@/app/feature/most-popular/api/get-products";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { occasionId?: unknown }
    | null;
  const occasionId = body?.occasionId;

  if (occasionId === null) {
    return NextResponse.json({ products: [], unavailable: true });
  }

  if (typeof occasionId !== "string" || !/^[0-9a-f-]{36}$/i.test(occasionId)) {
    return NextResponse.json({ message: "Invalid occasion." }, { status: 400 });
  }

  const products = await getProductsForOccasion(occasionId);
  return NextResponse.json({ products, unavailable: false });
}
