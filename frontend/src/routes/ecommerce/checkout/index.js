/**
 * Checkout Page
 */
import React, { Component } from 'react';

//Components
import CheckoutForm from './components/CheckoutForm';
import CheckoutItem from './components/CheckoutItem';

// Card Component
import { RctCard, RctCardContent } from 'Components/RctCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

class Checkout extends Component {
	render() {
		const { match } = this.props;
		return (
			<div className="checkout-wrap">
				<PageTitleBar title={<IntlMessages id="sidebar.checkout" />} match={match} />
				<RctCard customClasses="overflow-hidden">
					<RctCardContent noPadding>
						<div className="row no-gutters">
							<div className="col-lg-8 col-md-6 col-sm-12">
								<CheckoutForm />
							</div>
							<div className="col-lg-4 col-md-6 col-sm-12">
								<CheckoutItem />
							</div>
						</div>
					</RctCardContent>
				</RctCard>
			</div>
		)
	}
}
export default Checkout;