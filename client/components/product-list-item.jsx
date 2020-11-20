import React from 'react';
import fixPrice from '../lib/fixprice';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const fixed = fixPrice(this.props.value.price);
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
          <p className="font-size-10"><b>{this.props.value.shortDescription}</b></p>
        </div>
      </div>
    );
  }
}
