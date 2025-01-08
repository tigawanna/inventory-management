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
interface InventorySortSelectProps {}

export function InventorySortSelect({}: InventorySortSelectProps) {
  const { sort, ...rest } = useSearch({ from: "/inventory/" });
  const navigate = useNavigate({ from: "/inventory" });
  const paymentTypes = ["name", "quantity", "price", "All"] as const;
  return (
    <Select
      value={sort}
      onValueChange={(value: any) => {
        if (value) {
          if (value === "All") {
            navigate({ search: { sort: undefined, ...rest }, replace: true });
          } else {
            navigate({ search: { sort: value, ...rest }, replace: true });
          }
        }
      }}
    >
      <SelectTrigger className="">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{sort}</SelectLabel>
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
export function InventoryOrderSelect({}: InventorySortSelectProps) {
  const { order, ...rest } = useSearch({ from: "/inventory/" });
  const navigate = useNavigate({ from: "/inventory" });
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
      <SelectTrigger className="">
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
