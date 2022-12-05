import { gql } from 'apollo-boost';

export const addAuthorMutation = gql`
  mutation addAuthor($name: String!, $date_of_birth: String!) {
    addAuthor(name: $name, date_of_birth: $date_of_birth) {
      name
    }
  }
`;

export const updatedAuthorMutation = gql`
  mutation updateAuthor($id: ID, $name: String!, $date_of_birth: String!) {
    updateAuthor(id: $id, name: $name, date_of_birth: $date_of_birth) {
      name
    }
  }
`;
