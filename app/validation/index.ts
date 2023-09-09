import * as yup from "yup";

export const registerValidation = yup.object().shape({
  firstName: yup.string().required().min(3),
  lastName: yup.string().required().min(3),
  email: yup.string().required().email(),
  passowrd: yup.string().required().min(5),
});

export const loginValidationSchema = yup.object().shape({
  email: yup.string().required("Email address is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(3, "Password must be morethan 3 chars"),
});
