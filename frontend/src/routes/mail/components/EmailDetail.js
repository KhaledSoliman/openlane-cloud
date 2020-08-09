/**
 * Email Detail
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Avatar from '@material-ui/core/Avatar';
import classnames from 'classnames';
import { Input} from 'reactstrap';
import Button from '@material-ui/core/Button';

// redux actions
import { hideLoadingIndicator, onNavigateToEmailListing, onDeleteEmail } from 'Actions';

//Intl Message
import IntlMessages from 'Util/IntlMessages';

// rct section loader
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';

class EmailDetail extends Component {

	componentWillMount() {
		this.getEmailDetails();
	}

	/**
	 * Get Email Details By Id
	 */
	getEmailDetails() {
		let self = this;
		setTimeout(() => {
			this.props.hideLoadingIndicator();
		}, 1500);
	}

	/**
	 * On Back Press Naviagte To Email Listing Page
	 */
	onBackPress() {
		const { history } = this.props;
		this.props.onNavigateToEmailListing();
		history.goBack();
	}

	/**
	 * On Delete Email
	 */
	onDeleteEmail() {
		const { history } = this.props;
		this.props.onDeleteEmail();
		history.goBack();
	}

	/**
	 * Function to return task label name
	 */
	getTaskLabelNames = (taskLabels) => {
		let elements = [];
		const { labels } = this.props;
		for (const taskLabel of taskLabels) {
			for (const label of labels) {
				if (label.value === taskLabel) {
					let ele = <span key={label.value} className={classnames("badge badge-pill mx-5 mb-5 mb-md-0", { 'badge-success': label.value === 1, 'badge-primary': label.value === 2, 'badge-info': label.value === 3, 'badge-danger': label.value === 4 })}><IntlMessages id={label.name} /></span>;
					elements.push(ele);
				}
			}
		}
		return elements;
	}

	render() {
		const { currentEmail, loading } = this.props;
		if (loading) {
			return (
				<RctSectionLoader />
			)
		}
		return (
			<div className="email-detail-page-warrper">
				<div className="top-head border-bottom-0 d-flex justify-content-between">
					<IconButton onClick={() => this.onBackPress()}>
						<ArrowBackIcon />
					</IconButton>
					<div className="mail-action">
						<IconButton>
							<i className="zmdi zmdi-mail-reply"></i>
						</IconButton>
						<IconButton>
							<i className="zmdi zmdi-print"></i>
						</IconButton>
						<IconButton onClick={() => this.onDeleteEmail()}>
							<i className="zmdi zmdi-delete"></i>
						</IconButton>
					</div>
				</div>
				{currentEmail !== null &&
					<div>
						<div className="top-head d-flex justify-content-between align-items-center">
							<h5 className="mb-0 text-capitalize w-75 d-flex align-items-center">{currentEmail.email_subject}</h5>
							<div className="w-25 text-right">
								{this.getTaskLabelNames(currentEmail.email_labels)}
							</div>
						</div>
						<div className="user-detail d-flex justify-content-between align-items-center py-3 px-4">
							<div className="media w-80">
								{currentEmail.from.avatar !== '' ?
									<img src={currentEmail.from.avatar} alt="user profile" className="mr-20 rounded img-fluid" width="50" height="50" />
									: <Avatar className="mr-20 rounded">{currentEmail.from.name.charAt(0)}</Avatar>
								}
								<div className="media-body">
									<h5 className="mb-1">{currentEmail.from.name}</h5>
									<p className="mb-0 font-sm">From <span className="text-muted font-xs">&lt;{currentEmail.from.email}&gt;</span></p>
									<p className="mb-0 font-sm">To: <span className="text-muted font-xs">Me</span></p>
								</div>
							</div>
							<span className="text-muted w-20 text-right font-xs">{currentEmail.received_time}</span>
						</div>
						<div className="mail-detail">
							<div className="mb-20">
								<p>{currentEmail.email_content}</p>
							</div>
							<span className="d-block fw-semi-bold font-sm">Regards,</span>
							<span className="d-block font-xs text-muted">{currentEmail.from.name}</span>
						</div>
						<div className="attachments p-20">
							<div className="d-flex justify-content-between">
								<h4>3 Attachments</h4>
								<div className="mail-action">
									<IconButton>
										<i className="zmdi zmdi-file"></i>
									</IconButton>
									<IconButton>
										<i className="zmdi zmdi-cloud-download"></i>
									</IconButton>
								</div>
							</div>
							<ul className="list-unstyled d-flex">
								<li className="mx-2">
									<img src={require('Assets/img/about-card-1.png')} alt="attachments" className="img-fluid mb-10" width="180" height="140" />
									<p className="mb-5 font-xs">Attachment 1.jpg</p>
									<div className="list-action">
										<a href="javascript:void(0)"><i className="zmdi zmdi-download mr-10"></i></a>
										<a href="javascript:void(0)"><i className="zmdi zmdi-zoom-in"></i></a>
									</div>
								</li>
								<li className="mx-2">
									<img src={require('Assets/img/about-card-2.png')} alt="attachments" className="img-fluid mb-10" width="180" height="140" />
								<p className="mb-5 font-xs">Attachment 2.jpg</p>
									<div className="list-action">
										<a href="javascript:void(0)"><i className="zmdi zmdi-download mr-10"></i></a>
										<a href="javascript:void(0)"><i className="zmdi zmdi-zoom-in"></i></a>
									</div>
								</li>
								<li className="mx-2">
									<img src={require('Assets/img/about-card-3.png')} alt="attachments" className="img-fluid mb-10" width="180" height="140" />
								<p className="mb-5 font-xs">Attachment 3.jpg</p>
									<div className="list-action">
										<a href="javascript:void(0)"><i className="zmdi zmdi-download mr-10"></i></a>
										<a href="javascript:void(0)"><i className="zmdi zmdi-zoom-in"></i></a>
									</div>
								</li>
							</ul>
						</div>
						<div className="mail-reply-wrap d-flex align-items-center p-20">
							<Input type="textarea" name="text" placeholder="Reply" id="exampleText" className="mr-3" />
							<Button variant="contained" color="primary" className="bg-primary">
								Send
								<i className="zmdi zmdi-mail-send ml-2"></i>
							</Button>
						</div>
					</div>
				}
			</div>
		);
	}
}

// map state to props
const mapStateToProps = ({ emailApp }) => {
	return emailApp;
};

export default withRouter(connect(mapStateToProps, {
	hideLoadingIndicator,
	onNavigateToEmailListing,
	onDeleteEmail
})(EmailDetail));
