import React from 'react';
import CartSummaryItem from './cart-summary-item';
import fixPrice from '../lib/fixprice';

export default class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getTotal = this.getTotal.bind(this);
  }

  getTotal() {
    let totalAmount = 0;
    for (let i = 0; i < this.props.cartArray.length; i++) {
      totalAmount += this.props.cartArray[i].price;
    }
    if (totalAmount === 0) {
      return '$0';
    } else {
      const fixedTotal = fixPrice(totalAmount);
      return fixedTotal;
    }
  }

  render() {
    const array = this.props.cartArray;
    return (
      <div>
        <p className="smaller-text padding-top-5 hover-details" onClick={() => {
          this.props.setView('catalog', {});
        }}><i className="fas fa-angle-left"></i> Back to Catalog</p>
        <h1>My Cart</h1>
        {
          array.map(item => {
            const fixed = fixPrice(item.price);
            return (
              <CartSummaryItem cartArray={this.props.cartArray} key={item.cartItemId} fixed={fixed} item={item} />
            );
          })
        }
        <p>Total amount: {this.getTotal()}</p>
      </div>
    );
  }
}
