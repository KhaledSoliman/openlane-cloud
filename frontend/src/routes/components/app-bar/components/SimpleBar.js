/**
 * Simple Bar App
 */
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const SimpleBar = () => (
  <AppBar position="static" color="default">
    <Toolbar>
      <IconButton color="inherit" aria-label="Menu">
        <MenuIcon />
      </IconButton>
      <h5 className="mb-0">
        Project Name
      </h5>
    </Toolbar>
  </AppBar>
);

export default SimpleBar;
