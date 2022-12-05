import { gql } from 'apollo-boost';

export const deleteAuthorMutation = gql`
  mutation deleteAuthor($id: ID) {
    deleteAuthor(id: $id) {
      id
    }
  }
`;
