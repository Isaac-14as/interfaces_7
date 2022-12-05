import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import BooksTable from '../BooksTable/BooksTable';
import BooksForm from '../BooksForm/BooksForm';

import withHocs from './BooksHoc';

class Books extends React.Component {
  state = {
    open: false,
    name: '',
    genre: '',
    authorId: '',
  }

  handleClickOpen = (data = {}) => {
    this.setState({
      open: true,
      ...data,
      authorId: data.author ? data.author.id : '',
    });
  };

  handleClose = () => {
    this.setState({
      name: '',
      genre: '',
      authorId: '',
      open: false
    });
  };

  handleSelectChange = ({ target }) => { this.setState({ [target.name]: target.value }); };
  handleCheckboxChange = name => ({ target }) => { this.setState({ [name]: target.checked }); };
  handleChange = name => ({ target }) => { this.setState({ [name]: target.value }); };

  render() {
    const { id, name, genre, authorId, open } = this.state;
    const { classes } = this.props;

    return (
      <>
        <BooksForm handleChange={this.handleChange} handleSelectChange={this.handleSelectChange} handleCheckboxChange={this.handleCheckboxChange} selectedValue={{ id, name, genre, authorId }} open={open} onClose={this.handleClose} />
        <div className={classes.wrapper}>
          <BooksTable onOpen={this.handleClickOpen} onClose={this.handleClose} />
          <Fab onClick={() => this.handleClickOpen()} color="primary" aria-label="Add" className={classes.fab}>
            <AddIcon />
          </Fab>
        </div>
      </>
    );
  }
};

export default withHocs(Books)
