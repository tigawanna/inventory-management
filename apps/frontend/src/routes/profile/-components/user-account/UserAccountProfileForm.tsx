import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useState } from "react";
import { PropertyUserUpdate, PropertyUserResponse } from "@/lib/pb/pb-types";
import { Navigate } from "@tanstack/react-router";
import { getFileURL, pb } from "@/lib/pb/client";
import { Button } from "@/components/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { TextFormField } from "@/lib/tanstack/form/TextFields";
import { z } from "zod";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { useMutation } from "@tanstack/react-query";
import { AvatarInput } from "./AvatarInput";
import { ClientResponseError } from "pocketbase";
import { makeHotToast } from "@/components/toasters";
import { Edit } from "lucide-react";
interface UserAccountProfileFormProps {
  input: PropertyUserResponse & {
    avatarUrl: string;
  };
  setInput: React.Dispatch<
    React.SetStateAction<
      PropertyUserResponse & {
        avatarUrl: string;
      }
    >
  >;
}

export function UserAccountProfileForm({
  input,
  setInput,
}: UserAccountProfileFormProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<PropertyUserUpdate>({
    defaultValues: {
      id: input?.id,
      email: input?.email,
      username: input?.username,
      avatar: input?.avatar as any as File,
      phone: input?.phone,
      // avatarUrl: input?.avatarUrl,
    },
    onSubmit: async ({ value }) => {
      await mutation.mutate(value);
    },
  });
  const mutation = useMutation({
    mutationFn: async (data: PropertyUserUpdate) => {
      console.log("data", data);
      const res = await pb.collection("property_user").update(data?.id??"", data);
      return res;
    },
    meta: {
      invalidates: ["viewer"],
    },
    onSuccess(data) {
      makeHotToast({
        title: "Profile updated",
        description: `Your profile has been updated`,
        variant: "success",
      });
      setOpen(false);
    },
    onError(error: ClientResponseError, variables, context) {
      const pbError = error?.data?.data as Record<
        string,
        { message: string; code: string }
      >;
      makeHotToast({
        title: "Issue updating your profile",
        description: `${error.message}`,
        variant: "error",
      });
      pbError &&
        Object?.entries(pbError)?.forEach(([key, value]) => {
          form.setFieldMeta(key as any, (prev) => {
            return {
              ...prev,
              errorMap: {
                onChange: value?.message,
              },
            };
          });
        });
    },
  });
  const savedImage = getFileURL({
    collection_id_or_name: "property_user",
    fallback: "/avatar.png",
    record_id: input?.id,
    file_name: input?.avatar as any,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="text-xl">
        <Button className="btn-wide">
       Edit <Edit className="size-10" />

        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto sm:max-w-[90%] lg:max-w-[60%]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex h-full w-full flex-col items-center justify-evenly gap-[3%] p-2 md:flex-row">
          <AvatarInput
            editing
            userAvatar={{
              alt: input?.username || "",
              avatarUrl:
                savedImage.length > 0 ? savedImage || input?.avatarUrl : "",
              avatarFile: input?.avatar as any as File,
            }}
            setUserAvarat={(data) => {
              form.setFieldValue("avatar", data.avatarFile);
              setInput((prev) => {
                return {
                  ...prev,
                  avatarUrl: data.avatarUrl,
                  // casting just to please typescript but it's of type file
                  avatar: data.avatarFile as any as string,
                };
              });
            }}
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="flex h-full w-full flex-col items-center justify-center gap-6 rounded-lg p-[2%]"
          >
            <div className="gap- flex h-full w-full flex-col items-center justify-center">
              <form.Field
                name="username"
                validatorAdapter={zodValidator()}
                validators={{
                  onChange: z.string(),
                }}
                children={(field) => {
                  return (
                    <TextFormField<PropertyUserUpdate>
                      field={field}
                      fieldKey="username"
                      inputOptions={{
                        onBlur: field.handleBlur,
                        onChange: (e) => {
                          field.handleChange(e.target.value);
                          setInput((prev) => {
                            return {
                              ...prev,
                              username: e.target.value,
                            };
                          });
                        },
                      }}
                    />
                  );
                }}
              />
              <form.Field
                name="email"
                validatorAdapter={zodValidator()}
                validators={{
                  onChange: z.string().email(),
                }}
                children={(field) => {
                  return (
                    <TextFormField<PropertyUserUpdate>
                      field={field}
                      fieldKey="email"
                      inputOptions={{
                        autoComplete: "email",
                        onBlur: field.handleBlur,
                        onChange: (e) => {
                          field.handleChange(e.target.value);
                          setInput((prev) => {
                            return {
                              ...prev,
                              email: e.target.value,
                            };
                          });
                        },
                      }}
                    />
                  );
                }}
              />
              <form.Field
                name="phone"
                validatorAdapter={zodValidator()}
                validators={{
                  onChange: z.string(),
                }}
                children={(field) => {
                  return (
                    <TextFormField<PropertyUserUpdate>
                      field={field}
                      fieldKey="phone"
                      inputOptions={{
                        type: "tel",
                        onBlur: field.handleBlur,
                        onChange: (e) => {
                          field.handleChange(e.target.value);
                          setInput((prev) => {
                            return {
                              ...prev,
                              phone: e.target.value,
                            };
                          });
                        },
                      }}
                    />
                  );
                }}
              />
            </div>
            <MutationButton className="btn btn-primary " mutation={mutation} />
          </form>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
