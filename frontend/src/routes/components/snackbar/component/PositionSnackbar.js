/*======= Positioned Snackbar ======*/
import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

class PositionedSnackbar extends React.Component {
  state = {
    open: false,
    vertical: 'top',
    horizontal: 'center',
  };

  handleClick = state => () => {
    this.setState({ open: true, ...state });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { vertical, horizontal, open } = this.state;
    return (
      <div>
			<Button variant="raised" className="mr-15 mb-10 btn-primary text-white" onClick={this.handleClick({ vertical: 'top', horizontal: 'center' })}>
				Top-Center
			</Button>
			 <Button variant="raised" className="mr-15 mb-10 btn-danger text-white" onClick={this.handleClick({ vertical: 'top', horizontal: 'right' })}>
				Top-Right
			</Button>
			 <Button variant="raised" className="mr-15 mb-10 btn-success text-white" onClick={this.handleClick({ vertical: 'bottom', horizontal: 'right' })}>
				Bottom-Right
			</Button>
			 <Button variant="raised" className="mr-15 mb-10 btn-warning text-white" onClick={this.handleClick({ vertical: 'bottom', horizontal: 'center' })}>
				Bottom-Center
			</Button>
			 <Button variant="raised" className="mr-15 mb-10 btn-info text-white" onClick={this.handleClick({ vertical: 'bottom', horizontal: 'left' })}>
				Bottom-Left
			</Button>
			 <Button variant="raised" className="mr-15 mb-10 btn-secondary text-white" onClick={this.handleClick({ vertical: 'top', horizontal: 'left' })}>
				Top-Left
			</Button>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">I love snacks</span>}
        />
      </div>
    );
  }
}

export default PositionedSnackbar;
