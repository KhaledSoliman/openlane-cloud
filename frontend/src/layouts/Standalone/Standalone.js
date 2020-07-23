import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  content: {
    height: '100%'
  }
}));

const Standalone = props => {
  const { children } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {children}
    </div>
  );
};

Standalone.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Standalone;
