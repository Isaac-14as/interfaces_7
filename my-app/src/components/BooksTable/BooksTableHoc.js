import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { booksQuery } from './queries';

import { styles } from './styles';

export default compose(withStyles(styles), graphql(booksQuery));
