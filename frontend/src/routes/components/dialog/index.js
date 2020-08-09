/**
 * Dialog
 */
import React from 'react';

// components
import SimpleExample from './component/SimpleExample';
import SimpleDialog from './component/SimpleDialog';
import AlertDialogSlide from './component/AlertDialogSlide';
import ConfirmDialog from './component/ConfirmDialog';
import FullScreenDialog from './component/FullScreenDialog';
import FormDialog from './component/FormDialog';
import ResponsiveDialog from './component/ResponsiveDialog';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

export default class DialogBox extends React.Component {
  render() {
    return (
      <div className="dialog-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.dialog" />} match={this.props.match} />
        <RctCollapsibleCard
          heading={<IntlMessages id="widgets.dialogs" />}
        >
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-4 col-xl-3">
              <div className="card text-center p-20 mb-30">
                <h5 className="mb-20">Alert Dialog</h5>
                <SimpleExample />
              </div>
              <div className="card text-center p-20 mb-30">
                <h5 className="mb-20">Responsive Full Screen</h5>
                <ResponsiveDialog />
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4 col-xl-3">
              <div className="card text-center p-20 mb-30">
                <h5 className="mb-20">Animated Slide Dialogs</h5>
                <AlertDialogSlide />
              </div>
              <div className="card text-center p-20 mb-30">
                <h5 className="mb-20">Simple Dialogs</h5>
                <SimpleDialog />
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4 col-xl-3">
              <div className="card text-center p-20 mb-30">
                <h5 className="mb-20">Full Screen dialogs</h5>
                <FullScreenDialog />
              </div>
              <div className="card text-center p-20 mb-30">
                <h5 className="mb-20">Form dialogs</h5>
                <FormDialog />
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4 col-xl-3">
              <div className="card text-center p-20 mb-30">
                <h5 className="mb-20">Confirmation dialogs</h5>
                <ConfirmDialog />
              </div>
            </div>
          </div>
        </RctCollapsibleCard>
      </div>
    );
  }
}
