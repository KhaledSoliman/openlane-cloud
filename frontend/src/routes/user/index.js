/**
 * Users Routes
 */
/* eslint-disable */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
    AsyncUserSettingsComponent
} from 'Components/AsyncComponent/AsyncComponent';

const Forms = ({ match }) => (
    <div className="content-wrapper">
        <Switch>
            <Route path={`${match.url}/user-settings`} component={AsyncUserSettingsComponent} />
        </Switch>
    </div>
);

export default Forms;
