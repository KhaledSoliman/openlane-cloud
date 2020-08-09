/**
 * Menu
 */
import React from 'react';
import Paper from '@material-ui/core/Paper';

// components
import SimpleMenu from './component/SimpleMenu';
import SelectedMenu from './component/SelectedMenu.js';
import MAxHeightMenu from './component/MaxHeightMenu.js';
import ChangeTransition from './component/ChangeTransition.js';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

export default class MenuComponent extends React.Component {
	render() {
		return (
			<div className="menu-paper-wrapper">
				<PageTitleBar title={<IntlMessages id="sidebar.menu" />} match={this.props.match} />
				<div className="row">
					<RctCollapsibleCard
						colClasses="col-sm-6 col-md-6 col-xl-3"
						heading={<IntlMessages id="widgets.simpleMenus" />}
					>
						<SimpleMenu />
					</RctCollapsibleCard>
					<RctCollapsibleCard
						colClasses="col-sm-6 col-md-6 col-xl-3"
						heading={<IntlMessages id="widgets.selectedMenu" />}
					>
						<SelectedMenu />
					</RctCollapsibleCard>
					<RctCollapsibleCard
						colClasses="col-sm-6 col-md-6 col-xl-3"
						heading={<IntlMessages id="widgets.maxHeightMenu" />}
					>
						<MAxHeightMenu />
					</RctCollapsibleCard>
					<RctCollapsibleCard
						colClasses="col-sm-6 col-md-6 col-xl-3"
						heading={<IntlMessages id="widgets.changeTransition" />}
					>
						<ChangeTransition />
					</RctCollapsibleCard>
				</div>
				<RctCollapsibleCard
					heading={<IntlMessages id="widgets.paper" />}
				>
					<ul className="list-inline d-flex align-items-center justify-content-around flex-wrap">
						<li><Paper elevation={10} className="mb-10 m-10 size-120 bg-primary"></Paper></li>
						<li><Paper elevation={8} className="mb-10 m-10 size-100 bg-success"></Paper></li>
						<li><Paper elevation={6} className="mb-10 m-10 size-80 bg-warning"></Paper></li>
						<li><Paper elevation={4} className="mb-10 m-10 size-60 bg-danger"></Paper></li>
						<li><Paper elevation={2} className="mb-10 m-10 size-40 bg-info"></Paper></li>
					</ul>
				</RctCollapsibleCard>
			</div>
		);
	}
}
