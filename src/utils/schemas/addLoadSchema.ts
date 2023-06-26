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
  multiCheckbox: yup
    .object()
    .shape({
      bus: yup.boolean(),
      solo: yup.boolean(),
      semiTrailer: yup.boolean(),
      doubleTrailer: yup.boolean(),
    })
    .test('multiCheckbox', 'At least one of the checkbox is required', (options) => {
      console.log(
        options.bus || options.solo || options.semiTrailer || options.doubleTrailer,
        'yup multiCheckbox result',
      );
      return options.bus || options.solo || options.semiTrailer || options.doubleTrailer;
    }),
  // bus: yup.boolean().oneOf([true], 'At least one checkbox must be selected'),
  // solo: yup.boolean().oneOf([true], 'At least one checkbox must be selected'),
  // semiTrailer: yup.boolean().oneOf([true], 'At least one checkbox must be selected'),
  // doubleTrailer: yup.boolean().oneOf([true], 'At least one checkbox must be selected'),
});
