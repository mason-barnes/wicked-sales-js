import React from 'react';

export default class CartSummaryItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fixPrice = this.fixPrice.bind(this);
  }

  fixPrice(price) {
    const fixedPrice = price.toFixed();
    if (fixedPrice.length === 3) {
      return '$' + fixedPrice[0] + '.' + fixedPrice[1] + fixedPrice[2];
    } else if (fixedPrice.length === 4) {
      return '$' + fixedPrice[0] + fixedPrice[1] + '.' + fixedPrice[2] + fixedPrice[3];
    }
  }

  render() {
    if (this.props.cartArray === []) {
      return (
        <h1>Nothing</h1>
      );
    } else {
      const array = this.props.cartArray;
      return (
        <div className="container">
          {
            array.map(item => {
              const fixed = this.fixPrice(item.price);
              return (
                <div className="cart-product" key={item.cartItemId}>
                  <div className="cart-image-div">
                    <img className="cart-image" src={item.image} alt={item.name}></img>
                  </div>
                  <div className="product-info margin-left-5">
                    <p><b>{item.name}</b></p>
                    <p className="gray">{fixed}</p>
                    <p className="smaller-text">{item.shortDescription}</p>
                  </div>
                </div>
              );
            })
          }
        </div>
      );
    }
  }
}
