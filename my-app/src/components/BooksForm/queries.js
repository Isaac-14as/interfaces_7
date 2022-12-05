import { gql } from 'apollo-boost';

export const authorsQuery = gql`
  query authorsQuery {
    authors {
      id
      name
    }
  }
`;
