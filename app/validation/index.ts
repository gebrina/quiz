import * as yup from "yup";

export const RegisterValidation = yup.object().shape({
  firstName: yup.string().required().min(3),
  lastName: yup.string().required().min(3),
  email: yup.string().required().email(),
  passowrd: yup.string().required().min(5),
});
