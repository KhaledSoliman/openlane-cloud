/**
 * Icons Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
// async themify icons
import {
	AsyncThemifyIconsComponent,
	AsyncSimpleLineIconsComponent,
	AsyncMaterialIconsComponent
} from 'Components/AsyncComponent/AsyncComponent';

const Icons = ({ match }) => (
	<div className="content-wrapper">
		<Helmet>
			<title>Reactify | Icons</title>
			<meta name="description" content="Reactify Maps" />
		</Helmet>
		<Switch>
			<Redirect exact from={`${match.url}/`} to={`${match.url}/themify-icons`} />
			<Route path={`${match.url}/themify-icons`} component={AsyncThemifyIconsComponent} />
			<Route path={`${match.url}/simple-lineIcons`} component={AsyncSimpleLineIconsComponent} />
			<Route path={`${match.url}/material-icons`} component={AsyncMaterialIconsComponent} />
		</Switch>
	</div>
);

export default Icons;
