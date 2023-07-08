import * as yup from 'yup';
export type LoadsFiltersValues = yup.InferType<typeof loadsFilterSchema>;
export const loadsFilterSchema = yup.object().shape({
  loadingPlace: yup.string().required(),
  unloadingPlace: yup.string().nullable(),
  startLoadingDate: yup.date().nullable(),
  endLoadingDate: yup
    .date()
    .nullable()
    .min(yup.ref('startLoadingDate'), 'End loading date cannot be earlier than start loading date'),
  startUnloadingDate: yup
    .date()
    .nullable()
    .min(
      yup.ref('startLoadingDate'),
      'Start unloading date cannot be earlier than start loading date',
    ),
  endUnloadingDate: yup
    .date()
    .nullable()
    .min(
      yup.ref('startUnloadingDate'),
      'End unloading date cannot be earlier than start unloading date',
    ),
  minWeight: yup
    .number()
    .typeError('Enter a number')
    .transform((v, o) => (o === '' ? null : v))
    .min(0)
    .max(50, 'Maximum weight cannot exceed 50')
    .nullable(),
  maxWeight: yup
    .number()
    .typeError('Enter a number')
    .transform((v, o) => (o === '' ? null : v))
    .moreThan(yup.ref('minWeight'), 'Maximum weight must be greater than minimum weight')
    .max(50, 'Maximum weight cannot exceed 50')
    .nullable(),
  minLength: yup
    .number()
    .typeError('Enter a number')
    .transform((v, o) => (o === '' ? null : v))
    .min(0, 'Minimum length cannot be negative')
    .nullable(),
  maxLength: yup
    .number()
    .typeError('Enter a number')
    .transform((v, o) => (o === '' ? null : v))
    .min(0, 'Minimum length cannot be negative')
    .max(16, 'Maximum length cannot exceed 16 meters')
    .nullable(),
  loadingArea: yup
    .number()
    .typeError('Enter a number')
    .transform((v, o) => (o === '' ? null : v))
    .min(0, 'Loading area cannot be negative')
    .max(100000, 'Loading area cannot exceed 150')
    .nullable(),
  unloadingArea: yup
    .number()
    .typeError('Enter a number')
    .transform((v, o) => (o === '' ? null : v))
    .min(0, 'Unloading area cannot be negative')
    .max(150, 'Unloading area cannot exceed 150')
    .nullable(),
});
