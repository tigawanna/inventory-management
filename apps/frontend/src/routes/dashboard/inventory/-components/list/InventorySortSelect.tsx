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
  const navigate = useNavigate({ from: "/dashboard/inventory" });
  const { sort, ...rest } = useSearch({ from: "/dashboard/inventory/" });
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
export function InventoryOrderSelect({}: InventorySortSelectProps) {
  const { order, ...rest } = useSearch({ from: "/dashboard/inventory/" });
  const navigate = useNavigate({ from: "/dashboard/inventory" });
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


interface InventoryCategoriesSelectProps {

}

export function InventoryCategoriesSelect({}: InventoryCategoriesSelectProps) {
  const { categoryId, ...rest } = useSearch({ from: "/dashboard/inventory/" });
  const navigate = useNavigate({ from: "/dashboard/inventory" });
  const categories = ["All","category_id_1", "category_id_2", "category_id_3"];
  return (
    <Select
      value={categoryId}
      onValueChange={(value: any) => {
        if (value) {
          if (value === "All") {
            navigate({ search: { categoryId: "", ...rest }, replace: true });
          } else {
            navigate({ search: { categoryId: value, ...rest } });
          }
        }
      }}
    >
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Category ID" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{categoryId}</SelectLabel>
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
