/**
 * Start Job Widget
 */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

// intl messages
import IntlMessages from 'Util/IntlMessages'

export default class StartJob extends Component {
  render() {
    return (
      <div className="d-flex justify-content-between bg-info rct-block py-25 px-30 promo-coupon">
        <div>
          <div className="mb-20">
            <h3 className="text-white mb-10">DESIGN SUBMISSION NOW ONLINE</h3>
            <Button variant="contained" color="primary"><IntlMessages id="button.startJob" /></Button>
          </div>
        </div>
      </div>
    )
  }
};

