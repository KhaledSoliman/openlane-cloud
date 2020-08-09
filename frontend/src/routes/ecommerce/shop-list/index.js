/**
 * Shop List
 */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { FormGroup, Input } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';

// api
import api from 'Api';

import { getAppLayout } from "Helpers/helpers";

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import { RctCard } from 'Components/RctCard';

class ShopList extends Component {

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
				console.log(error)
			})
	}

	render() {
		const { products } = this.state;
		const { location } = this.props;
		return (
			<div className="Shop-list-wrapper">
				<PageTitleBar title={<IntlMessages id="sidebar.shopList" />} match={this.props.match} />
				<div className="shop-head row mb-20">
					<div className="col-sm-12 col-md-6 col-xl-6 mb-10">
						<form>
							<FormGroup className="has-wrapper mb-0">
								<Input type="search" name="search" id="search-todo" className="has-input-right input-lg-icon" placeholder="Search Product" />
								<span className="has-icon-left"><i className="ti-search"></i></span>
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
										to={`/${getAppLayout(location)}/ecommerce/shop-list`}
									>
										<i className="ti-view-list-alt"></i>
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="shop-listing">
					<ul className="list-unstyled">
						{products && products.map((product, key) => (
							<li key={key}>
								<RctCard>
									<div className="media">
										<div className="media-left mr-50">
											<img src={product.thumbnail} alt="product" className="img-fluid" width="300" height="300" />
										</div>
										<div className="media-body">
											<div className="d-flex justify-content-between">
												<div>
													<h4 className="mb-15">{product.productName}</h4>
												</div>
												<Button
													variant="raised"
													className="btn-info text-white btn-icon"
												>
													<i className="ti-shopping-cart-full"></i> <IntlMessages id="components.addToCart" />
												</Button>
											</div>
											<h2>${product.sellingPrice}<sup className="super">{product.offer}</sup></h2>
											<p>{product.description}</p>
										</div>
									</div>
								</RctCard>
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
}

export default withRouter(ShopList);