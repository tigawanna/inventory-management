
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { oneCategoriesQueryOptions } from "@/routes/dashboard/categories/-query-options/categories-query-option";
import { ErrorWrapper } from "@/components/wrappers/ErrorWrapper";

interface OneCategoriesDetailsProps {
}

export function OneCategoriesDetails({}: OneCategoriesDetailsProps) {
  const { categories } = useParams({ from: "/dashboard/categories/$categories/" });
  const query = useSuspenseQuery(oneCategoriesQueryOptions({ categories }));
  const data = query.data;
  const error = query.error;

  if (error) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
           <ErrorWrapper error={error} />
      </div>
    );
  }
  return (
    <div className="w-full h-full min-h-[90vh] flex  flex-col items-center justify-center">
      <div className="text-5xl font-bold border border-primary p-10 rounded-2xl">
      {JSON.stringify(data, null, 2)}
    </div>
    </div>
  );
}

  