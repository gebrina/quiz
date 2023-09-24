import { gql } from "@apollo/client";

// Quiz Muatations and Queries
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

export const updateQuizMutation = gql`
  mutation (
    $quizId: ID!
    $user: ID!
    $categoryId: ID!
    $question: String!
    $correctAnswer: String!
    $answers: [ChoiceInput!]!
  ) {
    updateQuiz(
      quizInput: {
        id: $quizId
        user: { id: $user }
        category: { id: $categoryId }
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

export const deleteQuizMutation = gql`
  mutation ($quizId: String!) {
    deleteQuiz(quizId: $quizId) {
      id
    }
  }
`;

export const getAllQuizzesQuery = gql`
  query getAllQuizzes {
    findAllQuiz {
      id
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

// User Queries and Mutations
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

export const createUserMutation = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $password: String!
    $email: String!
  ) {
    createUser(
      user: {
        firstName: $firstName
        lastName: $lastName
        password: $password
        email: $email
      }
    ) {
      id
    }
  }
`;

// Quiz Categoires
export const getQuizCategoriesQuery = gql`
  query {
    findAllQuizCategory {
      id
      name
      quizzes {
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

export const createQuizCategoryMutation = gql`
  mutation createQuizCategory($name: String!) {
    createQuizCategory(categoryInput: { name: $name }) {
      id
    }
  }
`;

export const updateQuizCategoryMutation = gql`
  mutation ($categoryId: ID!, $name: String!) {
    updateQuizCategory(categoryInput: { id: $categoryId, name: $name }) {
      name
    }
  }
`;

export const deleteQuizCategoryMutation = gql`
  mutation ($categoryId: String!) {
    deleteQuizCategory(categoryId: $categoryId) {
      id
    }
  }
`;
