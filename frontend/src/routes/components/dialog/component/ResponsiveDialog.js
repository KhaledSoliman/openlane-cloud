/**
 * Responsive Dialog
 */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

export default class ResponsiveDialog extends React.Component {

	state = {
		open: false,
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { fullScreen } = this.props;
		return (
			<div>
				<Button variant="raised" className="btn-secondary text-white btn-block" onClick={this.handleClickOpen}>Open responsive dialog</Button>
				<Dialog
					fullScreen={fullScreen}
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="responsive-dialog-title"
				>
					<DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button variant="raised" onClick={this.handleClose} className="btn-secondary text-white">
							Disagree
            		</Button>
						<Button variant="raised" onClick={this.handleClose} color="primary" className="text-white" autoFocus>
							Agree
            		</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}
withMobileDialog();
