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
import { makeHotToast } from "@/components/toasters";
import { i } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import { FieldInfo } from "@/lib/tanstack/form/components";

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
          onBlur: z.string().url(),
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
              <FieldInfo field={field} />
            </div>
          );
        }}
      />
      {/* <form.Subscribe children={(state) => (
      <div className="flex w-full flex-col gap-1 bg-error/10 border-px border-error rounded-lg  text-error-content">
        {Object.entries(state.fieldMeta).map(([key, value]) => {
          if (!value.errors.length) return;
          const issue = {
            key,
            error: value?.errors,
          };
          return (
            <div
              key={issue?.key}
              className="flex w-full items-center gap-1 p-1"
            >
              <div className="">{issue?.key} :</div>
              <div className="text-sm text-red-500">{issue?.error.join(" ,")}</div>
            </div>
          )
        })}
      </div>

      )}/> */}

      <MutationButton
        onClick={() => {
          Object.entries(form.state.fieldMeta).map(
            ([key, value]) => {
              if (!value.errors.length) return;
              const issue = {
                key,
                error: value?.errors,
              };
              return makeHotToast({
                title: "Validation issue on field: " + issue?.key,
                description: issue?.error.join("\n"),
                variant: "warning",
                duration: 50000,
              });
            },
          );
        }}
        mutation={mutation}
      />
    </form>
  );
}
