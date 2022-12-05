import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import BookCreationIcon from '@material-ui/icons/MovieCreation';
import CameraIcon from '@material-ui/icons/Camera';

import Books from '../Books/Books';
import Authors from '../Authors/Authors';

import withHocs from './TabsHoc';

const TabContainer = ({ children, dir }) => (
  <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
    {children}
  </Typography>
);

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => { this.setState({ value }); };
  handleChangeIndex = index => { this.setState({ value: index }); };

  render() {
    const { classes, theme } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs variant='fullWidth' value={value} onChange={this.handleChange}>
            <Tab label="Books"/>
            <Tab label="Authors" />
          </Tabs>
        </AppBar>
        <SwipeableViews axis={theme.authors === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={this.handleChangeIndex} >
          <TabContainer dir={theme.authors}><Books /></TabContainer>
          <TabContainer dir={theme.authors}><Authors /></TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

export default withHocs(SimpleTabs);
