import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  FormControlLabel,
  Checkbox,
  Typography,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  card: {
    width: 600,
  },
  item: {
    display: 'flex',
    flexDirection: 'column'
  },
  submit: {
    color: 'black',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none'
    },
  },
}));

const Notifications = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      className={classes.card}
    >
      <form>
        <CardHeader
          subheader="Manage your notifications"
          title="Notifications Settings"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={10}
            wrap="wrap"
          >
            <Grid
              className={classes.item}
              item
              xs
            >
              <Typography
                gutterBottom
                variant="subtitle1"
              >
                Notifications
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked //
                  />
                }
                label="Email"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked //
                  />
                }
                label="Push Notifications"
              />
            </Grid>
            <Grid
              className={classes.item}
              item
              xs
            >
              <Typography
                gutterBottom
                variant="subtitle1"
              >
                Newsletter
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked //
                  />
                }
                label="Email"
              />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Push Notifications"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            className={classes.submit}
          >
            Save
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Notifications.propTypes = {
  className: PropTypes.string
};

export default Notifications;
