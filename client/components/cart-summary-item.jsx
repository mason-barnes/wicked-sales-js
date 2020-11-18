import React from 'react';
import fixPrice from '../lib/fixprice';

export default class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.cartArray.length === 0) {
      return (
        <h1>Cart is Empty</h1>
      );
    } else {
      const item = this.props.item;
      return (
        <div className="cart-product" key={item.cartItemId}>
          <div className="cart-image-div">
            <img className="cart-image" src={item.image} alt={item.name}></img>
          </div>
          <div className="product-info margin-left-5">
            <p><b>{item.name}</b></p>
            <p className="gray">{fixPrice(item.price)}</p>
            <p className="smaller-text">{item.shortDescription}</p>
          </div>
        </div>
      );
    }
  }
}
