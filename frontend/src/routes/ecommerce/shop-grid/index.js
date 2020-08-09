/**
 * Shop Grid
 */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { FormGroup, Input } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

// helpers
import { getAppLayout } from "Helpers/helpers";

// api
import api from 'Api';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

import { RctCard, RctCardContent } from 'Components/RctCard/index';

class ShopGrid extends Component {

	state = {
		products: null
	}

	componentDidMount() {
		this.getProducts();
	}

	// get products
	getProducts() {
		api.get('products.js')
			.then((response) => {
				this.setState({ products: response.data });
			})
			.catch(error => {
				// error handling
			})
	}

	render() {
		const { match, location } = this.props;
		const { products } = this.state;
		return (
			<div className="Shop-grid-wrapper">
				<PageTitleBar title={<IntlMessages id="sidebar.shopGrid" />} match={match} />
				<div className="shop-head row mb-20">
					<div className="col-sm-12 col-md-6 col-xl-6 mb-10">
						<form>
							<FormGroup className="has-wrapper mb-0">
								<Input type="search" name="search" id="search-todo" className="has-input-right input-lg-icon pl-15" placeholder="Search Product" />
								<i className="zmdi zmdi-search search-icon"></i>
							</FormGroup>
						</form>
					</div>
					<div className="col-sm-12 col-md-3 col-xl-3 mb-10">
						<div className="app-selectbox">
							<FormGroup className="mb-0">
								<Input type="select" name="select" id="exampleSelect">
									<option>Filter: Popularity</option>
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</Input>
							</FormGroup>
						</div>
					</div>
					<div className="col-sm-12 col-md-3 col-xl-3 mb-10">
						<div className="rct-filter">
							<ul className="list-inline mb-0">
								<li className="list-inline-item">
									<Link
										to={`/${getAppLayout(location)}/ecommerce/shop-grid`}
									>
										<i className="ti-layout-grid2"></i>
									</Link>
								</li>
								<li className="list-inline-item">
									<Link
										to={`/${getAppLayout(location)}/ecommerce/shop-list`}>
										<i className="ti-view-list-alt"></i>
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="shop-grid">
					<div className="row">
						{products && products.map((product, key) => (
							<div className="col-sm-6 col-md-4 col-xl-3" key={key}>
								<RctCard>
									<RctCardContent>
										<div className="product-image mb-20">
											<img src={product.thumbnail} alt="product" className="img-fluid" width="300" height="300" />
										</div>
										<div className="rpoduct-detail">
											<h4 className="mb-15">{product.productName}</h4>
											<h2>${product.sellingPrice}<sup className="super">{product.offer}</sup></h2>
											<p>{product.description}</p>
											<Button
												variant="raised"
												className="btn-info text-white btn-icon"
											>
												<i className="ti-shopping-cart-full"></i> <IntlMessages id="components.addToCart" />
											</Button>
										</div>
									</RctCardContent>
								</RctCard>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(ShopGrid);