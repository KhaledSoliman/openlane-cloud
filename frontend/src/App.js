/**
 * Main App
 */
import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// css
import './lib/reactifyCss';

// firebase
import './firebase';

// app component
import App from './container/App';

import {configureStore} from './store';

const MainApp = () => (
    <Provider store={configureStore()}>
        <Router>
            <Switch>
                <Route path="/" component={App}/>
            </Switch>
        </Router>
    </Provider>
);

export default MainApp;
