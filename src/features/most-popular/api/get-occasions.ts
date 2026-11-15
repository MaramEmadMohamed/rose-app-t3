import "server-only";

import { API_URL } from "@/lib/api-url";
import { MOST_POPULAR_LABELS, type MostPopularTab } from "../constants";

interface Occasion {
  id: string;
  title: string;
}

interface OccasionsResponse {
  payload: {
    data: Occasion[];
  };
}

export async function getMostPopularTabs(): Promise<MostPopularTab[]> {
  if (!API_URL) {
    return MOST_POPULAR_LABELS.map((label) => ({ label, occasionId: null }));
  }

  try {
    const url = new URL("/api/occasions", API_URL);
    url.searchParams.set("page", "1");
    url.searchParams.set("limit", "100");

    const response = await fetch(url.href, { cache: "no-store" });
    if (!response.ok) throw new Error("Unable to load occasions.");

    const result = (await response.json()) as OccasionsResponse;
    const occasions = result.payload?.data ?? [];

    return MOST_POPULAR_LABELS.map((label) => ({
      label,
      occasionId:
        occasions.find(
          (occasion) => occasion.title.trim().toLowerCase() === label.toLowerCase(),
        )?.id ?? null,
    }));
  } catch {
    return MOST_POPULAR_LABELS.map((label) => ({ label, occasionId: null }));
  }
}
