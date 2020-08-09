/**
 * Drag and Drop Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
// async components
import {
	AsyncReactDragulaComponent,
	AsyncReactDndComponent
} from 'Components/AsyncComponent/AsyncComponent';

const DragAndDrop = ({ match }) => (
	<div className="content-wrapper">
		<Helmet>
			<title>Drag And Drop</title>
			<meta name="description" content="Reactify Drag And Drop" />
		</Helmet>
		<Switch>
			<Redirect exact from={`${match.url}/`} to={`${match.url}/react-dragula`} />
			<Route path={`${match.url}/react-dragula`} component={AsyncReactDragulaComponent} />
			<Route path={`${match.url}/react-dnd`} component={AsyncReactDndComponent} />
		</Switch>
	</div>
);

export default DragAndDrop;
