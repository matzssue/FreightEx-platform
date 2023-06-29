import * as yup from 'yup';

export type AddLoadValues = yup.InferType<typeof addLoadSchema>;
export const addLoadSchema = yup.object().shape({
  loading: yup.string().required('Loading address is required').min(3),
  unloading: yup.string().required('Unloading address is required').min(3),
  loadingDate: yup.string().required('Loading date is required').min(5),
  unloadingDate: yup.string().required('Unloading date is required').min(5),
  price: yup.string().required('Price is required').min(3),
  term: yup.string().required('Payment term is required').min(1),
  currency: yup.string().required('Please select currency'),
  length: yup.number().positive().max(16).optional(),
  weight: yup.number().positive().max(99).optional(),

  multiCheckbox: yup
    .object()
    .shape({
      bus: yup.boolean().default(false),
      solo: yup.boolean().default(false),
      semiTrailer: yup.boolean().default(false),
      doubleTrailer: yup.boolean().default(false),
    })
    .test('multiCheckbox', 'At least one of the checkbox is required', (options) => {
      console.log(
        options.bus || options.solo || options.semiTrailer || options.doubleTrailer,
        'yup multiCheckbox result',
      );
      return options.bus || options.solo || options.semiTrailer || options.doubleTrailer;
    }),
});
