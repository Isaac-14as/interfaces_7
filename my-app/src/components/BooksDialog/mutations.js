import { gql } from 'apollo-boost';

export const deleteBookMutation = gql`
  mutation deleteBook($id: ID) {
    deleteBook(id: $id) {
      id
    }
  }
`;
