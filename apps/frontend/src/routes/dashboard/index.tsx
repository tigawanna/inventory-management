import { createFileRoute } from '@tanstack/react-router'
import { DashboardPage } from './-components/DashboardPage';
import { CardsListSuspenseFallback } from '@/components/wrappers/GenericDataCardsListSuspenseFallback copy';

export const Route = createFileRoute("/dashboard/")({
  pendingComponent: () => {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <CardsListSuspenseFallback
          cards={4}
          containerClassName="w-[90%] md:w-[80%] lg:grid-cols-2"
          cardClassName=""
        />
      </div>
    );
  },
  component: DashboardPage,
});

