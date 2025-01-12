import { Link, useNavigate } from "@tanstack/react-router";
import { formOptions, useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { makeHotToast } from "@/components/toasters";
import { TextFormField } from "@/lib/tanstack/form/TextFields";
import { verifyEmail } from "@/lib/api/users";
import { viewerqueryOptions } from "@/lib/tanstack/query/use-viewer";

interface VerifyEmailComponentProps {}

interface VerifyUserEmailFields {
  token:string;
}

const formOpts = formOptions<VerifyUserEmailFields>({
  defaultValues: {
    token: "",
  },
});

export function VerifyEmailComponent({}: VerifyEmailComponentProps) {
 const qc = useQueryClient();
  const navigate = useNavigate({ from: "/auth/verify-email" });
  const mutation = useMutation( {
    mutationFn: async ({ body }: { body: VerifyUserEmailFields }) => {
      return verifyEmail(body.token);
    },
    onSuccess(data) {
      if(data.error){
        makeHotToast({
          title: "Something went wrong",
          description: data.error.message,
          variant: "error",
          duration: 2000,
        });
        return
      }
      makeHotToast({
        title: "Email verified",
        variant: "success",
        duration: 1000,
      });

      qc.invalidateQueries(viewerqueryOptions());
      // qc.setQueryData(["viewer"], () => data);

      navigate({ to:"/auth",search:{returnTo:"/"}});
      if (typeof window !== "undefined") {
        location.reload();
      }
    },
    onError(error) {
      makeHotToast({
        title: "Something went wrong",
        description: `${error.message}`,
        variant: "error",
        duration: 10000,
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
                <TextFormField<VerifyUserEmailFields>
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
