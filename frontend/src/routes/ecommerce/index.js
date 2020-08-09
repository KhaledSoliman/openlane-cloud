/**
 * Ecommerce Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
// async components
import {
	AsyncShoplistComponent,
	AsyncShopGridComponent,
	AsyncInvoiceComponent,
	AsyncShopComponent,
	AsyncCartComponent,
	AsyncCheckoutComponent
} from 'Components/AsyncComponent/AsyncComponent';

const Ecommerce = ({ match }) => (
	<div className="content-wrapper">
		<Helmet>
			<title>Ecommerce | Shop</title>
			<meta name="description" content="Reactify Ecommerce Shop" />
		</Helmet>
		<Switch>
			<Redirect exact from={`${match.url}/`} to={`${match.url}/shop-list`} />
			<Route path={`${match.url}/shop-list`} component={AsyncShoplistComponent} />
			<Route path={`${match.url}/shop-grid`} component={AsyncShopGridComponent} />
			<Route path={`${match.url}/invoice`} component={AsyncInvoiceComponent} />
			<Route path={`${match.url}/shop`} component={AsyncShopComponent} />
			<Route path={`${match.url}/cart`} component={AsyncCartComponent} />
			<Route path={`${match.url}/checkout`} component={AsyncCheckoutComponent} />
		</Switch>
	</div>
);

export default Ecommerce;
