import { makeHotToast } from "@/components/toasters";
import { authService } from "@/lib/kubb/gen";
import { TextFormField } from "@/lib/tanstack/form/TextFields";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { formOptions, useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";

interface ForgortPasswordProps {

}

interface VerifyUserEmailFields {
  token:string;
  newPassword:string
}

const formOpts = formOptions<VerifyUserEmailFields>({
  defaultValues: {
    token: "",
    newPassword: "",
  },
});

export function ForgortPassword({}:ForgortPasswordProps){
     const navigate = useNavigate({ from: "/auth/forgort-password" });
     const mutation = useMutation({
       mutationFn: async ({ body }: { body: VerifyUserEmailFields }) => {
      // return resetPassword(body.token, body.newPassword);
      return await authService().postApiAuthResetPasswordClient({
        token: body.token,
        newPassword: body.newPassword
      })
       },
       onSuccess(data) {
         if (data.type === "error") {
           makeHotToast({
             title: "Something went wrong",
             description: data.data.error.message,
             variant: "error",
             duration: 2000,
           });
           return;
         }
         makeHotToast({
           title: "Password reset",
           variant: "success",
           duration: 1000,
         });

         // qc.setQueryData(["viewer"], () => data);

         navigate({ to: "/auth", search: { returnTo: "/" } });
        //  if (typeof window !== "undefined") {
        //    location.reload();
        //  }
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
           body: value
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
            <h1 className="text-3xl font-bold">Reset Password</h1>
        <div className="flex w-full flex-col items-center justify-center gap-2">
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
                  fieldlabel="Token sent to your eamil"
                  inputOptions={{
                    onBlur: field.handleBlur,
                    onChange: (e) => field.handleChange(e.target.value),
                  }}
                />
              );
            }}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <form.Field
            name="newPassword"
            validatorAdapter={zodValidator()}
            validators={{
              onChange: z.string(),
            }}
            children={(field) => {
              return (
                <TextFormField<VerifyUserEmailFields>
                  field={field}
                  fieldKey="newPassword"
                  fieldlabel="New Password"
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
          label="Reset Password"
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
