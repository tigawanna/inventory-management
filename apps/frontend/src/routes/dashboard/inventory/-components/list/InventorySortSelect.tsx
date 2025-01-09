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
import { useState } from "react";
interface InventorySortSelectProps {}

export function InventorySortSelect({}: InventorySortSelectProps) {
  const { sort, ...rest } = useSearch({ from: "/dashboard/inventory/" });
  const navigate = useNavigate({ from: "/dashboard/inventory" });
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


interface InventoryCategoriesSelectProps {
  onCategoryChange:(cat:string)=>void
}

export function InventoryCategoriesSelect({onCategoryChange}: InventoryCategoriesSelectProps) {

  const [category,setCategory] = useState("category_1_id")
  const categories = ["category_id_1", "category_id_2", "category_id_3"];
  return (
    <Select
      value={category}
      onValueChange={(value: any) => {
        if (value) {
          setCategory(value)
          onCategoryChange(value)
        }
      }}
    >
      <SelectTrigger className="">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{category}</SelectLabel>
          {categories.map((type) => {
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
