/**
 * Users Routes
 */
/* eslint-disable */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
	AsyncJobManagementComponent
} from 'Components/AsyncComponent/AsyncComponent';

const Forms = ({ match }) => (
	<div className="content-wrapper">
		<Switch>
			<Route path={`${match.url}/job-management`} component={AsyncJobManagementComponent} />
		</Switch>
	</div>
);

export default Forms;