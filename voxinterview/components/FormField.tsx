import { Controller, Control, FieldValues, Path } from "react-hook-form";

import { Input } from "@/components/ui/input";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "file";
}

const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: FormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div>
          <label className="label" htmlFor={name}>
            {label}
          </label>
          <div>
            <Input
              id={name}
              className="input"
              type={type}
              placeholder={placeholder}
              {...field}
            />
          </div>
          {fieldState.error?.message && (
            <p role="alert">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default FormField;