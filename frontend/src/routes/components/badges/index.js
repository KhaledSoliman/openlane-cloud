/**
 * Badges
 */
import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import MatBadge from '@material-ui/core/Badge';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

export default class Badges extends Component {
  render() {
    return (
      <div className="badges-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.badges" />} match={this.props.match} />
        <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-6">
            <RctCollapsibleCard
              heading={<IntlMessages id="widgets.badgeWithHeadings" />}
            >
              <h1 className="mb-10">Heading <Badge className="ml-20" color="primary">New</Badge></h1>
              <h2 className="mb-10">Heading <Badge className="ml-20" color="primary">New</Badge></h2>
              <h3 className="mb-10">Heading <Badge className="ml-20" color="primary">New</Badge></h3>
              <h4 className="mb-10">Heading <Badge className="ml-20" color="primary">New</Badge></h4>
              <h5 className="mb-10">Heading <Badge className="ml-20" color="primary">New</Badge></h5>
              <h6 className="mb-10">Heading <Badge className="ml-20" color="primary">New</Badge></h6>
            </RctCollapsibleCard>
            <RctCollapsibleCard
              heading={<IntlMessages id="widgets.badgeLinks" />}
            >
              <Badge className="mb-10 mr-10" href="#" color="primary">Primary</Badge>
              <Badge className="mb-10 mr-10" href="#" color="secondary">Secondary</Badge>
              <Badge className="mb-10 mr-10" href="#" color="success">Success</Badge>
              <Badge className="mb-10 mr-10" href="#" color="danger">Danger</Badge>
              <Badge className="mb-10 mr-10" href="#" color="warning">Warning</Badge>
              <Badge className="mb-10 mr-10" href="#" color="info">Info</Badge>
              <Badge className="mb-10 mr-10" href="#" color="dark">Dark</Badge>
            </RctCollapsibleCard>
          </div>
          <div className="col-sm-12 col-md-12 col-xl-6">
            <RctCollapsibleCard
              heading={<IntlMessages id="widgets.contexualVariations" />}
            >
              <Badge className="mb-10 mr-10" color="primary">Primary</Badge>
              <Badge className="mb-10 mr-10" color="secondary">Secondary</Badge>
              <Badge className="mb-10 mr-10" color="success">Success</Badge>
              <Badge className="mb-10 mr-10" color="danger">Danger</Badge>
              <Badge className="mb-10 mr-10" color="warning">Warning</Badge>
              <Badge className="mb-10 mr-10" color="info">Info</Badge>
              <Badge className="mb-10 mr-10" color="dark">Dark</Badge>
            </RctCollapsibleCard>
            <RctCollapsibleCard
              heading="Badge Pills"
            >
              <Badge className="mb-10 mr-10" color="primary" pill>Primary</Badge>
              <Badge className="mb-10 mr-10" color="secondary" pill>Secondary</Badge>
              <Badge className="mb-10 mr-10" color="success" pill>Success</Badge>
              <Badge className="mb-10 mr-10" color="danger" pill>Danger</Badge>
              <Badge className="mb-10 mr-10" color="warning" pill>Warning</Badge>
              <Badge className="mb-10 mr-10" color="info" pill>Info</Badge>
              <Badge className="mb-10 mr-10" color="dark" pill>Dark</Badge>
            </RctCollapsibleCard>
            <RctCollapsibleCard
              heading={<IntlMessages id="widgets.materialBadge" />}
            >
              <MatBadge badgeContent={4} color="primary" className="mr-20 mb-10">
                <i className="zmdi zmdi-email zmdi-hc-2x"></i>
              </MatBadge>
              <MatBadge badgeContent={4} color="primary" className="mr-20 mb-10">
                <i className="zmdi zmdi-notifications-active zmdi-hc-2x"></i>
              </MatBadge>
              <MatBadge className="mr-20 mb-10" badgeContent={4} color="primary">
                <i className="zmdi zmdi-skype zmdi-hc-2x"></i>
              </MatBadge>
            </RctCollapsibleCard>
          </div>
        </div>
      </div>
    );
  }
}
