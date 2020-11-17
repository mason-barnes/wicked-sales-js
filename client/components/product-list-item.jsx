import React from 'react';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.fixPrice = this.fixPrice.bind(this);
  }

  fixPrice(price) {
    const fixedPrice = this.props.value.price.toFixed();
    if (fixedPrice.length === 3) {
      return '$' + fixedPrice[0] + '.' + fixedPrice[1] + fixedPrice[2];
    } else if (fixedPrice.length === 4) {
      return '$' + fixedPrice[0] + fixedPrice[1] + '.' + fixedPrice[2] + fixedPrice[3];
    }
  }

  render() {
    const fixed = this.fixPrice(this.props.value.price);
    return (
      <div className="col-md-4">
        <div className="product-card hover" onClick={() => {
          this.props.setView('details', this.props.value.productId);
        }}>
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
