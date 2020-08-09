/**
 * Snackbar
 */
import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';

//Componets
import PositionedSnackbar from './component/PositionSnackbar';
import DirectionSnackbar from './component/DirectionSnackbar';
import FadeSnackbar from './component/FadeSnackbar';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

export default class SnackbarComponent extends React.Component {
	// Simple Snackbar
	state = {
		open: false,
	};

	handleClick = () => {
		this.setState({ open: true });
	};

	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		this.setState({ open: false });
	};

	render() {
		return (
			<div className="snackbar-wrapper">
				<PageTitleBar title={<IntlMessages id="sidebar.snackbar" />} match={this.props.match} />
				<div className="row">
					<RctCollapsibleCard
						colClasses="col-sm-12 col-md-12 col-xl-6"
						heading={<IntlMessages id="widgets.transitionControlDirection" />}
					>
						<DirectionSnackbar />
					</RctCollapsibleCard>
					<RctCollapsibleCard
						colClasses="col-sm-12 col-md-12 col-xl-6"
						heading={<IntlMessages id="widgets.simpleSnackbar" />}
					>
						<Button variant="raised" color="primary" className="text-white mr-10 mb-10 d-inline-block" onClick={this.handleClick}>simple snackbar</Button>
						<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
							open={this.state.open}
							autoHideDuration={6000}
							onClose={this.handleClose}
							message={<span id="message-id">Note archived</span>}
							action={[
								<Button variant="raised" key="undo" className="btn-danger btn-sm text-white" dense="true" onClick={this.handleClose}> UNDO </Button>,
								<IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleClose} >
									<i className="zmdi zmdi-close"></i>
								</IconButton>,
							]}
						/>
						<FadeSnackbar />
					</RctCollapsibleCard>
				</div>
				<RctCollapsibleCard
					heading={<IntlMessages id="widgets.positionedSnackbar" />}
				>
					<PositionedSnackbar />
				</RctCollapsibleCard>
				<RctCollapsibleCard
					heading={<IntlMessages id="widgets.contexualColoredSnackbars" />}
				>
					<div className="row">
						<div className="col-sm-12 col-md-12 col-xl-6">
							<SnackbarContent className="bg-primary mb-15" message="I Love Reactify Admin Theme." />
							<SnackbarContent className="bg-success mb-15" message="I Love Reactify Admin Theme." />
							<SnackbarContent className="bg-danger mb-15" message="I Love Reactify Admin Theme." />
						</div>
						<div className="col-sm-12 col-md-12 col-xl-6">
							<SnackbarContent className="bg-warning mb-15" message="I Love Reactify Admin Theme." />
							<SnackbarContent className="bg-secondary mb-15" message="I Love Reactify Admin Theme." />
							<SnackbarContent className="bg-info mb-15" message="I Love Reactify Admin Theme." />
						</div>
					</div>
				</RctCollapsibleCard>
			</div>
		);
	}
}
