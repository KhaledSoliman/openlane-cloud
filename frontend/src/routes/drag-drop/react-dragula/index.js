/**
 * React Dragula
 */
import React, { Component } from 'react';
import Dragula from 'react-dragula';
import Avatar from '@material-ui/core/Avatar';

// api 
import api from 'Api';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

export default class ReactDragulaComponent extends Component {

	state = {
		listData: null
	}

	componentDidMount() {
		this.getListData();
	}

	/**
	 * Ger list data
	 */
	getListData() {
		api.get('reactDragulaList.js')
			.then((response) => {
				this.setState({ listData: response.data });
			})
			.catch(error => {
				// error handling
			})
	}

	dragulaDecorator = (componentBackingInstance) => {
		if (componentBackingInstance) {
			let options = {};
			Dragula([componentBackingInstance], options);
		}
	}

	render() {
		const { listData } = this.state;
		return (
			<div className="dragula-wrapper">
				<PageTitleBar title={<IntlMessages id="sidebar.reactDragula" />} match={this.props.match} />
				<RctCollapsibleCard heading="Dragula" fullBlock>
					<div className="table-responsive">
						<table className="table table-dragula table-lg">
							<tbody ref={this.dragulaDecorator}>
								{listData && listData.map((item, key) => (
									<tr key={key}>
										<td className="w-5"><i className="ti-menu"></i></td>
										<td>
											<div className="media">
												<div className="media-left mr-20">
													<Avatar className={`${item.class} rounded-circle`}>{item.userName.charAt(0)}</Avatar>
												</div>
												<div className="media-body pt-10">
													<h5 className="fw-bold">{item.userName}</h5>
												</div>
											</div>
										</td>
										<td className="w-5"><i className="ti-star text-warning"></i></td>
										<td>{item.content}</td>
										<td>{item.emailId}</td>
										<td>{item.phoneNumber}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</RctCollapsibleCard>
			</div>
		);
	}
}
