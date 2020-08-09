/**
 * List
 */
import React from 'react';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// list components
import SimpleListComponent from './component/SimpleList';
import SwitchListComponent from './component/SwitchList';
import NestedListComponent from './component/NestedList';
import FolderListComponent from './component/FolderList';
import ListDividerComponent from './component/ListDivider';
import CheckboxListComponent from './component/CheckboxList';
import ListItemWithImage from './component/ListItemWithImage';
import InsetList from './component/InsetList';
import InteractiveList from './component/InteractiveList';
import PinedList from './component/PinedList';

// intl messages
import IntlMessages from 'Util/IntlMessages';

class ListComponent extends React.Component {
  render() {
    return (
      <div className="list-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.list" />} match={this.props.match} />
        <div className="row">
          <div className="col-sm-12 col-md-6 col-xl-4 d-sm-half-block">
            <SimpleListComponent />
            <SwitchListComponent />
            <NestedListComponent />
          </div>
          <div className="col-sm-12 col-md-6 col-xl-4 d-sm-half-block">
            <FolderListComponent />
            <ListDividerComponent />
            <CheckboxListComponent />
          </div>
          <div className="col-sm-12 col-md-12 col-xl-4 d-sm-full">
            <ListItemWithImage />
            <InsetList />
            <PinedList />
          </div>
        </div>
        <InteractiveList />
      </div>
    );
  }
}

export default ListComponent;
