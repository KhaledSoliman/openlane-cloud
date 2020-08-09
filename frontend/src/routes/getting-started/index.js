/**
 * Getting Started Home Page
 */
import React, {Component} from 'react'
import {Helmet} from "react-helmet";
// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

import {
    VisitorAreaChartWidget,
    SalesAreaChartWidget,
    OrdersAreaChartWidget,
    RecentOrdersWidget,
    SupportRequest,
    Notifications,
    TopSellingWidget,
    OverallTrafficStatusWidget,
    ProductReportsWidget,
    OnlineVisitorsWidget,
    TodayOrdersStatsWidget,
    BookingInfo,
    NewOrderCountdown,
    FollowersWidget,
    Notes
} from "Components/Widgets";

// widgets data
import {
    visitorsData,
    salesData,
    ordersData,
    topSellingProducts,
    trafficStatus,
    onlineVisitorsData,
} from './data';


// widgets
import {
    ShareFriends,
    PromoCoupons,
    Rating
} from "Components/Widgets";

export default class GettingStarted extends Component {

    render() {
        const {match} = this.props;
        return (
            <div className="ecom-dashboard-wrapper">
                <Helmet>
                    <title>Home</title>
                    <meta name="description" content="Openlane Getting Started"/>
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.getting-started"/>} match={match}/>
                <div className="row row-eq-height">
                    <div className="col-sm-6 col-md-6 col-xl-6 w-xs-full">
                        <PromoCoupons/>
                    </div>
                    <div className="col-sm-6 col-md-6 col-xl-6 w-xs-full">
                        <div className="dash-cards">
                            <Notes/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-md-6 col-xl-6 w-xs-full">
                        <ShareFriends/>
                    </div>
                    <div className="col-sm-6 col-md-6 col-xl-6 w-xs-full">
                        <Rating/>
                    </div>
                </div>
            </div>
        )
    }
}
