import { useState } from "react";
import { DiaDrawer } from "@/components/wrappers/DiaDrawer";
import { Plus } from "lucide-react";
import { makeHotToast } from "@/components/toasters";
import { BaseInventoryForm } from "./base";
import { useMutation } from "@tanstack/react-query";
import { createInventoryItem } from "@/lib/api/inventory";

export function CreateInventoryForm() {
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (value: any) => {
      return createInventoryItem(value);
    },
    onSuccess: (data) => {
      if(data.error){
        makeHotToast({
          title: "Something went wrong",
          description: data.error.message,
          variant: "error",
        });
        return
      }
      makeHotToast({
        title: "Inventory added",
        description: "Inventory has been added successfully",
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
      invalidates: ["inventory_list"],
    },
  });
  return (
    <DiaDrawer
      open={open}
      setOpen={setOpen}
      title="Add Inventory"
      description="Add new Inventory"
      trigger={
        <button className="btn btn-outline btn-sm flex items-center justify-center gap-2">
          <Plus className="" />
          Add new
        </button>
      }
    >
      <div className="flex h-full max-h-[80vh] w-fit flex-col gap-2 overflow-auto">
        <BaseInventoryForm mutation={mutation} row={{}} />
      </div>
    </DiaDrawer>
  );
}
