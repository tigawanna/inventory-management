import { useState } from "react";
import { DiaDrawer } from "@/components/wrappers/DiaDrawer";
import { Edit } from "lucide-react";
import { makeHotToast } from "@/components/toasters";
import { BaseInventoryForm } from "./base";
import { useMutation } from "@tanstack/react-query";
import { inventoryService } from "@/lib/kubb/gen";

interface UpdateInventoryformInterface {
  item: Record<string, any> & { id: string };
}
export function UpdateInventoryform({ item }: UpdateInventoryformInterface) {
  const [open, setOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: (value: any) => {
      console.log({ value });
      return  inventoryService().patchApiInventoryClient(value);
    },

    onSuccess: (data) => {
      console.log({ data });
      if (data.type === "error") {
        makeHotToast({
          title: "Something went wrong",
          description: data.data.error.message,
          variant: "error",
        });
        return;
      }
      makeHotToast({
        title: "Inventory updated",
        description: "Inventory has been updated successfully",
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
      invalidates: ["inventory"],
    },
  });
  return (
    <DiaDrawer
      open={open}
      setOpen={setOpen}
      title="Update Inventory"
      description="Update Inventory entry"
      trigger={<Edit className="size-5" />}
    >
      <div className="flex h-full max-h-[80vh] w-full flex-col gap-2 overflow-auto">
        <BaseInventoryForm mutation={mutation} row={item } />
      </div>
    </DiaDrawer>
  );
}
