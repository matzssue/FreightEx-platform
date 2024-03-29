import * as yup from 'yup';

export type AddLoadValues = yup.InferType<typeof addLoadSchema>;
export const addLoadSchema = yup.object().shape({
  loadingAddress: yup.string().required('Loading address is required'),
  unloadingAddress: yup.string().required('Unloading address is required'),
  loadingDate: yup.string().required('Loading date is required').min(5),
  unloadingDate: yup.string().required('Unloading date is required').min(5),
  price: yup
    .number()
    .required('Price is required')
    .typeError('Please enter number')
    .min(1)
    .max(10000),
  term: yup.string().required('Payment term is required').min(1).typeError('Please enter term'),
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
    city: yup.string().required().nullable(),
    country: yup.string().required(),
    latitude: yup.number().required(),
    longitude: yup.number().required(),
    postal_code: yup.string().required(),
  }),
  unloadingAddressData: yup.object().shape({
    city: yup.string().required().nullable(),
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
    .test(
      'vehicles',
      'At least one of the checkbox is required',
      (options) =>
        options.bus || options.solo || options['semi trailer'] || options['double trailer'],
    ),
});
