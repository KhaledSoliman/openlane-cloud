/**
 * Maps Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
// async components
import {
	AsyncGooleMapsComponent,
	AsyncLeafletMapComponent
} from 'Components/AsyncComponent/AsyncComponent';

const Maps = ({ match }) => (
	<div className="content-wrapper">
		<Helmet>
			<title>Reactify | Maps</title>
			<meta name="description" content="Reactify Maps" />
		</Helmet>
		<Switch>
			<Redirect exact from={`${match.url}/`} to={`${match.url}/google-maps`} />
			<Route path={`${match.url}/google-maps`} component={AsyncGooleMapsComponent} />
			<Route path={`${match.url}/leaflet-maps`} component={AsyncLeafletMapComponent} />
		</Switch>
	</div>
);

export default Maps;
