/**
 * Contextual Alert
 */
import React from 'react';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const ContextualAlert = () => (
	<RctCollapsibleCard
		heading={<IntlMessages id="widgets.contexualAlerts" />}
	>
		<div className="alert bg-primary text-white" role="alert">
			<strong>Well done!</strong> You successfully read this important alert message.
      </div>
		<div className="alert bg-success text-white" role="alert">
			<strong>Well done!</strong> You successfully read this important alert message.
      </div>
		<div className="alert bg-info text-white" role="alert">
			<strong>Heads up!</strong> This alert needs your attention, but its not super important.
      </div>
		<div className="alert bg-warning text-white" role="alert">
			<strong>Warning!</strong> Better check yourself, you are not looking too good.
      </div>
		<div className="alert bg-danger text-white" role="alert">
			<strong>Oh snap!</strong> Change a few things up and try submitting again.
      </div>
	</RctCollapsibleCard>
);

export default ContextualAlert;
