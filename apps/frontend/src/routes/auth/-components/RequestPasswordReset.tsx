import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { makeHotToast } from "@/components/toasters";
import { authService } from "@/lib/kubb/gen";
import { TextFormField } from "@/lib/tanstack/form/TextFields";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { formOptions, useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
interface RequestPasswordResetProps {
    returnTo:string
}
interface RequestPasswordresetFields {
  email: string;
}

const formOpts = formOptions<RequestPasswordresetFields>({
  defaultValues: {
    email: "",

  },
});
export function RequestPasswordReset({returnTo}: RequestPasswordResetProps) {
  const navigate = useNavigate({ from: "/auth" });
  const mutation = useMutation({
    mutationFn: async ({ body }: { body: RequestPasswordresetFields }) => {
      // return requestPasswordReset(body.email);
      return authService().postApiAuthRequestPasswordResetClient({
        email: body.email
      })
    },
    onSuccess(data) {
      if (data.type ==="error") {
        makeHotToast({
          title: "Something went wrong",
          description: data.data.error.message,
          variant: "error",
          duration: 2000,
        });
        return;
      }
      makeHotToast({
        title: "Password reset requeested",
        variant: "success",
        duration: 1000,
      });

      navigate({ to: "/auth/forgort-password",search:{returnTo} });
    //   if (typeof window !== "undefined") {
    //     location.reload();
    //   }
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
        body: value,
      });
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="btn btn-sm btn-ghost">forgot password? </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request password reset</DialogTitle>
          <DialogDescription>
            Enter your email address below to request a password reset.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex h-full w-full flex-col items-center justify-center gap-6 rounded-lg p-[2%]"
        >
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <form.Field
              name="email"
              validatorAdapter={zodValidator()}
              validators={{
                onChange: z.string().email(),
              }}
              children={(field) => {
                return (
                  <TextFormField<RequestPasswordresetFields>
                    field={field}
                    fieldKey="email"
                    fieldlabel="email"
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
        </form>
        {/* <DialogFooter>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
