import { gql } from "@apollo/client";

export const LoginMutation = gql`
  mutation authUser($email: String!, $password: String!) {
    authUser(user: { email: $email, password: $password }) {
      user {
        firstName
        lastName
        email
      }
      access_token
    }
  }
`;

export const addQuizMutation = gql`
  mutation (
    $user: ID!
    $category: ID!
    $question: String!
    $correctAnswer: String!
    $answers: [ChoiceInput!]!
  ) {
    createQuiz(
      quizInput: {
        user: { id: $user }
        category: { id: $category }
        qusetion: $question
        correctAnswer: $correctAnswer
        answers: $answers
      }
    ) {
      id
      qusetion
      correctAnswer
    }
  }
`;

export const getAllQuizzesQuery = gql`
  query getAllQuizzes {
    findAllQuiz {
      qusetion
      correctAnswer
      category {
        name
      }
      user {
        firstName
        lastName
        id
      }
      answers {
        answer
        id
      }
    }
  }
`;
