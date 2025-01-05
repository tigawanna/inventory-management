
import { Textarea } from "@/components/shadcn/ui/textarea";
import { Input } from "@/components/shadcn/ui/input";
import { FormFieldProps, FieldInfo } from "./components";
import { twMerge } from "tailwind-merge";


export interface TextFormFieldProps<T> extends FormFieldProps<T> {
  inputOptions?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function TextFormField<T>({
  field,
  fieldKey,
  fieldlabel,
  inputOptions,
  className,
}: TextFormFieldProps<T>) {
  const inputClassname = twMerge(
    field.state.meta.errors.length > 0 ? "border-error-content" : "",
    className
  );

  return (
    <div className="w-full">
      <label htmlFor={fieldKey} className=" text-sm">
        {fieldlabel || fieldKey}
      </label>
      <Input
        id={fieldKey}
        name={fieldKey}
        placeholder={fieldlabel ? `enter ${fieldlabel}` : `enter ${fieldKey}`}
        {...inputOptions}
        className={inputClassname}
        // @ts-expect-error
        value={field.state.value}
      />
      <FieldInfo field={field} />
    </div>
  );
}

export interface TextAreaFormFieldProps<T> extends FormFieldProps<T> {
  inputOptions?: React.InputHTMLAttributes<HTMLTextAreaElement>;
}

export function TextAreaFormField<T>({
  field,
  fieldKey,
  fieldlabel,
  inputOptions,
  className,
}: TextAreaFormFieldProps<T>) {
  const inputClassname = twMerge(
    field.state.meta.errors
      ? "min-h-[100px] p-1 rounded-lg border-error-content"
      : "min-h-[100px] p-1 rounded-lg",
    className
  );
  return (
    <div className="w-full">
      <label htmlFor={fieldKey} className=" text-sm">
        {fieldlabel || fieldKey}
      </label>
      <Textarea
        id={fieldKey}
        name={fieldKey}
        placeholder={fieldlabel ? `enter ${fieldlabel}` : `enter ${fieldKey}`}
        {...inputOptions}
        className={inputClassname}
        // @ts-expect-error
        value={field.state.value}
        onBlur={field.handleBlur}
        //   @ts-expect-error
        onChange={(e) => field.handleChange(e.target.value)}
      />
      <FieldInfo field={field} />
    </div>
  );
}

export interface ImageURLInputFieldProps<T> extends FormFieldProps<T> {
  inputOptions?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function ImageURLInputField<T>({
  field,
  fieldKey,
  fieldlabel,
  inputOptions,
  className,
}: ImageURLInputFieldProps<T>) {
  const inputClassname = twMerge(
    field.state.meta.errors.length > 0 ? "border-error-content" : "",
    className
  );
  const value = field.state.value as string;
  return (
    <div className="w-full">
      <label htmlFor={fieldKey} className=" text-sm">
        {fieldlabel || fieldKey}
      </label>
      <img src={value ?? ""} key={value} />
      <Input
        id={fieldKey}
        name={fieldKey}
        placeholder={fieldlabel ? `enter ${fieldlabel}` : `enter ${fieldKey}`}
        {...inputOptions}
        className={inputClassname}
        value={value}
      />
      <FieldInfo field={field} />
    </div>
  );
}
