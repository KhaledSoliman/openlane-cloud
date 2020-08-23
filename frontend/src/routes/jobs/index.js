/**
 * Users Routes
 */
/* eslint-disable */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
	AsyncJobManagementComponent,
	AsyncJobDetailsComponent,
	AsyncJobMonitoringComponent
} from 'Components/AsyncComponent/AsyncComponent';

const Forms = ({ match }) => (
	<div className="content-wrapper">
		<Switch>
			<Route path={`${match.url}/job-management/:jobId`} component={AsyncJobDetailsComponent}/>
			<Route path={`${match.url}/job-management`} component={AsyncJobManagementComponent} />
			<Route path={`${match.url}/job-monitoring`} component={AsyncJobMonitoringComponent} />
		</Switch>
	</div>
);

export default Forms;