

import { UseMutationResult } from "@tanstack/react-query";

interface BaseTeamFormProps<T extends Record<string, any>> {
  mutation: UseMutationResult<any,Error,T,unknown>;
  row: T;
  afterSave?: () => void;
}
export function BaseTeamForm<T extends Record<string, any>>(
  {}: BaseTeamFormProps<T>,
) {
  return (
    <form>
      <h1>BaseTeamForm</h1>
    </form>
  );
}
 
 