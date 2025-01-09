

import { UseMutationResult } from "@tanstack/react-query";

interface BaseCategoriesFormProps<T extends Record<string, any>> {
  mutation: UseMutationResult<any,Error,T,unknown>;
  row: T;
  afterSave?: () => void;
}
export function BaseCategoriesForm<T extends Record<string, any>>(
  {}: BaseCategoriesFormProps<T>,
) {
  return (
    <form>
      <h1>BaseCategoriesForm</h1>
    </form>
  );
}
 
 