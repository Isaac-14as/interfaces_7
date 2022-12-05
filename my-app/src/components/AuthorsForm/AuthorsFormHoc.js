import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { addAuthorMutation, updatedAuthorMutation } from './mutations';
import { authorsQuery } from '../AuthorsTable/queries';

import { styles } from './styles';

const withGraphQL = compose(
  graphql(addAuthorMutation, {
    props: ({ mutate }) => ({
      addAuthor: author => mutate({
        variables: author,
        refetchQueries: [{ query: authorsQuery }],
      }),
    }),
  }),
  graphql(updatedAuthorMutation, {
    props: ({ mutate }) => ({
      updateAuthor: author => mutate({
        variables: author,
        refetchQueries: [{ query: authorsQuery }],
      }),
    }),
  })
);

export default compose(withStyles(styles), withGraphQL);
