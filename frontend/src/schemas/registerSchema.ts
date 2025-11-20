import * as yup from 'yup'

export const registerSchema = yup.object({
  username: yup
    .string()
    .required()
    .min(5),
  email: yup
    .string()
    .required()
    .email(),
  password: yup
    .string()
    .required()
    .min(4),
})



