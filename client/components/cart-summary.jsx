import React from 'react';
import CartSummaryItems from './cart-summary-items';

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
    const totalString = totalAmount.toString();
    if (totalAmount === 0) {
      return '$0';
    } else if (totalString.length === 3) {
      return '$' + totalString[0] + '.' + totalString[1] + totalString[2];
    } else if (totalString.length === 4) {
      return '$' + totalString[0] + totalString[1] + '.' + totalString[2] + totalString[3];
    } else if (totalString.length === 5) {
      return '$' + totalString[0] + totalString[1] + totalString[2] + '.' + totalString[3] + totalString[4];
    } else if (totalString.length === 6) {
      return '$' + totalString[0] + totalString[1] + totalString[2] + totalString[3] + '.' + totalString[4] + totalString[5];
    }
  }

  render() {
    return (
      <div>
        <p className="smaller-text padding-top-5 hover-details" onClick={() => {
          this.props.setView('catalog', {});
        }}><i className="fas fa-angle-left"></i> Back to Catalog</p>
        <h1>My Cart</h1>
        <CartSummaryItems cartArray={this.props.cartArray} />
        <p>Total amount: {this.getTotal()}</p>
      </div>
    );
  }
}
