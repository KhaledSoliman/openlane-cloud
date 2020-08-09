/**
 * Alert UI Components
 */
import React, { Component } from 'react';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// components
import SimpleAlertExample from './components/SimpleAlertsExample';
import AdditionalContent from './components/AdditionalContent';
import ContextualAlert from './components/ContextualAlert';
import AlertsWithLink from './components/AlertsWithLink';
import AlertDismiss from './components/AlertDismiss';
import UncontrolledAlerts from './components/UncontrolledAlerts';
import AlertsWithIcons from './components/AlertsWithIcons';

// intl messages
import IntlMessages from 'Util/IntlMessages';

export default class Alerts extends Component {
	render() {
		return (
			<div className="alert-wrapper">
				<PageTitleBar title={<IntlMessages id="sidebar.alerts" />} match={this.props.match} />
				<div className="row">
					<div className="col-sm-12 col-md-6">
						<SimpleAlertExample />
						<AdditionalContent />
						<ContextualAlert />
					</div>
					<div className="col-sm-12 col-md-6">
						<AlertsWithLink />
						<AlertDismiss />
						<UncontrolledAlerts />
						<AlertsWithIcons />
					</div>
				</div>
			</div>
		);
	}
}
