/**
 * Bottom Navigation
 */
import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

class BottomNavigationComponent extends React.Component {

  state = {
    example1: 'recents',
    example2: 'recents',
    example3: 'recents',
  }

  /**
   * Hanlde Change Tab
   */
  handleChange = (key, value) => {
    this.setState({ [key]: value });
  }

  render() {
    const { example1, example2, example3 } = this.state;
    return (
      <div className="button-nav-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.bottomNavigations" />} match={this.props.match} />
        <div className="row">
          <RctCollapsibleCard
            heading={<IntlMessages id="widgets.buttonNavigationWithNoLabel" />}
            colClasses="col-sm-12 col-md-4 col-xl-4 b-100"
          >
            <BottomNavigation value={example1} onChange={(e, value) => this.handleChange('example1', value)}>
              <BottomNavigationAction label="Recents" value="recents" icon={<i className="zmdi zmdi-time-restore zmdi-hc-lg"></i>} />
              <BottomNavigationAction label="Favorites" value="favorites" icon={<i className="zmdi zmdi-favorite zmdi-hc-lg"></i>} />
              <BottomNavigationAction label="Nearby" value="nearby" icon={<i className="zmdi zmdi-pin zmdi-hc-lg"></i>} />
              <BottomNavigationAction label="Folder" value="folder" icon={<i className="zmdi zmdi-folder zmdi-hc-lg"></i>} />
            </BottomNavigation>
          </RctCollapsibleCard>
          <RctCollapsibleCard
            heading="Bottom Navigation With Labels"
            colClasses="col-sm-12 col-md-4 col-xl-4 b-100"
          >
            <BottomNavigation value={example2} onChange={(e, value) => this.handleChange('example2', value)} showLabels>
              <BottomNavigationAction label="Recents" icon={<i className="zmdi zmdi-time-restore zmdi-hc-lg"></i>} />
              <BottomNavigationAction label="Favorites" icon={<i className="zmdi zmdi-favorite zmdi-hc-lg"></i>} />
              <BottomNavigationAction label="Nearby" icon={<i className="zmdi zmdi-pin zmdi-hc-lg"></i>} />
            </BottomNavigation>
          </RctCollapsibleCard>
          <RctCollapsibleCard
            heading={<IntlMessages id="widgets.iconNavigation" />}
            colClasses="col-sm-12 col-md-4 col-xl-4 b-100"
          >
            <BottomNavigation value={example3} onChange={(e, value) => this.handleChange('example3', value)}>
              <BottomNavigationAction icon={<i className="zmdi zmdi-time-restore zmdi-hc-lg"></i>} />
              <BottomNavigationAction icon={<i className="zmdi zmdi-favorite zmdi-hc-lg"></i>} />
              <BottomNavigationAction icon={<i className="zmdi zmdi-pin zmdi-hc-lg"></i>} />
              <BottomNavigationAction icon={<i className="zmdi zmdi-folder zmdi-hc-lg"></i>} />
            </BottomNavigation>
          </RctCollapsibleCard>
        </div>
      </div>
    );
  }
}

export default BottomNavigationComponent;
