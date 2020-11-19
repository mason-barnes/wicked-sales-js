import React from 'react';
import CartSummaryItem from './cart-summary-item';
import fixPrice from '../lib/fixprice';

export default class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.checkoutView = this.checkoutView.bind(this);
  }

  checkoutView() {
    this.props.setView('checkout', {});
  }

  render() {
    const array = this.props.cartArray;
    if (array.length === 0) {
      return (
        <div>
          <p className="smaller-text padding-top-5 catalog-button" onClick={() => {
            this.props.setView('catalog', {});
          }}><i className="fas fa-angle-left"></i> Back to Catalog</p>
          <h1 className="my-cart-title">My cart</h1>
          <h2 className="empty-cart">There are no items in your cart.</h2>
        </div>
      );
    } else {
      return (
        <div>
          <p className="smaller-text padding-top-5 catalog-button" onClick={() => {
            this.props.setView('catalog', {});
          }}><i className="fas fa-angle-left"></i> Back to Catalog</p>
          <h1 className="my-cart-title">My Cart</h1>
          {
            array.map(item => {
              const fixed = fixPrice(item.price);
              return (
                <CartSummaryItem getCartItems={this.props.getCartItems} cartArray={this.props.cartArray} key={item.cartItemId} fixed={fixed} item={item} />
              );
            })
          }
          <div className="space-between">
            <p>Total amount: {this.props.getTotal()}</p>
            <button className="checkout-button" onClick={this.checkoutView}>Checkout</button>
          </div>
        </div>
      );
    }
  }
}
