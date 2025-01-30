// /-components/form/create
export function rootPageCreateFormComponentsTemplate(pagename: string) {
  const capitalpagename = pagename.charAt(0).toUpperCase() + pagename.slice(1);
  return `

import { useState } from "react";
import { DiaDrawer } from "@/components/wrappers/DiaDrawer";
import { Plus } from "lucide-react";
import { makeHotToast } from "@/components/toasters";
import { Base${capitalpagename}Form } from "./base";
import { useMutation } from "@tanstack/react-query";
import { ${pagename}sService, PatchApi${capitalpagename}MutationRequest } from "@/lib/kubb/gen";


export function Create${capitalpagename}Form() {
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (value:PatchApi${capitalpagename}sMutationRequest) => {
      // return new Promise<{}>((resolve) => {
      //   setTimeout(() => {
      //     resolve(value);
      //   }, 2000);
      // });
    return ${pagename}Service().postApi${capitalpagename}sClient(value);
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
        title: "Deleted",
        description:"${capitalpagename} created successfully",
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
      invalidates: ["${pagename}"],
    },
  });
  return (
    <DiaDrawer
      open={open}
      setOpen={setOpen}
      title="Add ${capitalpagename}"
      description="Add new ${capitalpagename}"
      trigger={
        <button className="btn btn-outline btn-sm flex items-center justify-center gap-2">
          <Plus className="" />
          Add new
        </button>
      }
    >
      <div className="flex h-full max-h-[80vh] w-fit flex-col gap-2 overflow-auto">
        <Base${capitalpagename}Form mutation={mutation} row={{}} />
      </div>
    </DiaDrawer>
  );
}

 
 `;
}
// /-components/form/update
export function rootPageUpdateFormComponentsTemplate(pagename: string) {
  const capitalpagename = pagename.charAt(0).toUpperCase() + pagename.slice(1);
  return `

import { useState } from "react";
import { DiaDrawer } from "@/components/wrappers/DiaDrawer";
import { Edit } from "lucide-react";
import { makeHotToast } from "@/components/toasters";
import { Base${capitalpagename}Form } from "./base";
import { useMutation } from "@tanstack/react-query";
import { ${pagename}sService } from "@/lib/kubb/gen";

interface Update${capitalpagename}formInterface {
  item: Record<string, any> & { id: string };
}
export function Update${capitalpagename}form({ item }: Update${capitalpagename}formInterface) {
  const [open, setOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: (value: {}) => {
      // return new Promise<{}>((resolve) => {
      //   setTimeout(() => {
      //     resolve(value);
      //   }, 2000);
      // });
    return ${pagename}Service().patchApi${capitalpagename}sClient(value);
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
        title: "Deleted",
        description:"${capitalpagename} updated successfully",
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
      invalidates: ["${pagename}"],
    },
  });
  return (
    <DiaDrawer
      open={open}
      setOpen={setOpen}
      title="Add ${capitalpagename}"
      description="Add a new staff"
      trigger={<Edit className="size-5" />}
    >
      <div className="flex h-full max-h-[80vh] w-fit flex-col gap-2 overflow-auto">
        <Base${capitalpagename}Form mutation={mutation} row={item} />
      </div>
    </DiaDrawer>
  );
}


 `;
}
// /-components/form/delete
export function rootPageDeleteFormComponentsTemplate(pagename: string) {
  const capitalpagename = pagename.charAt(0).toUpperCase() + pagename.slice(1);
  return `

import { useState } from "react";
import { DiaDrawer } from "@/components/wrappers/DiaDrawer";
import { Edit } from "lucide-react";
import { makeHotToast } from "@/components/toasters";
import { Base${capitalpagename}Form } from "./base";
import { useMutation } from "@tanstack/react-query";
import { ${pagename}sService } from "@/lib/kubb/gen";


interface Delete${capitalpagename}formInterface {
  item: Record<string, any> & { id: string };
}
export function Delete${capitalpagename}form({ item }: Delete${capitalpagename}formInterface) {
  const [open, setOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: (value: {}) => {
      // return new Promise<{}>((resolve) => {
      //   setTimeout(() => {
      //     resolve(value);
      //   }, 2000);
      // });
      return ${pagename}Service().deleteApi${capitalpagename}lient({ id:value,id });
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
        title: "Deleted",
        description:"${capitalpagename} deleted successfully",
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
      invalidates: ["${pagename}"],
    },
  });
  return (
    <DiaDrawer
      open={open}
      setOpen={setOpen}
      title="Delete ${capitalpagename}"
      description={"Are you sure you want to delete this ${pagename}"}
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
            Are you sure you want to delete this ${pagename}
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


 `;
}
// /-components/form/base
export function rootPageBaseFormComponentsTemplate(pagename: string) {
  const capitalpagename = pagename.charAt(0).toUpperCase() + pagename.slice(1);
  return `

import { UseMutationResult } from "@tanstack/react-query";

interface Base${capitalpagename}FormProps<T extends Record<string, any>> {
  mutation: UseMutationResult<any,Error,T,unknown>;
  row: T;
  afterSave?: () => void;
}
export function Base${capitalpagename}Form<T extends Record<string, any>>(
  {}: Base${capitalpagename}FormProps<T>,
) {
  return (
    <form>
      <h1>Base${capitalpagename}Form</h1>
    </form>
  );
}
 
 `;
}


