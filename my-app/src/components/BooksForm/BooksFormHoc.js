import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { addBookMutation, updateBookMutation } from './mutations';
import { booksQuery } from '../BooksTable/queries';
import { authorsQuery } from './queries';

import { styles } from './styles';

const withGraphQL = compose(
  graphql(addBookMutation, {
    props: ({ mutate }) => ({
      addBook: book => mutate({
        variables: book,
        refetchQueries: [{ query: booksQuery }],
      }),
    }),
  }),
  graphql(updateBookMutation, {
    props: ({ mutate }) => ({
      updateBook: book => mutate({
        variables: book,
        refetchQueries: [{ query: booksQuery }],
      }),
    }),
  })
);

export default compose(withStyles(styles), withGraphQL, graphql(authorsQuery));
