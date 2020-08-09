/**
 * Full Screen Dialog
 */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

export default class FullScreenDialog extends React.Component {
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
				<Button variant="raised" className="btn-danger text-white btn-block" onClick={this.handleClickOpen}>Open full-screen dialog</Button>
				<Dialog fullScreen
					open={this.state.open}
					onClose={this.handleClose}
					TransitionComponent={Transition}>
					<AppBar className="bg-primary">
						<Toolbar>
							<IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
								<CloseIcon />
							</IconButton>
							<h5 className="w-100 mb-0">Sound</h5>
							<Button color="inherit" onClick={this.handleClose}>save</Button>
						</Toolbar>
					</AppBar>
					<List>
						<ListItem button>
							<ListItemText primary="Phone ringtone" secondary="Titania" />
						</ListItem>
						<Divider />
						<ListItem button>
							<ListItemText primary="Default notification ringtone" secondary="Tethys" />
						</ListItem>
					</List>
				</Dialog>
			</div>
		);
	}
}
