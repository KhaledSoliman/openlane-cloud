/**
 * Dividers
 */
import React from 'react';

// Components
import ListDivider from './components/ListDivider';
import Insetdivider from './components/InsetDivider';
import UserListDivider from './components/UserListDivider';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

function DividersComponent(props) {
	return (
		<div className="divider-wrapper">
			<PageTitleBar title={<IntlMessages id="sidebar.dividers" />} match={props.match} />
			<div className="row">
				<RctCollapsibleCard
					heading={<IntlMessages id="widgets.listDividers" />}
					colClasses="col-sm-6 col-md-6 col-xl-4"
					fullBlock
				>
					<ListDivider />
				</RctCollapsibleCard>
				<RctCollapsibleCard
					colClasses="col-sm-6 col-md-6 col-xl-4"
					heading={<IntlMessages id="widgets.insetDividers" />}
					fullBlock
				>
					<Insetdivider />
				</RctCollapsibleCard>
				<RctCollapsibleCard
					heading={<IntlMessages id="widgets.listDividers" />}
					colClasses="col-sm-12 col-md-12 col-xl-4"
					fullBlock
				>
					<UserListDivider />
				</RctCollapsibleCard>
			</div>
		</div>
	);
}

export default DividersComponent;
