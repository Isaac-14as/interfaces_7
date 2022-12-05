import { gql } from 'apollo-boost';

export const authorsQuery = gql`
  query authorsQuery {
    authors {
      id
      name
      date_of_birth
      books {
        name
      }
    }
  }
`;
