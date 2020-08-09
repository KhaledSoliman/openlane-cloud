/**
 * Progress
 */
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green, red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

//Component
import LinearBuffer from './components/LinearBuffer';
import LinearQuery from './components/LinearQuery';
import LinearDeterminate from './components/LinearDeterminate';
import LinearIndeterminate from './components/LinearIndeterminate';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class ProgressBar extends React.Component {
  state = {
    loading: false,
    success: false,
  };
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  handleButtonClick = () => {
    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          loading: true,
        },
        () => {
          this.timer = setTimeout(() => {
            this.setState({
              loading: false,
              success: true,
            });
          }, 2000);
        },
      );
    }
  };
  timer = undefined;

  render() {
    const { loading, success } = this.state;
    const { classes } = this.props;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: success,
    });

    return (
      <div className="progress-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.progress" />} match={this.props.match} />
        <div className="row">
          <RctCollapsibleCard
            colClasses="col-sm-12 col-md-12 col-xl-4 d-sm-full"
            heading={<IntlMessages id="widgets.circularProgressBottomStart" />}
          >
            <CircularProgress className="w-10 mr-30 mb-10 progress-primary" thickness={2} />
            <CircularProgress className="mr-30 mb-10 progress-success" size={70} />
            <CircularProgress className="w-10 mr-30 mb-10 text-pink" thickness={5} />
            <CircularProgress className="w-10 mr-30 mb-10" style={{ color: red[600] }} thickness={7} />
          </RctCollapsibleCard>
          <RctCollapsibleCard
            colClasses="col-sm-12 col-md-12 col-xl-4 d-sm-full"
            heading={<IntlMessages id="widgets.interactiveIntegration" />}
          >
            <div className={classes.root}>
              <div className={classes.wrapper}>
                <Button variant="fab" color="secondary" className={buttonClassname} onClick={this.handleButtonClick}>
                  {success ? <CheckIcon /> : <SaveIcon />}
                </Button> {loading && <CircularProgress size={68} className={classes.fabProgress} />}
              </div>
              <div className={classes.wrapper}>
                <Button variant="raised" color="secondary" className={buttonClassname} disabled={loading} onClick={this.handleButtonClick} >
                  Accept terms
                      </Button> {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
            </div>
          </RctCollapsibleCard>
          <RctCollapsibleCard
            colClasses="col-sm-12 col-md-12 col-xl-4 d-sm-full"
            heading={<IntlMessages id="widgets.determinate" />}
          >
            <CircularProgress className="progress-primary mr-30 mb-10" size={60} mode="determinate" value={75} />
            <CircularProgress className="progress-danger mr-30 mb-10" size={70} mode="determinate" value={35} min={0} max={50} />
            <CircularProgress className="progress-success mr-30 mb-10" size={60} mode="determinate" value={75} />
            <CircularProgress className="progress-warning mr-30 mb-10" size={70} mode="determinate" value={40} min={0} max={50} />
          </RctCollapsibleCard>
        </div>
        <div className="sub-title">
          <h4><IntlMessages id="widgets.linearProgressLineBar" /> </h4>
        </div>
        <div className="row">
          <RctCollapsibleCard
            colClasses="col-xs-12 col-sm-12 col-md-6"
            heading={<IntlMessages id="widgets.indeterminate" />}
          >
            <LinearIndeterminate />
          </RctCollapsibleCard>
          <RctCollapsibleCard
            colClasses="col-xs-12 col-sm-12 col-md-6"
            heading={<IntlMessages id="widgets.determinate" />}
          >
            <LinearDeterminate />
          </RctCollapsibleCard>
          <RctCollapsibleCard
            colClasses="col-xs-12 col-sm-12 col-md-6"
            heading={<IntlMessages id="widgets.buffer" />}
          >
            <LinearBuffer />
          </RctCollapsibleCard>
          <RctCollapsibleCard
            colClasses="col-xs-12 col-sm-12 col-md-6"
            heading={<IntlMessages id="widgets.query" />}
          >
            <LinearQuery />
          </RctCollapsibleCard>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ProgressBar);
