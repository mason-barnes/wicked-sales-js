import React from 'react';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.fixPrice = this.fixPrice.bind(this);
  }

  fixPrice(price) {
    const fixedPrice = this.props.value.price.toFixed();
    if (fixedPrice.length === 3) {
      price = '$' + fixedPrice[0] + '.' + fixedPrice[1] + fixedPrice[2];
      return price;
    } else if (fixedPrice.length === 4) {
      price = '$' + fixedPrice[0] + fixedPrice[1] + '.' + fixedPrice[2] + fixedPrice[3];
      return price;
    }
  }

  render() {
    const fixed = this.fixPrice(this.props.value.price);
    return (
      <div className="col-md-4">
        <div className="product-card">
          <div className="image-div">
            <img className="image" src={this.props.value.image} alt={this.props.value.name}></img>
          </div>
          <p className="padding-top-5"><b>{this.props.value.name}</b></p>
          <p className="gray">{fixed}</p>
          <p className="smaller-text padding-top-5"><b>{this.props.value.shortDescription}</b></p>
        </div>
      </div>
    );
  }
}
