import * as yup from 'yup';

export type AddLoadValues = yup.InferType<typeof addLoadSchema>;
export const addLoadSchema = yup.object().shape({
  loadingAddress: yup.string().required('Loading address is required'),
  unloadingAddress: yup.string().required('Unloading address is required'),
  loadingDate: yup.string().required('Loading date is required').min(5),
  unloadingDate: yup.string().required('Unloading date is required').min(5),
  price: yup.number().required('Price is required'),
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
    city: yup.string().required(),
    country: yup.string().required(),
    latitude: yup.number().required(),
    longitude: yup.number().required(),
    postal_code: yup.string().required(),
  }),
  unloadingAddressData: yup.object().shape({
    city: yup.string().required(),
    country: yup.string().required(),
    latitude: yup.number().required(),
    longitude: yup.number().required(),
    postal_code: yup.string().required(),
  }),
  vehicles: yup
    .object()
    .shape({
      bus: yup.boolean().default(false),
      solo: yup.boolean().default(false),
      'semi trailer': yup.boolean().default(false),
      'double trailer': yup.boolean().default(false),
    })
    .test('vehicles', 'At least one of the checkbox is required', (options) => {
      return options.bus || options.solo || options['semi trailer'] || options['double trailer'];
    }),
});
