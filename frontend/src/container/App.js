/**
 * App.js Layout Start Here
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import {NotificationContainer} from 'react-notifications';

// rct theme provider
import RctThemeProvider from './RctThemeProvider';


//Main App
import RctDefaultLayout from './DefaultLayout';


// app signin
import AppSignIn from './SigninFirebase';
import AppSignUp from './SignupFirebase';

// async components
import {
    AsyncSessionLoginComponent,
    AsyncSessionRegisterComponent,
    AsyncSessionLockScreenComponent,
    AsyncSessionForgotPasswordComponent,
    AsyncSessionPage404Component,
    AsyncSessionPage500Component,
    AsyncTermsConditionComponent
} from 'Components/AsyncComponent/AsyncComponent';


// callback component
import Callback from "Components/Callback/Callback";

/**
 * Initial Path To Check Whether User Is Logged In Or Not
 */
const InitialPath = ({component: Component, authUser, ...rest}) =>
    <Route
        {...rest}
        render={props =>
            authUser
                ? <Component {...props} />
                : <Redirect
                    to={{
                        pathname: '/signin',
                        state: {from: props.location}
                    }}
                />}
    />;

const AuthRoute = ({component: Component, authUser, ...rest}) =>
    <Route
        {...rest}
        render={props =>
            !authUser
                ? <Component {...props} />
                : <Redirect
                    to={{
                        pathname: '/app/getting-started',
                        state: {from: props.location}
                    }}
                />}
    />;

class App extends Component {
    render() {
        const {location, match, user} = this.props;
        if (location.pathname === '/') {
            if (user === null) {
                return (<Redirect to={'/signin'}/>);
            } else {
                return (<Redirect to={'/app/getting-started'}/>);
            }
        }
        return (
            <RctThemeProvider>
                <NotificationContainer/>
                <InitialPath
                    path={`${match.url}app`}
                    authUser={user}
                    component={RctDefaultLayout}
                />
                <AuthRoute path="/signin" authUser={user} component={AppSignIn}/>
                <AuthRoute path="/signup" authUser={user} component={AppSignUp}/>
                <Route path="/session/lock-screen" component={AsyncSessionLockScreenComponent}/>
                <Route
                    path="/session/forgot-password"
                    component={AsyncSessionForgotPasswordComponent}
                />
                <Route path="/session/404" component={AsyncSessionPage404Component}/>
                <Route path="/session/500" component={AsyncSessionPage500Component}/>
                <Route path="/terms-condition" component={AsyncTermsConditionComponent}/>
                <Route path="/callback" render={(props) => {
                    handleAuthentication(props);
                    return <Callback {...props} />
                }}/>
            </RctThemeProvider>
        );
    }
}

// map state to props
const mapStateToProps = ({authUser}) => {
    const {user} = authUser;
    return {user};
};

export default connect(mapStateToProps)(App);
