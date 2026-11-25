import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto grid gap-8 px-4 py-8 md:grid-cols-2">
      <div className="space-y-4">
        <Skeleton className="aspect-3/2 w-full rounded-xl" />
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-4/5 rounded-md" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-9 w-3/4" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-28 w-full" />
      </div>
    </main>
  );
}
