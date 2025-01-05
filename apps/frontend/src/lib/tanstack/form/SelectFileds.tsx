import { FormFieldProps } from "./components";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
export interface SelectFieldsProps<T extends Record<string,any>, K extends keyof T> extends FormFieldProps<T> {
  items: {
    label: string;
    value: T[K];
  }[];
}

export function SelectFields<T extends Record<string,any>, K extends keyof T>({
  items,
  field,
  fieldKey,
  fieldlabel,
}: SelectFieldsProps<T, K>) {

  return (
    <Select
      name={fieldKey}
      onValueChange={(value) => {
        if (field) {
          field.handleChange(value as any);
        }
      }}
      value={field.state.value as string}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={`Select ${fieldlabel}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="gap-1">
          <SelectLabel>{fieldlabel}</SelectLabel>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
