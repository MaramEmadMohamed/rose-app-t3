export const MOST_POPULAR_LIMIT = 12;

export const MOST_POPULAR_LABELS = [
  "Wedding",
  "Anniversary",
  "Birthday",
  "Engagement",
] as const;

export interface MostPopularTab {
  label: (typeof MOST_POPULAR_LABELS)[number];
  occasionId: string | null;
}
