

import { useState } from "react";
import { DiaDrawer } from "@/components/wrappers/DiaDrawer";
import { Edit } from "lucide-react";
import { makeHotToast } from "@/components/toasters";
import { BaseCategoriesForm } from "./base";
import { useMutation } from "@tanstack/react-query";
import { CategoryItem } from "../types";
import { categoriesService } from "@/lib/kubb/gen";

interface UpdateCategoriesformInterface {
  item:CategoryItem
}
export function UpdateCategoriesform({ item }: UpdateCategoriesformInterface) {
  const [open, setOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: (value:CategoryItem) => {
      return categoriesService().patchApiCategoriesClient(value);
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
        description: "Category has been updated successfully",
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
      title="Update Category"
      description="Update category entry"
      trigger={<Edit className="size-5" />}
    >
      <div className="flex h-full max-h-[80vh] w-full flex-col gap-2 overflow-auto">
        <BaseCategoriesForm mutation={mutation} row={item} />
      </div>
    </DiaDrawer>
  );
}


 