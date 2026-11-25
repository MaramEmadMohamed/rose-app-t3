// src/lib/products/actions.ts
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export type ActionResult = { success: boolean; message: string };

const BASE_URL = process.env.API_URL!;

async function post(path: string, body: unknown): Promise<ActionResult> {
  const session = await getServerSession(authOptions);
  const token = (session as { accessToken?: string } | null)?.accessToken;

  if (!token) return { success: false, message: "Please log in first" };

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const json = await res.json().catch(() => null);

    return {
      success: res.ok && json?.status !== false,
      message: json?.message ?? (res.ok ? "Done" : "Something went wrong"),
    };
  } catch {
    return { success: false, message: "Network error, try again" };
  }
}

export async function addToCartAction(productId: string, quantity = 1) {
  return post("/cart", { productId, quantity });
}

export async function addToWishlistAction(productId: string) {
  return post("/wishlist", { productId });
}