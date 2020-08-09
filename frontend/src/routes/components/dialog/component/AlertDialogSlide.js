/**
 * Animated Dialog
 */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

export default class AlertDialogSlide extends React.Component {

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
		return (
			<div>
				<Button variant="raised" onClick={this.handleClickOpen} className="btn-warning text-white btn-block">Slide in alert dialog</Button>
				<Dialog
					open={this.state.open}
					TransitionComponent={Transition}
					keepMounted
					onClose={this.handleClose}
					aria-labelledby="alert-dialog-slide-title"
					aria-describedby="alert-dialog-slide-description"
				>
					<DialogTitle id="alert-dialog-slide-title">
						{"Use Google's location service?"}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-slide-description">
							Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
            		</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button variant="raised" onClick={this.handleClose} className="btn-danger text-white mr-10">Disagree</Button>
						<Button variant="raised" onClick={this.handleClose} className="btn-success text-white mr-10">Agree</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}
