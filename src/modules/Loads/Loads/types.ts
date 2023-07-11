import { FieldValues, Control } from 'react-hook-form';

export type ControllerProps<T extends FieldValues> = {
  control: Control<T>;
};
