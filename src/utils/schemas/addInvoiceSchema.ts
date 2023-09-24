import * as yup from 'yup';
export type Invoice = yup.InferType<typeof addInvoiceSchema>;
export type CollectiveInvoice = yup.InferType<typeof addCollectiveInvoiceSchema>;
export const addInvoiceSchema = yup.object({
  order: yup
    .object({
      id: yup.string().required(),
      loadingCountry: yup.string().required(),
      loadingCity: yup.string().required().nullable(),
      unloadingCountry: yup.string().required(),
      unloadingCity: yup.string().required().nullable(),
      paymentTerm: yup.string().required(),
      price: yup.number().required(),
      currency: yup.string().required(),
      seller: yup.string().required(),
      recipient: yup.string().required(),
      createdAt: yup.string().required(),
      vehicleId: yup.string().nullable(),
    })
    .required(),
  invoiceDate: yup.string().required(),
  additionalInformations: yup.string().max(500),
});
export const addCollectiveInvoiceSchema = yup.object({
  company: yup.string().required(),
  orders: yup
    .array()
    .min(1, 'Please select atleast one order')
    .required('Please select atleast one order'),
  invoiceDate: yup.string().required(),
  additionalInformations: yup.string().max(500),
  paymentTerm: yup.string().min(1).required(),
});
