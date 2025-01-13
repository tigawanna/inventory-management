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

interface CategorySortSelectProps {}

export function CategorySortSelect({}: CategorySortSelectProps) {
  const navigate = useNavigate({ from: "/dashboard/categories/" });
  const { sort, ...rest } = useSearch({ from: "/dashboard/categories/" });
  const paymentTypes = ["name", "quantity", "price", "default"] as const;
  return (
    <Select
      value={sort}
      onValueChange={(value: any) => {
        if (value) {
          if (value === "default") {
            navigate({ search: { sort: undefined, ...rest } });
          } else {
            navigate({ search: { sort: value, ...rest } });
          }
        }
      }}
    >
      <SelectTrigger className="w-fit">
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
export function CategoryOrderSelect({}: CategorySortSelectProps) {
  const { order, ...rest } = useSearch({ from: "/dashboard/categories/" });
  const navigate = useNavigate({ from: "/dashboard/categories/" });
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
      <SelectTrigger className="w-fit">
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


