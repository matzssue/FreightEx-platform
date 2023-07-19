import * as yup from 'yup';
export type LoginFormValues = yup.InferType<typeof loginSchema>;
export type RegisterUserFormValues = yup.InferType<typeof registerUserSchema>;
export type RegisterCompanyFormValues = yup.InferType<typeof registerCompanySchema>;

export const loginSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('No password provided.'),
});
export const registerUserSchema = yup.object().shape({
  name: yup.string().required('Name is required').min(3),
  surname: yup.string().required('Surname is required').min(3),
  imgUrl: yup.string().optional(),
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match'),
});
export const registerCompanySchema = yup.object().shape({
  companyName: yup.string().required('Name is required').min(3),
  vatId: yup.string().required().min(3).max(12),
});