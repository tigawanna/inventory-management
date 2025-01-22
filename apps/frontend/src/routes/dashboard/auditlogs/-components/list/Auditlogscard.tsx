import {
  objectOutputType,
  ZodString,
  ZodNullable,
  ZodOptional,
  ZodUnknown,
  ZodTypeAny,
} from "zod";
import { UpdateAuditlogsform } from "../form/update";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import { Fullscreen } from "lucide-react";

interface AuditlogscardProps {
  item: objectOutputType<
    {
      id: ZodString;
      userId: ZodNullable<ZodString>;
      action: ZodString;
      entityType: ZodString;
      entityId: ZodString;
      oldData: ZodOptional<ZodNullable<ZodUnknown>>;
      newData: ZodOptional<ZodNullable<ZodUnknown>>;
      ipAddress: ZodNullable<ZodString>;
      updated_at: ZodNullable<ZodString>;
      created_at: ZodNullable<ZodString>;
    },
    ZodTypeAny,
    "passthrough"
  >;
}

export function Auditlogscard({ item }: AuditlogscardProps) {
  return (
    <li
      key={item.id}
      className="flex h-36 w-[95%] items-center justify-center gap-2 rounded-xl bg-base-300 p-2 sm:w-[45%] lg:w-[30%]"
    >
      <div className="flex h-full w-full flex-col justify-between gap-2">
        <div className="flex  w-full justify-between items-center gap-3 p-2">
        <div className="flex flex-wrap  w-full justify-between items-center">
          <h1 className="text-2xl font-bold">{item.action}</h1>
        <div>{item.entityType}</div>
        </div>
          <UpdateAuditlogsform item={item} />
        </div>
        <div className="h-full">
        {item.oldData ? (
          <Popover>
            <PopoverTrigger className="badge badge-secondary badge-outline gap-1">
              Old Data
              <Fullscreen className="size-4" />
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              <pre className="min-h-fit">
                {JSON.stringify(item.oldData, null, 2)}
              </pre>
            </PopoverContent>
          </Popover>
        ) : null}
        {item.newData ? (
          <Popover>
            <PopoverTrigger className="badge badge-primary badge-outline gap-1">
              New Data
              <Fullscreen className="size-4" />
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              <pre className="min-h-fit max-w-[50%]">
                {JSON.stringify(item.newData, null, 2)}
              </pre>
            </PopoverContent>
          </Popover>
        ) : null}

        </div>

        {item?.created_at && (
          <div className="text-sm">
            {new Date(item?.created_at).toLocaleDateString()}
          </div>
        )}
      </div>
    </li>
  );
}
