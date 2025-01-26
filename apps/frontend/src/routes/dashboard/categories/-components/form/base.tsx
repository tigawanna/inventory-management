import { TextAreaFormField, TextFormField } from "@/lib/tanstack/form/TextFields";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { useForm } from "@tanstack/react-form";
import { UseMutationResult } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { CategoryItem } from "../types";


type CategoryForm = Partial<CategoryItem>;
interface BaseCategoriesFormProps<T extends CategoryForm> {
  row?: T;
  mutation: UseMutationResult<any, Error, T, unknown>;
  afterSave?: () => void;
}
export function BaseCategoriesForm<T extends CategoryForm>({mutation,row,afterSave}: BaseCategoriesFormProps<T>) {
    const form = useForm<CategoryForm>({
      defaultValues: {
        id: row?.id ?? "",
        name: row?.name ?? "",
        description: row?.description ?? "",
      },
      onSubmit: async ({ value }) => {
        console.log({ value });
        if(value.id && value.id.length > 0){
          // @ts-expect-error : can be type T when crating and partial T when updating
          mutation.mutate(value);     
        }
        const { id, ...valueWithNoId } = value
        // @ts-expect-error : can be type T when crating and partial T when updating
        mutation.mutate(valueWithNoId);
        afterSave?.();
      },
    });
  return (
    
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="rounded-lh flex h-full w-full flex-col items-center justify-center gap-6 p-[1%]"
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-5">
        <form.Field
          name="name"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string(),
          }}
          children={(field) => {
            return (
              <TextFormField<CategoryForm>
                field={field}
                fieldKey="name"
                inputOptions={{
                  onBlur: field.handleBlur,

                  onChange: (e) => {
                    field.handleChange(e.target.value);
                  },
                }}
              />
            );
          }}
        />
        <form.Field
          name="description"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string(),
          }}
          children={(field) => {
            return (
              <TextAreaFormField<CategoryForm>
                field={field}
                fieldKey="description"
                inputOptions={{
                  onBlur: field.handleBlur,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
              />
            );
          }}
        />
      </div>
      <MutationButton mutation={mutation} />
    </form>
  );
}
 
 