
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { oneUserQueryOptions } from "@/routes/dashboard/users/-query-options/user-query-option";
import { ErrorWrapper } from "@/components/wrappers/ErrorWrapper";

interface OneUserDetailsProps {
}

export function OneUserDetails({}: OneUserDetailsProps) {
  const { user } = useParams({ from: "/dashboard/users/$user/" });
  const query = useSuspenseQuery(oneUserQueryOptions({ user }));
  const data = query.data;
  const error = query.error;

  if (error) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
           <ErrorWrapper err={error} />
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

  