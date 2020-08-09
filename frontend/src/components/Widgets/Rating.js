/**
 * Rating Component
 */
import React, { Component } from 'react';
import { Input } from 'reactstrap';
import Button from '@material-ui/core/Button';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// chart config
import AppConfig from 'Constants/AppConfig';

export default class Rating extends Component {

	render() {
		return (
			<div className="rating-wrap bg-warning rct-block py-20 px-30">
			<h4 className="text-white mb-3"><IntlMessages id="widgets.howWouldYouRateUs" /></h4>
			<Input
				type="textarea"
				name="comment"
				id="comment"
				placeholder="Tell us what you think?"
				className="mb-3 fs-14"
			/>
			<Button variant="raised" size="small" className="btn-danger text-white btn-icon">
				<i className="zmdi zmdi-mail-send"></i> <IntlMessages id="widgets.send" />
			</Button>
			</div>
		)
	}
};

