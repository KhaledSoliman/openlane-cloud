/**
 * Uncontrolled ALerts
 */
import React from 'react';
import { UncontrolledAlert } from 'reactstrap';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const UncontrolledAlerts = () => (
	<RctCollapsibleCard
		heading={<IntlMessages id="widgets.uncontrolledDisableAlerts" />}
	>
		<UncontrolledAlert color="primary">
			I am an alert and I can be dismissed!
        </UncontrolledAlert>
	</RctCollapsibleCard>
);

export default UncontrolledAlerts;
