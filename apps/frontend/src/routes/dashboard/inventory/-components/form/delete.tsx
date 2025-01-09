import { useState } from "react";
import { DiaDrawer } from "@/components/wrappers/DiaDrawer";
import {  Trash } from "lucide-react";
import { makeHotToast } from "@/components/toasters";
import { useMutation } from "@tanstack/react-query";
import {  deleteInventoryItem } from "@/lib/api/inventory";

export function DeleteInventoryForm({id}: {id: string}) {
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (value: string) => {
      return deleteInventoryItem(value);
    },
    onSuccess: (data) => {
      if (data.error) {
        makeHotToast({
          title: "Something went wrong",
          description: data.error.message,
          variant: "error",
        });
        return;
      }
      makeHotToast({
        title: "Inventory deleted",
        description: "Inventory has been deleted successfully",
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
      title="Delete Inventory"
      description="Delete inventory item"
      trigger={<Trash className="text-error" />}
    >
      <div className="flex h-full max-h-[80vh] w-full flex-col gap-2 overflow-auto">
        <form className="w-full">
          <h1 className=" ">Are you sure you want to delete this inventory</h1>
          <div className="flex gap-5 justify-end items-end w-full pt-5">
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
              className="btn btn-accent btn-outline"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                mutation.mutate(id);
              }}
              className="btn btn-error"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </DiaDrawer>
  );
}
