import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { deleteBookMutation } from './mutations';
import { booksQuery } from '../BooksTable/queries';

const withGraphqlDelete = graphql(deleteBookMutation, {
  props: ({ mutate }) => ({
    deleteBook: id => mutate({
      variables: id,
      refetchQueries: [{ query: booksQuery }],
    }),
  }),
});

export default compose(withGraphqlDelete);
