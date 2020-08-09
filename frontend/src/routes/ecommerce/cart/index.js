/**
 * View Cart Page
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Input } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

// Card Component
import { RctCard, RctCardContent } from 'Components/RctCard';

//Actions
import { deleteItemFromCart, onChangeProductQuantity } from "Actions";

//Helper
import { textTruncate } from "Helpers/helpers";

// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

class Carts extends Component {

   onChangeQuantity(quantity, cartItem) {
      if (quantity > 0) {
         this.props.onChangeProductQuantity(quantity, cartItem);
      }
   }

   //Get Total Price
   getTotalPrice() {
      const { cart } = this.props;
      let totalPrice = 0;
      for (const item of cart) {
         totalPrice += item.totalPrice
      }
      return totalPrice.toFixed(2);
   }

   //Is Cart Empty
   isCartEmpty() {
      const { cart } = this.props;
      if (cart.length === 0) {
         return true;
      }
   }

   render() {
      const { cart, deleteItemFromCart, match } = this.props;
      return (
         <div className="cart-wrapper">
            <PageTitleBar title={<IntlMessages id="sidebar.cart" />} match={match} />
            <RctCard>
               <RctCardContent noPadding>
                  <Table hover responsive className="mb-0">
                     <thead>
                        <tr>
                           <th className="w-10"></th>
                           <th className="w-50"><IntlMessages id="components.product" /></th>
                           <th className="w-10 text-center"><IntlMessages id="components.quantity" /></th>
                           <th className="w-10 text-center"><IntlMessages id="widgets.price" /></th>
                           <th className="w-10 text-center"><IntlMessages id="components.totalPrice" /></th>
                           <th className="w-10 text-center"><IntlMessages id="components.removeProduct" /></th>
                        </tr>
                     </thead>
                     <tbody>
                        {!this.isCartEmpty() ? cart.map((cart, key) => (
                           <tr key={key}>
                              <td className="w-10 text-center"><img src={cart.image} alt="products" className="media-object" width="100" height="100" /></td>
                              <td className="w-50">
                                 <h3>{textTruncate(cart.name, 40)}</h3>
                                 <span className="fs-14 d-block text-muted">{textTruncate(cart.description, 80)}</span>
                                 <span className="fs-14 d-block text-muted">{cart.brand}</span>
                              </td>
                              <td>
                                 <Input
                                    type="number"
                                    value={cart.productQuantity}
                                    onChange={(e) => this.onChangeQuantity(e.target.value, cart)}
                                 />
                              </td>
                              <td className="text-danger text-center">$ {cart.price}</td>
                              <td className="text-bold text-center">$ {cart.totalPrice.toFixed(2)}</td>
                              <td className="text-center">
                                 <IconButton onClick={() => deleteItemFromCart(cart)}>
                                    <i className="zmdi zmdi-close"></i>
                                 </IconButton>
                              </td>
                           </tr>
                        )) :
                           <tr>
                              <td colSpan="6" className="text-center h-25">
                                 <span className="d-block font-5x mb-30 text-danger"><i className="zmdi zmdi-shopping-cart"></i></span>
                                 <span className="mb-20 font-3x"><IntlMessages id="components.CartEmptyText" /></span>
                              </td>
                           </tr>
                        }
                     </tbody>
                     <tfoot>
                        <tr className="text-center">
                           <td colSpan="2"><Input type="text" placeholder="Enter Promo Code" /></td>
                           <td><Button variant="raised" color="secondary" className="text-white"><IntlMessages id="widgets.apply" /></Button></td>
                           <td><span className="font-weight-bold"><IntlMessages id="widgets.total" /></span></td>
                           <td><span className="font-weight-bold">$ {this.getTotalPrice()}</span></td>
                           <td>
                              <Button variant="raised" size="large" color="primary" className="text-white" component={Link} to="/app/ecommerce/checkout">
                                 <IntlMessages id="components.checkout" />
                              </Button>
                           </td>
                        </tr>
                     </tfoot>
                  </Table>
               </RctCardContent>
            </RctCard>
         </div>
      )
   }
}

const mapStateToProps = ({ ecommerce }) => {
   const { cart } = ecommerce;
   return { cart };
}

export default connect(mapStateToProps, {
   deleteItemFromCart,
   onChangeProductQuantity
})(Carts);