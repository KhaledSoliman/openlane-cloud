/**
 * Additional content
 */
import React from 'react';
import { Alert } from 'reactstrap';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

const AdditionalContent = () => (
	<RctCollapsibleCard
		heading={<IntlMessages id="widgets.additionalContent" />}
	>
		<Alert color="success">
			<h4 className="alert-heading">Well done!</h4>
			<p>
				Aww yeah, you successfully read this important alert message. This example text is going
                to run a bit longer so that you can see how spacing within an alert works with this kind
                of content.
                </p>
			<hr />
			<p className="mb-0">
				Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
                </p>
		</Alert>
		<Alert color="danger">
			<h4 className="alert-heading">Well done!</h4>
			<p>
				Aww yeah, you successfully read this important alert message. This example text is going
                to run a bit longer so that you can see how spacing within an alert works with this kind
                of content.
                </p>
			<hr />
			<p className="mb-0">
				Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
         </p>
		</Alert>
	</RctCollapsibleCard>
);

export default AdditionalContent;
