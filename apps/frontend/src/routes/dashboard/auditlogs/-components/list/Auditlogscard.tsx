import {
  objectOutputType,
  ZodString,
  ZodNullable,
  ZodOptional,
  ZodUnknown,
  ZodTypeAny,
  objectInputType,
  ZodEnum,
  ZodObject,
} from "zod";

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
      updated_at: ZodNullable<ZodString>;
      created_at: ZodNullable<ZodString>;
      userId: ZodNullable<ZodString>;
      action: ZodString;
      entityType: ZodString;
      entityId: ZodString;
      ipAddress: ZodNullable<ZodString>;
      oldData: ZodOptional<ZodNullable<ZodUnknown>>;
      newData: ZodOptional<ZodNullable<ZodUnknown>>;
      user: ZodNullable<
        ZodObject<
          {
            name: ZodString;
            email: ZodString;
            avatarUrl: ZodNullable<ZodString>;
            role: ZodNullable<ZodEnum<["admin", "user"]>>;
            id: ZodString;
          },
          "passthrough",
          ZodTypeAny,
          objectOutputType<
            {
              name: ZodString;
              email: ZodString;
              avatarUrl: ZodNullable<ZodString>;
              role: ZodNullable<ZodEnum<["admin", "user"]>>;
              id: ZodString;
            },
            ZodTypeAny,
            "passthrough"
          >,
          objectInputType<
            {
              name: ZodString;
              email: ZodString;
              avatarUrl: ZodNullable<ZodString>;
              role: ZodNullable<ZodEnum<["admin", "user"]>>;
              id: ZodString;
            },
            ZodTypeAny,
            "passthrough"
          >
        >
      >;
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
        <div className="flex w-full items-center justify-between gap-3 p-2">
          <div className="flex w-full flex-wrap items-center justify-between">
            <h1 className="text-2xl font-bold">{item.action}</h1>
            <div>{item.entityType}</div>
          </div>
          {/* <UpdateAuditlogsform item={item} /> */}
        </div>

        <div className="h-full flex flex-wrap gap-2 items-center">

          {item?.user && (
            <Popover>
              <PopoverTrigger className="badge badge-secondary badge-outline gap-1">
                {item.user?.name}
                <Fullscreen className="size-4" />
              </PopoverTrigger>
              <PopoverContent className="w-fit">
                <div className="flex gap-2 items-center justify-between">
                    <h1 className="text-2xl font-bold">{item.user?.name}</h1>
                    <div className="badge badge-accent badge-outline">{item.user.role}</div>
                </div>
                    <p>{item.user?.email}</p>
              </PopoverContent>
            </Popover>
          )}

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
