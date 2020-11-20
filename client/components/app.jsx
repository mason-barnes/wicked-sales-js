import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import fixPrice from '../lib/fixprice';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      view: {
        name: 'catalog',
        params: {}
      },
      message: null,
      isLoading: true
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.getTotal = this.getTotal.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(cart => {
        this.setState({
          cart: cart
        });
      });
  }

  getTotal() {
    let totalAmount = 0;
    for (let i = 0; i < this.state.cart.length; i++) {
      totalAmount += this.state.cart[i].price;
    }
    if (totalAmount === 0) {
      return '$0';
    } else {
      const fixedTotal = fixPrice(totalAmount);
      return fixedTotal;
    }
  }

  addToCart(product) {
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(product => {
        const products = this.state.cart.slice();
        products.push(product);
        this.setState({
          cart: products
        });
      });
  }

  placeOrder(customerInfo) {
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customerInfo)
    })
      .then(res => res.json())
      .then(() => {
        this.setState({
          cart: [],
          view: {
            name: 'catalog',
            params: {}
          }
        });
      });
  }

  componentDidMount() {
    this.getCartItems();
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    let viewElement;
    if (this.state.view.name === 'catalog') {
      viewElement =
        <div className="margin-bottom-20">
          <Header setView={this.setView} cartItemCount={this.state.cart.length} />
          <ProductList setView={this.setView} />
        </div>;
    } else if (this.state.view.name === 'details') {
      viewElement =
        <div className="margin-bottom-20">
          <Header setView={this.setView} cartItemCount={this.state.cart.length} />
          <ProductDetails addToCart={this.addToCart} setView={this.setView} productId={this.state.view.params} />
        </div>;
    } else if (this.state.view.name === 'cart') {
      viewElement =
        <div className="margin-bottom-20">
          <Header setView={this.setView} cartItemCount={this.state.cart.length} />
          <CartSummary getCartItems={this.getCartItems} getTotal={this.getTotal} setView={this.setView} cartArray={this.state.cart} />
        </div>;
    } else if (this.state.view.name === 'checkout') {
      viewElement =
        <div className="margin-bottom-20">
          <Header setView={this.setView} cartItemCount={this.state.cart.length} />
          <CheckoutForm getTotal={this.getTotal} setView={this.setView} placeOrder={this.placeOrder}/>
        </div>;
    }
    return (
      this.state.isLoading
        ? <h1>Testing connections...</h1>
        : <div>{viewElement}</div>
    );
  }
}
