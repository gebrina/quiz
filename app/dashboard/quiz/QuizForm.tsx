import { FC, useState } from "react";
import { addQuizMutation } from "@/app/graphql";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";

type QuizFormProps = {
  user: string;
  category: string;
};
const QuizForm: FC<QuizFormProps> = ({ category, user }) => {
  const [cerateQuiz, { data, error, loading }] = useMutation(addQuizMutation);
  const [answers, setAnswers] = useState<Array<string>>();

  const initialQuizValues = {
    question: "",
    correctAnswer: "",
  };

  const {} = useFormik({
    initialValues: initialQuizValues,
    onSubmit: () => {},
  });
  return <section></section>;
};

export default QuizForm;
