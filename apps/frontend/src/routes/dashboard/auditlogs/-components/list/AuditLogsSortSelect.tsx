import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { auditAction,entityType } from "../filters";

interface AuditlogsFilterSelectProps {}

export function AuditlogsEntityFilterSelect({}: AuditlogsFilterSelectProps) {
  const navigate = useNavigate({ from: "/dashboard/auditlogs/" });
  const { entity, ...rest } = useSearch({ from: "/dashboard/auditlogs/" });

  return (
    <Select
      value={entity}
      onValueChange={(value: any) => {
        if (value) {
          if (value === "default") {
            navigate({ search: { entity: undefined, ...rest } });
          } else {
            navigate({ search: { entity: value, ...rest } });
          }
        }
      }}
    >
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="entity" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{entity}</SelectLabel>
          {entityType.map((item) => {
            return (
              <SelectItem key={item} value={item} className="min-w-fit">
                {item}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
interface AuditlogsFilterSelectProps {}

export function AuditlogsActionFilterSelect({}: AuditlogsFilterSelectProps) {
  const navigate = useNavigate({ from: "/dashboard/auditlogs/" });
  const { action, ...rest } = useSearch({ from: "/dashboard/auditlogs/" });

  return (
    <Select
      value={action}
      onValueChange={(value: any) => {
        if (value) {
          if (value === "default") {
            navigate({ search: { action: undefined, ...rest } });
          } else {
            navigate({ search: { action: value, ...rest } });
          }
        }
      }}
    >
      <SelectTrigger className="min-w-fit">
        <SelectValue placeholder="action" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{action}</SelectLabel>
          {auditAction.map((item) => {
            return (
              <SelectItem key={item} value={item} className="min-w-fit">
                {item}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
export function AuditlogsOrderSelect({}: AuditlogsFilterSelectProps) {
  const {order , ...rest } = useSearch({ from: "/dashboard/auditlogs/" });
  const navigate = useNavigate({ from: "/dashboard/auditlogs/" });
  const paymentTypes = ["desc", "asc"] as const;
  return (
    <Select
      value={order}
      onValueChange={(value: any) => {
        if (value) {
          if (value === "All") {
            navigate({ search: { order: undefined, ...rest }, replace: true });
          } else {
            navigate({ search: { order: value, ...rest }, replace: true });
          }
        }
      }}
    >
      <SelectTrigger className="min-w-fit">
        <SelectValue placeholder="Order by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{order}</SelectLabel>
          {paymentTypes.map((type) => {
            return (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}



