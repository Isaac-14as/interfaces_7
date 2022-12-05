import React from 'react';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import AuthorsTable from '../AuthorsTable/AuthorsTable';
import AuthorsForm from '../AuthorsForm/AuthorsForm';

import withHocs from './AuthorsHoc';

class Authors extends React.Component {
  state = {
    open: false,
    name: '',
    date_of_birth: '',
  }

  handleClickOpen = (data) => {
    this.setState({
      open: true,
      ...data,
    });
  };

  handleClose = () => { this.setState({ name: '', date_of_birth: '', id: null, open: false }); };

  handleChange = name => ({ target }) => { this.setState({ [name]: target.value }); };

  render() {
    const { name, date_of_birth, id, open } = this.state;
    const { classes } = this.props;

    return (
      <>
        <AuthorsForm handleChange={this.handleChange} selectedValue={{ name, date_of_birth, id }} open={open} onClose={this.handleClose} />
        <div className={classes.wrapper}>
          <AuthorsTable onOpen={this.handleClickOpen} onClose={this.handleClose} />
          <Fab onClick={() => this.handleClickOpen(null)} color="primary" aria-label="Add" className={classes.fab}>
            <AddIcon />
          </Fab>
        </div>
      </>
    );
  }
};

export default withHocs(Authors);
