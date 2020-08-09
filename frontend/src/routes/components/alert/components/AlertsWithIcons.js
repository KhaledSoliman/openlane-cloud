/**
 * Alerts With Icons
 */
import React from 'react';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const AlertsWithIcons = () => (
	<RctCollapsibleCard
		heading={<IntlMessages id="widgets.alertsWithIcons" />}
		contentCustomClasses="icon-alert"
	>
		<div className="alert bg-primary text-white" role="alert">
			<span className="alert-addon">
				<i className="zmdi zmdi-group"></i>
			</span>
			<p><strong>Well done!</strong> You successfully read this important alert message.</p>
		</div>
		<div className="alert bg-success text-white" role="alert">
			<span className="alert-addon">
				<i className="zmdi zmdi-notifications-active"></i>
			</span>
			<p><strong>Well done!</strong> You successfully read this important alert message.</p>
		</div>
		<div className="alert bg-info text-white" role="alert">
			<span className="alert-addon">
				<i className="zmdi zmdi-info"></i>
			</span>
			<p><strong>Heads up!</strong> This alert needs your attention, but its not super important.</p>
		</div>
		<div className="alert bg-warning text-white" role="alert">
			<span className="alert-addon">
				<i className="zmdi zmdi-alert-triangle"></i>
			</span>
			<p><strong>Warning!</strong> Better check yourself, you are not looking too good.</p>
		</div>
		<div className="alert bg-danger text-white" role="alert">
			<span className="alert-addon">
				<i className="zmdi zmdi-alert-circle"></i>
			</span>
			<p><strong>Oh snap!</strong> Change a few things up and try submitting again.</p>
		</div>
	</RctCollapsibleCard>
);

export default AlertsWithIcons;
