import { Link, useNavigate } from "@tanstack/react-router";
import { Route } from "../index";
import { formOptions, useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { useState } from "react";
import { makeHotToast } from "@/components/toasters";
import { TextFormField } from "@/lib/tanstack/form/TextFields";
import { apiQuery } from "@/lib/api/client";
import { signInUser } from "@/lib/api/users";
import { viewerqueryOptions } from "@/lib/tanstack/query/use-viewer";

interface SigninComponentProps {}

interface UsersigninFields {
  email: string;
  password: string;
}

const formOpts = formOptions<UsersigninFields>({
  defaultValues: {
    email: "",
    password: "",
  },
});
export function SigninComponent({}: SigninComponentProps) {
  const [showPassword, setShowPassword] = useState(false);
  const qc = useQueryClient();
  const { returnTo } = Route.useSearch();
  const navigate = useNavigate({ from: "/auth" });

  const mutation = useMutation({
    mutationFn: async ({ body }: { body: UsersigninFields }) => {
      return signInUser(body);
    },
    onSuccess(data) {
      console.log({data});
      if(data.error){
        makeHotToast({
          title: "Something went wrong",
          description: data.error.message,
          variant: "error",
          duration: 20000,
        });
        return
      }
      makeHotToast({
        title: "signed in",
        description:"",
        variant: "success",
        duration: 2000,
      });
      
      qc.invalidateQueries(viewerqueryOptions());
      // navigate({ to: returnTo || "/" });
      // qc.setQueryData(["viewer"], () => data.record);
      // if (typeof window !== "undefined") {
      //   location.reload();
      // }
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
          <h1 className="text-4xl font-bold">Sign in</h1>
          <form.Field
            name="email"
            validatorAdapter={zodValidator()}
            validators={{
              onChange: z.string(),
            }}
            children={(field) => {
              return (
                <TextFormField<UsersigninFields>
                  field={field}
                  fieldKey="email"
                  fieldlabel="email or username"
                  inputOptions={{
                    onBlur: field.handleBlur,
                    onChange: (e) => field.handleChange(e.target.value),
                  }}
                />
              );
            }}
          />

          <form.Field
            name="password"
            validatorAdapter={zodValidator()}
            validators={{
              onChange: z.string().min(8),
            }}
            children={(field) => {
              return (
                <TextFormField<UsersigninFields>
                  field={field}
                  fieldKey="password"
                  inputOptions={{
                    type: showPassword ? "text" : "password",
                    onBlur: field.handleBlur,
                    onChange: (e) => field.handleChange(e.target.value),
                  }}
                />
              );
            }}
          />

          <div className="w-full pt-5">
            <div className="flex w-full items-center justify-center gap-3">
              <label htmlFor="showPassword" className="text-sm">
                Show password
              </label>
              <input
                type="checkbox"
                id="showPassword"
                name="showPassword"
                className="checkbox-primary checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>
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
              returnTo: returnTo || "/",
            }}
            className="text-primary"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
