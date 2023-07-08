import * as yup from 'yup';

export type AddLoadValues = yup.InferType<typeof addLoadSchema>;
export const addLoadSchema = yup.object().shape({
  loadingAddress: yup.string().required('Loading address is required'),
  unloadingAddress: yup.string().required('Unloading address is required'),
  loadingDate: yup.date().required('Loading date is required').min(5),
  unloadingDate: yup.date().required('Unloading date is required').min(5),
  price: yup.string().required('Price is required'),
  term: yup.string().required('Payment term is required').min(1),
  currency: yup.string().required('Please select currency'),
  length: yup
    .number()
    .typeError('Please enter number')
    .positive('only numbers beetween 0-100')
    .max(100)
    .optional(),
  weight: yup
    .number()
    .typeError('Please enter number')
    .positive('only numbers beetween 0-100')
    .max(100)
    .optional(),
  loadingAddressData: yup.object().shape({
    city: yup.string(),
    country: yup.string(),
    latitude: yup.number(),
    longitude: yup.number(),
    postal_code: yup.string(),
  }),
  unloadingAddressData: yup.object().shape({
    city: yup.string(),
    country: yup.string(),
    latitude: yup.number(),
    longitude: yup.number(),
    postal_code: yup.string(),
  }),
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
