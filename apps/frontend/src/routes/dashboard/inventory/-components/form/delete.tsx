import { useState } from "react";
import { DiaDrawer } from "@/components/wrappers/DiaDrawer";
import { Trash } from "lucide-react";
import { makeHotToast } from "@/components/toasters";
import { useMutation } from "@tanstack/react-query";
import { inventoryService } from "@/lib/kubb/gen";

export function DeleteInventoryForm({
  id,
  hardDelete = false,
}: {
  id: string;
  hardDelete?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (value: string) => {
      return  inventoryService().deleteApiInventoryClient({id: value});
    },
    onSuccess: (data) => {
      if (data.type === "error") {
        makeHotToast({
          title: "Something went wrong",
          description: data.data.error.message,
          variant: "error",
        });
        return;
      }
      makeHotToast({
        title: "Inventory deleted",
        description: `Inventory has been ${hardDelete ? "permanently" : ""} deleted successfully`,
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
      description={`${hardDelete ? "Permanently" : ""} Delete inventory item`}
      trigger={
        hardDelete ? (
        <button className=" flex justify-center items-center gap-2 btn btn-sm btn-error  btn-outline ">
            <span className="">hard delete</span>
          <Trash className="h-4" />
        </button>
        )
      :<Trash className="text-error" />
    }
    >
      <div className="flex h-full max-h-[80vh] w-full flex-col gap-2 overflow-auto">
        <form className="w-full">
          <h1 className=" ">
            Are you sure you want to {hardDelete ? "permanently" : ""} delete
            this inventory
          </h1>
          <div className="flex w-full items-end justify-end gap-5 pt-5">
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
              className="btn btn-outline btn-accent"
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
