/**
 * Avatar
 */
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

export default class AvatarsComponent extends Component {
	render() {
		return (
			<div className="avatar-wrapper">
				<PageTitleBar title={<IntlMessages id="sidebar.avatars" />} match={this.props.match} />
				<div className="row">
					<RctCollapsibleCard
						colClasses="col-sm-12 col-md-12 col-xl-6"
						heading={<IntlMessages id="widgets.imageAvatars" />}
					>
						<ul className="list-inline d-flex align-items-center justify-content-around flex-wrap">
							<li className="list-inline-item">
								<Avatar alt="user 1" src={require('Assets/img/user-5.jpg')} className="size-120 rounded-circle border-primary rct-notify" />
							</li>
							<li className="list-inline-item">
								<Avatar alt="user 2" src={require('Assets/img/user-2.jpg')} className="size-100 rounded-circle border-success rct-notify" />
							</li>
							<li className="list-inline-item">
								<Avatar alt="user 3" src={require('Assets/img/user-3.jpg')} className="size-80 rounded-circle border-warning rct-notify" />
							</li>
							<li className="list-inline-item">
								<Avatar alt="user 4" src={require('Assets/img/user-4.jpg')} className="size-60 rounded-circle border-danger rct-notify" />
							</li>
							<li className="list-inline-item">
								<Avatar alt="user 4" src={require('Assets/img/user-1.jpg')} className="rounded-circle border-info rct-notify" />
							</li>
						</ul>
					</RctCollapsibleCard>
					<RctCollapsibleCard
						colClasses="col-sm-12 col-md-12 col-xl-6"
						heading={<IntlMessages id="widgets.lettersAvatars" />}
					>
						<ul className="list-inline d-flex align-items-center justify-content-around flex-wrap">
							<li className="list-inline-item"><Avatar className="size-120 bg-primary rounded-circle">RS</Avatar></li>
							<li className="list-inline-item"><Avatar className="size-100 bg-success rounded-circle">VP</Avatar></li>
							<li className="list-inline-item"><Avatar className="size-80 bg-warning rounded-circle">TS</Avatar></li>
							<li className="list-inline-item"><Avatar className="size-60 bg-info rounded-circle">SK</Avatar></li>
							<li className="list-inline-item"><Avatar className="bg-danger rounded-circle">R</Avatar></li>
						</ul>
					</RctCollapsibleCard>
				</div>
				<RctCollapsibleCard
					heading={<IntlMessages id="widgets.iconsAvatars" />}
				>
					<ul className="list-inline d-flex align-items-center justify-content-around flex-wrap">
						<li className="list-inline-item"><Avatar className="size-120 bg-primary"><i className="zmdi zmdi-label zmdi-hc-lg"></i></Avatar></li>
						<li className="list-inline-item"><Avatar className="size-100 bg-success"><i className="zmdi zmdi-library zmdi-hc-lg"></i></Avatar></li>
						<li className="list-inline-item"><Avatar className="size-80 bg-warning"><i className="zmdi zmdi-lock zmdi-hc-lg"></i></Avatar></li>
						<li className="list-inline-item"><Avatar className="size-60 bg-info"><i className="zmdi zmdi-account-circle zmdi-hc-lg"></i></Avatar></li>
						<li className="list-inline-item"><Avatar className="bg-danger"><i className="zmdi zmdi-cloud-download zmdi-hc-lg"></i></Avatar></li>
						<li className="list-inline-item"><Avatar className="bg-secondary"><i className="zmdi zmdi-star zmdi-hc-lg"></i></Avatar></li>
						<li className="list-inline-item"><Avatar className="size-60 bg-success"><i className="zmdi zmdi-alarm zmdi-hc-lg"></i></Avatar></li>
						<li className="list-inline-item"><Avatar className="size-80 bg-info"><i className="zmdi zmdi-favorite zmdi-hc-lg"></i></Avatar></li>
						<li className="list-inline-item"><Avatar className="size-100 bg-danger"><i className="zmdi zmdi-attachment zmdi-hc-lg"></i></Avatar></li>
						<li className="list-inline-item"><Avatar className="size-120 bg-orange"><i className="zmdi zmdi-flag zmdi-hc-lg"></i></Avatar></li>
					</ul>
				</RctCollapsibleCard>
			</div>
		);
	}
}
