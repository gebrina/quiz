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
