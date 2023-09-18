import { gql } from "@apollo/client";

export const LoginMutation = gql`
  mutation authUser($email: String!, $password: String!) {
    authUser(user: { email: $email, password: $password }) {
      user {
        firstName
        lastName
        email
        id
      }
      access_token
    }
  }
`;

export const getQuizCategoriesQuery = gql`
  query findAllQuiCategoryies {
    findAllQuizCategory {
      id
      name
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
        id
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

export const getQuizCategoryById = gql`
  query findoneCategory($categoryId: String!) {
    findOneQuizCategory(categoryId: $categoryId) {
      name
      id
      quizzes {
        id
        qusetion
        correctAnswer
        answers {
          id
          answer
        }
      }
    }
  }
`;

export const getUserById = gql`
  query ($userId: String!) {
    findOneUser(userId: $userId) {
      id
      firstName
      lastName
      email
      password
    }
  }
`;

export const updateUserMutation = gql`
  mutation updateUser(
    $userId: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String
  ) {
    updateUser(
      user: {
        id: $userId
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      }
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;
