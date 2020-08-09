/*======= Fade Snackbar ======*/
import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';

export default class FadeSnackbar extends React.Component {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div className="d-inline-block">
        <Button variant="raised" color="primary" color="primary" className="text-white mb-10" onClick={this.handleClick}>Open with Fade Transition</Button>
        <Snackbar
          open={this.state.open}
          onClose={this.handleClose}
          message={<span id="message-id">I love snacks</span>}
        />
      </div>
    );
  }
}
