/**
 * Custom Bar With Button
 */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};
function CustomBar(props) {
  const { classes } = props;
  return (
    <AppBar position="static" className="bg-primary">
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography type="title" color="inherit" className={classes.flex}>
          Company Name
        </Typography>
        <div>
          <ul className="ml-auto list-inline navbar-right mb-0">
            <li className="list-inline-item">
              <IconButton className="text-white"><i className="ti-search"></i></IconButton>
            </li>
            <li className="list-inline-item position-relative">
              <IconButton className="text-white">
                <i className="ti-bell"></i>
              </IconButton>
            </li>
            <li className="list-inline-item">
              <IconButton className="text-white"><i className="ti-settings"></i></IconButton>
            </li>
            <UncontrolledDropdown nav className="list-inline-item vr-super">
              <DropdownToggle nav caret className="text-white">
                <span className="mr-10">
                  <img src={require('Assets/img/user-7.jpg')} alt="user profile" className="img-fluid rounded-circle" width="40" height="40" />
                </span>
                Lucile Beck
                </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>My Profile</DropdownItem>
                <DropdownItem>My Contacts</DropdownItem>
                <DropdownItem>Emails</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </ul>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(CustomBar);
