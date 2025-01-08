import { useForm } from "@tanstack/react-form";
import { UseMutationResult } from "@tanstack/react-query";

interface BaseInventoryFormProps<T extends Record<string, any>> {
  mutation: UseMutationResult<any,Error,T,unknown>;
  row: T;
  afterSave?: () => void;
}
export function BaseInventoryForm<T extends Record<string, any>>({}: BaseInventoryFormProps<T>,) {
  const form = useForm({
    
  })
  return (
    <form>
      <h1>BaseInventoryForm</h1>
    </form>
  );
}
 
 