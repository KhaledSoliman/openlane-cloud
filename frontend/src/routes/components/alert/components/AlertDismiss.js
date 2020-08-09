/**
 * Alert Dismiss
 */
import React, { Component } from 'react';
import { Alert } from 'reactstrap';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

class AlertDismiss extends Component {

    state = {
        visible: true,
        visible2: true,
        visible3: true
    }

    onDismiss(key) {
        this.setState({ [key]: false });
    }

    render() {
        return (
            <RctCollapsibleCard
                heading={<IntlMessages id="widgets.alertDismiss" />}
            >
                <Alert color="primary" isOpen={this.state.visible1} toggle={() => this.onDismiss('visible1')}>
                    I am an alert and I can be dismissed!
                </Alert>
                <Alert color="info" isOpen={this.state.visible2} toggle={() => this.onDismiss('visible2')}>
                    I am an alert and I can be dismissed!
                </Alert>
                <Alert color="danger" isOpen={this.state.visible3} toggle={() => this.onDismiss('visible3')}>
                    I am an alert and I can be dismissed!
                </Alert>
            </RctCollapsibleCard>
        );
    }
}

export default AlertDismiss;
