/**
* Email App Sidebar
* Used To Filter Mail List
*/
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';

// helpers
import { getAppLayout } from 'Helpers/helpers';

// actions
import { filterEmails } from 'Actions';

//Intl Message
import IntlMessages from 'Util/IntlMessages';

class EmailAppSidebar extends Component {

	/**
	 * Navigate To Folder Emails
	 */
	navigateTo(key) {
		const { match, history } = this.props;
		history.push(`${match.url}/folder/${key}`);
	}

	/**
	 * Filter Emails
	 */
	filterEmails(label) {
		this.props.filterEmails(label);
	}

	/**
	 * Get Scroll Height
	 */
	getScrollHeight() {
		const { location } = this.props;
		const appLayout = getAppLayout(location)
		switch (appLayout) {
			case 'app':
				return 'calc(100vh - 288px)';
			case 'agency':
				return 'calc(100vh - 416px)';
			case 'boxed':
				return 'calc(100vh - 416px)';
			case 'horizontal':
				return 'calc(100vh - 333px)';
			default:
				break;
		}
	}

	render() {
		const { folders, selectedFolder, labels } = this.props;
		return (
			<Scrollbars
				className="rct-scroll"
				autoHide
				style={{ height: this.getScrollHeight() }}
			>
				<div className="sidebar-filters-wrap">
					<List className="p-0 filters list-unstyled">
						{folders.map((folder, key) => (
							<ListItem
								button
								key={key}
								onClick={() => this.navigateTo(folder.handle)}
								className={classnames({ 'item-active': selectedFolder === folder.id })}>
								<i className={`mr-20 zmdi zmdi-${folder.icon}`} />
								<span className="filter-title">
									<IntlMessages id={folder.title} />
								</span>
							</ListItem>
						))}
					</List>
					<h6 className="sidebar-title px-20 pt-20">Labels</h6>
					<List className="list-unstyled filters p-0">
						{labels.map((label, key) => (
							<ListItem button key={key} onClick={() => this.filterEmails(label)}>
								<span className={`badge-${label.badgeClass} ladgend`}></span>
								<span className="filter-title"><IntlMessages id={label.name} /></span>
							</ListItem>
						))}
					</List>
				</div>
			</Scrollbars>
		);
	}
}

// map state to props
const mapStateToProps = ({ emailApp }) => {
	return emailApp;
};

export default withRouter(connect(mapStateToProps, {
	filterEmails
})(EmailAppSidebar));
