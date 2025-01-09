import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

interface ListPageHeaderProps {
  title: string;
  formTrigger?: React.ReactNode;
  searchBox?: React.ReactNode;
}

export function ListPageHeader({
  title,
  formTrigger,
  searchBox,
}: ListPageHeaderProps) {
  return (
    <div className="sticky top-[7%] bg-base-200 z-20 flex w-full flex-wrap justify-between gap-3 px-3 pr-5">
      <div className="flex w-full items-center justify-between gap-2 md:w-fit">
        {/* <Link className="hover:text-accent" to="/">
          <ChevronLeft className="size-10" />
        </Link> */}
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="">{formTrigger}</div>
      </div>

      <div className="flex w-full min-w-[30%] flex-1 gap-2 md:w-fit">
        {searchBox}
      </div>
    </div>
  );
}
