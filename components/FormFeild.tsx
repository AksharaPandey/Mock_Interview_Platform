import { Controller, FieldValues, Control, Path } from 'react-hook-form'
import { Input } from './ui/input'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from './ui/form'

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
}

function FormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text'
}: FormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input className="input" type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormField
