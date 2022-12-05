import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { deleteAuthorMutation } from './mutations';
import { authorsQuery } from '../AuthorsTable/queries';

const withGraphqlDelete = graphql(deleteAuthorMutation, {
  props: ({ mutate }) => ({
    deleteAuthor: id => mutate({
      variables: id,
      refetchQueries: [{ query: authorsQuery }],
    }),
  }),
});

export default compose(withGraphqlDelete);
