/**
 * Shop Page
 */
import React, { Component } from 'react'
import {
	InstantSearch,
	Hits,
	Stats,
	SortBy,
	Pagination,
	Configure,
	MenuSelect,
	Panel,
	SearchBox
} from 'react-instantsearch/dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'

//Components
import Hit from './components/Hits';
import Filters from './components/Filters';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

export default class Shop extends Component {
	render() {
		const { match } = this.props;
		return (
			<div className="shop-wrapper">
				<PageTitleBar title={<IntlMessages id="sidebar.shop" />} match={match} />
				<InstantSearch
					appId="latency"
					apiKey="3d9875e51fbd20c7754e65422f7ce5e1"
					indexName="bestbuy"
				>
					<div className="mb-30 filter-sm-wrap d-block d-md-none">
						<ExpansionPanel>
							<ExpansionPanelSummary className="filter-icon" expandIcon={<i className="zmdi zmdi-tune"></i>}>
								<span className="p-0">Filters</span>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<div className="d-sm-flex justify-content-between w-100">
									<Panel
										className="mx-10 mb-20 mb-sm-0"
										header="Search"
									>
										<SearchBox
											translations={{ placeholder: 'Search Products' }}
											showLoadingIndicator
										/>
									</Panel>
									<Panel
										className="mx-10 mb-20 mb-sm-0"
										header="Category"
									>
										<div className="app-selectbox-sm">
											<MenuSelect
												attribute="categories"
												limit={5}
											/>
										</div>
									</Panel>
									<Panel
										className="mx-10 mb-20 mb-sm-0"
										header="Brand"
									>
										<div className="app-selectbox-sm">
											<MenuSelect
												attribute="brand"
												limit={5}
											/>
										</div>
									</Panel>
									<Panel
										className="mx-10 mb-20 mb-sm-0"
										header="Type"
									>
										<div className="app-selectbox-sm">
											<MenuSelect
												attribute="type"
												limit={5}
											/>
										</div>
									</Panel>
								</div>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					</div>
					<div className="row">
						<div className="col-lg-3 col-md-4 d-none d-md-block">
							<Filters />
						</div>
						<div className="col-lg-9 col-md-8 col-sm-12">
							<div className="shop-content">
								<div className="stats-info d-flex mb-30 justify-content-between align-items-center">
									<div className="app-selectbox-sm w-30">
										<SortBy
											defaultRefinement="instant_search"
											items={[
												{ value: 'instant_search', label: 'Featured' },
												{ value: 'instant_search_price_asc', label: 'Lowest Price' },
												{ value: 'instant_search_price_desc', label: 'Highest Price' },
											]}
										/>
									</div>
									<Stats />
								</div>
								<Configure hitsPerPage={12} />
								<Hits
									hitComponent={Hit}
									className="mb-30"
									showLoadingIndicator
								/>
								<div className="pagination mb-30">
									<Pagination
										totalPages={5}
										showFirst
										showLast
										showNext
										showPrevious
									/>
								</div>
							</div>
						</div>
					</div>
				</InstantSearch>
			</div>
		)
	}
}
