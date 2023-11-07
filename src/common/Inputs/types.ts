import { Control, FieldValues, Path } from 'react-hook-form';

export type BaseInputProps<T extends FieldValues> = {
  control: Control<T>;
  label?: string;
  name: Path<T>;
};
