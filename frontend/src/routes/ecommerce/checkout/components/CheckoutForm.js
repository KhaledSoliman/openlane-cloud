/**
 * Checkout Form Component
 */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

//Component
import PaymentInfo from './Payment';
import BillingForm from './BillingForm';

// intl messages
import IntlMessages from 'Util/IntlMessages';

function TabContainer({ children, dir }) {
   return (
      <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
         {children}
      </Typography>
   );
}

class CheckoutForm extends Component {
   state = {
      value: 0,
   };

   handleChange = (event, value) => {
      this.setState({ value });
   };

   render() {
      const { value } = this.state;
      return (
         <div className="checkout-form-wrap">
            <div>
               <AppBar position="static" color="default">
                  <Tabs
                     value={value}
                     onChange={this.handleChange}
                     indicatorColor="primary"
                     textColor="primary"
                     fullWidth
                  >
                     <Tab
                        disabled
                        label={<IntlMessages id="components.billingAddress" />}
                     />
                     <Tab
                        disabled
                        label={<IntlMessages id="components.payment" />}
                     />
                  </Tabs>
               </AppBar>
               {value === 0 && <TabContainer><BillingForm onComplete={() => this.setState({ value: 1 })} /></TabContainer>}
               {value === 1 && <TabContainer><PaymentInfo onChangeInfo={() => this.setState({ value: 0 })} /></TabContainer>}
            </div>
         </div>
      );
   }
}

export default withStyles(null, { withTheme: true })(CheckoutForm);
