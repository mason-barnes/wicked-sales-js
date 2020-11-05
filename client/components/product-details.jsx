import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.fixPrice = this.fixPrice.bind(this);
  }

  fixPrice(price) {
    const fixedPrice = this.state.product.price.toFixed();
    if (fixedPrice.length === 3) {
      price = '$' + fixedPrice[0] + '.' + fixedPrice[1] + fixedPrice[2];
      return price;
    } else if (fixedPrice.length === 4) {
      price = '$' + fixedPrice[0] + fixedPrice[1] + '.' + fixedPrice[2] + fixedPrice[3];
      return price;
    }
  }

  componentDidMount() {
    fetch('/api/products/' + this.props.productId)
      .then(res => res.json())
      .then(product => {
        this.setState({
          product: product
        });
      });
  }

  render() {
    if (this.state.product) {
      const fixed = this.fixPrice(this.state.product.price);
      return (
        <div className="container">
          <div className="product-card-details">
            <p className="smaller-text padding-top-5 hover-details" onClick={() => {
              this.props.setView('catalog', {});
            }}><i className="fas fa-angle-left"></i> Back to Catalog</p>
            <div className="image-div">
              <img className="image-details" src={this.state.product.image} alt={this.state.product.name}></img>
              <div className="padding-left-5">
                <p className="padding-top-5"><b>{this.state.product.name}</b></p>
                <p className="gray">{fixed}</p>
                <p className="smaller-text padding-top-5"><b>{this.state.product.shortDescription}</b></p>
              </div>
            </div>
            <p className="smaller-text padding-top-5"><b>{this.state.product.longDescription}</b></p>
          </div>
        </div>
      );
    } else {
      return (<h1></h1>);
    }
  }
}
