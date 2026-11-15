import type { ReactNode } from "react";
import MostPopularSection from "./most-popular-section";
import { getProductsForOccasion } from "../api/get-products";
import { getMostPopularTabs } from "../api/get-occasions";

export default async function MostPopular({ heading }: { heading?: ReactNode }) {
  const tabs = await getMostPopularTabs();
  const initialTab = tabs.find((tab) => tab.label === "Wedding") ?? tabs[0];
  const products = initialTab?.occasionId
    ? await getProductsForOccasion(initialTab.occasionId)
    : [];

  return (
    <MostPopularSection
      tabs={tabs}
      initialTab={initialTab?.label ?? "Wedding"}
      initialProducts={products}
      heading={heading}
    />
  );
}
