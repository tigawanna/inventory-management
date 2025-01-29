import { useState } from "react";
import { DiaDrawer } from "@/components/wrappers/DiaDrawer";
import { Edit } from "lucide-react";
import { makeHotToast } from "@/components/toasters";
import { BaseUserForm } from "./base";
import { useMutation } from "@tanstack/react-query";
import { PatchApiUsersMutationRequest, usersService } from "@/lib/kubb/gen";
import { UserItem } from "../types";
type FormFields = Partial<UserItem>;
interface UpdateUserformInterface {
  item: FormFields;
}
export function UpdateUserform({ item }: UpdateUserformInterface) {
  const [open, setOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: async (value: PatchApiUsersMutationRequest) => {
      return usersService().patchApiUsersClient(value);
    },
    onSuccess: (data) => {
      if (data.type === "error") {
        makeHotToast({
          title: "Something went wrong",
          description: JSON.stringify(data?.data?.error.data, null, 2),
          variant: "error",
        });
        return;
      }
      makeHotToast({
        title: "Deleted",
        description: "User updated successfully",
        variant: "success",
      });
      setOpen(false);
    },
    onError(error) {
      makeHotToast({
        title: "Something went wrong",
        description: error.message,
        variant: "error",
      });
    },
    meta: {
      invalidates: ["users"],
    },
  });
  return (
    <DiaDrawer
      open={open}
      setOpen={setOpen}
      title="Update  User"
      description="Update user"
      trigger={<Edit className="size-5" />}
    >
      <div className="flex h-full max-h-[80vh] w-full flex-col gap-2 overflow-auto">
        <BaseUserForm mutation={mutation} row={item} />
      </div>
    </DiaDrawer>
  );
}
