import { CardsListSuspenseFallback } from "./GenericDataCardsListSuspenseFallback copy";
import { GeneriicTableSkeleton } from "./GeneriicTableSkeleton";

interface ResponsiveSuspenseFallbacksProps {}

export function ResponsiveSuspenseFallbacks({}: ResponsiveSuspenseFallbacksProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="hidden w-full max-w-[99vw] lg:flex">
        <GeneriicTableSkeleton />
      </div>
      <div className="flex w-full lg:hidden">
        <CardsListSuspenseFallback />
      </div>
    </div>
  );
}
