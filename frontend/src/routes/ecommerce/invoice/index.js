/**
 * Invoice
 */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card
import { RctCard } from 'Components/RctCard/index';

export default class Invoice extends Component {

	state = {
		products: [
			{
				id: 1,
				qty: 1,
				name: 'iPhone 5 32GB White & Silver (GSM) Unlocked',
				price: 749,
				total: 749
			},
			{
				id: 2,
				qty: 1,
				name: 'iPhone 5 32GB White & Silver (GSM) Unlocked',
				price: 749,
				total: 749
			},
			{
				id: 3,
				qty: 1,
				name: 'iPhone 5 32GB White & Silver (GSM) Unlocked',
				price: 749,
				total: 749
			},
			{
				id: 4,
				qty: 1,
				name: 'iPhone 5 32GB White & Silver (GSM) Unlocked',
				price: 749,
				total: 749
			}
		]
	}

	render() {
		return (
			<div className="invoice-wrapper">
				<PageTitleBar title={<IntlMessages id="sidebar.invoice" />} match={this.props.match} />
				<div className="row">
					<div className="col-sm-12 col-md-12 col-xl-10 mx-auto">
						<RctCard>
							<div className="invoice-head text-right">
								<ul className="list-inline">
									<li><a href="javascript:void(0);"><i className="mr-10 ti-email"></i> Email</a></li>
									<li><a href="javascript:void(0);"><i className="mr-10 ti-printer"></i> Print</a></li>
								</ul>
							</div>
							<div className="p-50">
								<div className="d-flex justify-content-between mb-50">
									<div className="sender-address">
										<div className="invoice-logo mb-30">
											<img src={require('Assets/img/invoice-logo.png')} alt="session-logo" className="img-fluid" width="140" height="37" />
										</div>
										<div className="address">
											<span>1 Infinite Loop</span>
											<span>95014 Cuperino, CA</span>
											<span>United States</span>
										</div>
										<div className="address">
											<span>Telephone: 800-692-7753</span>
											<span>Fax: 800-692-7753</span>
										</div>
									</div>
									<div className="invoice-address text-right">
										<span>Invoice: #9048392</span>
										<span>7th Jun 2015</span>
									</div>
								</div>
								<div className="d-flex justify-content-between mb-30 add-full-card">
									<div className="add-card">
										<h4 className="mb-15">To</h4>
										<span className="name">Jack Perez</span>
										<span>2nd Floor</span>
										<span>St John Street, Aberdeenshire 2541</span>
										<span>United Kingdom</span>
										<span>Phone: 031-432-678</span>
										<span>Email: youemail@gmail.com</span>
									</div>
									<div className="add-card">
										<h4 className="mb-15">Ship To</h4>
										<span className="name">Jack Perez</span>
										<span>2nd Floor</span>
										<span>St John Street, Aberdeenshire 2541</span>
										<span>United Kingdom</span>
										<span>Phone: 031-432-678</span>
										<span>Email: youemail@gmail.com</span>
									</div>
								</div>
								<div className="order-status mb-30">
									<span>Order Date: Jun 15, 2016</span>
									<span>Order Status: Pending</span>
									<span>Order ID: #123456</span>
								</div>
								<div className="table-responsive mb-40">
									<table className="table table-borderless">
										<thead>
											<tr>
												<th>Qty</th>
												<th>Description</th>
												<th>Unit Price</th>
												<th>Total</th>
											</tr>
										</thead>
										<tbody>
											{this.state.products.map((product, key) => (
												<tr key={key}>
													<td>{product.qty}</td>
													<td>{product.name}</td>
													<td>${product.price.toFixed(2)}</td>
													<td>${product.total.toFixed(2)}</td>
												</tr>
											))}
											<tr>
												<td>&nbsp;</td>
												<td>&nbsp;</td>
												<td className="fw-bold">Subtotal</td>
												<td>$1607.00</td>
											</tr>
											<tr>
												<td>&nbsp;</td>
												<td>&nbsp;</td>
												<td className="fw-bold">Shipping</td>
												<td>$0.00</td>
											</tr>
											<tr>
												<td>&nbsp;</td>
												<td>&nbsp;</td>
												<td className="fw-bold">Total</td>
												<td>$1607.00</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className="note-wrapper row">
									<div className="invoice-note col-sm-12 col-md-8">
										<h2 className="invoice-title">Note</h2>
										<p className="fs-14">Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles, weebly ning heekya handango imeem plugg dopplr jibjab, movity jajah plickers sifteo edmodo ifttt zimbra.</p>
									</div>
									<div className="totle-amount col-sm-12 col-md-4 text-right">
										<h2 className="invoice-title">USD 2930.00</h2>
										<Button variant="raised" className="btn-success text-white btn-icon"><i className="ti-wallet mr-10"></i> <IntlMessages id="components.payNow" /></Button>
									</div>
								</div>
							</div>
						</RctCard>
					</div>
				</div>
			</div>
		);
	}
}
