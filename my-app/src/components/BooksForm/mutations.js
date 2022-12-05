import { gql } from 'apollo-boost';

export const addBookMutation = gql`
  mutation addBook($name: String!, $genre: String!, $authorId: ID) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
    }
  }
`;

export const updateBookMutation = gql`
  mutation updateBook($id: ID, $name: String!, $genre: String!, $authorId: ID) {
    updateBook(id: $id, name: $name, genre: $genre, authorId: $authorId) {
      name
    }
  }
`;
