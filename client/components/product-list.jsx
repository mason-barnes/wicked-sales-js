import ProductListItem from './product-list-item';
import React from 'react';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      productsArray: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(array => {
        const productsArray = [];
        array.map(x => productsArray.push(x));
        this.setState({
          productsArray: productsArray
        });
      });
  }

  render() {
    const array = this.state.productsArray;
    return (
      <div className="container">
        <div className="row">
          {
            array.map(item => {
              return <ProductListItem setView={this.props.setView} key={item.productId} value={item}/>;
            })
          }
        </div>
      </div>
    );
  }
}
