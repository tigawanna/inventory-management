import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { formOptions, useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { useState } from "react";
import { makeHotToast } from "@/components/toasters";
import { TextFormField } from "@/lib/tanstack/form/TextFields";
import { apiQuery } from "@/lib/api/client";

interface VerifyEmailComponentProps {}

interface UsersigninFields {
  token:string;
}

const formOpts = formOptions<UsersigninFields>({
  defaultValues: {
    token: "",
  },
});

export function VerifyEmailComponent({}: VerifyEmailComponentProps) {


  const navigate = useNavigate({ from: "/auth/verify-email" });

  const mutation = apiQuery.useMutation("post", "/api/v1/auth/verify-email", {
    onSuccess(data) {
      const resonseMeassge = data as { message: string };
      makeHotToast({
        title: "signed in",
        description: resonseMeassge.message,
        variant: "success",
        duration: 2000,
      });

      // qc.invalidateQueries(viewerqueryOptions);
      // qc.setQueryData(["viewer"], () => data);

      navigate({ to:"/auth",search:{returnTo:"/"}});
      if (typeof window !== "undefined") {
        location.reload();
      }
    },
    onError(error) {
      const errorMessage = error as { message: string };
      makeHotToast({
        title: "Something went wrong",
        description: `${errorMessage.message}`,
        variant: "error",
        duration: 20000,
      });
    },
  });
  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      await mutation.mutate({
        body:value as any
      });
    },
  });
  return (
    <div className="flex h-full w-full items-center justify-evenly gap-2 p-5">
      <img
        src="/site.svg"
        alt="logo"
        className="hidden w-[30%] object-cover md:flex"
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex h-full w-[90%] flex-col items-center justify-center gap-6 rounded-lg p-[2%] md:w-[70%] lg:w-[40%]"
      >
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <h1 className="text-4xl font-bold">Verify Email</h1>
          <form.Field
            name="token"
            validatorAdapter={zodValidator()}
            validators={{
              onChange: z.string(),
            }}
            children={(field) => {
              return (
                <TextFormField<UsersigninFields>
                  field={field}
                  fieldKey="token"
                  fieldlabel="token from your eamil"
                  inputOptions={{
                    onBlur: field.handleBlur,
                    onChange: (e) => field.handleChange(e.target.value),
                  }}
                />
              );
            }}
          />
        </div>
        <MutationButton
          label="Sign in"
          className="btn btn-primary"
          mutation={mutation}
        />
        <div className="flex flex-col items-center justify-center gap-2">
          Don&apos;t have an account?
          <Link
            to="/auth/signup"
            search={{
              returnTo: "/",
            }}
            className="text-primary"
          >
            Back to signup Page
          </Link>
          <Link
            to="/auth"
            search={{
              returnTo: "/",
            }}
            className="text-primary"
          >
            Continiue to sign in page
          </Link>
        </div>
      </form>
    </div>
  );
}
