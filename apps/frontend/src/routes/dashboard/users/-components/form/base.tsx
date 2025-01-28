import { UseMutationResult } from "@tanstack/react-query";
import { UserItem } from "../types";
import { useForm } from "@tanstack/react-form";
import { useEffect } from "react";
import { zodValidator } from "@tanstack/zod-form-adapter";
import {
  TextAreaFormField,
  TextFormField,
} from "@/lib/tanstack/form/TextFields";
import { z } from "zod";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { RoleSelect } from "./selects";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";

type FormFields = Partial<UserItem>;
interface BaseUserFormProps<T extends FormFields> {
  mutation: UseMutationResult<any, Error, any, unknown>;
  row: T;
  afterSave?: () => void;
}
export function BaseUserForm<T extends FormFields>({
  row,
  mutation,
  afterSave,
}: BaseUserFormProps<T>) {
  const { role } = useViewer();
  const form = useForm<FormFields>({
    defaultValues: {
      id: row?.id ?? "",
      name: row?.name ?? "",
      email: row?.email ?? "",
      avatarUrl: row?.avatarUrl ?? "",
      role: row?.role ?? "user",
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
      afterSave?.();
    },
  });
  const mutationError = mutation?.data?.data?.error?.data as Record<
    string,
    { code: string; message: string }
  >;
  useEffect(() => {
    if (mutationError) {
      const fieldErrors = Object?.entries(mutationError);
      if (fieldErrors.length > 0) {
        fieldErrors.forEach(([key, value]) => {
          form.setFieldMeta(key as any, (prev) => {
            return {
              ...prev,
              errorMap: {
                onChange: value?.message,
              },
            };
          });
        });
      }
    }
  }, [mutationError]);
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
          name="email"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string().min(2),
          }}
          children={(field) => {
            return (
              <TextFormField<FormFields>
                field={field}
                fieldKey="email"
                inputOptions={{
                  disabled: true,
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
          name="name"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string().min(2),
          }}
          children={(field) => {
            return (
              <TextFormField<FormFields>
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
          name="avatarUrl"
          validatorAdapter={zodValidator()}
          validators={{
            onChange: z.string().url(),
          }}
          children={(field) => {
            return (
              <TextFormField<FormFields>
                field={field}
                fieldKey="avatarUrl"
                inputOptions={{
                  onBlur: field.handleBlur,
                  onChange: (e) => field.handleChange(e.target.value),
                }}
              />
            );
          }}
        />
      </div>

      <form.Field
        name="role"
        validatorAdapter={zodValidator()}
        validators={{
          onChange: z.string().url(),
        }}
        children={(field) => {
          return (
            <div className="w-full">
              <label htmlFor={role} className="text-sm">
                Role
              </label>
              <RoleSelect
                role={field.state.value}
                setRole={(role) => field.handleChange(role)}
                disabled={role !== "admin"}
              />
            </div>
          );
        }}
      />
      <MutationButton
        // onClick={() => {
        //   console.log("== form values ===", form.state.values);
        //   console.log("== form valid ===", form.state.isValid);
        //   console.log("== form errors ===", form.state.errors);
        // }}
        mutation={mutation}
      />
    </form>
  );
}
