import * as yup from "yup";

export const registerValidation = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter valid email address")
    .required("Email address is required"),
  password: yup.string().required("Password is required"),
});

export const quizValidation = yup.object().shape({
  question: yup.string().required("Question is required!"),
  correctAnswer: yup.string().required("Correct Answer is required!"),
});
