/**
 * Simple Menu
 */
import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

export default class SimpleMenu extends React.Component {
	state = {
		anchorEl: null,
		selectedIndex: 1,
	};
	button = undefined;
	handleClickListItem = event => {
		this.setState({ anchorEl: event.currentTarget });
	};
	handleMenuItemClick = (event, index) => {
		this.setState({ selectedIndex: index, anchorEl: null });
	};
	handleClose = () => {
		this.setState({ anchorEl: null });
	};
	handleClick = event => {
		this.setState({ anchorEl: event.currentTarget });
	};
	render() {
		const { anchorEl } = this.state;

		return (
			<div>
				<Button variant="raised" color="primary" className="text-white" aria-owns={anchorEl ? 'simple-menu' : null} aria-haspopup="true" onClick={this.handleClick} >
					Open Menu
        </Button>
				<Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose} >
					<MenuItem onClick={this.handleClose}>Profile</MenuItem>
					<MenuItem onClick={this.handleClose}>My account</MenuItem>
					<MenuItem onClick={this.handleClose}>Logout</MenuItem>
				</Menu>
			</div>
		);
	}
}
