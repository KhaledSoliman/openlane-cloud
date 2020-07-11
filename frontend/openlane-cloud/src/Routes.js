import React from 'react';
import {Switch, Redirect} from 'react-router-dom';

import {RouteWithLayout} from './components';
import {Main as MainLayout, Minimal as MinimalLayout, Standalone as SALayout} from './layouts';

import {
    Dashboard as DashboardView,
    ProductList as ProductListView,
    UserList as UserListView,
    Typography as TypographyView,
    Icons as IconsView,
    Account as AccountView,
    Settings as SettingsView,
    Home as HomeView,
    JobSubmission as JobSubmissionView,
    Jobs as JobsView,
    NotFound as NotFoundView
} from './views';

const Routes = () => {
    return (
        <Switch>
            {/*<Redirect*/}
            {/*  exact*/}
            {/*  from="/"*/}
            {/*  to="/"*/}
            {/*/>*/}
            <RouteWithLayout
                component={HomeView}
                exact
                layout={SALayout}
                path="/"
            />

            <RouteWithLayout
                component={DashboardView}
                exact
                layout={MainLayout}
                path="/dashboard"
            />
            <RouteWithLayout
                component={UserListView}
                exact
                layout={MainLayout}
                path="/users"
            />
            <RouteWithLayout
                component={ProductListView}
                exact
                layout={MainLayout}
                path="/products"
            />
            <RouteWithLayout
                component={JobSubmissionView}
                exact
                layout={MainLayout}
                path="/submission"
            />
            <RouteWithLayout
                component={JobsView}
                exact
                layout={MainLayout}
                path="/jobs"
            />
            <RouteWithLayout
                component={TypographyView}
                exact
                layout={MainLayout}
                path="/typography"
            />
            <RouteWithLayout
                component={IconsView}
                exact
                layout={MainLayout}
                path="/icons"
            />
            <RouteWithLayout
                component={AccountView}
                exact
                layout={MainLayout}
                path="/account"
            />
            <RouteWithLayout
                component={SettingsView}
                exact
                layout={MainLayout}
                path="/settings"
            />
            <RouteWithLayout
                component={NotFoundView}
                exact
                layout={MinimalLayout}
                path="/not-found"
            />
            <Redirect to="/not-found"/>
        </Switch>
    );
};

export default Routes;
