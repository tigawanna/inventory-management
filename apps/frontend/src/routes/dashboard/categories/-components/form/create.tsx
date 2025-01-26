

import { useState } from "react";
import { DiaDrawer } from "@/components/wrappers/DiaDrawer";
import { Plus } from "lucide-react";
import { makeHotToast } from "@/components/toasters";
import { BaseCategoriesForm } from "./base";
import { useMutation } from "@tanstack/react-query";
import { CategoryItem } from "../types";
import { categoriesService } from "@/lib/kubb/gen";

export function CreateCategoriesForm() {
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (value:CategoryItem) => {
      return categoriesService().postApiCategoriesClient(value);
    },
    onSuccess: (data) => {
      if(data.type==="error"){
        return makeHotToast({
          title: "Something went wrong",
          description: data.data.error.message,
          variant: "error",
        });
      }
      makeHotToast({
        title: "Success",
        description: "Category has been added successfully",
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
      invalidates: ["categories"],
    },
  });
  return (
    <DiaDrawer
      open={open}
      setOpen={setOpen}
      title="Add Categories"
      description="Add new Categories"
      trigger={
        <button className="btn btn-outline btn-sm flex items-center justify-center gap-2">
          <Plus className="" />
          Add new
        </button>
      }
    >
      <div className="flex h-full max-h-[80vh] w-full flex-col gap-2 overflow-auto">
        <BaseCategoriesForm mutation={mutation} row={undefined} />
      </div>
    </DiaDrawer>
  );
}

 
 