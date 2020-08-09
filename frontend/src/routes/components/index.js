/**
 * Components Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
// async routes
import {
	AsyncUIAlertsComponent,
	AsyncUIAppbarComponent,
	AsyncUIBottomNavigationComponent,
	AsyncUIAvatarsComponent,
	AsyncUIButtonsComponent,
	AsyncUIBadgesComponent,
	AsyncUICardMasonaryComponent,
	AsyncUICardsComponent,
	AsyncUIChipsComponent,
	AsyncUIDialogComponent,
	AsyncUIDividersComponent,
	AsyncUIDrawersComponent,
	AsyncUIExpansionPanelComponent,
	AsyncUIGridListComponent,
	AsyncUIListComponent,
	AsyncUIMenuComponent,
	AsyncUIPopoverComponent,
	AsyncUIProgressComponent,
	AsyncUISnackbarComponent,
	AsyncUISelectionControlsComponent
} from 'Components/AsyncComponent/AsyncComponent';

const Components = ({ match }) => (
	<div className="content-wrapper">
		<Helmet>
			<title>Reactify | UI Components</title>
			<meta name="description" content="Reactify UI Components" />
		</Helmet>
		<Switch>
			<Redirect exact from={`${match.url}/`} to={`${match.url}/alert`} />
			<Route path={`${match.url}/alerts`} component={AsyncUIAlertsComponent} />
			<Route path={`${match.url}/app-bar`} component={AsyncUIAppbarComponent} />
			<Route path={`${match.url}/avatars`} component={AsyncUIAvatarsComponent} />
			<Route path={`${match.url}/buttons`} component={AsyncUIButtonsComponent} />
			<Route path={`${match.url}/bottom-navigations`} component={AsyncUIBottomNavigationComponent} />
			<Route path={`${match.url}/badges`} component={AsyncUIBadgesComponent} />
			<Route path={`${match.url}/cards-masonry`} component={AsyncUICardMasonaryComponent} />
			<Route path={`${match.url}/cards`} component={AsyncUICardsComponent} />
			<Route path={`${match.url}/chip`} component={AsyncUIChipsComponent} />
			<Route path={`${match.url}/dialog`} component={AsyncUIDialogComponent} />
			<Route path={`${match.url}/dividers`} component={AsyncUIDividersComponent} />
			<Route path={`${match.url}/drawers`} component={AsyncUIDrawersComponent} />
			<Route path={`${match.url}/expansion-panel`} component={AsyncUIExpansionPanelComponent} />
			<Route path={`${match.url}/grid-list`} component={AsyncUIGridListComponent} />
			<Route path={`${match.url}/list`} component={AsyncUIListComponent} />
			<Route path={`${match.url}/menu`} component={AsyncUIMenuComponent} />
			<Route path={`${match.url}/popover`} component={AsyncUIPopoverComponent} />
			<Route path={`${match.url}/progress`} component={AsyncUIProgressComponent} />
			<Route path={`${match.url}/snackbar`} component={AsyncUISnackbarComponent} />
			<Route path={`${match.url}/selection-controls`} component={AsyncUISelectionControlsComponent} />
		</Switch>
	</div>
);

export default Components;
