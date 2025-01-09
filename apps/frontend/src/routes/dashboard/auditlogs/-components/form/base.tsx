

import { UseMutationResult } from "@tanstack/react-query";

interface BaseAuditlogsFormProps<T extends Record<string, any>> {
  mutation: UseMutationResult<any,Error,T,unknown>;
  row: T;
  afterSave?: () => void;
}
export function BaseAuditlogsForm<T extends Record<string, any>>(
  {}: BaseAuditlogsFormProps<T>,
) {
  return (
    <form>
      <h1>BaseAuditlogsForm</h1>
    </form>
  );
}
 
 