/**
* Grid List
*/
import React from 'react';

// components
import SimpleGrid from './components/SimpleGrid';
import GridWithTitle from './components/GridWithTitle';
import AdvancedGrid from './components/AdvancedGrid';
import SingleLineGrid from './components/SingleLineGrid';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

function GridList(props) {
	return (
		<div className="grid-list-wrapper">
			<PageTitleBar title={<IntlMessages id="sidebar.gridList" />} match={props.match} />
			<div className="row">
				<RctCollapsibleCard
					colClasses="col-sm-12 col-md-12 col-xl-6"
					heading={<IntlMessages id="widgets.imageOnlyGridLists" />}
				>
					<SimpleGrid />
				</RctCollapsibleCard>
				<RctCollapsibleCard
					colClasses="col-sm-12 col-md-12 col-xl-6"
					heading="Grid list with titlebars"
				>
					<GridWithTitle />
				</RctCollapsibleCard>
			</div>
			<RctCollapsibleCard
				heading={<IntlMessages id="widgets.advancedGridLists" />}
			>
				<AdvancedGrid />
			</RctCollapsibleCard>
			<RctCollapsibleCard
				heading={<IntlMessages id="widgets.singleLineGridLists" />}
			>
				<SingleLineGrid />
			</RctCollapsibleCard>
		</div>
	);
}

export default GridList;
