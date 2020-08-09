/**
 * Payment Component
 */

import React, { Component } from 'react';
import Cards from 'react-credit-cards';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import Button from '@material-ui/core/Button';
import MaskedInput from 'react-text-mask'
import { NotificationManager } from 'react-notifications';

// intl messages
import IntlMessages from 'Util/IntlMessages';

class PaymentInfo extends Component {
   constructor(props) {
      super(props);

      this.state = {
         number: '',
         name: '',
         expiry: '',
         cvc: '',
         focused: '',
         formValid: false
      };
   }

   handleInputFocus = ({ target }) => {
      this.setState({
         focused: target.name,
      });
   };

   handleInputChange = ({ target }) => {
      const { name, number, expiry, cvc } = this.state;
      if (name !== '' && number !== '' && expiry !== '' && cvc !== '') {
         this.setState({ formValid: true });
      } else {
         this.setState({ formValid: false });
      }
      if (target.name === 'number') {
         this.setState({
            [target.name]: target.value.replace(/ /g, ''),
         });
      }
      else if (target.name === 'expiry') {
         this.setState({
            [target.name]: target.value.replace(/ |\//g, ''),
         });
      }
      else {
         this.setState({
            [target.name]: target.value,
         });
      }
   };

   /**
    * on confirm payment
    */
   confirmPayment() {
      const { formValid } = this.state;
      if (formValid) {
         NotificationManager.success('Payment Confirmed!')
      }
   }

   render() {
      const { name, number, expiry, cvc, focused, formValid } = this.state;
      return (
         <div className="payment-wrap">
            <div className="p-30 mb-30">
               <Cards
                  number={number}
                  name={name}
                  expiry={expiry}
                  cvc={cvc}
                  focused={focused}
                  preview={true}
               />
            </div>
            <div className="w-80 mx-auto">
               <Form>
                  <FormGroup>
                     <Label for="cardNumber"><IntlMessages id="components.cardNumber" /></Label>
                     <MaskedInput
                        type="text"
                        name="number"
                        className="form-control"
                        id="cardNumber"
                        onKeyUp={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
                     />
                  </FormGroup>
                  <div className="d-flex justify-content-between">
                     <FormGroup className="w-50 mr-10">
                        <Label for="expiryDate"><IntlMessages id="components.expiryDate" /></Label>
                        <MaskedInput
                           type="text"
                           name="expiry"
                           className="form-control"
                           id="expiryDate"
                           placeholder="MM/YY"
                           onKeyUp={this.handleInputChange}
                           onFocus={this.handleInputFocus}
                           mask={[/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                        />
                     </FormGroup>
                     <FormGroup className="w-50 ml-10">
                        <Label for="cvvNumber"><IntlMessages id="components.cvv" /></Label>
                        <Input
                           type="text"
                           name="cvc"
                           id="cvvNumber"
                           onKeyUp={this.handleInputChange}
                           onFocus={this.handleInputFocus}
                           maxLength={4}
                        />
                     </FormGroup>
                  </div>
                  <FormGroup>
                     <Label for="name"><IntlMessages id="components.nameOnCard" /></Label>
                     <Input
                        type="text"
                        name="name"
                        id="name"
                        onKeyUp={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                     />
                  </FormGroup>
               </Form>
               <div className="d-flex justify-content-between">
                  <Button onClick={this.props.onChangeInfo} color="secondary" className="text-white" variant="raised">
                     <IntlMessages id="button.back" />
                  </Button>
                  <Button disabled={!formValid} color="primary" variant="raised" onClick={() => this.confirmPayment()}><IntlMessages id="components.confirmPayment" /></Button>
               </div>
            </div>
         </div>
      )
   }
}
export default PaymentInfo;