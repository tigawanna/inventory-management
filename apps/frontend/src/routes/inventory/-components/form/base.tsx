import { InventoryItem } from "@/lib/api/inventory";
import {
  TextAreaFormField,
  TextFormField,
} from "@/lib/tanstack/form/TextFields";
import { useForm } from "@tanstack/react-form";
import { UseMutationResult } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { InventoryCategoriesSelect } from "../list/InventorySortSelect";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { useEffect } from "react";
interface BaseInventoryFormProps<T extends InventoryItem> {
  mutation: UseMutationResult<any, Error, T, unknown>;
  row: T;
  afterSave?: () => void;
}
type InventoryForm = Partial<InventoryItem>;
export function BaseInventoryForm<T extends InventoryItem>({
  row,
  mutation,
  afterSave,
}: BaseInventoryFormProps<T>) {
  const form = useForm<InventoryForm>({
    defaultValues: {
      name: row.name ?? "",
      description: row.description ?? "",
      quantity: row.quantity ?? 50,
      price: row.price ?? 72000,
      categoryId: row.categoryId ?? "",
    },
    onSubmit: async ({ value }) => {
      console.log({ value });
      // @ts-expect-error
      mutation.mutate(value);
      afterSave?.();
    },
  });
const mutationError = mutation?.error as any
  useEffect(() => {
    console.log("mutation errors  == ",mutationError?.error);
    mutationError &&
      Object?.entries((mutationError as any)?.error)?.forEach(
        ([key, value]) => {
          form.setFieldMeta(key as any, (prev) => {
            return {
              ...prev,
              errorMap: {
                // @ts-expect-error
                onChange: value?.message,
              },
            };
          });
        },
      );
  }, [mutationError]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="rounded-lh flex h-full w-full flex-col items-center justify-center gap-6 p-[2%]"
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
              <TextFormField<InventoryForm>
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
              <TextAreaFormField<InventoryForm>
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
        <div className="flex gap-3">
          <form.Field
            name="quantity"
            validatorAdapter={zodValidator()}
            validators={{
              onChange: z.number(),
            }}
            children={(field) => {
              return (
                <TextFormField<InventoryForm>
                  field={field}
                  fieldKey="quantity"
                  inputOptions={{
                    type: "number",
                    minLength: 8,
                    onBlur: field.handleBlur,
                    onChange: (e) => field.handleChange(+e.target.value),
                  }}
                />
              );
            }}
          />
          <form.Field
            name="price"
            validatorAdapter={zodValidator()}
            validators={{
              onChange: z.number(),
            }}
            children={(field) => {
              return (
                <TextFormField<InventoryForm>
                  field={field}
                  fieldKey="price"
                  fieldlabel="price"
                  inputOptions={{
                    type: "number",
                    onBlur: field.handleBlur,
                    onChange: (e) => field.handleChange(e.target.value),
                  }}
                />
              );
            }}
          />
          <form.Field
            name="categoryId"
            validatorAdapter={zodValidator()}
            validators={{
              onChange: z.string(),
            }}
            children={(field) => {
              return (
                <div>
                  <label htmlFor={"category"} className="text-sm">
                    category
                  </label>
                  <InventoryCategoriesSelect
                    onCategoryChange={field.handleChange}
                  />
                </div>
              );
            }}
          />
        </div>
      </div>
      <MutationButton mutation={mutation} />
    </form>
  );
}
