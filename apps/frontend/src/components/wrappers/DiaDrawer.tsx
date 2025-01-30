import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/shadcn/ui/drawer";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog";
import { Button } from "../shadcn/ui/button";
import { X } from "lucide-react";
import { useMediaQuery } from "@/utils/hooks/use-media-query";

interface DiaDrawerProps {
  title: string;
  description: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DiaDrawer({
  children,
  description,
  title,
  trigger,
  open,
  setOpen,
}: DiaDrawerProps) {
  const matches = useMediaQuery("(min-width: 640px)");

  if (matches) {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          {trigger ?? <Button variant="outline">Open </Button>}
        </AlertDialogTrigger>
        <AlertDialogContent className="max:w-[70vw]">
          <AlertDialogHeader>
            <div className="flex gap-2 justify-between">
            <div className="flex flex-col gap-2 justify-between">
            <AlertDialogTitle className="text-2xl">{title}</AlertDialogTitle>
            <AlertDialogDescription className="">
              {description}
            </AlertDialogDescription>
            </div>
            <AlertDialogCancel><X className="size-7" /></AlertDialogCancel>
            </div>
          </AlertDialogHeader>
          {children}
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen} >
      <DrawerTrigger asChild>
        {trigger ?? <Button variant="outline">Open </Button>}
      </DrawerTrigger>
      <DrawerContent className="max-w-[100vw] p-2 h-fit  max-h-[90%] ">
        <div className="flex h-full w-full flex-col p-5 items-center justify-center md:max-w-[60%]">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          {children}
          <DrawerFooter>
            <DrawerClose asChild>
              <X className="absolute right-[2%] top-[2%] size-7" />
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
